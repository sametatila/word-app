import "server-only";
import { and, eq, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userLessons } from "@/lib/db/schema";
import { LESSONS, lessonsFor } from "./index";
import type { Lesson } from "./types";

/**
 * Ders ilerlemesi ve kuralların tekrar zamanlaması.
 *
 * Kelimelerdeki SM-2 buraya olduğu gibi taşınmadı ve sebebi ölçünün farkı:
 * kelimede soru "hatırladın mı", kuralda "kurabildin mi". Kural bir kez
 * anlaşıldığında hatırlama sorunu değil, uygulama sorunu olarak sürüyor —
 * bu yüzden aralıklar daha kısa ve daha az agresif büyüyor.
 *
 * Aralıklar sabit bir merdiven: 1, 3, 7, 16, 35 gün. Ders bir bütün olarak
 * "başarılı" sayılırsa bir üst basamağa çıkıyor, değilse başa dönüyor.
 * Kelimelerdeki gibi süreklilik arz eden bir kolaylık faktörü yok; ders
 * sayısı az ve her biri elle yazıldığı için ince ayarın karşılığı olmazdı.
 */

const LADDER = [1, 3, 7, 16, 35];

/** Alıştırmaların bu oranı doğruysa ders "geçildi" sayılıyor. */
const PASS_RATIO = 0.7;

export type LessonState = {
  lessonId: string;
  correct: number;
  total: number;
  roleplayDone: boolean;
  attempts: number;
  dueAt: Date;
  intervalDays: number;
};

export type LessonCard = {
  lesson: Lesson;
  state: LessonState | null;
  /** Tekrar zamanı gelmiş mi — bitmiş ama unutulmaya yüz tutmuş ders. */
  due: boolean;
  /** Hiç açılmamış mı. */
  fresh: boolean;
};

export async function lessonBoard(userId: string, course: string): Promise<LessonCard[]> {
  const rows = await db
    .select()
    .from(userLessons)
    .where(eq(userLessons.userId, userId));
  const byId = new Map(rows.map((r) => [r.lessonId, r]));
  const now = Date.now();

  return lessonsFor(course).map((lesson) => {
    const row = byId.get(lesson.id);
    if (!row) return { lesson, state: null, due: false, fresh: true };
    const state: LessonState = {
      lessonId: row.lessonId,
      correct: row.correct,
      total: row.total,
      roleplayDone: row.roleplayDone,
      attempts: row.attempts,
      dueAt: row.dueAt,
      intervalDays: row.intervalDays,
    };
    return { lesson, state, due: row.dueAt.getTime() <= now, fresh: false };
  });
}

/**
 * Sıradaki ders.
 *
 * Öncelik tekrarı gelen derste, yeni derste değil. Sebebi Learna'nın da
 * ölçtüğü şey: yeni konu eklemek kolay, eskisini tutmak zor. Tekrar borcu
 * varken yeni ders açmak öğrenciyi ilerliyormuş gibi hissettirip aslında
 * geride bırakıyor.
 */
export async function nextLesson(userId: string, course: string): Promise<LessonCard | null> {
  const board = await lessonBoard(userId, course);
  const due = board.filter((c) => c.due);
  if (due.length) {
    // En uzun süredir bekleyen önce.
    due.sort((a, b) => (a.state!.dueAt.getTime() - b.state!.dueAt.getTime()));
    return due[0];
  }
  return board.find((c) => c.fresh) ?? null;
}

/**
 * Ders sonucunu kaydeder ve bir sonraki tekrarı planlar.
 *
 * Rol yapma tamamlanmadıysa ders geçilmiş sayılmıyor — alıştırmaları doğru
 * yapıp konuşmadan çıkmak, dersin asıl parçasını atlamak demek.
 */
export async function recordLesson(
  userId: string,
  lesson: Lesson,
  correct: number,
  roleplayDone: boolean,
): Promise<{ passed: boolean; nextDays: number }> {
  const total = lesson.checks.length;
  const passed = roleplayDone && total > 0 && correct / total >= PASS_RATIO;

  const [existing] = await db
    .select()
    .from(userLessons)
    .where(and(eq(userLessons.userId, userId), eq(userLessons.lessonId, lesson.id)));

  const step = passed
    ? Math.min((existing?.intervalDays ?? 0) === 0 ? 0 : LADDER.indexOf(existing!.intervalDays) + 1, LADDER.length - 1)
    : 0;
  const nextDays = LADDER[Math.max(0, step)];

  await db
    .insert(userLessons)
    .values({
      userId,
      lessonId: lesson.id,
      ruleId: lesson.ruleId,
      correct,
      total,
      roleplayDone,
      attempts: 1,
      intervalDays: nextDays,
      dueAt: sql`now() + (${nextDays} || ' days')::interval`,
      lastAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [userLessons.userId, userLessons.lessonId],
      set: {
        // En iyi skor korunuyor: bir kez doğru yapılanı sonraki denemede
        // kaybetmek ilerlemeyi geri almamalı.
        correct: sql`greatest(${userLessons.correct}, ${correct})`,
        total,
        roleplayDone: sql`${userLessons.roleplayDone} or ${roleplayDone}`,
        attempts: sql`${userLessons.attempts} + 1`,
        intervalDays: nextDays,
        dueAt: sql`now() + (${nextDays} || ' days')::interval`,
        lastAt: new Date(),
      },
    });

  return { passed, nextDays };
}

/**
 * Zayıf kurallar — tekrarı gelmiş ve son denemede geçilememiş dersler.
 *
 * Sohbet düzeltmelerinin ürettiği kural etiketleriyle aynı uzayda olması
 * bilerek: ileride düzeltmeler doğrudan bu kuyruğu besleyebilir.
 */
export async function weakRules(userId: string, limit = 3): Promise<string[]> {
  const rows = await db
    .select({ ruleId: userLessons.ruleId, correct: userLessons.correct, total: userLessons.total })
    .from(userLessons)
    .where(and(eq(userLessons.userId, userId), lte(userLessons.dueAt, new Date())));
  const weak = rows
    .filter((r) => r.total > 0 && r.correct / r.total < PASS_RATIO)
    .map((r) => r.ruleId);
  return [...new Set(weak)].slice(0, limit);
}

/** Katalogdaki toplam ders sayısı — ilerleme çubuğu için. */
export function lessonCount(course: string): number {
  return LESSONS.filter((l) => l.course === (course === "gsw-zh" ? "gsw-zh" : "de")).length;
}
