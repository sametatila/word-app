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

/**
 * Egzersize özel küçük sözlükçe: metindeki kilit kelimeler.
 *
 * `tr` ve `en` **tek** doğal karşılıktır — kelime havuzundaki kuralın aynısı.
 * Ama sözlükçe havuzdan bir noktada ayrılıyor: karşılık, kelimenin sözlükteki
 * birinci anlamı değil **bu metindeki** anlamı olmalı. Alışveriş ilanındaki
 * `das Angebot` "teklif" değil "indirim"dir. Anlam havuzdakiyle aynıysa
 * havuzun sözcüğü birebir kullanılır: aynı kelimeye iki ekranda iki farklı
 * karşılık vermek uygulamayı kendisiyle çelişir hâle getiriyordu (895
 * maddenin 392'sinde durum buydu).
 *
 * `hd` ve `note` bilgiyi `tr`'nin içinden çıkarıyor. Züritüütsch kursunda
 * karşılığın yanında Hochdeutsch köprüsü gerekiyor ("daire (Wohnung)") ve
 * bazı kelimelerin karşılığı yok, açıklaması var ("Znüni — kuşluk yemeği,
 * saat 9 civarı"). İkisi de öğrencinin ihtiyacı olan şey; parantez içinde
 * çeviriye yapıştırılınca karşılık tek olmaktan çıkıyordu.
 */
export type Gloss = {
  de: string;
  /** Tek doğal Türkçe karşılık — bu metindeki anlamıyla. */
  tr: string;
  /** Aynı anlamın tek doğal İngilizce karşılığı. */
  en?: string;
  /** Züritüütsch maddelerinde Hochdeutsch biçimi ("Wohnung"). */
  hd?: string;
  /** Karşılığı olmayan kültür kelimelerinde kısa Türkçe not. */
  note?: string;
};

export type SkillQuestion = {
  /**
   * Soru türü (WP-70 şeması). Bugün hepsi çoktan seçmeli; `truefalse`
   * ["Richtig","Falsch"] şıklı olanlar için, `gapfill`/`produce` WP-72'nin
   * yazılı üretim soruları için ayrılmış. Verilmezse `mcq`.
   */
  kind?: "mcq" | "truefalse" | "gapfill" | "produce" | "short_answer" | "order" | "dictation";
  /** Soru — Almanca (Goethe tarzı). Seviyeye uygun sadelikte yazılır. */
  text: string;
  /** Şıklar. Doğru/yanlış soruları için ["Richtig", "Falsch"]; yazılı türlerde boş. */
  options: string[];
  /** Doğru şıkkın indeksi; yazılı türlerde 0 (kullanılmaz). */
  answer: number;
  /**
   * Yazılı türler (WP-31): `gapfill` metinden kelime/sayı, `short_answer`
   * 1–5 kelime, `dictation` dinlenen cümle. İlk madde kanonik cevap, geri
   * kalanı kabul edilen biçimler; eşleşme umlaut/büyük-küçük harf ve tek
   * harflik sapmaya (≥ 5 harf) toleranslı.
   */
  accept?: string[];
  /** `order`: doğru sıra — oyuncu karışık gösterir. */
  items?: string[];
  /** Cevaptan sonra gösterilen Türkçe açıklama: neden doğru, metinde nerede. */
  explain: string;
};

