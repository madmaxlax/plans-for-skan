import data from "@/data/rainy-picks.json";

export type RainyPick = { label: string; href: string };

export const RAINY_PICKS = data.picks as RainyPick[];
