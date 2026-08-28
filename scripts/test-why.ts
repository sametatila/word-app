/**
 * "Neden" motoru birim testi — `npm run test:why` (WP-13, adım 1).
 *
 * Veritabanı gerektirmez: `lib/why.ts` saf. Elli kelimelik örneklem: artikel
 * kuralı uyanlar, istisnalar, kuralsızlar; çoğul kalıpları; yazım farkı;
 * cümle sırası. Her satır "metin bunu söylemeli / bunu söylememeli" diye
 * kontrol ediliyor — gerekçenin kendisi insan gözüyle bir kez okundu, burada
 * sabitleniyor ki kural listesi değişince sessizce bozulmasın.
 */
import { articleRule, charDiff, whyFor } from "../src/lib/why";

let failures = 0;
function check(name: string, cond: boolean, detail = "") {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

type W = { de: string; artikel: "der" | "die" | "das"; tr: string; formen?: string; ruleFits: boolean };

/** 50 isim: [de, artikel, tr, formen, kural artikeli tutuyor mu] */
const NOUNS: W[] = [
  { de: "Wohnung", artikel: "die", tr: "daire", formen: "-en", ruleFits: true },
  { de: "Freiheit", artikel: "die", tr: "özgürlük", formen: "-en", ruleFits: true },
  { de: "Möglichkeit", artikel: "die", tr: "olanak", formen: "-en", ruleFits: true },
  { de: "Freundschaft", artikel: "die", tr: "arkadaşlık", formen: "-en", ruleFits: true },
  { de: "Universität", artikel: "die", tr: "üniversite", formen: "-en", ruleFits: true },
  { de: "Nation", artikel: "die", tr: "ulus", formen: "-en", ruleFits: true },
  { de: "Musik", artikel: "die", tr: "müzik", formen: "(Sg.)", ruleFits: true },
  { de: "Natur", artikel: "die", tr: "doğa", formen: "-en", ruleFits: true },
  { de: "Bäckerei", artikel: "die", tr: "fırın", formen: "-en", ruleFits: true },
  { de: "Lehrerin", artikel: "die", tr: "öğretmen (k.)", formen: "-nen", ruleFits: true },
  { de: "Mädchen", artikel: "das", tr: "kız", formen: "-", ruleFits: true },
  { de: "Büchlein", artikel: "das", tr: "kitapçık", formen: "-", ruleFits: true },
  { de: "Dokument", artikel: "das", tr: "belge", formen: "-e", ruleFits: true },
  { de: "Museum", artikel: "das", tr: "müze", formen: "Museen", ruleFits: true },
  { de: "Eigentum", artikel: "das", tr: "mülk", formen: "(Sg.)", ruleFits: true },
  { de: "Gebäude", artikel: "das", tr: "bina", formen: "-", ruleFits: true },
  { de: "Auto", artikel: "das", tr: "araba", formen: "-s", ruleFits: true },
  { de: "Thema", artikel: "das", tr: "konu", formen: "Themen", ruleFits: true },
  { de: "Tourismus", artikel: "der", tr: "turizm", formen: "(Sg.)", ruleFits: true },
  { de: "Lehrling", artikel: "der", tr: "çırak", formen: "-e", ruleFits: true },
  { de: "Motor", artikel: "der", tr: "motor", formen: "-en", ruleFits: true },
  { de: "Tourist", artikel: "der", tr: "turist", formen: "-en", ruleFits: true },
  { de: "Student", artikel: "der", tr: "öğrenci", formen: "-en", ruleFits: true },
  { de: "Lehrer", artikel: "der", tr: "öğretmen", formen: "-", ruleFits: true },
  { de: "Schlüssel", artikel: "der", tr: "anahtar", formen: "-", ruleFits: true },
  { de: "Blume", artikel: "die", tr: "çiçek", formen: "-n", ruleFits: true },
  { de: "Lampe", artikel: "die", tr: "lamba", formen: "-n", ruleFits: true },
  { de: "Straße", artikel: "die", tr: "sokak", formen: "-n", ruleFits: true },
  // istisnalar: kural var ama uymuyor
  { de: "Junge", artikel: "der", tr: "oğlan", formen: "-n", ruleFits: false },
  { de: "Name", artikel: "der", tr: "ad", formen: "-n", ruleFits: false },
  { de: "Käse", artikel: "der", tr: "peynir", formen: "(Sg.)", ruleFits: false },
  { de: "Auge", artikel: "das", tr: "göz", formen: "-n", ruleFits: false },
  { de: "Ende", artikel: "das", tr: "son", formen: "-n", ruleFits: false },
  { de: "Butter", artikel: "die", tr: "tereyağı", formen: "(Sg.)", ruleFits: false },
  { de: "Mutter", artikel: "die", tr: "anne", formen: "¨-", ruleFits: false },
  { de: "Fenster", artikel: "das", tr: "pencere", formen: "-", ruleFits: false },
  { de: "Zimmer", artikel: "das", tr: "oda", formen: "-", ruleFits: false },
  { de: "Irrtum", artikel: "der", tr: "yanılgı", formen: "¨-er", ruleFits: false },
  { de: "Datum", artikel: "das", tr: "tarih", formen: "Daten", ruleFits: true },
  // kuralsız tek heceliler
  { de: "Tisch", artikel: "der", tr: "masa", formen: "-e", ruleFits: true },
  { de: "Stuhl", artikel: "der", tr: "sandalye", formen: "¨-e", ruleFits: true },
  { de: "Buch", artikel: "das", tr: "kitap", formen: "¨-er", ruleFits: true },
  { de: "Kind", artikel: "das", tr: "çocuk", formen: "-er", ruleFits: true },
  { de: "Haus", artikel: "das", tr: "ev", formen: "¨-er", ruleFits: true },
  { de: "Hand", artikel: "die", tr: "el", formen: "¨-e", ruleFits: true },
  { de: "Stadt", artikel: "die", tr: "şehir", formen: "¨-e", ruleFits: true },
  { de: "Arzt", artikel: "der", tr: "doktor", formen: "¨-e", ruleFits: true },
  { de: "Bild", artikel: "das", tr: "resim", formen: "-er", ruleFits: true },
  { de: "Frau", artikel: "die", tr: "kadın", formen: "-en", ruleFits: true },
  { de: "Tag", artikel: "der", tr: "gün", formen: "-e", ruleFits: true },
];

console.log("\n1) Artikel gerekçeleri (50 isim)");
let ruled = 0;
for (const n of NOUNS) {
  const rule = articleRule(n.de);
  const why = whyFor({ type: "article", word: { de: n.de, artikel: n.artikel, tr: n.tr, formen: n.formen }, detail: n.artikel === "der" ? "die" : "der" });
  const mentionsTarget = why.text.includes(`${n.artikel} ${n.de}`);
  if (rule) ruled++;
  if (rule && rule.artikel === n.artikel) {
    check(`${n.de}: kural uyuyor (${rule.artikel})`, n.ruleFits && mentionsTarget && !why.text.includes("istisna"), why.text);
  } else if (rule) {
    check(`${n.de}: istisna (${rule.artikel} bekleniyor, ${n.artikel})`, !n.ruleFits && why.text.includes("istisna") && why.text.includes(`${n.de} ${n.artikel}`), why.text);
  } else {
    check(`${n.de}: kuralsız → ezberle`, mentionsTarget && why.text.includes("ezberle"), why.text);
  }
}
check("gerekçelerin hepsi seçilen yanlışı anıyor", NOUNS.every((n) => whyFor({ type: "article", word: { ...n }, detail: "xyz" }).text.startsWith("„xyz“ değil")));
check("en az 35 isimde kural var", ruled >= 35, `ruled=${ruled}`);
check("gerekçede cheatsheet bağlantısı yok (kaldırıldı)", NOUNS.every((n) => whyFor({ type: "article", word: { ...n } }).href === null));

console.log("\n2) Çoğul gerekçeleri");
const arzt = whyFor({ type: "plural", word: { de: "Arzt", artikel: "der", tr: "doktor", formen: "¨-e" }, detail: "Arzte" });
check("umlaut + -e kalıbı ve doğru biçim", arzt.text.includes("umlaut") && arzt.text.includes("die Ärzte") && arzt.text.startsWith("„Arzte“ değil „Ärzte“"), arzt.text);
const frau = whyFor({ type: "plural", word: { de: "Frau", artikel: "die", tr: "kadın", formen: "-en" } });
check("-(e)n dişil kalıbı", frau.text.includes("-(e)n") && frau.text.includes("die Frauen"), frau.text);
const lehrer = whyFor({ type: "plural", word: { de: "Lehrer", artikel: "der", tr: "öğretmen", formen: "-" } });
check("değişmeyen çoğul", lehrer.text.includes("değişmez") && lehrer.text.includes("die Lehrer"), lehrer.text);
const museum = whyFor({ type: "plural", word: { de: "Museum", artikel: "das", tr: "müze", formen: "Museen" } });
check("düzensiz çoğul → ezberle", museum.text.includes("ezberle"), museum.text);
const fromRound = whyFor({ type: "plural", word: { de: "Arzt", artikel: "der", tr: "doktor" }, detail: "Ärzten", correct: "Ärzte" });
check("formen yokken doğru biçim turdan alınıyor", fromRound.text.includes("umlaut") && fromRound.text.includes("die Ärzte") && !fromRound.text.includes("Arzte"), fromRound.text);
const irregular = whyFor({ type: "plural", word: { de: "Museum", artikel: "das", tr: "müze" }, detail: "Museums", correct: "Museen" });
check("kalıba uymayan doğru biçim → ezberle ama biçim gösteriliyor", irregular.text.includes("ezberle") && irregular.text.includes("die Museen"), irregular.text);
check("çoğul bağlantısı yok (kaldırıldı)", frau.href === null);

console.log("\n3) Yazım farkı");
const d = charDiff("Katse", "Katze");
check("fazla harf s, eksik harf z", d.typed.some((s) => s.kind === "extra" && s.text === "s") && d.target.some((s) => s.kind === "missing" && s.text === "z"), JSON.stringify(d));
const sp = whyFor({ type: "spelling", word: { de: "Katze", artikel: "die", tr: "kedi" }, detail: "Katse" });
check("z ipucu", sp.text.includes("ts"), sp.text);
check("fark taşınıyor", Boolean(sp.diff), "");
const sp2 = whyFor({ type: "spelling", word: { de: "Straße", artikel: "die", tr: "sokak" }, detail: "Strase" });
check("ß ipucu", sp2.text.includes("ß"), sp2.text);
const sp3 = whyFor({ type: "spelling", word: { de: "Vater", artikel: "der", tr: "baba" }, detail: "Fater" });
check("v/f ipucu", sp3.text.includes("v harfi"), sp3.text);
const d2 = charDiff("Kino", "Kino");
check("aynı kelimede fark yok", d2.typed.every((s) => s.kind === "same") && d2.target.every((s) => s.kind === "same"));

console.log("\n4) Cümle sırası");
const v1 = whyFor({ type: "verb_position", answer: ["Heute", "gehe", "ich", "ins", "Kino"], tail: "." });
check("zarfla başlayan ana cümle", v1.text.includes("„Heute“") && v1.text.includes("SONRA"), v1.text);
const v2 = whyFor({ type: "verb_position", answer: ["Ich", "bleibe", "zu", "Hause,", "weil", "ich", "krank", "bin"], tail: "." });
check("weil yan cümlesi → fiil sona", v2.text.includes("„weil“") && v2.text.includes("sona"), v2.text);
const v3 = whyFor({ type: "verb_position", answer: ["Kommst", "du", "mit"], tail: "?" });
check("evet/hayır sorusu → fiil başta", v3.text.includes("başına"), v3.text);
const v4 = whyFor({ type: "verb_position", answer: ["Wann", "kommst", "du"], tail: "?" });
check("soru kelimesi → fiil ikinci", v4.text.includes("Soru kelimesinden"), v4.text);
const v5 = whyFor({ type: "verb_position", answer: ["Ich", "gehe", "ins", "Kino"], tail: "." });
check("düz ana cümle", v5.text.includes("ikinci sırada"), v5.text);
check("kelime sırası bağlantısı yok (kaldırıldı)", whyFor({ type: "word_order" }).href === null);

console.log("\n5) Diğer tipler boş dönmüyor");
for (const type of ["case", "conjugation", "meaning", "listening", "pronunciation"] as const) {
  const w = whyFor({ type, word: { de: "Katze", artikel: "die", tr: "kedi" }, detail: "köpek" });
  check(`${type}: metin var`, w.text.length > 10 && w.type === type, w.text);
}
check("anlam hatası seçileni anıyor", whyFor({ type: "meaning", word: { de: "Katze", artikel: "die", tr: "kedi" }, detail: "köpek" }).text.includes("„köpek“"));

console.log(failures === 0 ? "\nTÜM TESTLER GEÇTİ" : `\n${failures} TEST BAŞARISIZ`);
process.exit(failures === 0 ? 0 : 1);
