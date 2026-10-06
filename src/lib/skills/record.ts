import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userSkills } from "@/lib/db/schema";
import { awardActivity, type AwardResult } from "@/lib/award";
import { track } from "@/lib/events";
import { getExercise, itemCount, xpFor } from "@/lib/skills";
import { scoreOf } from "@/lib/score-bands";
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

/* Puan formülü `lib/score-bands`a taşındı: bu modülde `server-only` var ve
   istemci oynatıcısı (sonuç kartındaki puan bandı) aynı formülü kullanmak
   zorunda. Ad ve çağrı yerleri değişmedi. */
export { scoreOf };

export async function recordSkillAttempt(
  userId: string,
  exercise: SkillExercise,
  attempt: SkillAttempt,
): Promise<SkillRecordResult> {
  const total = itemCount(exercise);
  const correct = Math.max(0, Math.min(total, Math.round(attempt.correct)));
  const lastScore = scoreOf(correct, total, attempt.score);

  /*
   * OKU-HESAPLA-YAZ TEK İŞLEMDE, (kullanıcı, egzersiz) kilidiyle (güvenlik
   * denetimi 2026-10-03, D1). Önceki en iyi kilitsiz okunuyordu: aynı egzersiz
   * için paralel N istek hepsi aynı `prev`i görüp N kez tam XP alıyordu.
   * Satır henüz yoksa `for update` kilitleyecek bir şey bulamıyor; danışma
   * kilidi ilk çözümü de sıraya sokuyor.
   */
  const { prevBest, best, xpGained } = await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${`skill:${userId}:${exercise.id}`}))`);
    const [prev] = await tx
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
    await tx
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
    return { prevBest, best, xpGained };
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
 * Cihazda bekleyen sonuçların sunucuya aktarılması (PUT): web'in yerel kaydı ve
 * mobilin çevrimdışı kuyruğu.
 *
 * XP verilmez: o kayıtlar ya zamanında XP almıştı ya da çevrimdışıyken
 * alınmamıştı — ikisini ayırt edemeyiz ve hesabı kabartmamak daha güvenli.
 * Bilinmeyen egzersiz kimlikleri sessizce atlanır.
 *
 * 2026-10-06: kayıt SUNUCUDAKİNDEN YENİYSE bir deneme olarak işleniyor (son puan,
 * son deneme zamanı, deneme sayısı; en iyi skor korunuyor). Eskiden yalnız daha iyi
 * skor yazılıyordu ve `last_at` hiç değişmiyordu: çevrimdışı tamamlanan alıştırma
 * ne yetkinliği ne günlük görevi ne de Gelişim'in "Sıradaki"sini değiştiriyordu.
 */
export async function importSkillRecords(
  userId: string,
  records: { id: string; correct: number; total: number; at?: string; score?: number }[],
): Promise<number> {
  let written = 0;
  for (const rec of records.slice(0, 200)) {
    const exercise = await getExercise(rec.id);
    if (!exercise) continue;
    const total = itemCount(exercise);
    const correct = Math.max(0, Math.min(total, Math.round(rec.correct)));
    const dated = !!rec.at && !Number.isNaN(Date.parse(rec.at));
    const at = dated ? new Date(rec.at as string) : new Date();
    const score = rec.score ?? scoreOf(correct, total);
    const [prev] = await db
      .select({ correct: userSkills.correct, lastAt: userSkills.lastAt })
      .from(userSkills)
      .where(and(eq(userSkills.userId, userId), eq(userSkills.exerciseId, exercise.id)));
    /* Tarihsiz kayıt (eski istemci) deneme sayılmıyor: ne zaman yapıldığı bilinmiyor. */
    const newer = !prev || (dated && at.getTime() > prev.lastAt.getTime());
    if (prev && !newer && prev.correct >= correct) continue;
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
        lastScore: score,
        lastAt: at,
        firstAt: at,
      })
      .onConflictDoUpdate({
        target: [userSkills.userId, userSkills.exerciseId],
        set: newer
          ? {
              correct: sql`greatest(${userSkills.correct}, ${correct})`,
              total,
              skill: exercise.skill,
              level: exercise.level,
              lastScore: score,
              lastAt: at,
              attempts: sql`${userSkills.attempts} + 1`,
            }
          : { correct, total, skill: exercise.skill, level: exercise.level },
      });
    written++;
  }
  return written;
}
