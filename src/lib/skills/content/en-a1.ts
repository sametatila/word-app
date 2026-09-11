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
import { enA1U13 } from "./en-a1-u13";
import { enA1U14 } from "./en-a1-u14";
import { enA1U15 } from "./en-a1-u15";
import { enA1U16 } from "./en-a1-u16";
import { enA1U17 } from "./en-a1-u17";
import { enA1U18 } from "./en-a1-u18";
import { enA1U19 } from "./en-a1-u19";
import { enA1U20 } from "./en-a1-u20";
import { enA1U21 } from "./en-a1-u21";

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
  ...enA1U13,
  ...enA1U14,
  ...enA1U15,
  ...enA1U16,
  ...enA1U17,
  ...enA1U18,
  ...enA1U19,
  ...enA1U20,
  ...enA1U21,
];
