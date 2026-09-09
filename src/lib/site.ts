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
