import "server-only";
import { and, desc, eq, gte, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { reviews, words } from "@/lib/db/schema";
import { ERROR_LABELS, ERROR_TARGET_GAME, isErrorType, type ErrorType } from "@/lib/errors";
import { GAME_LABELS, type GameId } from "@/lib/types";
import { weakRules } from "@/lib/lessons/progress";

/**
 * Hata analitiği (plan WP-51) — "zayıf noktaların".
 *
 * WP-02 her yanlışa tip ve ayrıntı yazıyordu; burası onları okur:
 *   1. Son 30 günün hata tipi dağılımı (pay ve sayı).
 *   2. Karıştırma çiftleri: "anlam" hatasında hangi kelime hangi karşılıkla
 *      karıştırıldı (`reviews.detail` = seçilen şık / yazılan kelime).
 *   3. Zayıf kurallar: dersler (`weakRules`).
 * Her hata tipine tek dokunuşla hedefli çalışma: o tipin oyunuyla tek oyunlu
 * tur (`/learn?game=…`). WP-11 drill motoru geldiğinde dilbilgisi tipleri
 * drill'e yönlenir.
 */

export type ErrorShare = {
  type: ErrorType;
  label: string;
  n: number;
  /** Bütün yanlışlar içindeki pay, 0–100. */
  pct: number;
  /** Hedefli çalışma. */
  href: string | null;
  gameLabel: string | null;
};

export type ConfusionPair = {
  wordId: number;
  de: string;
  artikel: string | null;
  tr: string;
  /** Karıştırıldığı karşılık / yazılan. */
  with: string;
  n: number;
};

export type ErrorReport = {
  days: number;
  totalWrong: number;
  types: ErrorShare[];
  confusions: ConfusionPair[];
  weakRules: string[];
};

export async function errorReport(userId: string, course: string, days = 30): Promise<ErrorReport> {
  const since = new Date(Date.now() - days * 86400000);
  const rows = await db
    .select({ type: reviews.errorType, n: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.correct, false), isNotNull(reviews.errorType), gte(reviews.createdAt, since)))
    .groupBy(reviews.errorType)
    .orderBy(desc(sql`count(*)`));
  const totalWrong = rows.reduce((a, r) => a + r.n, 0);
  const types: ErrorShare[] = rows
    .filter((r): r is { type: ErrorType; n: number } => isErrorType(r.type))
    .map((r) => {
      const game = ERROR_TARGET_GAME[r.type] ?? null;
      return {
        type: r.type,
        label: ERROR_LABELS[r.type],
        n: r.n,
        pct: totalWrong ? Math.round((100 * r.n) / totalWrong) : 0,
        href: game ? `/learn?game=${game}` : null,
        gameLabel: game ? GAME_LABELS[game as GameId] : null,
      };
    });

  const conf = await db
    .select({ wordId: reviews.wordId, detail: reviews.detail, n: sql<number>`count(*)::int`, de: words.de, artikel: words.artikel, tr: words.tr })
    .from(reviews)
    .innerJoin(words, eq(words.id, reviews.wordId))
    .where(and(eq(reviews.userId, userId), eq(reviews.correct, false), eq(reviews.errorType, "meaning"), isNotNull(reviews.detail), gte(reviews.createdAt, since)))
    .groupBy(reviews.wordId, reviews.detail, words.de, words.artikel, words.tr)
    .orderBy(desc(sql`count(*)`))
    .limit(8);
  const confusions: ConfusionPair[] = conf
    .filter((c) => c.detail && c.detail.toLocaleLowerCase("tr-TR") !== c.tr.toLocaleLowerCase("tr-TR"))
    .map((c) => ({ wordId: c.wordId, de: c.de, artikel: c.artikel, tr: c.tr, with: c.detail!, n: c.n }));

  let rules: string[] = [];
  try {
    rules = await weakRules(userId, 3);
  } catch {
    rules = [];
  }
  void course;
  return { days, totalWrong, types, confusions, weakRules: rules };
}

/**
 * Son 14 günde ≥ 5 kez görülen hata tipleri — SRS ağırlığı için (WP-51).
 * `submitAnswers` bu kümeyi okur: kelimenin son yanlışı bu tiplerden biriyse
 * aralık ×0,75 (yoksa `ERROR_SRS_WEIGHT` varsayılanı).
 */
export const FREQUENT_ERROR_DAYS = 14;
export const FREQUENT_ERROR_MIN = 5;
export const FREQUENT_ERROR_WEIGHT = 0.75;

export async function frequentErrorTypes(userId: string): Promise<Set<ErrorType>> {
  const since = new Date(Date.now() - FREQUENT_ERROR_DAYS * 86400000);
  const rows = await db
    .select({ type: reviews.errorType, n: sql<number>`count(*)::int` })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.correct, false), isNotNull(reviews.errorType), gte(reviews.createdAt, since)))
    .groupBy(reviews.errorType);
  const out = new Set<ErrorType>();
  for (const r of rows) if (isErrorType(r.type) && r.n >= FREQUENT_ERROR_MIN) out.add(r.type);
  return out;
}
