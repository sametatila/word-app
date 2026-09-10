import "server-only";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/lib/db";
import { account, session, user } from "@/lib/db/auth-schema";
import { purgeUserData } from "@/lib/account/purge";
import type { AppleNotification } from "@/lib/auth/apple-notifications";

/**
 * Apple'ın sunucudan sunucuya bildirimlerinin UYGULANMASI.
 *
 * Doğrulama `lib/auth/apple-notifications.ts`te; buraya yalnız imzası
 * kanıtlanmış bir olay geliyor.
 *
 * APPLE'IN TOKEN'INI BURADA İPTAL ETMİYORUZ. `lib/auth/apple.ts`teki revoke
 * hesap silme yolunda çağrılıyor ve orada anlamlı: izni biz kaldırıyoruz. Bu
 * olaylarda izin ZATEN kalkmış — kullanıcı Apple tarafında kaldırmış ya da
 * hesabını silmiş. Aynı token'ı bir de bize iptal ettirmek Apple'a boş bir
 * istek atmaktan başka bir şey yapmaz.
 */

const PROVIDER = "apple";

export type AppleNotifyOutcome =
  | "unknown_user"   // bu `sub` bizde yok — kayıt silinmiş ya da bize ait değil
  | "ignored"        // e-posta yönlendirme tercihi; veride karşılığı yok
  | "unlinked"       // Apple bağlantısı koptu, hesap duruyor
  | "purged";        // Apple tek giriş yoluydu ve hesap tamamen silindi

/** Kullanıcının Apple DIŞINDA bir giriş yolu var mı — parola ya da başka sağlayıcı. */
async function hasOtherCredentials(userId: string): Promise<boolean> {
  const rows = await db
    .select({ id: account.id })
    .from(account)
    .where(and(eq(account.userId, userId), ne(account.providerId, PROVIDER)))
    .limit(1);
  return rows.length > 0;
}

/**
 * Apple bağlantısını koparır ve kullanıcının oturumlarını düşürür.
 *
 * OTURUMLAR NEDEN GİDİYOR: Apple, iznin kaldırıldığı anda o kullanıcı için
 * verdiği token'ları geçersiz sayıyor ve uygulamadan kullanıcıyı çıkarmasını
 * bekliyor. Kişinin parolası da varsa bu bir kez yeniden giriş demek —
 * iptal edilmiş bir kimlikle açık kalmış oturumun yanında küçük bir bedel.
 *
 * SATIR NEDEN SİLİNİYOR, İŞARETLENMİYOR: Apple `sub`'ı takım başına kalıcı.
 * Kullanıcı yarın yeniden Apple ile girerse aynı `sub` geliyor, better-auth
 * satırı yeniden kuruyor ve doğrulanmış e-posta üzerinden aynı hesaba
 * bağlanıyor. Yani silmek geri döndürülebilir; "iptal edildi" diye duran bir
 * satır ise Profil ekranında "Apple: bağlı" yazmaya devam ederdi.
 */
async function unlink(userId: string): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(account).where(and(eq(account.userId, userId), eq(account.providerId, PROVIDER)));
    await tx.delete(session).where(eq(session.userId, userId));
  });
}

/**
 * Hesabın tamamını siler — uygulama verisi + better-auth satırları.
 *
 * `session` ve `account` `user`a `onDelete: cascade` ile bağlı, o yüzden
 * `user` satırını silmek ikisini de götürüyor. Uygulama tabloları `user`a FK
 * taşımadığı için önce `purgeUserData` koşuyor; sıra bozulursa hesabın verisi
 * sahipsiz kalır.
 *
 * Bu, uygulama içi "hesabımı sil" ile AYNI temizlik (bkz. lib/auth/server.ts
 * `deleteUser.beforeDelete`) — tek fark tetikleyicinin Apple olması.
 */
async function purge(userId: string): Promise<void> {
  await purgeUserData(userId);
  await db.delete(user).where(eq(user.id, userId));
}

/**
 * Olayı uygular. Dönen değer yalnız günlük ve test içindir; Apple sonucu
 * umursamıyor, tek beklediği 2xx.
 */
export async function applyAppleNotification(ev: AppleNotification): Promise<AppleNotifyOutcome> {
  // E-posta yönlendirme tercihi. Veride tutulacak bir alan yok ve davranışı da
  // değiştirmiyor: `email-disabled` sonrası gizli adrese giden posta düşer, ama
  // bunu bilmek bize bir karar aldırmıyor. Günlüğe yazılıyor, orada kalıyor.
  if (ev.type === "email-disabled" || ev.type === "email-enabled") return "ignored";

  const rows = await db
    .select({ id: account.id, userId: account.userId })
    .from(account)
    .where(and(eq(account.providerId, PROVIDER), eq(account.accountId, ev.sub)))
    .limit(1);
  const row = rows[0];
  if (!row) return "unknown_user";

  if (ev.type === "consent-revoked") {
    await unlink(row.userId);
    return "unlinked";
  }

  /*
    `account-delete` — Apple hesabı KALICI olarak silindi, bu `sub` bir daha
    hiç gelmeyecek.

    Yine de hesabı koşulsuz silmiyoruz: kişinin parolası ya da Google bağlantısı
    varsa Lernomi hesabı hâlâ erişilebilir ve onu silmek, kullanıcının istemediği
    bir veri kaybı olurdu — Apple hesabını silmek Lernomi hesabını silmek demek
    değil. Apple tek giriş yoluysa hesap zaten ulaşılamaz durumda; orada silmek
    doğru olan ve Apple'ın beklediği davranış.
  */
  if (await hasOtherCredentials(row.userId)) {
    await unlink(row.userId);
    return "unlinked";
  }
  await purge(row.userId);
  return "purged";
}
