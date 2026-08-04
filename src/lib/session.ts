import "server-only";
import { and, asc, desc, eq, gt, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, profiles, reviews, userWords, words } from "@/lib/db/schema";
import { grade, schedule, xpForQuality, type SrsState } from "@/lib/srs";
import type { Answer, AnswerResult, Round, RoundWord, SessionPayload } from "@/lib/types";

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

type Difficulty = "easy" | "normal" | "hard";
const ROUNDS_PER_SESSION = 14;

/**
 * Adaptif seviye modeli.
 *
 * Profildeki seçim bir **başlangıç noktasıdır**, tavan değil. A1 ve A2 zorunlu
 * bir geçit değildir: B1 diyen öğrenci doğrudan B1 kelimeleriyle başlar, iyi
 * giderse B2/C1'e yükselir, zorlanırsa sistem onu aşağı indirir. Gerçek seviyeyi
 * her zaman performans belirler.
 *
 * Kelimeler tek bir seviyeden değil, aktif seviyenin çevresinden gelir:
 * çoğunluk aktif seviyeden, bir kısmı bir alt seviyeden (boşluk doldurma).
 */
function levelBand(activeLevel: string) {
  const idx = Math.max(0, Math.min(LEVEL_ORDER.length - 1, LEVEL_ORDER.indexOf(activeLevel)));
  const level = LEVEL_ORDER[idx];
  const below = idx > 0 ? LEVEL_ORDER[idx - 1] : null;
  const above = idx < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[idx + 1] : null;
  return {
    idx,
    level,
    below,
    above,
    /** Şık havuzu: yakın seviyeler kafa karıştırıcı çeldirici üretir. */
    pool: [below, level, above].filter((l): l is string => l !== null),
  };
}

/**
 * Yeni kelime seçimi: %70 aktif seviye, kalanı bir alt seviyeden.
 * Aktif seviyede görülmemiş kelime kalmadıysa üst seviyeden devam edilir —
 * öğrenci hiçbir zaman "bitti" duvarına toslamaz.
 */
function pickNewWords(
  candidates: (typeof words.$inferSelect)[],
  band: ReturnType<typeof levelBand>,
  limit: number,
) {
  if (limit <= 0) return [];
  const at = (lv: string | null) => (lv ? candidates.filter((w) => w.niveau === lv) : []);
  const primary = mixByType(at(band.level), Math.ceil(limit * 0.7));
  const chosen = [...primary];
  const taken = new Set(chosen.map((w) => w.id));
  // Sıra önemli: önce bir alt seviyeden boşluk doldurma, sonra aktif seviyenin
  // kalanı. Üst seviye yalnızca aktif seviye tükendiğinde devreye girer —
  // yoksa A1'deki öğrenciye durduk yere A2 kelimesi gelir.
  for (const group of [at(band.below), at(band.level), at(band.above), candidates]) {
    if (chosen.length >= limit) break;
    for (const w of mixByType(group, limit)) {
      if (chosen.length >= limit) break;
      if (taken.has(w.id)) continue;
      taken.add(w.id);
      chosen.push(w);
    }
  }
  return chosen.slice(0, limit);
}

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

/**
 * Sıklık sırasını koruyarak kelime türlerini serpiştirir: aksi hâlde öğrenci
 * arka arkaya yirmi zamir/bağlaç görüyor. Aday havuzu sıralıdır; buradan
 * sırayla isim / fiil / diğer alınarak dengeli bir grup kurulur.
 */
