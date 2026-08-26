/** Telaffuz puanı birim testi (WP-20): npm run test:pronounce */
import assert from "node:assert/strict";
import { scorePronunciation, syllables, PASS_SCORE } from "../src/lib/pronounce";

const exact = scorePronunciation("Ich wohne in der Stadt.", "ich wohne in der stadt", { words: [
  { word: "ich", start: 0.1, end: 0.3 }, { word: "wohne", start: 0.35, end: 0.7 }, { word: "in", start: 0.75, end: 0.85 }, { word: "der", start: 0.9, end: 1.05 }, { word: "stadt", start: 1.1, end: 1.5 },
] });
assert.equal(exact.wordAccuracy, 100);
assert.equal(exact.completeness, 100);
assert.ok(exact.fluency >= 90, `akıcılık ${exact.fluency}`);
assert.ok(exact.passed && exact.overall >= PASS_SCORE, `tam cümle geçmeli: ${exact.overall}`);

const near = scorePronunciation("Ich wohne in der Stadt.", "ich wohne in der staat", { confusions: [{ heard: ["Staat", "Staate"], fix: "a'yı kısa kes: ŞTAT.", expected: "Stadt" }] });
assert.equal(near.words[4].status, "near");
assert.ok(near.words[4].hint?.includes("ŞTAT"), "sapma ipucu bağlanmalı");
assert.ok(near.overall < 100 && near.overall >= 70, `yakın kelime kısmi puan: ${near.overall}`);

const missing = scorePronunciation("Die Tür ist offen.", "die ist offen");
assert.equal(missing.words[1].status, "missing");
assert.ok(missing.completeness === 75, `bütünlük 3/4: ${missing.completeness}`);
assert.ok(!missing.passed);

const empty = scorePronunciation("Guten Tag.", "");
assert.equal(empty.overall, 0);
assert.equal(empty.words.length, 2);

const slow = scorePronunciation("Ich bin müde.", "ich bin müde", { words: [{ word: "ich", start: 0, end: 0.4 }, { word: "bin", start: 1.5, end: 1.9 }, { word: "müde", start: 3.2, end: 4.0 }] });
assert.ok(slow.pauses === 2 && slow.fluency < 80, `yavaş konuşma: duraklama ${slow.pauses}, akıcılık ${slow.fluency}`);

const extra = scorePronunciation("Ja, gern.", "ja gern ich suche äpfel");
assert.ok(extra.extra.length >= 2 && extra.overall < exact.overall, "fazla kelime cezası");

assert.equal(syllables("Universität"), 5);
console.log("test:pronounce — tam/yakın/eksik/boş/yavaş/fazla: tamam");
