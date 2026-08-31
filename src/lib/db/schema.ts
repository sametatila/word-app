export * from "./auth-schema";
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
  /**
   * Neden Almanca (WP-65): work | daily | exam | swiss. Görev ve içerik
   * önerileri buna göre; kullanıcı profilden değiştirebilir. Null = eski
   * hesap, hiç sorulmadı.
   */
  goal: text("goal"),
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

/**
 * Cheatsheet maddelerinin tekrar planı.
 *
 * `user_words` ile AYNI alanlar ve aynı motor (lib/srs) — ayrı tablo olmasının
 * sebebi teknik: `user_words.word_id` sözlük tablosuna bağlı bir tamsayı, buradaki
 * madde ise bir tablo hücresi ("verben|nehmen|Perfekt"). Sözlüğe sahte kelime
 * satırları eklemek, kelime havuzu sayan her sorguyu (kapsam, günlük hedef,
 * sıralama) sessizce bozardı.
 *
 * Ayrılığın öğrenme tarafında da karşılığı var: kelime kuyruğu anlam öğretiyor,
 * bu kuyruk BİÇİM. Aynı kelimenin dört hâli burada dört ayrı madde ve yalnızca
 * cheatsheet ekranında sorularak ilerliyor — kelime oyunlarına karışmıyor.
 */
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
    /**
     * Yanlış cevabın hata tipi (WP-02) — `lib/errors.ts` listesinden; doğru
     * cevapta null. İstemci sınıflandırır (ne sorulduğunu o bilir), sunucu
     * yalnız listeden doğrular.
     */
    errorType: text("error_type"),
    /**
     * Yanlışın kendisi: seçilen şık, yazılan kelime (≤ 60 karakter). "Anlam"
     * hatasında hangi kelimeyle karıştırıldığını söyler — WP-51'in karıştırma
     * çiftleri buradan çıkar. Serbest metin değil: şık metni ya da tek kelime.
     */
    detail: text("detail"),
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
    /**
     * Beceri ve seviye, egzersiz tablosundan kopya (WP-01).
     *
     * `skill_exercises` ile birleştirerek de bulunabilirdi; kopyalanmasının
     * sebebi analitik: "bu hafta A2 dinlemede kaç kişi kaç puan" sorusunun
     * jsonb içerik tablosuna hiç dokunmadan cevaplanması ve egzersiz bir gün
     * silinse ya da seviyesi değişse bile o günkü kaydın ne olduğunu
     * söylemesi. Eski satırlar migrasyonda dolduruldu; null yalnız eski bir
     * istemcinin bilinmeyen egzersiz göndermesi hâlinde kalır.
     */
    skill: text("skill"),
    level: text("level"),
    /**
     * Son denemenin puanı, 0–100. Çoktan seçmeli egzersizde doğru/toplam;
     * serbest yazma ve konuşmada AI rubriğinin genel puanı (WP-03). `correct`
     * en iyi denemeyi saklar, bu ise son denemeyi: yetkinlik "en iyi gün"den
     * değil, bugün ne yapabildiğinden çıkarılır.
     */
    lastScore: integer("last_score"),
    /** İlk deneme — "bu egzersize ilk ne zaman girdi" sorusu için. */
    firstAt: timestamp("first_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.exerciseId] }),
    index("user_skills_skill_level_idx").on(t.skill, t.level),
  ],
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

/**
 * Kazanılmış rozetler.
 *
 * Yalnızca AÇILMA ANI yazılıyor; ilerlemenin kendisi burada tutulmuyor.
 * Sebebi görev tablosundakiyle aynı: "1.000 kelime pekiştir" ilerlemesi zaten
 * `user_words`'te, "100 ders bitir" `user_lessons`'ta duruyor. Aynı sayıyı
 * ikinci bir yerde biriktirmek, er geç ayrışan iki sayı demek.
 *
 * Bu tasarımın bir yan faydası var: rozetler geriye dönük hesaplanabiliyor.
 * Sistem yayına alındığında hiç kimse sıfırdan başlamıyor — herkes o güne
 * kadar gerçekten yaptığı işin rozetlerini bir anda açıyor.
 */
