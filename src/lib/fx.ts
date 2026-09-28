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
 * Ses buraya, `vibrate()` içine bağlandı — on oyunun hepsi ve konuşmalar cevabı
 * aldığı anda buradan geçiyor. Tek geçit olması, on bir çağrı yerini tek tek
 * dolaşmadan bütün uygulamayı seslendirmeyi mümkün kıldı. Çizgiyi başlatan
 * ikinci bir sarmalayıcı (`fx`) daha vardı; çizgi kalkınca o da kalktı ve
 * bazı oyunlarda ikisi birden çağrıldığı için gereken yineleme koruması
 * (`sfx` içindeki kısa pencere) artık yalnız emniyet payı.
 */

import { play } from "@/lib/sfx";

export type FxKind = "correct" | "wrong" | "tap" | "near" | "streak";

/** Titreşim desenleri — kısa tutulur, rahatsız etmemeli. */
const PATTERN: Record<FxKind, number | number[]> = {
  correct: 18,
  wrong: [0, 34, 60, 34],
  tap: 8,
  // Neredeyse: doğrudan hafif — kabul edildi ama kusurlu (mobil `haptic("near")`).
  near: 12,
  // Seri anı: iki kısa darbe, kutlama ama rahatsız etmeyecek kadar kısa.
  streak: [0, 20, 40, 30],
};

export function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/*
 * TİTREŞİM AYRI BİR TERCİH. Önce ses ve titreşim tek anahtara bağlıydı:
 * titreşimi rahatsız edici bulan sesi de kaybediyordu, ya da tersi. Tercih
 * cihazda (ses gibi, `lib/sfx` `lernomi-sound`), varsayılan AÇIK; yalnız
 * kapatılınca yazılıyor. Mobil karşılığı ayarlardaki "Titreşim" satırı
 * (`snd.haptics`).
 */
const HAPTICS_KEY = "lernomi-haptics";
let haptics: boolean | null = null;

/** Tarayıcı titreşimi destekliyor mu (masaüstü ve iOS Safari: hayır). */
export function canVibrate(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

export function hapticsEnabled(): boolean {
  if (haptics !== null) return haptics;
  try {
    haptics = localStorage.getItem(HAPTICS_KEY) !== "off";
  } catch {
    haptics = true;
  }
  return haptics;
}

export function setHapticsEnabled(next: boolean) {
  haptics = next;
  try {
    if (next) localStorage.removeItem(HAPTICS_KEY);
    else localStorage.setItem(HAPTICS_KEY, "off");
  } catch {
    /* depolama kapalıysa tercih yalnızca bu oturum boyunca geçerli olur */
  }
}

export function vibrate(kind: FxKind) {
  // Ses önce: titreşim API'si bazı tarayıcılarda sessizce reddediliyor ve
  // erken dönüş sesi de yutardı. Masaüstünde titreşim hiç yok — geri
  // bildirimin tek kaldığı yer burası.
  play(kind);
  buzz(PATTERN[kind]);
}

/**
 * Yalnız titreşim, sessiz — tercihe bağlı. Kendi sesini ayrıca çalan yerler
 * (lig atlama `unlock`) ve anahtarın önizlemesi bunu kullanıyor;
 * `navigator.vibrate` doğrudan çağrılmıyor, yoksa tercih atlanır.
 */
export function buzz(pattern: number | number[]) {
  if (!canVibrate() || !hapticsEnabled()) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* tarayıcı izin vermeyebilir */
  }
}
