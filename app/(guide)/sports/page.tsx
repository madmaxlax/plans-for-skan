import {
  Dumbbell,
  MapPin,
  Phone,
  Globe,
  DollarSign,
  Clock,
  Trophy,
  Users,
  Waves,
} from "lucide-react";
import Card from "@/app/components/Card";
import SectionHeader from "@/app/components/SectionHeader";
import { Badge, PriceBadge, StarBadge } from "@/app/components/Badges";

// ─── Golf ───────────────────────────────────────────────────────────────────

interface GolfCourse {
  name: string;
  address: string;
  distance: string;
  type: string;
  fees?: string;
  phone?: string;
  website?: string;
  notes: string;
  stars?: number;
  accent?: "yellow" | "blue" | "green" | "none";
}

const GOLF: GolfCourse[] = [
  {
    name: "Pearl Lakes Golf Course & Driving Range",
    address: "1441 Old Seneca Turnpike, Skaneateles, NY",
    distance: "~4 mi from village",
    type: "Public · 9-hole executive (par 29) + driving range",
    fees: "~$15 / round",
    phone: "(315) 685-6799",
    notes: "Most convenient option — right in Skaneateles. Good for casual rounds and range sessions.",
    stars: 1,
    accent: "yellow",
  },
  {
    name: "Dutch Hollow Country Club",
    address: "1839 County Road 117, Owasco, NY",
    distance: "~8 mi · ~15 min",
    type: "Public/Semi-private · 18 holes, par 71",
    fees: "~$28–$42",
    website: "GolfNow.com",
    notes: "Well-reviewed. Situated on a ridge between Skaneateles and Owasco Lakes.",
    accent: "none",
  },
  {
    name: "Highland Park Golf Club",
    address: "3068 Franklin Street Rd, Auburn, NY",
    distance: "~20 min",
    type: "Semi-private · 18 holes + 5-tee driving range",
    fees: "18w/cart: $55 WD / $63 WE · Walking: $35 / $42",
    phone: "(315) 252-4993",
    website: "highlandparkgolfclub.com",
    notes: "One of CNY's fastest-growing courses. Celebrating 100 years in 2025.",
    stars: 1,
    accent: "blue",
  },
  {
    name: "Lakeview Golf & Country Club",
    address: "~2 miles from Auburn",
    distance: "~15 min",
    type: "Semi-private · 18 holes, par 70",
    fees: "~$30–$40 + cart",
    website: "foreupsoftware.com (tee times)",
    notes: "Historic Tom Bendelow design (1916). Tee times from 12pm.",
    accent: "none",
  },
  {
    name: "Tanner Valley Golf Course",
    address: "4040 Tanner Road, Syracuse, NY",
    distance: "~20 min",
    type: "Public · 18 holes + par-3 course",
    fees: "~$18–$21 walking",
    notes: "Cheapest round in CNY. Also has a par-3 course for a quick loop.",
    accent: "none",
  },
  {
    name: "West Hill Golf Course",
    address: "180 Par Place, Camillus, NY 13031",
    distance: "~20 min",
    type: "Public · 18-hole par 3 + footgolf",
    fees: "$18 walking (all 18)",
    phone: "(315) 672-8677",
    website: "westhillgolfcourse.com",
    notes: "Haven't played it yet — want to try. ~3 hours to play all 18. Footgolf option is a nice twist.",
    accent: "none",
  },
  {
    name: "Vesper Hills Golf Club",
    address: "4291 Octagon Rd, Tully, NY 13159",
    distance: "~25 min south",
    type: "Public · 18 holes, par 72",
    phone: "(315) 696-8328",
    notes: "Signature island hole. Pair a round with The Loft restaurant on-site after.",
    accent: "none",
  },
  {
    name: 'Sunset Pines Executive ("The View")',
    address: "4568 Octagon Rd, Tully, NY 13159",
    distance: "~25 min south (in Tully, farther than the others)",
    type: "Public · 9 holes, par 3 executive",
    phone: "(315) 810-4180",
    notes: "Quick executive loop if you're already heading down toward Tully.",
    accent: "none",
  },
  {
    name: "Sunset Ridge Golf Club",
    address: "2814 W Seneca Tpke, Marcellus, NY 13108",
    distance: "~15 min",
    type: "Public · Championship 18",
    phone: "(315) 707-4503",
    notes: "On-site Sunset Grille restaurant (Mon–Fri 11am–8:30pm, Sat–Sun 10am–7pm). Easy lunch + 18 holes combo.",
    accent: "none",
  },
];

