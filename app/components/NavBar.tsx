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
  { href: "/",          label: "Home",   icon: Home },
  { href: "/food",      label: "Food",   icon: UtensilsCrossed },
  { href: "/lake",      label: "Lake",   icon: Waves },
  { href: "/outdoors",  label: "Hikes",  icon: Mountain },
  { href: "/toddler",   label: "Egan",   icon: Baby },
  { href: "/rainy-day", label: "Rainy",  icon: CloudRain },
  { href: "/day-trips", label: "Trips",  icon: MapPin },
  { href: "/sports",    label: "Sports", icon: Dumbbell },
];

export default function NavBar() {
  const pathname = usePathname();
  // Home has its own desktop header. Other routes get the slim top nav too.
  const showDesktopTop = pathname !== "/";

  return (
    <>
      {showDesktopTop && (
        <nav className="hidden md:block sticky top-0 z-50 bg-white border-b border-cream-300">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-center gap-1 py-2 overflow-x-auto">
              <span className="font-serif text-ink text-base mr-2 whitespace-nowrap">Skaneateles 2026</span>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      active ? "bg-coral/10 text-coral" : "text-ink hover:bg-cream-200"
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
      )}

      {/* Mobile bottom nav — always visible */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-cream-300">
        <div className="grid grid-cols-8 h-14">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors ${
                  active ? "text-coral" : "text-muted-tan"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-coral" : "text-muted-tan"}`} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
