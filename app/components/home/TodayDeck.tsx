import {
  Sun, UtensilsCrossed, Flame, Mountain, Waves, Ship, Wine, Baby, Store, Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Deck, DeckSlot, SlotKey } from "@/app/data/today-deck";

const ICONS: Record<DeckSlot["icon"], LucideIcon> = {
  sun: Sun,
  utensils: UtensilsCrossed,
  flame: Flame,
  mountain: Mountain,
  waves: Waves,
  ship: Ship,
  wine: Wine,
  baby: Baby,
  store: Store,
};

const ACCENT: Record<DeckSlot["accent"], { rule: string; text: string; bg: string; chip: string }> = {
  coral:  { rule: "bg-coral",     text: "text-coral",     bg: "bg-coral/10",     chip: "bg-coral/10  text-coral" },
  lake:   { rule: "bg-lake",      text: "text-lake",      bg: "bg-lake/10",      chip: "bg-lake/10   text-lake" },
  forest: { rule: "bg-forest",    text: "text-forest",    bg: "bg-forest/10",    chip: "bg-forest/10 text-forest" },
  tan:    { rule: "bg-muted-tan", text: "text-muted-tan", bg: "bg-cream-200",    chip: "bg-cream-200 text-muted-tan" },
};

const SLOT_TAGS: Record<SlotKey, string> = {
  morning: "MORNING",
  afternoon: "AFTERNOON",
  evening: "EVENING",
};

function DeckCard({ slot, kind }: { slot: DeckSlot; kind: SlotKey }) {
  const Icon = ICONS[slot.icon];
  const a = ACCENT[slot.accent];
  return (
    <article className="flex-1 flex flex-col gap-3.5 rounded-md bg-white border border-cream-400 p-5 shadow-[0_4px_14px_-4px_rgba(30,58,95,0.10)]">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-[3px] ${a.rule}`} />
          <span className={`text-[10px] font-bold tracking-[0.2em] ${a.text}`}>{SLOT_TAGS[kind]}</span>
        </div>
        <div className={`w-9 h-9 rounded-full ${a.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${a.text}`} />
        </div>
      </header>

      <p className="font-serif italic text-sm text-muted-tan">{slot.time}</p>
      <h3 className="font-serif text-[24px] leading-tight text-ink">{slot.title}</h3>
      <p className="text-[13px] leading-[1.55] text-muted-slate-deep">{slot.body}</p>

      <div className="h-px bg-cream-300" />

      <footer className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold tracking-[0.1em] text-muted-tan">{slot.meta}</span>
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] italic font-medium ${a.chip}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${a.rule}`} />
          {slot.status}
        </span>
      </footer>
    </article>
  );
}

export default function TodayDeck({ deck, label }: { deck: Deck; label: string }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-serif italic text-[16px] text-muted-tan">on deck</p>
          <h2 className="font-serif text-[48px] leading-none text-ink">{label}</h2>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-full bg-coral/15 px-3 py-1.5">
          <Sparkles className="w-3 h-3 text-coral" />
          <span className="font-sans italic text-[11px] text-coral-deep">picked for these conditions</span>
        </div>
      </div>

      <div className="h-px bg-cream-300" />

      <div className="flex flex-col md:flex-row gap-3.5">
        <DeckCard slot={deck.morning}   kind="morning" />
        <DeckCard slot={deck.afternoon} kind="afternoon" />
        <DeckCard slot={deck.evening}   kind="evening" />
      </div>
    </section>
  );
}
