import {
  CloudRain,
  MapPin,
  Phone,
  Globe,
  Clock,
  Car,
  Sparkles,
  BookOpen,
  Dumbbell,
  Lightbulb,
} from "lucide-react";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { Badge, PriceBadge, StarBadge } from "../components/Badges";

// ─── Bowling ─────────────────────────────────────────────────────────────────

const BOWLING = [
  {
    name: "Starlite Lanes",
    address: "275 Grant Ave, Auburn, NY",
    phone: "(315) 253-8489",
    distance: "~15 min",
    cost: "Per game + shoe rental",
    details: "Closest option. Call ahead to confirm open bowling hours and bumper availability for Egan.",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "Falcon Lanes",
    address: "Auburn, NY",
    phone: "(315) 282-7254",
    distance: "~15 min",
    cost: "Per game + shoes",
    details: "Second Auburn option. Call for open bowling windows and bumpers.",
    accent: "none" as const,
  },
  {
    name: "Rainbow Lanes",
    address: "Weedsport, NY",
    phone: "(315) 834-6028",
    distance: "~20 min",
    cost: "Per game + shoes",
    details: "Family pricing. Call ahead for hours.",
    accent: "none" as const,
  },
  {
    name: "Lakeview Lanes",
    address: "Fulton, NY",
    phone: "",
    distance: "~25 min",
    cost: "Per game + shoes",
    details: "Slightly further but another solid family option.",
    accent: "none" as const,
  },
];

// ─── Museums & Culture ────────────────────────────────────────────────────────

const MUSEUMS = [
  {
    name: "MOST — Museum of Science & Technology",
    address: "500 S Franklin St, Syracuse",
    phone: "(315) 425-9068",
    website: "most.org",
    distance: "~30 min",
    cost: "~$10 adults · under-2 may be free",
    hours: "Thu–Sun 10am–5pm (+ school break weekdays)",
    details: "5-level Science Playhouse is the highlight for toddlers — tons of sensory-friendly, hands-on exploration. IMAX dome. Storytime and Sunday family events.",
    stars: 1,
    accent: "blue" as const,
  },
  {
    name: "Schweinfurth Art Center",
    address: "205 Genesee St, Auburn, NY",
    phone: "(315) 255-1553",
    distance: "~15 min",
    cost: "Varies by exhibit",
    hours: "Wed–Sat/Sun (call ahead)",
    details: "Regional art museum with rotating exhibits. Close, easy stop on a rainy Auburn day.",
    accent: "none" as const,
  },
  {
    name: "Erie Canal Museum",
    address: "Downtown Syracuse",
    phone: "(315) 471-0593",
    distance: "~30 min",
    cost: "Free / suggested donation",
    hours: "Tue–Sun",
    details: "Hands-on exhibits on the canal that made NY great. Kids enjoy the full-scale canal boat inside.",
    accent: "none" as const,
  },
  {
    name: "Rosamond Gifford Zoo",
    address: "1 Conservation Pl, Syracuse",
    phone: "(315) 435-8511",
    website: "rosamondgiffordzoo.org",
    distance: "~30 min",
    cost: "Under 2: FREE · Youth: $2–5 · Adult: $5–9",
    hours: "Daily 10am–4:30pm",
    details: "Top 10% AZA-accredited zoo. 700+ animals. Has covered indoor areas for rain. Since Egan is turning 2, he's FREE!",
    stars: 1,
    accent: "green" as const,
  },
];

// ─── Indoor Play & Activities ─────────────────────────────────────────────────

