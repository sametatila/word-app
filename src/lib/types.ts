import type { ErrorType } from "@/lib/errors";
export type GameId =
  | "intro"
  | "match"
  | "choice"
  | "artikel"
  | "cloze"
  | "scramble"
  | "typing"
  | "order"
  | "plural"
  | "listen"
  | "truefalse"
  | "translate"
  | "free_sentence"
  | "speak";

export const GAME_LABELS: Record<GameId, string> = {
  intro: "Yeni Kelime",
  match: "Eşleştirme",
  choice: "Doğru Anlam",
  artikel: "Artikel Yarışı",
  cloze: "Cümleyi Tamamla",
  scramble: "Harf Bulmacası",
  typing: "Yazarak Hatırla",
  order: "Cümleyi Diz",
  plural: "Çoğul Bilmece",
  listen: "Kulaktan Tanı",
  truefalse: "Doğru mu Yanlış mı",
  translate: "Çevir",
  free_sentence: "Cümle Kur",
  speak: "Sesli Söyle",
};

/**
 * Tek başına seçilip oynanabilen oyunlar.
 *
 * `intro` dışarıda: o bir oyun değil, yeni kelimenin tanıtım kartı. Yirmi tur
 * boyunca kart okumak bir seçenek olmamalı — yine de karışık turlarda ve tek
 * oyunlu turlarda yeni kelimelerin önüne kendiliğinden ekleniyor.
 *
 * `free_sentence` dışarıda: hakemi AI ve günde en çok iki kez çıkıyor
 * (lib/session.ts); "20 tur Cümle Kur" hem kotayı hem sabrı tüketirdi.
 *
 * `speak` de dışarıda ve sebebi başka: o bir oyun değil bir MOD. Yürürken
 * modu turun tamamını sesli sürüyor ve ekranda oynanmıyor; oyun seçicide bir
 * satır olarak durması, ne olduğunu yanlış anlatırdı. Cevapları yine de kendi
 * adıyla kaydediliyor, yoksa profil ekranındaki oyun başarısı tablosunda
 * sesli cevaplar yazma oyununun hanesine yazılırdı.
 */
export const PLAYABLE_GAMES = [
  "match",
  "choice",
  "artikel",
  "cloze",
  "scramble",
  "typing",
  "order",
  "plural",
  "listen",
  "truefalse",
  "translate",
] as const satisfies readonly GameId[];

export type PlayableGame = (typeof PLAYABLE_GAMES)[number];

export type RoundWord = {
  id: number;
  de: string;
  artikel: string | null;
  /** Kelimenin tek doğal Türkçe karşılığı. */
  tr: string;
  /**
   * Aynı kelimenin tek doğal İngilizce karşılığı.
   *
   * Ekranda Türkçenin altında duruyor ve yalnızca ikinci bir çeviri değil, bir
   * ayırt edici: Türkçede birbirine çöken kelimeler burada ayrışıyor
   * (er/sie/es üçü de "o", ama he/she/it). Bu yüzden veri tarafında
   * parantezli açıklamalara gerek kalmadı.
   *
   * Null olabilir: yenileme seviye seviye ilerliyor ve henüz sırası gelmemiş
   * kelimeler İngilizcesiz kalıyor. Arayüz bu durumda tek satır gösteriyor.
   */
  en: string | null;
  typ: string;
  niveau: string;
  beispiel: string | null;
  /** Örnek cümlenin doğal Türkçe çevirisi (varsa). */
  beispielTr: string | null;
  /** Aynı cümlenin doğal İngilizce çevirisi (varsa). */
  beispielEn: string | null;
  formen: string | null;
  isNew: boolean;
};

/**
 * Çoktan seçmeli bir şık.
 *
 * İki satır: `text` kararın verildiği satır, `sub` altındaki küçük satır.
 * Anlam sorulan turlarda `text` Türkçe, `sub` İngilizcedir; Almanca biçimin
 * sorulduğu turlarda `sub` boştur — orada ikinci bir dil yoktur, kelimenin
 * kendisi vardır.
 *
 * Şıkların düz metin yerine nesne olmasının sebebi eşitlik: doğru cevap
 * `text` üzerinden karşılaştırılıyor, İngilizce satır kararın parçası değil.
 */
