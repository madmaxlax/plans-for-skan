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

**Why this matters:**
- **Vercel auto-deploys on push to `main`** → live site: https://plans-for-skan.vercel.app/ (project: https://vercel.com/max-struever-bcg-projects/plans-for-skan). Any merge/push to `main` triggers a production deploy.
- **Solo dev across multiple machines** → Max is the only developer but works from multiple machines. Uncommitted local work blocks remote sessions. Always push so the next machine has the latest state.

This applies to `/keep-agents-updated` and any other doc/context updates too — commit and push the AGENTS.md changes, don't leave them sitting locally.

### Content edits
When updating a page's facts (hours, phone numbers, prices), update **both** the source `*.md` at the repo root **and** the matching `app/<route>/page.tsx`. The markdown is the research record; the page is what gets rendered.

### Activity catalog sync (site ↔ `whats-on-today` skill)

The root markdown files are the **single source of truth** for the activity catalog. They're consumed by both the site (hand-built `app/<route>/page.tsx` pages) and the [whats-on-today skill](.claude/skills/whats-on-today/) (which reads them at runtime when composing the briefing).

When activities are added, removed, or modified — wherever the change originates — they must propagate to all three layers:

1. **Catalog (root `.md`)** — the canonical list, with hours, prices, notes
2. **Site (`app/<route>/page.tsx`)** — what gets rendered to the family
3. **Skill log (`.claude/skills/whats-on-today/data/activity-log.json`)** — personal state (done/skip/want) layered on top of the catalog

Rules:
- **Adding a new activity** (e.g., user discovers a new restaurant) → add to the matching root `.md` AND the matching `page.tsx`. The skill will pick it up automatically since it reads the markdown.
- **Removing an activity** from the catalog entirely (it closed, bad info, not real) → remove from both the `.md` and the `page.tsx`. Don't use the skill's `skip` for this — `skip` is for things the user personally isn't interested in.
- **User says "we're not interested in X" via the skill** → log as `skip` in `activity-log.json` (the skill handles this). Leave the catalog alone — the activity still exists, this user just doesn't want it suggested.
- **User says "remove X from the guide, it's not real"** → that's a catalog change. Edit the `.md` and `page.tsx`.

The skill's SKILL.md explains how to handle this when the user is mid-conversation; this section is the durable repo-level convention.

### Ephemeral notes
Working docs, debugging logs, and WIP go under `agent-notes/local/` (gitignored) or `agent-notes/shared/` (tracked). Don't drop scratch `.md` files at the repo root — those are reserved for the per-section vacation guides.
