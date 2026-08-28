import "server-only";
import { and, asc, eq, gte, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { assessments, dailyStats, events, exams, reviews, userLessons, userSkills } from "@/lib/db/schema";
import { ERROR_LABELS, isErrorType } from "@/lib/errors";
import { computeProficiency, PROFICIENCY_LABELS, PROFICIENCY_SKILLS, type Band, type ProficiencySkill } from "@/lib/proficiency";
import { gatherEvidence, nextStep, type NextStep } from "@/lib/proficiency-data";
import { shiftDay, weekStart } from "@/lib/session";
import type { CefrLevel } from "@/lib/skills/types";
import type { Assessment } from "@/lib/assess-prompts";

/**
 * Gelişim raporu (plan WP-52).
 *
 * Profildeki kelime sayıları "ne kadar" sorusuna cevap veriyordu, "daha iyi
 * mi" sorusuna değil. Bu modül zaman ekseni ekler: son 8 haftanın yazma,
 * konuşma ve kullanım skoru serileri, yetkinliğin 4 hafta önceye göre
 * değişimi, kilometre taşları ve "bu hafta" özeti (kart + bildirim).
 * Hepsi mevcut tablolardan sorguyla; yeni tablo yok.
 */

export const WEEKS = 8;

export type WeekPoint = { week: string; value: number | null; n: number };

export type GrowthReport = {
  weeks: string[];
  series: {
    writing: WeekPoint[];
    speaking: WeekPoint[];
    usage: WeekPoint[];
    /** Haftalık cevap sayısı — çaba çizgisi. */
    answers: WeekPoint[];
  };
  /** Raporun hangi seviye için hazırlandığı. */
  level: CefrLevel;
  /** Kullanıcının seviyesinde beceri başına şimdi / 4 hafta önce / bant. */
  proficiency: { skill: ProficiencySkill; label: string; now: number | null; before: number | null; band: Band | null }[];
  /**
   * Son 30 günün kanıt sayısı — güven göstergesi. "72 puan" ile "3 ölçümden
   * 72 puan" aynı şey değil ve kullanıcı ikincisini bilmeden birincisine
   * güvenmemeli.
   */
  evidenceCount: number;
  /** En zayıf beceriden önerilen sıradaki adım. */
  next: NextStep | null;
  milestones: { at: string; text: string }[];
  summary: WeeklySummary;
};

export type WeeklySummary = {
  week: string;
  answers: number;
  exercises: number;
  lessonsPassed: number;
  writing: { from: number | null; to: number | null };
  usage: number | null;
  topError: { type: string; label: string; n: number } | null;
  /** Tek satırlık Türkçe özet — kart ve bildirim. */
  text: string;
};

function bucket(weeks: string[], rows: { week: string; value: number; n: number }[]): WeekPoint[] {
  const by = new Map(rows.map((r) => [r.week, r]));
  return weeks.map((w) => ({ week: w, value: by.get(w)?.value ?? null, n: by.get(w)?.n ?? 0 }));
}

/**
 * Rapor artık YETKİNLİĞİ DE taşıyor.
 *
 * Yetkinlik panosu profildedir, gelişim kutusu onun içindeki ayrıntıda
 * duruyordu ve ikisi aynı sayıyı iki kez, iki farklı sorgudan çiziyordu:
 * pano `proficiencyFor`, gelişim `growthReport`. İki ayrı `gatherEvidence`
 * çağrısı yalnızca israf değil, tutarsızlık riski — aralarında bir tur
 * oynanırsa aynı ekranda iki farklı puan görünürdü.
 *
 * Şimdi tek kaynak: puan, bant, değişim oku, kanıt sayısı ve önerilen adım
 * aynı rapordan geliyor.
 */
export async function growthReport(userId: string, course: string, level: CefrLevel, today: string): Promise<GrowthReport> {
  const thisWeek = weekStart(today);
  const weeks = Array.from({ length: WEEKS }, (_, i) => shiftDay(thisWeek, -7 * (WEEKS - 1 - i)));
  const since = new Date(`${weeks[0]}T00:00:00Z`);

  // Yazma / konuşma: assessments; kullanım: exams weekly; cevap: reviews.
  const ai = await db
    .select({ kind: assessments.kind, result: assessments.result, day: assessments.day })
    .from(assessments)
    .where(and(eq(assessments.userId, userId), isNotNull(assessments.result), gte(assessments.day, weeks[0])));
  const agg = (kinds: string[]) => {
    const m = new Map<string, { sum: number; n: number }>();
    for (const r of ai) {
      if (!kinds.includes(r.kind)) continue;
      const score = (r.result as Assessment | null)?.score?.overall;
      if (typeof score !== "number") continue;
      const w = weekStart(String(r.day));
      const a = m.get(w) ?? { sum: 0, n: 0 };
      a.sum += score;
      a.n++;
      m.set(w, a);
    }
    return [...m.entries()].map(([week, a]) => ({ week, value: Math.round(a.sum / a.n), n: a.n }));
  };
  const usageRows = await db
    .select({ week: exams.week, score: exams.score })
    .from(exams)
    .where(and(eq(exams.userId, userId), eq(exams.kind, "weekly"), gte(exams.week, weeks[0])));
  const answerRows = await db
    .select({ week: sql<string>`date_trunc('week', ${reviews.createdAt})::date::text`, n: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), gte(reviews.createdAt, since)))
    .groupBy(sql`date_trunc('week', ${reviews.createdAt})`);

  const series = {
    writing: bucket(weeks, agg(["writing", "sentence"])),
    speaking: bucket(weeks, agg(["speaking", "roleplay"])),
    usage: bucket(weeks, usageRows.map((r) => ({ week: String(r.week), value: r.score, n: 1 }))),
    answers: bucket(weeks, answerRows.map((r) => ({ week: r.week, value: r.n, n: r.n }))),
  };

  // Yetkinlik değişimi: şimdi vs 4 hafta önce (o güne göre 30 günlük pencere).
  const now = new Date();
  const before = new Date(now.getTime() - 28 * 86400000);
  const evidenceNow = await gatherEvidence(userId, now);
  const profNow = computeProficiency(evidenceNow, now);
  const profBefore = computeProficiency(await gatherEvidence(userId, before), before);
  const proficiency = PROFICIENCY_SKILLS.map((skill) => ({
    skill,
    label: PROFICIENCY_LABELS[skill],
    now: profNow[skill]?.[level]?.score ?? null,
    before: profBefore[skill]?.[level]?.score ?? null,
    band: profNow[skill]?.[level]?.band ?? null,
  }));
  const next = await nextStep(userId, course, level, profNow);

  // Kilometre taşları — ilk'ler.
  const milestones: { at: string; text: string }[] = [];
  const [firstExam] = await db.select({ at: exams.createdAt, score: exams.score }).from(exams).where(eq(exams.userId, userId)).orderBy(asc(exams.createdAt)).limit(1);
  if (firstExam) milestones.push({ at: firstExam.at.toISOString().slice(0, 10), text: `İlk kullanım sınavı: ${firstExam.score} puan` });
  const [firstGoodWriting] = await db
    .select({ at: assessments.createdAt })
    .from(assessments)
    .where(and(eq(assessments.userId, userId), eq(assessments.kind, "writing"), sql`(${assessments.result}->'score'->>'overall')::int >= 70`))
    .orderBy(asc(assessments.createdAt))
    .limit(1);
  if (firstGoodWriting) milestones.push({ at: firstGoodWriting.at.toISOString().slice(0, 10), text: "İlk 70+ puanlı yazı" });
  const [firstLesson] = await db.select({ at: userLessons.lastAt }).from(userLessons).where(and(eq(userLessons.userId, userId), eq(userLessons.roleplayDone, true))).orderBy(asc(userLessons.lastAt)).limit(1);
  if (firstLesson) milestones.push({ at: firstLesson.at.toISOString().slice(0, 10), text: "İlk ders konuşmasıyla tamamlandı" });
  const [firstPlacement] = await db.select({ day: events.day, kind: events.kind }).from(events).where(and(eq(events.userId, userId), eq(events.name, "placement_finish"))).orderBy(asc(events.createdAt)).limit(1);
  if (firstPlacement) milestones.push({ at: String(firstPlacement.day), text: `Seviye testi: ${firstPlacement.kind ?? "?"} önerildi` });
  milestones.sort((a, b) => a.at.localeCompare(b.at));

  const summary = await weeklySummary(userId, today, series);
  return { weeks, level, series, proficiency, evidenceCount: evidenceNow.length, next, milestones, summary };
}

