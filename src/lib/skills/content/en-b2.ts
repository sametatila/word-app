import type { SkillExercise } from "../types";
import { enB2U01 } from "./en-b2-u01";
import { enB2U02 } from "./en-b2-u02";
import { enB2U03 } from "./en-b2-u03";
import { enB2U04 } from "./en-b2-u04";
import { enB2U05 } from "./en-b2-u05";
import { enB2U06 } from "./en-b2-u06";

/**
 * EN · B2 — Patika'ya bağlı (ünite hizalı) beceri egzersizleri.
 *
 * Sıra önemli: yapıcı yuvaları listedeki sıraya göre dolduruyor.
 * Okuma metni B2'de 200–350 kelime (B1'de 150–260) — seviyenin ilk
 * dersleri kişisiz aktarma ve ortaç cümlesi getiriyor, ikisi de metnin
 * kendi uzunluğunu gerektiren yapılar.
 */
export const enB2: SkillExercise[] = [
  ...enB2U01,
  ...enB2U02,
  ...enB2U03,
  ...enB2U04,
  ...enB2U05,
  ...enB2U06,
];
