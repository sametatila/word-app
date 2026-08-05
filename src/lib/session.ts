import "server-only";
import { and, asc, desc, eq, gt, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, profiles, reviews, sessionState, userWords, words } from "@/lib/db/schema";
import { grade, schedule, xpForQuality, type SrsState } from "@/lib/srs";
import { firstExample } from "@/lib/example";
import { pluralChoices } from "@/lib/german";
import type {
  Answer,
  AnswerResult,
  MissedWord,
  Round,
  RoundWord,
  SessionPayload,
  SessionProgress,
} from "@/lib/types";

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

const ROUNDS_PER_SESSION = 14;
/** Bu aralığa ulaşan kelime "pekişmiş" sayılır (kelime listesiyle aynı ölçüt). */
const MASTERED_DAYS = 21;

/**
 * Kelimenin öğrencide ne kadar oturduğu.
 *
 * Zorluk kararı **buna** bakar, kullanıcının genel başarısına değil.
 *
 * Neden: bir SRS oturumu bilerek karışık kurulur — hiç görülmemiş kelimeler
 * (tanım gereği bilinemez), öğrenilmekte olanlar ve oturmuş tekrarlar bir arada.
 * Bu yüzden oturum doğruluğu yetkinliği değil, **kuyruğun bileşimini** ölçer:
 * yeni kelime almaya cesaret eden düşük, sadece kolay tekrar yapan yüksek
 * doğruluk alır. Kişiyi o sayıyla derecelendirmek öğrenmeyi cezalandırır.
 *
 * Kelime bazında ise ölçüm dürüsttür: bu kelimeyi kaç kez üst üste bildin,
 * kaç kez unuttun, aralık ne kadar açıldı. Zorluk buradan gelir.
 */
type Strength = "fresh" | "shaky" | "solid" | "strong";

/** Tanıtım kartı bir güç seviyesi değil, kuyruktaki özel bir adımdır. */
type QueueItem = { word: RoundWord; strength: Strength; intro?: boolean };

function wordStrength(uw: typeof userWords.$inferSelect | null | undefined): Strength {
  if (!uw || uw.reps === 0) return "fresh";
  // Takılan, sık unutulan ya da az önce yanlış bilinen kelime destek ister.
  if (uw.leech || uw.lapses >= 2 || uw.ease < 2.1 || uw.correctStreak === 0) return "shaky";
  if (uw.correctStreak >= 4 && uw.intervalDays >= 7 && uw.ease >= 2.3) return "strong";
  if (uw.correctStreak >= 2 && uw.intervalDays >= 1) return "solid";
  return "fresh";
}

/**
 * Çalışılacak seviyeler.
 *
 * Kullanıcının profilde seçtiği seviye tek belirleyicidir; sistem bunu kendi
 * kararıyla değiştirmez. Kelimelerin çoğunluğu seçilen seviyeden, bir kısmı
 * bir alt seviyeden gelir (boşluk doldurma); seçilen seviyede görülmemiş
 * kelime kalmazsa bir üst seviye devreye girer ki öğrenme durmasın.
 */
