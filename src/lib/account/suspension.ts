import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Hesap askıya alma — yönetim panelinden.
 *
 * NEDEN VAR. Kuralı çiğneyen bir hesabı (taciz, spam, taklit) durdurmanın
 * tek yolu veritabanına elle girmekti. Mağazaların kullanıcı içeriği kuralı
 * (App Store 1.2, Play UGC) şikâyet edilen kullanıcıya karşı işlem
 * yapılabilmesini istiyor; ad sıfırlama içeriği kaldırıyor, bu da kişiyi.
 *
 * NASIL İŞLİYOR, İKİ YER:
 *   1. Askıya alındığı anda hesabın BÜTÜN oturumları siliniyor. Çerez
 *      önbelleği (`cookieCache.maxAge` 60 sn) yüzünden etki en geç bir
 *      dakikada görünüyor - parola sıfırlamasıyla aynı pencere.
 *   2. Askı sürerken YENİ oturum açılamıyor: better-auth'un oturum oluşturma
 *      kancası (`lib/auth/server` databaseHooks) `ACCOUNT_SUSPENDED` ile
 *      reddediyor. E-posta, Google, Apple, tek kullanımlık jeton - hepsi aynı
 *      kapıdan geçiyor, çünkü hepsi bir oturum satırı yazıyor.
 *
 * Süreli askı kendiliğinden bitiyor (`until` geçince kanca geçiriyor).
 * Veri SİLİNMİYOR: askı geri alınabilir bir karar, silme değil.
 */

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}

export type Suspension = { id: number; reason: string; until: string | null; adminEmail: string; createdAt: string };

/** Yürürlükteki askı; yoksa null. Tablo yoksa (migration uygulanmamış) null. */
export async function activeSuspension(userId: string): Promise<Suspension | null> {
  try {
    const [r] = await rows(sql`
      select id, reason, until, coalesce(admin_email, '') admin_email, created_at
      from account_suspensions
      where user_id = ${userId} and lifted_at is null and (until is null or until > now())
      order by id desc limit 1`);
    if (!r) return null;
    return {
      id: Number(r.id),
      reason: String(r.reason ?? ""),
      until: r.until ? new Date(String(r.until)).toISOString() : null,
      adminEmail: String(r.admin_email ?? ""),
      createdAt: new Date(String(r.created_at)).toISOString(),
    };
  } catch {
    return null;
  }
}

/** Askıya alır ve açık oturumları kapatır. `days` boşsa süresiz. */
export async function suspendUser(userId: string, reason: string, days: number | null, adminEmail: string | null): Promise<void> {
  const until = days && days > 0 ? new Date(Date.now() + days * 86_400_000) : null;
  await db.transaction(async (tx) => {
    // Önceki açık askı varsa kapanıyor: aynı anda tek yürürlükteki karar.
    await tx.execute(sql`update account_suspensions set lifted_at = now(), lifted_by = ${adminEmail}
      where user_id = ${userId} and lifted_at is null`);
    await tx.execute(sql`insert into account_suspensions (user_id, reason, until, admin_email)
      values (${userId}, ${reason.slice(0, 500)}, ${until}, ${adminEmail})`);
    await tx.execute(sql`delete from session where "userId" = ${userId}`);
  });
}

export async function liftSuspension(userId: string, adminEmail: string | null): Promise<void> {
  await db.execute(sql`update account_suspensions set lifted_at = now(), lifted_by = ${adminEmail}
    where user_id = ${userId} and lifted_at is null`);
}

/** Kullanıcı detay sayfası için geçmiş. */
export async function suspensionHistory(userId: string): Promise<(Suspension & { liftedAt: string | null; liftedBy: string })[]> {
  try {
    const rs = await rows(sql`
      select id, reason, until, coalesce(admin_email, '') admin_email, created_at, lifted_at, coalesce(lifted_by, '') lifted_by
      from account_suspensions where user_id = ${userId} order by id desc limit 20`);
    return rs.map((r) => ({
      id: Number(r.id),
      reason: String(r.reason ?? ""),
      until: r.until ? new Date(String(r.until)).toISOString() : null,
      adminEmail: String(r.admin_email ?? ""),
      createdAt: new Date(String(r.created_at)).toISOString(),
      liftedAt: r.lifted_at ? new Date(String(r.lifted_at)).toISOString() : null,
      liftedBy: String(r.lifted_by ?? ""),
    }));
  } catch {
    return [];
  }
}