// ─── Pickleball ─────────────────────────────────────────────────────────────

const PICKLEBALL = [
  {
    name: "Austin Park — Outdoor Courts",
    address: "State St, Skaneateles, NY",
    cost: "Free",
    hours: "Dawn to dusk",
    details: "4 outdoor asphalt courts with permanent pickleball lines. Bring your own net (stored in nearby shed). Skaneateles Pickleball Club plays here 1+ morning/week.",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "Skaneateles Community Center — Indoor Courts",
    address: "97 State St, Skaneateles",
    cost: "Day pass or membership ($56/mo)",
    hours: "Mon–Thu 5:15am–9pm · Sat 7am–9pm",
    details: "3 indoor courts. Open Pickleball sessions ~9–11am on select weekday mornings. Beginner/Intermediate clinics: $20 members / $25 non-members.",
    phone: "(315) 685-2266",
    accent: "none" as const,
  },
  {
    name: "Auburn YMCA — Indoor Pickleball",
    address: "62 Turner St, Auburn, NY",
    cost: "$10 non-member · $5 with Skan PB Club",
    hours: "Tue/Thu mornings + Mon/Wed/Fri with club",
    details: "3 indoor courts. ~20 min from Skaneateles. Popular with local pickleball community.",
    website: "auburnymca.org",
    accent: "none" as const,
  },
];

// ─── Tennis ──────────────────────────────────────────────────────────────────

const TENNIS = [
  { name: "F.C. Austin Park", courts: "6 outdoor hard courts", cost: "Free", details: "Right in the village. Open dawn to dusk. Pickleball, basketball, and volleyball also on-site." },
  { name: "Marcellus Park", courts: "Public courts", cost: "Free", details: "~5 miles from Skaneateles." },
  { name: "Skaneateles Community Center", courts: "Indoor gym space", cost: "Day pass", details: "97 State St · (315) 685-2266" },
];

// ─── Volleyball ──────────────────────────────────────────────────────────────

const VOLLEYBALL = [
  {
    name: "Austin Park — Adult Coed Sand/Beach Volleyball League",
    address: "Austin Park, Skaneateles",
    cost: "$220/team",
    details: "Mondays June 1 – August 10, 2026 (playoffs Aug 17–24). Times: 6pm & 7pm. Contact Josh Card: Jcard@skancc.com or skancc.clubautomation.com.",
    stars: 1,
  },
];

// ─── Softball ────────────────────────────────────────────────────────────────

const SOFTBALL = [
  {
    name: "Skaneateles Community Center — Adult Coed Softball",
    address: "Skaneateles Central Schools Softball Field",
    cost: "$250/team + $20 umpire/game",
    details: "Tuesdays June 9 – Sept 1, 2026. Individual registration available — placed on a team. Min 3 females on field. Register: skancc.clubautomation.com · Josh Card: Jcard@skancc.com",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "PlaySSA — Syracuse Sports Association",
    address: "North Syracuse / Liverpool area",
    cost: "Team registration",
    details: "Biggest adult rec sports organizer in CNY (~30 min away). Softball, soccer, kickball, flag football, basketball, volleyball, cornhole. Individual sign-up available. playssa.com",
    accent: "none" as const,
  },
];

// ─── Soccer ──────────────────────────────────────────────────────────────────

