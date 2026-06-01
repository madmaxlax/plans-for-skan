import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";
import { prettyDate, prettyMonthDay, dayDiff } from "@/app/lib/dates";
import type { Booking, DatedEvent, Recurring, ScheduleAccent } from "@/app/data/schedule";

const ACCENT_DOT: Record<ScheduleAccent, string> = {
  coral:  "bg-coral",
  lake:   "bg-lake",
  forest: "bg-forest",
  tan:    "bg-muted-tan",
};

export type AnchorPreview = {
  dateISO: string;
  title: string;
  meta: string;
  status?: "confirmed" | "considering";
  accent: ScheduleAccent;
};

export type WeekRow = {
  dateISO: string;
  title: string;
  time: string;
  accent: ScheduleAccent;
};

export default function ScheduleHighlights({
  todayISO,
  nextAnchor,
  weekItems,
}: {
  todayISO: string;
  nextAnchor: AnchorPreview | null;
  weekItems: WeekRow[];
}) {
  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-3.5">
          <h2 className="font-serif text-[28px] leading-none text-ink">schedule</h2>
          <span className="font-serif italic text-sm text-muted-tan">anchors + the next 7 days</span>
        </div>
        <Link
          href="/schedule"
          className="font-sans text-[11px] italic text-coral inline-flex items-center gap-1"
        >
          full schedule <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Next anchor */}
        <div className="rounded-md bg-white border border-cream-400 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CalendarClock className="w-4 h-4 text-coral" />
            <h3 className="font-serif text-[18px] text-ink">Next anchor</h3>
          </div>
          {nextAnchor ? (
            <div>
              <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                nextAnchor.status === "considering"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-coral/10 text-coral"
              }`}>
                {nextAnchor.status ?? "event"}
                {" · "}
                {countdownLabel(todayISO, nextAnchor.dateISO)}
              </div>
              <div className="font-serif text-[22px] text-ink mt-2 leading-tight">{nextAnchor.title}</div>
              <div className="font-sans italic text-[12px] text-muted-tan mt-1">{nextAnchor.meta}</div>
              <div className="font-sans text-[11px] text-muted-slate mt-1">{prettyDate(nextAnchor.dateISO)}</div>
            </div>
          ) : (
            <p className="font-serif italic text-sm text-muted-tan">nothing anchored ahead</p>
          )}
        </div>

        {/* This week */}
        <div className="rounded-md bg-white border border-cream-400 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-[18px] text-ink">This week</h3>
            <span className="font-sans italic text-[11px] text-muted-tan">7-day rolling</span>
          </div>
          {weekItems.length === 0 ? (
            <p className="font-serif italic text-sm text-muted-tan">no scheduled items this week</p>
          ) : (
            <ul className="space-y-1.5">
              {weekItems.map((row, i) => (
                <li key={`${row.dateISO}-${i}`} className="flex items-baseline gap-2.5 text-[12px]">
                  <span className="font-mono text-[10px] text-muted-tan w-10 shrink-0">
                    {prettyMonthDay(row.dateISO).replace(/^\w+ /, "")}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ACCENT_DOT[row.accent]}`} />
                  <span className="flex-1 min-w-0 truncate text-ink">{row.title}</span>
                  <span className="font-sans italic text-[10px] text-muted-tan shrink-0">{row.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function countdownLabel(todayISO: string, targetISO: string): string {
  const d = dayDiff(targetISO, todayISO);
  if (d === 0) return "today";
  if (d === 1) return "tomorrow";
  if (d < 0) return `${-d} day${d === -1 ? "" : "s"} in`;
  return `${d} days out`;
}

// ─── Server helpers ──────────────────────────────────────────────────────────

// Building the preview shapes happens server-side in app/page.tsx — see buildScheduleHighlights below.
export function buildAnchorPreview(item: Booking | DatedEvent, dateISO: string): AnchorPreview {
  const isBooking = item.kind === "booking";
  const time = ("timeStart" in item && item.timeStart)
    ? `${item.timeStart}${item.timeEnd ? `–${item.timeEnd}` : ""}`
    : "all day";
  const loc = item.location ?? "";
  return {
    dateISO,
    title: item.title,
    meta: [time, loc].filter(Boolean).join(" · "),
    status: isBooking ? (item as Booking).status : undefined,
    accent: item.accent ?? "coral",
  };
}

export function buildWeekRow(dateISO: string, item: Booking | DatedEvent | Recurring): WeekRow {
  const time = ("timeStart" in item && item.timeStart)
    ? item.timeStart
    : "anytime";
  return {
    dateISO,
    title: item.title,
    time,
    accent: item.accent ?? "tan",
  };
}
