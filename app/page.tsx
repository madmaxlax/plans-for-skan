import Link from "next/link";
import {
  UtensilsCrossed,
  Waves,
  Mountain,
  Baby,
  CloudRain,
  MapPin,
  Dumbbell,
  MapPinned,
  Calendar,
} from "lucide-react";
import WeatherWidget from "./components/WeatherWidget";
import LakeTempWidget from "./components/LakeTempWidget";
import Card from "./components/Card";

const SECTIONS = [
  { href: "/food", label: "Restaurants", desc: "Dining picks for every mood", icon: UtensilsCrossed, color: "bg-orange-50 text-orange-600" },
  { href: "/lake", label: "Lake Activities", desc: "Kayak, fish, swim & cruise", icon: Waves, color: "bg-sky-50 text-sky-600" },
  { href: "/outdoors", label: "Hikes & Outdoors", desc: "Waterfalls, trails & parks", icon: Mountain, color: "bg-emerald-50 text-emerald-600" },
  { href: "/toddler", label: "Egan's Picks", desc: "Toddler-friendly fun for Egan", icon: Baby, color: "bg-pink-50 text-pink-600" },
  { href: "/rainy-day", label: "Rainy Day", desc: "Indoor activities & museums", icon: CloudRain, color: "bg-indigo-50 text-indigo-600" },
  { href: "/day-trips", label: "Day Trips", desc: "Auburn, Ithaca & beyond", icon: MapPin, color: "bg-purple-50 text-purple-600" },
  { href: "/sports", label: "Sports & Rec", desc: "Golf, pickleball & leagues", icon: Dumbbell, color: "bg-red-50 text-red-600" },
];

const QUICK_TIPS = [
  "Doug's Fish Fry — don't leave without it",
  "Carpenter Falls: arrive by 8am on weekends (~12 spots)",
  "Tinker Falls: you walk BEHIND the waterfall",
  "Taughannock Falls: 215ft — tallest east of the Rockies",
  "Egan gets into Rosamond Gifford Zoo free (under 2)",
  "Owasco Splash Pad: FREE, opens mid-June in Auburn",
  "Pontoon rental: book 4–6 weeks ahead for June weekends",
  "Mid-Lakes Navigation lunch cruise: book in advance — sells out",
];

export default function HomePage() {
  return (
    <div className="space-y-5 py-2 pb-6">
      {/* Hero */}
      <div className="text-center pt-2">
        <h1 className="text-2xl font-bold text-slate-800">Skaneateles 2026</h1>
        <p className="text-slate-500 text-sm mt-1">June vacation guide for Max, Claire & Egan</p>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-slate-500">
          <MapPinned className="w-3.5 h-3.5" />
          <span>1557 Red Tail Ln · Skaneateles, NY</span>
        </div>
      </div>

      {/* Weather + Lake Temp */}
      <div className="grid grid-cols-2 gap-3">
        <WeatherWidget />
        <LakeTempWidget />
      </div>

      {/* June note */}
      <Card className="flex items-start gap-3">
        <Calendar className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold text-slate-700 text-sm">June timing notes</div>
          <ul className="text-xs text-slate-500 mt-1 space-y-0.5">
            <li>Clift Park beach: lifeguards start late June</li>
            <li>Mid-Lakes lunch cruise: starts June 1</li>
            <li>Owasco Splash Pad: opens mid-June</li>
            <li>Bass fishing: catch-and-release until ~June 15</li>
          </ul>
        </div>
      </Card>

      {/* Section nav grid */}
      <div>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Explore</h2>
        <div className="grid grid-cols-2 gap-3">
          {SECTIONS.map(({ href, label, desc, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3.5 hover:shadow-md transition-shadow active:scale-95">
                <div className={`inline-flex p-2 rounded-lg ${color} mb-2`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-semibold text-slate-800 text-sm leading-tight">{label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick tips */}
      <div>
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Tips</h2>
        <div className="space-y-2">
          {QUICK_TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg border border-slate-100 p-3 shadow-sm">
              <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-slate-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