export type Option = { text: string; sub: string | null };

export type Round =
  | { id: string; game: "intro"; word: RoundWord }
  // Yalnızca yürürken modu üretir ve tüketir: "Almancasını söyle". Ekran
  // oyunlarının hiçbiri bunu render etmez (GameSwitch'te bilinçli olarak yok),
  // çünkü sesli cevap yalnız yürüyüşte var. Taşıdığı tek şey kelime.
  | { id: string; game: "speak"; word: RoundWord }
  | { id: string; game: "match"; words: RoundWord[] }
  | { id: string; game: "choice"; word: RoundWord; options: Option[]; direction: "de-tr" | "tr-de" }
  | { id: string; game: "artikel"; word: RoundWord }
  | {
      id: string;
      game: "cloze";
      word: RoundWord;
      sentence: string;
      /** Cümlenin Türkçe çevirisi — seçim yaparken bağlamı anlamayı kolaylaştırır. */
      sentenceTr: string | null;
      /** Aynı cümlenin İngilizce çevirisi. */
      sentenceEn: string | null;
      answer: string;
      options: string[];
      /**
       * "type": şık yerine yazarak tamamlama (WP-14 merdiveni). Şıklar yine
       * turda durur — oturum içi basamak inişinde (`easeRound`) şıklı hâle
       * dönülebilsin diye.
       */
      mode?: "type";
    }
  | { id: string; game: "scramble"; word: RoundWord }
  | {
      id: string;
      game: "typing";
      word: RoundWord;
      alternatives: string[];
      /**
       * İpuçlu yazma: iskelet (ilk harfler) baştan açık ve ceza yok. Yeni
       * kelimenin aynı oturumdaki ilk yazılışı ve basamak inişi (WP-14).
       */
      assist?: boolean;
    }
  | {
      id: string;
      game: "order";
      word: RoundWord;
      /** Karıştırılmış kelimeler — öğrenci bunları sıraya dizer. */
      tokens: string[];
      /** Doğru sıra. Karşılaştırma diziyi birleştirerek yapılır. */
      answer: string[];
      /** Cümle sonundaki noktalama ayrı durur: son kelimeyi ele vermesin. */
      tail: string;
      sentenceTr: string | null;
      sentenceEn: string | null;
    }
  | {
      id: string;
      game: "plural";
      word: RoundWord;
      /** Doğru çoğul biçim, artikelsiz ("Ärzte"). */
      answer: string;
      options: string[];
    }
  | {
      id: string;
      game: "listen";
      word: RoundWord;
      /** İki dilli şıklar; doğru cevap kelimenin kendi karşılığıdır. */
      options: Option[];
    }
  | {
      id: string;
      game: "truefalse";
      word: RoundWord;
      /** Öne sürülen anlam — kelimenin kendi karşılığı ya da başka bir kelimenin. */
      claim: Option;
      isTrue: boolean;
    }
  | {
      id: string;
      game: "translate";
      word: RoundWord;
      /**
       * Çevrilecek cümle: kelimenin kendi örnek cümlesi. Türkçesi soru,
       * Almancası cevap; İngilizcesi ayırt edici olarak küçük yazıyla.
       */
      sentence: { tr: string; de: string; en: string | null };
      /** Kabul edilen başka kuruluşlar (içerikten; bugün boş). */
      alternatives: string[];
    }
  | {
      id: string;
      game: "free_sentence";
      word: RoundWord;
      /** Cümlede birlikte kullanılacak 1–2 kelime daha (havuzdan, aynı seviye). */
      partners: RoundWord[];
      /** Rubriğin seviyesi — kelimenin seviyesi. */
      level: string;
    };

