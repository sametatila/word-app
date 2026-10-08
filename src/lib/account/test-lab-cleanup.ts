import "server-only";
import { sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { revokeAppleSignIn } from "@/lib/account/apple-revoke";
import { purgeUserData } from "@/lib/account/purge";
import { deleteRevenueCatCustomer } from "@/lib/account/revenuecat-delete";
import { recordDeletion } from "@/lib/account/deletion-log";

/** Test Lab hesabının yaşadığı ve sessiz kalması gereken süre (gün). */
export const TEST_LAB_RETENTION_DAYS = 7;

/**
 * PLAY YAYIN ÖNCESİ RAPORU ROBOTLARININ HESAPLARINI SİLER (Samet, 2026-10-08:
 * "Google'ı engellemek istemeyiz ama bir süre sonra silinmesi makul").
 *
 * Robotlar her build'de birkaç uydurma Google hesabıyla giriyor ya da misafir
 * açıyor, bir daha dönmüyor. Engellenmiyorlar (rapor girişten sonrasını
 * gezebilmeli); ölçümden düşüyorlar (`lib/test-lab`) ve burada siliniyorlar.
 *
 * İşaret iki yoldan geliyor ve ikisi de yanılabilir: cihaz başlığını herkes
 * gönderebilir, Google ağından gelen gerçek kişi de olabilir (`lib/google-networks`).
 * O yüzden silme yalnız şunların HEPSİ doğruysa:
 *   - hesap Test Lab işaretli (`user_clients.test_lab`),
 *   - {@link TEST_LAB_RETENTION_DAYS} günden eski ve o süredir sessiz (oturum ve
 *     uygulama kaydı bu sürede görülmemiş),
 *   - açıldığı günden sonra hiç öğrenme günü yok (robot o gün gezer, ertesi gün
 *     gelmez; uygulamayı gerçekten kullanan kişi ikinci gününde elenir),
 *   - mağazadan hiç satın alma yok.
 * Silme yöneticinin silmesiyle aynı sıra (`lib/account/admin-delete`): Apple izni,
 * veri (`purgeUserData`), RevenueCat müşterisi, `user` satırı. Koşul veri
 * silinmeden önce ve `user` satırı silinirken yeniden sınanıyor (bkz.
 * `unverified-cleanup`). Kayıt `account_deletions` `testlab`.
 *
 * Günlük cron (`api/cron/assess`) çağırıyor; tur başına `limit` kadar.
 */
function stale(u: SQL): SQL {
  return sql`exists (select 1 from user_clients tl where tl.user_id = ${u} and tl.test_lab)
    and u."createdAt" < now() - make_interval(days => ${TEST_LAB_RETENTION_DAYS})
    and not exists (select 1 from user_clients c where c.user_id = ${u} and c.last_seen >= now() - make_interval(days => ${TEST_LAB_RETENTION_DAYS}))
    and not exists (select 1 from session s where s."userId" = ${u} and s."updatedAt" >= now() - make_interval(days => ${TEST_LAB_RETENTION_DAYS}))
    and not exists (select 1 from daily_stats d where d.user_id = ${u} and d.day > (u."createdAt")::date + 1)
    and not exists (select 1 from entitlements e where e.user_id = ${u} and e.store_provider is not null)`;
}

const rowsOf = <T>(res: unknown): T[] => (Array.isArray(res) ? res : ((res as { rows?: unknown[] }).rows ?? [])) as T[];

export async function purgeStaleTestLabAccounts(limit = 50): Promise<number> {
  let done = 0;
  try {
    const rows = rowsOf<{ id: string; created_at: string; guest: boolean }>(await db.execute(sql`
      select u.id, u."createdAt" created_at, coalesce(u."isAnonymous", false) guest from "user" u
      where ${stale(sql`u.id`)}
      order by u."createdAt"
      limit ${limit}`));
    for (const r of rows) {
      try {
        const still = rowsOf(await db.execute(sql`select 1 from "user" u where u.id = ${r.id} and ${stale(sql`u.id`)}`));
        if (!still.length) continue;
        await revokeAppleSignIn(r.id);
        await purgeUserData(r.id);
        await deleteRevenueCatCustomer(r.id);
        /* Veri silindi, işaret satırı (`user_clients`) da gitti: son silmede yalnız
           sessizlik yeniden sınanıyor. */
        const gone = (await db.execute(sql`
          delete from "user" u where u.id = ${r.id}
            and not exists (select 1 from session s where s."userId" = u.id and s."updatedAt" >= now() - make_interval(days => ${TEST_LAB_RETENTION_DAYS}))`)) as unknown as { rowCount?: number };
        if ((gone.rowCount ?? 0) > 0) {
          done++;
          await recordDeletion({ source: "testlab", wasGuest: r.guest, createdAt: r.created_at });
        }
      } catch (err) {
        console.error("[test-lab-cleanup]", r.id, err);
      }
    }
  } catch (err) {
    console.error("[test-lab-cleanup]", err);
  }
  return done;
}
