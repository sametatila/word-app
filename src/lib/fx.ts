/**
 * Dokunsal, işitsel ve görsel anlık geri bildirim.
 *
 * Oyunlar cevabı aldığı anda `vibrate()` çağırır: telefon kısa bir titreşim
 * verir ve ses efekti çalar. Böylece kullanıcı seçiminin kaydedildiğinden emin
 * olur.
 *
 * Üçüncü bir geri bildirim daha vardı: ekranın üstünde, bekleme süresi
 * boyunca dolan ince bir çizgi. Turlar kendiliğinden ilerlerken işi vardı —
 * "seçimin alındı, sıradakine geçiliyor" diyordu. Turu artık öğrenci
 * "Devam" ile kapatıyor, yani beklenen bir süre yok: çizgi cevapla birlikte
 * doluyor ve kimse ona bakmadan kayboluyordu. Çizgiyle birlikte onu besleyen
 * olay ve sesin uzunluğunu ölçen zincir de kalktı.
 *
 * Ses buraya, `vibrate()` içine bağlandı — on oyunun hepsi ve dersler cevabı
 * aldığı anda buradan geçiyor. Tek geçit olması, on bir çağrı yerini tek tek
 * dolaşmadan bütün uygulamayı seslendirmeyi mümkün kıldı. Çizgiyi başlatan
 * ikinci bir sarmalayıcı (`fx`) daha vardı; çizgi kalkınca o da kalktı ve
 * bazı oyunlarda ikisi birden çağrıldığı için gereken yineleme koruması
 * (`sfx` içindeki kısa pencere) artık yalnız emniyet payı.
 */

import { play } from "@/lib/sfx";

export type FxKind = "correct" | "wrong" | "tap";

/** Titreşim desenleri — kısa tutulur, rahatsız etmemeli. */
const PATTERN: Record<FxKind, number | number[]> = {
  correct: 18,
  wrong: [0, 34, 60, 34],
  tap: 8,
};

export function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function vibrate(kind: FxKind) {
  // Ses önce: titreşim API'si bazı tarayıcılarda sessizce reddediliyor ve
  // erken dönüş sesi de yutardı. Masaüstünde titreşim hiç yok — geri
  // bildirimin tek kaldığı yer burası.
  play(kind);
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  try {
    navigator.vibrate(PATTERN[kind]);
  } catch {
    /* tarayıcı izin vermeyebilir */
  }
}
