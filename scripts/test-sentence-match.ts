/**
 * Cümle eşleştirme birim testi — `npm run test:match` (WP-10, adım 3).
 * Veritabanı yok; `lib/sentence-match` saf.
 */
import { foldSentence, matchSentence } from "../src/lib/sentence-match";

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

console.log(failures === 0 ? "\nTÜM TESTLER GEÇTİ" : `\n${failures} TEST BAŞARISIZ`);
process.exit(failures === 0 ? 0 : 1);
