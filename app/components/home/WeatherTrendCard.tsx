import {
  CloudSun, Sun, Cloud, CloudRain, CloudSnow, CloudLightning,
  ArrowUp, ArrowDown, Waves, TrendingUp, type LucideIcon,
} from "lucide-react";
import type { WeatherCondition, WeatherSnapshot, ForecastDay } from "@/app/lib/weather";
import type { LakeTemp } from "@/app/lib/lake-temp";

const ICONS: Record<WeatherCondition, LucideIcon> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  cloud: Cloud,
  "cloud-rain": CloudRain,
  rain: CloudRain,
  snow: CloudSnow,
  thunder: CloudLightning,
};

const HI_MIN = 55;
const HI_MAX = 90;
const BAR_MAX_W = 42;

type CellTone = "today" | "past" | "future";

const CELL_STYLES: Record<CellTone, {
  cell: string; dow: string; temp: string; lo: string; iconBg: string; bar: string; barTrack: string;
}> = {
  today: {
    cell: "bg-ink",
    dow: "text-cream-100",
    temp: "text-white",
    lo: "text-cream-300",
    iconBg: "bg-cream-100/15",
    bar: "bg-coral",
    barTrack: "bg-cream-100/15",
  },
  past: {
    cell: "bg-transparent border border-cream-300",
    dow: "text-cream-500",
    temp: "text-cream-500",
    lo: "text-cream-500",
    iconBg: "bg-cream-100",
    bar: "bg-cream-400",
    barTrack: "bg-cream-200",
  },
  future: {
    cell: "bg-white border border-cream-300",
    dow: "text-muted-tan",
    temp: "text-ink",
    lo: "text-muted-tan",
    iconBg: "bg-cream-100",
    bar: "bg-coral/50",
    barTrack: "bg-cream-200",
  },
};

function cellTone(day: ForecastDay): CellTone {
  if (day.isToday) return "today";
  if (day.isPast) return "past";
  return "future";
}

function iconColorFor(day: ForecastDay, tone: CellTone): string {
  if (tone === "today") return "text-cream-300";
  if (day.condition === "cloud-rain" || day.condition === "rain") return "text-lake";
  return "text-coral";
}

function DayCell({ day }: { day: ForecastDay }) {
  const Icon = ICONS[day.condition];
  const tone = cellTone(day);
  const s = CELL_STYLES[tone];
  const barW = Math.max(10, Math.round(((day.hi - HI_MIN) / (HI_MAX - HI_MIN)) * BAR_MAX_W));

  return (
    <div className={`flex-1 flex flex-col items-center gap-1.5 rounded-md px-2 py-3 ${s.cell}`}>
      <div className={`text-[9px] font-bold tracking-[0.15em] ${s.dow}`}>{day.dow}</div>
      <div className={`w-8 h-8 rounded-full ${s.iconBg} flex items-center justify-center`}>
        <Icon className={`w-[18px] h-[18px] ${iconColorFor(day, tone)}`} />
      </div>
      <div className={`font-serif text-[20px] leading-none ${s.temp}`}>{day.hi}°</div>
      <div className={`text-[10px] ${s.lo}`}>{day.lo}°</div>
      <div className={`h-[6px] w-[42px] rounded-full ${s.barTrack}`}>
        <div className={`h-[6px] rounded-full ${s.bar}`} style={{ width: `${barW}px` }} />
      </div>
      <div className={`text-[9px] italic ${s.dow}`}>{day.precipPct}%</div>
    </div>
  );
}

function FallbackCard({ message }: { message: string }) {
  return (
    <div className="rounded-md bg-white border border-cream-400 p-6 text-center">
      <p className="font-serif italic text-muted-tan">{message}</p>
    </div>
  );
}

export default function WeatherTrendCard({
  weather,
  lake,
}: {
  weather: WeatherSnapshot | null;
  lake: LakeTemp;
}) {
  if (!weather) {
    return <FallbackCard message="weather temporarily unavailable · refresh later" />;
  }

  const { current, trend, trendSummary, peakLabel } = weather;
  const CurrentIcon = ICONS[current.condition];

  return (
    <div className="flex flex-col md:flex-row rounded-md bg-white border border-cream-400 overflow-hidden">
      {/* Hero: current conditions */}
      <div className="md:w-[460px] p-6 md:border-r border-cream-300 flex flex-col gap-3.5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-tan">
              WEATHER · SKANEATELES
            </div>
            <div className="font-serif text-[64px] leading-none text-ink mt-1">{current.temp}°</div>
            <div className="font-serif italic text-sm text-muted-tan mt-1">
              {current.conditionLabel} · feels {current.feelsLike}°
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center">
            <CurrentIcon className="w-9 h-9 text-coral" />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center pt-1">
          <Stat icon={ArrowUp}    value={`H ${current.hi}°`} accent="text-coral" />
          <Stat icon={ArrowDown}  value={`L ${current.lo}°`} accent="text-lake" />
          <Stat icon={CloudRain}  value={`${current.precipPct}% rain`} accent="text-muted-slate" />
          <Stat icon={Waves}      value={`lake ${lake.temp}°`} accent="text-lake" />
        </div>
      </div>

      {/* Forecast: 5-day trend */}
      <div className="flex-1 p-6 bg-cream-50">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.15em] text-muted-tan">5-DAY TREND</div>
            <div className="font-serif italic text-sm text-ink mt-0.5">{trendSummary}</div>
          </div>
          {peakLabel && (
            <div className="flex items-center gap-1.5 rounded-full bg-coral/10 px-2.5 py-1">
              <TrendingUp className="w-3 h-3 text-coral" />
              <span className="text-[10px] font-semibold italic text-coral">{peakLabel}</span>
            </div>
          )}
        </div>

        <div className="flex gap-1.5 items-end">
          {trend.map((d) => <DayCell key={d.dateISO} day={d} />)}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, accent }: { icon: LucideIcon; value: string; accent: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className={`w-3.5 h-3.5 ${accent}`} />
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}
