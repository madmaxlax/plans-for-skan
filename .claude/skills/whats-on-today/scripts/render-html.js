#!/usr/bin/env bun
// Generates a standalone HTML dashboard for today's Skaneateles briefing.
// Reuses briefing.js by spawning it and parsing the JSON.
// Writes to /tmp/whats-on-today.html and prints the path.

import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const BRIEFING = join(HERE, "briefing.js");
const OUT = "/tmp/whats-on-today.html";

const result = spawnSync("bun", ["run", BRIEFING], { encoding: "utf8" });
if (result.status !== 0) {
  console.error("briefing.js failed:", result.stderr);
  process.exit(1);
}

const b = JSON.parse(result.stdout);
const w = b.weather;
const lake = b.lake;

function escape(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

const hourly = w.ok ? w.hourly : [];
const maxTemp = hourly.length ? Math.max(...hourly.map((h) => h.temp)) : 0;
const minTemp = hourly.length ? Math.min(...hourly.map((h) => h.temp)) : 0;
const tempRange = maxTemp - minTemp || 1;

const bars = hourly
  .map((h) => {
    const hour = h.time.slice(11, 13);
    const tempPct = ((h.temp - minTemp) / tempRange) * 80 + 20;
    return `
      <div class="bar">
        <div class="temp-val">${h.temp}°</div>
        <div class="bar-fill" style="height:${tempPct}%"></div>
        <div class="precip" style="opacity:${Math.min(1, h.precipChance / 100)}">${h.precipChance}%</div>
        <div class="hour">${hour}</div>
      </div>`;
  })
  .join("");

const dateStr = new Date(b.generatedAt).toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const lakeNote = (() => {
  const t = lake.temp;
  if (t >= 70) return "Swimmable for everyone";
  if (t >= 65) return "Comfortable for adults, brisk for Egan";
  if (t >= 60) return "Brisk — quick dips only";
  return "Boat ride yes, swim no";
})();

const wantList = (b.log.want || [])
  .map((e) => `<li>${escape(e.name)}${e.note ? ` <span class="note">— ${escape(e.note)}</span>` : ""}</li>`)
  .join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>What's on today — Skaneateles</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: linear-gradient(180deg, #0c4a6e 0%, #0369a1 100%);
    min-height: 100vh;
    color: #f0f9ff;
    padding: 24px;
  }
  .wrap { max-width: 800px; margin: 0 auto; }
  h1 { font-size: 28px; margin-bottom: 4px; }
  .date { color: #bae6fd; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; padding: 20px; }
  .card h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #bae6fd; margin-bottom: 8px; }
  .big { font-size: 48px; font-weight: 700; line-height: 1; }
  .sub { color: #bae6fd; font-size: 14px; margin-top: 4px; }
  .stats { display: flex; gap: 16px; margin-top: 12px; font-size: 13px; color: #bae6fd; }
  .chart {
    background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
    border-radius: 16px; padding: 20px; margin-bottom: 24px;
  }
  .chart h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #bae6fd; margin-bottom: 16px; }
  .bars { display: flex; align-items: flex-end; gap: 4px; height: 180px; }
  .bar { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .temp-val { font-size: 11px; color: #bae6fd; }
  .bar-fill {
    width: 100%; background: linear-gradient(180deg, #fbbf24, #f59e0b);
    border-radius: 4px 4px 0 0; min-height: 4px;
  }
  .precip { font-size: 10px; color: #38bdf8; height: 14px; }
  .hour { font-size: 11px; color: #bae6fd; }
  .want { margin-top: 24px; }
  .want h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #bae6fd; margin-bottom: 12px; }
  .want ul { list-style: none; }
  .want li { padding: 8px 12px; background: rgba(255,255,255,0.08); border-radius: 8px; margin-bottom: 6px; }
  .note { color: #94a3b8; font-size: 13px; }
  .footer { margin-top: 32px; color: #bae6fd; font-size: 12px; text-align: center; }
</style>
</head>
<body>
<div class="wrap">
  <h1>🌤️ What's on today</h1>
  <div class="date">${escape(dateStr)} · Skaneateles, NY</div>

  <div class="grid">
    <div class="card">
      <h2>Now</h2>
      <div class="big">${w.ok ? w.now.temp + "°F" : "—"}</div>
      <div class="sub">${w.ok ? escape(w.now.condition) : "weather unavailable"}</div>
      <div class="stats">
        ${w.ok ? `
          <div>Feels ${w.now.feelsLike}°</div>
          <div>Wind ${w.now.windspeed} mph</div>
          <div>${w.now.humidity}% humidity</div>
        ` : ""}
      </div>
    </div>

    <div class="card">
      <h2>Lake</h2>
      <div class="big">${lake.temp}°F</div>
      <div class="sub">${escape(lakeNote)}</div>
      <div class="stats">
        <div>${escape(lake.source)}</div>
      </div>
    </div>
  </div>

  ${w.ok ? `
  <div class="chart">
    <h2>Next 12 hours · temp + precip %</h2>
    <div class="bars">${bars}</div>
  </div>` : ""}

  ${wantList ? `
  <div class="want">
    <h2>⭐ Want to try</h2>
    <ul>${wantList}</ul>
  </div>` : ""}

  <div class="footer">
    Log: ${b.log.counts.done} done · ${b.log.counts.skip} skipped · ${b.log.counts.want} want<br>
    Generated ${new Date(b.generatedAt).toLocaleTimeString()}
  </div>
</div>
</body>
</html>`;

writeFileSync(OUT, html);
console.log(OUT);
