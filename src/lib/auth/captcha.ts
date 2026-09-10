import "server-only";
import { captcha } from "better-auth/plugins";

/**
 * Bot koruması — Cloudflare Turnstile.
 *
 * Hız sınırı bir adresin ya da bir IP'nin KAÇ KEZ denediğini sınırlıyor;
 * dağıtılmış bir bot ağının her düğümü tek deneme yaparsa hiçbir sayaç
 * dolmuyor. Kaydı, girişi ve sıfırlama isteğini bir insan denetimine bağlayan
 * tek kapı bu. Üç uç da beyan ediliyor çünkü üçü de kimliksiz ve üçü de
 * bedeli bize yazılan bir iş yapıyor: satır açmak, parola denemek, posta
 * göndermek.
 *
 * SEÇİM TURNSTILE: reCAPTCHA gibi kullanıcıyı görsel bilmeceye sokmuyor,
 * çoğu ziyaretçide hiç etkileşim istemiyor ve Google'a kişi izi bırakmıyor
 * (gizlilik politikamızda üçüncü taraf izleyici yok — reCAPTCHA o cümleyi
 * bozardı).
 *
 * KAPALIYA DÜŞÜYOR: başlık yoksa 400, doğrulama başarısızsa 403, Cloudflare
 * ulaşılamazsa 500. Yani anahtarlar tanımlandığı ANDA istemcinin de jeton
 * göndermesi şart — bu yüzden eklenti anahtarsızken HİÇ kurulmuyor ve
 * geliştirmede, testte, eski istemcilerde hiçbir şey değişmiyor.
 *
 * SIRALAMA UYARISI: sunucudaki anahtar, jeton gönderen mobil sürüm
 * mağazadan yayılmadan açılırsa eski uygulamalar giriş yapamaz. Anahtar
 * bilerek env'de: kod önce gider, kapı sonra açılır.
 */

/** Genel anahtar. İstemciye gidiyor (bkz. /api/config) — sır değil. */
export const turnstileSiteKey = (process.env.TURNSTILE_SITE_KEY ?? "").trim();

const secretKey = (process.env.TURNSTILE_SECRET_KEY ?? "").trim();

/** İkisi de doluysa kapı açık. Biri eksikse eklenti hiç kurulmuyor. */
export const turnstileConfigured = Boolean(turnstileSiteKey && secretKey);

/** Widget'ın `action` alanı — istemci de aynı sabiti okuyor. */
export { CAPTCHA_ACTION } from "@/lib/auth/captcha-action";

/**
 * `action` SUNUCUDA DAYATILMIYOR ve bu bilinçli.
 *
 * Eklentinin `expectedAction`ı, doğrulama yanıtındaki `action` alanını
 * beklenenle karşılaştırıyor. Ürün genelinde tek bir widget bağlamı var, yani
 * kazandırdığı şey bugün sıfır; kaybettirebileceği şey ise bütün girişin
 * kapanması — alan beklendiği gibi dönmezse doğrulama 403 verir ve bu ancak
 * gerçek anahtarlarla üretimde görülür. Etiket yine de widget'ta duruyor:
 * Cloudflare panelindeki dökümü bölüyor.
 */

/**
 * ALAN ADI LİSTESİ BİLEREK YOK. Turnstile'ın kendi panelinde zaten bir alan
 * adı listesi var ve asıl kapı orası; koda ikinci bir liste yazmak, nginx'in
 * server_name'leri (www.lernomi.app, lernomi.app, exfe.me) değiştiğinde
 * girişi sessizce kıran bir eşleşme borcu yaratırdı.
 */
export function captchaPlugins() {
  if (!turnstileConfigured) return [];
  return [
    captcha({
      provider: "cloudflare-turnstile",
      secretKey,
      endpoints: ["/sign-up/email", "/sign-in/email", "/request-password-reset"],
    }),
  ];
}
