"use client";

import { useEffect, useState } from "react";
import { Waves } from "lucide-react";

interface LakeTempData {
  temp: number;
  source: string;
  recordedAt: string | null;
  fetchedAt: string | null;
}

function formatRecorded(iso: string | null): string {
  if (!iso) return "June avg";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "recently";
  const days = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function LakeTempWidget() {
  const [data, setData] = useState<LakeTempData | null>(null);

  useEffect(() => {
    fetch("/api/lake-temp")
      .then((r) => r.json())
      .then(setData)
      .catch(() =>
        setData({ temp: 65, source: "historical average", recordedAt: null, fetchedAt: null })
      );
  }, []);

  const temp = data?.temp ?? null;
  const color =
    temp === null ? "from-slate-400 to-slate-500" :
    temp >= 72 ? "from-emerald-500 to-teal-600" :
    temp >= 65 ? "from-sky-500 to-cyan-600" :
    "from-blue-500 to-indigo-600";

  const recordedLabel = data ? formatRecorded(data.recordedAt) : "Loading...";
  const tooltip =
    data?.recordedAt
      ? `Reading recorded ${new Date(data.recordedAt).toLocaleString()}${
          data.fetchedAt ? ` · fetched ${new Date(data.fetchedAt).toLocaleString()}` : ""
        } · ${data.source}`
      : data?.source ?? "";

  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white`} title={tooltip}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-white/80 uppercase tracking-wide mb-1">Lake Temp</div>
          {temp !== null ? (
            <div className="text-4xl font-bold">{temp}°F</div>
          ) : (
            <div className="h-10 bg-white/20 rounded w-20 animate-pulse" />
          )}
          <div className="text-white/80 text-xs mt-1">
            {recordedLabel} · {data?.source ?? ""}
          </div>
        </div>
        <Waves className="w-10 h-10 text-white/60" />
      </div>
      {temp !== null && (
        <div className="mt-2 text-xs text-white/70">
          {temp >= 72 ? "Warm — great for swimming!" : temp >= 65 ? "Comfortable — jump in!" : "Cool — refreshing swim"}
        </div>
      )}
    </div>
  );
}
