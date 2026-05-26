import {
  Baby,
  Waves,
  Palette,
  PawPrint,
  BookOpen,
  Ship,
  Cake,
  PlayCircle,
  Calendar,
  CheckSquare,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import Card from "@/app/components/Card";
import SectionHeader from "@/app/components/SectionHeader";
import { Badge, StarBadge } from "@/app/components/Badges";

interface ActivityCardProps {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  cost?: string;
  highlights: string;
  hours?: string;
  stars?: number;
  accent?: "yellow" | "blue" | "green" | "none";
  note?: string;
}

function ActivityCard({ name, address, phone, website, cost, highlights, hours, stars, accent = "none", note }: ActivityCardProps) {
  return (
    <Card accent={accent}>
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="font-bold text-slate-800 text-sm leading-tight">{name}</h3>
        <div className="flex gap-1.5 shrink-0">
          {stars ? <StarBadge count={stars} /> : null}
          {cost && <Badge label={cost} variant="price" />}
        </div>
      </div>
      {address && (
        <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-1">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          {address}
        </div>
      )}
      {(phone || website) && (
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-1.5">
          {phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{phone}</span>}
          {website && <span>{website}</span>}
        </div>
      )}
      {hours && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
          <Clock className="w-3.5 h-3.5" />{hours}
        </div>
      )}
      <p className="text-sm text-slate-700">{highlights}</p>
      {note && <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 mt-2">{note}</p>}
    </Card>
  );
}

const WATER_ACTIVITIES: ActivityCardProps[] = [
  {
    name: "Clift Park Beach — Skaneateles Lake",
    address: "15 W Genesee St, Skaneateles",
    cost: "Free",
    hours: "Lifeguards 11am–7pm daily (late June–late August)",
    highlights: "Famously shallow — kids can walk far out and stay safe. Crystal-clear Caribbean-blue water. Gazebo, stone seating, and lawn.",
    note: "Lifeguards may not start until end of June. Check with Town of Skaneateles before planning a swim day.",
    stars: 1,
    accent: "blue",
  },
  {
    name: "Owasco Splash Pad",
    address: "2 Bristol Ave, Auburn, NY (~15 min)",
    cost: "FREE",
    hours: "9am–8pm daily (opens mid-June)",
    highlights: "Water sprays, fountains, interactive features. Adjacent playground and bathrooms on site. Flat, no pool depth, fully enclosed spray area — ideal for toddlers.",
    note: "Opens mid-June (weather-dependent). Highly recommend as a daily easy outing.",
    stars: 1,
    accent: "yellow",
  },
  {
    name: "Emerson Park — Owasco Lake",
    address: "East Lake Rd, Auburn, NY (~20 min)",
    cost: "Free",
    hours: "Dawn to dusk year-round",
    highlights: "Beach area, multiple playgrounds, merry-go-round, pavilion, disc golf, kayak/canoe rentals. Great for a full-day family outing. Pack a picnic.",
    stars: 0,
    accent: "none",
  },
];

const INDOOR_PLAY: ActivityCardProps[] = [
  {
    name: "PlaySpace Auburn (ABC Cayuga)",
    address: "100 North St Suite 2, Auburn, NY (~15 min)",
    phone: "(315) 252-5541",
    website: "playspaceabc.com",
    cost: "$8/family",
    hours: "Tue/Thu/Fri 9am–1pm · Sat 9am–2pm · Wed closed",
    highlights: "Drop-in welcome. Hands-on indoor play space for ages 0–6 run by a nonprofit. Safe enclosed area so toddlers can roam. Also hosts private birthday parties.",
    stars: 1,
    accent: "yellow",
  },
  {
    name: "MOST — Museum of Science & Technology",
    address: "500 S Franklin St, Syracuse (~30 min)",
    phone: "(315) 425-9068",
    website: "most.org",
    cost: "~$10 adults; under-2 may be free",
    hours: "Thu–Sun 10am–5pm (+ school break weekdays)",
    highlights: "5-level Science Playhouse is the highlight for toddlers — tons of sensory-friendly, hands-on exploration. Storytime and special Sunday family events.",
    stars: 0,
    accent: "none",
  },
  {
    name: "Skaneateles Community Center",
    address: "97 State St, Skaneateles",
    phone: "(315) 685-2266",
    website: "skaneatelescommunitycenter.org",
    cost: "Day pass available",
    hours: "Mon–Thu 5:15am–9pm · Sat 7am–9pm",
    highlights: "Aquatics (leisure pool, water slides, hot tub), two NHL-sized rinks. Preschool (ages 2–4): half-day swimming, ice skating, and gym time.",
    stars: 0,
    accent: "none",
  },
];

const ZOO: ActivityCardProps[] = [
  {
    name: "Rosamond Gifford Zoo at Burnet Park",
    address: "1 Conservation Pl, Syracuse (~30 min)",
    phone: "(315) 435-8511",
    website: "rosamondgiffordzoo.org",
    cost: "Children under 2: FREE • Youth: $2–$5 • Adult: $5–$9",
    hours: "Mon–Sun 10am–4:30pm",
    highlights: "AZA-accredited zoo, top 10% in North America. 700+ animals, 275 species. Great toddler pace — lots of open paths and animal viewing at ground level. Since Egan is turning 2, he gets in FREE!",
    stars: 1,
    accent: "green",
  },
];

const NATURE: ActivityCardProps[] = [
  {
    name: "Ithaca Children's Garden — Cass Park",
    address: "Cass Park, Ithaca (~45 min)",
    website: "ithacachildrensgarden.org",
    cost: "Free admission",
    hours: "Open daily",
    highlights: "Award-winning 3-acre public garden designed entirely for kids. Botanical play features, climbing, digging areas. A gem — worth the drive.",
    stars: 0,
    accent: "none",
  },
  {
    name: "Cayuga Nature Center",
    address: "1420 Taughannock Blvd, Ithaca (~45 min)",
    phone: "(607) 273-6260",
    cost: "Varies",
    hours: "Daily 10am–5pm",
    highlights: "40+ live animal ambassadors. Easy walking trails. Great for a nature walk with a toddler. Also available for birthday party rentals.",
    stars: 0,
    accent: "none",
  },
  {
    name: "Crazy Daisies Greenhouse & Garden Cafe",
    address: "4693 Kasson Rd, Syracuse, NY (~20 min)",
    website: "crazydaisiesflowers.com",
    cost: "Free to visit",
    hours: "Open daily",
    highlights: "Family + dog-friendly garden cafe + greenhouse. Great for a toddler stroll through the gardens; adults get good food + frequent events (trivia Thu+Sun, live music, plant workshops, pilates in the garden).",
    stars: 0,
    accent: "none",
  },
];

const PLAYGROUNDS = [
  { name: "Skaneateles Falls Playground", location: "School St, Skaneateles", notes: "Swings, basketball, baseball fields, open lawn" },
  { name: "Mottville Trailhead Playground", location: "Crow Hill Rd", notes: "Small playground at end of scenic creek trail" },
  { name: "Emerson Park Playground", location: "Auburn", notes: "Large multi-area playground, merry-go-round" },
  { name: "Clift Park Gazebo area", location: "15 W Genesee St", notes: "Grass lawns, benches, lake views" },
];

const BIRTHDAY_VENUES = [
  { name: "Skaneateles Community Center Pool Party", cost: "$350 non-member (up to 12 guests)", highlight: "Shallow water play area, easy, right in Skaneateles. Best for toddler pool party." },
  { name: "PlaySpace Auburn", cost: "Private 2-hr rental · up to 16 kids", highlight: "Low-key indoor play party, ages 0–6 crowd." },
  { name: "Owasco Splash Pad", cost: "FREE", highlight: "Easy, friends + family can spread out around fountain area." },
  { name: "Rosamond Gifford Zoo", cost: "MOST Museum birthday package from most.org", highlight: "Animal-themed with wildlife; all-day admission for guests." },
  { name: "Ithaca Children's Garden", cost: "Outdoor nature party", highlight: "Laid-back outdoor nature vibe; under 45 min drive." },
];

const BAKERIES = [
  { name: "Patisserie of Skaneateles", where: "Behind Sherwood Inn", phone: "(315) 685-2433", notes: "8\" cake ~$36, 10\" ~$48, 12\" ~$65. Fine pastries and custom birthday cakes. Call well in advance for specialty orders." },
  { name: "Skaneateles Bakery", where: "Jordan St, daily 7am–3pm", notes: "Scratch-made. Custom dessert bars — donuts, cupcakes, macarons. Great for a smash cake." },
  { name: "Cameron's Bakery", where: "169 Grant Ave, Auburn (~15 min)", notes: "Tue–Sun. Community staple with custom cakes. Good backup if Patisserie is booked." },
];

const TIMING = [
  { activity: "Clift Park Swimming", june: "Lifeguards start late June only" },
  { activity: "Owasco Splash Pad", june: "Opens mid-June (weather dependent)" },
  { activity: "Mid-Lakes Lunch Cruise", june: "Starts June 1" },
  { activity: "MOST Museum", june: "Thu–Sun year-round" },
  { activity: "Rosamond Gifford Zoo", june: "Open daily" },
  { activity: "PlaySpace Auburn", june: "Tue/Thu/Fri/Sat; Wed closed through ~June 17" },
  { activity: "Library Storytime", june: "Check skanlibrary.org for summer schedule" },
];

export default function ToddlerPage() {
  return (
    <div className="space-y-6 py-2 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <Baby className="w-8 h-8 text-white/80" />
          <div>
            <h1 className="text-xl font-bold">Egan&apos;s Picks</h1>
            <p className="text-pink-100 text-sm">Toddler & family activities for June 2026</p>
          </div>
        </div>
        <div className="mt-3 bg-white/20 rounded-lg p-2.5 text-sm">
          Egan is turning 2 in June — zoo is FREE (under 2)!
        </div>
      </div>

      {/* Water & Splash */}
      <section>
        <SectionHeader icon={Waves} title="Beaches & Splash Pads" />
        <div className="space-y-3">
          {WATER_ACTIVITIES.map((a) => <ActivityCard key={a.name} {...a} />)}
        </div>
      </section>

      {/* Indoor Play */}
      <section>
        <SectionHeader icon={Palette} title="Indoor Play & Museums" />
        <div className="space-y-3">
          {INDOOR_PLAY.map((a) => <ActivityCard key={a.name} {...a} />)}
        </div>
      </section>

      {/* Zoo */}
      <section>
        <SectionHeader icon={PawPrint} title="Zoo" />
        <div className="space-y-3">
          {ZOO.map((a) => <ActivityCard key={a.name} {...a} />)}
        </div>
      </section>

      {/* Nature */}
      <section>
        <SectionHeader icon={PlayCircle} title="Farms & Nature" />
        <div className="space-y-3">
          {NATURE.map((a) => <ActivityCard key={a.name} {...a} />)}
        </div>
      </section>

      {/* Library */}
      <section>
        <SectionHeader icon={BookOpen} title="Skaneateles Free Library Storytimes" />
        <Card>
          <div className="divide-y divide-slate-100">
            {[
              { program: "Baby Bounce & Rhyme", when: "Wednesdays at 9:15 AM", ages: "Babies up to 2 (with caregiver)" },
              { program: "Read, Sing, Play Story Time", when: "Wednesdays at 10:30 AM", ages: "Ages 2–5" },
              { program: "Story Time for Book Worms", when: "Thursdays at 10:30 AM", ages: "Older toddlers, longer books + craft" },
            ].map((item) => (
              <div key={item.program} className="py-2.5 first:pt-0 last:pb-0">
                <div className="font-medium text-slate-800 text-sm">{item.program}</div>
                <div className="text-xs text-slate-500">{item.when}</div>
                <Badge label={item.ages} variant="toddler" />
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Check skanlibrary.org for summer programming</p>
        </Card>
      </section>

      {/* Mid-Lakes */}
      <section>
        <SectionHeader icon={Ship} title="Boat Cruises" subtitle="Mid-Lakes Navigation · 11 Jordan St" />
        <Card>
          <div className="divide-y divide-slate-100">
            {[
              { type: "Sightseeing (50 min)", details: "Daily, multiple times · $17 adults / $10 kids" },
              { type: "Lunch Cruise", details: "Tue/Wed/Fri · $34/child (buffet) · starts June 1" },
              { type: "Science Sunday", details: "July 5, 19, Aug 2, 16 · $20" },
            ].map((c) => (
              <div key={c.type} className="py-2.5 first:pt-0 last:pb-0">
                <div className="font-medium text-slate-800 text-sm">{c.type}</div>
                <div className="text-xs text-slate-500">{c.details}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-sky-700 mt-2">Dogs welcome on sightseeing cruises · Egan will love being on the water</p>
        </Card>
      </section>

      {/* Playgrounds */}
      <section>
        <SectionHeader icon={PlayCircle} title="Playgrounds" />
        <Card>
          <div className="divide-y divide-slate-100">
            {PLAYGROUNDS.map((pg) => (
              <div key={pg.name} className="py-2.5 first:pt-0 last:pb-0">
                <div className="font-medium text-slate-800 text-sm">{pg.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />{pg.location}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{pg.notes}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Birthday */}
      <section>
        <SectionHeader icon={Cake} title="Egan's 2nd Birthday" subtitle="Party venue ideas" />
        <div className="space-y-3">
          {BIRTHDAY_VENUES.map((venue) => (
            <Card key={venue.name} accent="yellow">
              <h3 className="font-bold text-slate-800 text-sm mb-1">{venue.name}</h3>
              <Badge label={venue.cost} variant="price" />
              <p className="text-sm text-slate-600 mt-1.5">{venue.highlight}</p>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-slate-600 mb-2">Custom Birthday Cakes</h3>
          <div className="space-y-2">
            {BAKERIES.map((b) => (
              <Card key={b.name}>
                <div className="font-bold text-slate-800 text-sm">{b.name}</div>
                <div className="text-xs text-slate-500 mb-1">{b.where}</div>
                <p className="text-xs text-slate-600">{b.notes}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* June timing */}
      <section>
        <SectionHeader icon={Calendar} title="June Timing Notes" subtitle="What's open when" />
        <Card>
          <div className="divide-y divide-slate-100">
            {TIMING.map((row) => (
              <div key={row.activity} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-2">
                <div className="font-medium text-slate-800 text-sm">{row.activity}</div>
                <div className="text-xs text-slate-500 text-right max-w-[45%]">{row.june}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* At-home activities */}
      <section>
        <SectionHeader icon={CheckSquare} title="At-Home Activities" subtitle="At the lake house — no drive required" />
        <div className="space-y-2">
          {[
            "Sprout a radish from seed — sprouts in 3–5 days, fast enough to hold a toddler's attention",
            "Bug Hotel — stack sticks, pinecones, bark in a tin can at the woods edge; daily bug check",
            "Firefly Watch — after dinner, sit in the grass as it gets dark. Try to catch one in cupped hands and release",
            "Rock painting — collect smooth lake rocks, paint faces or animals",
            "Dock time — feed ducks, toss rocks, watch boats",
            "Press wildflowers & leaves between wax paper in heavy books for 5–7 days",
            "Hunt for roly-polies under rocks near damp soil — they roll into a ball!",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg border border-slate-100 p-3 shadow-sm">
              <div className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
              <p className="text-sm text-slate-700">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