/** Geçen haftanın özeti (kart Pazartesi, bildirim cron). */
export async function weeklySummary(userId: string, today: string, series?: GrowthReport["series"]): Promise<WeeklySummary> {
  const thisWeek = weekStart(today);
  const lastWeek = shiftDay(thisWeek, -7);
  const from = new Date(`${lastWeek}T00:00:00Z`);
  const to = new Date(`${thisWeek}T00:00:00Z`);

  const [{ answers }] = await db
    .select({ answers: sql<number>`coalesce(sum(${dailyStats.reviews}), 0)::int` })
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), gte(dailyStats.day, lastWeek), sql`${dailyStats.day} < ${thisWeek}`));
  const [{ exercises }] = await db
    .select({ exercises: sql<number>`count(*)::int` })
    .from(userSkills)
    .where(and(eq(userSkills.userId, userId), gte(userSkills.lastAt, from), sql`${userSkills.lastAt} < ${to}`));
  const [{ lessonsPassed }] = await db
    .select({ lessonsPassed: sql<number>`count(*) filter (where ${userLessons.roleplayDone} and ${userLessons.correct}::float / nullif(${userLessons.total}, 0) >= 0.7)::int` })
    .from(userLessons)
    .where(and(eq(userLessons.userId, userId), gte(userLessons.lastAt, from), sql`${userLessons.lastAt} < ${to}`));
  const [top] = await db
    .select({ type: reviews.errorType, n: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.correct, false), isNotNull(reviews.errorType), gte(reviews.createdAt, from), sql`${reviews.createdAt} < ${to}`))
    .groupBy(reviews.errorType)
    .orderBy(sql`count(*) desc`)
    .limit(1);
  const s = series ?? (await growthReport(userId, "de", "A1", today)).series;
  const idx = s.writing.findIndex((p) => p.week === lastWeek);
  const writing = { from: idx > 0 ? s.writing[idx - 1].value : null, to: idx >= 0 ? s.writing[idx].value : null };
  const usage = s.usage.find((p) => p.week === lastWeek)?.value ?? null;
  const topError = top && isErrorType(top.type) ? { type: top.type, label: ERROR_LABELS[top.type], n: top.n } : null;

  const parts: string[] = [];
  if (answers) parts.push(`${answers} cevap`);
  if (exercises) parts.push(`${exercises} egzersiz`);
  if (lessonsPassed) parts.push(`${lessonsPassed} ders`);
  if (writing.to !== null) parts.push(writing.from !== null ? `yazma ${writing.from}→${writing.to}` : `yazma ${writing.to}`);
  if (usage !== null) parts.push(`kullanım ${usage}`);
  if (topError) parts.push(`en çok hata: ${topError.label}`);
  const text = parts.length ? `Geçen hafta: ${parts.join(", ")}.` : "Geçen hafta çalışma yok — bu hafta küçük bir turla başla.";
  return { week: lastWeek, answers, exercises, lessonsPassed, writing, usage, topError, text };
}
