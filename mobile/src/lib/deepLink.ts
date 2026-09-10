import { API_BASE } from "../api/client";

/**
 * Gelen bağlantıyı uygulamanın anladığı bir eyleme çevirir.
 *
 * Üç bağlantı iddia ediliyor (bkz. sunucudaki .well-known dosyaları):
 *   - `/reset-password?token=…`     → uygulama içinde yeni parola ekranı
 *   - `/api/auth/verify-email?token=…` → doğrulamayı uygulama tamamlasın
 *   - `/auth/app?ott=…`             → tarayıcıda açılan girişi devral
 *
 * NEDEN SADECE İKİSİ: iddia edilen her yolu uygulamanın KARŞILAMASI gerekiyor.
 * Karşılanmayan bir yol, bağlantının tarayıcıda açılmasından kötü — uygulama
 * açılır ve kullanıcı boş bir ekranda kalır. `/api/auth/callback/*` bu yüzden
 * hiç iddia edilmiyor: Google girişi oraya dönüyor ve uygulamaya sıçrarsa
 * giriş kırılır.
 *
 * ALAN ADI DENETLENİYOR. Bir derin bağlantı DIŞARIDAN geliyor: başka bir
 * uygulama ya da sayfa uygulamayı istediği adresle açmayı deneyebilir.
 * Jetonu yalnız KENDİ alan adımızdan gelen bağlantıdan kabul ediyoruz;
 * yabancı bir kökenden gelen "verify-email" çağrısı, uygulamanın bizim
 * olmayan bir sunucuya oturum açtırmasına yol açardı.
 */
export type DeepLinkAction =
  | { kind: "reset-password"; token: string }
  | { kind: "verify-email"; url: string }
  /**
   * Tarayıcıda tamamlanan girişin uygulamaya devri (`/auth/handoff` buraya
   * yönlendiriyor). Android'de Apple girişinin dönüş yolu: token tek
   * kullanımlık ve 3 dakika yaşıyor, uygulama onu oturuma çeviriyor.
   */
  | { kind: "auth-handoff"; token: string }
  | null;

/** Eski APK'ler exfe.me'ye bakıyor; ikisi de bizim (bkz. trustedOrigins). */
const HOSTS = new Set(["www.lernomi.app", "lernomi.app", "www.exfe.me", "exfe.me"]);

export function parseDeepLink(raw: string | null | undefined): DeepLinkAction {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || !HOSTS.has(url.hostname)) return null;

  const token = url.searchParams.get("token");

  if (url.pathname === "/reset-password") {
    // Jetonsuz sıfırlama bağlantısının uygulamada yapacağı bir şey yok;
    // ekran "bağlantı geçersiz" diyecek, o yüzden yine de içeri alınıyor.
    return { kind: "reset-password", token: token ?? "" };
  }

  if (url.pathname === "/auth/app") {
    /*
      Token yoksa yapacak bir şey yok: `/auth/handoff` onu her zaman koyuyor,
      koymadıysa akış zaten yarıda kalmış demektir. Bağlantıyı içeri almak
      kullanıcıyı boş bir ekranda bırakırdı.
    */
    const ott = url.searchParams.get("ott");
    return ott ? { kind: "auth-handoff", token: ott } : null;
  }

  if (url.pathname === "/api/auth/verify-email") {
    if (!token) return null;
    /*
      Adres OLDUĞU GİBİ taşınıyor: jeton dışında `callbackURL` gibi alanlar da
      var ve better-auth onları kendi doğrulamasında kullanıyor. Yeniden
      kurmaya çalışmak, kütüphanenin sözleşmesini burada ikinci kez yazmak
      olurdu. Yalnız köken kendi adresimize sabitleniyor.
      */
    const safe = new URL(url.pathname + url.search, API_BASE);
    return { kind: "verify-email", url: safe.toString() };
  }

  return null;
}
