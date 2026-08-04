import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { buildSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const today = normalizeDay(url.searchParams.get("day"));
  const extra = url.searchParams.get("extra") === "1";
  try {
    const payload = await buildSession(userId, today, extra);
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[session]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function normalizeDay(value: string | null) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : new Date().toISOString().slice(0, 10);
}
