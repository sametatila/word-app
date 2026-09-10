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
 */
function key(email: string): string {
  return PREFIX + email.trim().toLowerCase();
}

/** Eşik aşıldı mı. Redis erişilemezse `false` (açığa düş). */
export async function isLockedOut(email: string): Promise<boolean> {
  try {
    const r = redisClient();
    if (!r) return false;
    const raw = await r.get(key(email));
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
export async function noteFailedLogin(email: string): Promise<number | null> {
  try {
    const r = redisClient();
    if (!r) return null;
    const k = key(email);
    const count = await r.incr(k);
    await r.expire(k, LOCKOUT_SECONDS);
    return count;
  } catch (err) {
    warnRedisOnce(err);
    return null;
  }
}

/** Başarılı girişten sonra sayacı sıfırlar. */
export async function clearFailedLogins(email: string): Promise<void> {
  try {
    const r = redisClient();
    if (!r) return;
    await r.del(key(email));
  } catch (err) {
    warnRedisOnce(err);
  }
}
