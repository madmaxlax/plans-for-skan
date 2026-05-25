---
name: whats-on-today
description: Daily Skaneateles vacation briefing — fetches live weather + lake temp for the 1557 Red Tail Ln house, visualizes the day's forecast, suggests activities split between toddler-Egan-friendly and adult/personal options, and tracks what's already been done or ruled out. Use this whenever the user asks "what's on today", "what should we do", "plan the day", "is it a lake day", "should we go to X", or mentions tracking what they've done / aren't interested in for the trip. Even loose phrasings like "what's the day looking like" or "give me the briefing" should trigger this.
---

# What's On Today

The user is in (or planning) a June 2026 family trip to Skaneateles, NY — house at 1557 Red Tail Ln, on the lake. The family includes **Egan**, a toddler turning 2 in June 2026. This skill produces a daily briefing tailored to the weather and tracks activity history so suggestions don't repeat.

## What you do when invoked

1. **Run the briefing script** to pull live weather + lake temp + activity history in one shot
2. **Read the relevant guide markdown** for activity ideas based on the weather pattern
3. **Compose the briefing** (markdown in chat by default; HTML dashboard if requested)
4. **Offer to log** the day's plans / completed activities at the end

## Step 1: Get today's data

Run the briefing script from anywhere — it resolves paths relative to its own location:

```bash
bun run /Users/struevermax/dev/plans-for-skan/.claude/skills/whats-on-today/scripts/briefing.js
```

Output is JSON: `{ now, today: {hourly forecast, summary}, lake, log: {done, skip, want} }`.

If the network is flaky, the script returns whatever it could fetch + falls back to historical averages — don't retry, just note the gap in the briefing.

## Step 2: Pick the weather lane

Map the day's conditions to the right guide(s) — read **only** what's relevant:

| Conditions | Read these |
|---|---|
| Warm + sunny (>72°F, low precip) | `lake-activities.md`, `sports-and-activities.md` |
| Mild + cloudy or windy | `hikes-and-outdoors.md`, `sports-and-activities.md` |
| Cool (<65°F) | `hikes-and-outdoors.md`, `day-trips-and-events.md` |
| Rainy / thunder | `rainy-day.md`, `day-trips-and-events.md` |
| Toddler-focused day | always pull `toddler-and-egan.md` regardless of weather |

The lake temp matters too — under ~65°F is brisk-but-doable for adults, under 60°F is "boat ride yes, swim no", and Egan probably shouldn't swim below the mid-60s.

## Step 3: Compose the chat briefing

Use this structure. Keep it scannable — the user reads this on their phone.

```
# 🌤️ Skaneateles — [Day, Month DD]

**Now:** 68°F partly cloudy · feels 66 · wind 7 mph · 42% humidity
**Lake:** 64°F (recorded [time]) — chilly but swimmable for adults
**Today's arc:** [one-line forecast trajectory]

## Hourly
[ASCII sparkline of temp + precipitation chance — see script output]

## With Egan 🧒
- **[Activity]** — [why it fits today, location, hours, ~cost]
- **[Activity]** — ...

## Adult / personal 🚴
- **[Activity]** — ...
- **[Activity]** — ...

## Wildcards
- [optional weather-dependent suggestion, e.g. "if it clears by 4, sunset paddle"]

---
*Already done: [n] · Not interested: [n] · Want to try: [n]*
```

### Suggestion rules

- **Don't re-suggest things already logged as `done` or `skip`** — the briefing script already filters them out of the activity pool. If the user asks for a repeat, that's fine, but don't proactively bring them up.
- **Prioritize `want` entries** when conditions fit — these are things the user has flagged interest in.
- **Match toddler suggestions to Egan's energy windows**. Mornings and late afternoon are best; midday is often nap. If you can tell from the time, factor that in.
- **Give 2-3 suggestions per category**, not a wall. Curation > completeness.
- **Always include the "why it fits today"** — what makes this a good pick for this weather, not just any day.

## Step 4: HTML dashboard (only if asked)

If the user says "show me the dashboard", "make it visual", "give me an HTML version", or similar:

```bash
bun run /Users/struevermax/dev/plans-for-skan/.claude/skills/whats-on-today/scripts/render-html.js
```

This writes `/tmp/whats-on-today.html` and prints the path. Tell the user the path so they can `open` it. Don't auto-open — let them choose.

## Step 5: Offer to log

After delivering the briefing, ask a brief follow-up like:

> "Want me to log any of these? I can mark done / skip / want."

If the user confirms, use the log script:

```bash
# Mark done (with optional note)
bun run /Users/struevermax/dev/plans-for-skan/.claude/skills/whats-on-today/scripts/log.js done "Bourbon Street tee time" "9-hole, played with Sam"

# Mark not-interested (so it stops appearing)
bun run .../log.js skip "Glassblowing in Corning" "Too far for one day"

# Flag as want-to-try
bun run .../log.js want "Highland Forest hike"

# List recent entries
bun run .../log.js list

# Remove an entry by id
bun run .../log.js remove 14
```

The script writes to both `data/activity-log.json` (structured state, source of truth) and `data/activity-log.md` (human-readable narrative).

## Why this skill is set up this way

- **One script for data, one for logging, one for HTML** — separating concerns means each script stays small and you can extend any one without touching the others.
- **JSON for state, MD for narrative** — the JSON drives filtering (what to suggest, what to hide); the MD is for the user to read back through later. The log script keeps them in sync.
- **Read guides on-demand, not upfront** — the SKILL.md doesn't try to enumerate every activity. Reading the relevant markdown when needed keeps context lean and lets the user edit the guides without touching the skill.
- **No silent decisions** — when the briefing makes a non-obvious call (e.g., "skipping the boat ride because lake is 58°F"), surface it in the output so the user can override.

## Files in this skill

```
.claude/skills/whats-on-today/
├── SKILL.md              ← you are here
├── scripts/
│   ├── briefing.js       ← fetches weather + lake temp + reads log
│   ├── log.js            ← add/list/remove activity entries
│   └── render-html.js    ← optional HTML dashboard
└── data/
    ├── activity-log.json ← structured state
    └── activity-log.md   ← narrative log
```
