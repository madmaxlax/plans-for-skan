import Link from "next/link";
import { TRIP } from "@/app/data/trip";
import type { TripDay } from "@/app/lib/today";

const NAV = [
  { href: "/",          label: "Today" },
  { href: "/food",      label: "Food" },
  { href: "/lake",      label: "Lake" },
  { href: "/outdoors",  label: "Hikes" },
  { href: "/toddler",   label: "Egan" },
  { href: "/rainy-day", label: "Rainy" },
  { href: "/day-trips", label: "Day Trips" },
];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function dayPillContent(t: TripDay): string {
  if (t.state === "in-window" && t.dayInWindow && t.windowLength) {
    return `DAY ${pad2(t.dayInWindow)} / ${pad2(t.windowLength)}`;
  }
  if (t.state === "before" || t.state === "between") {
    if (t.daysUntilStart === 0) return "STARTS TODAY";
    if (t.daysUntilStart === 1) return "STARTS TOMORROW";
    return `T-${t.daysUntilStart} DAYS`;
  }
  return "TRIP CLOSED";
}

export default function HomeHeader({ tripDay }: { tripDay: TripDay }) {
  return (
    <header className="flex items-center justify-between px-6 md:px-14 h-20 border-b border-cream-300/60">
      <div className="flex flex-col">
        <Link href="/" className="font-serif text-2xl text-ink leading-none">{TRIP.title}</Link>
        <span className="font-sans italic text-[10px] tracking-[0.12em] text-muted-tan mt-1">
          {TRIP.subtitle}
        </span>
      </div>

      <nav className="hidden md:flex gap-7 items-center">
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`font-serif text-sm transition-colors ${
              href === "/" ? "text-coral" : "text-ink hover:text-coral"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-cream-100">
        <span className="font-sans text-[10px] font-bold tracking-[0.18em]">
          {dayPillContent(tripDay)}
        </span>
        <span className="text-muted-tan">·</span>
        <span className="font-serif italic text-[13px]">{tripDay.todayLabel}</span>
      </div>
    </header>
  );
}