type ExerciseBase = {
  /** "a1-r1", "zh-a1-r1" gibi kalıcı kimlik — değiştirme. */
  id: string;
  /**
   * CEFR yapabilirlik etiketleri (WP-43 haritası; ör. "a1.self.introduce").
   * Egzersizin hangi "…yapabilirim" ifadesine kanıt olduğunu söyler.
   */
  cando?: string[];
  /** Hangi kursa ait: "de" (varsayılan) ya da "gsw-zh" (Zürih Almancası). */
  /** Hedef dil/lehçe. Kapalı union'du; İngilizce içerik temsil edilemiyordu. */
  course?: "de" | "gsw-zh" | "en";
  /**
   * Immersion ünite numarası (1-tabanlı) — hangi tematik üniteye ait olduğunu
   * belgeler (ör. A1 Ünite 1 "Tanışma"). Bugün yerleşim yine liste sırasına göre
   * (ünite içeriği dizinin başında durur); tag ileride konum-bağımsız yerleşime
   * geçmek için hazır. Verilmezse köprü/konum yerleşimine düşer.
   */
  unit?: number;
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
      /**
       * Serbest cümle (WP-12): verilen kelimelerle özgün cümle; hakem AI
       * rubriği (`/api/assess`), sağlayıcı yoksa kural tabanlı yedek.
       */
      kind: "sentence";
      /** Cümlede geçmesi gereken 2–3 kelime. */
      words: Gloss[];
      /** İsteğe bağlı yönerge, Türkçe ("geçmiş zamanda"). */
      prompt?: string;
      /** Örnek cevap — değerlendirme sonrası gösterilir. */
      sample?: string;
    }
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
      /**
       * Gelen mesaja cevap (WP-31): `stimulus` zorunlu — e-posta, mesaj, ilan.
       * Değerlendirme serbest yazmayla aynı (AI rubriği); rubrik görevi
       * uyaranla birlikte görür.
       */
      kind: "reply";
      prompt: string;
      stimulus: string;
      checklist: string[];
      minWords: number;
      phrases: Gloss[];
      sample: string;
    }
  | {
      /** Form doldurma (WP-31): alan → kısa cevap, tam (toleranslı) eşleşme. */
      kind: "form";
      /** Türkçe senaryo: kim, hangi form. */
      prompt: string;
      /** Formu dolduran kişinin bilgileri, Türkçe (öğrenci Almanca alanlara yazar). */
      facts: string;
      fields: { label: string; answer: string; accept?: string[] }[];
    }
  | {
      /** Yeniden yaz (WP-31): verilen cümleyi başka biçimde — resmî, olumsuz, geçmiş. */
      kind: "rewrite";
      /** Türkçe yönerge: "resmî hitapla yaz". */
      prompt: string;
      source: string;
      answer: string;
      alternatives?: string[];
      /** Gerekçe, Türkçe. */
      why?: string;
    }
  | {
      /** Özet (B1+, WP-31): metni en çok N cümleyle özetle; AI rubriği. */
      kind: "summary";
      prompt: string;
      source: string;
      maxSentences: number;
      sample: string;
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
  /** Aynı cümlenin doğal İngilizce karşılığı. */
  en?: string;
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
/**
 * Açık diyalog teması (WP-23): sağlayıcı varken dil modeli bu rolü oynar,
 * senaryo (`dialogue`) yedek olarak kalır. `intro` sahneyi anlatır.
 */
export type DialogueTheme = {
  /** Modelin rolü, Almanca: "Kellnerin in einem Café". */
  role: string;
  /** Konuşmanın hedefi, Türkçe: model konuşmayı buraya sürer. */
  goal: string;
  /** Sınırlar, Türkçe (isteğe bağlı): "fiyat sorarsa 3–5 Euro arası söyle". */
  limits?: string;
};
export type SpeakingDialogueExercise = ExerciseBase & {
  skill: "speaking";
  /** Konuşmanın turları; ilki `start` ile işaretlenen turdur. */
  dialogue: DialogueTurn[];
  /** Bu temanın pekiştirmek istediği kalıplar — sonunda özetlenir. */
  targets: Gloss[];
  /** Varsa ve sağlayıcı açıksa açık uçlu diyalog (WP-23). */
  theme?: DialogueTheme;
};

/**
 * Monolog (WP-21): 30–60 saniye tek başına konuşma — kendini tanıt, gününü
 * anlat, bir fikri savun. Hazırlık (madde işaretleri) → kayıt → transkript →
 * rubrik (`kind: "speaking"`). Tanıyıcı yoksa kendi kaydını dinleyip kontrol
 * listesiyle öz değerlendirme.
 */
export type SpeakingMonologueExercise = ExerciseBase & {
  skill: "speaking";
  monologue: {
    /** Türkçe görev: "Kendini tanıt: adın, nereli olduğun, işin, hobin." */
    promptTr: string;
    /** Hazırlıkta gösterilen madde işaretleri, Türkçe (3–5). */
    bulletsTr: string[];
    /** Kullanılması beklenen kalıplar. */
    targets: Gloss[];
    minSeconds: number;
    maxSeconds: number;
    /** Örnek monolog, Almanca — sonuçtan sonra açılır. */
    sampleDe: string;
    /** Rubrik için ek ipucu (isteğe bağlı): "Perfekt bekle". */
    rubricHint?: string;
  };
};
export type SpeakingExercise = SpeakingDrillExercise | SpeakingDialogueExercise | SpeakingMonologueExercise;

export type SkillExercise =
  | ReadingExercise
  | ListeningExercise
  | WritingExercise
  | SpeakingExercise;
