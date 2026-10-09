/**
 * Cümle eşleştirme birim testi — `npm run test:match` (WP-10, adım 3).
 * Veritabanı yok; `lib/sentence-match` saf.
 */
import { diffLines, foldSentence, hintFocus, matchSentence, produceFeedback, produceMiss, typoOnly } from "../src/lib/sentence-match";
import { foldCompare } from "../src/components/games/types";
import { levenshtein } from "../src/lib/errors";
import { judgeTyped, arrangedRescuable } from "../src/lib/typed-answer";
import { arrangedAccepted, orderAlternatives, sameTiles } from "../src/lib/arrange";
import { produceSource, quotedSource } from "../src/lib/conversations/produce-source";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}
const marks = (m: ReturnType<typeof matchSentence>) => m.target.map((t) => `${t.text}:${t.mark[0]}`).join(" ");

console.log("\n1) Katlama");
check("büyük/küçük, noktalama, ß/ss, umlaut", foldSentence("Ich gehe heute ins Kino.") === foldSentence("ich gehe heute ins kino") && foldSentence("Straße") === foldSentence("strasse") && foldSentence("schön") === foldSentence("schoen"));

console.log("\n2) Tam eşleşme");
const T = "Ich gehe heute ins Kino.";
let m = matchSentence("ich gehe heute ins kino", T);
check("noktalama ve büyük harf farkı tam sayılır", m.verdict === "exact" && m.quality === 5);
m = matchSentence("Ich gehe heute ins Kino!", T);
check("farklı son noktalama tam", m.verdict === "exact");
m = matchSentence("Ich mag Kaffee.", "Ich trinke gern Kaffee.", ["Ich mag Kaffee."]);
check("alternatif tam eşleşir", m.verdict === "exact" && m.matched === "Ich mag Kaffee.");

console.log("\n3) Yazım");
m = matchSentence("Ich gehe heute ins Kinno", T);
check("bir harf → spelling, kalite 4", m.verdict === "spelling" && m.quality === 4 && m.errorType === "spelling", marks(m));
check("yazım hatalı kelime işaretli", m.target.some((t) => t.text === "Kino" && t.mark === "typo") && m.typed.some((t) => t.text === "Kinno" && t.mark === "typo"));
m = matchSentence("Ich gehe heute ins Kinnooo", T);
check("üç harf sapma yazım değil", m.verdict === "wrong", marks(m));

console.log("\n4) Sıra");
m = matchSentence("Heute ich gehe ins Kino", T);
check("fiil yeri → order, kalite 3, verb_position", m.verdict === "order" && m.quality === 3 && m.errorType === "verb_position", `${m.errorType} ${marks(m)}`);
check("yer değiştiren kelime işaretli", m.target.some((t) => t.text === "heute" && t.mark === "moved"), marks(m));
m = matchSentence("Ich gehe ins Kino heute", T);
check("zarf yeri → order, word_order", m.verdict === "order" && m.errorType === "word_order", `${m.errorType}`);
m = matchSentence("weil ich bin krank", "weil ich krank bin");
check("yan cümle fiil sonu → verb_position", m.verdict === "order" && m.errorType === "verb_position");

console.log("\n5) Yanlış / eksik / fazla");
m = matchSentence("Ich gehe ins Kino", T);
check("eksik kelime → wrong, missing işaretli", m.verdict === "wrong" && m.target.some((t) => t.text === "heute" && t.mark === "missing"), marks(m));
m = matchSentence("Ich gehe heute abend ins Kino", T);
check("fazla kelime → wrong, extra işaretli", m.verdict === "wrong" && m.typed.some((t) => t.text === "abend" && t.mark === "extra"));
m = matchSentence("Ich bin müde", T);
check("alakasız cümle → wrong, meaning", m.verdict === "wrong" && m.errorType === "meaning" && m.quality === 1);
m = matchSentence("", T);
check("boş cevap → wrong", m.verdict === "wrong");

