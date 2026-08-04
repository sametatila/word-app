import "server-only";
import { and, asc, eq, gt, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, profiles, reviews, userWords, words } from "@/lib/db/schema";
import { grade, schedule, xpForQuality, type SrsState } from "@/lib/srs";
import type { Answer, AnswerResult, Round, RoundWord, SessionPayload } from "@/lib/types";

const LEVEL_ORDER = ["A1", "A2", "B1"];
const ROUNDS_PER_SESSION = 14;

export async function ensureProfile(userId: string, name?: string | null) {
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId));
  if (existing) return existing;
  const [created] = await db
    .insert(profiles)
    .values({ userId, displayName: name ?? null })
    .onConflictDoNothing()
    .returning();
  if (created) return created;
  const [again] = await db.select().from(profiles).where(eq(profiles.userId, userId));
  return again;
}

function toRoundWord(w: typeof words.$inferSelect, isNew: boolean): RoundWord {
  return {
    id: w.id,
    de: w.de,
    artikel: w.artikel,
    tr: w.tr,
    typ: w.typ,
    niveau: w.niveau,
    beispiel: w.beispiel,
    formen: w.formen,
    isNew,
  };
}

/**
 * Oturum kuyruğunu kurar: önce zamanı gelen tekrarlar, sonra yeni kelimeler.
 * `extra` modunda günlük yeni kelime kotası yok sayılır — öğrenmeye devam etmek
 * isteyen kullanıcı hiçbir zaman duvara toslamaz.
 */
export async function buildSession(
  userId: string,
  today: string,
  extra = false,
): Promise<SessionPayload> {
  const profile = await ensureProfile(userId);
  const now = new Date();

  const [stat] = await db
    .select()
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), eq(dailyStats.day, today)));

  const newToday = stat?.newWords ?? 0;
  const reviewsToday = stat?.reviews ?? 0;

  // 1) Zamanı gelen tekrarlar
  const dueRows = await db
    .select({ w: words, uw: userWords })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, now)))
    .orderBy(asc(userWords.dueAt))
    .limit(ROUNDS_PER_SESSION * 2);

  const [{ count: dueCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, now)));

  // 2) Kalan kontenjan kadar yeni kelime
  const newBudget = extra ? 10 : Math.max(0, profile.newPerDay - newToday);
  const levelsUpTo = LEVEL_ORDER.slice(0, Math.max(1, LEVEL_ORDER.indexOf(profile.level) + 1));

  // Günlük kota bir hız ayarıdır, duvar değil: tekrar kuyruğu zayıfsa oturumu
  // dolduracak kadar yeni kelime her hâlükârda gelir (tek turluk oturum olmaz).
  const deficit = Math.max(0, 6 - dueRows.length);
  const newLimit = Math.min(8, Math.max(newBudget, deficit));

  // Henüz hiç görülmemiş kelimeler: id listesini taşımak yerine NOT EXISTS.
  let newRows: (typeof words.$inferSelect)[] = [];
  if (newLimit > 0) {
    newRows = await db
      .select()
      .from(words)
      .where(
        and(
          inArray(words.niveau, levelsUpTo),
          sql`not exists (
            select 1 from ${userWords}
            where ${userWords.wordId} = ${words.id} and ${userWords.userId} = ${userId}
          )`,
        ),
      )
      // Seviye içinde en yaygın kelimeler önce gelir (sıklık sırası).
      .orderBy(asc(words.niveau), sql`${words.rank} asc nulls last`, asc(words.id))
      .limit(newLimit);
  }

  // 3) Şıklar için havuz
  const pool = await db
    .select()
    .from(words)
    .where(inArray(words.niveau, levelsUpTo))
    .orderBy(sql`random()`)
    .limit(120);

  const dueWords = dueRows.map((r) => ({ word: toRoundWord(r.w, false), state: r.uw.state }));
  const newWords = newRows.map((r) => ({ word: toRoundWord(r, true), state: 0 }));

  // Kuyruk zayıfsa yakın zamanda gelecek tekrarları öne çek: oturum asla boş kalmaz.
  // Son 30 dakikada zaten sorulmuş kelimeler dışarıda bırakılır — aynı kelimeyi
  // arka arkaya sormak öğrenciyi yorar ve bir şey öğretmez.
  if (dueWords.length + newWords.length < 6) {
    const early = await db
      .select({ w: words, uw: userWords })
      .from(userWords)
      .innerJoin(words, eq(words.id, userWords.wordId))
      .where(
        and(
          eq(userWords.userId, userId),
          gt(userWords.dueAt, now),
          sql`(${userWords.lastReviewedAt} is null or ${userWords.lastReviewedAt} < now() - interval '30 minutes')`,
        ),
      )
      .orderBy(asc(userWords.dueAt))
      .limit(10 - dueWords.length - newWords.length);
    for (const r of early) {
      dueWords.push({ word: toRoundWord(r.w, false), state: r.uw.state });
    }
  }

  const rounds = composeRounds(dueWords, newWords, pool);

  // Yazma turlarında aynı Türkçe anlama sahip diğer Almanca kelimeler de kabul
  // edilir: "hareket etmek, kalkmak" isteminde tek bir doğru cevap dayatmak haksız.
  const typingTrs = rounds.filter((r) => r.game === "typing").map((r) => r.word.tr);
  if (typingTrs.length) {
    const synonyms = await db
      .select({ de: words.de, tr: words.tr })
      .from(words)
      .where(inArray(words.tr, [...new Set(typingTrs)]));
    for (const r of rounds) {
      if (r.game !== "typing") continue;
      r.alternatives = synonyms
        .filter((s) => s.tr === r.word.tr && s.de !== r.word.de)
        .map((s) => s.de)
        .slice(0, 6);
    }
  }

  return {
    rounds,
    meta: {
      dueCount,
      newToday,
      reviewsToday,
      dailyGoal: profile.dailyGoal,
      currentStreak: profile.currentStreak,
      totalXp: profile.totalXp,
      displayName: profile.displayName,
    },
  };
}

