import { and, eq, notInArray } from "drizzle-orm";
import { words } from "@/lib/db/schema";

/**
 * Kelime oyunlarına HİÇ girmeyen maddeler.
 *
 * Belirli artikel bir kelime değil, dil bilgisi işaretidir. Havuzda anlamı
 * "belirli artikel" / "the" diye yazılıydı ve sıradan bir kelime gibi şık
 * turuna düşüyordu: Türkçe konuşan öğrenci "der → belirli artikel · the"
 * sorusunu gördü. Türkçede artikel yok, İngilizce satır da bir şey anlatmıyor;
 * sorunun cevabı ezberlenebilir ama öğrettiği bir şey yok. der/die/das kararını
 * zaten "Hangi artikel?" oyunu isimle birlikte soruyor.
 *
 * Madde veriden SİLİNMEDİ: kelime dağarcığı kapıları (`scripts/lib/vocab-gate`)
 * words.json'a bakıyor ve "der" geçen her cümle bilinmeyen kelime sayılırdı.
 * Burada yalnız alıştırma havuzundan çıkıyor; sözlükte görünmeye devam eder.
 *
 * `ein` (bir) listede değil — "bir" gerçek bir çeviri.
 */
export const NOT_PRACTICED_WORD_IDS = [
  102, // de: der — belirli artikel
  100102, // gsw-zh: de — belirli artikel
  200102, // en: the — belirli tanımlık
  /*
    SÖZCÜK YAPIM ÖĞELERİ (ön ekler). Kelime değil, bağımlı biçimbirim:
    "Lieblings", "un", "miss" tek başına cümlede geçemiyor. Kart olarak
    boşluk doldurma kurulamıyor (cümlede yalnız bileşik var), yürüyüş modu
    yarım bir sözcük seslendiriyor, yazma turu var olmayan bir kelime
    istiyordu. Profile Deutsch da bunları sözcük değil sözcük yapım öğesi
    olarak listeliyor; öğretildikleri yer konuşmalar (bileşikleriyle birlikte).
  */
  303, // de: Lieblings(-)
  1676, // de: Doppel(-)
  1751, // de: Elektro(-)
  2022, // de: Groß(-) — sıfat "groß" (203) ayrı madde, alıştırılıyor
  2357, // de: miss(-)
  2446, // de: Öko(-)
  2667, // de: Schwieger(-)
  2923, // de: un(-)
  202357, // en: negative prefix
  202446, // en: eco-
  202923, // en: un-
];

/** Kursun alıştırılabilir kelimeleri — `eq(words.course, …)` yerine. */
export function practiceWordsOf(course: string) {
  return and(eq(words.course, course), notInArray(words.id, NOT_PRACTICED_WORD_IDS));
}
