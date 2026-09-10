/**
 * Almanca sayı normalizasyonu birim testi: npm run test:numbers
 *
 * Tanıyıcı sayıları rakam yazıyor ("fünf" → "5"); karşılaştırma katlaması
 * ikisini de rakama indirip eşleştirmeli — ama artikeli (ein/eine) ve sayı
 * içeren kelimeleri (Einsamkeit) BOZMAMALI.
 */
import assert from "node:assert/strict";
import { foldNumbers, wordToNumber } from "../src/lib/numbers";
import { foldSpelling, foldTight, spokenMatches, expandPunctuationWords, matchesAnswer } from "../src/components/games/types";
import { matchSentence, foldSentence } from "../src/lib/sentence-match";
import { normalizeSpoken } from "../src/lib/speech";

// Tek sözcük → sayı
assert.equal(wordToNumber("fünf", "de"), 5);
assert.equal(wordToNumber("fuenf", "de"), 5);
assert.equal(wordToNumber("zwanzig", "de"), 20);
assert.equal(wordToNumber("einundzwanzig", "de"), 21);
assert.equal(wordToNumber("fünfunddreißig", "de"), 35);
assert.equal(wordToNumber("hundert", "de"), 100);
assert.equal(wordToNumber("eins", "de"), 1);
// Artikel ve sayı içeren kelime SAYI DEĞİL
assert.equal(wordToNumber("ein", "de"), null, "ein artikeldir, sayı değil");
assert.equal(wordToNumber("eine", "de"), null);
assert.equal(wordToNumber("einsamkeit", "de"), null, "sayı içeren kelime çevrilmez");
assert.equal(wordToNumber("haus", "de"), null);

// Metin içinde
assert.equal(foldNumbers("um fünf Uhr", "de"), "um 5 Uhr");
assert.equal(foldNumbers("ich habe zwei Kinder", "de"), "ich habe 2 Kinder");
assert.equal(foldNumbers("einundzwanzig Jahre", "de"), "21 Jahre");
// Artikel korunuyor
assert.equal(foldNumbers("ein Buch", "de"), "ein Buch");
assert.equal(foldNumbers("eine Frau und ein Mann", "de"), "eine Frau und ein Mann");

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
assert.ok(spokenMatches(["t shirt"], ["T-Shirt"], "en"), "tireli baslik bosluklu yaziliyor");
assert.ok(spokenMatches(["U Bahn"], ["U-Bahn"], "de"), "Almanca tireli baslik da");
assert.ok(spokenMatches(["ähm Anruf Beantworter bitte"], ["Anrufbeantworter"], "de"), "bolunme + dolgu: uzun hedefte icerme bagisli");
assert.ok(!spokenMatches(["das Wasser"], ["was"], "de"), "kisa hedef baska kelimenin icinde gecince DOGRU SAYILMAZ");
assert.ok(!spokenMatches(["das Geschlecht"], ["schlecht"], "de"), "aynisi: schlecht ⊂ Geschlecht");
assert.ok(spokenMatches(["die Katze"], ["Katze"], "de"), "normal okuma bozulmadi");

/*
 * NOKTALAMA KÜMESİ VE SİMGELER — mobil `lib/textFold` ile eşitlendi.
 *
 * Küme yalnız `.,!?;:` idi. Tire en önemli eksiğiydi: tanıyıcı "t-shirt"
 * yerine "t shirt" yazıyor ve havuzda 142 İngilizce, 14 Almanca tireli başlık
 * var. Simge tablosu da yoktu: içerik "Euro"/"Prozent" diye yazıyor, kullanıcı
 * "5€"/"%20" yazıyor.
 */
assert.equal(foldSpelling("A/B", "de"), "a b", "eğik çizgi boşluğa döner, silinmez");
assert.ok(spokenMatches(["5 Euro"], ["5€"], "de"), "simge sözcüğe açılır (Almanca)");
assert.ok(spokenMatches(["20 percent"], ["20%"], "en"), "simge sözcüğe açılır (İngilizce)");
assert.ok(spokenMatches(["My name is"], ["My name is …"], "en"), "üç nokta atılır");
// Karo oyunu: iki taraf da sıkıştırılmış biçimde karşılaştırılıyor.
assert.equal(foldTight("E-Mail", "de"), foldTight("EMail", "de"), "tireli başlık karo dizilişiyle eşit");
assert.equal(foldTight("auf Wiedersehen", "de"), foldTight("aufWiedersehen", "de"), "boşluklu başlık da");
// `acceptedForms` de dile bakıyor: simge tablosu ve baştaki tanımlık.
assert.ok(spokenMatches(["door"], ["the door"], "en"), "acceptedForms İngilizce tanımlığı düşürür");
assert.ok(spokenMatches(["Bekannte"], ["die Bekannte"], "de"), "Almanca tanımlık eskisi gibi");

