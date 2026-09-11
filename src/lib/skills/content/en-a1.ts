import type { SkillExercise } from "../types";
import { enA1U01 } from "./en-a1-u01";
import { enA1U02 } from "./en-a1-u02";
import { enA1U03 } from "./en-a1-u03";
import { enA1U04 } from "./en-a1-u04";
import { enA1U05 } from "./en-a1-u05";
import { enA1U06 } from "./en-a1-u06";
import { enA1U07 } from "./en-a1-u07";
import { enA1U08 } from "./en-a1-u08";
import { enA1U09 } from "./en-a1-u09";
import { enA1U10 } from "./en-a1-u10";
import { enA1U11 } from "./en-a1-u11";
import { enA1U12 } from "./en-a1-u12";

/**
 * EN · A1 — Patika'ya bağlı (ünite hizalı) beceri egzersizleri.
 *
 * Almanca kursun `a1.ts` dosyasının karşılığı. İngilizce kursun Patika'sı
 * 2026-09-11'e kadar HİÇ egzersiz taşımıyordu: 100 dersin 25 ünitesinde
 * okuma/dinleme/yazma yuvaları vardı ama havuz boştu, yani her ünitede altı
 * yuva „yakında“ olarak duruyordu (`build.ts`, `ref: null`). Beceriler
 * kütüphanesi (`content/library/`) o boşluğu KAPATMAZ: orası ünitesiz,
 * öğrencinin kendi seçtiği serbest çalışma yüzeyi ve Patika ona bakmıyor.
 *
 * Sıra ÖNEMLİ: builder yuvaları liste sırasıyla dolduruyor, yani ünite n'in
 * dosyası listede n'inci sırada durmak zorunda.
 */
export const enA1: SkillExercise[] = [
  ...enA1U01,
  ...enA1U02,
  ...enA1U03,
  ...enA1U04,
  ...enA1U05,
  ...enA1U06,
  ...enA1U07,
  ...enA1U08,
  ...enA1U09,
  ...enA1U10,
  ...enA1U11,
  ...enA1U12,
];
