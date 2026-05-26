import { Sunset, Store, Baby, type LucideIcon } from "lucide-react";

type Chip = {
  label: string;
  big: string;
  sub: string;
  Icon: LucideIcon;
  iconClass: string;
};

const CHIPS: Chip[] = [
  { label: "SUNSET",     big: "8:43p", sub: "long daylight",          Icon: Sunset, iconClass: "text-muted-tan-light" },
  { label: "OPEN NOW",   big: "12",    sub: "fish frys, parks, shops", Icon: Store,  iconClass: "text-forest" },
  { label: "EGAN'S NAP", big: "1—3p",  sub: "window today",            Icon: Baby,   iconClass: "text-coral-deep" },
];

export default function StatusChips({ sunsetLabel }: { sunsetLabel?: string }) {
  const chips = CHIPS.map((c) => (c.label === "SUNSET" && sunsetLabel ? { ...c, big: sunsetLabel } : c));
  return (
    <div className="flex flex-col md:flex-row gap-2.5">
      {chips.map((c) => (
        <div key={c.label} className="flex-1 flex items-center gap-3.5 rounded-md bg-white border border-cream-400 px-4 py-3.5">
          <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
            <c.Icon className={`w-[18px] h-[18px] ${c.iconClass}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-end justify-between gap-2">
              <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-tan">{c.label}</div>
              <div className="font-serif text-[22px] leading-none text-ink">{c.big}</div>
            </div>
            <div className="font-sans italic text-[11px] text-muted-tan truncate">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
