import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://seatemperature.net/current/united-states/skaneateles-lake-water-temperature.html",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();

    // Try multiple patterns to find the temperature
    const patterns = [
      /class="[^"]*current-temp[^"]*"[^>]*>\s*([0-9.]+)/i,
      /class="[^"]*temperature[^"]*"[^>]*>\s*([0-9.]+)/i,
      /<span[^>]*id="[^"]*temp[^"]*"[^>]*>\s*([0-9.]+)/i,
      /([0-9]+)\s*°\s*F/,
      /([6-7][0-9])\s*°/,
    ];

    let temp: number | null = null;
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const val = parseFloat(match[1]);
        if (val > 40 && val < 90) {
          temp = Math.round(val);
          break;
        }
      }
    }

    if (temp !== null) {
      return NextResponse.json({
        temp,
        source: "seatemperature.net",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
    }

    throw new Error("Could not parse temperature");
  } catch {
    return NextResponse.json({
      temp: 65,
      source: "historical average",
      date: "June avg",
    });
  }
}
