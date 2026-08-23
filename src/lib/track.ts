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
 */
export function track(name: EventName, value = 0) {
  if (typeof window === "undefined") return;
  const d = new Date();
  const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  try {
    void fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, day, value }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ölçüm sessizce düşer */
  }
}
