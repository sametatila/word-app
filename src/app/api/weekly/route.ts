import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";
import { buildWeeklyExam, finishWeekly, weeklyStatus } from "@/lib/weekly";
import { GAME_LABELS, type Answer, type GameId } from "@/lib/types";
import { cleanDetail, isErrorType } from "@/lib/errors";

export const dynamic = "force-dynamic";

/**
 * Haftalık kullanım sınavı (WP-42).
 *   GET  ?day=            → durum (bu hafta yapıldı mı, skor) + yapılmadıysa sorular
 *   POST {answers, day, seconds} → sonuç; tek hak
 */
function normalizeDay(v: unknown): string {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : new Date().toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const day = normalizeDay(new URL(req.url).searchParams.get("day"));
  try {
    const profile = await ensureProfile(userId);
    const status = await weeklyStatus(userId, day);
    if (status.done) return NextResponse.json({ status, rounds: [] }, { headers: { "cache-control": "no-store" } });
    const exam = await buildWeeklyExam(userId, profile.course, profile.level, day);
    return NextResponse.json({ status: { ...status, short: exam.short }, rounds: exam.rounds }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[weekly]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

const GAMES = new Set(Object.keys(GAME_LABELS));

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
  const raw = Array.isArray(body.answers) ? body.answers : null;
  if (!raw || !raw.length || raw.length > 40) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const answers: Answer[] = [];
  for (const a of raw as Record<string, unknown>[]) {
    if (typeof a.wordId !== "number" || !Number.isInteger(a.wordId) || typeof a.game !== "string" || !GAMES.has(a.game) || typeof a.correct !== "boolean") continue;
    answers.push({
      wordId: a.wordId,
      game: a.game as GameId,
      correct: a.correct,
      latencyMs: typeof a.latencyMs === "number" ? Math.max(0, Math.round(a.latencyMs)) : 0,
      hintUsed: false,
      quality: typeof a.quality === "number" ? a.quality : undefined,
      errorType: a.correct === false && isErrorType(a.errorType) ? a.errorType : undefined,
      detail: a.correct === false ? (cleanDetail(a.detail) ?? undefined) : undefined,
    });
  }
  if (!answers.length) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const day = normalizeDay(body.day);
  const seconds = typeof body.seconds === "number" ? Math.max(0, Math.min(3600, Math.round(body.seconds))) : 0;
  try {
    const profile = await ensureProfile(userId);
    return NextResponse.json(await finishWeekly(userId, profile.level, answers, day, seconds));
  } catch (err) {
    console.error("[weekly] kayıt", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
