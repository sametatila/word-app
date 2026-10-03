import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { purgeUserData } from "@/lib/account/purge";
import { recordDeletion } from "@/lib/account/deletion-log";

/** Doğrulanmamış kaydın yaşayabildiği süre (gün). */
export const UNVERIFIED_RETENTION_DAYS = 30;

/**
 * HİÇ DOĞRULANMAMIŞ, HİÇ KULLANILMAMIŞ KAYITLARI SİLER (güvenlik denetimi
 * 2026-10-03, O5).
 *
 * E-postayla kayıt doğrulanmadan giriş vermiyor; doğrulanmayan kayıt bir
 * hesap değil, yarım kalmış bir başvuru. Silinmediği sürece iki zararı vardı:
 * yabancı bir adresle açılan kayıt o adrese doğrulama postası yollatmanın
 * süresiz bir aracı oluyordu (`/send-verification-email` oturumsuz), ve adresin
 * gerçek sahibi hiç istemediği bir kaydın verisini taşıyordu.
 *
 * DAR TUTULDU — yalnız şunların hepsi doğruysa:
 *   - e-posta doğrulanmamış ve misafir değil (yerinde yükselen misafir
 *     doğrulanana dek misafir kalıyor, ilerlemesi var; ona dokunulmuyor),
 *   - kayıt {@link UNVERIFIED_RETENTION_DAYS} günden eski,
 *   - hiç oturumu yok (doğrulanmamış parola hesabı giriş yapamıyor; oturum
 *     varsa bu, SMTP'siz dönemden ya da doğrulanmamış e-postalı bir sosyal
 *     girişten kalan, KULLANILAN bir hesaptır),
 *   - parola dışında bağlı giriş yöntemi yok,
 *   - hiç öğrenme günü yok (`daily_stats`).
 * Silme kullanıcının kendi silmesiyle aynı yoldan: `purgeUserData` tek
 * transaction, sonra `user` satırı (oturum/hesap/2FA cascade).
 *
 * Günlük cron (`api/cron/assess`) çağırıyor; tur başına `limit` kadar, kalan
 * ertesi güne. Hatayı yutup o ana kadar silineni döner.
 */
export async function purgeStaleUnverifiedAccounts(limit = 50): Promise<number> {
  let done = 0;
  try {
    const res = (await db.execute(sql`
      select u.id, u."createdAt" created_at from "user" u
      where u."emailVerified" = false
        and coalesce(u."isAnonymous", false) = false
        and u."createdAt" < now() - make_interval(days => ${UNVERIFIED_RETENTION_DAYS})
        and not exists (select 1 from session s where s."userId" = u.id)
        and not exists (select 1 from account a where a."userId" = u.id and a."providerId" <> 'credential')
        and not exists (select 1 from daily_stats d where d.user_id = u.id)
      order by u."createdAt"
      limit ${limit}`)) as unknown;
    const rows = (Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows ?? []) as { id: string; created_at: string }[];
    for (const r of rows) {
      await purgeUserData(r.id);
      /* Koşul silme anında yeniden sınanıyor: bu arada doğrulanan ya da giriş
         yapan kayıt gitmesin. */
      const gone = (await db.execute(sql`
        delete from "user" u where u.id = ${r.id} and u."emailVerified" = false
          and not exists (select 1 from session s where s."userId" = u.id)`)) as unknown as { rowCount?: number };
      if ((gone.rowCount ?? 0) > 0) {
        done++;
        await recordDeletion({ source: "unverified", createdAt: r.created_at });
      }
    }
  } catch (err) {
    console.error("[unverified-cleanup]", err);
  }
  return done;
}
