import { api } from "../api/client";
import { analyticsMirror, setAnalyticsEnabled, setAnalyticsMirror } from "./track";

/**
 * Hesapta duran iki hukuki tercihi cihazla eşitler (hukuk denetimi 2026-09-23;
 * web `components/account-sync` ile aynı kurallar).
 *
 * 1. ANALİTİK (LEG-9). Asıl tercih `profiles.analytics_opt_out`; cihazdaki
 *    anahtar yalnız ayna (bkz. lib/track). Sunucu kapalı diyorsa ayna kapanır.
 *    Eski sürümde yalnız cihazda kapatılmışsa ("off") o seçim hesaba taşınır:
 *    kullanıcının verdiği kararı kaybetmek yerine kapalıyı korumak. Ayna
 *    "server" ama hesap açık diyorsa başka bir cihazdan ya da webden
 *    açılmıştır, ayna silinir.
 * 2. ŞARTLAR DEĞİŞTİ (LEG-11). Profilin kabul ettiği sürüm güncel değilse
 *    sunucu `termsUpdate: { version }` döndürüyor; kökteki not
 *    (`ui/TermsUpdateNotice`) bir kez gösteriyor, onay güncel sürümü hesaba
 *    yazıyor. Sürümü istemci söylemiyor, sunucu kendi güncelini yazıyor.
 *
 * Kaynak `GET /api/profile?prefs=1`: `/api/me` ile aynı iki alan, ilerleme
 * hesabı olmadan. Eski sunucu bu alanları döndürmüyorsa hiçbir şey olmuyor.
 */
export type TermsUpdate = { version: string } | null;

let terms: TermsUpdate = null;
const listeners = new Set<() => void>();
function emit(): void { for (const l of listeners) l(); }

export function subscribeTerms(l: () => void): () => void {
  listeners.add(l);
  return () => { listeners.delete(l); };
}
export function currentTermsUpdate(): TermsUpdate { return terms; }

/** Analitik aynasını sunucu değerine göre düzeltir (bkz. 1). */
export async function syncAnalytics(serverOptOut: boolean): Promise<void> {
  const m = analyticsMirror();
  if (serverOptOut) { if (m !== "server") await setAnalyticsMirror("server"); }
  else if (m === "off") await setAnalyticsEnabled(false);
  else if (m === "server") await setAnalyticsMirror(null);
}

/** Oturum açıldığında (ve hesap değişince) çağrılır; hata yutulur. */
export async function syncAccountPrefs(): Promise<void> {
  try {
    const p = await api<{ analyticsOptOut?: unknown; termsUpdate?: unknown }>("/api/profile?prefs=1");
    if (typeof p?.analyticsOptOut === "boolean") await syncAnalytics(p.analyticsOptOut);
    const tu = p?.termsUpdate as { version?: unknown } | null | undefined;
    terms = tu && typeof tu.version === "string" ? { version: tu.version } : null;
    emit();
  } catch {
    /* ağ yok ya da eski sunucu: bir sonraki açılışta yeniden */
  }
}

/** Çıkışta: bir önceki hesabın notu yeni hesaba taşınmasın. */
export function clearTermsUpdate(): void {
  if (!terms) return;
  terms = null;
  emit();
}

/**
 * "Anladım": güncel sürümü hesaba yazar. İstek düşerse not yine kapanıyor
 * ama sürüm yazılmadığı için bir sonraki açılışta tekrar çıkıyor: kayıt
 * olmadan "kabul" sayılmıyor (web ile aynı).
 */
export async function acceptTerms(): Promise<void> {
  terms = null;
  emit();
  try {
    await api("/api/profile", { method: "POST", body: JSON.stringify({ acceptTerms: true }) });
  } catch {
    /* bir sonraki açılışta yeniden sorulur */
  }
}
