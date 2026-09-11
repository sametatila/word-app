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
 *   1. CİHAZIN SAAT DİLİMİ (`tz` çerezi, bkz. lib/tz-cookie). Tarayıcının
 *      kendi ayarı; izin gerektirmiyor. Profildeki `timezone` alanı bu iş için
 *      KULLANILMIYOR: NOT NULL ve varsayılanı "Europe/Istanbul", yalnız bildirim
 *      kaydında yazılıyor — bildirimleri açmamış kullanıcıda varsayılanı taşıyor.
 *   2. GLOBAL — bilinmiyorsa taban fiyat. Dil HİÇ bakılmıyor: dil kullanıcının
 *      nerede olduğunu söylemez.
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

/**
 * SAAT DİLİMİ VARSA CEVAP DA VAR. "Ne TR ne AB" bilinmezlik değil, GLOBAL
 * demek: America/New_York açık bir cevaptır. İlk yazımda buradan `null`
 * dönüyordu ve karar `Accept-Language`a düşüyordu — New York'ta oturan ama
 * tarayıcısı Türkçe olan kullanıcıya lira gösteriliyordu (ölçüldü). Güçlü
 * sinyalin zayıf olana yenilmemesi gerekiyor; `null` yalnız saat dilimi HİÇ
 * yokken dönüyor.
 */
function fromTimezone(tz: string | null | undefined): PriceRegion | null {
  if (!tz) return null;
  if (tz === "Europe/Istanbul") return "TR";
  if (EU_ZONES.has(tz)) return "EU";
  return "GLOBAL";
}

/**
 * DİL FİYATI BELİRLEMEZ. İlk yazımda saat dilimi bilinmiyorsa
 * `Accept-Language`daki ülke ekine düşülüyordu ve sonuç şuydu: arayüzünü ya da
 * tarayıcısını Almancaya alan kullanıcıya euro gösteriliyordu. Dil, kullanıcının
 * NEREDE olduğunu söylemez — Türkiye'de yaşayan biri uygulamayı İngilizce
 * kullanabilir. Bilinmeyen bölge artık GLOBAL; yanlış bölge göstermektense
 * taban fiyat gösteriliyor.
 */
export function resolveRegion(tz: string | null | undefined): PriceRegion {
  return fromTimezone(tz) ?? "GLOBAL";
}

/**
 * Bölgenin fiyatı. Bölge listede yoksa GLOBAL'e, o da yoksa ilk satıra
 * düşülüyor — vitrinde fiyat göstermemek, yanlış para biriminde göstermekten
 * kötü: kullanıcı ne ödeyeceğini hiç bilmeden mağazaya gidiyor.
 */
export function priceFor(prices: PlanPrice[], region: PriceRegion): PlanPrice | null {
  return prices.find((p) => p.region === region) ?? prices.find((p) => p.region === "GLOBAL") ?? prices[0] ?? null;
}
