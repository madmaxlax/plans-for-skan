import { UtensilsCrossed, Phone, Globe, MapPin, Star, AlertCircle, Sun, IceCream, CheckSquare } from "lucide-react";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import { Badge, PriceBadge, StarBadge } from "../components/Badges";

interface RestaurantProps {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  price: string;
  cuisine: string;
  meals?: string;
  highlights: string;
  toddlerNotes?: string;
  stars?: number;
  accent?: "yellow" | "blue" | "green" | "none";
}

function RestaurantCard({ name, address, phone, website, price, cuisine, meals, highlights, toddlerNotes, stars, accent = "none" }: RestaurantProps) {
  return (
    <Card accent={accent}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-slate-800 text-base leading-tight">{name}</h3>
        <div className="flex gap-1.5 shrink-0">
          {stars && <StarBadge count={stars} />}
          <PriceBadge price={price} />
        </div>
      </div>
      <div className="text-xs text-slate-500 mb-2">{cuisine}{meals ? ` · ${meals}` : ""}</div>
      {address && (
        <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-1">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          {address}
        </div>
      )}
      {phone && (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          {phone}
        </div>
      )}
      {website && (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          {website}
        </div>
      )}
      <p className="text-sm text-slate-700 mb-2">{highlights}</p>
      {toddlerNotes && (
        <div className="flex items-start gap-1.5 bg-pink-50 rounded-lg p-2 mt-1">
          <Star className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
          <p className="text-xs text-pink-700">{toddlerNotes}</p>
        </div>
      )}
    </Card>
  );
}

const FINE_DINING = [
  {
    name: "Sherwood Inn",
    address: "26 W Genesee St, Skaneateles",
    phone: "(315) 685-3405",
    website: "sherwoodinns.com",
    price: "$$$-$$$$",
    cuisine: "American / Lakeside",
    meals: "Breakfast, Lunch, Dinner",
    highlights: "Historic 1807 inn directly across from Clift Park. Classic American fare, excellent brunch, signature Fish Fry for Two on Fridays. Also home to the Patisserie bakery — rotating artisan pastries, croissants, scones. Must-stop every visit.",
    toddlerNotes: "Upscale but not unfriendly. Best for breakfast or lunch with Egan. High chairs available.",
    stars: 1,
    accent: "yellow" as const,
  },
  {
    name: "Rosalie's Cucina",
    address: "841 W Genesee St",
    phone: "(315) 685-2200",
    website: "rosaliescucina.com",
    price: "$$$",
    cuisine: "Italian / Contemporary American",
    meals: "Dinner",
    highlights: "Rustic Italian, wood-fired dishes, handmade pasta, great wine list. One of the most beloved restaurants in the village.",
    toddlerNotes: "Relaxed Italian — manageable with a toddler but best for date night.",
    stars: 0,
    accent: "none" as const,
  },
  {
    name: "Elephant and the Dove",
    address: "26 Jordan St",
    price: "$$$",
    cuisine: "Contemporary American",
    meals: "Dinner",
    highlights: "Elegant, intimate dining. Strong local reputation for creative seasonal dishes.",
    toddlerNotes: "Quieter, more formal — better as an adult evening out.",
    stars: 0,
    accent: "none" as const,
  },
];

