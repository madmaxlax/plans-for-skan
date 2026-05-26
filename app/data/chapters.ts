import data from "@/data/chapters.json";

export type ChapterIcon = "utensils" | "waves" | "mountain" | "baby" | "cloud-rain" | "map-pin" | "dumbbell";
export type ChapterAccent = "coral" | "lake" | "forest" | "tan" | "slate" | "rust";

export type Chapter = {
  num: string;
  title: string;
  sub: string;
  href: string;
  icon: ChapterIcon;
  accent: ChapterAccent;
};

export const CHAPTERS = data.chapters as Chapter[];