const SOCCER = [
  {
    name: "CNY Family Sports Centre — Adult Soccer Leagues",
    address: "East Syracuse, NY",
    cost: "Registration fee",
    details: "7v7 outdoor summer leagues (~25–30 min away). Individual player form available for free-agent placement. Men's and coed options. cnyfsc.com/soccer/adult",
  },
  {
    name: "PlaySSA — Adult Soccer",
    address: "Liverpool / North Syracuse",
    cost: "Team/individual",
    details: "Register as a free agent for coed soccer leagues. playssa.com",
  },
  {
    name: "Corcoran High School Turf — Pickup Soccer",
    address: "Corcoran HS, Syracuse",
    cost: "Free",
    details: "Community pickup Sundays ~11am. Skill/age varies — confirm via local Facebook group.",
  },
];

// ─── Triathlon / Swim ────────────────────────────────────────────────────────

const EVENTS = [
  {
    name: "Clift Park Open Water Swimming",
    date: "Late June – August",
    location: "Clift Park, Skaneateles",
    distance: "At the village",
    details: "Free public access. Skaneateles Lake is one of the cleanest in the US (supplies Syracuse drinking water without filtration). 16 miles long — ideal open-water training.",
    stars: 1,
    accent: "green" as const,
  },
  {
    name: "Finger Lakes Triathlon — Canandaigua Lake",
    date: "June 21, 2026",
    location: "Canandaigua, NY",
    distance: "~45 min",
    details: "Sprint, Intermediate, Aquabike, Duathlon options. 8am start. Register at trisignup.com (search 'Finger Lakes Triathlon Canandaigua').",
    accent: "none" as const,
  },
];

// ─── Basketball ──────────────────────────────────────────────────────────────

const BASKETBALL = [
  {
    name: "Skaneateles Community Center — Pickup Basketball",
    details: "Gym available during open hours. Check schedule at skaneatelescommunitycenter.org. Day pass available.",
    cost: "Day pass / membership",
  },
  {
    name: "Austin Park — Outdoor Courts",
    details: "Free outdoor basketball courts in the park.",
    cost: "Free",
  },
];

function GolfCard({ name, address, distance, type, fees, phone, website, notes, stars, accent = "none" }: GolfCourse) {
  return (
    <Card accent={accent}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-bold text-slate-800 text-sm leading-tight">{name}</h3>
        {stars ? <StarBadge count={stars} /> : null}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        <Badge label={distance} />
        {fees && <PriceBadge price={fees} />}
      </div>
      <div className="text-xs text-slate-500 mb-1">{type}</div>
      {address && (
        <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-1">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{address}
        </div>
      )}
      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
        {phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{phone}</span>}
        {website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{website}</span>}
      </div>
      <p className="text-sm text-slate-700">{notes}</p>
    </Card>
  );
}

