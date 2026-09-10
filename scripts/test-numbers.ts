/**
 * Almanca sayı normalizasyonu birim testi: npm run test:numbers
 *
 * Tanıyıcı sayıları rakam yazıyor ("fünf" → "5"); karşılaştırma katlaması
 * ikisini de rakama indirip eşleştirmeli — ama artikeli (ein/eine) ve sayı
 * içeren kelimeleri (Einsamkeit) BOZMAMALI.
 */
import assert from "node:assert/strict";
import { foldNumbers, wordToNumber } from "../src/lib/german-numbers";
import { foldSpelling, spokenMatches, expandPunctuationWords, matchesAnswer } from "../src/components/games/types";
import { matchSentence } from "../src/lib/sentence-match";
import { normalizeSpoken } from "../src/lib/speech";

// Tek sözcük → sayı
assert.equal(wordToNumber("fünf"), 5);
assert.equal(wordToNumber("fuenf"), 5);
assert.equal(wordToNumber("zwanzig"), 20);
assert.equal(wordToNumber("einundzwanzig"), 21);
assert.equal(wordToNumber("fünfunddreißig"), 35);
assert.equal(wordToNumber("hundert"), 100);
assert.equal(wordToNumber("eins"), 1);
// Artikel ve sayı içeren kelime SAYI DEĞİL
assert.equal(wordToNumber("ein"), null, "ein artikeldir, sayı değil");
assert.equal(wordToNumber("eine"), null);
assert.equal(wordToNumber("einsamkeit"), null, "sayı içeren kelime çevrilmez");
assert.equal(wordToNumber("haus"), null);

// Metin içinde
assert.equal(foldNumbers("um fünf Uhr"), "um 5 Uhr");
assert.equal(foldNumbers("ich habe zwei Kinder"), "ich habe 2 Kinder");
assert.equal(foldNumbers("einundzwanzig Jahre"), "21 Jahre");
// Artikel korunuyor
assert.equal(foldNumbers("ein Buch"), "ein Buch");
assert.equal(foldNumbers("eine Frau und ein Mann"), "eine Frau und ein Mann");

// Cümle eşleştirme: "fünf" ↔ "5" tam doğru sayılmalı
assert.equal(matchSentence("Es ist 5 Uhr.", "Es ist fünf Uhr.").verdict, "exact", "rakam ve sözcük eşleşmeli");
assert.equal(matchSentence("Ich habe zwei Katzen.", "Ich habe 2 Katzen.").verdict, "exact");
// Yanlış sayı yine yanlış
assert.notEqual(matchSentence("Es ist 6 Uhr.", "Es ist fünf Uhr.").verdict, "exact", "yanlış sayı doğru sayılmamalı");

// Kelime turu: söylenen "21", hedef "einundzwanzig"
assert.ok(spokenMatches(["21"], ["einundzwanzig"]), "söylenen rakam, hedef sözcük");
assert.ok(spokenMatches(["fünf"], ["5"]), "söylenen sözcük, hedef rakam");
// Yazılı katlama sayıyı da eşitliyor
assert.equal(foldSpelling("fünf"), foldSpelling("5"));
// Artikel içeren kelime bozulmuyor (Einsamkeit ≠ 1samkeit)
assert.ok(!foldSpelling("Einsamkeit").includes("1"), "Einsamkeit rakama dönmemeli");

// Telaffuz normalizasyonu da sayıyı eşitliyor, umlaut'u koruyor
assert.equal(normalizeSpoken("Fünf"), "5");
assert.equal(normalizeSpoken("schön"), "schön", "umlaut korunmalı");

// ── Noktalama-adı kelimeleri ────────────────────────────────────────────
// Tanıyıcı "der Punkt" duyunca "Punkt"u yazım komutu sayıp "." yazıyor; simge
// normalize'de silinince cevap ortadan kalkıyordu. Simge geri sözcüğe açılmalı.
assert.equal(expandPunctuationWords("der."), "der punkt", "nokta simgesi sözcüğe açılır");
assert.equal(expandPunctuationWords("."), "punkt");
assert.ok(spokenMatches(["der."], ["der Punkt"]), "der. → der Punkt eşleşmeli (asıl hata)");
assert.ok(spokenMatches(["."], ["Punkt"]), "yalın nokta simgesi Punkt sayılmalı");
assert.ok(spokenMatches(["Punkt"], ["der Punkt"]), "sözcük biçimi zaten eşleşiyor");
assert.ok(spokenMatches([",", "das."], ["das Komma"]), "komma simgesi de açılır");
// Normal cevap trailing nokta ile bozulmuyor
assert.ok(spokenMatches(["die Katze."], ["die Katze"]), "sonda nokta olan normal cevap doğru kalır");
// Yanlış cevap noktalama açılımıyla YANLIŞLIKLA doğru olmuyor
assert.ok(!spokenMatches(["der."], ["die Katze"]), "der. Katze cevabını doğru yapmamalı");
assert.ok(!spokenMatches(["hund."], ["der Punkt"]), "alakasız kelime + nokta Punkt sayılmamalı");

