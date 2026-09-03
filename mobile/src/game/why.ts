import { t } from "../lib/i18n";

/**
 * Yanlış cevapta gösterilen kısa açıklama — web lib/why.ts'in sade hâli.
 * Tam gramer tabloları (artikel eki, çoğul desenleri) taşınmadı; en sık hatalara
 * yönelik yardımcı, tek cümlelik ipucu. Amaç: neden yanlış olduğunu göstermek.
 */
type W = { artikel: string | null; de: string; tr: string };

const withArt = (w: W) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

/** Anlam hatası: seçilen karşılık başka bir kelimenin; doğrusunu yan yana koy. */
export function whyMeaning(word: W, picked: string | null): string {
  return picked
    ? t("why.meaning_picked", { secilen: picked, kelime: withArt(word), anlam: word.tr })
    : `${withArt(word)} = ${word.tr}.`;
}

/** Artikel hatası — doğru artikeli kelimeyle birlikte hatırlat. */
export function whyArticle(word: W): string {
  return word.artikel
    ? t("why.article", { artikel: word.artikel, kelime: word.de })
    : t("why.article_plain");
}

/** Çoğul hatası — doğru çoğul biçim. */
export function whyPlural(answer: string): string {
  return t("why.plural", { cogul: answer });
}
