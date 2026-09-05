import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { account } from "@/lib/db/auth-schema";
import { appleRevokeConfigured, exchangeAppleCode, revokeAppleToken } from "@/lib/auth/apple";

/**
 * Apple ile Giriş izninin hesap silmede iptali (App Store 5.1.1(v)).
 *
 * İki uç var ve ikisi de burada:
 *  - `storeAppleAuthorizationCode` — giriş anında, uygulamadan gelen tek kullanımlık
 *    kodu refresh token'a çevirip `account.refreshToken`e yazar. Native giriş akışı
 *    id token ile çalıştığı için Better Auth burayı kendiliğinden doldurmuyor;
 *    id token da iptal edilemiyor, dolayısıyla iptal edilebilecek tek şey bu.
 *  - `revokeAppleSignIn` — silme anında o token'ı Apple'a iptal ettirir.
 *
 * Yapılandırma eksikse (bugünkü durum: APPLE_* değerleri boş) ikisi de sessizce
 * hiçbir şey yapmaz; hesap silme her hâlükârda tamamlanır.
 */

const PROVIDER = "apple";

/** Kullanıcının Apple hesap satırı — yoksa null. */
async function appleAccountOf(userId: string): Promise<{ id: string; refreshToken: string | null } | null> {
  const rows = await db
    .select({ id: account.id, refreshToken: account.refreshToken })
    .from(account)
    .where(and(eq(account.userId, userId), eq(account.providerId, PROVIDER)))
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Giriş sırasında alınan authorization code'u bozdurup saklar.
 * Kod tek kullanımlık ve kısa ömürlü; giriş biter bitmez çağrılmalı.
 * Zaten bir token saklıysa dokunulmuyor — Apple aynı kodu ikinci kez kabul etmez.
 */
export async function storeAppleAuthorizationCode(userId: string, code: string): Promise<boolean> {
  if (!appleRevokeConfigured()) return false;
  const row = await appleAccountOf(userId);
  if (!row || row.refreshToken) return false;
  const refreshToken = await exchangeAppleCode(code);
  if (!refreshToken) return false;
  await db.update(account).set({ refreshToken, updatedAt: new Date() }).where(eq(account.id, row.id));
  return true;
}

/**
 * Hesap silinirken Apple tarafındaki izni kaldırır.
 *
 * Başarısızlık silmeyi DURDURMUYOR: Apple'ın ucu erişilemez diye kullanıcının hesabı
 * silinemez kalırsa 5.1.1(v) baştan ihlal edilmiş olur. Hata yalnız günlüğe düşer.
 */
export async function revokeAppleSignIn(userId: string): Promise<void> {
  if (!appleRevokeConfigured()) return;
  try {
    const row = await appleAccountOf(userId);
    if (!row?.refreshToken) return;
    const ok = await revokeAppleToken(row.refreshToken);
    if (!ok) console.warn("apple revoke: Apple isteği başarısız (silme sürüyor)", { userId });
  } catch (e) {
    console.warn("apple revoke: atlandı (silme sürüyor)", e);
  }
}
