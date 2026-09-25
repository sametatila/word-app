/**
 * Kota kararının TEK SATIRLIK METNİ — hangi sözlük anahtarı, hangi sayı.
 *
 * Karar sunucuda (`access.ts`), cümle burada; mobil karşılığı
 * `mobile/src/lib/premium.ts` `gateNote`. Premium'da not yok (adil kullanım
 * tavanına çarpılmadıkça): hakkını saymak ödeme yapmış kullanıcıya söylenecek
 * bir şey değil.
 */
export type GateLike = {
  allowed: boolean;
  reason: string;
  quota?: { remaining: number; limit: number; period: "day" | "week" | "all" };
};

export function gateNote(g: GateLike | null | undefined): { key: string; n: number } | null {
  if (!g) return null;
  if (g.reason === "premium") return null;
  if (g.reason === "fair_use") return { key: "gate.fair_use", n: g.quota?.limit ?? 0 };
  /* Haftalık yenilenen hak 2026-09-25'te kalktı: ücretsiz hak ömürlük ve
     seviye başına, "bitir + 7 günlük seri" ile büyüyor. */
  if (!g.allowed) return { key: "gate.quota_spent_total", n: 0 };
  if (!g.quota) return null;
  return { key: g.quota.period === "day" ? "gate.quota_left_day" : "gate.quota_left_total", n: g.quota.remaining };
}