console.log("\n6) Karma");
m = matchSentence("Heute ich gehe ins Kinno", T);
check("sıra + yazım → wrong değil, sıra sayılmıyor (kelime sayısı aynı ama typo var)", m.verdict === "wrong" || m.verdict === "order", marks(m));
m = matchSentence("Der Zug fährt gleich ab.", "Der Zug fährt gleich ab.");
check("ayrılabilir fiil tam", m.verdict === "exact");
m = matchSentence("Der Zug abfährt gleich.", "Der Zug fährt gleich ab.");
check("ayrılabilir fiil birleşik yazılmış → wrong (eksik/fazla)", m.verdict === "wrong");

/* Konuşma üretim adımının yanlış cevabı: kural ipucu mu, "istenen cümleden
   farklı" mı (denetim T16). Hedef ve eşdeğeri içerikten (de-b1-bewerbung). */
console.log("\n7) Üretim adımı geri bildirimi");
const W = "Ich möchte die Stelle, weil ich Deutsch spreche";
const WA = ["Ich möchte diese Stelle, weil ich Deutsch spreche"];
check("başka anlamda doğru kurulmuş cümle → other (kural uyarısı yok)", produceMiss("Ich möchte diese Stelle, weil ich viel Erfahrung habe.", W, WA) === "other");
check("hedef + iki eklenmiş kelime, sıra doğru → other", produceMiss("Ich möchte die Stelle, weil ich sehr gut Deutsch spreche", W, WA) === "other");
check("başka dilde cevap → other", produceMiss("Bu pozisyonu istiyorum", W, WA) === "other");
check("fiil sonda değil → hint", produceMiss("Ich möchte die Stelle, weil ich spreche Deutsch.", W, WA) === "hint");
check("sıra bozuk + eklenmiş kelimeler → hint", produceMiss("Ich möchte die Stelle weil ich spreche sehr gut Deutsch", W, WA) === "hint");
check("tek kelime farkı (çekim) → hint", produceMiss("Ich wohne seit ein Jahr hier", "Ich wohne seit einem Jahr hier") === "hint");
check("fazladan tek kelime (zu) → hint", produceMiss("Ich muss zu arbeiten", "Ich muss arbeiten") === "hint");
check("yarım cümle → hint", produceMiss("Ich möchte die Stelle", W, WA) === "hint");

/* Dilbilgisi farkı yazım hatası değil (QA 2026-10-09): yeniden yaz görevinde
   çekim hatası "küçük yazım hatası" diye geçiyordu. */
