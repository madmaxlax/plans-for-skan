import { TRIP } from "../data/trip";
import { deckForDate, hasDeckEntry, inAnyTripWindow } from "../data/today-deck";
import { dowShort, shiftISO } from "./dates";
import type { TripDay } from "./today";

export type StoryDay = {
  dateISO: string;
  dow: string; // "mon"
  num: string; // "08"
  isToday: boolean;
  isPast: boolean;
  isInWindow: boolean;
  am: string | null;
  pm: string | null;
  eve: string | null;
};

const DAYS_IN_BOARD = 9;
const MAX_TITLE_LEN = 22;

function truncate(s: string, n = MAX_TITLE_LEN): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function buildDay(dateISO: string, todayISO: string): StoryDay {
  const showLabels = hasDeckEntry(dateISO) && inAnyTripWindow(dateISO);
  const deck = showLabels ? deckForDate(dateISO) : null;

  return {
    dateISO,
    dow: dowShort(dateISO),
    num: dateISO.slice(8, 10),
    isToday: dateISO === todayISO,
    isPast: dateISO < todayISO,
    isInWindow: inAnyTripWindow(dateISO),
    am:  deck ? truncate(deck.morning.title)   : null,
    pm:  deck ? truncate(deck.afternoon.title) : null,
    eve: deck ? truncate(deck.evening.title)   : null,
  };
}

function pickStartDate(tripDay: TripDay): string {
  if (tripDay.state === "in-window" && tripDay.window) {
    // Center on today within the active window; clamp to window start.
    const shifted = shiftISO(tripDay.todayISO, -3);
    return shifted < tripDay.window.start ? tripDay.window.start : shifted;
  }
  if (tripDay.state === "after") {
    const last = TRIP.windows[TRIP.windows.length - 1];
    return shiftISO(last.end, -(DAYS_IN_BOARD - 1));
  }
  if (tripDay.window) {
    // before or between: show first DAYS_IN_BOARD days of the next window.
    return tripDay.window.start;
  }
  return tripDay.todayISO;
}

export function buildStoryboard(tripDay: TripDay): StoryDay[] {
  const startISO = pickStartDate(tripDay);
  return Array.from({ length: DAYS_IN_BOARD }, (_, i) =>
    buildDay(shiftISO(startISO, i), tripDay.todayISO),
  );
}
