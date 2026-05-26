import Link from "next/link";
import {
  UtensilsCrossed, Waves, Mountain, Baby, CloudRain, MapPin, Dumbbell,
  type LucideIcon,
} from "lucide-react";
import { CHAPTERS, type Chapter } from "@/app/data/chapters";

const ICONS: Record<Chapter["icon"], LucideIcon> = {
  utensils: UtensilsCrossed,
  waves: Waves,
  mountain: Mountain,
  baby: Baby,
  "cloud-rain": CloudRain,
  "map-pin": MapPin,
  dumbbell: Dumbbell,
};

const ACCENT: Record<Chapter["accent"], string> = {
  coral:  "text-coral",
  lake:   "text-lake",
  forest: "text-forest",
  tan:    "text-muted-tan-light",
  slate:  "text-muted-slate",
  rust:   "text-coral-deep",
};

export default function GuideTiles() {
  return (
    <section className="flex flex-col gap-3.5">
      <header className="flex items-center gap-4">
        <h2 className="font-serif italic text-[18px] text-muted-tan">the guide</h2>
        <div className="flex-1 h-px bg-cream-500" />
        <span className="font-sans italic text-[11px] text-muted-tan">browse by chapter</span>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
        {CHAPTERS.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-md bg-white border border-cream-400 px-4 py-4 flex flex-col gap-2 hover:border-coral/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-sm text-muted-tan">{c.num}</span>
                <div className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center">
                  <Icon className={`w-3.5 h-3.5 ${ACCENT[c.accent]}`} />
                </div>
              </div>
              <div className="font-serif text-[18px] text-ink leading-tight">{c.title}</div>
              <div className="font-sans italic text-[10px] text-muted-tan leading-[1.4]">{c.sub}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
