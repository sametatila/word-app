import "server-only";
import { redisClient, warnRedisOnce } from "@/lib/auth/redis";

/**
 * HESAP BAŞINA başarısız giriş sayacı.
 *
 * Var olan hız sınırı yalnız IP başına sayıyor. Tek bir hesaba yüzlerce
 * IP'den yapılan deneme — credential stuffing, password spraying — hiçbir
 * eşiğe çarpmıyordu: her IP kendi beşliğini harcayıp çekiliyor, hesabın
 * gördüğü toplam deneme sınırsız kalıyordu. Buradaki sayaç o boşluğu
 * kapatıyor: eşik AŞILDIĞINDA parola doğru bile olsa giriş reddediliyor.
 *
 * SAYAÇ E-POSTAYA GÖRE, HESABIN VARLIĞINA GÖRE DEĞİL. Kayıtlı olmayan bir
 * adres için de sayılıyor ve aynı 429 dönüyor; yoksa "bu adres kilitlendi"
 * yanıtı hesabın var olduğunu söylerdi. Sayım denemenin kendisine bakıyor,
 * hedefin gerçekliğine değil.
 *
 * KİLİDİN BEDELİ AÇIK: saldırgan bilerek yanlış parola göndererek gerçek bir
 * kullanıcıyı dışarıda bırakabilir. Bu, hesap kilidi olan her tasarımın
 * bilinen bedeli. Pencere bu yüzden KISA (15 dakika) ve kalıcı bir kilit yok;
 * ayrıca "parolamı unuttum" yolu kilitten etkilenmiyor, yani kullanıcının
 * elinde her zaman bir çıkış kapısı kalıyor. Alternatif olan "artan gecikme"
 * bu bedeli kaldırırdı ama sunucu kaynağını saldırganın elinde tutuyor.
 *
 * Başarılı girişte sayaç SIFIRLANIYOR: parolasını hatırlayan kullanıcı bir
 * sonraki denemesinde temiz bir sayfayla başlıyor.
 */

/** Kaç başarısız denemeden sonra kilitlenir. */
export const MAX_FAILED_LOGINS = 10;

/** Kilidin ve sayacın ömrü (saniye). Son başarısız denemeden itibaren. */
export const LOCKOUT_SECONDS = 15 * 60;

const PREFIX = "lernomi:login-fail:";

/**
 * Sayaç anahtarı. E-posta normalleştiriliyor çünkü `Ali@X.com` ile
 * `ali@x.com` aynı hesap: ayrı saymak sayacı ikiye bölerdi.
 *
 * `scope` (IP) verilirse sayaç e-posta + IP çiftine bağlanıyor. Yalnız mağaza
 * inceleme hesapları için (bkz. `lockScope`): adresleri herkese açık
 * belgelerde ve Turnstile'dan muaflar, yani e-posta başına kilit onları
 * dışarıdan, istendiği kadar kilitli tutmanın yoluydu.
 */
function key(email: string, scope?: string): string {
  return PREFIX + email.trim().toLowerCase() + (scope ? `|${scope}` : "");
}

/**
 * Kilidin kapsamı: inceleme hesabında IP, öbür herkeste yok (e-posta başına).
 *
 * İNCELEME HESAPLARI (`CAPTCHA_EXEMPT_EMAILS`) E-POSTA + IP'YE GÖRE KİLİTLENİYOR
 * (güvenlik denetimi 2026-10-03, O4). E-posta başına kilitte saldırgan bu
 * adreslere 15 dakikada bir 10 yanlış parola göndererek hesabı süresiz kilitli
 * tutabiliyordu; incelemeci demo hesabıyla giremez, App Store 2.1 reddi.
 * IP'ye bağlanınca kilit yalnız deneyen IP'yi durduruyor. Bedeli: bu hesaplarda
 * dağıtılmış parola denemesi hesap başına durdurulmuyor. Parolalar rastgele ve
 * uzun; IP başına sınır (better-auth dakikada 5 + nginx) aynen geçerli.
 */
export function lockScope(exempt: boolean, ip: string | null | undefined): string | undefined {
  return exempt ? ip || "?" : undefined;
}

/** Eşik aşıldı mı. Redis erişilemezse `false` (açığa düş). */
export async function isLockedOut(email: string, scope?: string): Promise<boolean> {
  try {
    const r = redisClient();
    if (!r) return false;
    const raw = await r.get(key(email, scope));
    return raw !== null && Number(raw) >= MAX_FAILED_LOGINS;
  } catch (err) {
    warnRedisOnce(err);
    return false;
  }
}

/**
 * Başarısız denemeyi kaydeder ve YENİ SAYIYI döndürür (Redis yoksa null).
 * Sayı çağırana lazım: log satırı "kaçıncı deneme" yazabilsin diye.
 *
 * Pencere HER başarısızlıkta yenileniyor: saldırgan eşiğin hemen altında
 * durup beklemesin diye.
 */
export async function noteFailedLogin(email: string, scope?: string): Promise<number | null> {
  try {
    const r = redisClient();
    if (!r) return null;
    const k = key(email, scope);
    const count = await r.incr(k);
    await r.expire(k, LOCKOUT_SECONDS);
    return count;
  } catch (err) {
    warnRedisOnce(err);
    return null;
  }
}

/** Başarılı girişten sonra sayacı sıfırlar. */
export async function clearFailedLogins(email: string, scope?: string): Promise<void> {
  try {
    const r = redisClient();
    if (!r) return;
    await r.del(key(email, scope));
  } catch (err) {
    warnRedisOnce(err);
  }
}
