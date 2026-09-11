import type { SkillExercise } from "../types";
import { enA1U01 } from "./en-a1-u01";

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
];
