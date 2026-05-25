import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Cached = {
  temp: number;
  recordedAt: string | null;
  fetchedAt: number;
};

// Module-level cache. Each serverless instance keeps its own copy; that's fine —
// upstream is cheap and we'd rather serve a stale value than nothing.
let cached: Cached | null = null;
const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

async function fetchUpstream(): Promise<Cached | null> {
  const res = await fetch(
    "https://lakemonster.com/api/fishing-reports/latest/2631",
    {
      headers: {
        accept: "*/*",
        referer:
          "https://lakemonster.com/lake/NY/Skaneateles-Lake-water-temperature-2631",
      },
      cache: "no-store",
    }
  );
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

export async function GET() {
  const now = Date.now();
  const isFresh = cached && now - cached.fetchedAt < SIX_HOURS_MS;

  if (!isFresh) {
    try {
      const next = await fetchUpstream();
      if (next) cached = next;
    } catch {
      // swallow — fall through to cached or historical fallback
    }
  }

  if (cached) {
    return NextResponse.json({
      temp: cached.temp,
      source: "lakemonster.com",
      recordedAt: cached.recordedAt,
      fetchedAt: new Date(cached.fetchedAt).toISOString(),
    });
  }

  return NextResponse.json({
    temp: 65,
    source: "historical average",
    recordedAt: null,
    fetchedAt: null,
  });
}
