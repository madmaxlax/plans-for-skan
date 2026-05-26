import { cache } from "react";

export type LakeTemp = {
  temp: number;
  source: "lakemonster.com" | "historical average";
  recordedAt: string | null;
  fetchedAt: string | null;
};

type CachedReading = { temp: number; recordedAt: string | null; fetchedAt: number };

let cached: CachedReading | null = null;
const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

async function fetchUpstream(): Promise<CachedReading | null> {
  const res = await fetch("https://lakemonster.com/api/fishing-reports/latest/2631", {
    headers: {
      accept: "*/*",
      referer: "https://lakemonster.com/lake/NY/Skaneateles-Lake-water-temperature-2631",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  const wc = data?.report?.water_conditions;
  const t = typeof wc?.temperature === "number" ? wc.temperature : null;
  if (t === null || t < 30 || t > 95) return null;
  return {
    temp: Math.round(t),
    recordedAt: typeof wc?.recorded_at === "string" ? wc.recorded_at : null,
    fetchedAt: Date.now(),
  };
}

export const getLakeTemp = cache(async (): Promise<LakeTemp> => {
  const isFresh = cached && Date.now() - cached.fetchedAt < SIX_HOURS_MS;
  if (!isFresh) {
    try {
      const next = await fetchUpstream();
      if (next) cached = next;
    } catch {
      // swallow — fall through to cached or historical fallback
    }
  }
  if (cached) {
    return {
      temp: cached.temp,
      source: "lakemonster.com",
      recordedAt: cached.recordedAt,
      fetchedAt: new Date(cached.fetchedAt).toISOString(),
    };
  }
  return { temp: 65, source: "historical average", recordedAt: null, fetchedAt: null };
});
