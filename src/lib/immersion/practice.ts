import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { userPathItems } from "@/lib/db/schema";
import { PRACTICE_PASS_PCT } from "@/lib/score-bands";

/**
 * Patika'nın pratik adımları (dil bilgisi, tekrar, kontrol noktası) — kayıt.
 *
 * Bu adımların içeriği ünitenin derslerinden türetiliyor, yani doğrulanacak
 * bir egzersiz satırı yok; doğrulanan şey öğe KİMLİĞİNİN biçimi ve kullanıcının
 * kendi kursu. XP verilmiyor: adım istenildiği kadar tekrar edilebiliyor ve
 * sunucu cevapları görmüyor — XP'ye bağlansa çiftlenebilir bir kapı olurdu.
 * Kayıt yalnız patikadaki ilerlemeyi söylüyor.
 */

/** `${kurs}-${seviye}-u${NN}-${tür}${n}` — `lib/immersion/build` ile aynı biçim. */
const ITEM_ID = /^([a-z]{2,3}(?:-[a-z]{2})?)-(a1|a2|b1|b2|c1)-u(\d{2})-(grammar|quiz|unitQuiz)1$/;

export type PracticeKind = "grammar" | "quiz" | "unitQuiz";

export function parsePracticeItemId(id: string): { course: string; level: string; unit: number; kind: PracticeKind } | null {
  const m = ITEM_ID.exec(id);
  if (!m) return null;
  return { course: m[1], level: m[2].toUpperCase(), unit: Number(m[3]), kind: m[4] as PracticeKind };
}

export async function recordPracticeItem(
  userId: string,
  itemId: string,
  pct: number,
): Promise<{ bestPct: number; passed: boolean; attempts: number }> {
  const clamped = Math.max(0, Math.min(100, Math.round(pct)));
  const passedNow = clamped >= PRACTICE_PASS_PCT;
  const [row] = await db
    .insert(userPathItems)
    .values({ userId, itemId, lastPct: clamped, bestPct: clamped, attempts: 1, passedAt: passedNow ? new Date() : null })
    .onConflictDoUpdate({
      target: [userPathItems.userId, userPathItems.itemId],
      set: {
        lastPct: clamped,
        bestPct: sql`greatest(${userPathItems.bestPct}, ${clamped})`,
        attempts: sql`${userPathItems.attempts} + 1`,
        // Geçmiş bir kez kazanılınca geri alınmıyor: sonraki düşük puan adımı
        // "bitmemiş"e çevirmez (beceri adımlarının `correct` = en iyi ile aynı).
        passedAt: passedNow ? sql`coalesce(${userPathItems.passedAt}, now())` : sql`${userPathItems.passedAt}`,
        lastAt: sql`now()`,
      },
    })
    .returning({ bestPct: userPathItems.bestPct, passedAt: userPathItems.passedAt, attempts: userPathItems.attempts });
  return { bestPct: row.bestPct, passed: row.passedAt !== null, attempts: row.attempts };
}

/** Kullanıcının kursundaki pratik adım kayıtları: denenen ve geçilen kimlikler. */
export async function practiceProgress(userId: string, course: string): Promise<{ tried: Set<string>; passed: Set<string> }> {
  const rows = await db
    .select({ itemId: userPathItems.itemId, passedAt: userPathItems.passedAt })
    .from(userPathItems)
    .where(and(eq(userPathItems.userId, userId), sql`${userPathItems.itemId} like ${`${course}-%`}`));
  const tried = new Set<string>();
  const passed = new Set<string>();
  for (const r of rows) {
    tried.add(r.itemId);
    if (r.passedAt) passed.add(r.itemId);
  }
  return { tried, passed };
}
