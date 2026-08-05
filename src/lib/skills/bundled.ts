import type { SkillExercise } from "./types";
import { a1 } from "./content/a1";
import { a2 } from "./content/a2";
import { b1 } from "./content/b1";
import { b2 } from "./content/b2";
import { c1 } from "./content/c1";
import { zhA1 } from "./content/zh-a1";
import { zhA2 } from "./content/zh-a2";
import { zhB1 } from "./content/zh-b1";
import { zhB2 } from "./content/zh-b2";
import { zhC1 } from "./content/zh-c1";
import { speaking } from "./content/speaking";

/**
 * Repoda yazılan beceri içeriğinin tamamı — tek liste.
 *
 * Bu modül bilerek `server-only` **taşımaz**: aynı listeyi hem çalışma zamanı
 * (index.ts), hem yükleyici (seed-skills.ts), hem de canlı doğrulayıcı
 * (verify-live.ts) okur ve son ikisi Node script'idir. Liste daha önce üç
 * yerde ayrı ayrı yazılıydı; yeni bir içerik dosyası eklendiğinde birini
 * güncellemeyi unutmak sessiz bir eksiklik üretiyordu.
 *
 * İçerik yalnızca veri olduğu için istemciye sızma riski buradan gelmez;
 * o sınır index.ts'in server-only olmasıyla korunur — istemci bileşenleri
 * yalnızca meta.ts'ten sabit alır.
 */
export const BUNDLED_EXERCISES: SkillExercise[] = [
  ...a1,
  ...a2,
  ...b1,
  ...b2,
  ...c1,
  ...zhA1,
  ...zhA2,
  ...zhB1,
  ...zhB2,
  ...zhC1,
  ...speaking,
];
