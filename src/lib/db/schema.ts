import {
  pgTable,
  serial,
  text,
  integer,
  real,
  timestamp,
  date,
  boolean,
  index,
  uniqueIndex,
  primaryKey,
  jsonb,
} from "drizzle-orm/pg-core";

/** Kelime havuzu (seed ile doldurulur, kullanıcıdan bağımsız). Kurs bazlıdır. */
export const words = pgTable(
  "words",
  {
    id: integer("id").primaryKey(),
    de: text("de").notNull(), // kursun hedef dilindeki biçim (gsw kursunda Züritüütsch)
    artikel: text("artikel"), // de kursunda der/die/das, gsw kursunda de/d/s
    /**
     * Kelimenin **tek** doğal Türkçe karşılığı.
     *
     * Eskiden burada virgülle ayrılmış üç dört anlam ve parantezli açıklamalar
     * dururdu ("açık olmak (dükkân, kapı)"). Ölçülen etki tersineydi: öğrenci
     * hangi anlamı ezberleyeceğini bilemiyor, çoktan seçmelide uzun şıklar
     * okunmuyor, yazarak hatırlamada hangi biçimin beklendiği belirsiz
     * kalıyordu. Artık tek karşılık var ve ayrım gerekiyorsa parantezle değil
     * daha kesin bir Türkçe ifadeyle yapılıyor ("öğrenci" / "üniversite
     * öğrencisi"). İkinci anlam gerekiyorsa yeri örnek cümledir.
     */
    tr: text("tr").notNull(),
    /**
     * Aynı kelimenin tek doğal İngilizce karşılığı.
     *
     * Yalnızca ikinci bir çeviri değil, bir ayırt edici: Türkçede birbirine
     * çöken kelimeler İngilizcede ayrışıyor (er/sie/es üçü de "o", ama "he" /
     * "she" / "it"; das Essen ile essen ikisi de "yemek", ama "food" ile
     * "to eat"). Fiiller "to" ile yazılır — isim/fiil çiftlerini ayıran şey bu.
     */
    en: text("en"),
    formen: text("formen"), // gsw kursunda Hochdeutsch köprüsü ("HD: …")
    typ: text("typ").notNull(), // Nomen | Verb | Sonstiges
    niveau: text("niveau").notNull(), // A1 | A2 | B1 | B2 | C1
    /**
     * Tek, tam ve kelimeyi **gerçekten içeren** bir örnek cümle.
     *
     * Kaynak Goethe listesinde bu alan çoğu maddede numaralı bir derlemeydi
     * ("1. … 2. … 3. …") ve bir kısmı kelimeyi hiç taşımıyordu (lang →
     * "Das Kleid ist zu kurz."). Boşluk doldurma ve cümle dizme turları
     * cümleyi kelimeden kurduğu için bu, oyunun kendisini bozuyordu.
     */
    beispiel: text("beispiel"),
    beispielTr: text("beispiel_tr"), // örnek cümlenin doğal Türkçe çevirisi
    beispielEn: text("beispiel_en"), // aynı cümlenin doğal İngilizce çevirisi
    rank: integer("rank"), // sıklık sırası (küçük = daha yaygın)
    course: text("course").notNull().default("de"), // de | gsw-zh
  },
  (t) => [
    index("words_niveau_idx").on(t.niveau),
    index("words_typ_idx").on(t.typ),
    index("words_rank_idx").on(t.niveau, t.rank),
    index("words_course_rank_idx").on(t.course, t.niveau, t.rank),
  ],
);

