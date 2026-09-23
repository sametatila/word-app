"use client";

import type { EventName } from "@/lib/events";
import { apiFetch } from "@/lib/api-fetch";

/**
 * İstemci tarafı olay göndericisi.
 *
 * Üç kural:
 *   - **Hiçbir zaman beklenmez.** Ölçüm kullanıcının önüne geçmemeli; çağıran
 *     taraf `await` etmiyor ve hata da yakalanıyor.
 *   - **`keepalive`.** Olayların yarısı sayfadan ayrılırken atılıyor
 *     ("şimdilik yeter", sekme değişimi); normal bir `fetch` o anda iptal
 *     edilir ve tam da en çok merak edilen olaylar kaybolurdu.
 *   - **Yerel gün.** Sunucunun UTC günü, gece çalışan kullanıcıyı ertesi güne
 *     yazardı — uygulamanın geri kalanı da yerel günle çalışıyor.
 *
 * `kind` isteğe bağlı kısa etiket (oyun adı, hata tipi, "level:B1"); serbest
 * metin değil — sunucu biçimi doğrular, uymayanı düşürür (bkz. lib/events.ts).
 */
/**
 * Ekran açılışı başına bir kez yazılan olaylar (tts_play, search): aynı
 * ekranda onuncu dinleme onuncu satır olmasın. Küme ekran değişince
 * sıfırlanır (bkz. components/telemetry.tsx).
 */
const once = new Set<string>();

/**
 * Kullanıcının analitik tercihi (Gizlilik Politikası §8).
 *
 * TERCİHİN ASLI HESAPTA (`profiles.analytics_opt_out`, hukuk denetimi LEG-9):
 * sunucu kapalı hesabın ürün olaylarını zaten yazmıyor. Buradaki anahtar
 * yalnız bir AYNA — kapalıyken isteğin hiç çıkmaması için — ve ölçüm değil
 * tercih saklıyor. Değerler:
 *   yok       açık
 *   "server"  kapalı, hesap da biliyor (sunucuyla eşit)
 *   "off"     kapalı ama hesaba henüz yazılamadı (eski sürümün yerel seçimi ya
 *             da başarısız istek) — `AccountSync` bir sonraki açılışta taşır
 */
const ANALYTICS_KEY = "lernomi:analytics";
export function analyticsEnabled(): boolean {
  try { return typeof window !== "undefined" && window.localStorage.getItem(ANALYTICS_KEY) === null; } catch { return true; }
}
/** Yerel aynanın ham değeri (bkz. yukarı). */
export function analyticsMirror(): "server" | "off" | null {
  try {
    const v = window.localStorage.getItem(ANALYTICS_KEY);
    return v === null ? null : v === "server" ? "server" : "off";
  } catch { return null; }
}
export function setAnalyticsMirror(v: "server" | "off" | null): void {
  try { if (v === null) window.localStorage.removeItem(ANALYTICS_KEY); else window.localStorage.setItem(ANALYTICS_KEY, v); } catch { /* yut */ }
}
/** Tercihi hesaba yazar, aynayı sonuca göre günceller. */
export async function setAnalyticsEnabled(on: boolean): Promise<boolean> {
  setAnalyticsMirror(on ? null : "off");
  try {
    const res = await apiFetch("/api/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ analyticsOptOut: !on }),
    });
    if (res.ok && !on) setAnalyticsMirror("server");
    return res.ok;
  } catch {
    return false;
  }
}

export function resetOnce() {
  once.clear();
}

export function trackOnce(name: EventName, value = 0, kind?: string) {
  const key = `${name}:${kind ?? ""}`;
  if (once.has(key)) return;
  once.add(key);
  track(name, value, kind);
}

export function track(name: EventName, value = 0, kind?: string) {
  if (typeof window === "undefined") return;
  if (!analyticsEnabled()) return; // kullanıcı kapattı: hiçbir olay gitmez
  const d = new Date();
  const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  try {
    void fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, day, value, kind }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ölçüm sessizce düşer */
  }
}