/*
 * İNGİLİZCE SAYI SÖZCÜKLERİ — modül `lib/german-numbers`ten `lib/numbers`e
 * taşındı ve mobil `mobile/src/lib/numbers.ts` ile birebir aynı.
 *
 * Web yalnız Almanca yapıyordu: "forty-two" hedefi tanıyıcının yazdığı "42"
 * ile hiçbir zaman eşleşmiyordu. Almanca tarafta da eksik vardı - çarpımsal
 * bileşikler ("achthundert", "dreißigtausend") çözülmüyordu.
 */
assert.equal(wordToNumber("five", "en"), 5);
assert.equal(wordToNumber("ninety", "en"), 90);
assert.equal(wordToNumber("a", "en"), null, "belirsiz artikel sayı değil");
assert.equal(wordToNumber("an", "en"), null);
assert.equal(foldNumbers("twenty-one", "en"), "21", "tireli bileşik");
assert.equal(foldNumbers("twenty one", "en"), "21", "boşluklu bileşik");
assert.equal(foldNumbers("two hundred", "en"), "200", "ölçek");
assert.equal(foldNumbers("two hundred and fifty", "en"), "250", "ölçek + kalan");
assert.equal(foldNumbers("a hundred", "en"), "100", "a hundred");
assert.equal(foldNumbers("thirty thousand", "en"), "30000");
assert.equal(foldNumbers("at five o'clock", "en"), "at 5 o'clock", "kesme işareti öncesi sayı çevrilir");
assert.equal(foldNumbers("one-way street", "en"), "one-way street", "tireli bileşik sayı değil");
assert.equal(foldNumbers("one's mind", "en"), "one's mind", "kesmeli bileşik sayı değil");
// Sıra sayıları kardinalden AYRI kanona iniyor: "first" ile "one" aynı olmamalı.
assert.equal(foldNumbers("the first floor", "en"), "the 1st floor");
assert.equal(foldNumbers("the 1th floor", "en"), "the 1st floor", "yanlış ek düzelir");
assert.notEqual(foldNumbers("first", "en"), foldNumbers("one", "en"), "first ≠ one");
// Almanca çarpımsal bileşikler (web tarafında hiç çözülmüyordu).
assert.equal(wordToNumber("achthundert", "de"), 800);
assert.equal(wordToNumber("dreißigtausend", "de"), 30000);
assert.equal(wordToNumber("zweihundertfünfzig", "de"), 250);
assert.equal(wordToNumber("Jahrhundert", "de"), null, "Jahrhundert sayı değil");
assert.equal(wordToNumber("Tausendfüßler", "de"), null);
// Tanınmayan dilde metin değişmez.
assert.equal(foldNumbers("five", "tr"), "five");
// Eşleştirmede: hedef sözcük, söylenen rakam.
assert.ok(spokenMatches(["42"], ["forty-two"], "en"), "forty-two ↔ 42");
assert.ok(spokenMatches(["two hundred"], ["200"], "en"), "two hundred ↔ 200");

/*
 * CÜMLE VE KONUŞMA KATLAMASI DA DİLE BAKIYOR (§11.18/f).
 *
 * `foldSentence` ve `normalizeSpoken` küçültmeyi `de-DE` ile yapıyor ve umlaut
 * katlıyordu; sayı tarafı da bu yüzden İngilizcede çalışmıyordu. Umlaut
 * katlaması İngilizcede YAPILMAMALI - "naive" ile "naïve" ayrı sözcük değil
 * ama katlama İngilizce metinde hiçbir işe yaramıyor ve sırayı bozuyor.
 */
assert.equal(foldSentence("At five o'clock", "en"), "at 5 o clock", "İngilizce sayı sözcüğü katlanır");
assert.equal(foldSentence("um fünf Uhr", "de"), "um 5 uhr", "Almanca eskisi gibi");
assert.equal(foldSentence("Grüße", "de"), "gruesse", "Almanca umlaut katlanır");
assert.equal(matchSentence("At five o'clock", "At 5 o'clock", [], "en").verdict, "exact", "sayı biçimi farkı tam doğru");
// Rakam farkı yazım hatası DEĞİL: katlama sayıyı rakama indiriyor ve "6" ↔ "5"
// tek karakterlik fark oluyordu, yanlış saat kalite 4 (yazım) alıyordu.
assert.equal(matchSentence("At six o'clock", "At 5 o'clock", [], "en").verdict, "wrong", "yanlış sayı yazım hatası değil");
assert.equal(matchSentence("um sechs Uhr", "um 5 Uhr", [], "de").verdict, "wrong", "Almancada da");
assert.equal(matchSentence("Ich gehe ins Kinno", "Ich gehe ins Kino", [], "de").verdict, "spelling", "harf hatası yazım kalır");
assert.equal(normalizeSpoken("at five o'clock", "en"), normalizeSpoken("at 5 o'clock", "en"));

console.log("test:numbers — sözcük/rakam/bileşik/artikel/cümle/kelime/telaffuz/noktalama: tamam");
