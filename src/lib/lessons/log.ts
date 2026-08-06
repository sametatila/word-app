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
): Promise<void> {
  try {
    await db.insert(roleplayLogs).values({
      userId,
      lessonId,
      turn,
      said: said.slice(0, MAX_CHARS),
      reply: reply.slice(0, MAX_CHARS),
      expiresAt: sql`now() + (${RETENTION_DAYS} || ' days')::interval` as never,
    });
    // Temizlik yazmaya bağlı: ayrı bir zamanlanmış iş kurmadan da kayıt
    // penceresi kendini sınırlıyor.
    await db.delete(roleplayLogs).where(lt(roleplayLogs.expiresAt, new Date()));
  } catch (err) {
    console.error("[roleplay-log] yazılamadı", err);
  }
}
