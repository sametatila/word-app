/**
 * Tur kurucuları: npm run test:rounds
 *
 * Tur, kelimenin ÖRNEK CÜMLESİNDEN kuruluyor: başlık cümlede bulunup
 * boşluğa çevriliyor. Bulunamazsa o kelime hiç boşluk doldurma turu
 * üretmiyor ve bu sessiz bir eksilme — ekranda hata yok, yalnız tur türü
 * hiç gelmiyor. 2026-09-12'de ölçüldü: Almanca havuzun 1.607 kelimesi bu
 * durumdaydı, çünkü başlık MASTAR ("arbeiten") ama cümle ÇEKİMLİ
 * ("arbeitet"). Gövde kuralı 749'unu kurtardı.
 */
import assert from "node:assert/strict";
import { buildCloze, buildOrder } from "../src/lib/session";
import type { RoundWord } from "../src/lib/types";

type Pool = Parameters<typeof buildCloze>[1];
const poolOf = (course: string) => [{ course }] as unknown as Pool;
const w = (de: string, typ: string, beispiel: string): RoundWord =>
  ({ id: 1, de, artikel: "", tr: "—", en: null, typ, niveau: "A1", beispiel, beispielTr: "", beispielEn: "" }) as unknown as RoundWord;

/* Almanca: mastar başlık, çekimli cümle */
const a = buildCloze(w("arbeiten", "Verb", "Mein Vater arbeitet bei einer Autofirma."), poolOf("de"));
assert.equal(a?.answer, "arbeitet");
assert.equal(a?.sentence, "Mein Vater _____ bei einer Autofirma.");
const b = buildCloze(w("antworten", "Verb", "Warum antwortest du nicht?"), poolOf("de"));
assert.equal(b?.answer, "antwortest");

/* Tam biçim varsa gövdeye hiç inilmiyor */
const c = buildCloze(w("wohnen", "Verb", "Wir wohnen in Köln."), poolOf("de"));
assert.equal(c?.answer, "wohnen");

/* BÜYÜK HARF GUARD'I: gövde isme uyarsa boşluk yanlış kelimeye düşerdi.
   "arbeiten" gövdesi "Arbeit" ismini de yakalar; cümle başı dışında
   büyük harfle başlayan eşleşme kabul edilmiyor. */
const d = buildCloze(w("arbeiten", "Verb", "Die Arbeit macht mir Spaß."), poolOf("de"));
assert.equal(d, null, "isim eşleşmesi boşluğa çevrilmemeli");

/* Fiil olmayan başlıkta gövde kuralı çalışmıyor */
assert.equal(buildCloze(w("Baum", "Nomen", "Die Bäume sind schon grün."), poolOf("de")), null);

/* İngilizce yolu değişmedi: öbek fiil ve düz eşleşme.
   ÖLÇÜLEN SINIR: öbek fiil kuralı gövdeyi harf EKİYLE türetiyor, yani
   düzensiz geçmiş ("pay" → "paid") ve araya nesne giren biçim ("pick you
   up") kapsam dışında; İngilizce havuzda 173 kelime bu yüzden boşluk
   doldurma turu üretmiyor. Almanca gövde kuralı buraya taşınmadı — orada
   ek düzenli, burada değil. */
assert.equal(buildCloze(w("pay for", "Verb", "I paid for the coffee with my card."), poolOf("en")), null);
const f = buildCloze(w("be closed", "Verb", "The shop is closed on Sundays."), poolOf("en"));
assert.equal(f?.answer, "is closed");
const g = buildCloze(w("water", "Nomen", "I drink water every morning."), poolOf("en"));
assert.equal(g?.answer, "water");

/* Kurulamayan durumlar sessizce null */
assert.equal(buildCloze(w("gehen", "Verb", "Kurz."), poolOf("de")), null, "çok kısa cümle");
assert.equal(buildCloze(w("ab", "Sonstiges", "Der Zug fährt gleich ab."), poolOf("de")), null, "üç harften kısa başlık");

/* ── cümle dizme ──
   Üst sınır JETON sayısıydı ve ekranın derdi genişlik: on jetonluk 39
   karakterlik bir İngilizce cümle eleniyor, seksen yedi karakterlik bir
   Almanca cümle geçiyordu. Kural artık ikisini birden okuyor. */
const o1 = buildOrder(w("gift", "Nomen", "I want to give Anna a sweater as a gift."));
assert.ok(o1, "on jeton / 39 karakter kabul edilmeli");
assert.equal(o1?.answer.length, 10);
assert.equal(o1?.tail, ".");
const o2 = buildOrder(w("Pizza", "Nomen", "Heute gibt es bei uns Pizza mit Tomaten und Käse."));
assert.ok(o2, "on jetonluk Almanca cümle de");
// Uzun VE geniş olan hâlâ dışarıda (telefonda tek ekrana sığmıyor)
assert.equal(
  buildOrder(w("Stipendium", "Nomen", "Wenn ich in diesem Jahr ein wirklich gutes Zeugnis bekomme, dann bekomme ich auch ein Stipendium.")),
  null,
);
// On iki jetondan uzun: karakter sınırını geçse de hayır
assert.equal(buildOrder(w("a", "Sonstiges", "one two three four five six seven eight nine ten one two three.")), null);
// Dört jetondan kısa
assert.equal(buildOrder(w("Haus", "Nomen", "Das ist Haus.")), null);
// Tek kelimesi çok uzun olan cümle (jeton ekrana sığmaz)
assert.equal(buildOrder(w("Test", "Nomen", "Das ist ein Donaudampfschiffahrtsgesellschaftskapitaen Test.")), null);

console.log("test:rounds — boşluk doldurma (mastar/gövde, guard, öbek fiil) ve cümle dizme (jeton + genişlik): tamam");
