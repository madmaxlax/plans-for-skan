import { cache } from "react";
import { TRIP } from "../data/trip";
import { dowUpper } from "./dates";

export type WeatherCondition = "sun" | "cloud-sun" | "cloud" | "cloud-rain" | "rain" | "snow" | "thunder";

export type ForecastDay = {
  dateISO: string;
  dow: string;       // "MON"
  hi: number;        // °F
  lo: number;        // °F
  precipPct: number; // 0-100
  condition: WeatherCondition;
  isPast: boolean;
  isToday: boolean;
};

export type CurrentWeather = {
  temp: number;
  feelsLike: number;
  windMph: number;
  precipPct: number;
  hi: number;
  lo: number;
  condition: WeatherCondition;
  conditionLabel: string;
  sunsetLabel: string; // "8:43p"
  daylightLabel: string; // "21h 35m of daylight"
};

export type WeatherSnapshot = {
  current: CurrentWeather;
  trend: ForecastDay[]; // 1 past, today, +3 future = 5 days
  trendSummary: string; // "warmer through tue, rain thu"
  peakLabel: string | null; // "peak tue" or null
  fetchedAt: string;
};

const WMO_TO_CONDITION: Record<number, WeatherCondition> = {
  0: "sun",
  1: "cloud-sun",
  2: "cloud-sun",
  3: "cloud",
  45: "cloud", 48: "cloud",
  51: "cloud-rain", 53: "cloud-rain", 55: "cloud-rain",
  56: "cloud-rain", 57: "cloud-rain",
  61: "cloud-rain", 63: "rain", 65: "rain",
  66: "rain", 67: "rain",
  71: "snow", 73: "snow", 75: "snow", 77: "snow",
  80: "cloud-rain", 81: "rain", 82: "rain",
  85: "snow", 86: "snow",
  95: "thunder", 96: "thunder", 99: "thunder",
};

const WMO_TO_LABEL: Record<WeatherCondition, string> = {
  sun: "clear",
  "cloud-sun": "partly sunny",
  cloud: "cloudy",
  "cloud-rain": "showers",
  rain: "rainy",
  snow: "snowy",
  thunder: "thunderstorms",
};

function codeToCondition(code: number): WeatherCondition {
  return WMO_TO_CONDITION[code] ?? "cloud";
}

function formatTime12h(iso: string): string {
  // "2026-06-08T20:43" -> "8:43p"
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes();
  const suffix = h >= 12 ? "p" : "a";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

function buildTrendSummary(trend: ForecastDay[]): { summary: string; peakLabel: string | null } {
  // Identify the highest-high day in the next 3 (not yesterday).
  const future = trend.filter((d) => !d.isPast);
  if (future.length === 0) return { summary: "steady week", peakLabel: null };
  const peak = future.reduce((a, b) => (b.hi > a.hi ? b : a));
  const rainDay = future.find((d) => d.precipPct >= 50);
  const peakDow = peak.dow.toLowerCase();
  const parts: string[] = [];
  if (peak.dateISO !== future[0].dateISO) parts.push(`warmer through ${peakDow}`);
  if (rainDay) parts.push(`rain ${rainDay.dow.toLowerCase()}`);
  if (parts.length === 0) parts.push("calm stretch ahead");
  return { summary: parts.join(", "), peakLabel: peak.dateISO !== future[0].dateISO ? `peak ${peakDow}` : null };
}

async function fetchOpenMeteo(): Promise<WeatherSnapshot | null> {
  const { lat, lon } = TRIP;
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", "temperature_2m,apparent_temperature,windspeed_10m,weathercode,precipitation_probability");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,sunset");
  url.searchParams.set("past_days", "1");
  url.searchParams.set("forecast_days", "4");
  url.searchParams.set("temperature_unit", "fahrenheit");
  url.searchParams.set("windspeed_unit", "mph");
  url.searchParams.set("timezone", "America/New_York");

  const res = await fetch(url.toString(), { next: { revalidate: 1800 } });
  if (!res.ok) return null;
  const data = await res.json();

  const c = data.current;
  const d = data.daily;
  if (!c || !d || !Array.isArray(d.time)) return null;

  // Today index in the daily arrays — past_days=1 puts yesterday at index 0, today at 1.
  const todayISO = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const todayIdx = d.time.findIndex((t: string) => t === todayISO);
  const safeTodayIdx = todayIdx === -1 ? 1 : todayIdx;

  const trend: ForecastDay[] = d.time.map((dateISO: string, i: number) => ({
    dateISO,
    dow: dowUpper(dateISO),
    hi: Math.round(d.temperature_2m_max[i]),
    lo: Math.round(d.temperature_2m_min[i]),
    precipPct: Math.round(d.precipitation_probability_max?.[i] ?? 0),
    condition: codeToCondition(d.weathercode[i]),
    isPast: i < safeTodayIdx,
    isToday: i === safeTodayIdx,
  }));

  // Keep yesterday + today + next 3 = 5 days.
  const start = Math.max(0, safeTodayIdx - 1);
  const slice = trend.slice(start, start + 5);

  const today = slice.find((t) => t.isToday) ?? slice[1] ?? slice[0];
  const currentCondition = codeToCondition(c.weathercode);

  const { summary, peakLabel } = buildTrendSummary(slice);

  // Daylight = sunset - sunrise. Open-Meteo daily doesn't include sunrise unless asked,
  // but we can keep it simple and skip sunrise — just label sunset and leave daylight static.
  const sunsetISO = d.sunset?.[safeTodayIdx];
  const sunsetLabel = sunsetISO ? formatTime12h(sunsetISO) : "—";

  return {
    current: {
      temp: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      windMph: Math.round(c.windspeed_10m),
      precipPct: Math.round(c.precipitation_probability ?? today.precipPct),
      hi: today.hi,
      lo: today.lo,
      condition: currentCondition,
      conditionLabel: WMO_TO_LABEL[currentCondition],
      sunsetLabel,
      daylightLabel: "long daylight",
    },
    trend: slice,
    trendSummary: summary,
    peakLabel,
    fetchedAt: new Date().toISOString(),
  };
}

/** Per-request memoization (deduped across the same render pass). */
export const getWeather = cache(async (): Promise<WeatherSnapshot | null> => {
  try {
    return await fetchOpenMeteo();
  } catch {
    return null;
  }
});
