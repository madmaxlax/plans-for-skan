import data from "@/data/scc-classes.json";

export type SccClass = {
  date: string;        // YYYY-MM-DD
  timeStart: string;   // "07:15am"
  timeEnd: string;     // "08:00am"
  title: string;
  facility: string;
  instructor: string;
  status: string;      // "now" | "closed" | etc.
};

export type SccClasses = {
  fetchedAt: string;
  dateRange: { start: string; end: string } | null;
  count: number;
  classes: SccClass[];
};

export const SCC_CLASSES = data as SccClasses;

export function sccClassesOnDate(dateISO: string): SccClass[] {
  return SCC_CLASSES.classes.filter((c) => c.date === dateISO);
}
