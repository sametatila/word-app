import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";
import { getExercise } from "@/lib/skills";
import { importSkillRecords, listSkillStatus, recordSkillAttempt } from "@/lib/skills/record";

export const dynamic = "force-dynamic";

/**
 * Beceri egzersizi ilerlemesi (WP-01).
 *
 *   GET  ?level=A2   → kullanıcının egzersiz durumları (seviye isteğe bağlı)
 *   POST             → egzersiz bitti: kayıt + XP + seri (+ `score` rubrik puanı)
 *   PUT              → eski cihaz kayıtlarının tek seferlik taşınması (XP yok)
 *
 * XP istemciden gelmez: egzersiz veritabanından bulunur, doğru sayısı madde
 * sayısıyla sınırlanır ve puan sunucuda hesaplanır (bkz. lib/skills/record.ts).
 */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const level = new URL(req.url).searchParams.get("level");
  try {
    const progress = await listSkillStatus(
      userId,
      level && /^[ABC][12]$/.test(level) ? level : undefined,
    );
    return NextResponse.json({ progress });
  } catch (err) {
    console.error("[skills] okunamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const exercise = await getExercise(parsed.id);
  if (!exercise) return NextResponse.json({ error: "unknown_exercise" }, { status: 400 });

  try {
    await ensureProfile(userId);
    const r = await recordSkillAttempt(userId, exercise, {
      exerciseId: exercise.id,
      correct: parsed.correct,
      day: parsed.day,
      seconds: parsed.seconds,
      score: parsed.score,
    });
    return NextResponse.json({
      xpGained: r.xpGained,
      totalXp: r.totalXp,
      currentStreak: r.currentStreak,
      longestStreak: r.longestStreak,
      streakRepaired: r.repaired,
      bestCorrect: r.bestCorrect,
      total: r.total,
      lastScore: r.lastScore,
      repeat: r.repeat,
    });
  } catch (err) {
    console.error("[skills]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const records = parseRecords(body);
  if (!records) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    await ensureProfile(userId);
    const written = await importSkillRecords(userId, records);
    const progress = await listSkillStatus(userId);
    return NextResponse.json({ written, progress });
  } catch (err) {
    console.error("[skills] taşıma", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function parseBody(body: unknown) {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (typeof b.id !== "string" || b.id.length > 20) return null;
  if (typeof b.correct !== "number" || !Number.isInteger(b.correct) || b.correct < 0) return null;
  const day =
    typeof b.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.day)
      ? b.day
      : new Date().toISOString().slice(0, 10);
  const seconds =
    typeof b.seconds === "number" ? Math.max(0, Math.min(3600, Math.round(b.seconds))) : 0;
  const score =
    typeof b.score === "number" && Number.isFinite(b.score)
      ? Math.max(0, Math.min(100, Math.round(b.score)))
      : null;
  return { id: b.id, correct: b.correct, day, seconds, score };
}

function parseRecords(body: unknown) {
  if (typeof body !== "object" || body === null) return null;
  const list = (body as { records?: unknown }).records;
  if (!Array.isArray(list) || list.length > 200) return null;
  const out: { id: string; correct: number; total: number; at?: string }[] = [];
  for (const item of list) {
    if (typeof item !== "object" || item === null) continue;
    const r = item as Record<string, unknown>;
    if (typeof r.id !== "string" || r.id.length > 20) continue;
    if (typeof r.correct !== "number" || typeof r.total !== "number") continue;
    out.push({
      id: r.id,
      correct: Math.max(0, Math.round(r.correct)),
      total: Math.max(0, Math.round(r.total)),
      at: typeof r.at === "string" ? r.at : undefined,
    });
  }
  return out;
}