/**
 * Oyun seçimi: kelimenin durumuna göre uygun oyunu atar ve aynı oyunun
 * arka arkaya tekrarlanmasını engelleyerek monotonluğu kırar.
 */
function composeRounds(
  due: { word: RoundWord; state: number }[],
  fresh: { word: RoundWord; state: number }[],
  pool: (typeof words.$inferSelect)[],
): Round[] {
  const rounds: Round[] = [];
  let seq = 0;
  const nextId = () => `r${++seq}`;

  // Yeni kelimeler önce tanıtım kartı, ardından tanıma oyunu olarak girer.
  const queue: { word: RoundWord; state: number }[] = [];
  for (const item of fresh) {
    queue.push({ ...item, state: -1 }); // -1 => intro
    queue.push(item);
  }
  // Tekrarları araya serpiştir
  const merged: { word: RoundWord; state: number }[] = [];
  const a = [...due];
  const b = [...queue];
  while (a.length || b.length) {
    if (a.length) merged.push(a.shift()!);
    if (a.length) merged.push(a.shift()!);
    if (b.length) merged.push(b.shift()!);
  }

  // Eşleştirme turu yalnızca 5 uygun kelime varsa kurulur; o kelimeler
  // ayrılır ve tek başlarına tekrar sorulmaz. 5'ten azsa hiçbiri ayrılmaz.
  const matchCandidates = merged.filter((m) => m.state >= 1).slice(0, 5);
  const useMatch = matchCandidates.length === 5;
  const reserved = new Set(useMatch ? matchCandidates.map((m) => m.word.id) : []);
  let matchInserted = !useMatch;

  let lastGame = "";
  for (const item of merged) {
    if (rounds.length >= ROUNDS_PER_SESSION) break;
    if (!matchInserted && rounds.length >= 3) {
      rounds.push({ id: nextId(), game: "match", words: matchCandidates.map((m) => m.word) });
      matchInserted = true;
      lastGame = "match";
      continue;
    }
    if (reserved.has(item.word.id)) continue;

    const round = pickRound(item.word, item.state, pool, lastGame, nextId);
    if (!round) continue;
    rounds.push(round);
    lastGame = round.game;
  }

  // Eşleştirme turu sıraya girmediyse (oturum kısa kaldıysa) sona ekle.
  if (!matchInserted) {
    rounds.push({ id: nextId(), game: "match", words: matchCandidates.map((m) => m.word) });
  }
  return rounds;
}

