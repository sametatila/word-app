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
import { speaking2a } from "./content/speaking-2a";
import { speaking2b } from "./content/speaking-2b";
import { zhSpeaking } from "./content/zh-speaking";
import { dialogues } from "./content/dialogue";
import { dialogues2 } from "./content/dialogue-2";
import { monologues } from "./content/monologue";
import { DERIVED_QUESTIONS } from "./content/derived-questions";
import { WRITING_EXTRA } from "./content/writing-extra";
import { derivedConfusions } from "../speech-rules";
import { germanLexicon } from "../speech-lexicon";

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
/**
 * Almanca telaffuz görevlerine kuraldan türetilmiş sapmaları ekler.
 *
 * Elle yazılanlar önde kalıyor: onların açıklaması hedefli ve her zaman daha
 * iyi, bu yüzden `judgeSpeech` sırayla bakarken önce onları deniyor. Türetilen
 * satırlar arkadan gelip elle yazılmamış durumları karşılıyor.
 *
 * Türev üretilmesi tek koşula bağlı: sonucun gerçek bir Almanca kelime olması.
 * Bu yüzden ürettiği satır sayısı sınırlı — Almancada Türkçe konuşanın
 * hatasının başka bir kelimeye denk düştüğü durumlar sanıldığı kadar çok
 * değil (8.000 kelimede ~50 çift). Yine de bedava ve içerik büyüdükçe
 * kendiliğinden ölçekleniyor.
 *
 * Züritüütsch egzersizleri dışarıda: orada tanıyıcı hiç çalışmıyor
 * (bkz. zh-speaking.ts), dolayısıyla sapma yazmanın anlamı yok.
 */
function withDerived<T extends SkillExercise>(list: T[]): T[] {
  const lexicon = germanLexicon();
  return list.map((ex) => {
    if (ex.skill !== "speaking" || !("tasks" in ex) || ex.judge === "self") return ex;
    return {
      ...ex,
      tasks: ex.tasks.map((task) => {
        const derived = derivedConfusions(task.de, lexicon);
        if (!derived.length) return task;
        const written = task.confusions ?? [];
        // Elle yazılmış bir sapma aynı biçimi zaten kapsıyorsa türev eklenmez.
        const covered = new Set(written.flatMap((c) => c.heard.map((h) => h.toLowerCase())));
        const extra = derived.filter((c) => !covered.has(c.heard[0].toLowerCase()));
        return extra.length ? { ...task, confusions: [...written, ...extra] } : task;
      }),
    };
  });
}

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
  ...withDerived(speaking),
  ...withDerived(speaking2a),
  ...withDerived(speaking2b),
  ...zhSpeaking,
  ...dialogues,
  ...dialogues2,
  ...monologues,
];

export const BUNDLED_EXERCISES: SkillExercise[] = withDerivedQuestions(BASE);
