/**
 * F7 sunucu-tarafı nesnel sınav puanlaması birim testi.
 * Çalıştır: npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/test-exam-grade.ts
 */
import assert from "node:assert";
import { buildAnswerKey, sealKey, openKey, gradeObjective } from "../src/lib/exam-grade";
import type { ExamPaper } from "../src/lib/exam-types";

// Yalnız buildAnswerKey'in okuduğu bölümleri kuran minimal kâğıt.
const paper = {
  sections: {
    vocab: [],
    grammar: [
      { kind: "cell", key: "k", label: "l", options: ["a", "b", "c"], answer: 1 },
      { kind: "judge", statement: "s", answer: true, why: [] },
    ],
    produce: [
      { id: "p1", prompt: "", de: "Ich bin hier", accept: [], mode: "type" },
      { id: "p2", prompt: "", de: "Wie geht es dir", accept: [], mode: "type" },
    ],
    reading: [{ id: "r1", questions: [{ text: "", options: ["x", "y", "z"], answer: 0 }, { text: "", options: ["x", "y", "z"], answer: 2 }] }],
    listening: [{ id: "l1", questions: [{ text: "", options: ["x", "y"], answer: 1 }] }],
    speaking: [],
    writing: [],
  },
} as unknown as ExamPaper;

const key = buildAnswerKey(paper, "de");

// 1) seal → open round-trip
const token = sealKey(key);
const opened = openKey(token);
assert.deepStrictEqual(opened, key, "seal/open round-trip anahtarı korumalı");

// 2) Kurcalanmış token → null
const bad = token.slice(0, -4) + (token.slice(-4) === "AAAA" ? "BBBB" : "AAAA");
assert.strictEqual(openKey(bad), null, "kurcalanmış token reddedilmeli");
assert.strictEqual(openKey("not-base64!!"), null, "çöp token reddedilmeli");

// 3) Tümü DOĞRU seçim → tam puan
const allRight = gradeObjective(key, {
  grammar: [1, 0], // cell=1 doğru; judge true → istemci 0="doğru"
  reading: [[0, 2]],
  listening: [[1]],
  produce: ["Ich bin hier", "Wie geht es dir"],
});
assert.deepStrictEqual(allRight.grammar, { correct: 2, total: 2 }, "grammar tümü doğru");
assert.deepStrictEqual(allRight.reading, { correct: 2, total: 2 }, "reading tümü doğru");
assert.deepStrictEqual(allRight.listening, { correct: 1, total: 1 }, "listening tümü doğru");
assert.deepStrictEqual(allRight.produce, { correct: 2, total: 2 }, "produce tümü doğru");

// 4) BOŞ responses → 0 doğru ama toplam korunur (forgery kapandı: istemci
//    "hepsi doğru" diyemez, seçim göndermeden puan alamaz)
const empty = gradeObjective(key, {});
assert.deepStrictEqual(empty.grammar, { correct: 0, total: 2 }, "boş → grammar 0/2");
assert.deepStrictEqual(empty.reading, { correct: 0, total: 2 }, "boş → reading 0/2");
assert.deepStrictEqual(empty.listening, { correct: 0, total: 1 }, "boş → listening 0/1");
assert.deepStrictEqual(empty.produce, { correct: 0, total: 2 }, "boş → produce 0/2");

// 5) YANLIŞ seçimler → 0
const allWrong = gradeObjective(key, {
  grammar: [0, 1], // cell yanlış; judge true ama 1="yanlış" seçilmiş
  reading: [[1, 1]],
  listening: [[0]],
  produce: ["falsch", "auch falsch"],
});
assert.strictEqual(allWrong.grammar.correct, 0, "grammar tümü yanlış → 0");
assert.strictEqual(allWrong.reading.correct, 0, "reading tümü yanlış → 0");
assert.strictEqual(allWrong.listening.correct, 0, "listening tümü yanlış → 0");
assert.strictEqual(allWrong.produce.correct, 0, "produce tümü yanlış → 0");

// 6) Kısmi + eksik satır güvenli
const partial = gradeObjective(key, { grammar: [1], reading: [[0]], produce: ["Ich bin hier"] });
assert.deepStrictEqual(partial.grammar, { correct: 1, total: 2 }, "kısmi grammar 1/2");
assert.deepStrictEqual(partial.reading, { correct: 1, total: 2 }, "kısmi reading 1/2 (ikinci soru yanıtsız)");
assert.deepStrictEqual(partial.listening, { correct: 0, total: 1 }, "listening yanıtsız 0/1");
assert.deepStrictEqual(partial.produce, { correct: 1, total: 2 }, "kısmi produce 1/2");

console.log("✓ exam-grade: 6 senaryo geçti (seal/open, kurcalama, tümü-doğru, boş, tümü-yanlış, kısmi)");
