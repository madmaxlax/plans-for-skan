import {
  Mountain,
  Clock,
  TrendingUp,
  Baby,
  MapPin,
  Droplets,
  Bike,
  CheckSquare,
  AlertTriangle,
} from "lucide-react";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { Badge, StarBadge } from "../components/Badges";

interface HikeProps {
  name: string;
  distance?: string;
  difficulty: "Easy" | "Easy–Moderate" | "Moderate" | "Moderate–Rugged";
  driveTime?: string;
  highlights: string;
  toddlerVerdict: string;
  address?: string;
  fee?: string;
  stars?: number;
  accent?: "yellow" | "blue" | "green" | "none";
  tip?: string;
}

function HikeCard({ name, distance, difficulty, driveTime, highlights, toddlerVerdict, address, fee, stars, accent = "none", tip }: HikeProps) {
  const difficultyVariant = {
    "Easy": "easy" as const,
    "Easy–Moderate": "easy" as const,
    "Moderate": "moderate" as const,
    "Moderate–Rugged": "hard" as const,
  }[difficulty];

  return (
    <Card accent={accent}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-slate-800 text-base leading-tight">{name}</h3>
        {stars ? <StarBadge count={stars} /> : null}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        <Badge label={difficulty} variant={difficultyVariant} />
        {distance && (
          <Badge label={distance} />
        )}
        {driveTime && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {driveTime}
          </div>
        )}
      </div>
      {address && (
        <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {address}
        </div>
      )}
      <p className="text-sm text-slate-700 mb-2">{highlights}</p>
      <div className="flex items-start gap-1.5 bg-pink-50 rounded-lg p-2">
        <Baby className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
        <p className="text-xs text-pink-700">{toddlerVerdict}</p>
      </div>
      {tip && (
        <div className="flex items-start gap-1.5 bg-amber-50 rounded-lg p-2 mt-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">{tip}</p>
        </div>
      )}
      {fee && <p className="text-xs text-slate-400 mt-1.5">Fee: {fee}</p>}
    </Card>
  );
}

const CLOSE_HIKES: HikeProps[] = [
  {
    name: "Carpenter Falls / Bahar Nature Preserve",
    distance: "1.7 mi total · 0.4 mi to falls",
    difficulty: "Easy–Moderate",
    driveTime: "~15 min",
    highlights: "90-foot waterfall on Skaneateles Lake — jaw-dropping in June with high water. Secondary 'Angel Falls' lower on trail. 65 ft of lakeshore access — can kayak in.",
    toddlerVerdict: "Manageable in a carrier; partial flat trail to upper falls view. Skip the full descent to shore with a toddler.",
    address: "Appletree Point Rd, Niles NY (~12 car lot — arrive early on weekends!)",
    stars: 1,
    accent: "yellow",
    tip: "Only ~12 parking spots. Arrive by 8am on weekends.",
  },
  {
    name: "Skaneateles Conservation Area (Guppy Falls)",
    distance: "0.5–3+ miles (multiple loops)",
    difficulty: "Easy",
    driveTime: "~10 min",
    highlights: "25-foot Guppy Falls, pond, observation deck, shaded forest. Town-maintained trails with a good trail map.",
    toddlerVerdict: "Great — short, flat, and interesting. Best intro hike for Egan.",
    address: "Old Seneca Turnpike, Town of Skaneateles",
    stars: 0,
    accent: "none",
  },
  {
    name: "Charlie Major Nature Trail",
    distance: "~2.5 miles",
    difficulty: "Easy",
    driveTime: "~10 min",
    highlights: "Shaded woodland loop, popular with locals and dogs, good birding in June.",
    toddlerVerdict: "Easy terrain, mostly flat.",
    address: "Off Route 321, Skaneateles area",
    stars: 0,
    accent: "none",
  },
  {
    name: "Bear Swamp State Forest",
    distance: "Extensive network",
    difficulty: "Easy–Moderate",
    driveTime: "~15 min",
    highlights: "South of Skaneateles Lake — literally the watershed buffer for the lake. Deep hemlock and mixed hardwood. Quiet and beautiful.",
    toddlerVerdict: "Multiple easy trail options.",
    address: "Town of Scott area, south of the lake",
    stars: 0,
    accent: "none",
  },
  {
    name: "Baltimore Woods Nature Center",
    distance: "180+ acres of trails",
    difficulty: "Easy–Moderate",
    driveTime: "~15 min",
    highlights: "Trail network through forest, meadows, and ponds. Trails open year-round. Programs available (most age 5+). Weekly free Naturalist's Bumble for adults Wed 9am.",
    toddlerVerdict: "Easy-to-moderate trails work for stroller hikes; nature center building has program calendar for older kids.",
    address: "4007 Bishop Hill Rd, Marcellus, NY",
    stars: 0,
    accent: "none",
  },
];

