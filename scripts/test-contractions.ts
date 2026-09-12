/**
 * İngilizce kısaltma katlaması birim testi: npm run test:contractions
 *
 * Öğrencinin doğru cevabı reddedilmemeli: "I'm" ile "I am", "can't" ile
 * "cannot", "where's" ile "where is" aynı cevaptır. Belirsiz ekler
 * ('s = is/has, 'd = would/had) ortaçla birlikte ortak belirtece iniyor.
 * Gerekçe `src/lib/contractions.ts` başında.
 */
import assert from "node:assert/strict";
import { foldContractions } from "../src/lib/contractions";
import { judgeSpeech, normalizeSpoken } from "../src/lib/speech";
import { matchSentence } from "../src/lib/sentence-match";

const eq = (a: string, b: string, why: string) =>
  assert.equal(normalizeSpoken(a, "en"), normalizeSpoken(b, "en"), why);
const correct = (target: string, said: string) =>
  assert.equal(judgeSpeech(target, [said], [], [], "en").kind, "correct", `«${said}» ↔ «${target}»`);

// Açılım
assert.equal(foldContractions("I'm late", "en"), "I am late");
assert.equal(foldContractions("don't go", "en"), "do not go");
assert.equal(foldContractions("can't", "en"), "can not");
assert.equal(foldContractions("cannot", "en"), "can not");
assert.equal(foldContractions("won't", "en"), "will not");
assert.equal(foldContractions("let's go", "en"), "let us go");
assert.equal(foldContractions("where's the key", "en"), "where is the key");
// Almanca dokunulmuyor (ins/im/zum kısaltmaları zorunlu, seçmeli değil)
assert.equal(foldContractions("Ich geh's an", "de"), "Ich geh's an");

// İki yön de aynı cevap
eq("I'm a teacher.", "I am a teacher.", "kısaltma açık biçimle aynı");
eq("I can't come.", "I cannot come.", "can't = cannot");
eq("We'll see.", "We will see.", "'ll = will");
eq("You're right.", "You are right.", "'re = are");
eq("I've finished.", "I have finished.", "'ve = have");
eq("It's reported that the school will open.", "It is reported that the school will open.", "edilgen 's = is");
eq("He's been there.", "He has been there.", "bitmiş geçmiş 's = has");
eq("I'd read every day.", "I would read every day.", "'d = would");
eq("She'd left already.", "She had left already.", "'d = had");

// Değerlendirici de kabul ediyor
correct("I'm a teacher.", "I am a teacher");
correct("I am a teacher.", "I'm a teacher");
correct("I can't visit the park today.", "I cannot visit the park today");
correct("Where is the equipment kept?", "Where's the equipment kept");
correct("If we wasted less, we would save money.", "If we wasted less, we'd save money");

// YANLIŞ cevap yine yanlış
assert.notEqual(judgeSpeech("I am a teacher.", ["I am a student"], [], [], "en").kind, "correct");
assert.notEqual(judgeSpeech("I can't come.", ["I can come"], [], [], "en").kind, "correct", "olumsuzluk düşerse doğru değil");
assert.notEqual(judgeSpeech("She's happy.", ["She is sad"], [], [], "en").kind, "correct");

// Yazılı çeviri turunda da
assert.equal(matchSentence("I'm from Turkey.", "I am from Turkey.", [], "en").verdict, "exact");
assert.equal(matchSentence("They don't work here.", "They do not work here.", [], "en").verdict, "exact");
assert.equal(matchSentence("I am from Turkey.", "I'm from Turkey.", [], "en").verdict, "exact");
assert.notEqual(matchSentence("I'm from Turkey.", "I am from Greece.", [], "en").verdict, "exact");

// Almanca yol değişmedi
assert.equal(matchSentence("Ich gehe ins Kino.", "Ich gehe ins Kino.", [], "de").verdict, "exact");
assert.equal(judgeSpeech("Ich bin müde", ["ich bin müde"]).kind, "correct");

console.log("test:contractions — açılım/belirsiz ek/değerlendirici/çeviri/Almanca: tamam");