function pickRound(
  word: RoundWord,
  state: number,
  pool: (typeof words.$inferSelect)[],
  lastGame: string,
  nextId: () => string,
): Round | null {
  if (state === -1) return { id: nextId(), game: "intro", word };

  const candidates: Round["game"][] = [];
  if (state === 0) {
    // Kelimeyi ilk kez gördü: önce tanıma, üretim daha sonra.
    candidates.push("choice");
    if (word.artikel) candidates.push("artikel");
  } else if (state === 1) {
    candidates.push("choice");
    if (word.artikel) candidates.push("artikel");
    if (word.de.length <= 12) candidates.push("scramble");
  } else {
    candidates.push("typing", "cloze", "choice");
    if (word.artikel) candidates.push("artikel");
    if (word.de.length <= 12) candidates.push("scramble");
  }

  const usable = candidates.filter((g) => g !== lastGame);
  const order = usable.length ? usable : candidates;

  for (const game of shuffle(order)) {
    const round = makeRound(game, word, pool, nextId);
    if (round) return round;
  }
  return { id: nextId(), game: "choice", word, options: optionsFor(word, pool), direction: "de-tr" };
}

function makeRound(
  game: Round["game"],
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  nextId: () => string,
): Round | null {
  switch (game) {
    case "choice": {
      const direction = Math.random() < 0.35 ? "tr-de" : "de-tr";
      return {
        id: nextId(),
        game: "choice",
        word,
        options: optionsFor(word, pool, direction),
        direction,
      };
    }
    case "artikel":
      return word.artikel ? { id: nextId(), game: "artikel", word } : null;
    case "scramble":
      return word.de.length >= 3 && word.de.length <= 12
        ? { id: nextId(), game: "scramble", word }
        : null;
    case "typing":
      return { id: nextId(), game: "typing", word, alternatives: [] };
    case "cloze": {
      const cloze = buildCloze(word);
      if (!cloze) return null;
      return {
        id: nextId(),
        game: "cloze",
        word,
        sentence: cloze.sentence,
        answer: cloze.answer,
        options: shuffle([
          cloze.answer,
          ...pool
            .filter((p) => p.id !== word.id && p.typ === word.typ)
            .slice(0, 3)
            .map((p) => p.de),
        ]).slice(0, 4),
      };
    }
    default:
      return null;
  }
}

/** Örnek cümlede kelimeyi boşlukla değiştirir; uygun cümle yoksa null döner. */
function buildCloze(word: RoundWord): { sentence: string; answer: string } | null {
  const raw = word.beispiel?.split(/(?<=[.!?])\s+/)[0]?.trim();
  if (!raw || raw.length < 12 || raw.length > 110) return null;
  const stem = word.de.replace(/^sich\s+/, "");
  if (stem.length < 3) return null;
  const re = new RegExp(`\\b${escapeRegExp(stem)}\\w{0,4}\\b`, "i");
  const match = raw.match(re);
  if (!match) return null;
  return { sentence: raw.replace(re, "_____"), answer: match[0] };
}

