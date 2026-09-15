import { sql, type SQL, type SQLWrapper } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Misafir kimliğini OTURUM OKUMADAN tanımak — sosyal kancalar, sıralamalar,
 * cron ve birleştirme için.
 *
 * `lib/auth/guest` oturumu okuyor ve better-auth yapılandırmasını içe
 * aktarıyor; kancalar ise veritabanı testlerinden de çağrılıyor. Bu dosya
 * yalnız veritabanına bağlı, yani her yerden içe aktarılabilir.
 */

/**
 * Kimlik misafir mi. Kullanıcı satırı yoksa misafir SAYILMIYOR: silinmiş ya da
 * test kimliği için sosyal kancayı kapatmak bugünkü davranışı değiştirirdi.
 */
export async function isGuestUser(userId: string): Promise<boolean> {
  const res = await db.execute(sql`select "isAnonymous" as guest from "user" where id = ${userId} limit 1`);
  const rows = (Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows) ?? [];
  return (rows[0] as { guest?: boolean } | undefined)?.guest === true;
}

/**
 * Sıralama sorgularına eklenen koşul: satırın sahibi misafir DEĞİL.
 *
 * Misafirin görünen adı yok; günün tablosunda ya da haftanın ilk üçünde adsız
 * bir oyuncu olarak görünmemeli. `not exists` kullanıcı satırı olmayan
 * kimlikleri (test verisi) eksiltmiyor.
 */
export function notGuest(userIdColumn: SQLWrapper): SQL {
  return sql`not exists (select 1 from "user" gu where gu.id = ${userIdColumn} and gu."isAnonymous")`;
}