const INDOOR_PLAY = [
  {
    name: "PlaySpace Auburn (ABC Cayuga)",
    address: "100 North St Suite 2, Auburn, NY",
    phone: "(315) 252-5541",
    website: "playspaceabc.com",
    distance: "~15 min",
    cost: "$8/family drop-in",
    hours: "Tue/Thu/Fri 9am–1pm · Sat 9am–2pm",
    details: "Indoor play space for ages 0–6. Drop-in welcome. Safe enclosed area — toddlers can roam. Nonprofit-run.",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "Get Air Trampoline Park",
    address: "Cicero / Clay, NY",
    distance: "~35 min",
    cost: "$15–$20",
    hours: "Check website for Toddler Time hours",
    details: "Toddler Time sessions for ages 2–6 — lower jump areas, foam pit, Kiddie Court. Great for burning energy on a full rainy day.",
    accent: "none" as const,
  },
  {
    name: "Skaneateles Community Center",
    address: "97 State St, Skaneateles",
    phone: "(315) 685-2266",
    website: "skaneatelescommunitycenter.org",
    distance: "~5 min",
    cost: "Day pass",
    hours: "Mon–Thu 5:15am–9pm · Sat 7am–9pm",
    details: "Aquatics (leisure pool, water slides, hot tub), 2 NHL-sized ice rinks. Preschool sessions with swimming and ice skating for ages 2–4.",
    stars: 1,
    accent: "blue" as const,
  },
  {
    name: "Destiny USA",
    address: "9090 Destiny USA Dr, Syracuse, NY",
    distance: "~30 min",
    cost: "Free entry to mall",
    hours: "Daily",
    details: "Massive indoor entertainment complex — mini golf, bowling, ropes course, restaurants, movies. Good full-day fallback when the weather is truly awful.",
    accent: "none" as const,
  },
  {
    name: "Central Rock Gym",
    address: "Syracuse, NY",
    distance: "~30 min",
    cost: "Day pass + rental",
    hours: "Check website",
    details: "Indoor rock climbing gym. Day passes + gear rental. Good solo workout or with older kids.",
    accent: "none" as const,
  },
];

// ─── Toddler Indoor Activities (At-Home) ─────────────────────────────────────

const HOME_ACTIVITIES = [
  { num: 1, title: "Water Pouring Station", desc: "Fill a bin with cups, funnels, pitchers — Egan pours and transfers indefinitely. High ROI." },
  { num: 2, title: "Baking Soda Volcano", desc: "Spoon baking soda into a cup, pour white vinegar, watch it fizz. He'll ask to do it 20 times in a row." },
  { num: 3, title: "Finger Painting", desc: "Tape paper to the table or a trash bag on the floor. Washable tempera paint. No instruction needed." },
  { num: 4, title: "Fort Building", desc: "Blankets over chairs and a couch. Crawl inside with a flashlight and stuffed animals. Add a 'secret knock.'" },
  { num: 5, title: "Dance Party", desc: "Queue up Raffi, They Might Be Giants 'Here Comes the ABCs', or Kidz Bop. Clear the living room floor. Go hard." },
  { num: 6, title: "Indoor Obstacle Course", desc: "Couch cushions to crawl over, a pillow tunnel, painter's tape hopscotch on the floor." },
  { num: 7, title: "Play Dough + Tools", desc: "Cookie cutters, forks, rolling pins. DIY dough: 2 cups flour, 1 cup salt, 1 cup water, 2 tbsp oil + food coloring." },
  { num: 8, title: "Sensory Bin", desc: "Dried rice/pasta in a bin with small cups, trucks, and animals. 30–45 min of occupation, guaranteed." },
  { num: 9, title: "Shaving Cream Play", desc: "Squirt a pile on a tray or in the bathtub. Let him squish, draw lines in it, make 'soup.' Rinse clean." },
  { num: 10, title: "Bubble Bonanza (covered porch)", desc: "If there's a covered porch, blow bubbles in the rain. Toddlers will lose their minds." },
  { num: 11, title: "Kitchen Music Band", desc: "Wooden spoons, pots, Tupperware lids as cymbals, oatmeal container drum. Concert time." },
  { num: 12, title: "Sticker Book / Sticker Wall", desc: "Giant roll of stickers and a piece of contact paper taped to the wall. 20 min of focused placement." },
  { num: 13, title: "Flashlight Hide & Seek", desc: "Lights off, give Egan a flashlight, hide stuffed animals around the room for him to find." },
  { num: 14, title: "Car Wash for Toy Trucks", desc: "Bin of soapy water, let Egan 'wash' his toy cars. Works best on tile or in the bathtub." },
  { num: 15, title: "Pasta Threading", desc: "Rigatoni or penne on a shoelace or pipe cleaner. Threading practice doubles as toddler focus activity." },
];