function levelBand(chosenLevel: string) {
  const idx = Math.max(0, Math.min(LEVEL_ORDER.length - 1, LEVEL_ORDER.indexOf(chosenLevel)));
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
    beispielTr: w.beispielTr,
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
  /**
   * Yalnızca başlık sayıları istendiğinde kuyruk kurulmaz.
   *
   * Yarım kalan bir tur sunucudan olduğu gibi geri verilirken turun kendisi
   * kayıtlıdır ama seri, XP ve günlük hedef gün içinde değişmeye devam eder;
   * bu yüzden sayılar tazelenir, kelime seçimi tekrarlanmaz.
   */
  metaOnly = false,
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

  // Koleksiyonun sağlığı: birikmiş tekrar ve takılan kelime sayısı. Günlük yük
  // buna göre ayarlanır — bu bir not değil, tempo kararıdır.
  const [health] = await db
    .select({
      due: sql<number>`count(*) filter (where ${userWords.dueAt} <= now())::int`,
      seen: sql<number>`count(*)::int`,
      leeches: sql<number>`count(*) filter (where ${userWords.leech})::int`,
      mastered: sql<number>`count(*) filter (where ${userWords.intervalDays} >= ${MASTERED_DAYS})::int`,
    })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(and(eq(userWords.userId, userId), eq(words.course, course)));
  const dueCount = health?.due ?? 0;

  // 2) Kalan kontenjan kadar yeni kelime
  const band = levelBand(profile.level);

  /**
   * Tempo: yeni kelime alımı koleksiyonun taşıyabileceği kadar.
   *
   * Tekrar borcu günlük hedefin iki katını aştıysa ya da takılan kelime oranı
   * yükseldiyse yeni kelime almak yalnızca borcu büyütür. Bu, kullanıcının
   * başarısıyla ilgili bir yargı değil; sırt çantasının ağırlığıyla ilgili.
   */
  const leechRatio = health && health.seen >= 20 ? health.leeches / health.seen : 0;
  const pacing: "normal" | "light" | "review" =
    dueCount >= profile.dailyGoal * 2 ? "review" : leechRatio > 0.15 ? "light" : "normal";

  // Kapsam: seçilen seviyenin ne kadarı pekişti. Yalnızca artan bir ölçü —
  // öğrenciyi derecelendirmez, biriktirdiğini gösterir.
  const [cov] = await db
    .select({
      total: sql<number>`count(*)::int`,
      mastered: sql<number>`count(*) filter (where ${userWords.intervalDays} >= ${MASTERED_DAYS})::int`,
    })
    .from(words)
    .leftJoin(userWords, and(eq(userWords.wordId, words.id), eq(userWords.userId, userId)))
    .where(and(eq(words.course, course), eq(words.niveau, band.level)));

  const meta: SessionPayload["meta"] = {
    dueCount,
    newToday,
    reviewsToday,
    dailyGoal: profile.dailyGoal,
    currentStreak: profile.currentStreak,
    totalXp: profile.totalXp,
    displayName: profile.displayName,
    level: band.level,
    coverage: { mastered: cov?.mastered ?? 0, total: cov?.total ?? 0 },
    pacing,
    leeches: health?.leeches ?? 0,
  };

  if (metaOnly) return { rounds: [], resume: null, meta };

  const quota = extra
    ? 10
    : pacing === "review"
      ? 0
      : pacing === "light"
        ? Math.ceil(profile.newPerDay / 2)
        : profile.newPerDay;
  const newBudget = extra ? quota : Math.max(0, quota - newToday);

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

  // Zorluk kelimenin kendi geçmişinden çıkar, kullanıcının genel notundan değil.
  const dueWords: QueueItem[] = dueRows.map((r) => ({
    word: toRoundWord(r.w, false),
    strength: wordStrength(r.uw),
  }));
  const newWords: QueueItem[] = newRows.map((r) => ({
    word: toRoundWord(r, true),
    strength: "fresh" as const,
  }));

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
      dueWords.push({ word: toRoundWord(r.w, false), strength: wordStrength(r.uw) });
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
      .where(and(eq(words.course, course), inArray(words.tr, [...new Set(typingTrs)])));
    for (const r of rounds) {
      if (r.game !== "typing") continue;
      r.alternatives = synonyms
        .filter((s) => s.tr === r.word.tr && s.de !== r.word.de)
        .map((s) => s.de)
        .slice(0, 6);
    }
  }

  return { rounds, resume: null, meta };
}

/**
 * Oturumu getirir: yarım kalan tur varsa **onu**, yoksa yenisini kurar.
 *
 * Tur ve nerede kalındığı sunucuda tutulur (`session_state`). Bu daha önce
 * cihazın localStorage'ındaydı ve her cihaz kendi turunu kuruyordu: telefonda
 * tanıtılan yeni kelime bilgisayarda bir kez daha "yeni" olarak çıkıyordu.
 * Tur hesabın verisi olduğu için artık iki cihaz aynı kuyruğu, aynı sıradan
 * görür.
 *
 * Kayıtlı tur şu üç durumda geçersizdir ve yenisi kurulur: gün değişmişse,
 * kurs değişmişse ya da tur zaten bitmişse (`index >= rounds.length`).
 */
