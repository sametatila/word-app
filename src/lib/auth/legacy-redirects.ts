/**
 * Eski alan adına (exfe.me) giden YÖNLENDİRME adreslerini asıl alan adına sabitler.
 *
 * `exfe.me` better-auth'un güvenilen kökenlerinde duruyor: 4 Eylül 2026 öncesi
 * APK'ler API'yi o adla çağırıyor ve `Origin` başlığına onu yazıyor. Origin
 * denetimi için bu güven zararsız; alan adı bir gün elden çıksa bile oturum
 * çerezleri `SameSite=Lax` ve CORS kapalı, başka bir siteden gelen istek
 * oturumlu çalışamaz.
 *
 * ZARARLI OLAN YÖNLENDİRME. Aynı liste `redirectTo` / `callbackURL`
 * denetiminde de kullanılıyor: parola sıfırlama isteğinde
 * `redirectTo=https://exfe.me/…` kabul ediliyor ve e-postadaki bağlantı jetonu
 * o adrese taşıyor. Alan adını ele geçiren biri kurbanın e-postasıyla
 * sıfırlama isteyip jetonu kendi sitesine akıtabilirdi (güvenlik denetimi
 * 2026-09-14, bilgi maddesi: eski exfe.me güvenilen kökeni).
 *
 * Çözüm güveni kaldırmak değil (eski uygulamaların girişi kırılırdı): istek
 * better-auth'a ulaşmadan, eski alan adına giden her yönlendirme adresi aynı
 * yol ve sorguyla asıl alan adına çevriliyor. Eski uygulamalar çalışmaya devam
 * ediyor; jeton hiçbir koşulda exfe.me'ye gitmiyor. Bağlantıya tıklandığı an
 * (GET, sorgu dizesi) da aynı çeviri yapılıyor, yani daha önce gönderilmiş
 * e-postalar da kapsanıyor.
 *
 * Saf modül: sunucuya özgü bağımlılık yok, test doğrudan çağırıyor.
 */

export const LEGACY_HOSTS: ReadonlySet<string> = new Set(["exfe.me", "www.exfe.me"]);

/** better-auth'un kullanıcı tarafından verilebilen yönlendirme alanları. */
export const REDIRECT_KEYS = ["callbackURL", "redirectTo", "errorCallbackURL", "newUserCallbackURL"] as const;

/** Adres eski alan adındaysa aynı yolu asıl kökende döndürür; değilse null. */
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
