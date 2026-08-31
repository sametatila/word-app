/**
 * Dokunsal, işitsel ve görsel anlık geri bildirim.
 *
 * Oyunlar cevabı aldığı anda `fx()` çağırır: telefon kısa bir titreşim verir,
 * ses efekti çalar ve arayüzde "cevabın alındı, sıradakine geçiliyor" çizgisi
 * başlar. Böylece kullanıcı seçiminin kaydedilip kaydedilmediğinden emin olur.
 *
 * Ses buraya, `vibrate()` içine bağlandı — on oyunun hepsi ve dersler cevabı
 * aldığı anda ya `vibrate()` ya da onu zaten çağıran `fx()` üzerinden geçiyor.
 * Tek geçit olması, on bir çağrı yerini tek tek dolaşmadan bütün uygulamayı
 * seslendirmeyi mümkün kıldı; `sfx` tarafındaki kısa yineleme penceresi de
 * ikisini birden çağıran oyunlarda sesin iki kez çıkmasını engelliyor.
 */

import { play } from "@/lib/sfx";

export type FxKind = "correct" | "wrong" | "tap";

export type FxDetail = { kind: FxKind; ms: number };

const EVENT = "nomi:fx";

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

/**
 * @param kind cevabın sonucu
 * @param ms   bir sonraki tura geçilene kadar geçecek süre (geçiş çizgisi bu sürede dolar)
 */
export function fx(kind: FxKind, ms = 0) {
  vibrate(kind);
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<FxDetail>(EVENT, { detail: { kind, ms } }));
}

export function onFx(handler: (detail: FxDetail) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<FxDetail>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