export async function loadSession(
  userId: string,
  today: string,
  extra = false,
): Promise<SessionPayload> {
  const profile = await ensureProfile(userId);

  // "Yeni kelimelerle devam et" bilerek yeni bir tur ister; kayıtlıyı ezer.
  if (!extra) {
    const [saved] = await db
      .select()
      .from(sessionState)
      .where(eq(sessionState.userId, userId));
    const rounds = saved?.rounds as Round[] | undefined;
    if (
      saved &&
      saved.day === today &&
      saved.course === profile.course &&
      Array.isArray(rounds) &&
      saved.index < rounds.length
    ) {
      const { meta } = await buildSession(userId, today, false, true);
      return {
        rounds,
        meta,
        resume: {
          index: saved.index,
          correct: saved.correct,
          total: saved.total,
          xp: saved.xp,
          missed: (saved.missed as MissedWord[] | null) ?? [],
        },
      };
    }
  }

  const built = await buildSession(userId, today, extra);
  await db
    .insert(sessionState)
    .values({
      userId,
      day: today,
      course: profile.course,
      rounds: built.rounds,
      index: 0,
      correct: 0,
      total: 0,
      xp: 0,
      missed: [],
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: sessionState.userId,
      set: {
        day: today,
        course: profile.course,
        rounds: built.rounds,
        index: 0,
        correct: 0,
        total: 0,
        xp: 0,
        missed: [],
        updatedAt: new Date(),
      },
    });
  return built;
}

/**
 * Turun nerede kalındığını kaydeder — her turdan sonra, cevaplarla birlikte.
 *
 * Yalnızca güncelleme yapar: kayıtlı tur yoksa (ya da gün değiştiyse) yazacak
 * bir şey yoktur, çünkü ilerleme kurulmamış bir tura ait olamaz. `index`
 * geriye alınmaz — iki cihaz aynı anda oynuyorsa ileride olan kazanır, aksi
 * hâlde geç ulaşan bir istek turu başa sardırırdı.
 */
export async function saveSessionProgress(
  userId: string,
  today: string,
  progress: SessionProgress,
) {
  await db
    .update(sessionState)
    .set({
      index: sql`greatest(${sessionState.index}, ${progress.index})`,
      correct: progress.correct,
      total: progress.total,
      xp: progress.xp,
      missed: progress.missed,
      updatedAt: new Date(),
    })
    .where(and(eq(sessionState.userId, userId), eq(sessionState.day, today)));
}

/** Kayıtlı turu siler: "yeni tura başla" dendiğinde kuyruk sıfırdan kurulur. */
export async function clearSessionState(userId: string) {
  await db.delete(sessionState).where(eq(sessionState.userId, userId));
}

/**
 * Oyun seçimi: kelimenin durumuna göre uygun oyunu atar ve aynı oyunun
 * arka arkaya tekrarlanmasını engelleyerek monotonluğu kırar.
 */
function composeRounds(
  due: QueueItem[],
  fresh: QueueItem[],
  pool: (typeof words.$inferSelect)[],
): Round[] {
  const rounds: Round[] = [];
  let seq = 0;
  const nextId = () => `r${++seq}`;

  // Yeni kelimeler önce tanıtım kartı, ardından tanıma oyunu olarak girer.
  const queue: QueueItem[] = [];
  for (const item of fresh) {
    queue.push({ ...item, intro: true });
    queue.push(item);
  }
  // Tekrarları araya serpiştir
  const merged: QueueItem[] = [];
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
  const matchCandidates = merged.filter((m) => !m.intro).slice(0, 5);
  const useMatch = matchCandidates.length === 5;

  let lastGame = "";
  for (const item of merged) {
    if (rounds.length >= ROUNDS_PER_SESSION - (useMatch ? 1 : 0)) break;
    const round = item.intro
      ? ({ id: nextId(), game: "intro", word: item.word } as Round)
      : pickRound(item.word, item.strength, pool, lastGame, nextId);
    if (!round) continue;
    rounds.push(round);
    lastGame = round.game;
  }

  if (useMatch) {
    rounds.push({ id: nextId(), game: "match", words: matchCandidates.map((m) => m.word) });
  }

  return rounds;
}

/**
 * Kelimeye uygun oyunu seçer.
 *
 * Zorluk merdiveni kelimenin gücünden çıkar:
 *   fresh/shaky → tanıma (şıklı) — cevap ekranda, hatırlama desteklenir
 *   solid       → tanıma + harf dizme
 *   strong      → üretim (yazma) — destek yok, sıfırdan hatırlama
 *
 * `bias` yalnızca meydan okuma turu içindir: orada zorluk kelimeden değil,
 * dalganın kendisinden gelir (ısınma → kriz).
 */