// ─── Library ──────────────────────────────────────────────────────────────────

const LIBRARY_PROGRAMS = [
  { program: "Baby Bounce & Rhyme", when: "Wednesdays at 9:15 AM", ages: "Babies up to 2" },
  { program: "Read, Sing, Play Story Time", when: "Wednesdays at 10:30 AM", ages: "Ages 2–5" },
  { program: "Story Time for Book Worms", when: "Thursdays at 10:30 AM", ages: "Older toddlers" },
];

// ─── Adult Solo (Egan Napping) ────────────────────────────────────────────────

const ADULT_SOLO = [
  "Bodyweight EMOM circuit — push-ups, squats, lunges, burpees, core. 30 min, no equipment.",
  "Stair repeats in the house, or a covered porch jog.",
  "Zone 2 cardio: jump rope, step-ups on stairs.",
  "Read that book you've been meaning to finish.",
  "Plan tomorrow's activities — check conditions and map the day.",
  "Nap stack: if Egan's nap gives you 90 min, take 30 for yourself.",
];

// ─── Distance Reference ──────────────────────────────────────────────────────

const DISTANCES = [
  { dest: "Skaneateles Community Center", time: "~5 min" },
  { dest: "Auburn (bowling, PlaySpace, museums)", time: "~15 min" },
  { dest: "Weedsport (Rainbow Lanes)", time: "~20 min" },
  { dest: "Fulton (Lakeview Lanes)", time: "~25 min" },
  { dest: "Syracuse (MOST, Zoo, Central Rock, Destiny)", time: "~30 min" },
  { dest: "Cicero / Clay (Get Air, Sky Zone)", time: "~35 min" },
];

