import { Platform } from "react-native";
import { API_BASE } from "../api/client";

/**
 * Gelen bağlantıyı uygulamanın anladığı bir eyleme çevirir.
 *
 * Beş bağlantı iddia ediliyor (bkz. sunucudaki .well-known dosyaları):
 *   - `/reset-password?token=…`     → uygulama içinde yeni parola ekranı
 *   - `/api/auth/verify-email?token=…` → doğrulamayı uygulama tamamlasın
 *   - `/auth/app?ott=…`             → tarayıcıda açılan girişi devral
 *   - `/u/<kullanıcıadı>`           → paylaşılan profil (davet bağlantısı)
 *   - `/r/<KOD>`                    → davet bağını kur (kod yazmadan)
 *   - `/g/<KOD>`                    → grup kodu, paywall'da dolu gelir (YALNIZ ANDROID)
 *
 * NEDEN SADECE BUNLAR: iddia edilen her yolu uygulamanın KARŞILAMASI gerekiyor.
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
  | {
      kind: "auth-handoff";
      token: string;
      /** Cihaza bağlama değeri (bkz. lib/handoff); yoksa devir reddediliyor. */
      nonce: string | null;
    }
  /**
   * Paylaşılan profil — davet bağlantısının kendisi.
   *
   * Uygulaması kurulu bir kullanıcı arkadaşının bağlantısına dokunduğunda
   * TARAYICI açılıyordu; büyüme döngüsünün tam ortasında bir sızıntı.
   * Adresten ekrana çevirme bilgisi zaten vardı (`pushRoute` bildirimler için
   * `/u/…` eşliyor), eksik olan tek şey yolun iddia edilip karşılanmasıydı.
   */
  | {
      kind: "profile";
      username: string;
      /** Bağlantı bir DAVET paylaşımından mı geldi (`?src=invite`) — bkz. App.tsx. */
      invite: boolean;
    }
  /**
   * Davet KODU bağlantısı (`/r/<KOD>`) — bağı yazmadan kuran yol.
   *
   * Davet bağı eskiden yalnız paywall'daki kod KUTUSUNA yazılarak kuruluyordu
   * ve o kutu iOS'ta hiç çizilmiyor (Guideline 3.1.1, `PaywallScreen`
   * `OWN_PROMO_CODES`). Kutu promo kodu için haklı olarak gizli: promo kodu
   * gerçekten premium gün açıyor. Ama aynı kutudan girilen DAVET kodu girene
   * hiçbir şey vermiyor — yalnız "kim kimi davet etti" satırını yazıyor, ödül
   * davetçiye ve davet edilenin gerçek ödemesinde düşüyor. Doğru olan bir karar
   * ilgisiz ve zararsız olan yolu da beraberinde götürmüştü.
   *
   * Çözüm kutuyu iOS'ta açmak değil, KUTUYU HİÇ GÖSTERMEMEK: bağ artık
   * dokunulan bağlantıdan kuruluyor, kullanıcı hiçbir şey yazmıyor.
   */
  | { kind: "referral"; code: string }
  /**
   * WEBDEN SATIN ALMA YÖNLENDİRMESİ (`/get/premium`). Web satmıyor; paywall'ı
   * uygulamaya yolluyor. Uygulama kuruluysa bu adres uygulamayı açıp doğrudan
   * paywall'a getiriyor, kurulu değilse sunucu mağazaya yönlendiriyor
   * (`src/app/get/[target]`). Satın alma hesaba yazıldığı için web de açılıyor.
   */
  | { kind: "paywall" }
  /**
   * GRUP KODU (`/g/<KOD>`) — "2 ay ücretsiz" kampanyası. Paywall açılıyor ve
   * "Grup kodu" alanı dolu geliyor; kullanıcı planını seçip Play denemesini
   * başlatıyor (lib/billing `purchaseGroupTrial`).
   *
   * YALNIZ ANDROID. iOS'ta uygulama kendi koduyla içerik açamaz (App Store
   * Guideline 3.1.1): iOS beyanı (AASA) `/g/`yi iddia etmiyor ve iPhone'da
   * bağlantı Safari'de açılıp Apple'ın teklif kodu sayfasına gidiyor. Bir
   * yolla iOS uygulamasına yine de ulaşırsa (başka bir uygulamanın açtığı
   * adres) tanınmıyor.
   */
  | { kind: "group"; code: string }
  | null;

