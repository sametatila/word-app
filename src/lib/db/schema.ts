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
    tr: text("tr").notNull(),
    formen: text("formen"), // gsw kursunda Hochdeutsch köprüsü ("HD: …")
    typ: text("typ").notNull(), // Nomen | Verb | Sonstiges
    niveau: text("niveau").notNull(), // A1 | A2 | B1 | B2 | C1
    beispiel: text("beispiel"),
    beispielTr: text("beispiel_tr"), // örnek cümlenin doğal Türkçe çevirisi
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
  // İlk girişte kurs/seviye soruldu mu? Null ise onboarding gösterilir.
  courseChosenAt: timestamp("course_chosen_at", { withTimezone: true }),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActiveDay: date("last_active_day"),
  totalXp: integer("total_xp").notNull().default(0),
  // Hayatta kalma turunun en iyi skoru. Cihazda değil burada durur: rekor
  // hesaba aittir, telefonda kırılan rekor tarayıcıda da görünmelidir.
  challengeBest: integer("challenge_best").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

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


export type Word = typeof words.$inferSelect;
export type UserWord = typeof userWords.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
