import "server-only";
import { createHash } from "node:crypto";

/**
 * İçerik uçlarının ortak HTTP davranışı: ETag ve sıkıştırma seçimi.
 *
 * Trafiğin büyük kısmı "hiçbir şey değişmedi" cevabı olacak — uygulama her
 * açılışta göstergeye bakıyor, çoğu gün içerik aynı. O cevabın gövdesiz
 * dönmesi (304) bu hattın en çok tekrarlanan tasarrufu: birkaç yüz bayt
 * yerine yalnız başlıklar.
 */

/** Değişebilen cevaplar: gövdenin kendisinden ETag üretip 304 dönebiliyor. */
export function jsonWithEtag(req: Request, payload: unknown, maxAgeSeconds: number): Response {
  const text = JSON.stringify(payload);
  const etag = `"${createHash("sha256").update(text).digest("hex").slice(0, 24)}"`;
  const headers: Record<string, string> = {
    etag,
    "content-type": "application/json; charset=utf-8",
    "cache-control": `public, max-age=${maxAgeSeconds}`,
  };
  if (req.headers.get("if-none-match") === etag) return new Response(null, { status: 304, headers });
  return new Response(text, { status: 200, headers });
}

/**
 * İstemcinin çözebildiği sıkıştırma.
 *
 * Brotli %23 daha küçük ama Android'in ağ katmanı yalnız gzip'i
 * KENDİLİĞİNDEN açıyor; brotli'yi istemci açıkça bildirmedikçe göndermek,
 * uygulamanın eline çözülmemiş baytları vermek olurdu. Bildirim yoksa gzip:
 * evrensel ve zaten saklı, istek anında sıkıştırma yapılmıyor.
 */
export function pickEncoding(req: Request): "br" | "gzip" {
  const accepts = req.headers.get("accept-encoding") ?? "";
  return /\bbr\b/i.test(accepts) ? "br" : "gzip";
}
