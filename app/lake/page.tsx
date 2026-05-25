import {
  Waves,
  Anchor,
  Fish,
  Users,
  Phone,
  Globe,
  MapPin,
  AlertTriangle,
  CheckSquare,
  Baby,
  Sailboat,
  Ship,
} from "lucide-react";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { Badge, StarBadge } from "../components/Badges";

export default function LakePage() {
  return (
    <div className="space-y-6 py-2 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-sky-500 to-cyan-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <Waves className="w-8 h-8 text-white/80" />
          <div>
            <h1 className="text-xl font-bold">Lake Activities</h1>
            <p className="text-sky-100 text-sm">Skaneateles Lake · June 2026</p>
          </div>
        </div>
        <div className="mt-3 bg-white/20 rounded-lg p-2.5 text-sm">
          Base: 1557 Red Tail Ln — direct lake access from rental
        </div>
      </div>

      {/* Kayak / SUP Rentals */}
      <section>
        <SectionHeader icon={Anchor} title="Kayak, Canoe & SUP Rentals" />
        <div className="space-y-3">
          <Card accent="yellow">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-slate-800">Skaneateles Marina</h3>
              <StarBadge count={1} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              1938 W Lake Rd · (315) 685-6050 · skanmarina.com
            </div>
            <p className="text-sm text-slate-700 mb-2">Kayaks, canoes, SUPs (stand-up paddleboards), stand-up elliptical boards. Open 7 days/week. Dogs prohibited on all rental boats.</p>
            <div className="flex items-start gap-1.5 bg-orange-50 rounded-lg p-2">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700">Call ahead — marina will not rent if lake is choppy or windy. Safety policy.</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-bold text-slate-800 mb-1">The Sailboat Shop</h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <Phone className="w-3.5 h-3.5" />
              (315) 685-7558 · thesailboatshop.com · 4617 E Lake Rd
            </div>
            <p className="text-sm text-slate-700">Kayaks, canoes, SUPs available for pick-up or delivered to the NYS Public Boat Launch. Mon–Sat. All rentals include safety equipment.</p>
          </Card>
        </div>
        <div className="mt-2 bg-sky-50 rounded-lg p-3 text-sm text-sky-800">
          <strong>With a 2-year-old:</strong> SUP + Egan is possible on calm mornings (life jacket, sitting in front). Early morning tends to be calmest on the lake.
        </div>
      </section>

      {/* Pontoon Rentals */}
      <section>
        <SectionHeader icon={Ship} title="Pontoon & Motorboat Rentals" />
        <div className="space-y-3">
          <Card accent="blue">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-slate-800">Skaneateles Marina (Pontoons)</h3>
              <StarBadge count={1} />
            </div>
            <p className="text-xs text-slate-500 mb-2">skanmarina.com/our-rentals</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "Half-Day AM", time: "9am–1pm" },
                { label: "Half-Day PM", time: "1:30–5:30pm" },
                { label: "Full Day", time: "10am–5pm" },
              ].map((slot) => (
                <div key={slot.label} className="bg-sky-50 rounded-lg p-2 text-center">
                  <div className="text-xs font-semibold text-sky-700">{slot.label}</div>
                  <div className="text-xs text-slate-500">{slot.time}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600">Mon & Tue rates reduced on pontoons. Life jackets + safety gear included.</p>
            <div className="flex items-start gap-1.5 bg-orange-50 rounded-lg p-2 mt-2">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700">Book 4–6 weeks in advance for June weekends — high demand.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Sailing */}
      <section>
        <SectionHeader icon={Sailboat} title="Sailing" />
        <Card>
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-slate-800">The Sailboat Shop</h3>
            <StarBadge count={1} />
          </div>
          <p className="text-xs text-slate-500 mb-2">4617 E Lake Rd · (315) 685-7558 · In business since 1976</p>
          <p className="text-sm text-slate-700">Premier sailboat resource in the Finger Lakes. Skaneateles Lake is excellent for sailing with consistent afternoon thermal winds. Call to inquire about sailing rentals or lessons.</p>
        </Card>
      </section>

      {/* Fishing */}
      <section>
        <SectionHeader icon={Fish} title="Fishing" subtitle="What&apos;s biting in June" />
        <Card>
          <div className="divide-y divide-slate-100 mb-3">
            {[
              { species: "Smallmouth Bass", notes: "Excellent throughout the lake. C&R only until ~June 15 — verify 2026 regs" },
              { species: "Largemouth Bass", notes: "North and south shallower ends" },
              { species: "Walleye", notes: "North/south warm-water ends; evening and dawn bites" },
              { species: "Lake Trout", notes: "Deep cold water (mid-lake); trolling" },
              { species: "Rainbow Trout / Landlocked Salmon", notes: "Stocked; spring/summer trolling" },
              { species: "Panfish / Bullhead / Perch", notes: "South end near Fuller Park; great for kids" },
            ].map((fish) => (
              <div key={fish.species} className="py-2.5 first:pt-0 last:pb-0">
                <div className="font-medium text-slate-800 text-sm">{fish.species}</div>
                <div className="text-xs text-slate-500">{fish.notes}</div>
              </div>
            ))}
          </div>
          <div className="bg-sky-50 rounded-lg p-2.5 text-xs text-sky-800">
            <strong>Best June strategy:</strong> Early morning topwater for bass near shoreline; troll for lake trout mid-lake; fish south end flats for warm-water species.
          </div>
        </Card>

        <div className="mt-3 space-y-3">
          <Card accent="yellow">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-slate-800">Lucky Buck Fishing Charters</h3>
              <StarBadge count={2} />
            </div>
            <p className="text-xs text-slate-500 mb-2">Capt. Buck · (315) 481-2320 · luckybuckfishing.com</p>
            <p className="text-sm text-slate-700 mb-2">2022 Veranda luxury fishing tritoon — 8×22 ft fishing area, Yamaha 250hp. Multi-species: walleye, bass, lake trout, tiger musky, perch. 6-hour trips starting at ~$600/group. All ages welcome — good option with Egan.</p>
            <Badge label="5.0 ★ TripAdvisor" variant="star" />
          </Card>
        </div>

        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="font-semibold text-amber-800 text-sm mb-1">NYS Fishing License Required</div>
          <p className="text-xs text-amber-700">Required for anyone 16+. Purchase online: dec.ny.gov — also available at Skaneateles Marina. ~$25/yr residents, ~$50 non-residents.</p>
        </div>
      </section>

      {/* Cruises */}
      <section>
        <SectionHeader icon={Ship} title="Mid-Lakes Navigation Cruises" subtitle="11 Jordan St · midlakesnavigation.com" />
        <div className="space-y-3">
          {[
            { type: "Sightseeing (50 min)", schedule: "Daily, multiple times", price: "$17 adults / $10 kids", notes: "Dogs welcome. Great intro to the lake for Egan." },
            { type: "Lunch Cruise", schedule: "Tue, Wed, Fri at 11am · June 1–Sept 30", price: "$56 adults / $34 under 12", notes: "Buffet: prime rib, turkey, salads, sides." },
            { type: "Dinner Cruise", schedule: "Fri & Sat 6pm; Sundays 5pm · June 1–Sept 30", price: "Check midlakesnavigation.com", notes: "Pan-seared chicken, salmon, pasta primavera; cash bar." },
            { type: "U.S. Mail Boat", schedule: "July 1 through Tuesday after Labor Day", price: "Seasonal", notes: "One of the last operating mail boats in the country. Not available in June but worth noting if trip extends into July." },
          ].map((cruise) => (
            <Card key={cruise.type}>
              <h3 className="font-bold text-slate-800 text-sm mb-1">{cruise.type}</h3>
              <div className="text-xs text-slate-500 mb-1">{cruise.schedule}</div>
              <div className="text-xs font-medium text-emerald-700 mb-1.5">{cruise.price}</div>
              <p className="text-xs text-slate-600">{cruise.notes}</p>
            </Card>
          ))}
          <div className="flex items-start gap-2 bg-orange-50 rounded-lg p-3">
            <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <p className="text-sm text-orange-700">Book all cruises in advance. Lunch and dinner cruises sell out weeks ahead in summer.</p>
          </div>
        </div>
      </section>

      {/* Swimming */}
      <section>
        <SectionHeader icon={Waves} title="Swimming & Beach Access" />
        <div className="space-y-3">
          <Card accent="green">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-slate-800">Your Rental (Best for Egan!)</h3>
              <StarBadge count={1} />
            </div>
            <p className="text-sm text-slate-700">1557 Red Tail Ln — direct Skaneateles Lake access. Private lake = safest for a 2-year-old in a life jacket. Early mornings are calm and gorgeous.</p>
          </Card>
          <Card>
            <h3 className="font-bold text-slate-800 mb-1">Clift Park Swimming Area</h3>
            <p className="text-xs text-slate-500 mb-2">W Genesee St, Skaneateles · Opens late June through August</p>
            <p className="text-sm text-slate-700 mb-2">Lifeguards daily 11am–7pm. Crystal-clear Caribbean-blue water — Skaneateles is one of the cleanest lakes in the US. Non-residents pay daily admission.</p>
            <div className="flex items-start gap-1.5 bg-orange-50 rounded-lg p-2">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700">Swim area typically opens late June — may not be open first days of a June trip.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Toddler water safety */}
      <section>
        <SectionHeader icon={Baby} title="Toddler Water Safety" />
        <Card accent="blue">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="text-sky-500 shrink-0 mt-0.5">→</span><span><strong>Life jacket:</strong> Bring Egan&apos;s own USCG-approved infant PFD (Type II or III, ≤30 lbs). Rentals don&apos;t stock infant sizes.</span></li>
            <li className="flex items-start gap-2"><span className="text-sky-500 shrink-0 mt-0.5">→</span><span><strong>Kayak:</strong> Sit-on-top kayaks are more stable for getting in/out with a toddler.</span></li>
            <li className="flex items-start gap-2"><span className="text-sky-500 shrink-0 mt-0.5">→</span><span><strong>Pontoon boat:</strong> Best option for family — stable platform, railings, plenty of space.</span></li>
            <li className="flex items-start gap-2"><span className="text-sky-500 shrink-0 mt-0.5">→</span><span><strong>Cruise:</strong> Captain + crew onboard — safest intro to the lake.</span></li>
          </ul>
        </Card>
      </section>

      {/* Follow-ups */}
      <section>
        <SectionHeader icon={CheckSquare} title="Booking Reminders" />
        <div className="space-y-2">
          {[
            "Skaneateles Marina pontoon rental: Book 4–6 weeks in advance for June weekends",
            "The Sailboat Shop: Call (315) 685-7558 to confirm 2026 rental pricing and Mon–Sat availability",
            "Lucky Buck Fishing: Book early — popular guide, limited charter slots. (315) 481-2320",
            "Mid-Lakes Navigation: Book lunch/dinner cruises as soon as dates are set",
            "NYS Fishing License: Purchase before the trip at dec.ny.gov",
            "Bass season: Confirm 2026 regulations — typically catch-and-release until mid-June",
            "Toddler life jacket: Bring Egan's own USCG-approved PFD",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg border border-slate-100 p-3 shadow-sm">
              <CheckSquare className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
