import "server-only";
import { MIN_MASTERED } from "@/lib/weekly-const";
import { MASTERED_DAYS } from "@/lib/srs";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { exams, userWords } from "@/lib/db/schema";
import { weekStart } from "@/lib/session";

/* Eşik istemciye de iniyor: bkz. `lib/weekly-const`. */
export { MIN_MASTERED } from "@/lib/weekly-const";


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

/** Son 8 haftanın skorları — profil trendi (WP-52). */
export async function weeklyHistory(userId: string, limit = 8) {
  return db
    .select({ week: exams.week, score: exams.score, correct: exams.correct, total: exams.total })
    .from(exams)
    .where(and(eq(exams.userId, userId), eq(exams.kind, "weekly")))
    .orderBy(desc(exams.week))
    .limit(limit);
}