export type Answer = {
  wordId: number;
  game: GameId;
  correct: boolean;
  latencyMs: number;
  hintUsed?: boolean;
  /**
   * Oyunun kendi verdiği SRS kalitesi (0–5). Yalnız kısmi puanlı oyunlar
   * gönderir (Çevir: yazım 4, sıra 3, yanlış 1); verilmezse sunucu doğruluk
   * ve hızdan hesaplar (`grade`). `correct=false` ama `quality=3` mümkündür:
   * cümle yanlış sayılır ve hata tipi kaydedilir, kelime lapse etmez.
   */
  quality?: number;
  /** Yanlışsa hata tipi — oyun sınıflandırır (bkz. lib/errors.ts). */
  errorType?: ErrorType;
  /** Yanlışın kendisi: seçilen şık / yazılan kelime. */
  detail?: string;
};

/** Oturumun sunucuda tutulan ilerlemesi — yarım kalan tur her cihazda aynı yerden sürer. */
export type SessionProgress = {
  index: number;
  correct: number;
  total: number;
  xp: number;
  missed: MissedWord[];
};

/** Oturum özetinde gösterilen, o turda yanlış bilinen kelime. */
export type MissedWord = { id: number; de: string; tr: string; en: string | null };

export type SessionPayload = {
  rounds: Round[];
  /** Yarım kalan oturum varsa nerede kalındığı; yeni kurulan turda null. */
  resume: SessionProgress | null;
  meta: {
    dueCount: number;
    newToday: number;
    reviewsToday: number;
    dailyGoal: number;
    currentStreak: number;
    totalXp: number;
    displayName: string | null;
    /** Kullanıcının profilde seçtiği CEFR seviyesi. Sistem bunu değiştirmez. */
    level: string;
    /** Seçilen seviyenin pekişme durumu — yalnızca artan bir ölçü. */
    coverage: { mastered: number; total: number };
    /**
     * Günlük yük kararı. Bir başarı notu değil, tempo:
     *   review — tekrar borcu birikmiş, bugün yeni kelime yok
     *   light  — takılan kelime oranı yüksek, yeni kelime yarıya iner
     *   normal — her şey yolunda
     */
    pacing: "normal" | "light" | "review";
    /** Takılan (leech) kelime sayısı — tempo kararının gerekçesi. */
    leeches: number;
    /**
     * Hayatta kalma turundaki rekor.
     *
     * Başlangıç kartındaki arena kartı için: tur yalnızca oturum ÖZETİNDEN
     * ulaşılabiliyordu, yani 20 turu bitirmeden görülemiyordu. Rekoru göstermek
     * için ayrı bir istek atmak yerine meta'ya bindiriliyor — kart zaten bu
     * paketle çiziliyor.
     */
    challengeBest: number;
  };
};

/** Bahisli etabın istemciden gelen sonucu. */
export type Wager = { correct: number; total: number; stake: number };

export type AnswerResult = {
  /**
   * Bahisli etabın puan farkı: hatasızsa artı, iki yanlışta eksi, aksi hâlde
   * sıfır. `xpGained` bunu zaten içeriyor; ayrı dönmesinin sebebi özet
   * ekranının bahsin sonucunu ayrıca söyleyebilmesi.
   */
  wagerXp: number;
  /** Bu turda pekişme eşiğini (21 gün) geçen kelime sayısı. */
  newlyMastered: number;
  xpGained: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  reviewsToday: number;
  dailyGoal: number;
  goalReached: boolean;
  /**
   * Bir gün kaçırılmıştı ve seri sıfırlanmak yerine kaldığı yerden sürdü.
   * Özet ekranı bunu söylüyor: kullanıcı kaybettiğini sandığı şeyi geri
   * aldığını bilmezse mekanizmanın hiçbir etkisi olmaz.
   */
  streakRepaired: boolean;
  /**
   * Yarın tekrarı gelecek kelime sayısı.
   *
   * Oturum sonunda geri dönmek için somut bir sebep veriyor. Önce yalnızca
   * "tekrar planına alındı" yazıyordu — doğru ama tarihsiz bir söz; kullanıcıya
   * ertesi gün uygulamayı açması için bir şey vermiyordu.
   */
  dueTomorrow: number;
};
