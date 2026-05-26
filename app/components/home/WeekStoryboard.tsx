import type { StoryDay } from "@/app/lib/storyboard";
import { prettyMonthDay } from "@/app/lib/dates";

type DayTone = "today" | "past" | "off" | "future";

const DAY_STYLES: Record<DayTone, {
  card: string; dow: string; num: string; rule: string; slotKey: string; slotValue: string;
}> = {
  today: {
    card: "bg-coral border-coral",
    dow: "text-cream-200",
    num: "text-white",
    rule: "bg-white",
    slotKey: "text-cream-200",
    slotValue: "text-white",
  },
  past: {
    card: "bg-cream-200 border-cream-400",
    dow: "text-cream-500",
    num: "text-cream-500",
    rule: "bg-coral",
    slotKey: "text-cream-500",
    slotValue: "text-cream-500",
  },
  off: {
    card: "bg-cream-100 border-cream-300/60 opacity-60",
    dow: "text-muted-tan",
    num: "text-ink",
    rule: "bg-coral",
    slotKey: "text-muted-tan",
    slotValue: "text-ink",
  },
  future: {
    card: "bg-white border-cream-400",
    dow: "text-muted-tan",
    num: "text-ink",
    rule: "bg-coral",
    slotKey: "text-muted-tan",
    slotValue: "text-ink",
  },
};

function dayTone(d: StoryDay): DayTone {
  if (d.isToday) return "today";
  if (d.isPast) return "past";
  if (!d.isInWindow) return "off";
  return "future";
}

function dateRangeLabel(days: StoryDay[]): string {
  if (days.length === 0) return "";
  const first = days[0].dateISO;
  const last = days[days.length - 1].dateISO;
  return `${prettyMonthDay(first)} — ${prettyMonthDay(last)}`;
}

function DayCard({ d }: { d: StoryDay }) {
  const s = DAY_STYLES[dayTone(d)];
  return (
    <article className={`flex-1 min-w-0 h-[200px] rounded-md px-3 py-3.5 flex flex-col gap-2 border ${s.card}`}>
      <div className={`text-[9px] font-bold tracking-[0.15em] uppercase ${s.dow}`}>{d.dow}</div>
      <div className={`font-serif text-[42px] leading-[0.9] ${s.num}`}>{d.num}</div>
      <div className={`w-[18px] h-[2px] ${s.rule}`} />

      <div className="flex flex-col gap-1 min-w-0">
        {(["am", "pm", "eve"] as const).map((slot) => (
          <div key={slot} className="min-w-0">
            <div className={`text-[8px] font-bold tracking-[0.15em] ${s.slotKey}`}>{slot}</div>
            <div className={`font-serif italic text-[11px] leading-tight ${s.slotValue} truncate`}>
              {d[slot] ?? "—"}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2.5 h-2.5 rounded-sm ${swatch}`} />
      <span className="font-sans italic text-[10px] text-muted-tan">{label}</span>
    </div>
  );
}

export default function WeekStoryboard({ days }: { days: StoryDay[] }) {
  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-3.5">
          <h2 className="font-serif text-[36px] leading-none text-ink">the week</h2>
          <span className="font-serif italic text-sm text-muted-tan">{dateRangeLabel(days)}</span>
        </div>
        <div className="hidden md:flex items-center gap-3.5">
          <Legend swatch="bg-cream-200" label="past" />
          <Legend swatch="bg-coral"     label="today" />
          <Legend swatch="bg-white border border-cream-500" label="upcoming" />
        </div>
      </div>

      <div className="flex gap-2 items-stretch overflow-x-auto">
        {days.map((d) => <DayCard key={d.dateISO} d={d} />)}
      </div>
    </section>
  );
}
