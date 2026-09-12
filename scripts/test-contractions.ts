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

// Konuşma indirgemeleri: tanıyıcı duyduğu gibi yazıyor, seçim öğrencinin değil
eq("I'm gonna call you.", "I am going to call you.", "gonna = going to");
eq("I wanna buy a gift.", "I want to buy a gift.", "wanna = want to");
eq("We gotta go.", "We have got to go.".replace("have ", ""), "gotta = got to");
correct("I'm going to travel tomorrow.", "I'm gonna travel tomorrow");
correct("I want to buy a gift for my sister.", "I wanna buy a gift for my sister");
// Kesme işaretsiz saat
correct("It's three o'clock.", "It's three oclock");

// İngiliz/Amerikan yazım: kursun tanıma yereli en-US, içerik İngiliz yazımı
eq("My neighbour is nice.", "My neighbor is nice.", "neighbour = neighbor");
eq("What is your favourite colour?", "What is your favorite color?", "favourite/colour");
eq("I apologise for the noise.", "I apologize for the noise.", "apologise = apologize");
eq("I practise every day.", "I practice every day.", "practise = practice");
correct("I'm sorry, I apologise for the noise.", "I am sorry, I apologize for the noise");
// Ayrı kelimeler ayrı kalıyor
assert.notEqual(
  judgeSpeech("My neighbour is nice.", ["My brother is nice"], [], [], "en").kind,
  "correct",
  "yazım katlaması başka kelimeyi doğru yapmamalı",
);

/*
  ALMANCADA KARŞILIĞI YOK ve bu ÖLÇÜLDÜ. Almanca kaynaşmalar (ins, zum, am)
  ZORUNLU biçimler; "zu dem Fest" İngilizcedeki "I am" gibi eşdeğer bir
  seçenek değil, işaret eden ayrı bir kullanım. Bu yüzden Almanca yola hiçbir
  açılım eklenmedi — eklenseydi kapı gerçek bir hatayı doğru sayardı.
*/
assert.equal(foldContractions("Ich gehe zum Arzt", "de"), "Ich gehe zum Arzt");

console.log("test:contractions — açılım/belirsiz ek/indirgeme/yazım/değerlendirici/çeviri/Almanca: tamam");
