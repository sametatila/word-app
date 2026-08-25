import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userSkills } from "@/lib/db/schema";
import { awardActivity, type AwardResult } from "@/lib/award";
import { track } from "@/lib/events";
import { getExercise, itemCount, xpFor } from "@/lib/skills";
import type { SkillExercise } from "./types";

/**
 * Beceri egzersizi sonucu — sunucudaki tek kayıt yolu (WP-01).
 *
 * Bu daha önce `/api/skills` route'unun içindeydi ve yalnız XP/seri için
 * çağrılıyordu; "hangi egzersiz bitti, kaç puan" bilgisi cihazın
 * localStorage'ında yaşıyordu. Cihaz değişince kayboluyor, analitikte
 * görünmüyor, yetkinlik hesabına giremiyordu. Artık gerçek kayıt burada;
 * istemcideki kopya yalnız çevrimdışı önbellek.
 *
 * XP kuralı değişmedi: egzersiz veritabanından bulunur, doğru sayısı madde
 * sayısıyla sınırlanır, aynı egzersizi tekrar çözmek yalnız iyileşme farkı
 * kadar XP verir.
 */
export type SkillAttempt = {
  exerciseId: string;
  correct: number;
  /** Kullanıcının yerel günü — XP ve seri buna işlenir. */
  day: string;
  seconds?: number;
  /**
   * Rubrik puanı 0–100 (serbest yazma/konuşma, WP-03). Verilmezse
   * doğru/toplam oranından türetilir.
   */
  score?: number | null;
};

export type SkillRecordResult = AwardResult & {
  bestCorrect: number;
  total: number;
  lastScore: number;
  repeat: boolean;
};

/** Puanı 0–100 aralığına kilitler; doğru/toplam ile aynı ölçek. */
export function scoreOf(correct: number, total: number, score?: number | null): number {
  if (typeof score === "number" && Number.isFinite(score)) {
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  return total > 0 ? Math.round((100 * Math.min(correct, total)) / total) : 0;
}

export async function recordSkillAttempt(
  userId: string,
  exercise: SkillExercise,
  attempt: SkillAttempt,
): Promise<SkillRecordResult> {
  const total = itemCount(exercise);
  const correct = Math.max(0, Math.min(total, Math.round(attempt.correct)));
  const lastScore = scoreOf(correct, total, attempt.score);

  const [prev] = await db
    .select()
    .from(userSkills)
    .where(and(eq(userSkills.userId, userId), eq(userSkills.exerciseId, exercise.id)));
  const prevBest = prev ? Math.min(prev.correct, total) : null;
  const best = Math.max(correct, prevBest ?? 0);
  const xpGained = Math.max(
    0,
    xpFor(exercise, best) - (prevBest === null ? 0 : xpFor(exercise, prevBest)),
  );

  const now = new Date();
  await db
    .insert(userSkills)
    .values({
      userId,
      exerciseId: exercise.id,
      correct: best,
      total,
      attempts: 1,
      skill: exercise.skill,
      level: exercise.level,
      lastScore,
      lastAt: now,
      firstAt: now,
    })
    .onConflictDoUpdate({
      target: [userSkills.userId, userSkills.exerciseId],
      set: {
        correct: best,
        total,
        attempts: sql`${userSkills.attempts} + 1`,
        skill: exercise.skill,
        level: exercise.level,
        lastScore,
        lastAt: now,
      },
    });

  // Öğrenme olayı: KPI 4 (beceri puanları) buradan okur. Puan son denemenin,
  // en iyinin değil — trend "bugün ne yapabildi"yi izler.
  await track(userId, "skill_finish", attempt.day, lastScore, `${exercise.skill}:${exercise.level}`);

  const award = await awardActivity(userId, attempt.day, xpGained, attempt.seconds ?? 0);
  return { ...award, bestCorrect: best, total, lastScore, repeat: prevBest !== null };
}

/**
 * Kullanıcının egzersiz durumları — hub ve istemci önbelleği için.
 * `level` verilirse yalnız o seviye; verilmezse hepsi (hub bütün seviyeleri
 * sekmeyle gezdiriyor, bir kez indirmek yeter).
 */
export type SkillStatus = {
  correct: number;
  total: number;
  attempts: number;
  lastScore: number | null;
  lastAt: string;
};

export async function listSkillStatus(
  userId: string,
  level?: string,
): Promise<Record<string, SkillStatus>> {
  const rows = await db
    .select({
      exerciseId: userSkills.exerciseId,
      correct: userSkills.correct,
      total: userSkills.total,
      attempts: userSkills.attempts,
      lastScore: userSkills.lastScore,
      lastAt: userSkills.lastAt,
    })
    .from(userSkills)
    .where(
      level
        ? and(eq(userSkills.userId, userId), eq(userSkills.level, level))
        : eq(userSkills.userId, userId),
    );
  const out: Record<string, SkillStatus> = {};
  for (const r of rows) {
    out[r.exerciseId] = {
      correct: r.correct,
      total: r.total,
      attempts: r.attempts,
      lastScore: r.lastScore,
      lastAt: r.lastAt.toISOString(),
    };
  }
  return out;
}

/**
 * Eski cihaz kayıtlarının tek seferlik taşınması.
 *
 * localStorage'da duran "bitti" kayıtları sunucuda yoksa ya da sunucudakinden
 * iyiyse yazılır. XP verilmez: o kayıtlar ya zamanında XP almıştı ya da
 * çevrimdışıyken alınmamıştı — ikisini ayırt edemeyiz ve hesabı kabartmamak
 * daha güvenli. Bilinmeyen egzersiz kimlikleri sessizce atlanır.
 */
export async function importSkillRecords(
  userId: string,
  records: { id: string; correct: number; total: number; at?: string }[],
): Promise<number> {
  let written = 0;
  for (const rec of records.slice(0, 200)) {
    const exercise = await getExercise(rec.id);
    if (!exercise) continue;
    const total = itemCount(exercise);
    const correct = Math.max(0, Math.min(total, Math.round(rec.correct)));
    const at = rec.at && !Number.isNaN(Date.parse(rec.at)) ? new Date(rec.at) : new Date();
    const [prev] = await db
      .select({ correct: userSkills.correct })
      .from(userSkills)
      .where(and(eq(userSkills.userId, userId), eq(userSkills.exerciseId, exercise.id)));
    if (prev && prev.correct >= correct) continue;
    await db
      .insert(userSkills)
      .values({
        userId,
        exerciseId: exercise.id,
        correct,
        total,
        attempts: 1,
        skill: exercise.skill,
        level: exercise.level,
        lastScore: scoreOf(correct, total),
        lastAt: at,
        firstAt: at,
      })
      .onConflictDoUpdate({
        target: [userSkills.userId, userSkills.exerciseId],
        set: { correct, total, skill: exercise.skill, level: exercise.level },
      });
    written++;
  }
  return written;
}