/** Kullanıcı profili + streak durumu */
export const profiles = pgTable("profiles", {
  userId: text("user_id").primaryKey(),
  displayName: text("display_name"),
  dailyGoal: integer("daily_goal").notNull().default(20), // gün başına hedef tekrar
  newPerDay: integer("new_per_day").notNull().default(15), // gün başına yeni kelime
  // Kullanıcının seçtiği CEFR seviyesi. Yalnızca kullanıcı değiştirir; sistem
  // performansa bakarak terfi/düşüş yapmaz (bkz. lib/session.ts, Strength).
  level: text("level").notNull().default("A1"),
  course: text("course").notNull().default("de"), // de | gsw-zh — çalışılan kurs
  // Seslendirme sesi. Null ise kursun varsayılanı kullanılır — mevcut
  // hesaplar için göç gerekmemesinin ve kurs değişince sesin kendiliğinden
  // doğru olana dönmesinin sebebi bu (bkz. lib/tts/voices.ts, resolveVoice).
  voice: text("voice"),
  // İlk girişte kurs/seviye soruldu mu? Null ise onboarding gösterilir.
  courseChosenAt: timestamp("course_chosen_at", { withTimezone: true }),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActiveDay: date("last_active_day"),
  totalXp: integer("total_xp").notNull().default(0),
  // Hayatta kalma turunun en iyi skoru. Cihazda değil burada durur: rekor
  // hesaba aittir, telefonda kırılan rekor tarayıcıda da görünmelidir.
  challengeBest: integer("challenge_best").notNull().default(0),
  /**
   * Hatırlatmanın gönderilebileceği **en erken** yerel saat.
   *
   * Kesin gönderim saati değil, bir alt sınır. Sebebi Vercel'in cron
   * davranışı: Hobby planında günde birden sık tetikleme deploy'da reddediliyor,
   * yani tur günde bir kez ve herkes için aynı UTC anında çalışıyor. Bu tek
   * anda "yerel saat tam 20:00 olsun" diye beklemek, saat dilimi batıda kalan
   * kullanıcıya hiç bildirim göndermemek anlamına gelirdi — kapı her gün
   * kapalı kalırdı. Varsayılan bu yüzden öğlen: turun çalıştığı anda
   * Türkiye'de akşam, Orta Avrupa'da akşamüstü oluyor ve ikisi de kapıdan
   * geçiyor.
   *
   * Cron saatlik çalışacak şekilde yükseltilirse (Pro planı) alan gerçek
   * anlamını kazanıyor ve kullanıcı kendi saatini seçebiliyor; kod tarafında
   * değişiklik gerekmiyor.
   *
   * Saat dilimi de burada duruyor çünkü bildirimi gönderen taraf sunucu ve o
   * an tarayıcıya soramıyor: "bugün çalışmadın" ifadesi ancak kullanıcının
   * günü biliniyorsa doğru olur.
   */
  reminderHour: integer("reminder_hour").notNull().default(12),
  timezone: text("timezone").notNull().default("Europe/Istanbul"),
  remindersEnabled: boolean("reminders_enabled").notNull().default(true),
  /**
   * En son hangi gün hatırlatma gönderildi.
   *
   * Kullanıcı başına, cihaz başına değil: üç cihazı olan biri üç bildirim
   * almamalı. Ayrıca cron'un günde birden çok kez çalıştığı kurulumlarda
   * tekrarı bu alan engelliyor — cron'un sıklığı değişse de kullanıcının
   * gördüğü şey değişmiyor.
   */
  lastReminderDay: date("last_reminder_day"),
  /**
   * Serinin en son ne zaman onarıldığı.
   *
   * Tek bir kaçırılan gün seriyi sıfırlıyordu ve bu, geri dönen kullanıcıyı
   * tam döndüğü anda cezalandırıyordu: dokuz günlük seri bir günlük bir
   * aksama yüzünden bire düşünce, geri gelmenin ödülü kayıp oluyordu.
   * Onarım tek bir kaçırılan günü affediyor ve ayda bir kullanılabiliyor —
   * her gün affeden bir seri, seri olmaktan çıkardı.
   */
  streakRepairAt: date("streak_repair_at"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Web push abonelikleri — cihaz başına bir satır.
 *
 * Uygulamanın geri çağırma kanalı yoktu: serisi kırılan kullanıcıya bunu
 * söyleyen hiçbir şey yoktu ve geri dönmesi tamamen kendi hatırlamasına
 * kalıyordu. Ölçülen kullanımda yedi kullanıcıdan yalnızca biri yedi ayrı
 * güne ulaşmıştı.
 *
 * Abonelik tarayıcıya ait, hesaba değil: aynı kişi telefonundan ve
 * bilgisayarından ayrı ayrı abone olur, ikisi de burada durur. Bu yüzden
 * "bugün bildirim gönderildi mi" bilgisi burada değil profilde tutuluyor.
 */
export const pushSubscriptions = pgTable(
  "push_subscriptions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    /** Push servisinin adresi — aboneliğin gerçek kimliği budur. */
    endpoint: text("endpoint").notNull(),
    p256dh: text("p256dh").notNull(),
    auth: text("auth").notNull(),
    /**
     * Arka arkaya başarısız gönderim sayısı.
     *
     * Push servisi 404/410 dönerse abonelik ölmüştür ve satır hemen silinir.
     * Geçici hatalar (ağ, 5xx) ise silmeyi hak etmiyor; onlar burada sayılıyor
     * ve ancak ısrar ederse abonelik düşüyor. Aksi hâlde tek bir kötü gece
     * bütün aboneleri silerdi.
     */
    failures: integer("failures").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("push_subscriptions_endpoint_idx").on(t.endpoint),
    index("push_subscriptions_user_idx").on(t.userId),
  ],
);

/** Kelime başına adaptif tekrar durumu (SM-2 türevi) */
export const userWords = pgTable(
  "user_words",
  {
    userId: text("user_id").notNull(),
    wordId: integer("word_id")
      .notNull()
      .references(() => words.id, { onDelete: "cascade" }),
    state: integer("state").notNull().default(0), // 0 yeni, 1 öğreniliyor, 2 tekrar
    ease: real("ease").notNull().default(2.5),
    intervalDays: real("interval_days").notNull().default(0),
    dueAt: timestamp("due_at", { withTimezone: true }).notNull().defaultNow(),
    reps: integer("reps").notNull().default(0),
    lapses: integer("lapses").notNull().default(0),
    correctStreak: integer("correct_streak").notNull().default(0),
    leech: boolean("leech").notNull().default(false),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.wordId] }),
    index("user_words_due_idx").on(t.userId, t.dueAt),
    index("user_words_state_idx").on(t.userId, t.state),
  ],
);

