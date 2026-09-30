/**
 * Kaydırıcı hesabı (`ui/Slider`) — saf, test edilebilir.
 *
 * TUTAMAÇ MERKEZİ `THUMB/2 … genişlik - THUMB/2` arasında yürüyor: uçta
 * tutamaç izden taşmasın diye. Parmak konumu değere de AYNI eksenle
 * çevriliyor; eskiden değer `x / genişlik` ile hesaplanıyordu, tutamaç ise
 * kırpılarak çiziliyordu ve ikisi uçlara doğru 11 piksele kadar ayrışıyordu.
 * Web `.range` tarayıcının kendi tutamacı ve aynı ekseni kullanıyor.
 */
export const THUMB = 22;

/** Değeri adım ızgarasına ve sınırlara oturtur (`min`den başlayan ızgara). */
export function snapValue(v: number, min: number, max: number, step: number): number {
  if (!Number.isFinite(v)) return min;
  const s = step > 0 ? step : 1;
  const n = min + Math.round((v - min) / s) * s;
  /* Kayan nokta artığı (0.1 + 0.2) ekranda "0.30000000000000004" yazmasın. */
  const r = Math.round(n * 1e6) / 1e6;
  return Math.min(max, Math.max(min, r));
}

/** 0..1 — tutamacın izdeki yeri. */
export function sliderFraction(v: number, min: number, max: number): number {
  if (!(max > min)) return 0;
  return Math.min(1, Math.max(0, (v - min) / (max - min)));
}

/** İz içindeki x (px) → ızgaraya oturmuş değer. Genişlik ölçülmediyse `null`. */
export function valueAt(x: number, width: number, min: number, max: number, step: number): number | null {
  const yol = width - THUMB;
  if (!(yol > 0)) return null;
  const t = Math.min(1, Math.max(0, (x - THUMB / 2) / yol));
  return snapValue(min + t * (max - min), min, max, step);
}
