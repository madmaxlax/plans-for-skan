/**
 * The structured "what's happening when" layer for the trip.
 *
 * Four kinds of items:
 *   - booking   : confirmed (or considering) commitments — anchor everything else
 *   - dated     : single-event happenings on a specific date or date range
 *   - recurring : weekly hosted activities (every Mon @ 6pm, etc.)
 *   - anytime   : fill-the-gap options with no fixed time
 *
 * Edit this file freely from Claude Code — it's the single source of truth
 * for the /schedule page and the home page's "this week" card. The whats-on-today
 * skill can also read it (or its compiled JSON).
 *
 * SCC class data is layered in separately from data/scc-classes.json (auto-generated
 * by scripts/fetch-scc-classes.mjs).
 */

import { dowShort, isoToUTCDate, prettyDate, shiftISO } from "../lib/dates";
import { TRIP } from "./trip";

export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type ScheduleCategory =
  | "booking"
  | "sports"
  | "toddler"
  | "lake"
  | "food-drink"
  | "music-events"
  | "outdoors"
  | "scc";

export type ScheduleAccent = "coral" | "lake" | "forest" | "tan";

export interface BaseItem {
  id: string;
  title: string;
  category: ScheduleCategory;
  location?: string;
  notes?: string;
  link?: string;
  accent?: ScheduleAccent;
}

export interface Booking extends BaseItem {
  kind: "booking";
  status: "confirmed" | "considering";
  startDate: string;     // YYYY-MM-DD
  endDate?: string;      // inclusive
  timeStart?: string;    // "9:00am"
  timeEnd?: string;      // "12:00pm"
  /** If set, restrict to these weekdays within the date range (e.g. Mon–Fri for camp). */
  daysOfWeek?: Weekday[];
}

export interface DatedEvent extends BaseItem {
  kind: "dated";
  date: string;
  endDate?: string;
  timeStart?: string;
  timeEnd?: string;
}

export interface Recurring extends BaseItem {
  kind: "recurring";
  daysOfWeek: Weekday[];
  timeStart?: string;
  timeEnd?: string;
  /** Optional season window where this is active. */
  seasonStart?: string;
  seasonEnd?: string;
}

export interface Anytime extends BaseItem {
  kind: "anytime";
  hours?: string;
}

export type ScheduleItem = Booking | DatedEvent | Recurring | Anytime;

// ─── Data ────────────────────────────────────────────────────────────────────

export const BOOKINGS: Booking[] = [
  {
    kind: "booking",
    id: "egan-camp-w1",
    title: "Egan day camp",
    status: "confirmed",
    startDate: "2026-06-22",
    endDate: "2026-06-26",
    daysOfWeek: ["mon", "tue", "wed", "thu", "fri"],
    timeStart: "9:00am",
    timeEnd: "12:00pm",
    category: "toddler",
    accent: "coral",
    notes: "Adult mornings need to wrap by 11:45 for noon pickup.",
  },
  {
    kind: "booking",
    id: "egan-camp-w2",
    title: "Egan day camp (considering)",
    status: "considering",
    startDate: "2026-06-29",
    endDate: "2026-07-03",
    daysOfWeek: ["mon", "tue", "wed", "thu", "fri"],
    timeStart: "9:00am",
    timeEnd: "12:00pm",
    category: "toddler",
    accent: "coral",
    notes: "Not yet committed — decide based on how the first week went.",
  },
];

export const DATED_EVENTS: DatedEvent[] = [
  {
    kind: "dated",
    id: "finger-lakes-tri",
    title: "Finger Lakes Triathlon",
    date: "2026-06-21",
    timeStart: "8:00am",
    location: "Canandaigua, NY · ~45 min",
    notes: "Sprint, intermediate, aquabike, duathlon options.",
    link: "https://trisignup.com",
    category: "sports",
    accent: "lake",
  },
  {
    kind: "dated",
    id: "ithaca-reggae",
    title: "Ithaca Reggae Fest",
    date: "2026-06-26",
    endDate: "2026-06-28",
    location: "Near Ithaca",
    link: "https://eventbrite.com",
    category: "music-events",
    accent: "forest",
  },
  {
    kind: "dated",
    id: "swim-across-america",
    title: "Swim Across America (unconfirmed)",
    date: "2026-06-20",
    location: "Skaneateles Lake",
    notes: "Per Skan Lake Assoc — SAA official schedule lists CT for this date. Verify directly.",
    category: "sports",
    accent: "lake",
  },
];