/** Tek tek cevaplar — analiz ve oyun dengesi için */
export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    wordId: integer("word_id").notNull(),
    game: text("game").notNull(),
    correct: boolean("correct").notNull(),
    quality: integer("quality").notNull(), // 0-5
    latencyMs: integer("latency_ms").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("reviews_user_idx").on(t.userId, t.createdAt)],
);

/** Günlük özet — streak, grafik ve hedef takibi */
export const dailyStats = pgTable(
  "daily_stats",
  {
    userId: text("user_id").notNull(),
    day: date("day").notNull(),
    reviews: integer("reviews").notNull().default(0),
    correct: integer("correct").notNull().default(0),
    newWords: integer("new_words").notNull().default(0),
    xp: integer("xp").notNull().default(0),
    seconds: integer("seconds").notNull().default(0),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.day] }),
    uniqueIndex("daily_stats_user_day_idx").on(t.userId, t.day),
  ],
);

/**
 * Beceri egzersizleri (okuma / dinleme / yazma).
 * İçerik repoda yazılır, `npm run db:seed:skills` ile buraya yüklenir ve
 * çalışma zamanında buradan servis edilir. `data` egzersizin tamamıdır
 * (sorular, ses bölümleri, yazma görevleri); liste kolonları hub ekranının
 * jsonb açmadan hızlı listelenmesi içindir.
 */
export const skillExercises = pgTable(
  "skill_exercises",
  {
    id: text("id").primaryKey(), // "a1-r1", "zh-a1-r1" gibi kalıcı kimlik
    skill: text("skill").notNull(), // reading | listening | writing
    level: text("level").notNull(), // A1 | A2 | B1 | B2 | C1
    course: text("course").notNull().default("de"), // de | gsw-zh
    title: text("title").notNull(),
    genre: text("genre").notNull(),
    minutes: integer("minutes").notNull(),
    items: integer("items").notNull(), // soru/görev sayısı (liste rozetleri için)
    position: integer("position").notNull().default(0),
    data: jsonb("data").notNull(),
  },
  (t) => [index("skill_exercises_level_idx").on(t.level, t.skill, t.position)],
);

/**
 * Kullanıcının beceri egzersizi sonuçları — cihazlar arası senkron ve XP
 * bütünlüğü için sunucuda tutulur. XP ilk tamamlamada tam verilir; tekrar
 * çözümlerde yalnızca en iyi skor iyileşirse aradaki fark eklenir.
 */
