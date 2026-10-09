/**
 * Ayrılabilir fiil denetimi (`lib/separable-check`, QA F-0072) — `npm run test:separable`.
 *
 * Model çağırmıyor: kalıptan fiil çıkarma, cevapta öneksiz gövdeyi bulma,
 * "kalıbın çerçevesi" ayrımı (yalnız orada hata zorlanır) ve hatanın puana
 * işlenmesi etiketli örneklerle ölçülüyor. Fiil listesinin words.json ile
 * güncelliği de burada.
 */
import { readFileSync } from "node:fs";
import type { AssessRequest, Assessment } from "../src/lib/assess-prompts";
import { enforceSeparable, findSeparableMisses, separableNotes } from "../src/lib/separable-check";

let failed = 0;
function check(name: string, ok: boolean, detail?: unknown) {
  if (ok) console.log(`✓ ${name}`);
  else {
    failed++;
    console.log(`✗ ${name}${detail === undefined ? "" : `\n    ${JSON.stringify(detail)}`}`);
  }
}

const VERLAUFEN = ["Ich habe mich verlaufen.", "Nehmen Sie die zweite Straße.", "Biegen Sie an der Ampel rechts ab."];
const req = (targets: string[], lang: "de" | "en" = "de"): Pick<AssessRequest, "task" | "lang"> => ({ task: { prompt: "x", targets }, lang });

/** [ad, kalıplar, cevap, beklenen: null = bulgu yok, "weak" = yalnız not, "strong" = hata zorlanır] */
const CASES: [string, string[], string, null | "weak" | "strong", string?][] = [
  ["F-0072 cümlesi", VERLAUFEN, "Ich nehme die zweite Strasse und biege an der Ampel rechts.", "strong", "biege an der Ampel rechts"],
  ["F-0072 sohbet, 3. satır", VERLAUFEN, "Entschuldigung, ich habe mich verlaufen.\nWo ist die Altstadt?\nIch nehme die zweite Strasse und biege an der Ampel rechts.\nDanke!", "strong", "biege an der Ampel rechts"],
  ["doğru: önek sonda", VERLAUFEN, "Ich biege an der Ampel rechts ab.", null],
  ["doğru: önek sonda + virgül", VERLAUFEN, "Dann biege ich an der Ampel rechts ab, danke.", null],
  ["doğru: bitişik mastar", VERLAUFEN, "Wo muss ich abbiegen?", null],
  ["doğru: bitişik ortaç", VERLAUFEN, "Ich bin an der Ampel rechts abgebogen.", null],
  ["kısa: biege rechts", VERLAUFEN, "Ich biege rechts.", "strong", "biege rechts"],
  ["yön tümleci: yalnız not", VERLAUFEN, "Ich biege rechts in die Goethestraße.", "weak"],
  ["yan cümle sonu: dokunma", VERLAUFEN, "Ich weiß nicht, wo ich rechts biege.", null],
  ["kalıp …: önek eksik", ["Ich stehe um … auf."], "Ich stehe um sieben.", "strong", "stehe um sieben"],
  ["kalıp …: öneksiz anlam doğru, dokunma", ["Ich stehe um … auf."], "Ich stehe an der Haltestelle.", null],
  ["kalıp …: doğru", ["Ich stehe um … auf."], "Ich stehe um sieben Uhr auf.", null],
  ["umsteigen: çerçeve", ["Ich steige in Hannover um."], "Ich steige in Hannover.", "strong", "steige in Hannover"],
  ["steigen in den Zug: ortak yalnız edat, dokunma", ["Ich steige in Hannover um."], "Und dann steige ich in den Zug nach Berlin.", null],
  ["kalıp …, edat çerçevesi uzun tümcede dokunma", ["Die Arbeit fängt um … an."], "Die Arbeit fängt um die Ecke mit viel Lärm.", null],
  ["anrufen: çerçevesi yalnız zamir, dokunma", ["Rufst du mich an?"], "Ich rufe dich morgen.", null],
  ["başka önek sonda: zurückrufen", ["Ich rufe später an."], "Ich rufe dich später zurück.", null],
  ["anrufen: çerçeve (später)", ["Ich rufe später an."], "Ich rufe dich später.", "strong", "rufe dich später"],
  ["ortak artikel çerçeve değil", ["Stell die Blumen bitte dort hin."], "Wohin stelle ich die?", null],
  ["öneksiz kendi anlamı: geben", ["Ich gebe es dir zurück."], "Ich gebe dir den Zettel.", null],
  ["içerikteki yanlış örnek: fängt um neun", ["Die Arbeit fängt um … an."], "Die Arbeit fängt um neun.", "strong", "fängt um neun"],
  ["anrufen: doğru, dolgu sonda", ["Rufst du mich an?"], "Ruf mich an bitte.", null],
  ["güçlü gövde: mitnehmen", ["Ich nehme nur Handgepäck mit."], "Ich nehme nur Handgepäck.", "strong", "nehme nur Handgepäck"],
  ["güçlü gövde 3. tekil", ["Ich nehme nur Handgepäck mit."], "Er nimmt nur Handgepäck.", "strong", "nimmt nur Handgepäck"],
  ["büyük harfli son sözcük önek değil", ["Wer kommt zum Fest?"], "Ich komme.", null],
  ["sözlükte olmayan birleşik: zusammen", ["Wir feiern zusammen."], "Wir feiern heute.", null],
  ["İngilizce kurs: denetim yok", VERLAUFEN, "Ich biege an der Ampel rechts.", null],
];

