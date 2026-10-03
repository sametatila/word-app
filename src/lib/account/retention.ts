import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { HEARD_RETENTION_DAYS } from "@/lib/stt-retention-const";
import { SESSION_RECORD_PURGE_DAYS } from "@/lib/auth/session-config";

/**
 * Gizlilik §9'daki iki saklama sözünün süpürgesi — günlük cron
 * (`api/cron/assess`). İkisi de tekrar çalışmaya dayanıklı ve hatasını
 * yutuyor: biri düşse de öteki ve kuyruk sürsün.
 */

/**
 * SÜRESİ DOLMUŞ OTURUM KAYITLARI (IP, cihaz tanımı).
 *
 * Better Auth süresi dolan oturumu yalnız o jetonla gelindiğinde siliyor;
 * bir daha gelinmeyen oturumun satırı IP'siyle süresiz kalıyordu. Politika
 * "kullanılmayan oturum düşer, kaydı en geç 7 gün içinde silinir" diyor.
 *
 * PAY BİLİNÇLİ (`SESSION_RECORD_PURGE_DAYS`): süresi dolmuş misafir oturumu jetonla geri
 * kurulabiliyor ve birleştirmede kanıt sayılıyor (`lib/auth/guest-resume`,
 * `verifyGuestToken`) — haftalık misafir temizliği (`purgeStaleGuests`)
 * o misafiri silene dek bu yol açık kalmalı.
 */
export async function purgeExpiredSessions(): Promise<number> {
  try {
    const res = await db.execute(sql`delete from session where "expiresAt" < now() - make_interval(days => ${SESSION_RECORD_PURGE_DAYS})`);
    return (res as unknown as { rowCount?: number }).rowCount ?? 0;
  } catch (err) {
    console.error("[retention] oturum temizliği başarısız", err);
    return 0;
  }
}

/**
 * YÜRÜYÜŞ MODUNDA TANINAN METİN. Satır kalıyor (maliyet ve süre ölçümü),
 * yalnız metin alanları boşalıyor. Bugün yalnız `stt` satırları metin
 * taşıyor; süzgeç türe bakmıyor ki ileride başka tür yazarsa o da düşsün.
 */
export async function purgeHeardTranscripts(): Promise<number> {
  try {
    const res = await db.execute(sql`
      update ai_usage set heard = null, expected = null
       where day < (now() - make_interval(days => ${HEARD_RETENTION_DAYS}))::date
         and (heard is not null or expected is not null)
    `);
    return (res as unknown as { rowCount?: number }).rowCount ?? 0;
  } catch (err) {
    console.error("[retention] tanınan metin temizliği başarısız", err);
    return 0;
  }
}
