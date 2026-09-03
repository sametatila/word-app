import "server-only";
import { lt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { roleplayLogs } from "@/lib/db/schema";

/**
 * Rol yapma turlarının geçici metin kaydı.
 *
 * Amaç teşhis: konuşma kalitesindeki sorunlar ancak gerçek konuşmaya bakarak
 * anlaşılıyor. Ölçüm senaryoları sekiz turda bitiyor ve modelin kendini
 * tekrar edip konuşmayı döngüye sokması orada görünmüyor; gerçek kullanıcı
 * daha uzun konuşuyor ve örüntü orada çıkıyor.
 *
 * Üç sınır bilerek konuldu:
 *
 *   1. **Ses kaydedilmiyor.** Tanıyıcı tarayıcıda çalışıyor ve ses hiçbir
 *      zaman sunucuya gelmiyor; buraya yalnızca metne dökülmüş hâli yazılıyor.
 *   2. **Süre sınırlı.** Her satır kendi son kullanma tarihini taşıyor ve
 *      süresi geçenler her yazmada siliniyor — kalıcı bir birikim değil,
 *      geçici bir teşhis penceresi.
 *   3. **Kayıt başarısızlığı konuşmayı bozmuyor.** Yazma hatası yutuluyor;
 *      teşhis için tutulan bir kaydın, teşhis edilen özelliği düşürmesi
 *      saçma olurdu.
 */

/** Kaydın kaç gün tutulacağı. */
const RETENTION_DAYS = 30;

/** Tek turda saklanacak metnin üst sınırı — kayıt şişmesin. */
const MAX_CHARS = 4000;

export async function logRoleplayTurn(
  userId: string,
  lessonId: string,
  turn: number,
  said: string,
  reply: string,
  /** Cevabı veren sağlayıcı ve bildirdiği kalan hak — bilinmiyorsa boş. */
  meta?: { provider: string; model: string; limits: Record<string, string> },
  mode: "practice" | "exam" = "practice",
): Promise<void> {
  try {
    await db.insert(roleplayLogs).values({
      userId,
      lessonId,
      mode,
      turn,
      said: said.slice(0, MAX_CHARS),
      reply: reply.slice(0, MAX_CHARS),
      provider: meta?.provider ?? null,
      model: meta?.model ?? null,
      limits: meta?.limits ?? null,
      expiresAt: sql`now() + (${RETENTION_DAYS} || ' days')::interval` as never,
    });
  } catch (err) {
    console.error("[roleplay-log] yazılamadı", err);
  }
}

/**
 * Süresi geçmiş kayıtları siler. Eskiden bu, her YAZMAYA bağlıydı; gizlilik
 * politikası "30 gün sonra kendiliğinden silinir" diyor ama rol yapma trafiği
 * durursa süresi geçmiş satırlar süresiz kalıyordu. Artık günlük cron çağırıyor
 * (api/cron/summary), yani söz trafikten bağımsız tutuluyor.
 */
export async function purgeExpiredRoleplayLogs(): Promise<number> {
  try {
    const gone = await db.delete(roleplayLogs).where(lt(roleplayLogs.expiresAt, new Date()));
    return (gone as unknown as { rowCount?: number }).rowCount ?? 0;
  } catch (err) {
    console.error("[roleplay-log] temizlik başarısız", err);
    return 0;
  }
}
