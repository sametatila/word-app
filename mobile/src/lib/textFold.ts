/**
 * Karşılaştırma katlaması — yazılı ve sözlü cevapların ORTAK biçimi.
 *
 * Aynı katlama kodu dört ayrı yerde elle yeniden yazılmıştı (voiceMatch,
 * skillQuiz, rounds.norm, rounds TranslateRound, LessonScreen) ve hepsi
 * birbirinden ayrı ayrı eskimişti:
 *  • hiçbiri sayı katlamıyordu — öğrenci "2" yazınca hedef "two" reddediliyordu,
 *  • skillQuiz sabit `de-DE` küçültme + umlaut katlaması yapıyordu, yani
 *    İngilizce beceri egzersizlerinde de Almanca kuralı uygulanıyordu,
 *  • sildikleri noktalama kümeleri birbirinden farklıydı (`…` bir yerde
 *    siliniyor, diğerinde kalıyordu).
 *
 * Buradaki tek kaynak hepsini eşitliyor. Kural: iki taraf da aynı fonksiyondan
 * geçtiği için katlamanın "doğru" olması değil TUTARLI olması önemli.
 */
import { foldNumbers } from "./numbers";

/**
 * Kesme işaretleri SİLİNİR, boşluğa çevrilmez.
 *
 * Kullanıcı mobilde çoğu zaman kesmesiz yazıyor ve tanıyıcı da bazen atlıyor:
 * "don't"→"dont", "I'm"→"Im", "uncle's"→"uncles". Boşluğa çevirseydik "i m"
 * çıkardı ve kesmesiz yazan reddedilirdi.
 */
const APOSTROF = /['’´`\u02BC]/g;

/**
 * Diğer işaretler BOŞLUĞA çevrilir, silinmez: "A/B" iki sözcüktür, "AB" değil.
 *
 * Tire ayrı önemli: tanıyıcı "t-shirt" yerine "t shirt", "U-Bahn" yerine
 * "U Bahn" yazıyor — havuzda 142 İngilizce, 14 Almanca tireli başlık var.
 * Üç nokta da öyle: içerikte "My name is …" duruyor, kimse onu söylemiyor.
 */
export const PUNCT = /[.,!?;:"…—–\-+/()\[\]{}≠→„“”»«]/g;

/**
 * Simge → sözcük. İçerikte simge HİÇ geçmiyor (hepsi "Euro", "Prozent" diye
 * yazılı) ama kullanıcı yazarken "5€", "%20" kullanıyor ve tanıyıcı da bazen
 * simge üretiyor. Simgeyi noktalama sayıp atmak yanlış olurdu: "%20" ile "20"
 * aynı şey değil. Sözcüğe açmak iki tarafı ortak biçimde buluşturuyor.
 */
const SYMBOLS: Record<string, Record<string, string>> = {
  de: { "%": " prozent ", "€": " euro ", "$": " dollar ", "£": " pfund ", "&": " und ", "°": " grad " },
  en: { "%": " percent ", "€": " euro ", "$": " dollar ", "£": " pound ", "&": " and ", "°": " degrees " },
};
const SYMBOL_RE = /[%€$£&°]/g;

/** Küçültme + (yalnız Almancada) umlaut katlaması. */
export function foldCase(s: string, lang: string): string {
  const lower = (s || "").toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US");
  return lang === "de"
    ? lower.replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    : lower;
}

/**
 * Yazılan/duyulan metnin karşılaştırma biçimi.
 *
 * SIRA ÖNEMLİ: noktalama sayıdan ÖNCE sadeleşir. Tersi olursa asimetri doğuyor —
 * "one-way street" hedefinde sayı koruması devreye girip `one` duruyor, ama
 * tanıyıcının tiresiz çıktısında ("one way street") girmiyor ve rakama iniyordu.
 */
export function foldCompare(s: string, lang: string): string {
  const tablo = SYMBOLS[lang];
  const açık = tablo ? foldCase(s, lang).replace(SYMBOL_RE, (c) => tablo[c] ?? " ") : foldCase(s, lang);
  const sade = açık.replace(APOSTROF, "").replace(PUNCT, " ");
  return foldNumbers(sade, lang).replace(/\s+/g, " ").trim();
}

/**
 * Boşluksuz biçim — ikinci geçiş karşılaştırması için.
 *
 * Noktalama boşluğa çevrildiği için "don't" → "don t" oluyor; kullanıcı mobilde
 * çoğu zaman kesmesiz "dont" yazıyor ve iki taraf tutmuyordu. Tanıyıcı da uzun
 * Almanca bileşikleri bölüyor ("Fasnacht" → "Fasn acht"), İngilizce tireli
 * başlıkları ayırıyor. Boşlukları tamamen atmak üçünü birden kapatıyor.
 *
 * Yalnız YEDEK geçiş olarak kullanılmalı: boşluksuz karşılaştırma "ich bin" ile
 * "ichbin"i de aynı sayar, o yüzden tam eşleşme önce denenir.
 */
export function foldTight(s: string, lang: string): string {
  return foldCompare(s, lang).replace(/\s+/g, "");
}

/**
 * Yalnız HARFLER — sayı katlaması olmadan, boşluksuz.
 *
 * Tanıyıcı uzun bileşiği bölünce ortaya çıkan parça sayı sözcüğü olabiliyor:
 * "Fasnacht" → "Fasn acht" → sayı katlanınca "fasn8" oluyor ve artık
 * "fasnacht"a benzemiyor. Sayıyı katlamadan sıkıştırmak bu yolu kapatıyor.
 *
 * SADECE konuşma tarafında kullanılır. Yazarken kullanıcı sözcüğü ikiye
 * bölmüyor; orada sayı katlaması iki tarafa da aynı uygulandığı için zaten
 * simetrik.
 */
export function foldLetters(s: string, lang: string): string {
  return foldCase(s, lang).replace(APOSTROF, "").replace(PUNCT, " ").replace(/\s+/g, "");
}