function mixByType(candidates: (typeof words.$inferSelect)[], limit: number) {
  const buckets: Record<string, (typeof words.$inferSelect)[]> = { Nomen: [], Verb: [], Sonstiges: [] };
  for (const w of candidates) (buckets[w.typ] ?? buckets.Sonstiges).push(w);
  const order = ["Nomen", "Verb", "Sonstiges"];
  const out: (typeof words.$inferSelect)[] = [];
  let i = 0;
  while (out.length < limit && order.some((k) => buckets[k].length)) {
    const bucket = buckets[order[i % order.length]];
    const next = bucket.shift();
    if (next) out.push(next);
    i++;
  }
  return out.length ? out : candidates.slice(0, limit);
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

  // Tüm kelime sorguları aktif kursa bağlıdır: kurs değiştirince diğer kursun
  // tekrarları beklemeye geçer, geri dönünce kaldığı yerden sürer.
  const course = profile.course;

  // 1) Zamanı gelen tekrarlar
  const dueRows = await db
    .select({ w: words, uw: userWords })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, now), eq(words.course, course)))
    .orderBy(asc(userWords.dueAt))
    .limit(ROUNDS_PER_SESSION * 2);

  const [{ count: dueCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(and(eq(userWords.userId, userId), lte(userWords.dueAt, now), eq(words.course, course)));

  // 2) Kalan kontenjan kadar yeni kelime
  const newBudget = extra ? 10 : Math.max(0, profile.newPerDay - newToday);
  // Seviyeyi performans belirler; profildeki seçim yalnızca başlangıç noktasıdır.
  const band = levelBand(profile.activeLevel);

  // Günlük kota bir hız ayarıdır, duvar değil: tekrar kuyruğu zayıfsa oturumu
  // dolduracak kadar yeni kelime her hâlükârda gelir (tek turluk oturum olmaz).
  const deficit = Math.max(0, 6 - dueRows.length);
  const newLimit = Math.min(8, Math.max(newBudget, deficit));

  // Henüz hiç görülmemiş kelimeler: id listesini taşımak yerine NOT EXISTS.
  let newRows: (typeof words.$inferSelect)[] = [];
  if (newLimit > 0) {
    const candidates = await db
      .select()
      .from(words)
      .where(
        and(
          eq(words.course, course),
          inArray(words.niveau, band.pool),
          sql`not exists (
            select 1 from ${userWords}
            where ${userWords.wordId} = ${words.id} and ${userWords.userId} = ${userId}
          )`,
        ),
      )
      // Seviye içinde en yaygın kelimeler önce gelir (sıklık sırası).
      .orderBy(sql`${words.rank} asc nulls last`, asc(words.id))
      .limit(newLimit * 12);
    newRows = pickNewWords(candidates, band, newLimit);
  }

  // 3) Şıklar için havuz — aktif seviyenin çevresi ve tekrar edilen kelimelerin
  //    seviyeleri. Yakın seviyeden çeldirici, uzak seviyeden gelene göre çok
  //    daha kafa karıştırıcıdır.
  const poolLevels = [...new Set([...band.pool, ...dueRows.map((r) => r.w.niveau)])];
  const pool = await db
    .select()
    .from(words)
    .where(and(eq(words.course, course), inArray(words.niveau, poolLevels)))
    .orderBy(sql`random()`)
    .limit(140);

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
          eq(words.course, course),
          sql`(${userWords.lastReviewedAt} is null or ${userWords.lastReviewedAt} < now() - interval '30 minutes')`,
        ),
      )
      .orderBy(asc(userWords.dueAt))
      .limit(10 - dueWords.length - newWords.length);
    for (const r of early) {
      dueWords.push({ word: toRoundWord(r.w, false), state: r.uw.state });
    }
  }

  // Son cevaplara bakarak zorluğu ayarla: iyi gidiyorsa üretim ağırlıklı,
  // zorlanıyorsa tanıma ağırlıklı oyunlar seçilir.
  // Seviye elle değiştirildiyse ölçüm o andan itibaren yapılır: eski seviyedeki
  // başarı, yeni seviyedeki zorluğu belirlememeli.
  const since = profile.levelChangedAt;
  const [recent] = await db
    .select({
      total: sql<number>`count(*)::int`,
      correct: sql<number>`count(*) filter (where ${reviews.correct})::int`,
    })
    .from(
      db
        .select({ correct: reviews.correct })
        .from(reviews)
        .where(
          since
            ? and(eq(reviews.userId, userId), gt(reviews.createdAt, since))
            : eq(reviews.userId, userId),
        )
        .orderBy(desc(reviews.createdAt))
        .limit(50)
        .as("son"),
    );
  const accuracy = recent && recent.total >= 12 ? recent.correct / recent.total : null;
  // Seviye yeni değiştiyse kullanıcıya "sistem seni yeniden ölçüyor" denecek.
  const calibrating = Boolean(since) && (recent?.total ?? 0) < 12;
  const difficulty: Difficulty =
    accuracy === null ? "normal" : accuracy >= 0.85 ? "hard" : accuracy <= 0.6 ? "easy" : "normal";

  const rounds = composeRounds(dueWords, newWords, pool, difficulty);

  // Yazma turlarında aynı Türkçe anlama sahip diğer Almanca kelimeler de kabul
  // edilir: "hareket etmek, kalkmak" isteminde tek bir doğru cevap dayatmak haksız.
  const typingTrs = rounds.filter((r) => r.game === "typing").map((r) => r.word.tr);
  if (typingTrs.length) {
    const synonyms = await db
      .select({ de: words.de, tr: words.tr })
      .from(words)
      .where(and(eq(words.course, course), inArray(words.tr, [...new Set(typingTrs)])));
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
      difficulty,
      accuracy: accuracy === null ? null : Math.round(accuracy * 100),
      activeLevel: band.level,
      levelScore: profile.levelScore,
      levelStart: profile.level,
      calibrating,
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
  difficulty: Difficulty = "normal",
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

  // Eşleştirme turu: tanıtımı yapılan kelimeler de aday olur, böylece oyun
  // ilk günden itibaren çıkar. Tur oturumun sonuna konur — o noktada tüm
  // kelimeler tanıtılmış olur.
  const matchCandidates = merged.filter((m) => m.state >= 0).slice(0, 5);
  const useMatch = matchCandidates.length === 5;

  let lastGame = "";
  for (const item of merged) {
    if (rounds.length >= ROUNDS_PER_SESSION - (useMatch ? 1 : 0)) break;
    const round = pickRound(item.word, item.state, pool, lastGame, nextId, difficulty);
    if (!round) continue;
    rounds.push(round);
    lastGame = round.game;
  }

  if (useMatch) {
    rounds.push({ id: nextId(), game: "match", words: matchCandidates.map((m) => m.word) });
  }

  return rounds;
}

