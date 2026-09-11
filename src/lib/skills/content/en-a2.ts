import type { SkillExercise } from "../types";
import { enA2U01 } from "./en-a2-u01";
import { enA2U02 } from "./en-a2-u02";
import { enA2U03 } from "./en-a2-u03";

/**
 * EN · A2 — Patika'ya bağlı (ünite hizalı) beceri egzersizleri.
 *
 * Kardeşi `en-a1.ts`; gerekçe ve sözleşme orada yazılı. Sıra ÖNEMLİ:
 * builder yuvaları liste sırasıyla dolduruyor.
 *
 * A2'nin A1'den farkı ölçüde: okuma metni 100–180 kelime (A1'de 60–120)
 * ve içerik artık iki zamanı bir arada kullanabiliyor, çünkü seviyenin ilk
 * dersleri geçmişin ikinci biçimini getiriyor.
 */
export const enA2: SkillExercise[] = [
  ...enA2U01,
  ...enA2U02,
  ...enA2U03,
];
