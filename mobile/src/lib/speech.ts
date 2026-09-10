import { foldNumbers } from "./numbers";


/**
 * Söylenen metnin karşılaştırma biçimi — web `lib/speech.ts` `normalizeSpoken`
 * ile AYNI kural.
 *
 * Çevrimdışı rol yapma yolunun (`game/offlineRoleplay`) ve niyet
 * eşleştirmesinin (`game/dialogue`) tabanı: tanıyıcı "fünf" yerine "5"
 * yazabiliyor, noktalama serbest geliyor.
 *
 * UMLAUT BİLEREK KORUNUYOR: schön/schon farkı bu turun konusu. Bu yüzden
 * `textFold`in katlaması burada kullanılmıyor - o oyunlarda yazım hatasını
 * affetmek için var, burada anlam ayrımı korunmalı.
 */
const PUNCTUATION = /[.,!?;:„“”"'`´()[\]…]/g;

/** `lang`: hedef dilin kodu ("de" | "en"); mobil kurs kaydı düz dizge tutuyor. */
export function normalizeSpoken(text: string, lang: string = "de"): string {
  return foldNumbers(text.toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US"), lang)
    .replace(PUNCTUATION, " ")
    .replace(/\s+/g, " ")
    .trim();
}
