/**
 * UYARININ ADRESİ — her uyarı ve bilgilendirme "nereye bakılır"ı URL ile söylüyor.
 *
 * Telegram'a düşen "Zamanlanmış iş 30 saattir koşmadı" satırı eskiden yalnız
 * panelin ana sayfasına bağlanıyordu; panelde de "Sunucu › İstek sağlığı"
 * gibi metinle tarif ediliyordu. Okuyan kişi doğru sayfayı ve bölümü kendisi
 * bulmak zorundaydı, telefonda bu çoğu zaman "sonra bakarım" demekti.
 *
 * Artık her uyarı anahtarı (`lib/alerts` `collectAlerts`) buradan bir panel
 * yolu (bölüm çapasıyla) ve gerekiyorsa dış konsol adresi alıyor. Aynı tablo
 * panelin Genel durum listesini, Telegram mesajını ve `test:admin`i besliyor.
 * Yeni bir kontrol ailesi eklenirse buraya da yazılmalı; yazılmazsa Sunucu
 * sayfasına düşer (kaybolmaz ama isabetsiz olur).
 *
 * SAF ve istemci/sunucu ortak: mutlak adres için kökü çağıran veriyor
 * (sunucuda `SITE_URL`, panelde göreli yol yeterli).
 */

export type PanelLink = { path: string; label: string };
export type AlertLinks = { panel: PanelLink; external?: { url: string; label: string } };

/** Dış konsollar — panelin göremediği ya da cevabın orada verildiği yerler. */
export const EXTERNAL = {
  appStoreReviews: "https://appstoreconnect.apple.com/apps/6810593275/distribution/activity/ios/ratingsResponses",
  playReviews: "https://play.google.com/console/developers/app/user-feedback/reviews",
  playVitals: "https://play.google.com/console/developers/app/vitals/crashes",
} as const;

/** Uygulama içi sayfalar — admin hesabının kendi ayarları. */
export const APP_LINKS = {
  /** İki adımlı doğrulama `LinkedAccounts` › "Güvenlik" grubunda (`id="accounts"`). */
  security: { path: "/profile/settings/security", label: "Ayarlar › Güvenlik" },
  privacy: { path: "/privacy", label: "Gizlilik politikası" },
} as const;

const ops = (hash: string, section: string): PanelLink => ({ path: `/admin/ops#${hash}`, label: `Sistem › Sunucu › ${section}` });

export function alertLinks(key: string): AlertLinks {
  const [family, ...rest] = key.split(":");
  const tail = rest.join(":");
  switch (family) {
    case "cron":
    case "cronfail":
      return { panel: ops("zamanlanmis-isler", "Zamanlanmış işler") };
    case "backup":
    case "cert":
    case "unit":
      return { panel: ops("yedek", "Yedek ve işletim") };
    case "disk":
    case "mem":
      return { panel: ops("kaynak", "Kaynak kullanımı") };
    case "instances":
      return { panel: ops("deploy", "Uygulama ve deploy") };
    case "pgconn":
      return { panel: ops("veritabani", "PostgreSQL") };
    case "http5xx":
      return { panel: ops("istek-sagligi", "İstek sağlığı") };
    case "ai":
    case "ai-down":
    case "azure":
      return { panel: ops("yapay-zeka", "Yapay zekâ sağlığı") };
    case "budget":
      return { panel: ops("yapay-zeka-butce", "Yapay zekâ bütçesi") };
    case "maintenance":
      return { panel: { path: "/admin/app#bakim", label: "Sistem › Uygulama › Bakım modu" } };
    case "webhook":
      return { panel: { path: "/admin/revenue", label: "Gelir › Gelir ve huniler" } };
    case "reports":
      return { panel: { path: "/admin/moderation", label: "Bugün › Şikâyetler" } };
    case "sla-late":
    case "sla-soon": {
      if (tail === "content_feedback") return { panel: { path: "/admin/moderation/content", label: "Bugün › İçerik geri bildirimi" } };
      if (tail === "store_review") {
        return {
          panel: { path: "/admin/reviews#yorumlar", label: "Sistem › Mağaza › Yorumlar" },
          external: { url: EXTERNAL.playReviews, label: "Play Console'da cevapla (App Store: App Store Connect)" },
        };
      }
      return { panel: { path: "/admin/moderation", label: "Bugün › Şikâyetler" } };
    }
    case "err-reportnew":
      return { panel: { path: "/admin/moderation/content", label: "Bugün › İçerik geri bildirimi" } };
    case "err-reporthot":
      return { panel: { path: `/admin/moderation/content/group?g=${encodeURIComponent(tail)}`, label: "Bugün › İçerik geri bildirimi (bu hedef)" } };
    case "push":
      return { panel: { path: "/admin/experience#bildirimler", label: "Kullanıcılar › Deneyim › Bildirimler" } };
    case "content":
      return { panel: { path: "/admin/content", label: "İçerik" } };
    case "err-route":
      return rest[0] === "webhook"
        ? { panel: { path: "/admin/revenue", label: "Gelir › Gelir ve huniler" } }
        : { panel: ops("istek-sagligi", "İstek sağlığı") };
    case "mail":
    case "err-mailverify":
      return { panel: { path: "/admin/experience#e-posta", label: "Kullanıcılar › Deneyim › Giden e-posta" } };
    case "err":
    case "errspike":
      return {
        panel: { path: `/admin/errors?grup=${encodeURIComponent(tail)}#grup-${encodeURIComponent(tail)}`, label: "Sistem › Hatalar (bu grup)" },
        /* Crashlytics uygulamadan çıkarıldı (2026-09-23): Android'in native
           çökmeleri artık yalnız Play Console › Android vitals'ta. */
        external: { url: EXTERNAL.playVitals, label: "Android native çökmeler: Play vitals" },
      };
    case "err-review":
    case "reviews-api": {
      const store = rest[0];
      return {
        panel: { path: "/admin/reviews#yorumlar", label: "Sistem › Mağaza › Yorumlar" },
        external: store === "ios" ? { url: EXTERNAL.appStoreReviews, label: "App Store Connect'te cevapla" } : { url: EXTERNAL.playReviews, label: "Play Console'da cevapla" },
      };
    }
    case "vitals":
    case "vitals-api":
      return {
        panel: { path: "/admin/reviews#vitals", label: "Sistem › Mağaza › Android kalite" },
        external: { url: EXTERNAL.playVitals, label: "Play Console › Android vitals" },
      };
    default:
      return { panel: { path: "/admin/ops", label: "Sistem › Sunucu" } };
  }
}

/** Kök + yol → mutlak adres (Telegram, e-posta). */
export function absolute(origin: string, path: string): string {
  return `${origin.replace(/\/+$/, "")}${path}`;
}
