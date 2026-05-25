#!/usr/bin/env bun
// Activity log CLI for the whats-on-today skill.
// Subcommands:
//   done <name> [note]    — mark an activity as completed
//   skip <name> [note]    — mark as not-interested (won't be re-suggested)
//   want <name> [note]    — flag as want-to-try
//   list [status]         — list entries (optional filter: done|skip|want)
//   remove <id>           — remove an entry by id
//
// Writes both:
//   data/activity-log.json  (structured state — source of truth)
//   data/activity-log.md    (narrative log — for the user to read)

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const LOG_JSON = join(HERE, "..", "data", "activity-log.json");
const LOG_MD = join(HERE, "..", "data", "activity-log.md");

const VALID_STATUSES = ["done", "skip", "want"];

function loadJson() {
  if (!existsSync(LOG_JSON)) {
    return { entries: [], nextId: 1 };
  }
  return JSON.parse(readFileSync(LOG_JSON, "utf8"));
}

function saveJson(data) {
  writeFileSync(LOG_JSON, JSON.stringify(data, null, 2) + "\n");
}

function appendMd(entry) {
  const dateStr = entry.loggedAt.slice(0, 10);
  const statusEmoji = { done: "✅", skip: "🚫", want: "⭐" }[entry.status];
  const note = entry.note ? ` — ${entry.note}` : "";
  const line = `- ${dateStr} ${statusEmoji} **${entry.name}** [id:${entry.id}]${note}\n`;

  if (!existsSync(LOG_MD)) {
    writeFileSync(LOG_MD, `# Skaneateles Activity Log\n\nLegend: ✅ done · 🚫 skip · ⭐ want\n\n${line}`);
  } else {
    appendFileSync(LOG_MD, line);
  }
}

function rewriteMd(entries) {
  let md = `# Skaneateles Activity Log\n\nLegend: ✅ done · 🚫 skip · ⭐ want\n\n`;
  for (const e of entries) {
    const dateStr = e.loggedAt.slice(0, 10);
    const statusEmoji = { done: "✅", skip: "🚫", want: "⭐" }[e.status];
    const note = e.note ? ` — ${e.note}` : "";
    md += `- ${dateStr} ${statusEmoji} **${e.name}** [id:${e.id}]${note}\n`;
  }
  writeFileSync(LOG_MD, md);
}

function add(status, name, note) {
  if (!name) {
    console.error(`Error: ${status} requires an activity name`);
    process.exit(1);
  }
  const data = loadJson();
  const entry = {
    id: data.nextId,
    status,
    name,
    note: note || "",
    loggedAt: new Date().toISOString(),
  };
  data.entries.push(entry);
  data.nextId += 1;
  saveJson(data);
  appendMd(entry);
  console.log(`Logged [id:${entry.id}] ${status}: ${name}${note ? ` — ${note}` : ""}`);
}

function list(filter) {
  const data = loadJson();
  let entries = data.entries;
  if (filter && VALID_STATUSES.includes(filter)) {
    entries = entries.filter((e) => e.status === filter);
  }
  if (entries.length === 0) {
    console.log("No entries.");
    return;
  }
  for (const e of entries) {
    const statusEmoji = { done: "✅", skip: "🚫", want: "⭐" }[e.status];
    const date = e.loggedAt.slice(0, 10);
    const note = e.note ? ` — ${e.note}` : "";
    console.log(`[${e.id}] ${date} ${statusEmoji} ${e.name}${note}`);
  }
}

function remove(idStr) {
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    console.error("Error: remove requires a numeric id");
    process.exit(1);
  }
  const data = loadJson();
  const before = data.entries.length;
  data.entries = data.entries.filter((e) => e.id !== id);
  if (data.entries.length === before) {
    console.error(`No entry with id ${id}`);
    process.exit(1);
  }
  saveJson(data);
  rewriteMd(data.entries);
  console.log(`Removed entry ${id}`);
}

const [cmd, ...args] = process.argv.slice(2);

switch (cmd) {
  case "done":
  case "skip":
  case "want":
    add(cmd, args[0], args.slice(1).join(" "));
    break;
  case "list":
    list(args[0]);
    break;
  case "remove":
    remove(args[0]);
    break;
  default:
    console.error(`Usage:
  log.js done <name> [note]
  log.js skip <name> [note]
  log.js want <name> [note]
  log.js list [done|skip|want]
  log.js remove <id>`);
    process.exit(1);
}
