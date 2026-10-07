/**
 * Yanlış şıkta "hangi kelimenin karşılığı" ve aynı anlamlı başka kelime (2026-10-07).
 */
import { whyFor } from "../src/game/why";

const wecken = { de: "wecken", artikel: null, tr: "uyandırmak", en: "to wake someone up" };
const bekommen = { de: "bekommen", artikel: null, tr: "almak", en: "to get" };

test("yanlış şık ait olduğu kelimeyle", () => {
  const t = whyFor({ type: "meaning", word: wecken, detail: "kafa yormak", detailOf: "grübeln" }).text;
  expect(t).toContain("kafa yormak");
  expect(t).toContain("grübeln");
  expect(t).toContain("wecken");
});

test("ait olduğu kelime yoksa eski genel cümle", () => {
  const t = whyFor({ type: "meaning", word: wecken, detail: "kafa yormak" }).text;
  expect(t).toContain("kafa yormak");
  expect(t).not.toContain("undefined");
});

test("dinlemede de seçilen şıkkın kelimesi", () => {
  const t = whyFor({ type: "listening", word: wecken, detail: "kafa yormak", detailOf: "grübeln" }).text;
  expect(t).toContain("grübeln");
});

test("aynı anlamlı başka kelime: ayrım satırı (karıştırma çifti yoksa)", () => {
  const t = whyFor({ type: "meaning", word: { de: "erhalten", artikel: null, tr: "almak", en: "to receive" }, detail: "einholen", sameGloss: { sub: "to obtain", wordSub: "to receive" } }).text;
  expect(t).toContain("einholen");
  expect(t).toContain("to obtain");
  expect(t).toContain("erhalten");
});

test("bekommen/nehmen: bilinen karıştırma çifti açıklaması öncelikli", () => {
  const t = whyFor({ type: "meaning", word: bekommen, detail: "nehmen", sameGloss: { sub: "to take", wordSub: "to get" } }).text;
  expect(t.length).toBeGreaterThan(10);
});