const MID_RANGE = [
  {
    name: "Bluewater Grill",
    address: "11 W Genesee St",
    phone: "(315) 685-6600",
    price: "$$-$$$",
    cuisine: "Seafood / American",
    meals: "Lunch, Dinner",
    highlights: "Great outdoor patio with lake views. Seafood-forward menu — fish, lobster, clam chowder — plus burgers and pasta. Strong cocktail menu.",
    toddlerNotes: "Outdoor patio is great with toddlers — space to roam. Staff welcoming to families.",
    stars: 1,
    accent: "blue" as const,
  },
  {
    name: "Moro's Kitchen",
    address: "29 Jordan St",
    price: "$$",
    cuisine: "Mediterranean / American",
    meals: "Lunch, Dinner",
    highlights: "Local favorite, generous portions, casual and inviting atmosphere. Mediterranean influences — good pasta, grilled items, soups.",
    toddlerNotes: "Casual and welcoming; solid choice for a relaxed family dinner.",
    stars: 0,
    accent: "none" as const,
  },
  {
    name: "Gilda's",
    address: "34 Jordan St",
    price: "$$",
    cuisine: "American comfort / Italian",
    meals: "Lunch, Dinner",
    highlights: "One of the highest-rated spots in the village. Cozy and excellent value. Known for pasta, sandwiches, and daily specials. Very popular with locals and visitors.",
    toddlerNotes: "Welcoming atmosphere, casual — excellent choice when Egan is in tow. High chairs available.",
    stars: 2,
    accent: "yellow" as const,
  },
  {
    name: "LakeHouse Pub",
    price: "$$",
    cuisine: "Pub food / Casual American",
    meals: "Lunch, Dinner",
    highlights: "Relaxed lakeside pub vibes. Good burgers, sandwiches, bar food.",
    toddlerNotes: "Casual atmosphere, fine for families especially at lunch.",
    stars: 0,
    accent: "none" as const,
  },
];

const CASUAL = [
  {
    name: "Doug's Fish Fry",
    address: "8 Jordan St",
    phone: "(315) 685-3288",
    website: "dougsfishfryskaneateles.com",
    price: "$-$$",
    cuisine: "Fried seafood / Casual American",
    meals: "Lunch & Dinner",
    highlights: "Legendary Skaneateles institution. Counter-service fried seafood — haddock, shrimp, clams, chowder. Fish sandwich ~$10. Beer & wine available. Also serves ice cream and shakes.",
    toddlerNotes: "Made for this — counter service, outdoor seating, zero formality. Egan can make a mess and no one cares. Don't leave Skaneateles without coming here.",
    stars: 3,
    accent: "yellow" as const,
  },
  {
    name: "Johnny Angel's Heavenly Burgers",
    address: "22 Jordan St",
    price: "$",
    cuisine: "Burgers / Sandwiches",
    highlights: "Classic diner-style burgers and comfort food. Great for a quick, casual lunch.",
    toddlerNotes: "Very kid-friendly, affordable, zero fuss.",
    stars: 0,
    accent: "none" as const,
  },
  {
    name: "Clover's",
    address: "Downtown Skaneateles",
    website: "cloversskan.com",
    price: "$-$$",
    cuisine: "Breakfast / Brunch",
    meals: "Mon–Fri 7am–2pm",
    highlights: "Casual breakfast and lunch spot. Affordable, homey. Great for morning fuel before hiking or lake activities.",
    toddlerNotes: "Relaxed, casual — good with a toddler in the morning.",
    stars: 0,
    accent: "none" as const,
  },
  {
    name: "Skaneateles Brewery",
    address: "34 Fennell St",
    price: "$$",
    cuisine: "Pub food + craft beer",
    highlights: "Warm taproom in a stunning historic mill. Dog-friendly and family-friendly. Rotating craft taps, live music nights, trivia.",
    toddlerNotes: "Great casual group spot — indoor and outdoor seating, laid-back vibe.",
    stars: 0,
    accent: "none" as const,
  },
];

const OUTDOOR_DINING = [
  { name: "Bluewater Grill", feature: "Lake-view patio", bestFor: "Groups, nice lunch" },
  { name: "Doug's Fish Fry", feature: "Casual outdoor tables", bestFor: "Toddler + quick lunch" },
  { name: "Skaneateles Brewery", feature: "Outdoor garden", bestFor: "Evening group hang" },
  { name: "Sherwood Inn / Patisserie", feature: "Patio", bestFor: "Morning pastries/brunch" },
];

const FOLLOW_UPS = [
  "Rosalie's Cucina: Reservations strongly recommended for summer weekends — call (315) 685-2200",
  "Sherwood Inn: Reserve ahead for weekend dinner. Friday Fish Fry is popular — may need advance booking",
  "Bluewater Grill: Outdoor patio fills up fast on warm summer evenings — reserve ahead",
  "Gilda's: No reservations typically taken — go early or off-peak",
  "Doug's Fish Fry: No reservations needed but can have a line in summer. Can order ahead by phone",
  "Mid-Lakes Navigation lunch/dinner cruise: Book online in advance — often sells out weeks ahead",
];

