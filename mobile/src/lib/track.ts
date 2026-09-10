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
  | "onboarding_existing_account"
  | "first_practice"
  | "notif_prime"
  | "nav"
  | "paywall_view"
  | "premium_gate"
  | "purchase_start"
  | "purchase_done"
  /* Modul patronu - web `lib/events` ile ayni adlar: `boss_play` degeri modul
     sirasi, `boss_clear` degeri kalan saniye. */
  /* Yürüyüş NASIL bitti (value = sebep kodu, web `lib/events` ile aynı tablo):
     1 kullanıcı "hayır" dedi · 2 tur kalmadı · 3 duyulmama sınırı aşıldı
     6 elle duraklatıldı / çıkıldı. 4 (mikrofona ulaşılamadı) ve 5 (ekran
     kapandı, kayıt yolu yok) webin tarayıcı yollarına özgü. */
  | "walk_end"
  /* Hangi ayar değişti (web `lib/events` ile aynı kind tablosu):
     name · daily_goal · new_per_day · level · course · voice · theme · lang ·
     remind_daily · remind_streak · remind_weekly. Sayısal ayarlarda value yeni
     değer, anahtarlarda 1 açık / 0 kapalı, temada 0 açık / 1 koyu / 2 sistem. */
  | "setting_change"
  /* Ders (patika konuşması) - web `lib/events` ile aynı dilbilgisi:
     `lesson_start` value 1 kaldığı yerden / 0 baştan, kind ders kimliği;
     `lesson_step` kind "adım:yol" (repeat|produce|truefalse : mic|typed|tap),
     value 2 ilk denemede doğru / 1 sonraki denemede doğru / 0 geçilemedi;
     `lesson_finish` value puanlanan adımlarda doğru yüzdesi, kind ders kimliği. */
  | "lesson_start"
  | "lesson_step"
  | "lesson_finish"
  | "boss_play"
  | "boss_clear"
  /* Görev ödülü alındı (value = kazanılan XP) — web `lib/events` ile aynı ad.
     Mobil ödülü alabilir hâle gelene kadar bu adın karşılığı yoktu. */
  | "quest_claim"
  /* Rozet acildi (value = rozet sayisi) - web `lib/events` ile ayni ad.
     Mobilde kutlama olmadigi surece bu adin karsiligi da yoktu. */
  | "achievement_unlock"
  /* Yarim kalan turdan DEVAM (value = kacinci turdan) - web `session-player`
     ile ayni ad. Mobil yalniz `session_start` yaziyordu, yani "bastan mi
     basladi, devam mi etti" sorusu Androidde hic cevaplanmiyordu. */
  | "session_resume"
  /* Ilk pratik BITTI (value = kelime sayisi). Mobil her kelimede
     `first_practice` yaziyordu ama tamamlanmayi hic yazmiyordu - huni
     adiminin kendisi olculmuyordu. */
  | "first_practice_done"
  /* Yerlestirme sonucu uygulandi (value = yuzde, kind = "demo:a1" gibi). */
  | "placement_finish"
  /* Rol yapma denemesi (value = ozet puani, kind = "roleplay"). */
  | "production_attempt"
  /* Tur YARIDA birakildi (value = kacinci turda) - web `session-player` ile
     ayni ad. "Kac kisi turu bitirmeden cikiyor ve nerede cikiyor" sorusu
     Androidde hic cevaplanmiyordu; `session_done` yalnizca bitirenleri
     sayiyor. */
  | "session_stop"
  /* Sinav/test BASLADI (kind = "placement:A1" gibi). Web yerlestirme testi
     baslarken yaziyor; mobil yalniz BITISI yaziyordu, yani "kac kisi
     baslayip birakti" hesaplanamiyordu - huninin payi eksikti. */
  | "exam_start";

/** Analitik tercihi (Gizlilik Politikası §8) — cihazda, varsayılan açık; açılışta yüklenir. */
const ANALYTICS_KEY = "lernomi:analytics";
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
