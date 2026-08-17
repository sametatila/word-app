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
  | "truefalse";

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
};

/**
 * Tek başına seçilip oynanabilen oyunlar.
 *
 * `intro` dışarıda: o bir oyun değil, yeni kelimenin tanıtım kartı. Yirmi tur
 * boyunca kart okumak bir seçenek olmamalı — yine de karışık turlarda ve tek
 * oyunlu turlarda yeni kelimelerin önüne kendiliğinden ekleniyor.
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
] as const satisfies readonly GameId[];

export type PlayableGame = (typeof PLAYABLE_GAMES)[number];

export type RoundWord = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string | null;
  /** Örnek cümlenin doğal Türkçe çevirisi (varsa). */
  beispielTr: string | null;
  formen: string | null;
  isNew: boolean;
};

export type Round =
  | { id: string; game: "intro"; word: RoundWord }
  | { id: string; game: "match"; words: RoundWord[] }
  | { id: string; game: "choice"; word: RoundWord; options: string[]; direction: "de-tr" | "tr-de" }
  | { id: string; game: "artikel"; word: RoundWord }
  | {
      id: string;
      game: "cloze";
      word: RoundWord;
      sentence: string;
      /** Cümlenin Türkçe çevirisi — seçim yaparken bağlamı anlamayı kolaylaştırır. */
      sentenceTr: string | null;
      answer: string;
      options: string[];
    }
  | { id: string; game: "scramble"; word: RoundWord }
  | { id: string; game: "typing"; word: RoundWord; alternatives: string[] }
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
      /** Türkçe şıklar; doğru cevap kelimenin kendi karşılığıdır. */
      options: string[];
    }
  | {
      id: string;
      game: "truefalse";
      word: RoundWord;
      /** Öne sürülen anlam — kelimenin kendi karşılığı ya da başka bir kelimenin. */
      claim: string;
      isTrue: boolean;
    };

export type Answer = {
  wordId: number;
  game: GameId;
  correct: boolean;
  latencyMs: number;
  hintUsed?: boolean;
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
export type MissedWord = { id: number; de: string; tr: string };

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
  };
};

export type AnswerResult = {
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
