import { and, eq, lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { answerBatches } from "@/lib/db/schema";

/**
 * `/api/answers` gönderiminin tekrar kimliği — tablo ve gerekçe
 * `schema.ts` `answerBatches`.
 *
 * Biçim konuşma bitirişinin kimliğiyle aynı (`isFinishId`): 8-64 harf, rakam,
 * `-`, `_`. İstemcide `newBatchId` (web `lib/answer-queue`, mobil
 * `game/session`) üretiyor; `crypto.randomUUID` ya da zaman + rastgele yedek.
 */
const BATCH_RE = /^[A-Za-z0-9_-]{8,64}$/;

export function isBatchId(v: unknown): v is string {
  return typeof v === "string" && BATCH_RE.test(v);
}

/** Kimliğin saklandığı gün sayısı: istemci kuyruğu bundan eski turu zaten göndermiyor. */
export const ANSWER_BATCH_TTL_DAYS = 7;

/** İşlemi süren ilk kopyanın yanıtı için en fazla bu kadar bekleniyor. */
const WAIT_MS = 4000;
const POLL_MS = 250;

export type BatchClaim = { claimed: true } | { claimed: false; result: Record<string, unknown> | null };

/**
 * Kimliği alır. `claimed: true` → bu istek turu işleyecek, sonunda
 * `settleBatch` ya da (hata olursa) `releaseBatch` çağrılmalı.
 *
 * Kimlik zaten alınmışsa tur İŞLENMİYOR: ilk kopyanın kayıtlı yanıtı dönüyor.
 * İlk kopya hâlâ işleniyorsa (istemci yanıt gelmeden bağlantıyı kaybedip
 * hemen yeniden göndermiş) yanıtı kısa bir süre bekleniyor; gelmezse `result`
 * boş döner ve çağıran 409 veriyor.
 */
export async function claimBatch(userId: string, batch: string): Promise<BatchClaim> {
  const inserted = await db
    .insert(answerBatches)
    .values({ userId, batch })
    .onConflictDoNothing()
    .returning({ batch: answerBatches.batch });
  if (inserted.length) return { claimed: true };
  const deadline = Date.now() + WAIT_MS;
  for (;;) {
    const [row] = await db
      .select({ result: answerBatches.result })
      .from(answerBatches)
      .where(and(eq(answerBatches.userId, userId), eq(answerBatches.batch, batch)))
      .limit(1);
    /* Satır yoksa ilk kopya hata alıp kimliği bırakmış: bu kopya işleyebilir. */
    if (!row) return claimBatch(userId, batch);
    if (row.result) return { claimed: false, result: row.result as Record<string, unknown> };
    if (Date.now() >= deadline) return { claimed: false, result: null };
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
}

/** İşlenen turun yanıtını kimliğe yazar; aynı kimlikle gelen kopya bunu alır. */
export async function settleBatch(userId: string, batch: string, result: Record<string, unknown>): Promise<void> {
  await db
    .update(answerBatches)
    .set({ result })
    .where(and(eq(answerBatches.userId, userId), eq(answerBatches.batch, batch)));
}

/** İşlem hata verdi: kimlik bırakılıyor ki yeniden deneme turu işleyebilsin. */
export async function releaseBatch(userId: string, batch: string): Promise<void> {
  await db.delete(answerBatches).where(and(eq(answerBatches.userId, userId), eq(answerBatches.batch, batch)));
}

/** Süresi dolan kimlikler (günlük `cron/assess`); silinen satır sayısı. */
export async function purgeExpiredAnswerBatches(): Promise<number> {
  const cutoff = new Date(Date.now() - ANSWER_BATCH_TTL_DAYS * 24 * 3600 * 1000);
  const gone = await db.delete(answerBatches).where(lt(answerBatches.createdAt, cutoff)).returning({ batch: answerBatches.batch });
  return gone.length;
}
