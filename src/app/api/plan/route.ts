import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { buildPlan } from "@/lib/plan";

export const dynamic = "force-dynamic";

/**
 * Bugünkü plan (WP-60): `GET /api/plan?day=YYYY-MM-DD`.
 * Gün istemcinin yerel günü — "bugün yapıldı" işareti ona göre.
 */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const raw = new URL(req.url).searchParams.get("day");
  const day = raw && /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : new Date().toISOString().slice(0, 10);
  try {
    const profile = await ensureProfile(userId);
    const plan = await buildPlan(userId, day, profile.course, profile.level, profile.dailyGoal);
    return NextResponse.json(plan, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[plan]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
