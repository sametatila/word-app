/**
 * Elle yazılmış ünite sorusu. Kurs dilindeki metin (Almanca cümle, Almanca
 * şık) düz dize; öğrencinin anadilindeki metin `{ tr, en }`. Doğru şık HER
 * ZAMAN ilk sırada yazılır, yerini `unitQuestions` tohumla belirler.
 */
export type Localized = { tr: string; en: string };
export type Authored = {
  text: string | Localized;
  options: (string | Localized)[];
  explain: Localized;
};