export const userSkills = pgTable(
  "user_skills",
  {
    userId: text("user_id").notNull(),
    exerciseId: text("exercise_id").notNull(),
    correct: integer("correct").notNull().default(0), // en iyi skor
    total: integer("total").notNull(),
    attempts: integer("attempts").notNull().default(1),
    lastAt: timestamp("last_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.exerciseId] })],
);

/**
 * Yarım kalan oturum — sunucuda, kullanıcı başına tek satır.
 *
 * Bu daha önce cihazın localStorage'ında duruyordu ve her cihaz kendi turunu
 * kuruyordu: telefonda tanıtılan yeni kelime, cevaplar sunucuya ulaşana kadar
 * bilgisayarda hâlâ "görülmemiş" sayıldığı için aynı kelime iki kez yeni
 * olarak geliyordu. Turun kendisi (hangi kelimeler, hangi oyunlar) ve nerede
 * kalındığı hesabın verisidir; cihazın değil.
 *
 * `index >= rounds` ise oturum bitmiştir: bir sonraki istek yeni tur kurar.
 */
export const sessionState = pgTable("session_state", {
  userId: text("user_id").primaryKey(),
  day: date("day").notNull(), // kullanıcının yerel günü — ertesi gün tur yenilenir
  course: text("course").notNull().default("de"), // kurs değişirse tur da değişmeli
  rounds: jsonb("rounds").notNull(), // Round[] — tur kuyruğunun tamamı
  index: integer("index").notNull().default(0), // kaçıncı turda kalındı
  correct: integer("correct").notNull().default(0),
  total: integer("total").notNull().default(0),
  xp: integer("xp").notNull().default(0),
  missed: jsonb("missed").notNull().default([]), // özet ekranındaki "zorlandıkların"
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});


/**
 * Günün ortak turu — kullanıcı başına günde bir sonuç.
 *
 * Uygulamadaki bütün turlar kişiye özeldi: herkesin kuyruğu kendi tekrar
 * planından çıkıyordu, dolayısıyla iki kişinin skoru karşılaştırılamıyordu ve
 * paylaşılan bir sonuç kimseye bir şey ifade etmiyordu. Günün turunda aynı
 * kurs ve seviyedeki herkes **aynı kelimeleri aynı sırayla** görüyor; skor bu
 * yüzden anlamlı, tablo bu yüzden adil.
 *
 * Tek hak bilinçli: ikinci deneme, tabloyu en çok tekrar edenin kazandığı bir
 * yarışa çevirirdi. Wordle'ın günde tek bulmacası da aynı sebeple tek.
 */
export const dailyScores = pgTable(
  "daily_scores",
  {
    userId: text("user_id").notNull(),
    day: date("day").notNull(),
    /** Turun kimliği: aynı gün farklı seviyeler farklı turlar oynar. */
    course: text("course").notNull(),
    level: text("level").notNull(),
    score: integer("score").notNull().default(0),
    correct: integer("correct").notNull().default(0),
    total: integer("total").notNull().default(0),
    /** En uzun doğru serisi — paylaşılan özette ve tabloda görünür. */
    bestCombo: integer("best_combo").notNull().default(0),
    seconds: integer("seconds").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.day] }),
    // Günün tablosu: aynı gün, aynı kurs ve seviyedekiler puana göre sıralanır.
    index("daily_scores_board_idx").on(t.day, t.course, t.level, t.score),
  ],
);

/**
 * Günlük görevlerin ödül kaydı.
 *
 * Yalnızca ödülü ALINMIŞ görevler yazılıyor; ilerlemenin kendisi burada
 * tutulmuyor. Sebebi, ilerlemenin zaten başka tablolarda olması: "10 kelime
 * tekrar et" `daily_stats`'ta, "bir ders bitir" `user_lessons`'ta duruyor.
 * Aynı sayıyı ikinci bir yerde biriktirmek, iki sayacın ayrışması demekti —
 * ve ayrıştığında hangisinin doğru olduğu belli olmazdı.
 */
