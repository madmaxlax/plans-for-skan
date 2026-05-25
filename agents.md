# agents.md — Plans for Skan

## Purpose

Next.js 14 vacation guide for a June 2026 family trip to Skaneateles, NY. Home base: 1557 Red Tail Ln (on the lake). Family includes toddler **Egan** (turning 2 in June 2026), so content balances outdoor/lake/adult rec with toddler-friendly options.

The repo also contains source markdown files (`*.md` at root) that feed the page content — the Next.js pages under `app/` are hand-built around that research.

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tailwind CSS** for styling
- **lucide-react** for icons
- **Bun** preferred for installs/builds locally (project also has `package-lock.json`)
- Small `/api/lake-temp` route + `LakeTempWidget` / `WeatherWidget` client components

## Routes

Each page corresponds to a research markdown at the repo root:

| Route | Source markdown |
|---|---|
| `/` (home) | `README.md` |
| `/sports` | `sports-and-activities.md` |
| `/toddler` | `toddler-and-egan.md` + `daycares-dropins.md` |
| `/outdoors` | `hikes-and-outdoors.md` |
| `/day-trips` | `day-trips-and-events.md` |
| `/lake` | `lake-activities.md` |
| `/food` | `restaurants.md` |
| `/rainy-day` | `rainy-day.md` |

Shared components live in `app/components/` (NavBar, Card, Badges, SectionHeader, LakeTempWidget, WeatherWidget).

## Current State (2026-05-25)

All vacation guide pages are built and linked from the home page. Working tree currently has only `bun.lock` modified (uninteresting). Last commit: `563388d Add all 12 vacation guide pages, Bun build, agents.md guidelines`.

Outstanding pre-trip todos live in the README under **Manual Follow-Ups / Calls to Make** (community center membership, drop-in daycare confirmations, rec league signups, tee times).

## Agent Guidelines

### Always commit and push after making changes
After any meaningful work — building pages, updating content, fixing bugs, deploying — always run:
```
git add -A
git commit -m "descriptive message"
git push
```
Don't leave work uncommitted. If in doubt, commit and push.

### Content edits
When updating a page's facts (hours, phone numbers, prices), update **both** the source `*.md` at the repo root **and** the matching `app/<route>/page.tsx`. The markdown is the research record; the page is what gets rendered.

### Ephemeral notes
Working docs, debugging logs, and WIP go under `agent-notes/local/` (gitignored) or `agent-notes/shared/` (tracked). Don't drop scratch `.md` files at the repo root — those are reserved for the per-section vacation guides.
