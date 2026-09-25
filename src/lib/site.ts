/**
 * Sitenin mutlak kök adresi — TEK KAYNAK.
 *
 * Üç yer buna ihtiyaç duyuyor ve üçü de MUTLAK adres istiyor: `metadataBase`
 * (og:image göreli yol kabul etmiyor), `robots.txt` (sitemap satırı) ve
 * `sitemap.xml` (her girdi mutlak). Üçü ayrı ayrı okusaydı biri değişince
 * ötekiler sessizce eski adresi göstermeye devam ederdi.
 *
 * Sıra: açıkça verilen adres → uygulamanın kök adresi → üretim adresi.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.BETTER_AUTH_URL || "https://www.lernomi.app";

/**
 * Uygulamanın asıl kökeni: e-posta bağlantıları, OAuth geri dönüşleri,
 * paylaşım ve davet adresleri HEP burada.
 */
export const PRIMARY_ORIGIN = "https://www.lernomi.app";

/**
 * YEDEK KÖKEN — aynı Next uygulaması, aynı sunucu, ikinci alan adı.
 *
 * Bazı kurum ağları (ör. TU Dortmund Wi-Fi) www.lernomi.app'e giden bağlantıyı
 * SNI'ya bakıp sıfırlıyor: alan adı 2026-09-04'te kaydedildi ve "yeni alan
 * adı" filtresine takılıyor. rumpuskit.com daha eski (2026-07-02). Mobil
 * uygulama asıl adrese ağ hatası alıp internetin açık olduğunu görünce bu
 * adrese geçiyor (bkz. mobile/src/api/base.ts).
 *
 * YALNIZ MOBİL API TRAFİĞİ İÇİN. `BETTER_AUTH_URL` asıl adreste kalıyor;
 * bu adrese giden yönlendirme adresleri (redirectTo, callbackURL) asıl
 * adrese sabitleniyor (lib/auth/legacy-redirects), arama motorlarına da
 * `noindex` gidiyor (next.config.ts).
 */
export const FALLBACK_ORIGIN = "https://lernomi.rumpuskit.com";
export const FALLBACK_HOST = new URL(FALLBACK_ORIGIN).host;