console.log("\n8) Dilbilgisi farkı yazım sayılmaz");
const notSpelling = (typed: string, target: string, lang: "de" | "en" = "de") => {
  const r = matchSentence(typed, target, [], lang);
  return r.verdict !== "exact" && r.verdict !== "spelling";
};
check("QA: kein ↔ keine (olumsuz yeniden yaz)", notSpelling("Ich habe kein Katze.", "Ich habe keine Katze."));
check("QA: kommst ↔ kommen (resmî yeniden yaz)", notSpelling("Woher kommst Sie?", "Woher kommen Sie?"));
check("artikel: den ↔ dem", notSpelling("Ich fahre mit den Bus.", "Ich fahre mit dem Bus."));
check("artikel: einen ↔ einem", notSpelling("Ich wohne in einen Haus.", "Ich wohne in einem Haus."));
check("iyelik: meine ↔ meinem", notSpelling("Ich spreche mit meine Mutter.", "Ich spreche mit meiner Mutter."));
check("dies-: diese ↔ dieser", notSpelling("Ich kaufe dieser Jacke.", "Ich kaufe diese Jacke."));
check("zamir: mich ↔ mir", notSpelling("Kannst du mich helfen?", "Kannst du mir helfen?"));
check("am ↔ im", notSpelling("Ich bin am Büro.", "Ich bin im Büro."));
check("umlaut: schon ↔ schön", notSpelling("Das ist schon.", "Das ist schön."));
check("umlaut: Mutter ↔ Mütter", notSpelling("Die Mutter sind hier.", "Die Mütter sind hier."));
check("umlaut: Bruder ↔ Brüder", notSpelling("Meine Bruder spielen Fußball.", "Meine Brüder spielen Fußball."));
check("çekim eki: Katze ↔ Katzen", notSpelling("Ich habe zwei Katze.", "Ich habe zwei Katzen."));
check("çekim eki: mache ↔ machst", notSpelling("Was machst ich heute?", "Was mache ich heute?"));
check("çekim eki: hat ↔ hast", notSpelling("Du hat ein Auto.", "Du hast ein Auto."));
check("İngilizce: go ↔ goes", notSpelling("She go to school.", "She goes to school.", "en"));
check("İngilizce: a ↔ an", notSpelling("I eat a apple.", "I eat an apple.", "en"));
check("İngilizce: is ↔ are", notSpelling("They is happy.", "They are happy.", "en"));
const spelled = (typed: string, target: string, lang: "de" | "en" = "de") => matchSentence(typed, target, [], lang).verdict === "spelling";
check("gerçek yazım: Shule → Schule", spelled("Ich gehe in die Shule.", "Ich gehe in die Schule."));
check("gerçek yazım: Wohnug → Wohnung", spelled("Meine Wohnug ist klein.", "Meine Wohnung ist klein."));
check("gerçek yazım: harf yer değişimi (Frühstcük → Frühstück)", spelled("Ich esse Frühstcük.", "Ich esse Frühstück."));
check("gerçek yazım: Kinno → Kino", spelled("Ich gehe heute ins Kinno", T));
check("gerçek yazım: İngilizce recieve → receive", spelled("I receive a letter.", "I recieve a letter.", "en"));
check("gerçek yazım: Strasse ↔ Straße tam", matchSentence("Die Strasse ist lang.", "Die Straße ist lang.").verdict === "exact");
/* Telaffuz puanı eski toleransı istiyor: tanıyıcı çekim sonunu yutabiliyor. */
check("loose: çekim farkı yakın kalır (telaffuz)", matchSentence("Ich habe kein Katze", "Ich habe keine Katze", [], "de", { loose: true }).verdict === "spelling");
check("produceMiss: çekim farkı hâlâ ipucu", produceMiss("Woher kommst Sie?", "Woher kommen Sie?") === "hint");

/* Kısa yazılı cevaplar (`written`: boşluk doldurma, kısa cevap, dikte, form):
   aynı ölçüt, bütün dizede (QA #36: "Hunden" istenirken "Hunde" doğru sayıldı).
   Kural `skills/quiz` `written` ile birebir. */
console.log("\n9) Kısa yazılı cevap (written)");
const writtenOk = (typed: string, answer: string, lang: "de" | "en" = "de") => {
  const t = foldCompare(typed, lang);
  const f = foldCompare(answer, lang);
  return f === t || (f.length >= 5 && levenshtein(f, t) <= 1 && typoOnly(t, f, lang));
};
check("QA #36: Hunde ↔ Hunden geçmez", !writtenOk("Hunde", "Hunden"));
check("Katze ↔ Katzen geçmez", !writtenOk("Katze", "Katzen"));
check("schon ↔ schön geçmez", !writtenOk("schon", "schön"));
check("çok kelimede çekim farkı geçmez (einen Hund ↔ einem Hund)", !writtenOk("mit einen Hund", "mit einem Hund"));
check("Wohnug → Wohnung geçer", writtenOk("Wohnug", "Wohnung"));
check("Shule → Schule geçer", writtenOk("Shule", "Schule"));
check("Montga → Montag geçmez (iki harf, eski kural da)", !writtenOk("Montga", "Montag"));
check("Strasse ↔ Straße tam", writtenOk("Strasse", "Straße"));

