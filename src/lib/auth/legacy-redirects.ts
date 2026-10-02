import { FALLBACK_HOST } from "../site";

/**
 * YEDEK ALAN ADINA giden YÖNLENDİRME adreslerini asıl alan adına sabitler.
 *
 * Mobil, asıl alan adını engelleyen ağlarda API'yi yedek adresten çağırıyor
 * (lib/site FALLBACK_ORIGIN) ve `callbackURL`'i o anki tabanla kuruyor;
 * e-postaya giden bağlantı ise her zaman asıl adreste olmalı (yedek yalnız API
 * trafiği için). İstek better-auth'a ulaşmadan, yedek alan adına giden her
 * yönlendirme adresi aynı yol ve sorguyla asıl alan adına çevriliyor; bağlantıya
 * tıklandığı an (GET, sorgu dizesi) da aynı çeviri yapılıyor.
 *
 * Eski alan adı (exfe.me) 2026-10-02'de buradan ve güvenilen kökenlerden çıktı
 * (bkz. lib/auth/server `trustedOrigins`): o adla gelen yönlendirme artık
 * çevrilmiyor, better-auth güvenilmeyen köken diye reddediyor. Sıfırlama
 * jetonunun o alan adına akma riski (güvenlik denetimi 2026-09-14) kökten kalktı.
 *
 * Saf modül: sunucuya özgü bağımlılık yok, test doğrudan çağırıyor.
 */

export const LEGACY_HOSTS: ReadonlySet<string> = new Set([FALLBACK_HOST]);

/** better-auth'un kullanıcı tarafından verilebilen yönlendirme alanları. */
export const REDIRECT_KEYS = ["callbackURL", "redirectTo", "errorCallbackURL", "newUserCallbackURL"] as const;

/** Adres yedek alan adındaysa aynı yolu asıl kökende döndürür; değilse null. */
export function pinLegacyUrl(value: string, canonicalOrigin: string): string | null {
  let u: URL;
  try {
    u = new URL(value);
  } catch {
    return null; // göreli yol ya da geçersiz: better-auth kendi denetimini yapar
  }
  if (!LEGACY_HOSTS.has(u.hostname.toLowerCase())) return null;
  return `${canonicalOrigin}${u.pathname}${u.search}${u.hash}`;
}

/** Nesnenin üst düzey yönlendirme alanlarını çevirir; değişiklik yoksa null. */
export function pinLegacyFields(body: Record<string, unknown>, canonicalOrigin: string): Record<string, unknown> | null {
  let changed = false;
  const out = { ...body };
  for (const key of REDIRECT_KEYS) {
    const v = out[key];
    if (typeof v !== "string") continue;
    const pinned = pinLegacyUrl(v, canonicalOrigin);
    if (pinned !== null) {
      out[key] = pinned;
      changed = true;
    }
  }
  return changed ? out : null;
}

/**
 * İsteğin sorgu dizesindeki ve JSON gövdesindeki yönlendirme adreslerini çevirir.
 *
 * Değişiklik yoksa AYNI istek nesnesi döner. Gövde yalnız JSON ise okunuyor;
 * form gövdesi (Apple'ın `form_post` geri dönüşü) olduğu gibi geçiyor.
 */
export async function pinLegacyRedirects(req: Request, canonicalOrigin: string): Promise<Request> {
  const url = new URL(req.url);
  let urlChanged = false;
  for (const key of REDIRECT_KEYS) {
    const v = url.searchParams.get(key);
    if (v === null) continue;
    const pinned = pinLegacyUrl(v, canonicalOrigin);
    if (pinned !== null) {
      url.searchParams.set(key, pinned);
      urlChanged = true;
    }
  }

  const isJson = (req.headers.get("content-type") ?? "").toLowerCase().includes("application/json");
  if (req.method === "GET" || req.method === "HEAD" || !isJson) {
    return urlChanged ? new Request(url, req) : req;
  }

  const raw = await req.text();
  let body = raw;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const pinned = pinLegacyFields(parsed as Record<string, unknown>, canonicalOrigin);
      if (pinned) body = JSON.stringify(pinned);
    }
  } catch {
    /* bozuk JSON: better-auth kendi hatasını versin, gövde aynen gidiyor */
  }
  // Gövde okundu: istek her durumda yeniden kuruluyor. Uzunluk başlığı eski
  // gövdeye ait olduğu için düşüyor; çalışma zamanı yenisini hesaplıyor.
  const headers = new Headers(req.headers);
  headers.delete("content-length");
  return new Request(url, { method: req.method, headers, body, signal: req.signal });
}
