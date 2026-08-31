/**
 * Uygulamanın ürettiği tüm SQL cümlelerini dosyaya döker.
 * Veritabanı gerekmez; çıktı gerçek PostgreSQL'de PREPARE ile doğrulanır.
 */
import { and, asc, eq, gt, inArray, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { dailyStats, profiles, reviews, userWords, words } from "../src/lib/db/schema";

const db = drizzle(new Pool({ connectionString: "postgresql://u:p@localhost/db" }));
const userId = "u1";
const today = "2026-01-01";
const now = new Date();
const out: string[] = [];

const add = (name: string, q: { toSQL: () => { sql: string } }) => {
  out.push(`-- ${name}\n${q.toSQL().sql};`);
};

add("profil oku", db.select().from(profiles).where(eq(profiles.userId, userId)));
add(
  "profil oluştur",
  db.insert(profiles).values({ userId, displayName: "x" }).onConflictDoNothing().returning(),
);
add(
  "günlük istatistik oku",
  db
    .select()
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), eq(dailyStats.day, today))),
);
add(
  "zamanı gelenler",
  db
    .select({ w: words, uw: userWords })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, now)))
    .orderBy(asc(userWords.dueAt))
    .limit(28),
);
add(
  "zamanı gelen sayısı",
  db
    .select({ count: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, now))),
);
add(
  "yeni kelimeler",
  db
    .select()
    .from(words)
    .where(
      and(
        inArray(words.niveau, ["A1", "A2"]),
        sql`not exists (
          select 1 from ${userWords}
          where ${userWords.wordId} = ${words.id} and ${userWords.userId} = ${userId}
        )`,
      ),
    )
    .orderBy(asc(words.niveau), asc(words.id))
    .limit(8),
);
add(
  "şık havuzu",
  db.select().from(words).where(inArray(words.niveau, ["A1"])).orderBy(sql`random()`).limit(120),
);
add(
  "kullanıcı kelimeleri",
  db
    .select()
    .from(userWords)
    .where(and(eq(userWords.userId, userId), inArray(userWords.wordId, [1, 2, 3]))),
);
add(
  "srs upsert",
  db
    .insert(userWords)
    .values({ userId, wordId: 1, state: 2, ease: 2.5, intervalDays: 3, dueAt: now })
    .onConflictDoUpdate({
      target: [userWords.userId, userWords.wordId],
      set: { state: 2, ease: 2.5, intervalDays: 3, dueAt: now, reps: 1, lapses: 0, correctStreak: 1, leech: false, lastReviewedAt: now },
    }),
);
add(
  "cevap kaydı",
  db.insert(reviews).values([{ userId, wordId: 1, game: "choice", correct: true, quality: 5, latencyMs: 900 }]),
);
add(
  "günlük istatistik upsert",
  db
    .insert(dailyStats)
    .values({ userId, day: today, reviews: 3, correct: 2, newWords: 1, xp: 30, seconds: 60 })
    .onConflictDoUpdate({
      target: [dailyStats.userId, dailyStats.day],
      set: {
        reviews: sql`${dailyStats.reviews} + 3`,
        correct: sql`${dailyStats.correct} + 2`,
        newWords: sql`${dailyStats.newWords} + 1`,
        xp: sql`${dailyStats.xp} + 30`,
        seconds: sql`${dailyStats.seconds} + 60`,
      },
    })
    .returning(),
);
add(
  "profil güncelle",
  db
    .update(profiles)
    .set({ currentStreak: 1, longestStreak: 1, lastActiveDay: today, totalXp: 10 })
    .where(eq(profiles.userId, userId)),
);
add(
  "seviye dağılımı",
  db
    .select({
      niveau: words.niveau,
      total: sql<number>`count(*)::int`,
      seen: sql<number>`count(${userWords.wordId})::int`,
      mastered: sql<number>`count(*) filter (where ${userWords.intervalDays} >= 21)::int`,
      familiar: sql<number>`count(*) filter (where ${userWords.intervalDays} >= 3 and ${userWords.intervalDays} < 21)::int`,
      learning: sql<number>`count(*) filter (where ${userWords.wordId} is not null and ${userWords.intervalDays} < 3)::int`,
    })
    .from(words)
    .leftJoin(userWords, and(eq(userWords.wordId, words.id), eq(userWords.userId, userId)))
    .groupBy(words.niveau)
    .orderBy(asc(words.niveau)),
);
add(
  "günlük seri",
  db
    .select()
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), gt(dailyStats.day, today)))
    .orderBy(asc(dailyStats.day)),
);
add(
  "oyun performansı",
  db
    .select({
      game: reviews.game,
      total: sql<number>`count(*)::int`,
      correct: sql<number>`count(*) filter (where ${reviews.correct})::int`,
    })
    .from(reviews)
    .where(eq(reviews.userId, userId))
    .groupBy(reviews.game),
);
add(
  "kelime tohumlama",
  db
    .insert(words)
    .values({ id: 1, de: "Haus", artikel: "das", tr: "ev", typ: "Nomen", niveau: "A1" })
    .onConflictDoUpdate({
      target: words.id,
      set: {
        de: sql`excluded.de`,
        artikel: sql`excluded.artikel`,
        tr: sql`excluded.tr`,
        formen: sql`excluded.formen`,
        typ: sql`excluded.typ`,
        niveau: sql`excluded.niveau`,
        beispiel: sql`excluded.beispiel`,
      },
    }),
);

console.log(out.join("\n\n"));
