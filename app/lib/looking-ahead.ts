import { deckForDate, hasDeckEntry, inAnyTripWindow, type DeckSlot } from "../data/today-deck";
import { dowUpper, prettyDate, shiftISO } from "./dates";

export type TomorrowItem = {
  slot: "morning" | "afternoon" | "evening";
  label: string;
  sub: string;
  accent: "coral" | "lake" | "forest" | "tan";
};

export type Tomorrow = {
  dateISO: string;
  label: string;
  items: TomorrowItem[]; // up to 2
} | null;

export type WeekItem = {
  dateISO: string;
  dow: string;
  label: string;
};

const LOOKAHEAD_DAYS = 30;

/** Upcoming ISO dates (after `todayISO`) that have a real deck inside a trip window. */
function upcomingDeckDates(todayISO: string, max = LOOKAHEAD_DAYS): string[] {
  const out: string[] = [];
  let cursor = shiftISO(todayISO, 1);
  for (let i = 0; i < LOOKAHEAD_DAYS && out.length < max; i++) {
    if (hasDeckEntry(cursor) && inAnyTripWindow(cursor)) out.push(cursor);
    cursor = shiftISO(cursor, 1);
  }
  return out;
}

export function getTomorrow(todayISO: string): Tomorrow {
  const [dateISO] = upcomingDeckDates(todayISO, 1);
  if (!dateISO) return null;
  const d = deckForDate(dateISO);
  return {
    dateISO,
    label: prettyDate(dateISO),
    items: [
      { slot: "morning",   label: d.morning.title,   sub: d.morning.meta,   accent: d.morning.accent },
      { slot: "afternoon", label: d.afternoon.title, sub: d.afternoon.meta, accent: d.afternoon.accent },
    ],
  };
}

/** Pick the headline slot for a deck: highlighted > planned > afternoon fallback. */
function headlineSlot(slots: DeckSlot[], afternoonFallback: DeckSlot): DeckSlot {
  return (
    slots.find((s) => s.status === "best now") ??
    slots.find((s) => s.status === "plan ahead") ??
    afternoonFallback
  );
}

export function getThisWeek(todayISO: string, max = 5): WeekItem[] {
  return upcomingDeckDates(todayISO, max).map((dateISO) => {
    const d = deckForDate(dateISO);
    const slot = headlineSlot([d.morning, d.afternoon, d.evening], d.afternoon);
    return { dateISO, dow: dowUpper(dateISO), label: slot.title };
  });
}
