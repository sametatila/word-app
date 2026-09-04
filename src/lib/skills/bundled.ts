import type { SkillExercise } from "./types";
import { seededShuffle } from "@/lib/shuffle";
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
import { DERIVED_QUESTIONS } from "./content/derived-questions";
import { WRITING_EXTRA } from "./content/writing-extra";

/**
 * Repoda yazılan beceri içeriğinin tamamı — tek liste.
 *
 * Bu modül bilerek `server-only` **taşımaz**: aynı listeyi hem çalışma zamanı
 * (index.ts), hem yükleyici (seed-skills.ts), hem de canlı doğrulayıcı
 * (verify-live.ts) okur ve son ikisi Node script'idir.
 *
 * İçerik yalnızca veri olduğu için istemciye sızma riski buradan gelmez;
 * o sınır index.ts'in server-only olmasıyla korunur — istemci bileşenleri
 * yalnızca meta.ts'ten sabit alır.
 *
 * Not (2026-08): Konuşma (speaking) becerisi tamamen kaldırıldı — hiç
 * kullanılmıyordu ve LLM koçu (askCoach) hiç çağrılmamıştı. Kalan beceriler:
 * okuma, dinleme, yazma.
 */

/**
 * Türetilmiş yazılı sorular (WP-72): okuma/dinlemeye gapfill/short_answer/
 * dikte ekler (scripts/derive-questions.ts). Elle yazılmış sorular önce,
 * türetilenler sona; egzersiz zaten ≥ 2 yazılı soru taşıyorsa üretici onu
 * boş bırakmıştır.
 */
function withDerivedQuestions<T extends SkillExercise>(list: T[]): T[] {
  return list.map((ex) => {
    if (ex.skill === "writing") {
      // Yeni tür yazma görevleri (WP-31 adım 4): elle yazıldı, sona eklenir.
      const extra = WRITING_EXTRA[ex.id];
      return extra?.length ? { ...ex, tasks: [...ex.tasks, ...extra] } : ex;
    }
    if (ex.skill !== "reading" && ex.skill !== "listening") return ex;
    const extra = DERIVED_QUESTIONS[ex.id];
    return extra?.length ? { ...ex, questions: [...ex.questions, ...extra] } : ex;
  });
}

const BASE: SkillExercise[] = [
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
];

/**
 * Şık sırasını dağıtır — YAZAR REFLEKSİNİ düzeltir.
 *
 * Ölçüm: 1484 çoktan seçmeli sorunun %83'ünde doğru cevap İLK şıktaydı ve bu
 * her seviyede, her yazarda aynıydı (A1 %86, B2 %89, C1 %82). Doğru cevabı
 * önce yazmak insanın doğal eğilimi; sonuç, hiçbir şey okumadan hep ilk şıkkı
 * işaretleyenin ~%83 almasıydı. Sınav kâğıdı kendi karıştırmasını yapıyordu
 * ama beceri oynatıcısı ve Patika yapmıyordu.
 *
 * Düzeltme arayüzde değil BURADA: mobil paket bu listenin dökümü, yani tek
 * yerde düzeltilince web ve mobil birlikte düzeliyor.
 *
 * Tohum egzersiz kimliği + soru sırası: aynı soru her çalıştırmada aynı sırayı
 * alır. Sıra sabit olmalı, çünkü kullanıcı ilerlemesi ve önbellek arasında
 * oynayan bir diziliş "aynı soru başka cevap" gibi görünür.
 *
 * İki şık DIŞARIDA: onlar Richtig/Falsch ve orada sabit sıra doğru olan.
 * O grubun dengesi zaten ölçüldü (%28 Richtig) ve düzeltme gerektirmiyor.
 */
function withShuffledOptions<T extends SkillExercise>(list: T[]): T[] {
  return list.map((ex) => {
    if (!("questions" in ex) || !Array.isArray(ex.questions)) return ex;
    let degisti = false;
    const questions = ex.questions.map((q, qi) => {
      const opts = q.options;
      if (!opts || opts.length < 3 || typeof q.answer !== "number") return q;
      const sira = seededShuffle(opts.map((_, i) => i), `${ex.id}|${qi}`);
      const yeni = sira.indexOf(q.answer);
      if (yeni < 0) return q;
      degisti = true;
      return { ...q, options: sira.map((i) => opts[i]), answer: yeni };
    });
    return degisti ? { ...ex, questions } : ex;
  });
}

export const BUNDLED_EXERCISES: SkillExercise[] = withShuffledOptions(withDerivedQuestions(BASE));