function pickRound(
  word: RoundWord,
  strength: Strength,
  pool: (typeof words.$inferSelect)[],
  /** Kaçınılacak oyun türleri — arka arkaya (ya da aynı kelimede) tekrar etmesin. */
  avoid: string | string[],
  nextId: () => string,
  bias?: "recognition" | "production",
): Round | null {
  const candidates: Round["game"][] = [];
  if (strength === "fresh" || strength === "shaky") {
    // Yeni ya da takılan kelime: cevabın ekranda olduğu tanıma oyunları.
    // Boş sayfaya yazdırmak bu aşamada öğretmez, yalnızca yıldırır.
    candidates.push("choice", "cloze");
    if (word.artikel) candidates.push("artikel");
  } else if (strength === "solid") {
    candidates.push("choice", "cloze", "order");
    if (word.artikel) candidates.push("artikel", "plural");
    if (word.de.length <= 12) candidates.push("scramble");
  } else {
    candidates.push("typing", "cloze", "choice", "order");
    if (word.artikel) candidates.push("artikel", "plural");
    if (word.de.length <= 12) candidates.push("scramble");
  }

  // Parçaları ekranda olsa da bu oyunlar öğrenciden bir şey **kurmasını**
  // ister; tanıma oyunlarında ise doğru cevap zaten şıklardan biridir.
  const PRODUCTION: Round["game"][] = ["typing", "scramble", "order"];
  const tuned =
    bias === "production"
      ? [...candidates.filter((g) => PRODUCTION.includes(g)), ...candidates]
      : bias === "recognition"
        ? [...candidates.filter((g) => !PRODUCTION.includes(g)), ...candidates]
        : candidates;

  const banned = new Set(Array.isArray(avoid) ? avoid : [avoid]);
  const usable = tuned.filter((g) => !banned.has(g));
  const order = usable.length ? usable : tuned;

  for (const game of shuffle(order)) {
    const round = makeRound(game, word, pool, nextId, strength);
    if (round) return round;
  }
  return { id: nextId(), game: "choice", word, options: optionsFor(word, pool), direction: "de-tr" };
}

