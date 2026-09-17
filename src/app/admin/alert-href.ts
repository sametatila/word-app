/**
 * Uyarı anahtarından ilgili panel sayfası — uyarı "nerede bakılır"ı da
 * söylesin. Anahtarlar `lib/alerts` `collectAlerts`te üretiliyor; yeni bir
 * kontrol ailesi eklenirse buraya da yazılmalı (yazılmazsa Sunucu'ya düşer).
 * Saf ve istemci/sunucu ortak: `test:admin` sınıyor.
 */
export function alertHref(key: string): string {
  if (/^(err|errspike):/.test(key)) return "/admin/errors";
  if (/^(err-review|reviews-api|vitals)/.test(key)) return "/admin/reviews";
  if (key === "reports") return "/admin/moderation";
  if (key === "maintenance" || key === "webhook") return "/admin/app";
  if (key === "mail") return "/admin/experience";
  return "/admin/ops";
}
