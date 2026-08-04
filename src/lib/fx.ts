/**
 * Dokunsal ve görsel anlık geri bildirim.
 *
 * Oyunlar cevabı aldığı anda `fx()` çağırır: telefon kısa bir titreşim verir ve
 * arayüzde "cevabın alındı, sıradakine geçiliyor" çizgisi başlar. Böylece
 * kullanıcı seçiminin kaydedilip kaydedilmediğinden emin olur.
 */

export type FxKind = "correct" | "wrong" | "tap";

export type FxDetail = { kind: FxKind; ms: number };

const EVENT = "wortspiel:fx";

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
