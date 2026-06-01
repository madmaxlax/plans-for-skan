import {
  Calendar,
  Clock,
  MapPin,
  Pin,
  CalendarClock,
  Repeat,
  Sparkles,
  Dumbbell,
  ExternalLink,
} from "lucide-react";
import Card from "@/app/components/Card";
import SectionHeader from "@/app/components/SectionHeader";
import { Badge } from "@/app/components/Badges";
import { TRIP } from "@/app/data/trip";
import {
  BOOKINGS,
  DATED_EVENTS,
  RECURRING,
  ANYTIME,
  itemsByDateRange,
  timeKey,
  type Booking,
  type DatedEvent,
  type Recurring,
  type Anytime,
  type ScheduleCategory,
  type ScheduleAccent,
  type Weekday,
} from "@/app/data/schedule";
import { SCC_CLASSES, sccClassesOnDate } from "@/app/data/scc-classes";
import { prettyDate, prettyMonthDay, dowShort } from "@/app/lib/dates";

export const metadata = { title: "Schedule · Skaneateles 2026" };

const DOW_ORDER: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const DOW_LABEL: Record<Weekday, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

const ACCENT_DOT: Record<ScheduleAccent, string> = {
  coral:  "bg-rose-400",
  lake:   "bg-sky-400",
  forest: "bg-emerald-400",
  tan:    "bg-amber-400",
};

const CAT_LABEL: Record<ScheduleCategory, string> = {
  booking:       "booking",
  sports:        "sports",
  toddler:       "egan",
  lake:          "lake",
  "food-drink":  "food/drink",
  "music-events":"music",
  outdoors:      "outdoors",
  scc:           "SCC",
};

export default function SchedulePage() {
  return (
    <div className="space-y-8 pb-12">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-sky-100 rounded-lg">
            <Calendar className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Schedule</h1>
            <p className="text-sm text-slate-500">
              Anchors → daily view → recurring weekly → anytime fillers.
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-3">
          {TRIP.windows.map((w, i) => (
            <span key={w.start}>
              {i > 0 && <span className="mx-2 text-slate-300">·</span>}
              <span className="font-medium text-slate-600">{w.label}:</span>{" "}
              {prettyMonthDay(w.start)} → {prettyMonthDay(w.end)}
            </span>
          ))}
        </div>
      </header>

      <Anchors />
      <DailyView />
      <WeeklyRecurring />
      <SccClassesSection />
      <AnytimeOptions />
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Anchors() {
  const sorted = [...BOOKINGS].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const datedSorted = [...DATED_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section>
      <SectionHeader icon={Pin} title="Anchors" subtitle="Confirmed commitments + one-off dated events" />
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((b) => (
          <Card key={b.id} accent={b.status === "confirmed" ? "green" : "yellow"}>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-slate-800 text-sm leading-tight">{b.title}</h3>
              <Badge
                label={b.status === "confirmed" ? "confirmed" : "considering"}
                variant={b.status === "confirmed" ? "easy" : "warning"}
              />
            </div>
            <div className="text-xs text-slate-600 space-y-0.5">
              <DateLine startDate={b.startDate} endDate={b.endDate} daysOfWeek={b.daysOfWeek} />
              {b.timeStart && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {b.timeStart}{b.timeEnd ? ` – ${b.timeEnd}` : ""}
                </div>
              )}
              {b.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {b.location}
                </div>
              )}
            </div>
            {b.notes && <p className="text-xs text-slate-500 italic mt-1.5">{b.notes}</p>}
          </Card>
        ))}
        {datedSorted.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-slate-800 text-sm leading-tight">{d.title}</h3>
              <Badge label={CAT_LABEL[d.category]} />
            </div>
            <div className="text-xs text-slate-600 space-y-0.5">
              <DateLine startDate={d.date} endDate={d.endDate} />
              {d.timeStart && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {d.timeStart}{d.timeEnd ? ` – ${d.timeEnd}` : ""}
                </div>
              )}
              {d.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {d.location}
                </div>
              )}
              {d.link && (
                <a href={d.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sky-600 hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  link
                </a>
              )}
            </div>
            {d.notes && <p className="text-xs text-slate-500 italic mt-1.5">{d.notes}</p>}
          </Card>
        ))}
      </div>
    </section>
  );
}