const MID_HIKES: HikeProps[] = [
  {
    name: "Green Lakes State Park",
    distance: "2–9.9 miles (several options)",
    difficulty: "Easy–Moderate",
    driveTime: "~20–25 min",
    highlights: "Two rare meromictic lakes with stunning turquoise water (similar chemistry to the Dead Sea). Sandy swimming beach. Old-growth forest. Disc golf also on site.",
    toddlerVerdict: "Lake loops are very walkable; paved sections near picnic area. Sandy beach is a bonus.",
    address: "Green Lakes Park Dr, Fayetteville, NY 13066",
    fee: "Empire Pass or ~$7–10/vehicle",
    stars: 1,
    accent: "blue",
  },
  {
    name: "Clark Reservation State Park",
    distance: "~2 mile loop",
    difficulty: "Moderate–Rugged",
    driveTime: "~25 min",
    highlights: "Glacier Lake — meromictic like Green Lakes but wilder. Nature center open Memorial Day–Labor Day.",
    toddlerVerdict: "Rougher terrain; manageable in a good carrier but not stroller-friendly.",
    address: "6105 E Apulia Rd, Jamesville, NY 13078",
    fee: "Empire Pass or day-use fee",
    stars: 0,
    accent: "none",
  },
  {
    name: "Tinker Falls (Labrador Hollow)",
    distance: "0.8 mi round-trip to falls",
    difficulty: "Easy",
    driveTime: "~30–35 min",
    highlights: "You walk BEHIND the waterfall along a stone ledge — magical and unusual. June water flow is excellent. Labrador Hollow is a quiet glacial valley.",
    toddlerVerdict: "Walk to the falls is super easy and short. Perfect for Egan — dramatic payoff for minimal effort.",
    address: "Route 91, south of Apulia, Onondaga/Cortland County line",
    stars: 1,
    accent: "yellow",
    tip: "After heavy rain the walk-behind ledge can be slippery — check conditions first.",
  },
];

const FAR_HIKES: HikeProps[] = [
  {
    name: "Fillmore Glen State Park",
    distance: "2.5–5 miles (several loops)",
    difficulty: "Moderate",
    driveTime: "~40 min",
    highlights: "Multiple waterfalls through a dramatic gorge. First waterfall (Cowsheds Falls) is wheelchair accessible. Swimming area in park. June is peak waterfall season.",
    toddlerVerdict: "First waterfall accessible with stroller. Going deeper requires carrying Egan.",
    address: "1686 NY-38, Moravia, NY 13118 · (607) 842-6820",
    fee: "Empire Pass or day-use fee",
    stars: 1,
    accent: "blue",
    tip: "Part of gorge trail was closed as of 2025 — verify current status before heading out.",
  },
  {
    name: "Taughannock Falls State Park",
    distance: "3 mi round-trip gorge trail (flat)",
    difficulty: "Easy",
    driveTime: "~45 min",
    highlights: "215-foot plunge waterfall — taller than Niagara, one of the highest east of the Rockies. Gorge trail is flat, wide, and paved.",
    toddlerVerdict: "Most toddler-friendly major waterfall hike in the region — flat, wide, paved gorge trail.",
    address: "2221 Taughannock Rd (NY-89), Trumansburg, NY 14886",
    fee: "Empire Pass or day-use fee",
    stars: 2,
    accent: "yellow",
  },
  {
    name: "Robert H. Treman State Park (Lucifer Falls)",
    distance: "4.6-mile loop (Lucifer Falls via Gorge & Rim)",
    difficulty: "Moderate",
    driveTime: "~45 min",
    highlights: "115-foot Lucifer Falls, wild Devil's Kitchen gorge, stone stairways. Natural swimming hole at Lower Falls — huge summer draw.",
    toddlerVerdict: "Gorge trail has significant steps and wet rocks — bring a good carrier. Swimming hole makes it worth it.",
    address: "105 Enfield Falls Rd, Ithaca, NY 14850",
    fee: "Empire Pass or day-use fee",
    stars: 0,
    accent: "none",
  },
  {
    name: "Buttermilk Falls State Park",
    distance: "~2.5-mile loop (Gorge + Rim)",
    difficulty: "Moderate",
    driveTime: "~45 min",
    highlights: "165-foot main falls, natural swimming hole at base (massive summer draw). Multiple cascades on the way up.",
    toddlerVerdict: "Swimming hole at base is great; gorge trail involves steps — best with a carrier.",
    address: "112 E Buttermilk Falls Rd, Ithaca, NY 14850",
    fee: "Empire Pass or day-use fee",
    stars: 0,
    accent: "none",
  },
];

