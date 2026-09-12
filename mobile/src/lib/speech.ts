import { foldContractions } from "./contractions";
import { foldEnglishSpelling } from "./en-spelling";
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
/*
  TİRE DE NOKTALAMA. Tanıyıcı tireli başlığı boşlukla yazıyor ("T-Shirt" →
  "t shirt", "U-Bahn" → "U Bahn"); tire burada kalınca hedef tek jeton,
  duyulan iki jeton oluyordu ve doğru cevap reddediliyordu. Ders hedeflerinin
  74'ü tire taşıyor; kelime katlaması (`lib/textFold` PUNCT) bunu zaten
  yapıyordu, konuşma katlaması geride kalmıştı.
*/
const PUNCTUATION = /[.,!?;:„“”"'`´()[\]…\-–—]/g;

/** `lang`: hedef dilin kodu ("de" | "en"); mobil kurs kaydı düz dizge tutuyor. */
export function normalizeSpoken(text: string, lang: string = "de"): string {
  // Kısaltmalar önce açılıyor: aşağıdaki noktalama temizliği kesme işaretini
  // boşluğa çeviriyor, yani "I'm" ile "I am" yoksa buluşamaz (web ile aynı).
  return foldNumbers(
    foldEnglishSpelling(
      foldContractions(text.toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US"), lang),
      lang,
    ),
    lang,
  )
    .replace(PUNCTUATION, " ")
    .replace(/\s+/g, " ")
    .trim();
}
