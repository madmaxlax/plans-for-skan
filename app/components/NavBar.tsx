"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  Waves,
  Mountain,
  Baby,
  CloudRain,
  MapPin,
  Dumbbell,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/food", label: "Food", icon: UtensilsCrossed },
  { href: "/lake", label: "Lake", icon: Waves },
  { href: "/outdoors", label: "Hikes", icon: Mountain },
  { href: "/toddler", label: "Egan", icon: Baby },
  { href: "/rainy-day", label: "Rainy", icon: CloudRain },
  { href: "/day-trips", label: "Trips", icon: MapPin },
  { href: "/sports", label: "Sports", icon: Dumbbell },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            <span className="text-sky-700 font-bold text-sm mr-2 whitespace-nowrap">Skaneateles 2026</span>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "bg-sky-100 text-sky-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200">
        <div className="grid grid-cols-8 h-14">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
                  active ? "text-sky-600" : "text-slate-500"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-sky-600" : "text-slate-400"}`} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
