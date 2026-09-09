/** Bir belgenin bir dildeki varsayılanı. Alanlar `legal_documents` sütunlarıyla birebir. */
export type LegalDocDefault = {
  /** Sayfanın H1'i ve <title>'ı. */
  title: string;
  /** <meta name="description">. Boş bırakılabilir. */
  description: string;
  /** "Kısaca" kutusundaki maddeler. Boş dizi = kutu hiç basılmaz. */
  summary: string[];
  /** Gövde: markdown + belirteç (`lib/legal/markdown.tsx`). */
  body: string;
};
