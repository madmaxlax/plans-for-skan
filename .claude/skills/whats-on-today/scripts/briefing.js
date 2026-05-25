#!/usr/bin/env bun
// Fetches today's weather + lake temp + activity log for Skaneateles (1557 Red Tail Ln).
// Prints a JSON briefing to stdout. Designed to be called by the whats-on-today skill.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const LOG_JSON = join(HERE, "..", "data", "activity-log.json");

// Skaneateles, NY — matches the WeatherWidget in the main app
const LAT = 42.9474;
const LON = -76.4298;

const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,apparent_temperature,windspeed_10m,relativehumidity_2m,weathercode` +
  `&hourly=temperature_2m,precipitation_probability,weathercode` +
  `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,sunrise,sunset` +
  `&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York&forecast_days=1`;

const LAKE_URL = "https://lakemonster.com/api/fishing-reports/latest/2631";

function conditionLabel(code) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 49) return "Foggy";
  if (code <= 69) return "Rainy";
  if (code <= 79) return "Snowy";
  if (code <= 82) return "Rain showers";
  if (code <= 99) return "Thunderstorms";
  return "Unknown";
}

async function fetchWeather() {
  try {
    const r = await fetch(WEATHER_URL);
    if (!r.ok) throw new Error(`status ${r.status}`);
    const d = await r.json();
    const c = d.current;
    const hourly = d.hourly;
    const daily = d.daily;

    // Trim hourly to today only (12am→11pm local) and to the next ~12h from now
    const nowIso = new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH
    const nowIdx = hourly.time.findIndex((t) => t >= nowIso);
    const startIdx = nowIdx === -1 ? 0 : nowIdx;
    const endIdx = Math.min(startIdx + 12, hourly.time.length);

    const forecast = [];
    for (let i = startIdx; i < endIdx; i++) {
      forecast.push({
        time: hourly.time[i],
        temp: Math.round(hourly.temperature_2m[i]),
        precipChance: hourly.precipitation_probability[i] ?? 0,
        code: hourly.weathercode[i],
      });
    }

    return {
      ok: true,
      now: {
        temp: Math.round(c.temperature_2m),
        feelsLike: Math.round(c.apparent_temperature),
        windspeed: Math.round(c.windspeed_10m),
        humidity: Math.round(c.relativehumidity_2m),
        code: c.weathercode,
        condition: conditionLabel(c.weathercode),
      },
      today: {
        high: Math.round(daily.temperature_2m_max[0]),
        low: Math.round(daily.temperature_2m_min[0]),
        precipChanceMax: daily.precipitation_probability_max[0] ?? 0,
        code: daily.weathercode[0],
        condition: conditionLabel(daily.weathercode[0]),
        sunrise: daily.sunrise[0],
        sunset: daily.sunset[0],
      },
      hourly: forecast,
    };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function fetchLake() {
  try {
    const r = await fetch(LAKE_URL, {
      headers: {
        accept: "*/*",
        referer:
          "https://lakemonster.com/lake/NY/Skaneateles-Lake-water-temperature-2631",
      },
    });
    if (!r.ok) throw new Error(`status ${r.status}`);
    const d = await r.json();
    const wc = d?.report?.water_conditions;
    const t = typeof wc?.temperature === "number" ? wc.temperature : null;
    if (t === null || t < 30 || t > 95) {
      return { ok: true, temp: 65, source: "historical average", recordedAt: null };
    }
    return {
      ok: true,
      temp: Math.round(t),
      source: "lakemonster.com",
      recordedAt: typeof wc?.recorded_at === "string" ? wc.recorded_at : null,
    };
  } catch (e) {
    return { ok: false, temp: 65, source: "historical average (fetch failed)", error: String(e) };
  }
}

function readLog() {
  if (!existsSync(LOG_JSON)) {
    return { done: [], skip: [], want: [] };
  }
  try {
    const data = JSON.parse(readFileSync(LOG_JSON, "utf8"));
    const entries = data.entries || [];
    return {
      done: entries.filter((e) => e.status === "done"),
      skip: entries.filter((e) => e.status === "skip"),
      want: entries.filter((e) => e.status === "want"),
    };
  } catch {
    return { done: [], skip: [], want: [] };
  }
}

// Tiny ASCII sparkline for the hourly forecast — useful when the model is
// composing a chat briefing and wants something visual without HTML.
function sparkline(values) {
  if (values.length === 0) return "";
  const bars = "▁▂▃▄▅▆▇█";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((v) => bars[Math.min(bars.length - 1, Math.floor(((v - min) / range) * bars.length))])
    .join("");
}

const [weather, lake] = await Promise.all([fetchWeather(), fetchLake()]);
const log = readLog();

const tempSpark = weather.ok ? sparkline(weather.hourly.map((h) => h.temp)) : null;
const precipSpark = weather.ok ? sparkline(weather.hourly.map((h) => h.precipChance)) : null;

const briefing = {
  generatedAt: new Date().toISOString(),
  location: { name: "Skaneateles, NY (1557 Red Tail Ln)", lat: LAT, lon: LON },
  weather,
  lake,
  sparklines: weather.ok ? { temp: tempSpark, precip: precipSpark } : null,
  log: {
    counts: { done: log.done.length, skip: log.skip.length, want: log.want.length },
    done: log.done.map((e) => e.name),
    skip: log.skip.map((e) => e.name),
    want: log.want, // include full entries for `want` so the model can prioritize
  },
};

console.log(JSON.stringify(briefing, null, 2));
