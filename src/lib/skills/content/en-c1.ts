import type { SkillExercise } from "../types";
import { enC1U01 } from "./en-c1-u01";
import { enC1U02 } from "./en-c1-u02";
import { enC1U03 } from "./en-c1-u03";
import { enC1U04 } from "./en-c1-u04";
import { enC1U05 } from "./en-c1-u05";
import { enC1U06 } from "./en-c1-u06";
import { enC1U07 } from "./en-c1-u07";
import { enC1U08 } from "./en-c1-u08";
import { enC1U09 } from "./en-c1-u09";

/**
 * EN · C1 — Patika'ya bağlı (ünite hizalı) beceri egzersizleri.
 *
 * Sıra önemli: yapıcı yuvaları listedeki sıraya göre dolduruyor.
 * Okuma metni C1'de 250–450 kelime (B2'de 200–350). Seviyenin konusu
 * yapı değil ÜSLUP: dil düzeyi, eksiltme, ağırlık dağılımı, aktarma
 * fiilinin taşıdığı hüküm, eksiltili söyleyiş.
 */
export const enC1: SkillExercise[] = [
  ...enC1U01,
  ...enC1U02,
  ...enC1U03,
  ...enC1U04,
  ...enC1U05,
  ...enC1U06,
  ...enC1U07,
  ...enC1U08,
  ...enC1U09,
];