/* Konuşma anlatımında YAZILAN cevap: iki platformda tek kural (QA 2026-10-09). */
console.log("\n10) Yazılan ders cevabı (judgeTyped)");
const jt = (typed: string, target: string, accept: string[] = [], lang: "de" | "en" = "de") => judgeTyped(typed, target, accept, lang);
check("V2 hatası geçmez, kontrole gider", !jt("Zum Frühstück ich trinke einen Tee", "Zum Frühstück trinke ich einen Tee").pass && jt("Zum Frühstück ich trinke einen Tee", "Zum Frühstück trinke ich einen Tee").rescuable);
check("başka kuruluş yerelde geçmez, kontrole gider", jt("Meine Mutter und mein Vater kommen zum Fest", "Meine Eltern kommen zum Fest").rescuable);
check("tam doğru geçer", jt("ich hätte gern zwei Flaschen Wasser", "Ich hätte gern zwei Flaschen Wasser.").pass);
check("eşdeğer cevap (accept) geçer", jt("Zwei Flaschen Wasser, bitte.", "Ich hätte gern zwei Flaschen Wasser", ["Zwei Flaschen Wasser, bitte"]).pass);
check("yazım hatası geçer", jt("Ich hätte gern zwei Flaschen Wasesr", "Ich hätte gern zwei Flaschen Wasser").pass);
check("çekim hatası geçmez", !jt("Ich habe kein Katze", "Ich habe keine Katze").pass);
check("kesmesiz İngilizce (dont) geçer", jt("I dont know", "I don't know", [], "en").pass);
check("iki kelime kontrole gitmez", !jt("Hallo du", "Guten Tag").rescuable);

console.log("\n11) Dizme (arrange) ve üretim kaynağı");
check("aynı parçalar → sameTiles", sameTiles("Morgen kaufe ich ein", "Ich kaufe morgen ein."));
check("başka sözcük → sameTiles değil", !sameTiles("Morgen kaufe ich nichts", "Ich kaufe morgen ein"));
check("alternatif dizilişi kabul", arrangedAccepted("Morgen kaufe ich ein", ["Ich kaufe morgen ein", "Morgen kaufe ich ein."]));
check("yazılı değilse kabul değil", !arrangedAccepted("Morgen kaufe ich ein", ["Ich kaufe morgen ein"]));
check("cümle dizme kontrole gider", arrangedRescuable("Morgen kaufe ich ein", "Ich kaufe morgen ein", ["Ich", "kaufe", "morgen", "ein"]));
check("olay sıralaması kontrole gitmez", !arrangedRescuable("Er isst. Er steht auf. Er geht.", "Er steht auf. Er isst. Er geht.", ["Er steht auf.", "Er isst.", "Er geht."]));
check("accept'ten dizme alternatifi", JSON.stringify(orderAlternatives("Ich kaufe morgen ein", ["Morgen kaufe ich ein", "Ich gehe morgen einkaufen"])) === JSON.stringify(["Morgen kaufe ich ein"]));
const SAY = [{ lang: "tr", text: "Şimdi sen: 'Yarın alışveriş yapıyorum.' demek için ne dersin?" }];
check("tırnaklı anadil cümlesi", quotedSource(SAY, "de") === "Yarın alışveriş yapıyorum.", String(quotedSource(SAY, "de")));
check("hedef dil parçası kaynak değil", quotedSource([{ lang: "tr", text: "İkinci kalıp:" }, { lang: "de", text: "'Ich kaufe ein'" }], "de") === null);
check("ek almış kesme işareti tırnak sayılmaz", quotedSource([{ lang: "tr", text: "Ali'nin evi nerede, nasıl sorarsın?" }], "de") === null);
check("tırnak yoksa anlatımın tamamı kaynak", produceSource([{ lang: "tr", text: "Gömleği deneyebilir misin diye sor." }], "de") === "Gömleği deneyebilir misin diye sor.");