export const achievements = pgTable(
  "achievements",
  {
    userId: text("user_id").notNull(),
    achievementId: text("achievement_id").notNull(),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).notNull().defaultNow(),
    /** Kullanıcı kutlamayı gördü mü — görülmemiş rozet özet ekranında patlar. */
    seen: boolean("seen").notNull().default(false),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.achievementId] }),
    index("achievements_user_idx").on(t.userId, t.unlockedAt),
  ],
);

/**
 * Ürün olayları.
 *
 * Bugüne kadarki her tasarım kararı ölçüme dayandı ama ölçüm elle SQL
 * yazılarak yapıldı ve yalnızca ARDINDA iz bırakan şeyler görülebildi:
 * cevaplar, dersler, XP. Görülemeyenler tam da en çok merak edilenlerdi —
 * kaç kişi başlangıç kartını görüp hiç başlamadan çıktı, hangi sekmeye
 * hiç dokunulmadı, bildirime tıklanıp uygulama açıldı mı.
 *
 * Tablo bilerek dar: kim, hangi gün, hangi olay, isteğe bağlı bir sayı.
 * Serbest metin ya da jsonb yok — şema büyüdükçe kimsenin bakmadığı bir
 * çöplüğe dönüşmesin. Kişisel veri de yok: olay adları sabit bir listeden
 * geliyor.
 */
export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    day: date("day").notNull(),
    /** Sabit listeden bir ad — bkz. lib/events.ts */
    name: text("name").notNull(),
    /** Olayla ilgili tek sayı (tur uzunluğu, sekme sırası…); yoksa 0. */
    value: integer("value").notNull().default(0),
    /**
     * Kısa, kapalı sözlükten etiket: oyun adı, hata tipi, "level:B1".
     *
     * Tek sayı öğrenme olaylarına yetmedi — "hangi tür üretim görevi, kaç
     * puan" iki boyut ve ikisini tek tam sayıya sıkıştırmak (kind×1000+puan
     * gibi) sorguları okunmaz yapardı. Serbest metin yasağı sürüyor: biçim
     * sunucuda doğrulanıyor (lib/events.ts `cleanKind`), 32 karakteri ve
     * `[a-z0-9_:-]` kümesini aşan değer düşüyor.
     */
    kind: text("kind"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("events_user_idx").on(t.userId, t.createdAt),
    index("events_name_day_idx").on(t.name, t.day),
  ],
);

/**
 * Modül sınavı (patron turu) kayıtları.
 *
 * Ders yolundaki her modül on dersten oluşuyor ve sonunda süre baskılı bir
 * sınav var. Tutulan şey skor değil GEÇME: sınavın bir kaybetme koşulu var
 * (süre biterse kaybedilir) ve yol haritasında bir kez geçilmiş modül taç
 * takıyor. En iyi kalan süre de saklanıyor — tekrar girmek için bir sebep.
 *
 * Ayrı tablo, çünkü ölçüsü derslerinkinden farklı: `user_lessons` "bu dersi
 * çalıştın mı" diyor, burası "modülün tamamını süreye karşı kullanabildin mi".
 */
