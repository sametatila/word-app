/**
 * Uygulama denetimi — sunucu ile istemcilerin PAYLAŞTIĞI kısım (server-only değil).
 *
 * Panelden yönetilen üç karar tek yapılandırmada duruyor:
 *   1. ZORUNLU GÜNCELLEME: platform başına en düşük build. Altındaki uygulama
 *      açılışta güncelleme ekranında kalıyor (mağaza bağlantısıyla).
 *   2. ÖNERİLEN GÜNCELLEME: en son build. Altındaki uygulama kapatılabilir bir
 *      şerit gösteriyor.
 *   3. BAKIM MODU: açıkken web ve mobil bakım ekranı gösteriyor.
 * Mağaza bağlantıları da burada, çünkü web satın almayı uygulamaya
 * yönlendiriyor ve bağlantı yalnız uygulama o mağazada YAYINDAYKEN gösterilmeli
 * (yayında olmayan bir mağaza sayfasına yollamak kırık bağlantıdır).
 *
 * Aynı yapı `/api/config` ile istemcilere iniyor; ayrıştırıcı iki tarafta aynı.
 */

export type ClientPlatform = "ios" | "android";
export type Localized = { tr: string; en: string; de: string };

export type AppControl = {
  minBuild: Record<ClientPlatform, number>;
  latestBuild: Record<ClientPlatform, number>;
  store: Record<ClientPlatform, { live: boolean; url: string }>;
  maintenance: { enabled: boolean; message: Localized };
};

export const DEFAULT_APP_CONTROL: AppControl = {
  minBuild: { ios: 0, android: 0 },
  latestBuild: { ios: 0, android: 0 },
  store: {
    ios: { live: false, url: "https://apps.apple.com/app/id6810593275" },
    android: { live: false, url: "https://play.google.com/store/apps/details?id=com.lernomi.learn" },
  },
  maintenance: { enabled: false, message: { tr: "", en: "", de: "" } },
};

function int(v: unknown, fallback: number, min: number, max: number): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}
function text(v: unknown, fallback: string, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : fallback;
}
/** Yalnız bizim mağaza sayfalarımız: panelden rastgele bir adrese yönlendirme yazılamasın. */
function storeUrl(v: unknown, fallback: string): string {
  const s = text(v, "", 300);
  return /^https:\/\/(apps\.apple\.com|play\.google\.com)\//.test(s) ? s : fallback;
}

export function parseAppControl(raw: unknown): AppControl {
  const d = DEFAULT_APP_CONTROL;
  const o = (raw ?? {}) as Record<string, Record<string, unknown> | undefined>;
  const min = o.minBuild ?? {};
  const latest = o.latestBuild ?? {};
  const store = (o.store ?? {}) as Record<string, Record<string, unknown> | undefined>;
  const m = o.maintenance ?? {};
  const msg = (m.message ?? {}) as Record<string, unknown>;
  const minBuild = { ios: int(min.ios, 0, 0, 1_000_000), android: int(min.android, 0, 0, 1_000_000) };
  return {
    minBuild,
    /* En son build en düşükten küçük olamaz: öyle yazılırsa "önerilen" şeridi
       zorunlu ekranın altında anlamsızlaşır. */
    latestBuild: {
      ios: Math.max(minBuild.ios, int(latest.ios, 0, 0, 1_000_000)),
      android: Math.max(minBuild.android, int(latest.android, 0, 0, 1_000_000)),
    },
    store: {
      ios: { live: store.ios?.live === true, url: storeUrl(store.ios?.url, d.store.ios.url) },
      android: { live: store.android?.live === true, url: storeUrl(store.android?.url, d.store.android.url) },
    },
    maintenance: {
      enabled: m.enabled === true,
      message: { tr: text(msg.tr, "", 400), en: text(msg.en, "", 400), de: text(msg.de, "", 400) },
    },
  };
}

/** İstemcinin build'ine göre güncelleme kararı. build bilinmiyorsa (0) karar yok. */
export function updateVerdict(control: AppControl, platform: ClientPlatform, build: number): "required" | "suggested" | "none" {
  if (!build) return "none";
  if (build < control.minBuild[platform]) return "required";
  if (build < control.latestBuild[platform]) return "suggested";
  return "none";
}

/** `x-lernomi-client: android/1.0.3/14` başlığının adı ve ayrıştırıcısı. */
export const CLIENT_HEADER = "x-lernomi-client";

export function parseClientHeader(v: string | null | undefined): { platform: ClientPlatform; version: string; build: number } | null {
  if (!v) return null;
  const m = /^(ios|android)\/(\d{1,4}\.\d{1,4}\.\d{1,4})\/(\d{1,7})$/.exec(v.trim());
  if (!m) return null;
  return { platform: m[1] as ClientPlatform, version: m[2], build: Number(m[3]) };
}