export default function RainyDayPage() {
  return (
    <div className="space-y-6 py-2 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-slate-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <CloudRain className="w-8 h-8 text-white/80" />
          <div>
            <h1 className="text-xl font-bold">Rainy Day Guide</h1>
            <p className="text-indigo-100 text-sm">Indoor options for any wet June day</p>
          </div>
        </div>
      </div>

      {/* Bowling */}
      <section>
        <SectionHeader icon={Sparkles} title="Bowling" subtitle="Call ahead to confirm hours + bumpers for Egan" />
        <div className="space-y-3">
          {BOWLING.map((b) => (
            <Card key={b.name} accent={b.accent}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{b.name}</h3>
                {b.stars ? <StarBadge count={b.stars} /> : null}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <Badge label={b.distance} />
                <PriceBadge price={b.cost} />
              </div>
              {b.address && (
                <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{b.address}
                </div>
              )}
              {b.phone && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <Phone className="w-3.5 h-3.5" />{b.phone}
                </div>
              )}
              <p className="text-sm text-slate-700">{b.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Museums & Culture */}
      <section>
        <SectionHeader icon={BookOpen} title="Museums & Culture" />
        <div className="space-y-3">
          {MUSEUMS.map((m) => (
            <Card key={m.name} accent={m.accent}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{m.name}</h3>
                {m.stars ? <StarBadge count={m.stars} /> : null}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <Badge label={m.distance} />
                <PriceBadge price={m.cost} />
              </div>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{m.address}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
                {m.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{m.phone}</span>}
                {m.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{m.website}</span>}
                {m.hours && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.hours}</span>}
              </div>
              <p className="text-sm text-slate-700">{m.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Indoor Play */}
      <section>
        <SectionHeader icon={Sparkles} title="Indoor Play & Activities" />
        <div className="space-y-3">
          {INDOOR_PLAY.map((p) => (
            <Card key={p.name} accent={p.accent}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{p.name}</h3>
                {p.stars ? <StarBadge count={p.stars} /> : null}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <Badge label={p.distance} />
                {p.cost && <PriceBadge price={p.cost} />}
              </div>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{p.address}
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
                {p.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{p.phone}</span>}
                {p.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{p.website}</span>}
                {p.hours && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.hours}</span>}
              </div>
              <p className="text-sm text-slate-700">{p.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Library Storytimes */}
      <section>
        <SectionHeader icon={BookOpen} title="Skaneateles Free Library" subtitle="In-village storytimes — 5 min away" />
        <Card>
          <div className="divide-y divide-slate-100">
            {LIBRARY_PROGRAMS.map((item) => (
              <div key={item.program} className="py-2.5 first:pt-0 last:pb-0">
                <div className="font-medium text-slate-800 text-sm">{item.program}</div>
                <div className="text-xs text-slate-500">{item.when}</div>
                <Badge label={item.ages} variant="toddler" />
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">skanlibrary.org — check for summer schedule updates</p>
        </Card>
      </section>

      {/* At-Home Toddler Activities */}
      <section>
        <SectionHeader icon={Lightbulb} title="At-Home Activities for Egan" subtitle="No car needed — rainy day in the lake house" />
        <div className="space-y-2">
          {HOME_ACTIVITIES.map((a) => (
            <div key={a.num} className="flex items-start gap-3 bg-white rounded-lg border border-slate-100 p-3 shadow-sm">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {a.num}
              </div>
              <div>
                <div className="font-medium text-slate-800 text-sm">{a.title}</div>
                <p className="text-xs text-slate-600 mt-0.5">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adult Solo */}
      <section>
        <SectionHeader icon={Dumbbell} title="For Max — Solo (Egan Napping)" />
        <Card>
          <ul className="space-y-2">
            {ADULT_SOLO.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-indigo-400 mt-0.5 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Distance reference */}
      <section>
        <SectionHeader icon={Car} title="Distance Reference" subtitle="From 1557 Red Tail Ln" />
        <Card>
          <div className="divide-y divide-slate-100">
            {DISTANCES.map((d) => (
              <div key={d.dest} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                <div className="font-medium text-slate-700 text-sm">{d.dest}</div>
                <Badge label={d.time} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Call-ahead reminders */}
      <section>
        <SectionHeader icon={Phone} title="Call Ahead" subtitle="Variable hours — confirm before driving" />
        <Card>
          <div className="divide-y divide-slate-100">
            {[
              { name: "Starlite Lanes", phone: "(315) 253-8489", ask: "Open bowling hours + bumpers available" },
              { name: "Falcon Lanes", phone: "(315) 282-7254", ask: "Open bowling windows; bumpers" },
              { name: "Rainbow Lanes (Weedsport)", phone: "(315) 834-6028", ask: "Hours + family pricing" },
              { name: "PlaySpace Auburn", phone: "(315) 252-5541", ask: "Open today; any closures" },
              { name: "Skaneateles Community Center", phone: "(315) 685-2266", ask: "Open swim schedule; day pass pricing" },
              { name: "Get Air Syracuse", phone: "website", ask: "Toddler Time session schedule; Kiddie Court hours" },
              { name: "MOST Museum", phone: "(315) 425-9068", ask: "Open today (Thu–Sun); Science Playhouse" },
              { name: "Schweinfurth Art Center", phone: "(315) 255-1553", ask: "Open today; any install closures" },
            ].map((c) => (
              <div key={c.name} className="py-2.5 first:pt-0 last:pb-0">
                <div className="font-medium text-slate-800 text-sm">{c.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Phone className="w-3 h-3" />{c.phone}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Ask: {c.ask}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