function pickRound(
  word: RoundWord,
  state: number,
  pool: (typeof words.$inferSelect)[],
  /** Kaçınılacak oyun türleri — arka arkaya (ya da aynı kelimede) tekrar etmesin. */
  avoid: string | string[],
  nextId: () => string,
  difficulty: Difficulty = "normal",
): Round | null {
  if (state === -1) return { id: nextId(), game: "intro", word };

  const candidates: Round["game"][] = [];
  if (state === 0) {
    // Kelimeyi ilk kez gördü: tanıma temelli oyunlar (üretim daha sonra).
    // Cümle tamamlama da şıklı olduğu için bu aşamada uygundur ve örnek cümle
    // tanıtım kartında zaten gösterilmiştir.
    candidates.push("choice", "cloze");
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

  // Zorluk ayarı: iyi gidene üretim (yazma/harf), zorlanana tanıma (şıklı) oyunu.
  const PRODUCTION: Round["game"][] = ["typing", "scramble"];
  const tuned =
    difficulty === "hard"
      ? [...candidates.filter((g) => PRODUCTION.includes(g)), ...candidates]
      : difficulty === "easy"
        ? [...candidates.filter((g) => !PRODUCTION.includes(g)), ...candidates]
        : candidates;

  const banned = new Set(Array.isArray(avoid) ? avoid : [avoid]);
  const usable = tuned.filter((g) => !banned.has(g));
  const order = usable.length ? usable : tuned;

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
          ...pickDistractors(word, pool, 3, (p) => p.de),
        ]),
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

/**
 * Çeldirici seçimi.
 *
 * Rastgele kelime kolay eleniyordu; öğrenciyi asıl zorlayan, Almanca biçimi
 * birbirine benzeyen kelimeler (beantragen/beantworten, aufhören/aufheben).
 * Bu yüzden adaylar hedefe biçim benzerliğine göre puanlanır, en yakın havuzdan
 * rastgele seçim yapılır — hem zor hem her seferinde farklı.
 */
