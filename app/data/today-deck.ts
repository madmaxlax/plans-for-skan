import data from "@/data/today-decks.json";
import { TRIP } from "./trip";

export type SlotKey = "morning" | "afternoon" | "evening";

export type DeckSlot = {
  time: string;
  title: string;
  body: string;
  meta: string;
  status: "best now" | "ready" | "plan ahead";
  icon: "sun" | "utensils" | "flame" | "mountain" | "waves" | "ship" | "wine" | "baby" | "store";
  accent: "coral" | "lake" | "forest" | "tan";
};

export type Deck = Record<SlotKey, DeckSlot>;

const DECKS = data.decks as Record<string, Deck>;
const FALLBACK = data.fallback as Deck;
const DECK_KEYS = new Set(Object.keys(DECKS));

/** Returns the deck for `dateISO`, falling back to a generic deck if no entry exists. */
export function deckForDate(dateISO: string): Deck {
  return DECKS[dateISO] ?? FALLBACK;
}

/** True if this date has a hand-authored deck entry (not the fallback). */
export function hasDeckEntry(dateISO: string): boolean {
  return DECK_KEYS.has(dateISO);
}

/** True if this date falls within any of the trip's defined windows. */
export function inAnyTripWindow(dateISO: string): boolean {
  return TRIP.windows.some((w) => dateISO >= w.start && dateISO <= w.end);
}
