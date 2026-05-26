/**
 * Shared date helpers for ISO date strings (YYYY-MM-DD).
 *
 * All dates in the app are handled as ISO strings in US/Eastern (the trip's TZ).
 * We deliberately avoid Date-object math except inside these helpers — string
 * comparison works correctly for YYYY-MM-DD and avoids TZ drift.
 */

const MS_PER_DAY = 86_400_000;

/** Parse a YYYY-MM-DD ISO date into a UTC-anchored Date (midnight UTC). */
export function isoToUTCDate(dateISO: string): Date {
  const [y, m, d] = dateISO.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Add `days` to a YYYY-MM-DD ISO date and return a new YYYY-MM-DD string. */
export function shiftISO(dateISO: string, days: number): string {
  const t = isoToUTCDate(dateISO).getTime() + days * MS_PER_DAY;
  return new Date(t).toISOString().slice(0, 10);
}

/** Difference (a - b) in whole days. */
export function dayDiff(aISO: string, bISO: string): number {
  return Math.round((isoToUTCDate(aISO).getTime() - isoToUTCDate(bISO).getTime()) / MS_PER_DAY);
}

/** "mon" — lowercase short weekday. */
export function dowShort(dateISO: string): string {
  return isoToUTCDate(dateISO)
    .toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short" })
    .toLowerCase();
}

/** "MON" — uppercase short weekday. */
export function dowUpper(dateISO: string): string {
  return dowShort(dateISO).toUpperCase();
}

/** "mon jun 8" — lowercase weekday + month + day. */
export function prettyDate(dateISO: string): string {
  return isoToUTCDate(dateISO)
    .toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" })
    .toLowerCase();
}

/** "jun 8" — lowercase month + day (no weekday). */
export function prettyMonthDay(dateISO: string): string {
  return isoToUTCDate(dateISO)
    .toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric" })
    .toLowerCase();
}