function makeRound(
  game: Round["game"],
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  nextId: () => string,
  strength: Strength = "solid",
): Round | null {
  switch (game) {
    case "choice": {
      // Yön de kelimenin gücüne bağlı bir zorluk kademesidir: Almanca→Türkçe
      // tanımaktır, Türkçe→Almanca üretime yakındır. Yeni ve takılan
      // kelimelerde hep tanıma yönü sorulur.
      const trDeChance =
        strength === "fresh" || strength === "shaky" ? 0 : strength === "solid" ? 0.35 : 0.6;
      const direction = Math.random() < trDeChance ? "tr-de" : "de-tr";
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
    case "plural": {
      // Yalnızca isimler ve yalnızca çoğul kuralı okunabilen maddeler.
      const choices = word.artikel ? pluralChoices(word.de, word.formen, 3) : null;
      if (!choices) return null;
      return {
        id: nextId(),
        game: "plural",
        word,
        answer: choices.answer,
        options: shuffle([choices.answer, ...choices.distractors]),
      };
    }
    case "order": {
      const built = buildOrder(word);
      if (!built) return null;
      return {
        id: nextId(),
        game: "order",
        word,
        tokens: built.tokens,
        answer: built.answer,
        tail: built.tail,
        sentenceTr: firstExample(word.beispielTr),
      };
    }
    case "cloze": {
      const cloze = buildCloze(word);
      if (!cloze) return null;
      return {
        id: nextId(),
        game: "cloze",
        word,
        sentence: cloze.sentence,
        // Cümle ilk örnekten kurulduğu için çeviri de ilk parçadan alınır.
        sentenceTr: firstExample(word.beispielTr),
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

/**
 * Örnek cümleyi karışık kelimelere böler — "Cümleyi Diz" turunun malzemesi.
 *
 * Almancada anlamı taşıyan şey büyük ölçüde sıradır (fiil ikinci sırada,
 * ayrılabilir ön ek sonda, yan cümlede fiil en sonda). Kelimeyi bilmek bu
 * sırayı bilmek değildir; bu tur onu ayrı ayrı ölçer.
 *
 * Cümle sonundaki noktalama ayrılır: "Ferien." kutusu son kelimenin hangisi
 * olduğunu ele verirdi. Cümle içindeki virgül kelimede kalır — o bir ipucu
 * değil, yan cümlenin gerçek sınırıdır.
 */
function buildOrder(
  word: RoundWord,
): { tokens: string[]; answer: string[]; tail: string } | null {
  const raw = firstExample(word.beispiel)?.trim();
  if (!raw) return null;

  const tailMatch = raw.match(/[.!?…]+$/);
  const tail = tailMatch ? tailMatch[0] : "";
  const body = tail ? raw.slice(0, -tail.length).trim() : raw;

  const answer = body.split(/\s+/).filter(Boolean);
  // Üçten kısa cümlede dizecek bir şey yok; dokuzdan uzunu telefonda tek
  // ekrana sığmıyor ve turu bulmacaya çeviriyor.
  if (answer.length < 4 || answer.length > 9) return null;
  if (answer.some((t) => t.length > 20)) return null;

  // Karışık dizilim doğru sırayla aynı çıkarsa tur kendiliğinden çözülmüş
  // olurdu. Tekrar eden kelimeler yüzünden eşitlik metin üzerinden ölçülür.
  let tokens = shuffle(answer);
  for (let i = 0; i < 6 && tokens.join(" ") === answer.join(" "); i++) {
    tokens = shuffle(answer);
  }
  if (tokens.join(" ") === answer.join(" ")) return null;

  return { tokens, answer, tail };
}

/** Örnek cümlede kelimeyi boşlukla değiştirir; uygun cümle yoksa null döner. */
function buildCloze(word: RoundWord): { sentence: string; answer: string } | null {
  const raw = firstExample(word.beispiel);
  if (!raw || raw.length < 12 || raw.length > 110) return null;
  const stem = word.de.replace(/^sich\s+/, "");
  if (stem.length < 3) return null;
  // Sınır olarak \b kullanılamaz: JS'te \w ASCII'dir, bu yüzden "Überstunde" gibi
  // umlaut ile başlayan kelimeler hiç eşleşmiyordu (53 kelime, 38'i örnek cümlesi
  // olduğu hâlde hiç boşluk doldurma turu üretmiyordu). Unicode harf sınıfıyla
  // kurulan bakış ifadeleri hem umlaut hem ß için doğru çalışır.
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}])${escapeRegExp(stem)}\\p{L}{0,4}(?![\\p{L}\\p{N}])`,
    "iu",
  );
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
  /** Aralığın cevap öncesi/sonrası hâli — pekişme eşiğini geçenleri saymak için. */
  const updates: { before: number; after: number }[] = [];

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
    updates.push({ before: prev.intervalDays, after: next.intervalDays });

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

  // Seviye burada değişmez. Kullanıcının CEFR seviyesi kendi beyanıdır ve
  // yalnızca profilden değiştirilir: oturum doğruluğu bir yetkinlik ölçüsü
  // değil, kuyruğun bileşiminin ölçüsüdür (bkz. Strength). Onunla insan
  // derecelendirmek, yeni kelime almayı cezalandıran ters bir teşvik kurar.

  // Bu turda pekişme eşiğini geçen kelimeler — özet ekranında gösterilecek
  // olumlu, dürüst sinyal.
  const newlyMastered = updates.filter(
    (u) => u.before < MASTERED_DAYS && u.after >= MASTERED_DAYS,
  ).length;

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
    newlyMastered,
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
): Promise<{ rounds: Round[]; tiers: number[]; pool: number; weak: number; best: number }> {
  const profile = await ensureProfile(userId);
  const band = levelBand(profile.level);
  const best = profile.challengeBest;

  const learned = await db
    .select({ w: words, uw: userWords })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(
      and(eq(userWords.userId, userId), gt(userWords.reps, 0), eq(words.course, profile.course)),
    )
    .limit(160);

  if (learned.length < 3) return { rounds: [], tiers: [], pool: learned.length, weak: 0, best };

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
    bias: "recognition" | "production" | undefined,
  ) => {
    for (let i = 0; i < count && source.length; i++) {
      const row = source[i % source.length];
      const word = toRoundWord(row.w, false);
      const seen = usedGames.get(row.w.id) ?? new Set<string>();
      // Aynı kelime tekrar gelirse mutlaka başka bir oyunla sorulur.
      const round = pickRound(
        word,
        wordStrength(row.uw),
        pool,
        [...seen, lastGame],
        nextId,
        bias,
      );
      if (!round) continue;
      seen.add(round.game);
      usedGames.set(row.w.id, seen);
      rounds.push(round);
      tiers.push(tier);
      lastGame = round.game;
    }
  };

  // Meydan okumada zorluk kelimeden değil dalgadan gelir: bilerek kurulmuş bir
  // tırmanış. Normal turlarda böyle bir küresel ayar yok.
  wave(solid, 6, 1, "recognition"); // ısınma: hız kazan, kombo kur
  wave(shuffle(ranked), 9, 2, undefined); // baskı: karışık
  wave(fragile, 12, 3, "production"); // kriz: en zayıflar, üretim ağırlıklı

  return { rounds, tiers, pool: learned.length, weak, best };
}

/**
 * Hayatta kalma turunun skorunu işler ve rekoru günceller.
 *
 * Rekor cihazda değil profilde durur: aynı hesabın telefondaki ve tarayıcıdaki
 * rekoru aynı olmalı. Skorun kendisi zaten cevaplarla birlikte kaydedilir;
 * burada yalnızca "en iyi" değeri taşınır.
 *
 * Dönen `previous`, bu tur oynanmadan önceki rekordur — "yeni rekor, önceki X"
 * mesajı buna dayanır.
 */
export async function recordChallengeScore(
  userId: string,
  score: number,
): Promise<{ best: number; previous: number }> {
  const profile = await ensureProfile(userId);
  const previous = profile.challengeBest;
  if (score <= previous) return { best: previous, previous };
  await db
    .update(profiles)
    .set({ challengeBest: score })
    .where(eq(profiles.userId, userId));
  return { best: score, previous };
}

/** İlerleme ekranı verileri */
export type LeaderboardRow = {
  rank: number;
  name: string | null;
  xp: number;
  streak: number;
  isMe: boolean;
};

/**
 * Öğren ekranındaki sıralama: ilk 10 kişi, önce XP'ye sonra seriye göre.
 *
 * XP birincil ölçüt çünkü toplam emeği gösterir; seri yalnızca eşitlik bozar.
 * Kullanıcı ilk 10'da değilse kendi satırı sona eklenir — listede kendini
 * göremeyen kişi için tablo anlamsızlaşır. Hiç çalışmamış profiller (XP 0)
 * listeye girmez, yoksa yeni kayıtlar sıralamayı doldurur.
 */
export async function getLeaderboard(userId: string, limit = 10): Promise<LeaderboardRow[]> {
  const top = await db
    .select({
      userId: profiles.userId,
      name: profiles.displayName,
      xp: profiles.totalXp,
      streak: profiles.currentStreak,
    })
    .from(profiles)
    .where(gt(profiles.totalXp, 0))
    .orderBy(desc(profiles.totalXp), desc(profiles.currentStreak), asc(profiles.createdAt))
    .limit(limit);

  const rows: LeaderboardRow[] = top.map((r, i) => ({
    rank: i + 1,
    name: r.name,
    xp: r.xp,
    streak: r.streak,
    isMe: r.userId === userId,
  }));
  if (rows.some((r) => r.isMe)) return rows;

  // Kendi sırası: aynı ölçütle önünde kaç kişi var.
  const [me] = await db.select().from(profiles).where(eq(profiles.userId, userId));
  if (!me) return rows;
  const [{ ahead }] = await db
    .select({ ahead: sql<number>`count(*)::int` })
    .from(profiles)
    .where(
      sql`${profiles.totalXp} > ${me.totalXp}
        or (${profiles.totalXp} = ${me.totalXp} and ${profiles.currentStreak} > ${me.currentStreak})`,
    );
  rows.push({
    rank: ahead + 1,
    name: me.displayName,
    xp: me.totalXp,
    streak: me.currentStreak,
    isMe: true,
  });
  return rows;
}

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