export const moduleClears = pgTable(
  "module_clears",
  {
    userId: text("user_id").notNull(),
    course: text("course").notNull(),
    level: text("level").notNull(),
    /** Modülün seviyedeki sırası, 0 tabanlı. */
    moduleIndex: integer("module_index").notNull(),
    /** Geçildiğinde kalan en yüksek süre (saniye) — rekor budur. */
    bestLeft: integer("best_left").notNull().default(0),
    attempts: integer("attempts").notNull().default(1),
    clearedAt: timestamp("cleared_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.course, t.level, t.moduleIndex] })],
);

/**
 * AI çağrılarının kaydı.
 *
 * `roleplay_logs` yalnızca BAŞARILI bir rol yapma turunun sağlayıcısını
 * tutuyordu ve süreli bir teşhis penceresiydi. Üç şey görünmüyordu:
 *
 *   1. **Hatalar.** Zincir sırayla deniyor ve düşen sağlayıcı sessizce
 *      atlanıyor. Her istekte 429 alan bir birincil, dışarıdan bakınca
 *      "hiç kullanılmıyor" gibi görünüyordu — oysa her seferinde bir gidiş
 *      dönüş ve bir kullanıcı gecikmesi harcıyordu.
 *   2. **Koç ve yazıya çevirme.** Rol yapmanın dışındaki çağrılar hiç
 *      kaydedilmiyordu, yani kullanımın bir kısmı ölçünün dışındaydı.
 *   3. **Maliyetin bileşenleri.** Jeton sayısı, ses saniyesi ve gecikme
 *      yoktu; "hangi model daha pahalı, hangisi daha yavaş" sorusu
 *      cevaplanamıyordu.
 *
 * Bu tablo kalıcı ve dar: analiz için gereken sayılar var, konuşmanın
 * kendisi yok. Metin `roleplay_logs`ta duruyor ve orada süreli kalmaya devam
 * ediyor — ikisi farklı işler, biri teşhis biri muhasebe.
 */
export const aiUsage = pgTable(
  "ai_usage",
  {
    id: serial("id").primaryKey(),
    /** Kim tetikledi — arka plan işlerinde boş. */
    userId: text("user_id"),
    day: date("day").notNull(),
    /** roleplay · coach · stt */
    kind: text("kind").notNull(),
    provider: text("provider").notNull(),
    model: text("model").notNull(),
    ok: boolean("ok").notNull(),
    /** HTTP durumu; ağ hatasında 0. */
    status: integer("status").notNull().default(0),
    /** Kısa hata metni — ayıklamak için, tam gövde değil. */
    error: text("error"),
    /** İlk cevaba kadar geçen süre (ms). */
    ms: integer("ms").notNull().default(0),
    promptTokens: integer("prompt_tokens"),
    completionTokens: integer("completion_tokens"),
    /** Yazıya çevirmede klibin uzunluğu. */
    audioSeconds: integer("audio_seconds"),
    /** Sağlayıcının bildirdiği kalan hak (ham başlıklar). */
    limits: jsonb("limits").$type<Record<string, string>>(),
    /**
     * Yazıya çevirmede beklenen ve duyulan metin.
     *
     * "Doğru söyledim ama yanlış saydı" şikâyeti ancak bu ikisi yan yana
     * görülünce çözülebiliyor: sorun telaffuzda mı, tanıyıcıda mı, yoksa
     * kabul mantığında mı? Tahminle uğraşmanın bedeli bir tur boyunca
     * ölçüldü — ilk seferinde artikelin düşmesi olduğu ancak koda bakarak
     * anlaşıldı, veriye bakarak değil.
     *
     * Yalnızca tek kelimelik cevaplar; ses hiçbir zaman saklanmıyor.
     */
    expected: text("expected"),
    heard: text("heard"),
    /**
     * Tanıyıcının kendi güveni (0–1), veren sağlayıcılarda.
     *
     * Eşiği tahminle koymamak için tutuluyor. "Arkadaki konuşmaları da
     * algılıyor, başka dillerde kelimeler duyduğunu iddia ediyor" şikâyetinin
     * cevabı bu sayıda: gerçek cevaplarla uydurmaların değerleri yan yana
     * görülmeden hangi eşiğin doğru olduğu bilinemez. Daha önce eşik ölçmeden
     * kondu ve gerçek cihazda "her cevap duyamadım"a dönüştü.
     */
    confidence: real("confidence"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("ai_usage_day_idx").on(t.day, t.kind),
    index("ai_usage_provider_idx").on(t.provider, t.createdAt),
  ],
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
    /** "practice" | "exam" (WP-22); eski satırlarda boş = alıştırma. */
    mode: text("mode"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    /** Bu tarihten sonra silinir. */
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (t) => [index("roleplay_logs_user_idx").on(t.userId, t.createdAt)],
);

/**
 * AI değerlendirme kayıtları (WP-03).
 *
 * Her satır bir üretim görevinin rubrikli sonucu: serbest cümle, yazma,
 * konuşma dökümü, rol yapma. `answer` öğrencinin metnidir ve BİLEREK burada
 * saklanır — kendi yazılarını geri okuyabilsin, silebilsin (WP-52); `events`
 * tablosuna yalnız puan gider. `result` doğrulanmış JSON (lib/assess-prompts
 * `Assessment`). `hash` görev+cevap özeti: 24 saat içinde aynı cevap
 * yeniden gönderilirse model çağrılmaz.
 */
export const assessments = pgTable(
  "assessments",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    /** sentence | writing | speaking | roleplay */
    kind: text("kind").notNull(),
    exerciseId: text("exercise_id"),
    level: text("level").notNull(),
    /** Kullanıcının yerel günü — kota ve gelişim grafiği buna göre. */
    day: date("day").notNull(),
    answer: text("answer").notNull(),
    /**
     * Doğrulanmış JSON; sağlayıcı kapalıyken KUYRUK kaydı olarak null
     * (WP-30): metin saklanır, `/api/cron/assess` servis açılınca puanlar ve
     * kullanıcıya bildirim gider. Null satırlar önbellek ve gelişim
     * sorgularına girmez.
     */
    result: jsonb("result"),
    /** "groq/llama-3.3-70b-versatile" gibi; önbellekten dönende de aynı. */
    provider: text("provider"),
    hash: text("hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("assessments_user_idx").on(t.userId, t.createdAt),
    index("assessments_user_day_idx").on(t.userId, t.day),
    index("assessments_hash_idx").on(t.userId, t.hash),
  ],
);

/**
 * Yerleştirme testleri (WP-40). Her alma bir satır: önerilen seviye, kabul
 * edilen (kullanıcı değiştirebilir — karar hep onun), beceri başına tahmin
 * ve cevapların tamamı (kalibrasyon: 10 kişilik karşılaştırma bu satırlardan
 * yapılır, `docs/plan/40-assessment-exams.md`). 30 günde bir yeniden alınabilir.
 */
export const placements = pgTable(
  "placements",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
    suggested: text("suggested").notNull(),
    accepted: text("accepted"),
    /** { vocab, grammar, reading, listening } → seviye ya da null */
    perSkill: jsonb("per_skill").notNull(),
    /** PlacementAnswer[] — madde kimliği, seviye, doğru mu. */
    answers: jsonb("answers").notNull(),
    /** Toplam doğru oranı 0–100. */
    score: integer("score").notNull().default(0),
  },
  (t) => [index("placements_user_idx").on(t.userId, t.at)],
);

/**
 * Sınavlar (WP-42 haftalık kullanım sınavı; WP-41 seviye/modül sınavı da
 * buraya yazar). `kind` + `week` (haftanın Pazartesi'si) tek hak kuralı:
 * aynı hafta ikinci satır yazılmaz. `answers` kelime başına doğru/yanlış —
 * sonraki haftalar aynı kelimeyi sormasın ve kalibrasyon yapılabilsin diye.
 */
export const exams = pgTable(
  "exams",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    /** weekly | module | level */
    kind: text("kind").notNull(),
    week: date("week").notNull(),
    level: text("level").notNull(),
    /** 0–100 */
    score: integer("score").notNull(),
    correct: integer("correct").notNull(),
    total: integer("total").notNull(),
    answers: jsonb("answers").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("exams_user_idx").on(t.userId, t.kind, t.week),
    uniqueIndex("exams_user_kind_week_idx").on(t.userId, t.kind, t.week),
  ],
);