export default function FoodPage() {
  return (
    <div className="space-y-6 py-2 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="w-8 h-8 text-white/80" />
          <div>
            <h1 className="text-xl font-bold">Restaurants</h1>
            <p className="text-orange-100 text-sm">Skaneateles dining guide — June 2026</p>
          </div>
        </div>
      </div>

      {/* Fine Dining */}
      <section>
        <SectionHeader icon={Star} title="Fine Dining" subtitle="Reserve ahead!" />
        <div className="space-y-3">
          {FINE_DINING.map((r) => <RestaurantCard key={r.name} {...r} />)}
        </div>
      </section>

      {/* Mid-Range */}
      <section>
        <SectionHeader icon={UtensilsCrossed} title="Mid-Range" subtitle="Great for groups & mixed toddler/adult" />
        <div className="space-y-3">
          {MID_RANGE.map((r) => <RestaurantCard key={r.name} {...r} />)}
        </div>
      </section>

      {/* Casual */}
      <section>
        <SectionHeader icon={IceCream} title="Casual & Kid-Friendly" />
        <div className="space-y-3">
          {CASUAL.map((r) => <RestaurantCard key={r.name} {...r} />)}
        </div>
      </section>

      {/* Outdoor dining */}
      <section>
        <SectionHeader icon={Sun} title="Best Outdoor Dining" subtitle="For a summer day" />
        <Card>
          <div className="divide-y divide-slate-100">
            {OUTDOOR_DINING.map((spot) => (
              <div key={spot.name} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-slate-800 text-sm">{spot.name}</div>
                  <div className="text-xs text-slate-500">{spot.feature}</div>
                </div>
                <Badge label={spot.bestFor} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Ice Cream */}
      <section>
        <SectionHeader icon={IceCream} title="Ice Cream & Dessert" />
        <Card>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">★</span>Patisserie at Sherwood Inn — artisan pastries, croissants, seasonal treats. Best in village. <span className="text-slate-400 text-xs">Walk it to Clift Park.</span></li>
            <li>Doug&apos;s Fish Fry — ice cream and shakes at counter</li>
            <li>Skaneateles Bakery — Jordan St area, baked goods</li>
            <li>Clover&apos;s — pastries at breakfast</li>
          </ul>
        </Card>
      </section>

      {/* Auburn options */}
      <section>
        <SectionHeader icon={MapPin} title="Auburn Day-Trip Lunch" subtitle="~15 min away" />
        <div className="space-y-3">
          <Card accent="blue">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-slate-800">Prison City Pub &amp; Brewery</h3>
              <PriceBadge price="$$" />
            </div>
            <p className="text-xs text-slate-500 mb-2">28 State St, Auburn · (315) 406-2494</p>
            <p className="text-sm text-slate-700">Best craft brewery in Auburn. Great pub food (burgers, wings, fish tacos), 20+ taps of house beers. Named after Auburn Correctional Facility.</p>
          </Card>
          <Card>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-slate-800">Elderberry Pond Restaurant</h3>
              <PriceBadge price="$$-$$$" />
            </div>
            <p className="text-xs text-slate-500 mb-2">3576 Center St Rd, Auburn</p>
            <p className="text-sm text-slate-700">Farm-to-table dining on a working organic farm. Beautiful setting, seasonal menu, excellent local sourcing. More of an experience than a quick stop.</p>
          </Card>
          <Card>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-slate-800">New Hope Mills Café</h3>
              <PriceBadge price="$" />
            </div>
            <p className="text-xs text-slate-500 mb-2">Near Moravia / Fillmore Glen</p>
            <p className="text-sm text-slate-700">Famous for buckwheat pancakes and fresh-milled flours. Great breakfast/lunch stop if pairing with a Fillmore Glen hike.</p>
          </Card>
        </div>
      </section>

      {/* Follow-ups */}
      <section>
        <SectionHeader icon={AlertCircle} title="Booking Reminders" />
        <div className="space-y-2">
          {FOLLOW_UPS.map((item, i) => (
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