// QA F-0020: üretim adımının yanlışında hakemin farkı; ipucu yalnız hatanın türüne uyuyorsa.
const lines = (typed: string, target: string, lang: "de" | "en" = "de") => {
  const m = matchSentence(typed, target, [], lang);
  return diffLines(m.target, m.typed, lang).map((l) => `${l.kind}:${l.typed ? l.typed + ">" : ""}${l.word}`).join(" ");
};
check("çekim eki eşleniyor (Tag → Tage)", lines("Die Lieferung dauert zwei Tag.", "Die Lieferung dauert zwei Tage.") === "form:Tag>Tage", lines("Die Lieferung dauert zwei Tag.", "Die Lieferung dauert zwei Tage."));
check("artikel çifti biçim", lines("Ich sehe der Mann", "Ich sehe den Mann") === "form:der>den", lines("Ich sehe der Mann", "Ich sehe den Mann"));
check("aynı yerde başka kelime → word", lines("Ich wohne nach Berlin", "Ich wohne in Berlin") === "word:nach>in", lines("Ich wohne nach Berlin", "Ich wohne in Berlin"));
check("eksik + fazla ayrı boşlukta eşlenmez", lines("Ich muss zu arbeiten", "Ich muss arbeiten") === "extra:zu", lines("Ich muss zu arbeiten", "Ich muss arbeiten"));
check("yazım hatası typo satırı", lines("Ich gehe ins Kinno", "Ich gehe ins Kino") === "typo:Kinno>Kino", lines("Ich gehe ins Kinno", "Ich gehe ins Kino"));
check("sıra hatası moved", /moved:/.test(lines("Heute ich gehe ins Kino", "Heute gehe ich ins Kino")), lines("Heute ich gehe ins Kino", "Heute gehe ich ins Kino"));
check("sıra ipucu", JSON.stringify(hintFocus("Önce teslimat, sonra fiil, en sonda süre:")) === JSON.stringify({ order: true, form: false }));
check("biçim ipucu", JSON.stringify(hintFocus("Anne dişil bir kelime, bu yüzden iyelik sonuna bir harf alır:")) === JSON.stringify({ order: false, form: true }));
check("karma ipucu", JSON.stringify(hintFocus("Yardımcı fiil ikinci sırada kalır, geçmiş biçim en sona gider:")) === JSON.stringify({ order: true, form: true }));
check("İngilizce sıra ipucu", hintFocus("First you, then the verb, the duration at the end:").order && !hintFocus("First you, then the verb, the duration at the end:").form);
check("Almanca biçim ipucu", !hintFocus("Mutter ist feminin, das Possessiv bekommt eine Endung:").order);
const ORDER_HINT = "Önce teslimat, sonra fiil, en sonda süre:";
const pf1 = produceFeedback("Die Lieferung dauert zwei Tag.", "Die Lieferung dauert zwei Tage.", [], ORDER_HINT);
check("F-0020: çoğul hatasında sıra ipucu yok, fark var", pf1.kind === "diff" && !pf1.hint && pf1.lines.length === 1 && pf1.lines[0].kind === "form", JSON.stringify(pf1));
const pf2 = produceFeedback("Die Lieferung zwei Tage dauert.", "Die Lieferung dauert zwei Tage.", [], ORDER_HINT);
check("F-0020: sıra hatasında sıra ipucu var", pf2.kind === "diff" && pf2.hint, JSON.stringify(pf2));
const pf3 = produceFeedback("Das ist mein Mutter", "Das ist meine Mutter", [], "Anne dişil bir kelime, bu yüzden iyelik sonuna bir harf alır:");
check("F-0020: biçim hatasında biçim ipucu var", pf3.kind === "diff" && pf3.hint, JSON.stringify(pf3));
const pf4 = produceFeedback("Mutter ist das meine", "Das ist meine Mutter", [], "Anne dişil bir kelime, bu yüzden iyelik sonuna bir harf alır:");
check("F-0020: yalnız sıra hatasında biçim ipucu yok", pf4.kind === "diff" && !pf4.hint, JSON.stringify(pf4));
check("F-0020: başka cümle → other", produceFeedback("Bu pozisyonu istiyorum", W, WA, ORDER_HINT).kind === "other");

console.log(failures === 0 ? "\nTÜM TESTLER GEÇTİ" : `\n${failures} TEST BAŞARISIZ`);
process.exit(failures === 0 ? 0 : 1);
