/**
 * Beceri egzersizleri (okuma / dinleme / yazma) içerik modeli.
 *
 * İçerik statiktir ve derlemeye gömülür: veritabanı gerektirmez, PWA'da
 * çevrimdışı çalışır. Metinler Almanca, yönergeler ve açıklamalar Türkçe;
 * sorular Goethe sınav geleneğine uygun olarak Almanca sorulur.
 */

export type SkillId = "reading" | "listening" | "writing";
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1";

/** Egzersize özel küçük sözlükçe: metindeki kilit kelimeler. */
export type Gloss = { de: string; tr: string };

export type SkillQuestion = {
  /** Soru — Almanca (Goethe tarzı). Seviyeye uygun sadelikte yazılır. */
  text: string;
  /** Şıklar. Doğru/yanlış soruları için ["Richtig", "Falsch"]. */
  options: string[];
  /** Doğru şıkkın indeksi. */
  answer: number;
  /** Cevaptan sonra gösterilen Türkçe açıklama: neden doğru, metinde nerede. */
  explain: string;
};

type ExerciseBase = {
  /** "a1-r1" gibi: seviye + beceri harfi + sıra. Kalıcı kimlik, değiştirme. */
  id: string;
  level: CefrLevel;
  /** Almanca başlık. */
  title: string;
  /** Tür etiketi, Türkçe: "E-posta", "İlan", "Haber", "Diyalog"… */
  genre: string;
  /** Türkçe tek cümlelik bağlam/yönerge. */
  intro: string;
  gloss: Gloss[];
  /** Tahmini süre (dakika) — listede gösterilir. */
  minutes: number;
};

export type ReadingExercise = ExerciseBase & {
  skill: "reading";
  /** Almanca metin. Paragraflar boş satırla (\n\n) ayrılır. */
  text: string;
  questions: SkillQuestion[];
};

/** Diyaloglar konuşmacıya bölünür; tek konuşmacılı metinlerde speaker boş kalır. */
export type ListeningSegment = { speaker?: string; text: string };

export type ListeningExercise = ExerciseBase & {
  skill: "listening";
  segments: ListeningSegment[];
  questions: SkillQuestion[];
};

export type WritingTask =
  | {
      /** Verilen Türkçe anlamı, karışık parçalardan Almanca cümle kurarak yaz. */
      kind: "build";
      tr: string;
      /** Kanonik doğru cümle — parçalar bundan üretilir. */
      answer: string;
      /** Kabul edilen diğer kelime dizilişleri (aynı kelimelerle). */
      alternatives?: string[];
      /** Türkçe dil bilgisi ipucu. */
      hint?: string;
    }
  | {
      /** Serbest yazma: senaryo + kontrol listesi + örnek cevap. */
      kind: "free";
      /** Türkçe görev tanımı. */
      prompt: string;
      /** Varsa cevap yazılacak Almanca uyaran (ör. gelen e-posta, ilan). */
      stimulus?: string;
      /** Öz denetim maddeleri, Türkçe. */
      checklist: string[];
      minWords: number;
      /** İşe yarar kalıplar. */
      phrases: Gloss[];
      /** Örnek cevap (Almanca) — yazdıktan sonra karşılaştırma için açılır. */
      sample: string;
    };

export type WritingExercise = ExerciseBase & {
  skill: "writing";
  tasks: WritingTask[];
};

export type SkillExercise = ReadingExercise | ListeningExercise | WritingExercise;
