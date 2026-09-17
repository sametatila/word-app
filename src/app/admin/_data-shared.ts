/**
 * TARİH ARALIĞI — `?aralik=7|30|90`, varsayılan 30.
 *
 * Panelin bütün pencereli metrikleri sabit 30 gündü: bir değişikliğin son
 * haftadaki etkisi ya da çeyreklik eğilim okunamıyordu. Serbest tarih yerine
 * üç sabit aralık: önbellek anahtarı sınırlı kalıyor ve 90 günden uzun
 * taramalar olay tablosunu gereksiz yere yormuyor.
 */
export const PANEL_RANGES = [7, 30, 90] as const;
export type PanelRange = (typeof PANEL_RANGES)[number];
export function parseRange(v: string | undefined): PanelRange {
  const n = Number(v);
  return (PANEL_RANGES as readonly number[]).includes(n) ? (n as PanelRange) : 30;
}
