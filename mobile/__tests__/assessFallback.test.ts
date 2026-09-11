import { fallbackAssessment, overallScore } from "../src/lib/assessFallback";

/**
 * YEDEK PUANLAMA İKİ PLATFORMDA AYNI OLMALI.
 *
 * Yapay zekâ kapalıyken puanı bu kurallar veriyor ve puan SRS kalitesine
 * dönüşüyor — iki uygulamanın aynı metne farklı puan vermesi, aynı cevabın
 * telefonda ve tarayıcıda farklı öğrenme sonucu doğurması demek. Sayılar
 * web `lib/assess-client` `fallbackAssessment` ile birebir karşılaştırıldı.
 */
describe("yedek degerlendirme", () => {
  const req = (text: string) => ({
    kind: "sentence" as const,
    task: { targets: ["der Hund", "laufen"] },
    answer: { text },
  });

  it("hedef kaliplarin ikisi de gecince yapi tam puan", () => {
    const r = fallbackAssessment(req("Der Hund kann sehr schnell laufen."));
    expect(r.checks.filter((c) => c.kind === "target").every((c) => c.ok)).toBe(true);
    expect(r.score.structure).toBe(4);
    expect(r.score.task).toBe(4);
    expect(r.score.grammar).toBe(2); // olculemiyor
    expect(r.score.overall).toBe(overallScore(r.score));
  });

  it("kalip kacinca yapi yariya iniyor", () => {
    const r = fallbackAssessment(req("Der Hund ist klein."));
    expect(r.score.structure).toBe(2);
    expect(r.next_tip_tr).toContain("laufen");
  });

  it("buyuk harf ve nokta olcutleri sayiliyor", () => {
    const r = fallbackAssessment(req("der hund laeuft"));
    const kinds = r.checks.map((c) => c.kind);
    expect(kinds).toContain("capital");
    expect(kinds).toContain("punctuation");
    expect(r.checks.find((c) => c.kind === "capital")?.ok).toBe(false);
    expect(r.checks.find((c) => c.kind === "punctuation")?.ok).toBe(false);
  });

  it("Turkce harf hedef dil olcutunu dusuruyor", () => {
    const r = fallbackAssessment(req("Der Hund çok hızlı laufen."));
    expect(r.checks.find((c) => c.kind === "target_lang")?.ok).toBe(false);
  });

  it("asgari kelime sayisi kisittan okunuyor", () => {
    const r = fallbackAssessment({
      kind: "writing",
      task: { constraints: ["en az 40 kelime"] },
      answer: { text: "Kurz." },
    });
    expect(r.checks[0].vars?.min).toBe(40);
    expect(r.checks[0].ok).toBe(false);
  });

  /*
   * WEBİN KENDİ ÇIKTISIYLA KARŞILAŞTIRMA.
   *
   * Aşağıdaki sayılar web `fallbackAssessment` çalıştırılıp alındı
   * (`npx tsx` ile, aynı dört girdi). Elle yazılmış "doğru cevap" değil,
   * öteki uygulamanın gerçek çıktısı: iki taraf ayrışırsa bu test düşer.
   */
  it("webin ciktisiyla birebir ayni", () => {
    const durum = (r: ReturnType<typeof fallbackAssessment>) => ({
      score: r.score,
      words: r.words,
      checks: r.checks.map((x) => [x.kind, x.ok]),
    });
    expect(durum(fallbackAssessment(req("Der Hund kann sehr schnell laufen.")))).toEqual({
      score: { task: 4, grammar: 2, vocab: 2, structure: 4, overall: 77 },
      words: 6,
      checks: [["min_words", true], ["target", true], ["target", true], ["capital", true], ["punctuation", true], ["target_lang", true]],
    });
    expect(durum(fallbackAssessment(req("Der Hund ist klein.")))).toEqual({
      score: { task: 3, grammar: 2, vocab: 2, structure: 2, overall: 59 },
      words: 4,
      checks: [["min_words", true], ["target", true], ["target", false], ["capital", true], ["punctuation", true], ["target_lang", true]],
    });
    expect(durum(fallbackAssessment(req("der hund laeuft")))).toEqual({
      score: { task: 2, grammar: 2, vocab: 2, structure: 2, overall: 50 },
      words: 3,
      checks: [["min_words", true], ["target", true], ["target", false], ["capital", false], ["punctuation", false], ["target_lang", true]],
    });
    expect(
      durum(fallbackAssessment({ kind: "writing", task: { constraints: ["en az 40 kelime"] }, answer: { text: "Kurz." } })),
    ).toEqual({
      score: { task: 3, grammar: 2, vocab: 2, structure: 3, overall: 64 },
      words: 1,
      checks: [["min_words", false], ["capital", true], ["punctuation", true], ["target_lang", true]],
    });
  });

  it("agirliklar web ile ayni", () => {
    expect(overallScore({ task: 4, grammar: 4, vocab: 4, structure: 4 })).toBe(100);
    expect(overallScore({ task: 0, grammar: 0, vocab: 0, structure: 0 })).toBe(0);
    expect(overallScore({ task: 4, grammar: 2, vocab: 2, structure: 4 })).toBe(77);
  });
});