function DailyView() {
  // Render across both trip windows.
  const days: { dateISO: string; items: (Booking | DatedEvent | Recurring)[] }[] = [];
  for (const w of TRIP.windows) {
    days.push(...itemsByDateRange(w.start, w.end));
  }

  return (
    <section>
      <SectionHeader icon={CalendarClock} title="Day by day" subtitle="What's happening on each day of the trip" />
      <div className="space-y-3">
        {days.map(({ dateISO, items }) => {
          const sccCount = sccClassesOnDate(dateISO).length;
          return (
            <div key={dateISO} className="bg-white rounded-xl border border-slate-100 p-4">
              <div className="flex items-baseline justify-between mb-2 pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-sm">{prettyDate(dateISO)}</h3>
                <span className="text-[10px] text-slate-400 italic">
                  {items.length === 0 ? "open day" : `${items.length} item${items.length === 1 ? "" : "s"}`}
                  {sccCount ? ` · ${sccCount} SCC classes` : ""}
                </span>
              </div>
              {items.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No scheduled items — pick from anytime options below.</p>
              ) : (
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-start gap-2.5 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${ACCENT_DOT[item.accent ?? "tan"]}`} />
                      <span className="text-slate-500 font-mono text-[10px] w-20 shrink-0 mt-0.5">
                        {"timeStart" in item && item.timeStart ? item.timeStart : "anytime"}
                      </span>
                      <span className="flex-1">
                        <span className="text-slate-800">{item.title}</span>
                        {item.location && (
                          <span className="text-slate-400"> · {item.location}</span>
                        )}
                        {item.kind === "booking" && (
                          <span className="ml-1.5 text-[10px] text-emerald-600 font-medium">
                            {item.status === "confirmed" ? "✓ booked" : "considering"}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WeeklyRecurring() {
  // Group by weekday, sort by time.
  const byDow: Record<Weekday, Recurring[]> = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
  for (const r of RECURRING) {
    for (const dow of r.daysOfWeek) byDow[dow].push(r);
  }
  for (const dow of DOW_ORDER) {
    byDow[dow].sort((a, b) => timeKey(a.timeStart) - timeKey(b.timeStart));
  }

  return (
    <section>
      <SectionHeader icon={Repeat} title="Weekly recurring" subtitle="Same thing every week — pick days that fit" />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {DOW_ORDER.map((dow) => (
          <div key={dow} className="bg-white rounded-xl border border-slate-100 p-3">
            <div className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-2 pb-1.5 border-b border-slate-100">
              {DOW_LABEL[dow]}
            </div>
            {byDow[dow].length === 0 ? (
              <p className="text-[11px] text-slate-300 italic">—</p>
            ) : (
              <ul className="space-y-1.5">
                {byDow[dow].map((r) => (
                  <li key={`${dow}-${r.id}`} className="flex items-start gap-2 text-[11px]">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${ACCENT_DOT[r.accent ?? "tan"]}`} />
                    <div className="flex-1">
                      {r.timeStart && (
                        <span className="text-slate-500 font-mono">
                          {r.timeStart}{r.timeEnd ? `–${r.timeEnd}` : ""}{" "}
                        </span>
                      )}
                      <span className="text-slate-700">{r.title}</span>
                      {r.location && <span className="text-slate-400"> · {r.location}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function SccClassesSection() {
  const range = SCC_CLASSES.dateRange;
  return (
    <section>
      <SectionHeader
        icon={Dumbbell}
        title="SCC fitness classes"
        subtitle={
          range
            ? `${SCC_CLASSES.count} classes · ${prettyMonthDay(range.start)} → ${prettyMonthDay(range.end)}`
            : "Run scripts/fetch-scc-classes.mjs to populate"
        }
      />
      {SCC_CLASSES.count === 0 ? (
        <Card>
          <p className="text-xs text-slate-500">
            No SCC class data yet. Run{" "}
            <code className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">
              SCC_COOKIE=&apos;...&apos; node scripts/fetch-scc-classes.mjs
            </code>{" "}
            to populate.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {Object.entries(groupSccByDate(SCC_CLASSES.classes)).map(([dateISO, classes]) => (
            <div key={dateISO} className="bg-white rounded-xl border border-slate-100 p-4">
              <div className="font-bold text-slate-800 text-sm mb-2 pb-2 border-b border-slate-100">
                {prettyDate(dateISO)}
              </div>
              <ul className="space-y-1">
                {classes.map((c, i) => (
                  <li key={i} className="flex items-baseline gap-3 text-xs">
                    <span className="text-slate-500 font-mono text-[10px] w-32 shrink-0">
                      {c.timeStart}–{c.timeEnd}
                    </span>
                    <span className="flex-1 text-slate-700">{c.title}</span>
                    {c.instructor && c.instructor !== "N/A" && (
                      <span className="text-[10px] text-slate-400 italic">{c.instructor}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-slate-400 italic mt-2">
        Snapshot fetched {SCC_CLASSES.fetchedAt ? new Date(SCC_CLASSES.fetchedAt).toLocaleString("en-US") : "n/a"}.
        Re-run the script with fresh cookies to refresh.
      </p>
    </section>
  );
}

function AnytimeOptions() {
  // Group by category for scanning.
  const groups = new Map<ScheduleCategory, Anytime[]>();
  for (const a of ANYTIME) {
    if (!groups.has(a.category)) groups.set(a.category, []);
    groups.get(a.category)!.push(a);
  }

  return (
    <section>
      <SectionHeader icon={Sparkles} title="Anytime fillers" subtitle="No fixed time — slot in around the anchors" />
      <div className="grid gap-3 md:grid-cols-2">
        {Array.from(groups.entries()).map(([cat, items]) => (
          <Card key={cat}>
            <div className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-2">{CAT_LABEL[cat]}</div>
            <ul className="space-y-1.5">
              {items.map((a) => (
                <li key={a.id} className="text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-slate-800">{a.title}</span>
                    {a.hours && <span className="text-[10px] text-slate-400 italic">{a.hours}</span>}
                  </div>
                  {a.notes && <div className="text-[11px] text-slate-500 italic">{a.notes}</div>}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ─── Bits ────────────────────────────────────────────────────────────────────

function DateLine({ startDate, endDate, daysOfWeek }: { startDate: string; endDate?: string; daysOfWeek?: Weekday[] }) {
  const single = !endDate || endDate === startDate;
  return (
    <div className="flex items-center gap-1.5">
      <Calendar className="w-3 h-3 text-slate-400" />
      {single ? (
        prettyDate(startDate)
      ) : (
        <>
          {prettyMonthDay(startDate)} → {prettyMonthDay(endDate!)}
          {daysOfWeek && (
            <span className="text-[10px] text-slate-400 ml-1">
              ({daysOfWeek.map((d) => DOW_LABEL[d]).join("·")})
            </span>
          )}
        </>
      )}
    </div>
  );
}

function groupSccByDate(classes: typeof SCC_CLASSES.classes): Record<string, typeof SCC_CLASSES.classes> {
  const out: Record<string, typeof SCC_CLASSES.classes> = {};
  for (const c of classes) {
    (out[c.date] = out[c.date] || []).push(c);
  }
  return out;
}
