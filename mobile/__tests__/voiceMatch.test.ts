import { spokenMatches } from "../src/lib/voiceMatch";

/**
 * Konuşma eşleştirmesinin BOŞLUKSUZ okumaları.
 *
 * NEDEN TEST: tanıyıcı uzun Almanca bileşikleri ayırıyor (havuzda 2313 tane)
 * ve `spokenMatches` bu yüzden boşlukları atarak ikinci, sayı katlamadan
 * üçüncü bir okuma yapıyor. Boşluk sınırı kalktığı için bu okumalarda içerme
 * TEHLİKELİ: hedef "was", söylenen "das Wasser" → sıkıştırılmış biçim hedefi
 * içeriyor ve yanlış cevap doğru sayılıyordu.
 *
 * Ders havuzundaki 5164 başlık ölçüldü: 3 harf eşiğinde 1310 hedef başka bir
 * başlığın içinde geçiyor, 12 harfte 22. Eşik bu yüzden bu iki okumada ayrı
 * ve 12; bölünmüş bileşik zaten EŞİTLİKLE yakalanıyor, içerme yalnız bölünme
 * artı dolgu sözcüğü bir aradayken gerekiyor ve orada hedef hep uzun.
 *
 * Web karşılığı `scripts/test-numbers.ts` içinde, aynı örneklerle.
 */
describe("boşluksuz okuma ve içerme eşiği", () => {
  it("bölünmüş bileşik birleşince eşleşiyor", () => {
    expect(spokenMatches(["Anruf Beantworter"], ["Anrufbeantworter"])).toBe(true);
  });

  it("bölünme artı dolgu sözcüğü: uzun hedefte içerme bağışlı", () => {
    expect(spokenMatches(["ähm Anruf Beantworter bitte"], ["Anrufbeantworter"])).toBe(true);
  });

  it("kısa hedef başka kelimenin içinde geçince doğru sayılmıyor", () => {
    expect(spokenMatches(["das Wasser"], ["was"])).toBe(false);
    expect(spokenMatches(["das Geschlecht"], ["schlecht"])).toBe(false);
    expect(spokenMatches(["der Gutschein"], ["gut"])).toBe(false);
  });

  it("normal okumalar bozulmadı", () => {
    expect(spokenMatches(["die Katze"], ["Katze"])).toBe(true);
    expect(spokenMatches(["Katze"], ["die Katze"])).toBe(true);
    expect(spokenMatches(["ähm die Katze bitte"], ["Katze"])).toBe(true);
    expect(spokenMatches(["der."], ["der Punkt"])).toBe(true);
  });
});
