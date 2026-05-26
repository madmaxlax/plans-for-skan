import { NextResponse } from "next/server";
import { getLakeTemp } from "@/app/lib/lake-temp";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getLakeTemp();
  return NextResponse.json(data);
}
