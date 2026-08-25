import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { growthReport } from "@/lib/growth";
import type { CefrLevel } from "@/lib/skills/types";

export const dynamic = "force-dynamic";

/** Gelişim raporu (WP-52): 8 haftalık seriler, yetkinlik değişimi, kilometre taşları, haftalık özet. */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const raw = new URL(req.url).searchParams.get("day");
  const day = raw && /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : new Date().toISOString().slice(0, 10);
  try {
    const profile = await ensureProfile(userId);
    const level = (["A1", "A2", "B1", "B2", "C1"].includes(profile.level) ? profile.level : "A1") as CefrLevel;
    return NextResponse.json(await growthReport(userId, level, day), { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[growth]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
