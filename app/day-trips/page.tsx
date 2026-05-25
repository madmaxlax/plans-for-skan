import {
  MapPin,
  Phone,
  Globe,
  Clock,
  Star,
  Calendar,
  Wine,
  Camera,
  Users,
  CheckSquare,
} from "lucide-react";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { Badge, PriceBadge, StarBadge } from "../components/Badges";

// ─── Auburn (~15 min) ─────────────────────────────────────────────────────────

const AUBURN_SITES = [
  {
    name: "Harriet Tubman National Historical Park",
    address: "180 South St, Auburn, NY",
    phone: "(315) 255-1553",
    website: "nps.gov/hart",
    cost: "Free (NPS)",
    hours: "Fri–Sat 10am–4pm · Ranger tours 11:30am & 3pm (verify 2026 summer hours)",
    details: "Thompson Memorial A.M.E. Zion Church + Parsonage visitor center. Ranger-guided tours. Must-do.",
    stars: 1,
    accent: "green" as const,
  },
  {
    name: "Harriet Tubman Home (A.M.E. Zion Church)",
    address: "180 South St, Auburn, NY",
    phone: "(315) 252-2081",
    cost: "Varies",
    hours: "Call ahead for tour availability",
    details: "The actual homestead grounds, managed by the A.M.E. Zion Church (separate from NHP).",
    accent: "none" as const,
  },
  {
    name: "Seward House Museum",
    address: "33 South St, Auburn, NY",
    phone: "(315) 252-1283",
    website: "sewardhouse.org",
    cost: "Admission fee",
    hours: "Call or check website",
    details: "Historic home of William H. Seward — Lincoln's Secretary of State, famous for 'Seward's Folly' (the Alaska purchase).",
    accent: "none" as const,
  },
  {
    name: "Emerson Park & Owasco Lake Waterfront",
    address: "North end of Owasco Lake, Auburn",
    cost: "Free",
    hours: "Dawn to dusk",
    details: "Picnic pavilions, boat launches, large playground, merry-go-round, disc golf. Excellent full-day family outing. Pack a picnic.",
    stars: 1,
    accent: "blue" as const,
  },
  {
    name: "Owasco Splash Pad",
    address: "2 Bristol Ave, Auburn, NY",
    cost: "FREE",
    hours: "9am–8pm daily (opens mid-June)",
    details: "Water sprays, fountains, interactive features. Adjacent playground + bathrooms. Flat, no pool depth — perfect for Egan.",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "Schweinfurth Art Center",
    address: "205 Genesee St, Auburn, NY",
    phone: "(315) 255-1553",
    cost: "Varies",
    hours: "Wed–Sat/Sun (call ahead)",
    details: "Regional art museum with rotating exhibits. Easy add-on to an Auburn day.",
    accent: "none" as const,
  },
  {
    name: "Prison City Pub & Brewery",
    address: "28 State St, Auburn · (315) 406-2494",
    cost: "$$",
    hours: "Daily lunch + dinner",
    details: "Best craft brewery in Auburn. Great pub food (burgers, wings, fish tacos), 20+ house taps. Named after Auburn Correctional Facility.",
    stars: 1,
    accent: "yellow" as const,
  },
];

// ─── Ithaca (~45 min) ─────────────────────────────────────────────────────────

const ITHACA_SITES = [
  {
    name: "Robert H. Treman State Park",
    address: "105 Enfield Falls Rd, Ithaca, NY",
    cost: "$7–$8 vehicle",
    hours: "Dawn to dusk",
    details: "Lucifer Falls (12-story waterfall!), swimming hole at Lower Falls, gorge trail. Spectacular.",
    stars: 1,
    accent: "green" as const,
  },
  {
    name: "Taughannock Falls State Park",
    address: "2221 Taughannock Rd, Trumansburg, NY (~35 min)",
    cost: "$7–$8 vehicle",
    hours: "Dawn to dusk",
    details: "215-foot falls — tallest east of the Rockies. The main overlook trail is flat and stroller-friendly (1 mile round-trip). Easiest waterfall hike for Egan.",
    stars: 1,
    accent: "green" as const,
  },
  {
    name: "Buttermilk Falls State Park",
    address: "112 E Buttermilk Falls Rd, Ithaca, NY",
    cost: "$7–$8 vehicle",
    hours: "Dawn to dusk",
    details: "Natural swimming pool under the falls (cold but gorgeous). Gorge trail. Popular in summer — arrive early.",
    accent: "none" as const,
  },
  {
    name: "Ithaca Farmers Market",
    address: "545 3rd St, Ithaca, NY (Steamboat Landing)",
    cost: "Free admission",
    hours: "Sat 9am–3pm · Sun 10am–3pm (May–Dec)",
    details: "One of the best farmers markets in upstate NY. Produce, crafts, live music, food stalls. Right on Cayuga Lake — Egan will love it.",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "Ithaca Commons",
    address: "East State St, downtown Ithaca",
    cost: "Free",
    hours: "Shops/restaurants open daily",
    details: "Outdoor pedestrian mall with dining, boutiques, and street performers. Great energy for families.",
    accent: "none" as const,
  },
  {
    name: "Ithaca Children's Garden — Cass Park",
    address: "Cass Park, Ithaca, NY",
    website: "ithacachildrensgarden.org",
    cost: "Free",
    hours: "Open daily",
    details: "Award-winning 3-acre public garden designed entirely for kids. Botanical play features, climbing, digging areas. Worth the drive for Egan.",
    accent: "none" as const,
  },
  {
    name: "Cascadilla Gorge",
    address: "Downtown Ithaca",
    cost: "Free",
    hours: "Open daily",
    details: "Walk the gorge path from downtown to Cornell campus. Moderate steps but stunning urban gorge.",
    accent: "none" as const,
  },
];

