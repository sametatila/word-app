/**
 * F7 sunucu-tarafı nesnel sınav puanlaması birim testi.
 * Çalıştır: npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/test-exam-grade.ts
 */
import assert from "node:assert";
import { buildAnswerKey, sealKey, openKey, gradeObjective, signScore, verifyScore, resolveSpokenWritten } from "../src/lib/exam-grade";
import type { ExamPaper } from "../src/lib/exam-types";

const USER = "user-123";

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
    speaking: [{ id: "s:A1:0", de: "Guten Tag" }, { id: "s:A1:1", de: "Auf Wiedersehen" }],
    writing: [{ id: "w:A1:0", task: { kind: "free" } }],
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

// ---- İmzalı skor jetonu (yazma/konuşma, F7 kalıntısı) ----
assert.deepStrictEqual(key.writingIds, ["w:A1:0"], "writingIds anahtardan");
assert.deepStrictEqual(key.speakingIds, ["s:A1:0", "s:A1:1"], "speakingIds anahtardan");

// 7) sign → verify round-trip + userId/kind/exerciseId bağlama
const wTok = signScore(USER, "writing", "w:A1:0", 85);
assert.deepStrictEqual(verifyScore(wTok, USER), { kind: "writing", exerciseId: "w:A1:0", score: 85 }, "writing jeton doğrulanmalı");
assert.strictEqual(verifyScore(wTok, "baska-user"), null, "başka userId → null");
assert.strictEqual(verifyScore(wTok.slice(0, -3) + "xxx", USER), null, "kurcalanmış imza → null");
assert.strictEqual(verifyScore("a.b", USER), null, "çöp jeton → null");

// 8) resolveSpokenWritten: geçerli + sınav maddesine bağlı jetonlar → sunucu skoru
const s0 = signScore(USER, "speaking", "s:A1:0", 70);
const s1 = signScore(USER, "speaking", "s:A1:1", 90);
const r1 = resolveSpokenWritten(key, USER, wTok, [s0, s1]);
assert.strictEqual(r1.writingScore, 85, "writing skoru imzalı jetondan");
assert.strictEqual(r1.speakingScore, 80, "speaking = (70+90)/2 sunucuda ortalanmış");

// 9) Anahtarda OLMAYAN exerciseId jetonu reddedilir (başka sınavın jetonu)
const foreign = signScore(USER, "speaking", "s:ZZ:9", 100);
assert.strictEqual(resolveSpokenWritten(key, USER, null, [foreign]).speakingScore, null, "yabancı exerciseId → sayılmaz");
// yanlış kind (writing jetonu speaking listesinde) reddedilir
assert.strictEqual(resolveSpokenWritten(key, USER, null, [wTok]).speakingScore, null, "yanlış kind → sayılmaz");

// 10) Aynı madde jetonu tekrarı bir kez sayılır (ortalama şişirme engeli)
assert.strictEqual(resolveSpokenWritten(key, USER, null, [s1, s1, s1]).speakingScore, 90, "tekrar eden madde bir kez → 90");

// 11) Jeton yoksa null (çağıran istemci skoruna düşer = geriye uyumlu)
assert.deepStrictEqual(resolveSpokenWritten(key, USER, null, null), { writingScore: null, speakingScore: null }, "jeton yok → null (fallback)");
// forge edilen ham skor işe yaramaz: jeton olmadan writingScore alınamaz
assert.strictEqual(resolveSpokenWritten(key, USER, "duzmece-jeton", null).writingScore, null, "düzmece jeton → null");

console.log("✓ exam-grade: 11 senaryo geçti (nesnel puanlama + imzalı yazma/konuşma skor jetonu; forgery kapalı)");
