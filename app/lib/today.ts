import { TRIP, type TripWindow } from "../data/trip";
import { dayDiff, prettyDate } from "./dates";

export type TripState = "before" | "in-window" | "between" | "after";

export type TripDay = {
  state: TripState;
  /** ISO date string YYYY-MM-DD for "today" in the trip's local timezone (US/Eastern). */
  todayISO: string;
  /** Pretty-printed today, e.g. "mon jun 8". */
  todayLabel: string;
  /** Active or upcoming window. Null only when state === "after". */
  window: TripWindow | null;
  /** 1-indexed day number within the current window, or null if outside. */
  dayInWindow: number | null;
  /** Total days in the current window. */
  windowLength: number | null;
  /** Days until window.start (negative if in or past window). */
  daysUntilStart: number;
};

/** Skaneateles is US/Eastern. Render dates in that zone, not the server's. */
const TZ = "America/New_York";

function todayInTZ(now: Date): string {
  // en-CA gives YYYY-MM-DD out of the box.
  return now.toLocaleDateString("en-CA", { timeZone: TZ });
}

export function getTripDay(now: Date = new Date()): TripDay {
  const todayISO = todayInTZ(now);
  const todayLabel = prettyDate(todayISO);
  const windows = TRIP.windows;

  // Active window: today falls within start..end inclusive.
  const active = windows.find((w) => todayISO >= w.start && todayISO <= w.end);
  if (active) {
    return {
      state: "in-window",
      todayISO,
      todayLabel,
      window: active,
      dayInWindow: dayDiff(todayISO, active.start) + 1,
      windowLength: dayDiff(active.end, active.start) + 1,
      daysUntilStart: 0,
    };
  }

  // Next upcoming window.
  const upcoming = windows.find((w) => todayISO < w.start);
  if (upcoming) {
    const isBeforeAny = windows.every((w) => todayISO < w.start);
    return {
      state: isBeforeAny ? "before" : "between",
      todayISO,
      todayLabel,
      window: upcoming,
      dayInWindow: null,
      windowLength: dayDiff(upcoming.end, upcoming.start) + 1,
      daysUntilStart: dayDiff(upcoming.start, todayISO),
    };
  }

  // Past all windows.
  return {
    state: "after",
    todayISO,
    todayLabel,
    window: null,
    dayInWindow: null,
    windowLength: null,
    daysUntilStart: 0,
  };
}