for (const [name, targets, text, want, wrong] of CASES) {
  const misses = findSeparableMisses(text, req(targets, name.startsWith("İngilizce") ? "en" : "de"));
  const got = misses.length ? (misses.some((m) => m.strong) ? "strong" : "weak") : null;
  const okWrong = !wrong || misses.some((m) => m.wrong === wrong && text.slice(m.start, m.end) === wrong);
  check(`${name}: ${want ?? "yok"}`, got === want && okWrong, misses);
}

const notes = separableNotes(findSeparableMisses("Ich biege an der Ampel rechts.", req(VERLAUFEN)));
check("not: kalıp, fiil ve öneki söylüyor", notes.length === 1 && /„abbiegen“/.test(notes[0]) && /„ab“/.test(notes[0]) && /hata yazma/.test(notes[0]), notes);

const TEXT = "Entschuldigung, ich habe mich verlaufen.\nIch nehme die zweite Strasse und biege an der Ampel rechts.";
const misses = findSeparableMisses(TEXT, req(VERLAUFEN));
const clean: Assessment = {
  score: { task: 4, grammar: 4, vocab: 4, structure: 4, overall: 100 },
  errors: [],
  corrected: TEXT,
  praise_tr: "",
  next_tip_tr: "",
};
const forced = enforceSeparable(clean, misses, "tr");
check(
  "zorlama: hata eklenir, dil bilgisi 3, genel puan düşer, düzeltme öneki taşır",
  forced.errors.length === 1 &&
    forced.errors[0].type === "verb_position" &&
    forced.errors[0].fix === "biege an der Ampel rechts ab" &&
    TEXT.slice(...forced.errors[0].span) === "biege an der Ampel rechts" &&
    forced.score.grammar === 3 &&
    forced.score.overall < 100 &&
    forced.corrected.endsWith("biege an der Ampel rechts ab."),
  forced,
);
check("zorlama: geri bildirim dili", /trennbares Verb/.test(enforceSeparable(clean, misses, "de").errors[0]?.why_tr ?? "") && /separable verb/.test(enforceSeparable(clean, misses, "en").errors[0]?.why_tr ?? ""));
const already: Assessment = {
  ...clean,
  score: { ...clean.score, grammar: 3, overall: 93 },
  errors: [{ span: [0, 0], wrong: "biege an der Ampel rechts", type: "verb_position", fix: "biege an der Ampel rechts ab", why_tr: "x" }],
};
check("zorlama: model zaten yazdıysa dokunmaz", enforceSeparable(already, misses, "tr") === already);
const weakOnly = findSeparableMisses("Ich biege rechts in die Goethestraße.", req(VERLAUFEN));
check("zorlama: yalnız notluk bulguda puana dokunmaz", enforceSeparable(clean, weakOnly, "tr") === clean);

void (async () => {
  const { separableVerbs } = (await import("./gen-separable-verbs.mjs")) as { separableVerbs: () => string[][] };
  const committed = JSON.parse(readFileSync("src/lib/separable-verbs.generated.json", "utf8")) as string[][];
  check("fiil listesi words.json ile güncel (node scripts/gen-separable-verbs.mjs)", JSON.stringify(separableVerbs()) === JSON.stringify(committed));

  console.log(failed ? `\n${failed} test düştü` : "\nhepsi geçti");
  process.exit(failed ? 1 : 0);
})();
