import { matchSentence, foldSentence } from "../src/lib/sentenceMatch";
import { levenshtein, classifyOrder } from "../src/lib/errors";

/**
 * Cümle hakemi — web `src/lib/sentence-match.ts` portu.
 *
 * NEDEN TEST: mobilin çevir turu bu porta kadar İKİLİ hüküm veriyordu
 * (`foldCompare(val) === foldCompare(hedef)`), yani tek harf yazım hatası
 * cümleyi tam yanlış sayıyor ve kelimeyi lapse ettiriyordu. Web aynı turda
 * baştan beri üç katmanlı hakemi kullanıyor. İki dosya birebir aynı olmalı;
 * `scripts/parity-check.mjs` 17. bölümü gövdeleri karşılaştırıyor, buradaki
 * denetimler de davranışı sabitliyor.
 */
describe("cümle hakemi", () => {
  it("tam doğru", () => {
    const m = matchSentence("Ich gehe ins Kino", "Ich gehe ins Kino", [], "de");
    expect(m.verdict).toBe("exact");
    expect(m.quality).toBe(5);
  });

  it("harf hatası yazım sayılıyor, kelime lapse etmiyor", () => {
    const m = matchSentence("Ich gehe ins Kinno", "Ich gehe ins Kino", [], "de");
    expect(m.verdict).toBe("spelling");
    expect(m.quality).toBe(4);
    expect(m.errorType).toBe("spelling");
  });

  it("sıra hatası ayrı: kalite 3 ve fiil yeri işaretli", () => {
    const m = matchSentence("Heute ich gehe ins Kino", "Ich gehe heute ins Kino", [], "de");
    expect(m.verdict).toBe("order");
    expect(m.quality).toBe(3);
  });

  it("gerçekten yanlış cümle", () => {
    const m = matchSentence("Ich esse Brot", "Ich gehe ins Kino", [], "de");
    expect(m.verdict).toBe("wrong");
    expect(m.quality).toBe(1);
  });

  it("kabul kuralı web ile aynı: yazım kabul, sıra kabul değil", () => {
    const kabul = (typed: string, target: string) => {
      const m = matchSentence(typed, target, [], "de");
      return m.quality >= 3 && m.verdict !== "order";
    };
    expect(kabul("Ich gehe ins Kino", "Ich gehe ins Kino")).toBe(true);
    expect(kabul("Ich gehe ins Kinno", "Ich gehe ins Kino")).toBe(true);
    expect(kabul("Heute ich gehe ins Kino", "Ich gehe heute ins Kino")).toBe(false);
    expect(kabul("Ich esse Brot", "Ich gehe ins Kino")).toBe(false);
  });

  it("alternatifler arasından en yakını seçiliyor", () => {
    const m = matchSentence("Ich fahre nach Berlin", "Ich gehe nach Berlin", ["Ich fahre nach Berlin"], "de");
    expect(m.verdict).toBe("exact");
    expect(m.matched).toBe("Ich fahre nach Berlin");
  });

  it("katlama dile bakıyor", () => {
    expect(foldSentence("um fünf Uhr", "de")).toBe("um 5 uhr");
    expect(foldSentence("At five o'clock", "en")).toBe("at 5 o clock");
    // Rakam farkı yazım hatası değil: yanlış saat neredeyse doğru sayılmamalı.
    expect(matchSentence("At six o'clock", "At 5 o'clock", [], "en").verdict).toBe("wrong");
  });

  it("saf yardımcılar", () => {
    expect(levenshtein("kino", "kinno")).toBe(1);
    expect(levenshtein("abc", "abc")).toBe(0);
    // Bildirme cümlesinde fiil ikinci sırada; yeri değişmişse "fiilin yeri".
    expect(classifyOrder(["heute", "ich", "gehe"], ["ich", "gehe", "heute"], "")).toBe("verb_position");
  });
});