export const questClaims = pgTable(
  "quest_claims",
  {
    userId: text("user_id").notNull(),
    day: date("day").notNull(),
    /** Görev kimliği ya da günün üçünü birden bitirme ödülü için "all". */
    questId: text("quest_id").notNull(),
    xp: integer("xp").notNull().default(0),
    claimedAt: timestamp("claimed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.day, t.questId] })],
);

export type Word = typeof words.$inferSelect;
export type UserWord = typeof userWords.$inferSelect;
export type Profile = typeof profiles.$inferSelect;

/**
 * Ders ilerlemesi ve kuralların tekrar kuyruğu.
 *
 * Kelimelerin tekrarı vardı ama dilbilgisinin yoktu: öğrenci aynı kuralı
 * defalarca yanlış yapıp bunu hiç görmüyordu. Ders bitince kuralın durumu
 * buraya yazılıyor ve zamanı gelince ders tekrar öneriliyor.
 *
 * Kelime tablosundan ayrı duruyor çünkü ölçüsü farklı: kelime "hatırladın mı",
 * kural "kurabildin mi". İkisini aynı tabloya sıkıştırmak ikisinin de
 * zamanlamasını bozardı.
 */
export const userLessons = pgTable(
  "user_lessons",
  {
    userId: text("user_id").notNull(),
    lessonId: text("lesson_id").notNull(),
    /** Kuralın kimliği — aynı kural birden çok derste geçebilir. */
    ruleId: text("rule_id").notNull(),
    /** Alıştırmalarda doğru sayısı (en iyi deneme). */
    correct: integer("correct").notNull().default(0),
    total: integer("total").notNull(),
    /** Rol yapma tamamlandı mı — dersin asıl parçası o. */
    roleplayDone: boolean("roleplay_done").notNull().default(false),
    attempts: integer("attempts").notNull().default(1),
    /** Bir sonraki tekrar; kelimelerdeki gibi artan aralıklarla uzuyor. */
    dueAt: timestamp("due_at", { withTimezone: true }).notNull().defaultNow(),
    intervalDays: integer("interval_days").notNull().default(0),
    lastAt: timestamp("last_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })],
);

/**
 * Rol yapma turlarının metin kaydı — geliştirme amaçlı, süre sınırlı.
 *
 * Neden var: konuşma kalitesindeki sorunlar ancak gerçek konuşmaya bakarak
 * anlaşılıyor. Modelin kendini tekrar edip konuşmayı döngüye sokması ölçüm
 * senaryolarında görünmüyor çünkü o senaryolar sekiz turda bitiyor; gerçek
 * kullanıcı daha uzun konuşuyor ve örüntü orada çıkıyor.
 *
 * Neyin saklandığı bilinçli olarak dar:
 *   - Öğrencinin **metne dökülmüş** cevabı. Ses kaydı YOK; tanıyıcı zaten
 *     tarayıcıda çalışıyor ve ses hiçbir zaman sunucuya gelmiyor.
 *   - Modelin cevabı, düzeltme ve öneri satırlarıyla birlikte.
 *   - Hangi ders ve hangi tur.
 *
 * `expiresAt` her satırda duruyor ve yazarken hesaplanıyor: kayıt kalıcı bir
 * birikim değil, geçici bir teşhis penceresi. Süresi geçenler her yazmada
 * temizleniyor, yani ayrı bir zamanlanmış işe gerek yok.
 */
export const roleplayLogs = pgTable(
  "roleplay_logs",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    lessonId: text("lesson_id").notNull(),
    /** Konuşmanın kaçıncı turu — döngü aramak için sıra gerekiyor. */
    turn: integer("turn").notNull(),
    /** Öğrencinin söylediği (metne dökülmüş hâli). */
    said: text("said").notNull(),
    /** Modelin cevabı — ham, işaret satırları dâhil. */
    reply: text("reply").notNull(),
    /**
     * Cevabı hangi sağlayıcı ve model verdi.
     *
     * Buna ihtiyaç, hangi sağlayıcının kullanıldığını kimsenin bilmemesinden
     * doğdu. Zincir sırayla çalışıyor ve anahtarı olmayan sağlayıcı sessizce
     * atlanıyor; sonuç olarak uygulama sorunsuz çalışırken birincil sağlayıcı
     * hiç çağrılmıyor olabiliyor ve bu dışarıdan görünmüyordu. Sağlayıcı
     * panelinde kullanım sıfır görününce, sorunun anahtarda mı, panelin
     * gecikmesinde mi, yoksa zincirin başka bir sağlayıcıya düşmesinde mi
     * olduğu ayırt edilemiyordu.
     *
     * Eski satırlar için boş — sütun sonradan eklendi.
     */
    provider: text("provider"),
    model: text("model"),
    /**
     * Sağlayıcının cevapta bildirdiği kalan hak (ham başlıklar).
     *
     * Limite ne kadar yaklaşıldığı ancak buradan görülüyor: 429 gelene kadar
     * her şey normal görünüyor ve limit dolduğunda bunu ilk öğrenen kullanıcı
     * oluyordu.
     */
    limits: jsonb("limits").$type<Record<string, string>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    /** Bu tarihten sonra silinir. */
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (t) => [index("roleplay_logs_user_idx").on(t.userId, t.createdAt)],
);
