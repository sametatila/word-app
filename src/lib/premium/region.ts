import "server-only";
import type { PlanPrice } from "./gates";

/**
 * Ziyaretçinin fiyat bölgesi — KONUM İZNİ İSTEMEDEN.
 *
 * Tarayıcının konum API'si hiç çağrılmıyor ve IP üçüncü bir servise
 * gönderilmiyor: ikisi de kullanıcıdan bir şey ister ya da onun adresini
 * dışarı taşır, oysa burada karar verilen tek şey vitrinde hangi para
 * biriminin yazacağı. Kaynak sırayla:
 *
 *   1. PROFİLDEKİ SAAT DİLİMİ. Uygulama zaten kaydediyor (bildirim saatleri
 *      kullanıcının kendi gününe göre hesaplanıyor, bkz. lib/push) ve cihazın
 *      kendi ayarından geliyor — izin gerektirmeyen en güçlü sinyal. Premium
 *      sayfası giriş istiyor, yani bu alan pratikte hep dolu.
 *   2. `Accept-Language` başlığındaki ülke eki ("tr-TR" → TR). Zayıf ama
 *      bedava: dil ülke demek değil, yine de hiç yoktan iyi.
 *   3. GLOBAL.
 *
 * SONUÇ TEK BÖLGE. Çağıran yalnız bunun fiyatını gösteriyor; bölge listesi
 * hiçbir yüzeyde açılmıyor.
 */
export type PriceRegion = "TR" | "EU" | "GLOBAL";

/**
 * AB/AEA saat dilimleri. Liste ülke değil DİLİM adı taşıyor çünkü elimizdeki
 * veri o. Avrupa'da olup Euro bölgesinde olmayan yerler (Londra, Zürih,
 * Moskova) bilerek dışarıda: fiyat Euro değil.
 */
const EU_ZONES = new Set([
  "Europe/Amsterdam", "Europe/Andorra", "Europe/Athens", "Europe/Berlin", "Europe/Bratislava",
  "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Copenhagen", "Europe/Dublin",
  "Europe/Helsinki", "Europe/Lisbon", "Europe/Ljubljana", "Europe/Luxembourg", "Europe/Madrid",
  "Europe/Malta", "Europe/Monaco", "Europe/Oslo", "Europe/Paris", "Europe/Prague",
  "Europe/Riga", "Europe/Rome", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Skopje",
  "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Vaduz", "Europe/Vienna",
  "Europe/Vilnius", "Europe/Warsaw", "Europe/Zagreb", "Atlantic/Canary", "Atlantic/Madeira",
]);

/** Ülke kodu → bölge. Yalnız iki özel durum var, gerisi GLOBAL. */
const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
]);

function fromTimezone(tz: string | null | undefined): PriceRegion | null {
  if (!tz) return null;
  if (tz === "Europe/Istanbul") return "TR";
  if (EU_ZONES.has(tz)) return "EU";
  return null;
}

function fromAcceptLanguage(header: string | null | undefined): PriceRegion | null {
  if (!header) return null;
  // "tr-TR,tr;q=0.9,en-US;q=0.8" → ilk etiketteki ülke eki
  const first = header.split(",")[0]?.trim() ?? "";
  const country = first.split("-")[1]?.slice(0, 2).toUpperCase();
  if (!country) return null;
  if (country === "TR") return "TR";
  if (EU_COUNTRIES.has(country)) return "EU";
  return null;
}

export function resolveRegion(tz: string | null | undefined, acceptLanguage?: string | null): PriceRegion {
  return fromTimezone(tz) ?? fromAcceptLanguage(acceptLanguage) ?? "GLOBAL";
}

/**
 * Bölgenin fiyatı. Bölge listede yoksa GLOBAL'e, o da yoksa ilk satıra
 * düşülüyor — vitrinde fiyat göstermemek, yanlış para biriminde göstermekten
 * kötü: kullanıcı ne ödeyeceğini hiç bilmeden mağazaya gidiyor.
 */
export function priceFor(prices: PlanPrice[], region: PriceRegion): PlanPrice | null {
  return prices.find((p) => p.region === region) ?? prices.find((p) => p.region === "GLOBAL") ?? prices[0] ?? null;
}
