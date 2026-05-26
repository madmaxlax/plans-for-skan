import Link from "next/link";
import { CloudRain } from "lucide-react";
import type { Tomorrow, WeekItem } from "@/app/lib/looking-ahead";
import type { RainyPick } from "@/app/data/rainy-picks";

const ACCENT_DOT: Record<string, string> = {
  coral:  "bg-coral",
  lake:   "bg-lake",
  forest: "bg-forest",
  tan:    "bg-muted-tan",
};

export default function LookingAheadRail({
  tomorrow,
  thisWeek,
  rainyPicks,
  preTrip = false,
}: {
  tomorrow: Tomorrow;
  thisWeek: WeekItem[];
  rainyPicks: RainyPick[];
  /** If true, the rail is showing future trip days rather than literal tomorrow/this-week. */
  preTrip?: boolean;
}) {
  const tomorrowHeading = preTrip ? "Next planned" : "Tomorrow";
  const weekHeading     = preTrip ? "Coming up"   : "This week";
  return (
    <aside className="flex flex-col gap-4 md:w-[300px] shrink-0">
      <p className="font-serif italic text-sm text-muted-tan">looking ahead</p>

      {/* Tomorrow */}
      <div className="rounded-md bg-white border border-cream-400 p-5">
        <div className="flex justify-between items-baseline mb-3">
          <h3 className="font-serif text-[20px] text-ink">{tomorrowHeading}</h3>
          <span className="font-sans italic text-[11px] text-muted-tan">{tomorrow?.label ?? "—"}</span>
        </div>
        {tomorrow ? (
          <ul className="space-y-2.5">
            {tomorrow.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${ACCENT_DOT[item.accent] ?? "bg-muted-tan"}`} />
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-sm text-ink truncate">{item.label}</div>
                  <div className="font-sans italic text-[10px] text-muted-tan truncate">{item.sub}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-serif italic text-sm text-muted-tan">nothing planned yet</p>
        )}
      </div>

      {/* This week */}
      <div className="rounded-md bg-white border border-cream-400 p-5">
        <h3 className="font-serif text-[20px] text-ink mb-3">{weekHeading}</h3>
        {thisWeek.length === 0 ? (
          <p className="font-serif italic text-sm text-muted-tan">no upcoming days planned</p>
        ) : (
          <ul className="space-y-2.5">
            {thisWeek.map((w) => (
              <li key={w.dateISO} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-9 h-6 rounded bg-ink text-cream-100 text-[9px] font-bold tracking-wider">
                  {w.dow}
                </span>
                <span className="flex-1 min-w-0 font-sans text-[12px] text-ink truncate">{w.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* If it rains */}
      <div className="rounded-md bg-cream-200 border border-cream-400 p-5">
        <div className="flex items-center gap-2 mb-3">
          <CloudRain className="w-4 h-4 text-muted-slate" />
          <h3 className="font-serif italic text-[18px] text-muted-slate">If it rains</h3>
        </div>
        <ul className="space-y-2">
          {rainyPicks.map((p) => (
            <li key={p.label}>
              <Link href={p.href} className="flex items-center gap-2 group">
                <span className="text-muted-tan text-sm">·</span>
                <span className="font-sans italic text-[12px] text-muted-slate group-hover:text-ink truncate">
                  {p.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