export const RECURRING: Recurring[] = [
  // ── In-village ────────────────────────────────────────────────────────────
  {
    kind: "recurring",
    id: "farmers-market-thu",
    title: "Skaneateles Farmers Market",
    daysOfWeek: ["thu"],
    timeStart: "3:00pm",
    timeEnd: "6:00pm",
    location: "Austin Park pavilion",
    category: "food-drink",
    accent: "forest",
  },
  {
    kind: "recurring",
    id: "farmers-market-sat",
    title: "Skaneateles Farmers Market",
    daysOfWeek: ["sat"],
    timeStart: "9:30am",
    timeEnd: "12:30pm",
    location: "Austin Park pavilion",
    category: "food-drink",
    accent: "forest",
  },
  {
    kind: "recurring",
    id: "lib-baby-bounce",
    title: "Baby Bounce & Rhyme (pre-bday Egan)",
    daysOfWeek: ["wed"],
    timeStart: "9:15am",
    location: "Skaneateles Free Library",
    notes: "Babies up to 2 with caregiver.",
    category: "toddler",
    accent: "coral",
  },
  {
    kind: "recurring",
    id: "lib-read-sing-play",
    title: "Read, Sing, Play storytime (post-bday Egan)",
    daysOfWeek: ["wed"],
    timeStart: "10:30am",
    location: "Skaneateles Free Library",
    notes: "Ages 2–5.",
    category: "toddler",
    accent: "coral",
  },
  {
    kind: "recurring",
    id: "lib-book-worms",
    title: "Story Time for Book Worms",
    daysOfWeek: ["thu"],
    timeStart: "10:30am",
    location: "Skaneateles Free Library",
    category: "toddler",
    accent: "coral",
  },

  // ── SCC adult leagues ─────────────────────────────────────────────────────
  {
    kind: "recurring",
    id: "scc-volleyball",
    title: "SCC Adult Beach Volleyball league",
    daysOfWeek: ["mon"],
    timeStart: "6:00pm",
    timeEnd: "8:00pm",
    seasonStart: "2026-06-01",
    seasonEnd: "2026-08-10",
    location: "Austin Park",
    notes: "$220/team. Contact Josh Card.",
    category: "sports",
    accent: "lake",
  },
  {
    kind: "recurring",
    id: "scc-softball",
    title: "SCC Adult Coed Softball",
    daysOfWeek: ["tue"],
    seasonStart: "2026-06-09",
    seasonEnd: "2026-09-01",
    location: "Skan HS softball field",
    notes: "Individual signup OK — they place you on a team.",
    category: "sports",
    accent: "lake",
  },
  {
    kind: "recurring",
    id: "scc-kickball",
    title: "SCC Adult Kickball",
    daysOfWeek: ["wed"],
    timeStart: "5:00pm",
    timeEnd: "8:00pm",
    seasonStart: "2026-06-10",
    seasonEnd: "2026-07-15",
    location: "Skan HS softball field",
    category: "sports",
    accent: "lake",
  },
  {
    kind: "recurring",
    id: "scc-bball-18",
    title: "SCC Pickup Basketball (18+)",
    daysOfWeek: ["sun", "thu"],
    timeStart: "4:45pm",
    timeEnd: "7:00pm",
    location: "SCC",
    notes: "Members free, non-members $10.",
    category: "sports",
    accent: "lake",
  },
  {
    kind: "recurring",
    id: "scc-bball-30",
    title: "SCC Pickup Basketball (30+)",
    daysOfWeek: ["sun", "thu"],
    timeStart: "8:30pm",
    timeEnd: "10:00pm",
    location: "SCC",
    category: "sports",
    accent: "lake",
  },

  // ── Nearby drive ──────────────────────────────────────────────────────────
  {
    kind: "recurring",
    id: "prison-city-music-fri",
    title: "Prison City Farm — live music",
    daysOfWeek: ["fri"],
    timeStart: "6:00pm",
    timeEnd: "9:00pm",
    location: "251 North St, Auburn · ~20 min",
    notes: "Summer Music at the Farm series.",
    category: "music-events",
    accent: "coral",
  },
  {
    kind: "recurring",
    id: "prison-city-music-sun",
    title: "Prison City Farm — live music",
    daysOfWeek: ["sun"],
    timeStart: "2:00pm",
    timeEnd: "5:00pm",
    location: "251 North St, Auburn",
    category: "music-events",
    accent: "coral",
  },
  {
    kind: "recurring",
    id: "prison-city-trivia",
    title: "Prison City Farm — trivia",
    daysOfWeek: ["thu"],
    timeStart: "6:30pm",
    location: "251 North St, Auburn",
    category: "food-drink",
    accent: "forest",
  },
  {
    kind: "recurring",
    id: "naturalists-bumble",
    title: "Naturalist's Bumble (free adult walk)",
    daysOfWeek: ["wed"],
    timeStart: "9:00am",
    location: "Baltimore Woods, Marcellus",
    category: "outdoors",
    accent: "forest",
  },
  {
    kind: "recurring",
    id: "auburn-bocce",
    title: "Bocce ball",
    daysOfWeek: ["thu"],
    timeStart: "6:30pm",
    timeEnd: "10:30pm",
    location: "Auburn Rec Park",
    category: "sports",
    accent: "lake",
  },
];

