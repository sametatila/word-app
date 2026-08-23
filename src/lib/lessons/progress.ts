import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userLessons } from "@/lib/db/schema";
import { LESSONS, lessonsFor, levelIndex } from "./index";
import { scoredSteps, type Lesson } from "./types";
import { awardActivity } from "@/lib/award";
import { xpDelta, xpForLesson } from "@/lib/xp";

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

/** Puanlanan adımların (üretim + doğru/yanlış) bu oranı ilk denemede
 *  doğruysa ders "geçildi" sayılıyor. */
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
 *
 * Yeni ders seçilirken kullanıcının SEÇTİĞİ seviye başlangıç sayılıyor:
 * kayıtta B1 diyen birine A1'in ilk dersini önermek, onu bildiği şeye geri
 * çağırmak olur. Alt seviyeler haritada açık duruyor (isteyen döner) ama
 * öneri kullanıcının seviyesinden başlıyor; o seviyeden yukarısı bittiyse
 * alttaki eksiklere dönülüyor.
 */
export async function nextLesson(
  userId: string,
  course: string,
  level = "A1",
): Promise<LessonCard | null> {
  const board = await lessonBoard(userId, course);
  const due = board.filter((c) => c.due);
  if (due.length) {
    // En uzun süredir bekleyen önce.
    due.sort((a, b) => (a.state!.dueAt.getTime() - b.state!.dueAt.getTime()));
    return due[0];
  }
  const from = levelIndex(level);
  return (
    board.find((c) => c.fresh && levelIndex(c.lesson.level) >= from) ??
    board.find((c) => c.fresh) ??
    null
  );
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
  /** Kullanıcının yerel günü — XP ve seri buna işlenir. */
  today: string,
  seconds = 0,
): Promise<{
  passed: boolean;
  nextDays: number;
  xpGained: number;
  currentStreak: number;
  totalXp: number;
}> {
  const total = scoredSteps(lesson);
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
      ruleId: lesson.focusId,
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

  // XP: dersin tasarlanmış süresine göre, tekrar çözümlerde yalnızca iyileşme
  // farkı. Ders bölümü daha önce hiç puan vermiyordu — sekiz tamamlanmış ders
  // ve sekiz rol yapma turu hesaba hiç yazılmamıştı, o gün çalışan öğrencinin
  // serisi bile kırılıyordu.
  const bestCorrect = Math.max(existing?.correct ?? 0, correct);
  const bestRoleplay = (existing?.roleplayDone ?? false) || roleplayDone;
  const previousXp = existing
    ? xpForLesson(lesson.minutes, existing.correct, existing.total, existing.roleplayDone)
    : null;
  const gained = xpDelta(
    xpForLesson(lesson.minutes, bestCorrect, total, bestRoleplay),
    previousXp,
  );

  const award = await awardActivity(userId, today, gained, seconds);

  // `totalXp` de dönüyor: ders bitince üst bardaki XP rozeti güncellenmiyordu
  // ve öğrenci kazandığı puanı ancak sayfayı yenileyince görüyordu — dersin
  // "sayılmadığı" hissi tam olarak buradan geliyordu.
  return {
    passed,
    nextDays,
    xpGained: award.xpGained,
    currentStreak: award.currentStreak,
    totalXp: award.totalXp,
  };
}

/**
 * Oturmamış kurallar.
 *
 * Ölçü **saklanan skor değil**, merdivenin bulunduğu basamak. Sebebi bir
 * hatayı düzeltirken görüldü: `correct` alanı en iyi denemeyi tutuyor (ki
 * ilerleme göstermek için doğru), ama zayıflık son denemenin işi. En iyi
 * skora bakan bir ölçü, bir kez başarmış sonra üst üste kaybetmiş öğrenciyi
 * "iyi durumda" sayıyordu.
 *
 * Merdiven bunu doğrudan söylüyor: geçilemeyen ders ilk basamağa düşüyor.
 * Dolayısıyla "birden fazla kez denenmiş ama hâlâ ilk basamakta" olan kural,
 * tanımı gereği oturmamış olandır.
 *
 * İlk deneme dışarıda: ilk seferde takılmak zayıflık değil, yeni olmaktır.
 *
 * Kural kimlikleri rol yapma düzeltmelerinin ürettiği etiketlerle aynı uzayda
 * (V2-Regel, Akkusativ) — ileride düzeltmeler doğrudan bu kuyruğu besleyebilir.
 */
export async function weakRules(userId: string, limit = 3): Promise<string[]> {
  const rows = await db
    .select({
      lessonId: userLessons.lessonId,
      ruleId: userLessons.ruleId,
      intervalDays: userLessons.intervalDays,
      attempts: userLessons.attempts,
    })
    .from(userLessons)
    .where(eq(userLessons.userId, userId));
  // Katalogdan çıkmış derslerin kayıtları sayılmıyor: kullanıcı o kurala artık
  // hiçbir dersten ulaşamaz, "oturmamış" diye göstermek çıkışsız bir uyarı olur.
  const known = new Set(LESSONS.map((l) => l.id));
  const weak = rows
    .filter((r) => known.has(r.lessonId) && r.attempts >= 2 && r.intervalDays <= LADDER[0])
    .map((r) => r.ruleId);
  return [...new Set(weak)].slice(0, limit);
}

/** Katalogdaki toplam ders sayısı — ilerleme çubuğu için. */
export function lessonCount(course: string): number {
  return LESSONS.filter((l) => l.course === (course === "gsw-zh" ? "gsw-zh" : "de")).length;
}
