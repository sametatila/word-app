import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";
import { awardActivity, clampDay } from "@/lib/award";
import {
  buildDailyRounds,
  dailyBoard,
  saveDailyResult,
  todaysResult,
} from "@/lib/daily";
import { MAX_POINTS_PER_ROUND } from "@/lib/daily-score";
import { xpForSkill } from "@/lib/xp";

export const dynamic = "force-dynamic";

/**
 * Günün turu: aynı kurs ve seviyedeki herkes için aynı.
 *
 * Tur saklanmıyor, günden türetiliyor (bkz. lib/daily.ts) — bu yüzden her
 * istekte aynı sonucu veriyor ve kaydedilecek bir "günün turu" tablosu
 * gerekmiyor.
 */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const day = normalizeDay(new URL(req.url).searchParams.get("day"));

  try {
    const profile = await ensureProfile(userId);
    const [played, board] = await Promise.all([
      todaysResult(userId, day),
      dailyBoard(userId, day, profile.course, profile.level),
    ]);

    // Oynanmışsa tur gönderilmiyor: cevapları elinde tutan bir istemci, ikinci
    // hakkı olmasa bile turu önden görebilirdi.
    const rounds = played ? [] : await buildDailyRounds(profile.course, profile.level, day);

    return NextResponse.json({
      day,
      level: profile.level,
      course: profile.course,
      rounds,
      played: played
        ? {
            score: played.score,
            correct: played.correct,
            total: played.total,
            bestCombo: played.bestCombo,
          }
        : null,
      board,
    });
  } catch (err) {
    console.error("[daily]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/**
 * Turun sonucu.
 *
 * Puan istemcide toplanıyor ama sınırlanıyor: soru sayısı ve soru başına
 * kazanılabilecek en yüksek puan bilindiği için tavan hesaplanabiliyor.
 * Uydurma bir skorun günün tablosunu bozmasının önündeki engel bu.
 */
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

  const day = normalizeDay(body.day);
  const num = (v: unknown, hi: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.min(hi, Math.round(v))) : 0;

  try {
    const profile = await ensureProfile(userId);
    const rounds = await buildDailyRounds(profile.course, profile.level, day);
    const total = rounds.length;
    if (!total) return NextResponse.json({ error: "no_round" }, { status: 400 });

    const correct = num(body.correct, total);
    const score = num(body.score, total * MAX_POINTS_PER_ROUND);
    const bestCombo = num(body.bestCombo, total);
    const seconds = num(body.seconds, 3600);

    const { saved } = await saveDailyResult({
      userId,
      day,
      course: profile.course,
      level: profile.level,
      score,
      correct,
      total,
      bestCombo,
      seconds,
    });

    // XP yalnızca ilk kayıtta: tekrar gönderilen sonuç tabloya da girmiyor,
    // puana da yazılmıyor. Hesap ortak tablodan geliyor (bkz. lib/xp.ts) —
    // günün turu da diğer yollarla aynı dakika başı oranı kazandırıyor.
    let xpGained = 0;
    if (saved) {
      const minutes = Math.max(1, Math.round(seconds / 60));
      const award = await awardActivity(userId, day, xpForSkill(minutes, correct, total), seconds);
      xpGained = award.xpGained;
    }

    const board = await dailyBoard(userId, day, profile.course, profile.level);
    return NextResponse.json({ saved, xpGained, board });
  } catch (err) {
    console.error("[daily:score]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function normalizeDay(value: unknown) {
  return clampDay(value);
}
