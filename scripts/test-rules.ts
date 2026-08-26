/**
 * Kural parçacıkları (WP-73 adım 1) testi: npm run test:rules
 * Her hata tipinin genel kuralı var; kimlikler tekil; bağlantılar var olan
 * tablolara; bağlam → doğru kural; why.ts artık bağlama göre kural seçiyor.
 */
import assert from "node:assert/strict";
import { RULES, ruleFor, uncoveredErrorTypes } from "../src/lib/cheatsheet/rules";
import { CHEATSHEETS } from "../src/lib/cheatsheet/index";
import { whyFor } from "../src/lib/why";
import { CONFUSABLES, confusableHint } from "../src/lib/confusables";

assert.ok(RULES.length >= 30, `en az 30 kural olmalı, ${RULES.length} var`);
assert.deepEqual(uncoveredErrorTypes(), [], "genel kuralı olmayan hata tipi var");
const ids = new Set<string>();
const sheets = new Set(CHEATSHEETS.map((s) => s.id));
for (const x of RULES) {
  assert.ok(!ids.has(x.id), `çift kimlik ${x.id}`);
  ids.add(x.id);
  assert.ok(x.why.length > 0 && x.why.length <= 120, `${x.id}: kural yok ya da uzun`);
  assert.ok(x.example.length > 0, `${x.id}: örnek yok`);
  if (x.link) assert.ok(sheets.has(x.link), `${x.id}: tablo yok (${x.link})`);
}

// Bağlam → kural
assert.equal(ruleFor("case", "Ich fahre mit dem Bus.")?.id, "case.dativ-praep");
assert.equal(ruleFor("case", "Das ist für dich.")?.id, "case.akk-praep");
assert.equal(ruleFor("case", "Ich gehe in die Küche.")?.id, "case.wechsel");
assert.equal(ruleFor("case", "Ich helfe dir.")?.id, "case.dativ-verb");
assert.equal(ruleFor("case", "Ich sehe den Mann.")?.id, "case.akk-mask");
assert.equal(ruleFor("case", "")?.id, "case.general");
assert.equal(ruleFor("conjugation", "Du bist müde.")?.id, "conj.sein");
assert.equal(ruleFor("conjugation", "Ich bin nach Hause gegangen.")?.id, "conj.perfekt-aux");
assert.equal(ruleFor("conjugation", "Ich kann kommen.")?.id, "conj.modal");
assert.equal(ruleFor("conjugation", "sie fährt")?.id, "conj.stem-change");
assert.equal(ruleFor("conjugation", "ich lerne")?.id, "conj.general");
assert.equal(ruleFor("verb_position", "Ich bleibe zu Hause, weil ich krank bin.")?.id, "vpos.subordinate");
assert.equal(ruleFor("verb_position", "Wenn ich Zeit habe, komme ich.")?.id, "vpos.subordinate-first");
assert.equal(ruleFor("verb_position", "Deshalb bleibe ich zu Hause.")?.id, "vpos.adverb-first");
assert.equal(ruleFor("verb_position", "Kommst du mit?")?.id, "vpos.yesno");
assert.equal(ruleFor("verb_position", "Wo wohnst du?")?.id, "vpos.wfrage");
assert.equal(ruleFor("verb_position", "Heute gehe ich ins Kino.")?.id, "vpos.inversion");
assert.equal(ruleFor("word_order", "Ich gebe es ihm.")?.id, "worder.pronoun-first");
assert.equal(ruleFor("word_order", "Ich komme heute nicht.")?.id, "worder.nicht");

// why.ts bağlantısı
const w1 = whyFor({ type: "case", answer: ["Ich", "fahre", "mit", "dem", "Bus"], tail: "." });
assert.ok(w1.text.includes("Dativ"), `case gerekçesi Dativ demeli: ${w1.text}`);
assert.equal(w1.href, "/cheatsheet#a1-praepositionen");
const w2 = whyFor({ type: "conjugation", answer: ["Du", "bist", "müde"], tail: "." });
assert.ok(/sein/i.test(w2.text), `çekim gerekçesi sein demeli: ${w2.text}`);
const w3 = whyFor({ type: "word_order", answer: ["Ich", "gebe", "es", "ihm"], tail: "." });
assert.ok(w3.text.includes("Akkusativ"), `sıra gerekçesi zamir sırasını söylemeli: ${w3.text}`);
const w4 = whyFor({ type: "verb_position", answer: ["Ich", "bleibe", "zu", "Hause,", "weil", "ich", "krank", "bin"], tail: "." });
assert.ok(w4.text.includes("sona"), `yan cümle gerekçesi: ${w4.text}`);
assert.equal(w4.href, "/cheatsheet#a2-nebensatz");

// Karıştırma çiftleri (WP-73 adım 4)
assert.ok(CONFUSABLES.length >= 100, `en az 100 çift, ${CONFUSABLES.length} var`);
for (const x of CONFUSABLES) assert.ok(x.hint.length > 10 && x.example.length > 3, `çift eksik: ${x.a}/${x.b}`);
assert.equal(confusableHint("schön", "zaten")?.a, "schon");
assert.equal(confusableHint("die Kirche", "kiraz")?.b, "Kirsche");
assert.ok(whyFor({ type: "meaning", word: { de: "Gift", artikel: "das", tr: "zehir" }, detail: "hediye" }).text.includes("Geschenk"));
console.log(`test:rules — ${RULES.length} kural, ${ids.size} kimlik, bağlam seçimi ve why.ts bağı: tamam`);