const WATERFALLS = [
  { name: "Carpenter Falls (Bahar)", height: "90 ft", drive: "~15 min", toddler: "Moderate (carrier)" },
  { name: "Guppy Falls", height: "25 ft", drive: "~10 min", toddler: "Easy ★" },
  { name: "Tinker Falls", height: "~30 ft", drive: "~30 min", toddler: "Easy ★ (walk-behind!)" },
  { name: "Taughannock Falls", height: "215 ft ★★", drive: "~45 min", toddler: "Easy ★ (flat trail)" },
  { name: "Lucifer Falls (Treman)", height: "115 ft", drive: "~45 min", toddler: "Moderate (steps)" },
  { name: "Buttermilk Falls", height: "165 ft", drive: "~45 min", toddler: "Moderate (steps)" },
  { name: "Fillmore Glen (multiple)", height: "Various", drive: "~40 min", toddler: "First one accessible" },
];

export default function OutdoorsPage() {
  return (
    <div className="space-y-6 py-2 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <Mountain className="w-8 h-8 text-white/80" />
          <div>
            <h1 className="text-xl font-bold">Hikes & Outdoors</h1>
            <p className="text-emerald-100 text-sm">Waterfalls, trails & state parks</p>
          </div>
        </div>
        <div className="mt-3 bg-white/20 rounded-lg p-2.5 text-sm">
          June tip: Peak waterfall season — snowmelt + spring rains = maximum flow
        </div>
      </div>

      {/* Close hikes */}
      <section>
        <SectionHeader icon={Clock} title="Very Close" subtitle="Less than 20 min from rental" />
        <div className="space-y-3">
          {CLOSE_HIKES.map((h) => <HikeCard key={h.name} {...h} />)}
        </div>
      </section>

      {/* Mid hikes */}
      <section>
        <SectionHeader icon={TrendingUp} title="20–35 Minutes Away" />
        <div className="space-y-3">
          {MID_HIKES.map((h) => <HikeCard key={h.name} {...h} />)}
        </div>
      </section>

      {/* Far hikes */}
      <section>
        <SectionHeader icon={Mountain} title="40–45 Minutes Away" subtitle="Worth the drive!" />
        <div className="space-y-3">
          {FAR_HIKES.map((h) => <HikeCard key={h.name} {...h} />)}
        </div>
      </section>

      {/* Waterfall comparison */}
      <section>
        <SectionHeader icon={Droplets} title="Waterfall Quick Guide" />
        <Card>
          <div className="divide-y divide-slate-100">
            {WATERFALLS.map((wf) => (
              <div key={wf.name} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-slate-800 text-sm">{wf.name}</div>
                  <span className="text-xs font-medium text-sky-700 shrink-0">{wf.height}</span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{wf.drive}
                  </span>
                  <Badge label={wf.toddler} variant="toddler" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Trails */}
      <section>
        <SectionHeader icon={Bike} title="Bike & Running Trails" />
        <div className="space-y-3">
          {[
            { name: "Skaneateles Creek Trail", length: "0.8 miles", type: "Rail-to-trail, flat", notes: "Former Skaneateles Short Line Railroad corridor. Playground at Mottville Trailhead — great for Egan." },
            { name: "Old Erie Canal State Historic Park", length: "~36 miles", type: "Flat canal towpath / multi-use", notes: "Near Fayetteville (~25 min). Historic canal with original stonework and locks. Very flat — great for bikes." },
            { name: "Clift Park Waterfront Path", length: "1+ miles", type: "Flat lakeside", notes: "Beautiful lake views. Perfect morning run or walk." },
          ].map((trail) => (
            <Card key={trail.name}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{trail.name}</h3>
                <Badge label={trail.length} />
              </div>
              <div className="text-xs text-sky-600 mb-1.5">{trail.type}</div>
              <p className="text-sm text-slate-600">{trail.notes}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Follow-ups */}
      <section>
        <SectionHeader icon={CheckSquare} title="Before You Go" />
        <div className="space-y-2">
          {[
            "Empire Pass (~$80/yr) pays for itself after 3 state park visits",
            "Carpenter Falls parking: ~12 spots — arrive by 8am on weekends",
            "Fillmore Glen gorge: trail was partially closed 2025 — verify current status",
            "Download Green Lakes + Taughannock trails offline on AllTrails — cell is spotty in gorges",
            "Skaneateles Conservation Area trail map: download from townofskaneateles.gov",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg border border-slate-100 p-3 shadow-sm">
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
