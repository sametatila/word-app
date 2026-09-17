/**
 * Haftalık karşılaştırmanın istemciyle PAYLAŞILAN kısmı (tip + değişim hesabı).
 * Sorgu `admin-trends.ts`te (server-only).
 */
export type TrendMetric = { key: string; label: string; current: number; previous: number; good: "up" | "down"; unit?: "pct" | "min" };

/** Değişim metni ve yönü. Saf — test edilebilir. Küçük tabanda yüzde değil fark. */
export function trendDelta(m: Pick<TrendMetric, "current" | "previous" | "good" | "unit">): { text: string; tone: "good" | "bad" | "flat" } {
  const diff = m.current - m.previous;
  if (diff === 0) return { text: "=", tone: "flat" };
  const better = m.good === "up" ? diff > 0 : diff < 0;
  const tone = better ? "good" : "bad";
  const sign = diff > 0 ? "+" : "−";
  if (m.unit === "pct") return { text: `${sign}${Math.abs(diff)} puan`, tone };
  if (m.previous < 20) return { text: `${sign}${Math.abs(diff)}`, tone };
  return { text: `${sign}%${Math.round((Math.abs(diff) / m.previous) * 100)}`, tone };
}
