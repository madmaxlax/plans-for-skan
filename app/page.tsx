import HomeHeader from "./components/home/HomeHeader";
import WeatherTrendCard from "./components/home/WeatherTrendCard";
import StatusChips from "./components/home/StatusChips";
import TodayDeck from "./components/home/TodayDeck";
import LookingAheadRail from "./components/home/LookingAheadRail";
import WeekStoryboard from "./components/home/WeekStoryboard";
import GuideTiles from "./components/home/GuideTiles";

import { getTripDay } from "./lib/today";
import { buildStoryboard } from "./lib/storyboard";
import { getTomorrow, getThisWeek } from "./lib/looking-ahead";
import { getWeather } from "./lib/weather";
import { getLakeTemp } from "./lib/lake-temp";
import { deckForDate } from "./data/today-deck";
import { RAINY_PICKS } from "./data/rainy-picks";

export const revalidate = 1800; // 30min — the page itself can be served from the edge for half an hour

export default async function HomePage() {
  const tripDay = getTripDay();

  // Start all data fetches in parallel — none of them depend on each other.
  const [weather, lake] = await Promise.all([getWeather(), getLakeTemp()]);

  // Pre-trip and between windows: use the start of the next window as the "preview" date
  // so the deck shows something meaningful instead of the generic fallback.
  const deckDate = pickDeckDate(tripDay);
  const deck = deckForDate(deckDate);
  const tomorrow = getTomorrow(deckDate);
  const thisWeek = getThisWeek(deckDate);
  const storyboard = buildStoryboard(tripDay);
  const deckLabel = pickDeckLabel(tripDay);

  return (
    <div className="min-h-screen">
      <HomeHeader tripDay={tripDay} />

      <div className="px-6 md:px-14 pt-4 flex flex-col gap-2.5">
        <ConditionsHeader />
        <WeatherTrendCard weather={weather} lake={lake} />
        <StatusChips sunsetLabel={weather?.current.sunsetLabel} />
      </div>

      <div className="px-6 md:px-14 pt-7 flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0">
          <TodayDeck deck={deck} label={deckLabel} />
        </div>
        <LookingAheadRail
          tomorrow={tomorrow}
          thisWeek={thisWeek}
          rainyPicks={RAINY_PICKS}
          preTrip={tripDay.state !== "in-window"}
        />
      </div>

      <div className="px-6 md:px-14 pt-6">
        <WeekStoryboard days={storyboard} />
      </div>

      <div className="px-6 md:px-14 py-10">
        <GuideTiles />
      </div>
    </div>
  );
}

function pickDeckDate(tripDay: ReturnType<typeof getTripDay>): string {
  if (tripDay.state === "in-window") return tripDay.todayISO;
  if (tripDay.window) return tripDay.window.start;
  return tripDay.todayISO;
}

function pickDeckLabel(tripDay: ReturnType<typeof getTripDay>): string {
  switch (tripDay.state) {
    case "in-window": return "Today.";
    case "after":     return "Looking back.";
    default:          return "Day 1 preview.";
  }
}

function ConditionsHeader() {
  return (
    <div className="flex items-end justify-between">
      <div className="flex items-end gap-2.5">
        <h2 className="font-serif italic text-lg text-ink">conditions</h2>
        <span className="font-sans italic text-[11px] text-muted-tan pb-1">live · auto-refreshes</span>
      </div>
      <span className="font-sans text-[11px] text-coral pb-1">refresh ↻</span>
    </div>
  );
}
