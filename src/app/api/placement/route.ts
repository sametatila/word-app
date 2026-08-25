import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";
import { acceptPlacement, buildPlacement, finishPlacement, lastPlacement, RETAKE_DAYS } from "@/lib/placement";
import { PLACEMENT_LEVELS, type PlacementAnswer, type PlacementStage } from "@/lib/placement-score";
import type { CefrLevel } from "@/lib/skills/types";

export const dynamic = "force-dynamic";

/**
 * Yerleştirme testi (WP-40).
 *   GET                       → son alma + yeniden alınabilir mi
 *   POST {action:"start"}     → madde bankası (test)
 *   POST {action:"finish", answers, day} → sonuç (öneri, beceri başına)
 *   POST {action:"accept", id, level}    → seviye kabul edilir, profil güncellenir
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const last = await lastPlacement(userId);
    const canRetake = !last || Date.now() - new Date(last.at).getTime() >= RETAKE_DAYS * 86400000;
    return NextResponse.json({ last, canRetake, retakeDays: RETAKE_DAYS }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[placement]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

const STAGES = new Set<PlacementStage>(["vocab", "grammar", "reading", "listening"]);

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  try {
    const profile = await ensureProfile(userId);
    if (body.action === "start") {
      return NextResponse.json({ test: await buildPlacement(profile.course) });
    }
    if (body.action === "finish") {
      const raw = Array.isArray(body.answers) ? body.answers : null;
      if (!raw || raw.length === 0 || raw.length > 120) return NextResponse.json({ error: "bad_request" }, { status: 400 });
      const answers: PlacementAnswer[] = [];
      for (const a of raw as Record<string, unknown>[]) {
        if (!STAGES.has(a.stage as PlacementStage) || !PLACEMENT_LEVELS.includes(a.level as CefrLevel) || typeof a.itemId !== "string") continue;
        answers.push({ stage: a.stage as PlacementStage, level: a.level as CefrLevel, itemId: a.itemId.slice(0, 60), correct: a.correct === true });
      }
      if (!answers.length) return NextResponse.json({ error: "bad_request" }, { status: 400 });
      const day = typeof body.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.day) ? body.day : new Date().toISOString().slice(0, 10);
      return NextResponse.json(await finishPlacement(userId, answers, day));
    }
    if (body.action === "accept") {
      const id = Number(body.id);
      const level = body.level as CefrLevel;
      if (!Number.isInteger(id) || !PLACEMENT_LEVELS.includes(level)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
      const ok = await acceptPlacement(userId, id, level);
      return NextResponse.json({ accepted: ok, level });
    }
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  } catch (err) {
    console.error("[placement]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
