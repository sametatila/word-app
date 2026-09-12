import type { SkillExercise } from "../types";
import { enB1U01 } from "./en-b1-u01";
import { enB1U02 } from "./en-b1-u02";
import { enB1U03 } from "./en-b1-u03";

/**
 * EN · B1 — Patika'ya bağlı (ünite hizalı) beceri egzersizleri.
 *
 * Kardeşleri `en-a1.ts` ve `en-a2.ts`; gerekçe ve sözleşme orada yazılı.
 * Sıra ÖNEMLİ: builder yuvaları liste sırasıyla dolduruyor.
 *
 * B1'in A2'den farkı ölçüde: okuma metni 150–260 kelime (A2'de 100–180)
 * ve içerik üç zamanı birden taşıyabiliyor, çünkü seviyenin ilk dersleri
 * past perfect'i getiriyor.
 */

export const enB1: SkillExercise[] = [
  ...enB1U01,
  ...enB1U02,
  ...enB1U03,
];
