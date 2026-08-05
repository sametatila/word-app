import type { DialogueTurn } from "@/lib/dialogue";

/**
 * Beceri egzersizleri (okuma / dinleme / yazma) içerik modeli.
 *
 * İçerik statiktir ve derlemeye gömülür: veritabanı gerektirmez, PWA'da
 * çevrimdışı çalışır. Metinler Almanca, yönergeler ve açıklamalar Türkçe;
 * sorular Goethe sınav geleneğine uygun olarak Almanca sorulur.
 */

export type SkillId = "reading" | "listening" | "writing" | "speaking";
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
  /** "a1-r1", "zh-a1-r1" gibi kalıcı kimlik — değiştirme. */
  id: string;
  /** Hangi kursa ait: "de" (varsayılan) ya da "gsw-zh" (Zürih Almancası). */
  course?: "de" | "gsw-zh";
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

/**
 * Diyaloglar konuşmacıya bölünür; tek konuşmacılı metinlerde speaker boş kalır.
 * `audio` varsa oynatıcı önce onu çalar (gerçek kayıt/lehçe sentezi, /public
 * altında statik dosya); yoksa cihazın konuşma sentezine düşer.
 */
export type ListeningSegment = { speaker?: string; text: string; audio?: string };

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

/**
 * Konuşma görevi.
 *
 * Değerlendirme tarayıcının konuşma tanıyıcısıyla yapılır (bkz. lib/speech.ts):
 * elimizde bir tanıyıcı var, puanlayıcı yok. Bu yüzden hedefli düzeltme
 * akustikten değil **buradan** gelir — `confusions` alanına Türkçe konuşan
 * birinin o maddede yapacağı bilinen sapma önceden yazılır.
 *
 * Liste kısa ve tahmin edilebilir: ö/o, ü/u, ch, r, z=ts, w=v, s=z, sp/st,
 * eu=oy, ei=ay, ie=uzun i, uzun/kısa ünlü.
 */
export type SpeechConfusion = {
  /** Tanıyıcıdan çıkması beklenen yanlış biçim(ler). */
  heard: string[];
  /** Ne olduğu ve nasıl düzeltileceği — Türkçe, tek cümle. */
  fix: string;
  /** Doğrusu; sesli örnek bunun üzerinden çalınır. */
  expected?: string;
};

export type SpeakingTask = {
  /** Söylenecek Almanca metin. */
  de: string;
  /** Türkçe karşılığı — uyaran olarak önce bu gösterilir. */
  tr: string;
  /** Türkçe telaffuz ipucu (isteğe bağlı). */
  hint?: string;
  confusions?: SpeechConfusion[];
};

/** Tek tek söyleyiş çalışması: her görev bağımsız bir cümle. */
export type SpeakingDrillExercise = ExerciseBase & {
  skill: "speaking";
  tasks: SpeakingTask[];
  /**
   * Değerlendirmeyi kim yapıyor.
   *
   * `"asr"` (varsayılan) tarayıcının tanıyıcısını kullanır. `"self"` ise
   * tanıyıcıyı hiç çalıştırmaz ve öğrenci kendi değerlendirir.
   *
   * İkincisi Züritüütsch için gerekiyor: tarayıcının de-CH tanıyıcısı İsviçre
   * **standart** Almancasını tanıyor, lehçeyi değil. Lehçe tanıma bugün hâlâ
   * çözülmemiş bir problem (bu iş için özel eğitilmiş modellerde bile hata
   * oranı %25 civarında). Böyle bir tanıyıcıya lehçe cümlesi söyletmek yanlış
   * onay değil, daha kötüsünü üretirdi: doğru söyleyen öğrenciye "yanlış"
   * demek. Kapatmak, güvenilmez bir yargıdan iyidir.
   */
  judge?: "asr" | "self";
};

/**
 * Karşılıklı konuşma: uygulama sorar, öğrenci konuşur, cevaba göre dal seçilir.
 *
 * Açık uçlu bir muhatap değil (o dil modeli ister, ücretsiz değil); sınırlı bir
 * tema içinde önceden yazılmış dallar arasında niyet eşleştirmesi yapılır —
 * bkz. lib/dialogue.ts. Kapalı bir temada (kafede sipariş) bu, gerçek bir
 * konuşma hissi verecek kadar iyi çalışır.
 */
export type SpeakingDialogueExercise = ExerciseBase & {
  skill: "speaking";
  /** Konuşmanın turları; ilki `start` ile işaretlenen turdur. */
  dialogue: DialogueTurn[];
  /** Bu temanın pekiştirmek istediği kalıplar — sonunda özetlenir. */
  targets: Gloss[];
};

export type SpeakingExercise = SpeakingDrillExercise | SpeakingDialogueExercise;

export type SkillExercise =
  | ReadingExercise
  | ListeningExercise
  | WritingExercise
  | SpeakingExercise;
