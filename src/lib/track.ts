"use client";

import type { EventName } from "@/lib/events";

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

/** Kullanıcının analitik tercihi (Gizlilik Politikası §8). Cihazda; varsayılan açık. */
const ANALYTICS_KEY = "nomi:analytics";
export function analyticsEnabled(): boolean {
  try { return typeof window !== "undefined" && window.localStorage.getItem(ANALYTICS_KEY) !== "off"; } catch { return true; }
}
export function setAnalyticsEnabled(on: boolean): void {
  try { if (on) window.localStorage.removeItem(ANALYTICS_KEY); else window.localStorage.setItem(ANALYTICS_KEY, "off"); } catch { /* yut */ }
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