export const ANYTIME: Anytime[] = [
  { kind: "anytime", id: "lake-rental",   title: "Lake / dock at the rental",       category: "lake",     accent: "lake",   hours: "anytime" },
  { kind: "anytime", id: "kayak-rentals", title: "Kayak / SUP / pontoon rentals",   category: "lake",     accent: "lake",   notes: "Skan Marina, Sailboat Shop — call ahead re wind." },
  { kind: "anytime", id: "lucky-buck",    title: "Lucky Buck fishing charter (6hr)", category: "lake",    accent: "lake",   notes: "Morning or afternoon. Book early." },
  { kind: "anytime", id: "playspace",     title: "PlaySpace Auburn",                 category: "toddler", accent: "coral",  hours: "Tue/Thu/Fri 9a–1p · Sat 9a–2p" },
  { kind: "anytime", id: "zoo",           title: "Rosamond Gifford Zoo",             category: "toddler", accent: "coral",  hours: "Daily 10a–4:30p", notes: "Egan free under 2." },
  { kind: "anytime", id: "owasco-splash", title: "Owasco Splash Pad",                category: "toddler", accent: "coral",  hours: "Daily 9a–8p (opens mid-June)" },
  { kind: "anytime", id: "most",          title: "MOST Museum (Syracuse)",           category: "toddler", accent: "coral",  hours: "Thu–Sun" },
  { kind: "anytime", id: "ichild-garden", title: "Ithaca Children's Garden",         category: "toddler", accent: "coral",  hours: "Daily, free" },
  { kind: "anytime", id: "charlie-major", title: "Charlie Major Nature Trail",       category: "outdoors", accent: "forest" },
  { kind: "anytime", id: "anyelas",       title: "Anyela's Vineyards",               category: "food-drink", accent: "forest", hours: "Mon–Sun 12–5pm" },
  { kind: "anytime", id: "harriet-tubman",title: "Harriet Tubman NHP",               category: "outdoors", accent: "forest", hours: "Fri–Sat 10a–4p (tours 11:30 + 3pm)" },
  { kind: "anytime", id: "golf-pearl",    title: "Pearl Lakes Golf (9-hole + range)", category: "sports", accent: "lake" },
  { kind: "anytime", id: "golf-highland", title: "Highland Park Golf",                category: "sports", accent: "lake" },
  { kind: "anytime", id: "golf-dutch",    title: "Dutch Hollow",                      category: "sports", accent: "lake" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function dateInRange(dateISO: string, startISO: string, endISO?: string): boolean {
  if (endISO) return dateISO >= startISO && dateISO <= endISO;
  return dateISO === startISO;
}

export function inSeason(item: Recurring, dateISO: string): boolean {
  if (item.seasonStart && dateISO < item.seasonStart) return false;
  if (item.seasonEnd && dateISO > item.seasonEnd) return false;
  return true;
}

/** True if `dateISO` falls within any of the trip's defined windows. */
export function inTripWindow(dateISO: string): boolean {
  return TRIP.windows.some((w) => dateISO >= w.start && dateISO <= w.end);
}

/** Sortable minute-of-day key from a time like "9:00am" / "6:30pm". Returns 1e9 if no time. */
export function timeKey(time?: string): number {
  if (!time) return 1e9;
  const m = time.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!m) return 1e9;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const isPM = m[3].toLowerCase() === "pm";
  if (h === 12) h = isPM ? 12 : 0;
  else if (isPM) h += 12;
  return h * 60 + min;
}

/** All items that "happen" on a given date — bookings (range+dow), dated, recurring (dow+season). */
export function itemsOnDate(dateISO: string): (Booking | DatedEvent | Recurring)[] {
  const dow = dowShort(dateISO) as Weekday;

  const bookings = BOOKINGS.filter((b) => {
    if (!dateInRange(dateISO, b.startDate, b.endDate)) return false;
    if (b.daysOfWeek && !b.daysOfWeek.includes(dow)) return false;
    return true;
  });

  const dated = DATED_EVENTS.filter((d) => dateInRange(dateISO, d.date, d.endDate));

  const recurring = RECURRING.filter((r) => r.daysOfWeek.includes(dow) && inSeason(r, dateISO));

  return [...bookings, ...dated, ...recurring].sort(
    (a, b) => timeKey(("timeStart" in a && a.timeStart) || undefined) - timeKey(("timeStart" in b && b.timeStart) || undefined),
  );
}

/** Items in [startISO, endISO] inclusive, grouped by date. Skips dates outside trip windows. */
export function itemsByDateRange(startISO: string, endISO: string): { dateISO: string; items: (Booking | DatedEvent | Recurring)[] }[] {
  const out: { dateISO: string; items: (Booking | DatedEvent | Recurring)[] }[] = [];
  let cursor = startISO;
  const guard = 400;
  for (let i = 0; i < guard && cursor <= endISO; i++) {
    if (inTripWindow(cursor)) {
      out.push({ dateISO: cursor, items: itemsOnDate(cursor) });
    }
    cursor = shiftISO(cursor, 1);
  }
  return out;
}

/**
 * Next "anchor" strictly after `fromISO`. Confirmed bookings always rank above
 * dated events (a personal commitment matters more than an event happening nearby).
 * Falls back to the next considering booking, then the next dated event.
 */
export function nextAnchor(fromISO: string): { dateISO: string; item: Booking | DatedEvent } | null {
  const confirmedBookings = BOOKINGS
    .filter((b) => b.status === "confirmed" && b.startDate > fromISO)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  if (confirmedBookings[0]) return { dateISO: confirmedBookings[0].startDate, item: confirmedBookings[0] };

  const consideringBookings = BOOKINGS
    .filter((b) => b.status === "considering" && b.startDate > fromISO)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  if (consideringBookings[0]) return { dateISO: consideringBookings[0].startDate, item: consideringBookings[0] };

  const dated = DATED_EVENTS
    .filter((d) => d.date > fromISO)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (dated[0]) return { dateISO: dated[0].date, item: dated[0] };

  return null;
}

/** This week = today + next 6 days, filtered to trip windows. */
export function thisWeekSchedule(todayISO: string): { dateISO: string; items: (Booking | DatedEvent | Recurring)[] }[] {
  return itemsByDateRange(todayISO, shiftISO(todayISO, 6));
}

/** Render-friendly label for a date. */
export function labelForDate(dateISO: string): string {
  return prettyDate(dateISO);
}

// Re-export for convenience.
export { isoToUTCDate, shiftISO, prettyDate };
