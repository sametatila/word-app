/**
 * Yanlış cevapta gösterilen kısa Türkçe açıklama — web lib/why.ts'in sade hâli.
 * Tam gramer tabloları (artikel eki, çoğul desenleri) taşınmadı; en sık hatalara
 * yönelik yardımcı, tek cümlelik ipucu. Amaç: neden yanlış olduğunu göstermek.
 */
type W = { artikel: string | null; de: string; tr: string };

const withArt = (w: W) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

/** Anlam hatası: seçilen karşılık başka bir kelimenin; doğrusunu yan yana koy. */
export function whyMeaning(word: W, picked: string | null): string {
  return picked
    ? `„${picked}" başka bir kelimenin karşılığı; ${withArt(word)} = ${word.tr}.`
    : `${withArt(word)} = ${word.tr}.`;
}

/** Artikel hatası — doğru artikeli kelimeyle birlikte hatırlat. */
export function whyArticle(word: W): string {
  return word.artikel
    ? `Doğrusu: ${word.artikel} ${word.de}. Artikel kelimenin parçası; birlikte öğren.`
    : "Artikel kelimenin parçası; kelimeyle birlikte öğren.";
}

/** Çoğul hatası — doğru çoğul biçim. */
export function whyPlural(answer: string): string {
  return `Doğru çoğul: die ${answer}. Çoğulu kelimeyle birlikte öğren.`;
}
