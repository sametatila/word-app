import "server-only";
import { and, asc, desc, eq, gt, gte, lt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { exams, userWords, words } from "@/lib/db/schema";
import { chatConfigured } from "@/lib/chat-providers";
import { track } from "@/lib/events";
import { makeRound, shiftDay, submitAnswers, toRoundWord, weekStart } from "@/lib/session";
import type { Answer, Round } from "@/lib/types";

/**
 * Haftalık kullanım sınavı (plan WP-42).
 *
 * Tekrar planı "hatırlıyor mu"yu ölçer; bu sınav "kullanabiliyor mu"yu:
 * kullanıcının kendi PEKİŞMİŞ kelimelerinden (aralık ≥ 21 gün) 15 soru,
 * yalnız üretim oyunlarıyla, haftada bir, tek hak, ipuçsuz. Sonuç ayrı bir
 * metrik (KPI 3, `exam_finish` kind = usage:<seviye>) ve dürüst: yanlış
 * bilinen pekişmiş kelime SRS'e kalite 2 ile döner — pekişmişten düşer.
 *
 * Pekişmiş kelimesi 30'dan az olan hesapta "öğreniliyor" bandından kurulur
 * ve "kısa kontrol" etiketi alır; skor yine kaydedilir ama pekişmiş bandı
 * ölçmüyor demektir.
 */

export const WEEKLY_ROUNDS = 15;
const MASTERED_DAYS = 21;
const MIN_MASTERED = 30;
const NO_REPEAT_WEEKS = 4;

/** Oyun dağılımı (plan): çeviri 5, yazma 4, yazarak tamamla 3, serbest cümle 2, sesli 1 (WP-20 yoksa yazma). */
const GAME_PLAN: Round["game"][] = ["translate", "translate", "translate", "translate", "translate", "typing", "typing", "typing", "typing", "cloze", "cloze", "cloze", "free_sentence", "free_sentence", "typing"];

export type WeeklyStatus = {
  week: string;
  done: boolean;
  short: boolean;
  score: number | null;
  correct: number | null;
  total: number | null;
  /** Pekişmiş kelime sayısı — kart metni için. */
  mastered: number;
};

export type WeeklyExam = { week: string; short: boolean; rounds: Round[] };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function weeklyStatus(userId: string, day: string): Promise<WeeklyStatus> {
  const week = weekStart(day);
  const [row] = await db
    .select()
    .from(exams)
    .where(and(eq(exams.userId, userId), eq(exams.kind, "weekly"), eq(exams.week, week)))
    .limit(1);
  const [{ mastered }] = await db
    .select({ mastered: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(eq(userWords.userId, userId), gte(userWords.intervalDays, MASTERED_DAYS)));
  return {
    week,
    done: Boolean(row),
    short: mastered < MIN_MASTERED,
    score: row?.score ?? null,
    correct: row?.correct ?? null,
    total: row?.total ?? null,
    mastered,
  };
}

/** Son 4 haftada sınanan kelimeler — aynı kelime peş peşe gelmesin. */
async function recentlyExamined(userId: string, week: string): Promise<Set<number>> {
  const rows = await db
    .select({ answers: exams.answers })
    .from(exams)
    .where(and(eq(exams.userId, userId), eq(exams.kind, "weekly"), gte(exams.week, shiftDay(week, -7 * NO_REPEAT_WEEKS)), lt(exams.week, week)));
  const out = new Set<number>();
  for (const r of rows) for (const a of (r.answers as { wordId: number }[]) ?? []) out.add(a.wordId);
  return out;
}

export async function buildWeeklyExam(userId: string, course: string, level: string, day: string): Promise<WeeklyExam> {
  const week = weekStart(day);
  const skip = await recentlyExamined(userId, week);
  const pick = async (mastered: boolean) => {
    const rows = await db
      .select({ w: words, uw: userWords })
      .from(userWords)
      .innerJoin(words, eq(words.id, userWords.wordId))
      .where(
        and(
          eq(userWords.userId, userId),
          eq(words.course, course),
          gt(userWords.reps, 0),
          mastered ? gte(userWords.intervalDays, MASTERED_DAYS) : lt(userWords.intervalDays, MASTERED_DAYS),
        ),
      )
      .limit(400);
    return rows.filter((r) => !skip.has(r.w.id));
  };
  let candidates = await pick(true);
  const short = candidates.length < MIN_MASTERED;
  if (short) candidates = [...candidates, ...(await pick(false))];
  const chosen = shuffle(candidates).slice(0, WEEKLY_ROUNDS);

  const pool = await db
    .select()
    .from(words)
    .where(and(eq(words.course, course), eq(words.niveau, level)))
    .orderBy(asc(sql`coalesce(${words.rank}, 999999)`), asc(words.id))
    .limit(300);

  const rounds: Round[] = [];
  let seq = 0;
  const nextId = () => `w${++seq}`;
  const ai = chatConfigured();
  chosen.forEach((row, i) => {
    const word = toRoundWord(row.w, false);
    const wanted = GAME_PLAN[i] ?? "typing";
    const order: Round["game"][] = wanted === "free_sentence" && !ai ? ["typing"] : [wanted, "typing"];
    for (const game of order) {
      const r = makeRound(game, word, pool, nextId, "strong");
      if (!r) continue;
      // Yazarak tamamla: sınavda şık yok.
      if (r.game === "cloze") r.mode = "type";
      rounds.push(r);
      break;
    }
  });
  return { week, short, rounds };
}

export type WeeklyResult = { week: string; score: number; correct: number; total: number; saved: boolean };

/**
 * Sonucu yazar: cevaplar SRS'e (yanlış → kalite 2: pekişmişten düşer),
 * `exams` satırı, `exam_finish` olayı. Hafta içinde ikinci gönderim
 * kaydedilmez (tek hak) — mevcut satır döner.
 */
export async function finishWeekly(userId: string, level: string, answers: Answer[], day: string, seconds: number): Promise<WeeklyResult> {
  const week = weekStart(day);
  const [existing] = await db
    .select()
    .from(exams)
    .where(and(eq(exams.userId, userId), eq(exams.kind, "weekly"), eq(exams.week, week)))
    .limit(1);
  if (existing) return { week, score: existing.score, correct: existing.correct, total: existing.total, saved: false };

  const graded: Answer[] = answers.map((a) => (a.correct ? a : { ...a, quality: 2 }));
  await submitAnswers(userId, graded, day, seconds);
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const score = total ? Math.round((100 * correct) / total) : 0;
  await db.insert(exams).values({
    userId,
    kind: "weekly",
    week,
    level,
    score,
    correct,
    total,
    answers: answers.map((a) => ({ wordId: a.wordId, game: a.game, correct: a.correct })),
  });
  await track(userId, "exam_finish", day, score, `usage:${level}`);
  return { week, score, correct, total, saved: true };
}

/** Son 8 haftanın skorları — profil trendi (WP-52). */
export async function weeklyHistory(userId: string, limit = 8) {
  return db
    .select({ week: exams.week, score: exams.score, correct: exams.correct, total: exams.total })
    .from(exams)
    .where(and(eq(exams.userId, userId), eq(exams.kind, "weekly")))
    .orderBy(desc(exams.week))
    .limit(limit);
}
