import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../api/client";

/**
 * Mobil olay göndericisi (§4 funnel ölçümü) — web'deki lib/track ile aynı
 * sözleşme, aynı uç (/api/events). Kurallar:
 *   - Hiçbir zaman beklenmez (ölçüm kullanıcının önüne geçmez), hata yutulur.
 *   - Yerel gün gönderilir (sunucunun UTC günü gece çalışanı yanlış güne yazar).
 *   - Ad kapalı listeden (sunucu doğrular, uymayanı düşürür).
 * Oturum yoksa sunucu 204 döner (olay düşer) — çerezle authed'de kaydolur.
 * Ad geçerliliği için web EVENT_NAMES ile uyumlu adlar kullanılmalı.
 */
export type EventName =
  | "app_open"
  | "session_start"
  | "session_done"
  | "walk_start"
  | "share"
  | "onboarding_step"
  | "first_practice"
  | "notif_prime"
  | "nav"
  | "paywall_view"
  | "premium_gate"
  | "purchase_start"
  | "purchase_done";

/** Analitik tercihi (Gizlilik Politikası §8) — cihazda, varsayılan açık; açılışta yüklenir. */
const ANALYTICS_KEY = "nomi:analytics";
let analyticsOn = true;
export async function loadAnalyticsPref(): Promise<boolean> {
  try { analyticsOn = (await AsyncStorage.getItem(ANALYTICS_KEY)) !== "off"; } catch { analyticsOn = true; }
  return analyticsOn;
}
export function analyticsEnabled(): boolean { return analyticsOn; }
export async function setAnalyticsEnabled(on: boolean): Promise<void> {
  analyticsOn = on;
  try { if (on) await AsyncStorage.removeItem(ANALYTICS_KEY); else await AsyncStorage.setItem(ANALYTICS_KEY, "off"); } catch { /* yut */ }
}

export function track(name: EventName, value = 0, kind?: string): void {
  if (!analyticsOn) return; // kullanıcı kapattı: hiçbir olay gitmez
  const d = new Date();
  const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  try {
    void fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, day, value, kind }),
    }).catch(() => {});
  } catch {
    /* ölçüm sessizce düşer */
  }
}