// ─── Syracuse (~30 min) ───────────────────────────────────────────────────────

const SYRACUSE_SITES = [
  {
    name: "Rosamond Gifford Zoo at Burnet Park",
    address: "1 Conservation Pl, Syracuse, NY",
    phone: "(315) 435-8511",
    website: "rosamondgiffordzoo.org",
    cost: "Under 2: FREE · Youth: $2–5 · Adults: $5–9",
    hours: "Daily 10am–4:30pm",
    details: "Top 10% AZA-accredited zoo. 700+ animals. Elephants, snow leopards, penguins, farm animals. Egan gets in FREE (turning 2)!",
    stars: 2,
    accent: "blue" as const,
  },
  {
    name: "MOST — Museum of Science & Technology",
    address: "500 S Franklin St, Syracuse, NY",
    phone: "(315) 425-9068",
    website: "most.org",
    cost: "~$10 adults",
    hours: "Thu–Sun 10am–5pm",
    details: "5-level Science Playhouse for toddlers — sensory-friendly hands-on exhibits. IMAX dome. Sunday family events.",
    accent: "none" as const,
  },
  {
    name: "Onondaga Lake Park",
    address: "Liverpool, NY (north Syracuse)",
    cost: "Free",
    hours: "Dawn to dusk",
    details: "Free lakeside park with walking/biking paths, playground, splash pad. Good casual family outing.",
    accent: "none" as const,
  },
  {
    name: "Armory Square",
    address: "Downtown Syracuse",
    cost: "Free to explore",
    hours: "Restaurants open daily",
    details: "Downtown dining + bar district. Multiple restaurants, breweries, bars within walking distance. Great for adult evenings with Gabbi & Kevin.",
    accent: "none" as const,
  },
];

// ─── Seneca Falls (~35 min) ───────────────────────────────────────────────────

const SENECA_FALLS = [
  {
    name: "Women's Rights National Historical Park",
    address: "136 Fall St, Seneca Falls, NY",
    website: "nps.gov/wori",
    cost: "Free (NPS)",
    hours: "Daily",
    details: "Site of the 1848 Women's Rights Convention and original Declaration of Sentiments. Powerful and educational.",
    stars: 1,
    accent: "green" as const,
  },
  {
    name: "It's a Wonderful Life Museum",
    address: "32 Fall St, Seneca Falls, NY",
    cost: "Small admission",
    hours: "Check website",
    details: "Seneca Falls is widely believed to be the inspiration for Bedford Falls in the film. Charming small museum.",
    accent: "none" as const,
  },
  {
    name: "Seneca Falls Brewing Co.",
    address: "8491 Lower Lake Rd, Seneca Falls, NY",
    cost: "$$",
    hours: "Daily",
    details: "Great brewery stop after the historical park. Pair with a drive south along the Cayuga Lake Wine Trail.",
    accent: "none" as const,
  },
];

// ─── Wineries ─────────────────────────────────────────────────────────────────

