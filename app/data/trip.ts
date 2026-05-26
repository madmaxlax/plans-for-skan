import data from "@/data/trip.json";

export type TripWindow = { label: string; start: string; end: string };
export const TRIP = data as {
  title: string;
  subtitle: string;
  address: string;
  lat: number;
  lon: number;
  windows: TripWindow[];
};