/*
 * İNGİLİZCE KURS — eşleştirme dile bakıyor.
 *
 * `foldSpelling` sabit `der|die|das` yazılıydı ve yalnız BAŞTAKİ tanımlığı
 * düşürüyordu; tanıyıcı noktalama tablosu da yalnız Almancaydı. Sonuç
 * İngilizce kursta iki sessiz hata: "the door" hiçbir zaman "door" ile
 * eşleşmiyordu ve "limitation period" dendiğinde tanıyıcının yazdığı
 * "limitation." katlamada "limitation"a inip hedefi bulamıyordu. Mobil
 * (`lib/voiceMatch`) ikisini de dile göre yapıyor.
 *
 * Dil artık parametre; varsayılanı geçerli kurs. Node'da yerel depo yok, o
 * yüzden üstteki Almanca denetimler varsayılanla çalışıyor ve buradaki
 * İngilizce denetimler dili açıkça veriyor.
 */
assert.ok(spokenMatches(["the door"], ["door"], "en"), "the door → door (tanımlık atılır)");
assert.ok(spokenMatches(["door"], ["the door"], "en"), "door → the door (hedefteki tanımlık da atılır)");
assert.ok(spokenMatches(["a book"], ["book"], "en"), "a tanımlığı da atılır");
assert.ok(spokenMatches(["I am waiting at the bus stop"], ["waiting at bus stop"], "en"), "cümle ortasındaki tanımlık");
assert.ok(spokenMatches(["limitation."], ["limitation period"], "en"), "period simgesi sözcüğe açılır (asıl hata)");
assert.ok(spokenMatches([","], ["comma"], "en"), "yalın virgül simgesi comma sayılır");
assert.equal(foldSpelling("What's your name?", "en"), foldSpelling("whats your name", "en"), "kesme işareti silinir");
assert.equal(foldSpelling("I'm fine", "en"), foldSpelling("Im fine", "en"));
// Almanca tablo İngilizce kursta kullanılmıyor, tersi de.
assert.ok(!spokenMatches(["limitation."], ["limitation period"], "de"), "Almanca kursta period açılmaz");
// Yalnız tanımlıktan oluşan cevap katlamada boşalıyor; yedek okuma kurtarıyor.
assert.ok(spokenMatches(["the"], ["the"], "en"), "yalnız tanımlık olan cevap yine eşleşir");
assert.ok(matchesAnswer("der", ["der"], "de"), "yazılan tek tanımlık da eşleşir");

/*
 * BOŞLUKSUZ OKUMALAR — tanıyıcı bileşiği bölüyor.
 *
 * Mobil (`lib/voiceMatch`) iki ek okuma yapıyordu, web hiç yapmıyordu:
 * boşlukları atarak ve sayı katlamadan. Havuzda 2313 uzun Almanca bileşik var
 * ve tanıyıcı bunları ayırıyor.
 *
 * İçerme eşiği bu okumalarda ayrı ve 12: boşluk sınırı olmadığı için kısa bir
 * hedef başka bir kelimenin içinde tesadüfen geçiyor ("was" ⊂ "das Wasser").
 */
assert.ok(spokenMatches(["Anruf Beantworter"], ["Anrufbeantworter"], "de"), "bolunmus bilesik birlesince hedefe esit");
// Tireli başlık ("t shirt" ↔ "T-Shirt") HENÜZ eşleşmiyor: tire webin
// `normalize` noktalama kümesinde yok ve kümeyi genişletmek `scramble-game`in
// karo karşılaştırmasıyla çakışıyor (bkz. web-parity §11.18/d).
assert.ok(!spokenMatches(["t shirt"], ["T-Shirt"], "en"), "tireli baslik: bilinen eksik, d maddesi");
assert.ok(spokenMatches(["ähm Anruf Beantworter bitte"], ["Anrufbeantworter"], "de"), "bolunme + dolgu: uzun hedefte icerme bagisli");
assert.ok(!spokenMatches(["das Wasser"], ["was"], "de"), "kisa hedef baska kelimenin icinde gecince DOGRU SAYILMAZ");
assert.ok(!spokenMatches(["das Geschlecht"], ["schlecht"], "de"), "aynisi: schlecht ⊂ Geschlecht");
assert.ok(spokenMatches(["die Katze"], ["Katze"], "de"), "normal okuma bozulmadi");

console.log("test:numbers — sözcük/rakam/bileşik/artikel/cümle/kelime/telaffuz/noktalama: tamam");