function similarity(a: string, b: string): number {
  const x = a.toLocaleLowerCase("de-DE");
  const y = b.toLocaleLowerCase("de-DE");
  if (x === y) return -100;
  let prefix = 0;
  while (prefix < x.length && prefix < y.length && x[prefix] === y[prefix]) prefix++;
  let suffix = 0;
  while (
    suffix < x.length - prefix &&
    suffix < y.length - prefix &&
    x[x.length - 1 - suffix] === y[y.length - 1 - suffix]
  )
    suffix++;
  const lenPenalty = Math.abs(x.length - y.length);
  return prefix * 3 + suffix * 2 - lenPenalty;
}

/** Hedefe en çok benzeyen adaylardan rastgele `count` tane döndürür. */
function pickDistractors(
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  count: number,
  label: (p: { de: string; tr: string; artikel: string | null }) => string,
): string[] {
  const target = label(word);
  const seen = new Set([target]);
  const scored: { text: string; score: number }[] = [];

  for (const p of pool) {
    const text = label(p);
    if (p.id === word.id || seen.has(text)) continue;
    seen.add(text);
    const typBonus = p.typ === word.typ ? 6 : 0;
    const trBonus = similarity(p.tr.split(",")[0], word.tr.split(",")[0]) / 2;
    scored.push({ text, score: similarity(p.de, word.de) + typBonus + trBonus });
  }

  scored.sort((a, b) => b.score - a.score);
  // En yakın 10 aday arasından rastgele seç: zorluk yüksek, tekrar eden şık yok.
  return shuffle(scored.slice(0, Math.max(count, 10)))
    .slice(0, count)
    .map((c) => c.text);
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
  return shuffle([label(word), ...pickDistractors(word, pool, 3, label)]);
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

  // Seviye puanı: oturum doğruluğuna göre artar/azalır, eşikte seviye değişir.
  const sessionAccuracy = answers.length ? correctCount / answers.length : 0;
  const delta =
    sessionAccuracy >= 0.85 ? 2 : sessionAccuracy >= 0.7 ? 1 : sessionAccuracy >= 0.5 ? 0 : -2;
  // Profildeki seçim tavan değildir: iyi giden öğrenci C1'e kadar yükselebilir,
  // zorlanan A1'e kadar inebilir. Seviyeyi yalnızca performans belirler.
  let activeIdx = Math.max(0, LEVEL_ORDER.indexOf(profile.activeLevel));
  let levelScore = Math.max(-8, Math.min(10, profile.levelScore + delta));
  let levelUp: string | null = null;
  let levelDown: string | null = null;

  if (levelScore >= 10 && activeIdx < LEVEL_ORDER.length - 1) {
    activeIdx += 1;
    levelScore = 4;
    levelUp = LEVEL_ORDER[activeIdx];
  } else if (levelScore <= -6 && activeIdx > 0) {
    activeIdx -= 1;
    levelScore = 4;
    levelDown = LEVEL_ORDER[activeIdx];
  }

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
      activeLevel: LEVEL_ORDER[activeIdx],
      levelScore,
    })
    .where(eq(profiles.userId, userId));

  return {
    levelUp,
    levelDown,
    activeLevel: LEVEL_ORDER[activeIdx],
    levelScore,
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
const KNOWN_INTERVAL_DAYS = 21;

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

/**
 * Meydan okuma turu.
 *
 * Rastgele bir kelime yığını değil, kademeli olarak sertleşen üç dalga:
 *   1. Isınma  — en sağlam bildiği kelimeler, tanıma oyunları. Kombo kurulur.
 *   2. Baskı   — orta güçteki kelimeler, üretim ve tanıma karışık.
 *   3. Kriz    — en zayıf kelimeler (leech, çok unutulan, düşük ease) ve
 *                yazma/harf dizme gibi üretim oyunları.
 *
 * Kelime sayısı azsa aynı kelime ileri dalgalarda **farklı bir oyun türüyle**
 * yeniden sorulur; ezber değil gerçek hatırlama ölçülür.
 */
export async function buildChallenge(
  userId: string,
): Promise<{ rounds: Round[]; tiers: number[]; pool: number; weak: number }> {
  const profile = await ensureProfile(userId);
  const band = levelBand(profile.activeLevel);

  const learned = await db
    .select({ w: words, uw: userWords })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(
      and(eq(userWords.userId, userId), gt(userWords.reps, 0), eq(words.course, profile.course)),
    )
    .limit(160);

  if (learned.length < 3) return { rounds: [], tiers: [], pool: learned.length, weak: 0 };

  // Kırılganlık puanı: yüksek olan kelime öğrenci için gerçek bir tehdittir.
  const fragility = (uw: typeof userWords.$inferSelect) =>
    (uw.leech ? 4 : 0) +
    uw.lapses * 1.5 +
    Math.max(0, 2.5 - uw.ease) * 2 +
    Math.max(0, 3 - uw.correctStreak) * 0.6;

  const ranked = learned
    .map((row) => ({ ...row, risk: fragility(row.uw) }))
    .sort((a, b) => b.risk - a.risk);
  const weak = ranked.filter((r) => r.risk >= 3).length;

  const half = Math.ceil(ranked.length / 2);
  const fragile = shuffle(ranked.slice(0, half)); // riskli yarı
  const solid = shuffle(ranked.slice(half)); // sağlam yarı

  const poolLevels = [...new Set([...band.pool, ...learned.map((r) => r.w.niveau)])];
  const pool = await db
    .select()
    .from(words)
    .where(and(eq(words.course, profile.course), inArray(words.niveau, poolLevels)))
    .orderBy(sql`random()`)
    .limit(140);

  let seq = 0;
  const nextId = () => `c${++seq}`;
  const rounds: Round[] = [];
  const tiers: number[] = [];
  let lastGame = "";
  const usedGames = new Map<number, Set<string>>();

  /** Bir dalgayı kur; kaynak biterse başa dönülür ama oyun türü tekrarlanmaz. */
  const wave = (
    source: typeof ranked,
    count: number,
    tier: number,
    difficulty: Difficulty,
  ) => {
    for (let i = 0; i < count && source.length; i++) {
      const row = source[i % source.length];
      const word = toRoundWord(row.w, false);
      const seen = usedGames.get(row.w.id) ?? new Set<string>();
      // Aynı kelime tekrar gelirse mutlaka başka bir oyunla sorulur.
      const round = pickRound(
        word,
        Math.max(1, row.uw.state),
        pool,
        [...seen, lastGame],
        nextId,
        difficulty,
      );
      if (!round) continue;
      seen.add(round.game);
      usedGames.set(row.w.id, seen);
      rounds.push(round);
      tiers.push(tier);
      lastGame = round.game;
    }
  };

  wave(solid, 6, 1, "easy"); // ısınma: hız kazan, kombo kur
  wave(shuffle(ranked), 9, 2, "normal"); // baskı: karışık
  wave(fragile, 12, 3, "hard"); // kriz: en zayıflar, üretim ağırlıklı

  return { rounds, tiers, pool: learned.length, weak };
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
    .where(eq(words.course, profile.course))
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
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(
      and(
        eq(userWords.userId, userId),
        lte(userWords.dueAt, new Date()),
        eq(words.course, profile.course),
      ),
    );

  const [{ upcoming }] = await db
    .select({ upcoming: sql<number>`count(*)::int` })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(
      and(
        eq(userWords.userId, userId),
        gt(userWords.dueAt, new Date()),
        eq(words.course, profile.course),
      ),
    );

  const games = await db
    .select({
      game: reviews.game,
      total: sql<number>`count(*)::int`,
      correct: sql<number>`count(*) filter (where ${reviews.correct})::int`,
      avgMs: sql<number>`coalesce(round(avg(${reviews.latencyMs}))::int, 0)`,
    })
    .from(reviews)
    .where(eq(reviews.userId, userId))
    .groupBy(reviews.game);

  const [{ seconds }] = await db
    .select({ seconds: sql<number>`coalesce(sum(${dailyStats.seconds}), 0)::int` })
    .from(dailyStats)
    .where(eq(dailyStats.userId, userId));

  const [{ leeches }] = await db
    .select({ leeches: sql<number>`count(*)::int` })
    .from(userWords)
    .where(and(eq(userWords.userId, userId), eq(userWords.leech, true)));

  return { profile, levels, days, dueNow, upcoming, games, seconds, leeches };
}