const WINERIES = [
  {
    name: "Anyela's Vineyards",
    address: "2433 W Lake Rd, Skaneateles, NY (~10 min south)",
    phone: "(315) 685-3797",
    website: "anyelasvineyards.com",
    hours: "Mon–Sun 12pm–5pm (check for extended summer hours)",
    details: "The ONLY winery on Skaneateles Lake. 100 acres, 19 wines — estate reds, whites, spirits. Stunning vineyard + lake views. Pizza/food on-site (verify). Closest and most scenic.",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "King Ferry Winery / Treleaven Wines",
    address: "658 Lake Rd, King Ferry, NY",
    hours: "Check website",
    details: "Closest Cayuga Lake winery to Skaneateles (east shore). Excellent whites.",
    accent: "none" as const,
  },
  {
    name: "Thirsty Owl Wine Company",
    address: "6799 Elm Beach Rd, Ovid, NY (west shore Cayuga)",
    hours: "Check website",
    details: "Beautiful vineyard, excellent whites and reds. One of the best on the Cayuga Wine Trail.",
    accent: "none" as const,
  },
  {
    name: "Sheldrake Point Winery",
    address: "7448 County Rd 153, Ovid, NY",
    hours: "Check website",
    details: "Stunning lake views, great rosé and Riesling. Very popular.",
    accent: "none" as const,
  },
  {
    name: "Skaneateles Brewery",
    address: "34 Fennell St, Skaneateles, NY (~5 min)",
    hours: "Daily (check website for live music nights)",
    details: "Historic mill building in the village. Family-friendly, dog-friendly, rotating craft taps, pub food, live music + trivia nights.",
    accent: "none" as const,
  },
];

// ─── June Events ──────────────────────────────────────────────────────────────

const JUNE_EVENTS = [
  {
    name: "Taste of Syracuse",
    date: "June 5–6, 2026",
    location: "Clinton Square, Downtown Syracuse",
    details: "Food trucks, restaurants, live music. Good group day trip.",
    cost: "Free",
    accent: "blue" as const,
  },
  {
    name: "NYS Blues Festival",
    date: "June 11–13, 2026",
    location: "Downtown Syracuse",
    details: "Admission FREE. Great excuse for a Gabbi & Kevin meetup day.",
    cost: "FREE",
    accent: "yellow" as const,
    stars: 1,
  },
  {
    name: "Finger Lakes Triathlon",
    date: "June 21, 2026",
    location: "Taughannock Falls State Park, Trumansburg",
    details: "Sprint or Olympic distance. Swim in Cayuga Lake. ~$139–149 entry. runsignup.com",
    cost: "$139–149",
    accent: "none" as const,
  },
  {
    name: "Ithaca Reggae Fest",
    date: "June 26–28, 2026",
    location: "Ithaca, NY",
    details: "Check eventbrite.com for tickets and venue.",
    cost: "Ticketed",
    accent: "none" as const,
  },
  {
    name: "Skaneateles Farmers Market",
    date: "Every Thursday + Saturday",
    location: "Austin Park Pavilion, 1 E Austin St, Skaneateles",
    details: "Thursday 3–6pm · Saturday 9:30am–12:30pm. Local produce, crafts, food.",
    cost: "Free",
    accent: "green" as const,
  },
];

// ─── Follow-Ups ───────────────────────────────────────────────────────────────

const FOLLOW_UPS = [
  "Mid-Lakes Navigation (lunch/dinner cruises): Book ASAP — fills up fast. midlakesnavigation.com",
  "Harriet Tubman NHP 2026 hours: Fri–Sat only on website — call (315) 255-1553 to confirm expanded June hours",
  "Rosamond Gifford Zoo: Confirm any summer programming if doing Syracuse day with Gabbi & Kevin",
  "Anyela's Vineyards: Call ahead for food availability and extended June hours: (315) 685-3797",
  "NY State Blues Festival (June 11–13): Confirm exact venue and parking — great group outing",
  "Skaneateles Festival (July 30 – Aug 22): Tickets on sale now at skanfest.org — classical, jazz, bluegrass",
  "Skaneateles June events: Check skaneateles.com/calendar closer to trip for newly announced events",
];

interface SiteCardProps {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  cost?: string;
  hours?: string;
  details: string;
  stars?: number;
  accent?: "yellow" | "blue" | "green" | "none";
}