/** Eski APK'ler exfe.me'ye bakıyor; ikisi de bizim (bkz. trustedOrigins). */
const HOSTS = new Set(["www.lernomi.app", "lernomi.app", "www.exfe.me", "exfe.me"]);

/**
 * Ana makine HAM adresten de denetleniyor. RN'in `URL`i düzenli ifadeyle
 * çalışıyor ve `https://saldirgan.com/@www.lernomi.app/…` adresinde ana
 * makineyi `www.lernomi.app` okuyor. Bağlantı yalnız doğrulanmış App Link
 * olarak gelmiyor: `MainActivity` dışa açık, telefondaki herhangi bir
 * uygulama ona açık bir `Intent` ile istediği adresi verebilir.
 */
const RAW_HOST = /^https:\/\/(?:www\.)?(?:lernomi\.app|exfe\.me)(?:[/?#]|$)/;

export function parseDeepLink(raw: string | null | undefined): DeepLinkAction {
  if (!raw || !RAW_HOST.test(raw)) return null;
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
    return ott ? { kind: "auth-handoff", token: ott, nonce: url.searchParams.get("n") } : null;
  }

  if (url.pathname.startsWith("/u/")) {
    /* Kullanıcı adı ÇÖZÜLÜYOR: bağlantı paylaşıldığında yüzde kodlanmış
       olabiliyor. Boşsa içeri alınmıyor - uygulama boş bir profil ekranı
       açmasın. */
    const username = decodeURIComponent(url.pathname.slice(3)).trim();
    /* DAVET İŞARETİ — web ile AYNI koşul (`components/telemetry`: `src=invite`
       ya da `invite` anahtarının varlığı). Paylaşım yüzeyleri işareti koyuyor;
       aynı adres bir bildirimden gelirse buradan geçmiyor (`lib/pushRoute`)
       ve davet sayılmıyor. */
    const invite = url.searchParams.get("src") === "invite" || url.searchParams.has("invite");
    return username ? { kind: "profile", username, invite } : null;
  }

  if (url.pathname.startsWith("/r/")) {
    /* Kod SUNUCUDAKİ ile aynı kurala göre sadeleştiriliyor
       (`lib/premium/referral` `normalizeReferral`): büyük harf, harf ve rakam
       dışı her şey atılıyor. Paylaşılan bağlantı yüzde kodlanmış gelebiliyor.
       Boş kalırsa içeri alınmıyor — uygulamayı açıp hiçbir şey yapmasın. */
    let ham = url.pathname.slice(3);
    /* `decodeURIComponent` BOZUK yüzde dizisinde fırlatıyor (`/r/%`) ve bu
       bağlantı DIŞARIDAN geliyor - `MainActivity` dışa açık, telefondaki
       herhangi bir uygulama istediği adresi verebilir. Sarmalanmazsa
       `parseDeepLink` fırlatır ve açılış kancası yarıda kalırdı. */
    try {
      ham = decodeURIComponent(ham);
    } catch {
      /* ham hâliyle devam */
    }
    const code = ham.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return code ? { kind: "referral", code } : null;
  }

  if (url.pathname.startsWith("/g/")) {
    if (Platform.OS !== "android") return null;
    /* Sadeleştirme sunucudakiyle aynı (`lib/premium/promo` `normalizeCode`):
       büyük harf, harf/rakam dışı atılır. Bozuk yüzde dizisi fırlatmasın
       (bkz. `/r/` dalı). */
    let ham = url.pathname.slice(3);
    try {
      ham = decodeURIComponent(ham);
    } catch {
      /* ham hâliyle devam */
    }
    const code = ham.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return code ? { kind: "group", code } : null;
  }

  if (url.pathname === "/get/premium") return { kind: "paywall" };

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
