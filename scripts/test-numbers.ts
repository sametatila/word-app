/**
 * Almanca sayı normalizasyonu birim testi: npm run test:numbers
 *
 * Tanıyıcı sayıları rakam yazıyor ("fünf" → "5"); karşılaştırma katlaması
 * ikisini de rakama indirip eşleştirmeli — ama artikeli (ein/eine) ve sayı
 * içeren kelimeleri (Einsamkeit) BOZMAMALI.
 */
import assert from "node:assert/strict";
import { foldNumbers, wordToNumber } from "../src/lib/german-numbers";
import { foldSpelling, spokenMatches } from "../src/components/games/types";
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

console.log("test:numbers — sözcük/rakam/bileşik/artikel/cümle/kelime/telaffuz: tamam");