function SiteCard({ name, address, phone, website, cost, hours, details, stars, accent = "none" }: SiteCardProps) {
  return (
    <Card accent={accent}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-bold text-slate-800 text-sm leading-tight">{name}</h3>
        {stars ? <StarBadge count={stars} /> : null}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {cost && <PriceBadge price={cost} />}
        {hours && <div className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3 h-3" />{hours}</div>}
      </div>
      {address && (
        <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-1">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{address}
        </div>
      )}
      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-2">
        {phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{phone}</span>}
        {website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{website}</span>}
      </div>
      <p className="text-sm text-slate-700">{details}</p>
    </Card>
  );
}

export default function DayTripsPage() {
  return (
    <div className="space-y-6 py-2 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8 text-white/80" />
          <div>
            <h1 className="text-xl font-bold">Day Trips</h1>
            <p className="text-purple-100 text-sm">Auburn, Ithaca, Syracuse, Seneca Falls & wineries</p>
          </div>
        </div>
      </div>

      {/* Quick distance reference */}
      <Card>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { dest: "Auburn", time: "~15 min" },
            { dest: "Ithaca", time: "~45 min" },
            { dest: "Syracuse", time: "~30 min" },
            { dest: "Seneca Falls", time: "~35 min" },
            { dest: "Cayuga Wine Trail", time: "~30–45 min" },
            { dest: "Anyela's Vineyards", time: "~10 min" },
          ].map((d) => (
            <div key={d.dest} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
              <span className="text-sm font-medium text-slate-700">{d.dest}</span>
              <Badge label={d.time} />
            </div>
          ))}
        </div>
      </Card>

      {/* Auburn */}
      <section>
        <SectionHeader icon={Camera} title="Auburn" subtitle="~15 min west on US-20 · history + waterfront" />
        <div className="space-y-3">
          {AUBURN_SITES.map((s) => <SiteCard key={s.name} {...s} />)}
        </div>
      </section>

      {/* Ithaca */}
      <section>
        <SectionHeader icon={Camera} title="Ithaca" subtitle="~45 min south · waterfalls + farmers market" />
        <Card className="mb-3 bg-purple-50 border-purple-100">
          <p className="text-xs text-purple-700 font-medium">
            💡 Best strategy: Drive down for 9am Sat farmers market → Buttermilk Falls swim → lunch on Ithaca Commons → drive home. Or hit Taughannock in the morning (easy Egan hike) + lunch in Trumansburg.
          </p>
        </Card>
        <div className="space-y-3">
          {ITHACA_SITES.map((s) => <SiteCard key={s.name} {...s} />)}
        </div>
      </section>

      {/* Syracuse */}
      <section>
        <SectionHeader icon={Users} title="Syracuse" subtitle="~30 min north · zoo + museums + Gabbi & Kevin" />
        <div className="space-y-3">
          {SYRACUSE_SITES.map((s) => <SiteCard key={s.name} {...s} />)}
        </div>
      </section>

      {/* Seneca Falls */}
      <section>
        <SectionHeader icon={Camera} title="Seneca Falls" subtitle="~35 min west · history + wine trail" />
        <Card className="mb-3 bg-purple-50 border-purple-100">
          <p className="text-xs text-purple-700 font-medium">
            💡 Good pairing: Seneca Falls + drive south along Cayuga Lake Wine Trail on the way back.
          </p>
        </Card>
        <div className="space-y-3">
          {SENECA_FALLS.map((s) => <SiteCard key={s.name} {...s} />)}
        </div>
      </section>

      {/* Wineries */}
      <section>
        <SectionHeader icon={Wine} title="Wineries & Breweries" subtitle="Skaneateles Lake + Cayuga Wine Trail" />
        <Card className="mb-3 bg-purple-50 border-purple-100">
          <p className="text-xs text-purple-700 font-medium">
            💡 Adult day: Leave Egan with grandparent/babysitter → drive west shore of Cayuga (NY-89), hit 3–4 wineries, lunch at one, circle back through Seneca Falls.
          </p>
        </Card>
        <div className="space-y-3">
          {WINERIES.map((w) => <SiteCard key={w.name} {...w} />)}
        </div>
        <Card className="mt-3">
          <p className="text-xs text-slate-500">Full Cayuga Wine Trail map + passport: <span className="font-medium text-sky-600">cayugawinetrail.com</span></p>
          <p className="text-xs text-slate-500 mt-1">Seneca Lake Wine Trail (~1 hr away): ~50 wineries. Keuka Lake (~1.5 hrs): another full day.</p>
        </Card>
      </section>

      {/* June Events */}
      <section>
        <SectionHeader icon={Calendar} title="June Events" subtitle="What's happening this month" />
        <div className="space-y-3">
          {JUNE_EVENTS.map((e) => (
            <Card key={e.name} accent={e.accent}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-sm">{e.name}</h3>
                {e.stars ? <StarBadge count={e.stars} /> : null}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <Badge label={e.date} variant="star" />
                <PriceBadge price={e.cost} />
              </div>
              <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{e.location}
              </div>
              <p className="text-sm text-slate-700">{e.details}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Follow-ups */}
      <section>
        <SectionHeader icon={CheckSquare} title="Booking Reminders" subtitle="Do these before the trip" />
        <div className="space-y-2">
          {FOLLOW_UPS.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg border border-slate-100 p-3 shadow-sm">
              <Star className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