/** Şıklar sorunun yönüne göre Türkçe ya da Almanca üretilir. */
function optionsFor(
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  direction: "de-tr" | "tr-de" = "de-tr",
): string[] {
  // Almanca şıklarda artikel de görünür: "die Apotheke" kelimenin bir parçasıdır.
  const label = (p: { de: string; tr: string; artikel: string | null }) =>
    direction === "de-tr" ? p.tr : p.artikel ? `${p.artikel} ${p.de}` : p.de;
  const target = label(word);
  const others = pool.filter((p) => p.id !== word.id && label(p) !== target);
  const sameType = others.filter((p) => p.typ === word.typ);
  const picks = shuffle(sameType.length >= 3 ? sameType : others)
    .slice(0, 3)
    .map(label);
  return shuffle([target, ...picks]);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Cevapları işler: SRS güncellemesi + günlük istatistik + streak. */
export async function submitAnswers(
  userId: string,
  answers: Answer[],
  today: string,
  seconds: number,
): Promise<AnswerResult> {
  const profile = await ensureProfile(userId);
  const now = new Date();
  const wordIds = [...new Set(answers.map((a) => a.wordId))];

  const existing = wordIds.length
    ? await db
        .select()
        .from(userWords)
        .where(and(eq(userWords.userId, userId), inArray(userWords.wordId, wordIds)))
    : [];
  const byId = new Map(existing.map((r) => [r.wordId, r]));

  let xpGained = 0;
  let correctCount = 0;
  let newCount = 0;
  const reviewRows: (typeof reviews.$inferInsert)[] = [];
  const upserts: (typeof userWords.$inferInsert)[] = [];

  for (const ans of answers) {
    const prevRow = byId.get(ans.wordId);
    const prev: SrsState = prevRow
      ? {
          state: prevRow.state,
          ease: prevRow.ease,
          intervalDays: prevRow.intervalDays,
          reps: prevRow.reps,
          lapses: prevRow.lapses,
          correctStreak: prevRow.correctStreak,
          leech: prevRow.leech,
          dueAt: prevRow.dueAt,
          lastReviewedAt: prevRow.lastReviewedAt,
        }
      : {
          state: 0,
          ease: 2.5,
          intervalDays: 0,
          reps: 0,
          lapses: 0,
          correctStreak: 0,
          leech: false,
          dueAt: now,
        };

    if (!prevRow) newCount += 1;
    const q = grade(ans.game, ans.correct, ans.latencyMs, ans.hintUsed);
    const next = schedule(prev, q, now);

    xpGained += xpForQuality(q);
    if (ans.correct) correctCount += 1;

    reviewRows.push({
      userId,
      wordId: ans.wordId,
      game: ans.game,
      correct: ans.correct,
      quality: q,
      latencyMs: Math.min(ans.latencyMs, 600000),
    });

    upserts.push({
      userId,
      wordId: ans.wordId,
      state: next.state,
      ease: next.ease,
      intervalDays: next.intervalDays,
      dueAt: next.dueAt,
      reps: next.reps,
      lapses: next.lapses,
      correctStreak: next.correctStreak,
      leech: next.leech,
      lastReviewedAt: now,
    });
    byId.set(ans.wordId, { ...(prevRow ?? ({} as never)), ...upserts[upserts.length - 1] } as never);
  }

  for (const row of upserts) {
    await db
      .insert(userWords)
      .values(row)
      .onConflictDoUpdate({
        target: [userWords.userId, userWords.wordId],
        set: {
          state: row.state,
          ease: row.ease,
          intervalDays: row.intervalDays,
          dueAt: row.dueAt,
          reps: row.reps,
          lapses: row.lapses,
          correctStreak: row.correctStreak,
          leech: row.leech,
          lastReviewedAt: row.lastReviewedAt,
        },
      });
  }

  if (reviewRows.length) await db.insert(reviews).values(reviewRows);

  const [stat] = await db
    .insert(dailyStats)
    .values({
      userId,
      day: today,
      reviews: answers.length,
      correct: correctCount,
      newWords: newCount,
      xp: xpGained,
      seconds: Math.min(seconds, 7200),
    })
    .onConflictDoUpdate({
      target: [dailyStats.userId, dailyStats.day],
      set: {
        reviews: sql`${dailyStats.reviews} + ${answers.length}`,
        correct: sql`${dailyStats.correct} + ${correctCount}`,
        newWords: sql`${dailyStats.newWords} + ${newCount}`,
        xp: sql`${dailyStats.xp} + ${xpGained}`,
        seconds: sql`${dailyStats.seconds} + ${Math.min(seconds, 7200)}`,
      },
    })
    .returning();

  // Streak: bugün ilk kez aktifse güncellenir.
  let { currentStreak, longestStreak } = profile;
  if (profile.lastActiveDay !== today) {
    const yesterday = shiftDay(today, -1);
    currentStreak = profile.lastActiveDay === yesterday ? profile.currentStreak + 1 : 1;
    longestStreak = Math.max(profile.longestStreak, currentStreak);
  }

  await db
    .update(profiles)
    .set({
      currentStreak,
      longestStreak,
      lastActiveDay: today,
      totalXp: profile.totalXp + xpGained,
    })
    .where(eq(profiles.userId, userId));

  return {
    xpGained,
    totalXp: profile.totalXp + xpGained,
    currentStreak,
    longestStreak,
    reviewsToday: stat.reviews,
    dailyGoal: profile.dailyGoal,
    goalReached: stat.reviews >= profile.dailyGoal,
  };
}

/** "Bunu zaten biliyorum": kelime pekişmiş sayılır, tekrar kuyruğuna girmez. */
export const KNOWN_INTERVAL_DAYS = 21;

export async function markKnown(userId: string, wordId: number) {
  const now = new Date();
  const dueAt = new Date(now.getTime() + KNOWN_INTERVAL_DAYS * 86400000);
  await ensureProfile(userId);
  await db
    .insert(userWords)
    .values({
      userId,
      wordId,
      state: 2,
      ease: 2.6,
      intervalDays: KNOWN_INTERVAL_DAYS,
      dueAt,
      reps: 1,
      correctStreak: 1,
      lastReviewedAt: now,
    })
    .onConflictDoUpdate({
      target: [userWords.userId, userWords.wordId],
      set: { state: 2, intervalDays: KNOWN_INTERVAL_DAYS, dueAt, lastReviewedAt: now },
    });
  return dueAt;
}

export function shiftDay(day: string, delta: number) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

/** İlerleme ekranı verileri */
export async function getProgress(userId: string, today: string) {
  const profile = await ensureProfile(userId);

  const levels = await db
    .select({
      niveau: words.niveau,
      total: sql<number>`count(*)::int`,
      seen: sql<number>`count(${userWords.wordId})::int`,
      mastered: sql<number>`count(*) filter (where ${userWords.intervalDays} >= 21)::int`,
      familiar: sql<number>`count(*) filter (where ${userWords.intervalDays} >= 3 and ${userWords.intervalDays} < 21)::int`,
      learning: sql<number>`count(*) filter (where ${userWords.wordId} is not null and ${userWords.intervalDays} < 3)::int`,
    })
    .from(words)
    .leftJoin(
      userWords,
      and(eq(userWords.wordId, words.id), eq(userWords.userId, userId)),
    )
    .groupBy(words.niveau)
    .orderBy(asc(words.niveau));

  const since = shiftDay(today, -55);
  const days = await db
    .select()
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), gt(dailyStats.day, since)))
    .orderBy(asc(dailyStats.day));

  const [{ dueNow }] = await db
    .select({ dueNow: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, new Date())));

  const [{ upcoming }] = await db
    .select({ upcoming: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(eq(userWords.userId, userId), gt(userWords.dueAt, new Date())));

  const games = await db
    .select({
      game: reviews.game,
      total: sql<number>`count(*)::int`,
      correct: sql<number>`count(*) filter (where ${reviews.correct})::int`,
    })
    .from(reviews)
    .where(eq(reviews.userId, userId))
    .groupBy(reviews.game);

  return { profile, levels, days, dueNow, upcoming, games };
}