export default function SportsPage() {
  return (
    <div className="space-y-6 py-2 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <Dumbbell className="w-8 h-8 text-white/80" />
          <div>
            <h1 className="text-xl font-bold">Sports & Recreation</h1>
            <p className="text-red-100 text-sm">Golf, pickleball, tennis, leagues & races</p>
          </div>
        </div>
      </div>

      {/* Golf */}
      <section>
        <SectionHeader icon={Trophy} title="Golf" subtitle="Courses within 25 min" />
        <div className="space-y-3">
          {GOLF.map((c) => <GolfCard key={c.name} {...c} />)}
        </div>
      </section>

      {/* Pickleball */}
      <section>
        <SectionHeader icon={Dumbbell} title="Pickleball" subtitle="Drop-in options in the village & nearby" />
        <div className="space-y-3">
          {PICKLEBALL.map((p) => (
            <Card key={p.name} accent={p.accent}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm leading-tight">{p.name}</h3>
                {p.stars ? <StarBadge count={p.stars} /> : null}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <PriceBadge price={p.cost} />
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />{p.hours}
                </div>
              </div>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{p.address}
              </div>
              {"phone" in p && p.phone && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <Phone className="w-3.5 h-3.5" />{p.phone}
                </div>
              )}
              <p className="text-sm text-slate-700">{p.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tennis */}
      <section>
        <SectionHeader icon={Dumbbell} title="Tennis" subtitle="Free public courts in the village" />
        <Card>
          <div className="divide-y divide-slate-100">
            {TENNIS.map((t) => (
              <div key={t.name} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-slate-800 text-sm">{t.name}</div>
                  <PriceBadge price={t.cost} />
                </div>
                <div className="text-xs text-slate-500">{t.courts}</div>
                <div className="text-xs text-slate-600 mt-0.5">{t.details}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Volleyball */}
      <section>
        <SectionHeader icon={Users} title="Volleyball" subtitle="Adult coed summer league" />
        <div className="space-y-3">
          {VOLLEYBALL.map((v) => (
            <Card key={v.name} accent="yellow">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{v.name}</h3>
                <StarBadge count={v.stars} />
              </div>
              <div className="flex gap-1.5 mb-2">
                <PriceBadge price={v.cost} />
              </div>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{v.address}
              </div>
              <p className="text-sm text-slate-700">{v.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Softball */}
      <section>
        <SectionHeader icon={Trophy} title="Softball" subtitle="Join as an individual — they'll place you on a team" />
        <div className="space-y-3">
          {SOFTBALL.map((s) => (
            <Card key={s.name} accent={s.accent}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{s.name}</h3>
                {s.stars ? <StarBadge count={s.stars} /> : null}
              </div>
              <div className="flex gap-1.5 mb-2">
                <PriceBadge price={s.cost} />
              </div>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{s.address}
              </div>
              <p className="text-sm text-slate-700">{s.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Soccer */}
      <section>
        <SectionHeader icon={Users} title="Soccer" subtitle="Leagues & pickup around CNY" />
        <Card>
          <div className="divide-y divide-slate-100">
            {SOCCER.map((s) => (
              <div key={s.name} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-slate-800 text-sm">{s.name}</div>
                  <PriceBadge price={s.cost} />
                </div>
                <div className="text-xs text-slate-500">{s.address}</div>
                <div className="text-xs text-slate-600 mt-1">{s.details}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Triathlon & Open Water Events */}
      <section>
        <SectionHeader icon={Waves} title="Triathlon & Swim Events" subtitle="June races in the Finger Lakes" />
        <div className="space-y-3">
          {EVENTS.map((e) => (
            <Card key={e.name} accent={e.accent}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{e.name}</h3>
                {e.stars ? <StarBadge count={e.stars} /> : null}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <Badge label={e.date} variant="star" />
                <Badge label={e.distance} />
              </div>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{e.location}
              </div>
              <p className="text-sm text-slate-700">{e.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Basketball */}
      <section>
        <SectionHeader icon={Dumbbell} title="Basketball" />
        <Card>
          <div className="divide-y divide-slate-100">
            {BASKETBALL.map((b) => (
              <div key={b.name} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-slate-800 text-sm">{b.name}</div>
                  <PriceBadge price={b.cost} />
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{b.details}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Key contacts */}
      <section>
        <SectionHeader icon={Phone} title="Key Contacts" />
        <Card>
          <div className="divide-y divide-slate-100">
            {[
              { name: "Skaneateles Community Center", phone: "(315) 685-2266", note: "Pickleball, softball, volleyball, aquatics" },
              { name: "Pearl Lakes Golf", phone: "(315) 685-6799", note: "9-hole course + driving range" },
              { name: "Highland Park Golf", phone: "(315) 252-4993", note: "Best 18-hole near Auburn" },
              { name: "Josh Card (SCC Leagues)", phone: "Jcard@skancc.com", note: "Softball, volleyball registration" },
              { name: "Auburn YMCA", phone: "auburnymca.org", note: "Indoor pickleball drop-in" },
            ].map((c) => (
              <div key={c.name} className="py-2.5 first:pt-0 last:pb-0">
                <div className="font-medium text-slate-800 text-sm">{c.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <DollarSign className="w-3 h-3" />{c.phone}
                </div>
                <div className="text-xs text-slate-400">{c.note}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
