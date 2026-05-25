"use client";

import { useEffect, useState } from "react";
import { Thermometer, Wind, CloudSun, Droplets } from "lucide-react";

interface WeatherData {
  temp: number;
  feelsLike: number;
  windspeed: number;
  humidity: number;
  conditionCode: number;
}

function getConditionLabel(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 49) return "Foggy";
  if (code <= 69) return "Rainy";
  if (code <= 79) return "Snowy";
  if (code <= 82) return "Rain showers";
  if (code <= 99) return "Thunderstorms";
  return "Unknown";
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=42.9474&longitude=-76.4298&current=temperature_2m,apparent_temperature,windspeed_10m,relativehumidity_2m,weathercode&temperature_unit=fahrenheit&windspeed_unit=mph"
    )
      .then((r) => r.json())
      .then((data) => {
        const c = data.current;
        setWeather({
          temp: Math.round(c.temperature_2m),
          feelsLike: Math.round(c.apparent_temperature),
          windspeed: Math.round(c.windspeed_10m),
          humidity: Math.round(c.relativehumidity_2m),
          conditionCode: c.weathercode,
        });
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  if (!weather) {
    return (
      <div className="bg-sky-500 rounded-xl p-4 text-white animate-pulse">
        <div className="h-8 bg-sky-400 rounded w-24 mb-2" />
        <div className="h-4 bg-sky-400 rounded w-32" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-4 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold">{weather.temp}°F</div>
          <div className="text-sky-100 text-sm mt-0.5">{getConditionLabel(weather.conditionCode)}</div>
          <div className="text-sky-200 text-xs mt-1">Feels like {weather.feelsLike}°F</div>
        </div>
        <CloudSun className="w-12 h-12 text-sky-200 opacity-80" />
      </div>
      <div className="flex gap-4 mt-3 pt-3 border-t border-sky-400">
        <div className="flex items-center gap-1 text-xs text-sky-100">
          <Wind className="w-3.5 h-3.5" />
          {weather.windspeed} mph
        </div>
        <div className="flex items-center gap-1 text-xs text-sky-100">
          <Droplets className="w-3.5 h-3.5" />
          {weather.humidity}% humidity
        </div>
        <div className="flex items-center gap-1 text-xs text-sky-100">
          <Thermometer className="w-3.5 h-3.5" />
          Skaneateles, NY
        </div>
      </div>
    </div>
  );
}
