import "server-only";
import { and, asc, desc, eq, gt, gte, inArray, isNotNull, lt, lte, notInArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, events, profiles, reviews, sessionState, userWords, words } from "@/lib/db/schema";
import { cleanDetail, isErrorType, srsWeightFor, type ErrorType } from "@/lib/errors";
import { clozeTypeChance, gamesFor, isProductionGame, PRODUCTION_GAMES, type Strength as LadderStrength } from "@/lib/ladder";
import { chatConfigured } from "@/lib/chat-providers";
import { FREQUENT_ERROR_WEIGHT, frequentErrorTypes } from "@/lib/error-analytics";
import { grade, schedule, xpForQuality, type SrsState } from "@/lib/srs";
import { nextStreak, shiftDay } from "@/lib/award";
import { xpForChallengeRecord, xpForWager } from "@/lib/xp";
import { firstExample } from "@/lib/example";
import { pluralChoices } from "@/lib/german";
import type {
  Answer,
  AnswerResult,
  GameId,
  MissedWord,
  PlayableGame,
  Round,
  RoundWord,
  SessionPayload,
  SessionProgress,
  Option,
  Wager,
} from "@/lib/types";

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

// Oyun türü sayısı arttıkça tur da uzamalı: 14 turda on oyunun çoğu hiç
// çıkmıyordu. 20 tur, tekrar + yeni karışımında her türe yer bırakıyor.
const ROUNDS_PER_SESSION = 20;
/**
 * Aynı oyun kaç tur boyunca tekrar edilmez.
 *
 * Oyun sayısını artırmak tekdüzeliği tek başına çözmez: seçim her turda
 * bağımsız yapıldığı sürece aynı türün kısa aralıklarla kümelenmesi olağandır.
 * Bu pencere kümelenmeyi doğrudan engeller.
 */
const RECENT_GAME_WINDOW = 3;
/** Serbest cümle turu oturum başına tavanı (AI kotası ve süre). */
const FREE_SENTENCE_PER_SESSION = 2;
/**
 * Oturumda üretim turlarının en düşük payı (KPI 2 hedefi %40).
 *
 * Merdiven (WP-14) her basamağa bir üretim dokunuşu koydu ama ölçüm (26 Ağu,
 * 30 gün) payın %12–18'de kaldığını gösterdi: gerçek hesaplarda kelimelerin
 * neredeyse tamamı "fresh/shaky" ve o basamakta üretim yalnız harf bulmacası
 * + iki ipuçlu yazma. Taban, kurulmuş oturumu sondan başa tarayıp tanıma
 * turlarını kelimenin gücüne uygun üretim turuna çevirir: yeni/takılan
 * kelimede ipuçlu yazma ya da harf bulmacası (destekli), oturmuş/sağlamda
 * çeviri, cümle diz, yazma. Aynı kelime iki kez üretilmez; tanıtım ve
 * eşleştirme dokunulmaz; tek oyun modunda taban yok. `PRODUCTION_FLOOR=0`
 * ile kapatılır (ölçüm/karşılaştırma için).
 */
const PRODUCTION_FLOOR = Math.max(0, Math.min(0.8, Number(process.env.PRODUCTION_FLOOR ?? 0.4)));

/**
 * Bir oturumda bulunması istenen en az olgun kelime sayısı.
 *
 * Üretim oyunları ve çoğul yalnızca oturmuş kelimelerde açıldığı için, kuyrukta
 * hiç olgun kelime yoksa o oyunlar hiç görünmüyor. Dört, yirmi turluk bir
 * oturumda oyun havuzunu açık tutmaya yetiyor ve tekrar planını gözle görülür
 * biçimde öne çekmiyor.
 */
const MIN_MATURE = 6;
/** Bu aralığa ulaşan kelime "pekişmiş" sayılır (kelime listesiyle aynı ölçüt). */
const MASTERED_DAYS = 21;

/**
 * Tek oyun modunun dolgusu — görülmüş koleksiyonun tamamından, üç banttan.
 *
 * Eski dolgu "zamanı en yakın" kelimeleri alıyordu ve bu, tekrar zamanı gelmiş
 * kelimesi az olan öğrencide her turu aynı ~40 kelimeye kilitliyordu: en
 * yakın tarihli kelimeler tanım gereği aralığı en kısa, en az oturmuş
 * olanlardır; 500 pekişmiş kelime listenin sonunda durur ve sıra ona hiç
 * gelmez. Oysa tek oyun modunun amacı bilinen kelimeleri sevilen oyunla
 * tazelemek — pekişmiş kelime de "bilinen" kelimedir, hatta asıl odur.
 *
 * Üç bant, koleksiyon büyüklüğüne orantılı pay:
 *
 *   YAKLAŞAN     Üç gün içinde zamanı gelecek olanlar — en yakından başlayarak.
 *                Dolgunun en çok üçte biri: erken sormanın tekrar planına en
 *                çok katkı yaptığı yer burası.
 *   ÖĞRENİLİYOR  Aralığı 21 günün altında kalanlar — rastgele örnek.
 *   PEKİŞMİŞ     Aralığı 21 gün ve üstü — rastgele örnek. Pay, bandın
 *                büyüklüğüyle büyür: pekişmiş havuz öğrenilenleri geçtiğinde
 *                dolgunun yarısından çoğu oradan gelir. Pekişmiş kelimeyi
 *                erken sormak SM-2 açısından zararsız — doğru bilinince
 *                aralık yine büyür, yanlışsa zaten öğrenilmemiş demektir ve
 *                kuyruğa dönmesi doğrudur.
 *
 * Aynı gün tekrarı yok: son 24 saatte sorulmuş kelime hiçbir banda girmez.
 * Bantlar payı dolduramazsa (küçük koleksiyon, gün içinde birkaç tur) eleme
 * 30 dakikaya gevşetilip kalan rastgele tamamlanır — tur boş kalmaz, ama
 * gevşeme yalnızca zorunlu olduğunda ve yalnız açık kadar.
 *
 * Rastgelelik bilinçli: sıralama ne olursa olsun deterministik seçim aynı
 * kümeyi üretir; farklı turda farklı kelime görmek istiyorsak örneklem
 * rastgele olmak zorunda.
 */
async function pickSingleGameFiller(
  userId: string,
  course: string,
  now: Date,
  want: number,
  exclude: number[],
) {
  type Row = { w: typeof words.$inferSelect; uw: typeof userWords.$inferSelect };
  const soon = new Date(now.getTime() + 3 * 86400000);
  const base = (rest: string) =>
    and(
      eq(userWords.userId, userId),
      gt(userWords.dueAt, now),
      eq(words.course, course),
      exclude.length ? notInArray(userWords.wordId, exclude) : undefined,
      sql`(${userWords.lastReviewedAt} is null or ${userWords.lastReviewedAt} < now() - ${sql.raw(`interval '${rest}'`)})`,
    );
  const bands = [
    { where: lte(userWords.dueAt, soon), order: asc(userWords.dueAt) },
    { where: and(gt(userWords.dueAt, soon), lt(userWords.intervalDays, MASTERED_DAYS)), order: sql`random()` },
    { where: and(gt(userWords.dueAt, soon), gte(userWords.intervalDays, MASTERED_DAYS)), order: sql`random()` },
  ] as const;

  const counts = await Promise.all(
    bands.map((b) =>
      db
        .select({ n: sql<number>`count(*)::int` })
        .from(userWords)
        .innerJoin(words, eq(words.id, userWords.wordId))
        .where(and(base("24 hours"), b.where))
        .then((r) => r[0]?.n ?? 0),
    ),
  );
  const [nUp, nLearn, nMast] = counts;

  // Paylar: yaklaşan en çok üçte bir, kalanı öğreniliyor/pekişmiş arasında
  // bant büyüklüğüne orantılı; bir bant payını dolduramazsa açık diğerlerine.
  const quota = [Math.min(nUp, Math.ceil(want / 3)), 0, 0];
  const rest = want - quota[0];
  const restPool = nLearn + nMast;
  quota[1] = restPool ? Math.min(nLearn, Math.round((rest * nLearn) / restPool)) : 0;
  quota[2] = Math.min(nMast, rest - quota[1]);
  let open = want - quota[0] - quota[1] - quota[2];
  for (const i of [1, 2, 0]) {
    if (open <= 0) break;
    const spare = counts[i] - quota[i];
    const take = Math.min(spare, open);
    quota[i] += take;
    open -= take;
  }

  const picked: Row[] = [];
  for (let i = 0; i < bands.length; i++) {
    if (quota[i] <= 0) continue;
    const rows = await db
      .select({ w: words, uw: userWords })
      .from(userWords)
      .innerJoin(words, eq(words.id, userWords.wordId))
      .where(and(base("24 hours"), bands[i].where))
      .orderBy(bands[i].order)
      .limit(quota[i]);
    picked.push(...rows);
  }

  // Gün içinde birkaç tur atan küçük koleksiyon: 24 saat elemesi turu boş
  // bırakıyorsa yalnız açık kadar, 30 dakika elemesiyle tamamla.
  if (picked.length < want) {
    const have = [...exclude, ...picked.map((r) => r.w.id)];
    const more = await db
      .select({ w: words, uw: userWords })
      .from(userWords)
      .innerJoin(words, eq(words.id, userWords.wordId))
      .where(
        and(
          eq(userWords.userId, userId),
          gt(userWords.dueAt, now),
          eq(words.course, course),
          have.length ? notInArray(userWords.wordId, have) : undefined,
          sql`(${userWords.lastReviewedAt} is null or ${userWords.lastReviewedAt} < now() - interval '30 minutes')`,
        ),
      )
      .orderBy(sql`random()`)
      .limit(want - picked.length);
    picked.push(...more);
  }

  // Bantlar sırayla eklendi; turda yaklaşanlar önde yığılmasın.
  for (let i = picked.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [picked[i], picked[j]] = [picked[j], picked[i]];
  }
  return picked;
}

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
type Strength = LadderStrength;

/** Tanıtım kartı bir güç seviyesi değil, kuyruktaki özel bir adımdır. */
type QueueItem = {
  word: RoundWord;
  strength: Strength;
  intro?: boolean;
  /** Yeni kelimenin aynı oturumdaki ipuçlu yazma turu (WP-14). */
  assist?: boolean;
  /** Oyun seçiminde eğilim — yalnızca çeşitlilik için öne çekilen kelimelerde. */
  bias?: "recognition" | "production";
};

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

export function toRoundWord(w: typeof words.$inferSelect, isNew: boolean): RoundWord {
  return {
    id: w.id,
    de: w.de,
    artikel: w.artikel,
    tr: w.tr,
    en: w.en,
    typ: w.typ,
    niveau: w.niveau,
    beispiel: w.beispiel,
    beispielTr: w.beispielTr,
    beispielEn: w.beispielEn,
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
  /**
   * Tek oyunlu tur: verilirse bütün turlar bu oyundan kurulur ve tur
   * **yalnızca tekrardan** oluşur — yeni kelime alınmaz.
   *
   * Tek oyun modu bir öğretme değil, bir pekiştirme aracı. Yeni bir kelimeyi
   * tek bir oyunla tanıştırmak öğretmiyor: kelime önce tanıtım kartıyla
   * açılmalı, sonra kolaydan zora birkaç farklı oyunla dokunulmalı. "20 tur
   * Artikel Yarışı" istemek bunun yerine geçemez; orada istenen şey bilinen
   * kelimeleri sevilen oyunla tazelemek. Bu yüzden günlük yeni kelime
   * kontenjanı burada hiç harcanmıyor: kullanıcı tek oyunla ne kadar
   * oynarsa oynasın, karışık tura döndüğünde yeni kelimeleri onu bekliyor.
   */
  only?: PlayableGame,
  /**
   * Bu oturumda ATLANACAK kelimeler.
   *
   * Yürürken modu yirmi tur bitince sesli onay alıp taze bir tur çekiyor ve
   * o tur aynı havuzdan kuruluyordu: az önce yanlış bilinen kelime tekrar
   * borcuna düştüğü için hemen geri geliyor, kullanıcı da aynı kelimeleri
   * arka arkaya duyuyordu. Aralıklı tekrar açısından doğru, yürüyüş açısından
   * yanlış — aynı yürüyüşte aynı kelimeyi ikinci kez sormanın öğretici bir
   * karşılığı yok, sıkıcı olmaktan başka.
   *
   * Yalnızca tekrar kuyruğunu daraltıyor; yeni kelimeler zaten görülmemiş
   * olanlardan seçiliyor.
   */
  skip: number[] = [],
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
    .where(
      and(
        eq(userWords.userId, userId),
        lte(userWords.dueAt, now),
        eq(words.course, course),
        skip.length ? notInArray(userWords.wordId, skip) : undefined,
      ),
    )
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
    challengeBest: profile.challengeBest,
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
  const deficit = Math.max(0, 8 - dueRows.length);
  // Her yeni kelime iki tur üretir (tanıtım + oyun), 10 tanesi 20 turu doldurur.
  // Tek oyun modunda hiç yeni kelime yok: o tur baştan sona tekrar (bkz. `only`).
  const newLimit = only ? 0 : Math.min(10, Math.max(newBudget, deficit));

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
          /*
            Atlananlar YENİ kelimelerden de çıkarılıyor.

            Yalnızca tekrar kuyruğunu süzmek yetmiyordu: bu yürüyüşte tanıtılan
            bir kelime, cevabı henüz sunucuya ulaşmadıysa hâlâ "hiç görülmemiş"
            sayılıyor ve devam turunda yeni kelime olarak geri geliyor. Turun
            ortasında ağ kesilmesi de aynı sonucu veriyor.
          */
          skip.length ? notInArray(words.id, skip) : undefined,
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

  // Yakın zamanda gelecek tekrarları öne çekmenin İKİ sebebi var.
  //
  // 1) Kuyruk zayıfsa oturum boş kalmasın.
  //
  // 2) Oyun çeşitliliği. Oyunlar kelimenin gücüne göre açılıyor: üretim
  //    oyunları (yazarak hatırla, cümleyi diz, harf bulmacası) ve çoğul
  //    yalnızca oturmuş kelimelerde çıkıyor. İlerlemiş bir öğrencide bu
  //    kelimelerin tekrarı haftalar sonrasına planlanıyor ve günlük oturum
  //    baştan sona yeni kelimeyle doluyor — hepsi "fresh", dolayısıyla
  //    ekranda yalnızca tanıma oyunları görünüyor. Gerçek kullanımda
  //    doğrulandı: bir kullanıcının 290 kelimesinin 264'ü oturmuş olmasına
  //    rağmen tekrarı gelmiş yalnızca 2 kelimesi vardı ve ikisi de takılan
  //    kelimeydi, yani yazma oyunu ve çoğul haftalarca hiç çıkmadı.
  //
  //    Olgun bir kelimeyi birkaç gün erken sormak SM-2 açısından zararsız
  //    (aralık yine büyür), ama oyun havuzunu açık tutuyor.
  //
  // Son 30 dakikada zaten sorulmuş kelimeler dışarıda bırakılır — aynı kelimeyi
  // arka arkaya sormak öğrenciyi yorar ve bir şey öğretmez.
  const mature = (i: QueueItem) => i.strength === "solid" || i.strength === "strong";
  const matureCount = dueWords.filter(mature).length;
  const thin = dueWords.length + newWords.length < 6;
  const needMature = Math.max(0, MIN_MATURE - matureCount);

  /**
   * Tek oyun modunun kuyruk açığı.
   *
   * Bu modda turu dolduracak tek kaynak tekrarlar: yeni kelime alınmıyor ve
   * tanıtım kartı da yok, yani kuyruktaki her madde bir tur demek. Üstelik her
   * kelimeye her oyun kurulamıyor (çoğulu okunamayan isim, örnek cümlesi
   * olmayan kelime, artikelsiz madde) ve kurulamayan kelime atlanıyor. Bu
   * yüzden kuyruk tur sayısının iki katına kadar geniş tutuluyor — eleme
   * sonrası geriye yine dolu bir tur kalsın.
   */
  const onlyDeficit = only ? Math.max(0, ROUNDS_PER_SESSION * 2 - dueWords.length) : 0;

  if (onlyDeficit > 0) {
    const seen = dueWords.map((i) => i.word.id);
    const filler = await pickSingleGameFiller(userId, course, now, onlyDeficit, [...skip, ...seen]);
    for (const r of filler) {
      dueWords.push({ word: toRoundWord(r.w, false), strength: wordStrength(r.uw) });
    }
  } else if (thin || needMature > 0) {
    const want = thin ? 10 - dueWords.length - newWords.length : needMature;
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
          // Çeşitlilik için çekiyorsak yalnızca oturmuş kelime işe yarıyor:
          // erken çekilen bir "fresh" kelime aynı tanıma oyunlarını doğurur.
          thin ? sql`true` : sql`${userWords.correctStreak} >= 2 and ${userWords.intervalDays} >= 1`,
        ),
      )
      .orderBy(asc(userWords.dueAt))
      .limit(Math.max(0, want));
    for (const r of early) {
      dueWords.push({
        word: toRoundWord(r.w, false),
        strength: wordStrength(r.uw),
        // Çeşitlilik için çekilen kelime üretim eğilimiyle sorulur. Eğilim
        // olmadan bu kelimeler de tanıma oyunlarına düşüyordu ve öne çekmenin
        // tek amacı boşa gidiyordu.
        bias: thin ? undefined : "production",
      });
    }
  }

  const rounds = composeRounds(dueWords, newWords, pool, only);

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
  /** Tek oyunlu tur istendiğinde o oyunun kimliği (bkz. buildSession). */
  only?: PlayableGame,
  /** Bu turda atlanacak kelimeler — bkz. `buildSession`. */
  skip: number[] = [],
): Promise<SessionPayload> {
  const profile = await ensureProfile(userId);

  // "Yeni kelimelerle devam et" bilerek yeni bir tur ister; kayıtlıyı ezer.
  if (!extra) {
    const [saved] = await db
      .select()
      .from(sessionState)
      .where(eq(sessionState.userId, userId));
    const rounds = saved?.rounds as Round[] | undefined;
    /**
     * Kayıtlı tur bugünün biçiminde mi?
     *
     * Turlar jsonb olarak duruyor, yani şeması sürüm değiştirdiğinde eski
     * satırlar olduğu gibi geri geliyor. Şıklar düz metinken iki dilli nesneye
     * dönüştü; eski bir satır geri verilseydi oyun şıkları hiç çizemez ve
     * kullanıcı boş bir turda kalırdı. Yarım kalan bir turu atmak, kırık bir
     * turu göstermekten iyidir — bedeli tek bir turun baştan kurulması.
     */
    const currentShape =
      !Array.isArray(rounds) ||
      rounds.every((r) => {
        if (r.game === "choice" || r.game === "listen")
          return r.options.every((o) => typeof o === "object" && o !== null && "text" in o);
        if (r.game === "truefalse") return typeof r.claim === "object" && r.claim !== null;
        return true;
      });
    /**
     * Kayıtlı tur, istenen oyun moduna ait mi?
     *
     * Tek oyun seçiliyken yarım kalmış KARIŞIK turu vermek seçimi görmezden
     * gelmek olurdu; bu yüzden eskiden `only` verildiğinde kayıtlı tur her
     * hâlükârda atılıyordu. Ama artık oyun seçimi kalıcı: kullanıcı seçtiği
     * modda kalıyor ve uygulamayı her açışında tur baştan kurulsaydı, tek
     * oyun modunda "kaldığın yerden devam" diye bir şey kalmazdı. Ayrım
     * kayıtlı turun kendisinden okunuyor — turların hepsi o oyundansa o tur
     * zaten bu seçimin turudur.
     */
    const matchesMode =
      !only || (Array.isArray(rounds) && rounds.length > 0 && rounds.every((r) => r.game === only));
    if (
      saved &&
      matchesMode &&
      currentShape &&
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

  const built = await buildSession(userId, today, extra, false, only, skip);
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

/** Yürüyüş turundaki yeni kelime sayısı — karışık turdaki gibi arada birkaç. */
const WALK_NEW = 3;

/**
 * Yürüyüş kuyruğu — "tek oyuna odaklan" mantığının sesli sürümü.
 *
 * Karışık oturumdan iki farkı var, ikisi de bilerek:
 *
 *   1. **Tek oyun: "Almancasını söyle" (`speak`).** Karışık oturum bir kelimeyi
 *      birden çok oyuna (tanıtım + tanıma + üretim + eşleştirme) koyuyor; ekranda
 *      bunlar ayrı beceri ama yürüyüşte hepsi tek soruya iniyor ve aynı kelime
 *      iki-üç kez soruluyordu. Üstelik yeni-kelime katmanı 20 turu 30-40'a
 *      çıkarıyordu (kod: "10 yeni kelime = 30 tur"). Burada kelime başına TEK
 *      `speak` turu ve toplam TAM `ROUNDS_PER_SESSION` — ne aşım, ne atlama.
 *
 *   2. **Durum tutulmuyor.** `session_state`'e hiç dokunulmuyor. Normal oturumla
 *      aynı satırı (kullanıcı başına tek) paylaşmak ikisini birbirine eziyordu:
 *      yürüyüş karışık yarım turu devralıyor, ya da normal turu siliyordu. Yürüyüş
 *      her sefer TAZE kuruluyor; öğrenme cevaplarla (`/api/answers` → SRS) yazılıyor,
 *      turun nerede kaldığı yalnız client'ta. Cevaplanan kelime SRS'te ileriye
 *      gittiği için sonraki yürüyüşte kendiliğinden geri gelmiyor.
 *
 * Kuyruk: zamanı gelen tekrarlar (en eski önce) + arada birkaç yeni kelime; her
 * yeni kelime bir tanıtım kartı (`intro`) + bir `speak` turu. Tekrar zayıfsa
 * turu yeni kelimeyle dolduruyor, ikisi de yoksa kısa bir yürüyüş — kopya ekleyip
 * şişirmekten iyidir.
 */
export async function buildWalk(
  userId: string,
  today: string,
  skip: number[] = [],
): Promise<SessionPayload> {
  const profile = await ensureProfile(userId);
  const now = new Date();
  const course = profile.course;
  const band = levelBand(profile.level);
  const T = ROUNDS_PER_SESSION;

  // Tekrar tabanı: zamanı gelen kelimeler, en eskisi önce, atlananlar hariç.
  const dueRows = await db
    .select({ w: words })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(
      and(
        eq(userWords.userId, userId),
        lte(userWords.dueAt, now),
        eq(words.course, course),
        skip.length ? notInArray(userWords.wordId, skip) : undefined,
      ),
    )
    .orderBy(asc(userWords.dueAt))
    .limit(T);

  // Yeni kelime adayları: hiç görülmemiş, seviyede sıklık sırasıyla.
  const newCandidates = await db
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
        skip.length ? notInArray(words.id, skip) : undefined,
      ),
    )
    .orderBy(sql`${words.rank} asc nulls last`, asc(words.id))
    .limit(WALK_NEW * 12);

  // Kaç yeni kelime: en çok WALK_NEW; ama tekrar kuyruğu turu doldurmuyorsa
  // (yeni/az kullanıcı) yeniyle doldur. Her yeni kelime iki tur (intro + speak).
  let newN = Math.min(WALK_NEW, newCandidates.length);
  const dueUsedFor = (n: number) => Math.min(dueRows.length, T - 2 * n);
  while (2 * newN + dueUsedFor(newN) < T && newN < newCandidates.length) newN++;
  const dueUsed = dueUsedFor(newN);

  const newWords = pickNewWords(newCandidates, band, newN).map((w) => toRoundWord(w, true));
  const dueWords = dueRows.slice(0, dueUsed).map((r) => toRoundWord(r.w, false));

  const rounds = composeWalk(dueWords, newWords, T);

  // meta yürüyüş ekranında kullanılmıyor ama SessionPayload gereği doldurulur.
  const { meta } = await buildSession(userId, today, false, true);
  return { rounds, resume: null, meta };
}

/**
 * Yürüyüş kuyruğunu kurar: iki tekrar, sonra bir yeni çift (tanıtım + söyle);
 * serpiştirilir. Saf ve test edilebilir (bkz. test:numbers) — kelime seçimi
 * `buildWalk`'ta, burada yalnız diziliş.
 *
 * Değişmezler: her tekrar tek `speak` turu (kopya yok), her yeni kelime
 * tanıtım + söyle ÇİFTİ (tanıtımı söylemeden bırakmak yeni kelimeyi öğretmez),
 * toplam en çok `target` (aşım yok). Kelimeler bitince kısa kuyruk — şişirme yok.
 */
export function composeWalk(dueWords: RoundWord[], newWords: RoundWord[], target: number): Round[] {
  let seq = 0;
  const nextId = () => `w${++seq}`;
  const rounds: Round[] = [];
  const due = [...dueWords];
  const fresh = [...newWords];
  while ((due.length || fresh.length) && rounds.length < target) {
    for (let k = 0; k < 2 && due.length && rounds.length < target; k++) {
      rounds.push({ id: nextId(), game: "speak", word: due.shift()! });
    }
    if (fresh.length && rounds.length < target - 1) {
      const w = fresh.shift()!;
      rounds.push({ id: nextId(), game: "intro", word: w });
      rounds.push({ id: nextId(), game: "speak", word: w });
    } else if (!due.length && !fresh.length) {
      break;
    } else if (fresh.length && rounds.length >= target - 1) {
      // Tek slot kaldı: yeni çift sığmıyor. Varsa tekrarla doldur, yoksa bitir.
      if (due.length) rounds.push({ id: nextId(), game: "speak", word: due.shift()! });
      else break;
    }
  }
  return rounds;
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
 *
 * `only` verilirse tur tek bir oyundan kurulur — "20 tur Artikel Yarışı"
 * gibi. O modda kuyruk yalnızca tekrarlardan gelir (bkz. buildSession):
 * `fresh` boştur, dolayısıyla tanıtım kartı da hiç oluşmaz.
 */
function composeRounds(
  due: QueueItem[],
  fresh: QueueItem[],
  pool: (typeof words.$inferSelect)[],
  only?: PlayableGame,
): Round[] {
  const rounds: Round[] = [];
  let seq = 0;
  const nextId = () => `r${++seq}`;

  // Yeni kelimeler önce tanıtım kartı, ardından tanıma oyunu olarak girer.
  const queue: QueueItem[] = [];
  /**
   * Yeni kelimeye aynı oturumda bir üretim dokunuşu (WP-14): tanıtım ve
   * tanıma turundan sonra, araya başka turlar girmiş olarak, ipuçlu yazma.
   * Tanımanın hemen ardına konmaz — o zaman ekrandan kopyalamak olurdu;
   * kuyruğun sonuna eklenir ve serpiştirme onu tanımadan uzağa düşürür.
   */
  fresh.forEach((item, k) => {
    queue.push({ ...item, intro: true });
    queue.push(item);
    // İki kelime sonra: k. kelimenin tanıtım+tanıma çifti ile ipuçlu yazması
    // arasına en az iki başka kelimenin çifti girer. Sona atılsaydı 20 turluk
    // tavan onları hiç göstermezdi (ölçüldü: 10 yeni kelime = 30 tur).
    if (!only && k >= 2) queue.push({ ...fresh[k - 2], assist: true });
  });
  if (!only) for (const item of fresh.slice(-2)) queue.push({ ...item, assist: true });
  // Tekrarları araya serpiştir
  const merged: QueueItem[] = [];
  const a = [...due];
  const b = [...queue];
  while (a.length || b.length) {
    if (a.length) merged.push(a.shift()!);
    if (a.length) merged.push(a.shift()!);
    if (b.length) merged.push(b.shift()!);
  }

  // Eşleştirme yalnız oynanıyorsa tur BAŞKA türlü kuruluyor: her tur beşer
  // kelime tükettiği için kuyruk beşerli bloklara bölünüyor ve oyun sayısı
  // kelime sayısıyla sınırlanıyor. Beşe tamamlanmayan artık bırakılıyor —
  // dört kelimelik bir eşleştirme turu oyunun kendisi olmaz.
  if (only === "match") {
    for (let i = 0; i + 5 <= merged.length && rounds.length < ROUNDS_PER_SESSION; i += 5) {
      rounds.push({ id: nextId(), game: "match", words: merged.slice(i, i + 5).map((m) => m.word) });
    }
    return rounds;
  }

  // Eşleştirme turu: tanıtımı yapılan kelimeler de aday olur, böylece oyun
  // ilk günden itibaren çıkar. Tur oturumun sonuna konur — o noktada tüm
  // kelimeler tanıtılmış olur.
  // Tek oyun modunda bu ek tur yok: kullanıcı hangi oyunu istediyse onu
  // oynuyor, araya başka bir oyun sıkıştırılmıyor.
  const matchCandidates = only ? [] : merged.filter((m) => !m.intro).slice(0, 5);
  const useMatch = matchCandidates.length === 5;

  // Yalnızca bir önceki oyunu dışlamak yetmiyordu: "A B A B A" dizilimi kuralı
  // hiç çiğnemeden aynı iki oyunu üst üste getiriyor ve oturum tekdüze
  // hissettiriyordu. Pencere üç tura çıkarıldı; ayrıca hangi oyunun kaç kez
  // çıktığı sayılıp az çıkan öne alınıyor.
  const recent: string[] = [];
  const usage = new Map<string, number>();
  /** Tur → kuyruk öğesi (gücü): üretim tabanı dönüşümde buna bakar. */
  const meta = new Map<string, QueueItem>();

  for (const item of merged) {
    if (rounds.length >= ROUNDS_PER_SESSION - (useMatch ? 1 : 0)) break;
    const round = item.intro
      ? ({ id: nextId(), game: "intro", word: item.word } as Round)
      : item.assist
        ? ({ id: nextId(), game: "typing", word: item.word, alternatives: [], assist: true } as Round)
        : only
        ? // Tek oyun modu: kelimeye o oyun kurulamıyorsa (çoğulu olmayan bir
          // isim, örnek cümlesi olmayan bir kelime) kelime atlanıyor. Zorla
          // başka bir oyuna düşmek, seçimi anlamsız kılardı.
          makeRound(only, item.word, pool, nextId, item.strength)
        : pickRound(item.word, item.strength, pool, recent, nextId, item.bias, usage);
    if (!round) continue;
    rounds.push(round);
    meta.set(round.id, item);
    usage.set(round.game, (usage.get(round.game) ?? 0) + 1);
    recent.push(round.game);
    if (recent.length > RECENT_GAME_WINDOW) recent.shift();
  }

  if (!only) raiseProductionFloor(rounds, meta, pool, nextId);

  if (useMatch) {
    rounds.push({ id: nextId(), game: "match", words: matchCandidates.map((m) => m.word) });
  }

  return rounds;
}

/** Üretim tabanı — gerekçe `PRODUCTION_FLOOR` yorumunda. */
function raiseProductionFloor(
  rounds: Round[],
  meta: Map<string, QueueItem>,
  pool: (typeof words.$inferSelect)[],
  nextId: () => string,
): void {
  if (PRODUCTION_FLOOR <= 0) return;
  const counted = rounds.filter((r) => r.game !== "intro" && r.game !== "match");
  let need = Math.ceil(counted.length * PRODUCTION_FLOOR) - counted.filter((r) => isProductionGame(r.game)).length;
  if (need <= 0) return;
  const produced = new Set<number>();
  for (const r of rounds) if (isProductionGame(r.game) && "word" in r) produced.add(r.word.id);
  // Sondan başa: tanıtımın hemen ardındaki tanıma turu yerinde kalsın,
  // üretim kelimeyle ikinci karşılaşmaya düşsün.
  for (let i = rounds.length - 1; i >= 0 && need > 0; i--) {
    const r = rounds[i];
    if (r.game === "intro" || r.game === "match" || !("word" in r) || isProductionGame(r.game)) continue;
    if (produced.has(r.word.id)) continue;
    const strength = meta.get(r.id)?.strength ?? "fresh";
    let alt: Round | null = null;
    if (strength === "solid" || strength === "strong") {
      alt =
        makeRound(i % 2 ? "translate" : "order", r.word, pool, nextId, strength) ??
        makeRound("typing", r.word, pool, nextId, strength);
    } else {
      alt = i % 2 ? makeRound("scramble", r.word, pool, nextId, strength) : null;
      if (!alt) alt = { id: nextId(), game: "typing", word: r.word, alternatives: [], assist: true } as Round;
    }
    if (!alt) continue;
    rounds[i] = alt;
    produced.add(r.word.id);
    need--;
  }
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
  /** Oturumda her oyunun kaç kez çıktığı; az çıkan öne alınır. */
  usage?: Map<string, number>,
): Round | null {
  // Basamağa göre aday küme merdivende (lib/ladder.ts): sunucu, istemci ve
  // rapor aynı listeyi okuyor. Gerekçeler orada.
  const candidates: Round["game"][] = gamesFor(strength, word);
  // Serbest cümle (WP-12): yalnız sağlam kelimede, oturumda en çok iki kez,
  // meydan okuma/sınav dalgalarında hiç (hakemi AI, süresi belirsiz) ve
  // sağlayıcı varken — yedek hakem dilbilgisini ölçemiyor, onunla tur kurmak
  // öğrenciye ölçülmeyen bir iş yaptırmak olurdu.
  if (strength === "strong" && !bias && (usage?.get("free_sentence") ?? 0) < FREE_SENTENCE_PER_SESSION && chatConfigured()) {
    candidates.push("free_sentence");
  }
  // Parçaları ekranda olsa da bu oyunlar öğrenciden bir şey **kurmasını**
  // ister; tanıma oyunlarında ise doğru cevap zaten şıklardan biridir.
  const PRODUCTION: Round["game"][] = PRODUCTION_GAMES.filter((g): g is Round["game"] => g !== "speak");
  const tuned =
    bias === "production"
      ? [...candidates.filter((g) => PRODUCTION.includes(g)), ...candidates]
      : bias === "recognition"
        ? [...candidates.filter((g) => !PRODUCTION.includes(g)), ...candidates]
        : candidates;

  const banned = new Set(Array.isArray(avoid) ? avoid : [avoid]);
  const usable = tuned.filter((g) => !banned.has(g));
  const order = usable.length ? usable : tuned;

  // Sıralama iki aşamalı ve ikisi de gerekli:
  //
  //   1. Karıştırma — `tuned` içinde eğilimli oyunlar iki kez geçer, bu yüzden
  //      karıştırma onları öne çıkarma **olasılığını** taşır (meydan okumanın
  //      dalga eğilimi böyle çalışır).
  //   2. Kullanım sayısına göre kararlı sıralama — oturumda az çıkmış oyun öne
  //      geçer. Yalnızca karıştırma yapılsaydı 14 turluk bir oturumda aynı iki
  //      oyunun arka arkaya kümelenmesi tamamen olağan olurdu; oyun sayısını
  //      artırmak tek başına bunu çözmez.
  //
  // Array.sort kararlı olduğu için eşit kullanımdaki oyunlarda karıştırmanın
  // (ve eğilimin) sonucu korunur.
  const ranked = shuffle(order).sort((a, b) => (usage?.get(a) ?? 0) - (usage?.get(b) ?? 0));

  for (const game of ranked) {
    const round = makeRound(game, word, pool, nextId, strength);
    if (round) return round;
  }
  return { id: nextId(), game: "choice", word, options: optionsFor(word, pool), direction: "de-tr" };
}

/**
 * Tek bir tur kurar.
 *
 * Dışa açık, çünkü modül sınavı (lib/lessons/boss.ts) aynı oyunları kendi
 * kelime havuzuyla kuruyor. İkinci bir tur üreteci yazmak, çeldirici
 * seçiminden yön kararına kadar her şeyi ikinci kez — ve er geç farklı —
 * uygulamak demekti.
 */
export function makeRound(
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
    case "truefalse": {
      // Yarı yarıya doğru/yanlış: ne "hep doğru" ne "hep yanlış" ezberi kurulsun.
      const isTrue = Math.random() < 0.5;
      const claim = isTrue ? { text: word.tr, sub: word.en } : pickFalseClaim(word, pool);
      if (!claim) return null;
      return { id: nextId(), game: "truefalse", word, claim, isTrue };
    }
    case "listen":
      // Şıklar Türkçe: sorulan şey yazım değil, sesin hangi anlama geldiği.
      return { id: nextId(), game: "listen", word, options: optionsFor(word, pool, "de-tr") };
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
        sentenceEn: firstExample(word.beispielEn),
      };
    }
    case "free_sentence": {
      // Ortak: aynı seviyeden, farklı türden bir kelime daha; yoksa herhangi biri.
      const others = pool.filter((p) => p.id !== word.id && p.niveau === word.niveau);
      const pick = shuffle(others.filter((p) => p.typ !== word.typ).concat(others.filter((p) => p.typ === word.typ)))[0];
      if (!pick) return null;
      return { id: nextId(), game: "free_sentence", word, partners: [toRoundWord(pick, false)], level: word.niveau };
    }
    case "translate": {
      // Kaynak: kelimenin kendi örnek cümlesi ve Türkçesi. Türkçesi yoksa
      // soru yok; 4'ten kısa cümle yazdırmaya değmez, 12'den uzunu telefonda
      // bir turluk iş olmaktan çıkar.
      const de = firstExample(word.beispiel)?.trim();
      const tr = firstExample(word.beispielTr)?.trim();
      if (!de || !tr) return null;
      const n = de.replace(/[.!?…]+$/, "").split(/\s+/).filter(Boolean).length;
      if (n < 4 || n > 12) return null;
      return {
        id: nextId(),
        game: "translate",
        word,
        sentence: { tr, de, en: firstExample(word.beispielEn) },
        alternatives: [],
      };
    }
    case "cloze": {
      const cloze = buildCloze(word);
      if (!cloze) return null;
      return {
        id: nextId(),
        game: "cloze",
        word,
        // Yazarak tamamlama: sağlam kelimede yarı yarıya, oturmuşta dörtte
        // bir (lib/ladder.ts). Şıklar yine kuruluyor: basamak inişi onlara döner.
        mode: Math.random() < clozeTypeChance(strength) ? "type" : undefined,
        sentence: cloze.sentence,
        // Cümle ilk örnekten kurulduğu için çeviri de ilk parçadan alınır.
        sentenceTr: firstExample(word.beispielTr),
        sentenceEn: firstExample(word.beispielEn),
        answer: cloze.answer,
        // Bu turda şıklar Almanca biçimlerdir, anlam değil: ikinci dil satırı
        // yok, çeldirici üreticisinden yalnızca metin alınıyor.
        options: shuffle([
          cloze.answer,
          ...pickDistractors(word, pool, 3, (p) => ({ text: p.de, sub: null })).map((o) => o.text),
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

/** Bir adayın ekranda göreceği iki satır — üstte karar satırı, altta İngilizce. */
type Labeler = (p: {
  de: string;
  tr: string;
  en: string | null;
  artikel: string | null;
}) => Option;

/** Hedefe en çok benzeyen adaylardan rastgele `count` tane döndürür. */
function pickDistractors(
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  count: number,
  label: Labeler,
): Option[] {
  const target = label(word);
  const seen = new Set([target.text]);
  const scored: { option: Option; score: number }[] = [];

  for (const p of pool) {
    const option = label(p);
    if (p.id === word.id || seen.has(option.text)) continue;
    seen.add(option.text);
    const typBonus = p.typ === word.typ ? 6 : 0;
    const trBonus = similarity(p.tr, word.tr) / 2;
    scored.push({ option, score: similarity(p.de, word.de) + typBonus + trBonus });
  }

  scored.sort((a, b) => b.score - a.score);
  // En yakın 10 aday arasından rastgele seç: zorluk yüksek, tekrar eden şık yok.
  return shuffle(scored.slice(0, Math.max(count, 10)))
    .slice(0, count)
    .map((c) => c.option);
}

/**
 * Bir maddenin anlamları, karşılaştırılabilir hâlde.
 *
 * Kelime başına tek karşılık yazıldıktan sonra bu çoğu maddede tek elemanlı
 * bir küme; virgüllü ayırma yine de duruyor çünkü havuz seviye seviye
 * yenileniyor ve henüz sırası gelmemiş maddelerde eski çok anlamlı biçim
 * geçerli. İngilizce de kümeye giriyor: Türkçesi aynı ama İngilizcesi farklı
 * iki kelime ("öğrenci" = Schüler / Student) ikili kararda birbirinin doğru
 * karşılığı sayılmamalı.
 */
function meanings(word: { tr: string; en: string | null }): Set<string> {
  const out = new Set<string>();
  for (const part of word.tr.split(",")) {
    const m = part.trim().toLocaleLowerCase("tr-TR");
    if (m) out.add(m);
  }
  if (word.en) out.add(word.en.trim().toLowerCase());
  return out;
}

/**
 * "Doğru mu Yanlış mı" turunun yanlış iddiası.
 *
 * Burada çeldirici seçimi diğer oyunlardan **daha katı** olmak zorunda: cevap
 * ikili olduğu için, öne sürülen anlam kelimenin gerçekten geçerli bir başka
 * karşılığıysa öğrenci "doğru" der ve haksız yere yanlış sayılır. Çoktan
 * seçmelide bu risk yoktur, orada doğru şık zaten listededir ve en iyi eşleşme
 * seçilir.
 *
 * Bu yüzden aday, hedefin anlamlarından **hiçbirini** paylaşmamalı; Almanca
 * biçim benzerliği ise istenen şey — asıl karışıklık orada.
 */
function pickFalseClaim(
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
): Option | null {
  const own = meanings(word);
  const scored: { option: Option; score: number }[] = [];
  const seen = new Set<string>([word.tr]);

  for (const p of pool) {
    if (p.id === word.id || seen.has(p.tr)) continue;
    const other = meanings(p);
    if ([...other].some((m) => own.has(m))) continue; // ortak anlam varsa iddia yanlış sayılamaz
    seen.add(p.tr);
    const typBonus = p.typ === word.typ ? 6 : 0;
    scored.push({
      option: { text: p.tr, sub: p.en },
      score: similarity(p.de, word.de) + typBonus,
    });
  }
  if (!scored.length) return null;

  scored.sort((a, b) => b.score - a.score);
  return shuffle(scored.slice(0, 12))[0]?.option ?? null;
}

/** Şıklar sorunun yönüne göre iki dilli anlam ya da Almanca biçim olur. */
function optionsFor(
  word: RoundWord,
  pool: (typeof words.$inferSelect)[],
  direction: "de-tr" | "tr-de" = "de-tr",
): Option[] {
  // Almanca şıklarda artikel de görünür: "die Apotheke" kelimenin bir parçasıdır.
  // O yönde ikinci satır yok — orada sorulan şey anlam değil, kelimenin kendisi.
  const label: Labeler = (p) =>
    direction === "de-tr"
      ? { text: p.tr, sub: p.en }
      : { text: p.artikel ? `${p.artikel} ${p.de}` : p.de, sub: null };
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
  /** Bahisli etap kapandıysa sonucu — yoksa bahis oynanmamıştır. */
  wager: Wager | null = null,
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

  // Kelimenin son yanlışının hata tipi → tekrar aralığı katsayısı (WP-02
  // kancası, bkz. lib/errors.ts). Tek sorgu: son 14 günün yanlışlarından
  // kelime başına en yenisi. Kayıt yoksa katsayı 1, yani bugünkü davranış.
  const lastErrorByWord = new Map<number, ErrorType>();
  if (wordIds.length) {
    const rows = await db
      .selectDistinctOn([reviews.wordId], { wordId: reviews.wordId, errorType: reviews.errorType })
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, userId),
          inArray(reviews.wordId, wordIds),
          eq(reviews.correct, false),
          isNotNull(reviews.errorType),
          gte(reviews.createdAt, new Date(now.getTime() - 14 * 86400000)),
        ),
      )
      .orderBy(reviews.wordId, desc(reviews.createdAt));
    for (const r of rows) if (isErrorType(r.errorType)) lastErrorByWord.set(r.wordId, r.errorType);
  }

  const frequent = wordIds.length ? await frequentErrorTypes(userId) : new Set<ErrorType>();

  let xpGained = 0;
  let correctCount = 0;
  let newCount = 0;
  const reviewRows: (typeof reviews.$inferInsert)[] = [];
  /** Yanlışların hata tipi olayları — KPI 7 buradan okur; SRS ağırlık olayları da buraya. */
  const errorEvents: (typeof events.$inferInsert)[] = [];
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
    // Kısmi puanlı oyunlar (Çevir) kaliteyi kendisi verir; gerisi hız ve
    // doğruluktan hesaplanır. Sınır 0–5; yanlış cevap 3'ü aşamaz, doğru cevap
    // 3'ün altına inemez — oyun ne gönderirse göndersin SRS mantığı korunur.
    const own =
      typeof ans.quality === "number" && Number.isFinite(ans.quality)
        ? Math.max(0, Math.min(5, Math.round(ans.quality)))
        : null;
    const q =
      own === null
        ? grade(ans.game, ans.correct, ans.latencyMs, ans.hintUsed)
        : ans.correct
          ? Math.max(3, own)
          : Math.min(3, own);
    // Ağırlık: kelimenin son yanlışının tipi son 14 günde ≥ 5 kez görüldüyse
    // ×0,75 (WP-51), yoksa tipin varsayılanı (lib/errors). Uygulanan her
    // ağırlık olay olarak yazılır ki etkisi raporda izlenebilsin.
    const lastType = lastErrorByWord.get(ans.wordId);
    const weight = lastType ? (frequent.has(lastType) ? FREQUENT_ERROR_WEIGHT : srsWeightFor(lastType)) : 1;
    const next = schedule(prev, q, now, weight);
    if (lastType && weight < 1 && ans.correct && prev.state === 2) {
      errorEvents.push({ userId, name: "srs_weight", day: today, value: Math.round(weight * 100), kind: lastType });
    }

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
      errorType: !ans.correct && isErrorType(ans.errorType) ? ans.errorType : null,
      detail: !ans.correct ? cleanDetail(ans.detail) : null,
    });
    if (!ans.correct && isErrorType(ans.errorType)) {
      errorEvents.push({ userId, name: "error_recorded", day: today, value: 1, kind: ans.errorType });
      // Bu turdan sonra aynı kelime yine gelirse (eşleştirme + yazma) son
      // yanlış artık bu.
      lastErrorByWord.set(ans.wordId, ans.errorType);
    }

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
  if (errorEvents.length) {
    // Ölçüm turu bozmamalı: olay yazılamazsa cevaplar yine kaydedilmiş olur.
    try {
      await db.insert(events).values(errorEvents);
    } catch (err) {
      console.error("[events] error_recorded yazılamadı", err);
    }
  }

  /**
   * Bahsin farkı.
   *
   * Kazançla aynı kalemde yazılıyor (günlük istatistik + toplam XP), çünkü
   * bahis ayrı bir para birimi değil, aynı puanın riske atılmış hâli.
   * Kaybın tabanı sıfır: bir öğrenme uygulaması kullanıcıyı geri
   * götürmemeli — en fazla "bu etap boşa gitti" diyebilir.
   */
  const wagerXp = wager ? xpForWager(wager.correct, wager.total, wager.stake) : 0;
  xpGained = Math.max(0, xpGained + wagerXp);

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

  // Streak: bugün ilk kez aktifse güncellenir. Hesap `lib/award.ts` ile
  // ortak — beceriler ve dersler de aynı kuralı uyguluyor.
  const {
    currentStreak,
    longestStreak,
    repaired: streakRepaired,
  } = nextStreak(profile, today);

  await db
    .update(profiles)
    .set({
      currentStreak,
      longestStreak,
      lastActiveDay: today,
      totalXp: profile.totalXp + xpGained,
      ...(streakRepaired ? { streakRepairAt: today } : {}),
    })
    .where(eq(profiles.userId, userId));

  // Yarın kaç kelimenin tekrarı var — geri dönmek için somut bir sebep.
  // Bu turda cevaplanan kelimelerin yeni zamanları yukarıda yazıldığı için
  // sayı güncel: kullanıcı az önce oynadığı kelimelerin bir kısmını yarın
  // görecek ve özet ekranı bunu söyleyebiliyor.
  const dueTomorrow = await countDueTomorrow(userId, today);

  return {
    wagerXp,
    newlyMastered,
    xpGained,
    totalXp: profile.totalXp + xpGained,
    currentStreak,
    longestStreak,
    reviewsToday: stat.reviews,
    dailyGoal: profile.dailyGoal,
    goalReached: stat.reviews >= profile.dailyGoal,
    streakRepaired,
    dueTomorrow,
  };
}

/** Yarın tekrar zamanı gelecek kelime sayısı (kullanıcının yerel günüyle). */
async function countDueTomorrow(userId: string, today: string): Promise<number> {
  const start = shiftDay(today, 1);
  const end = shiftDay(today, 2);
  const [row] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userWords)
    .where(
      and(
        eq(userWords.userId, userId),
        // Yarının tamamı: gün başından ertesi gün başına kadar. Bugün zamanı
        // gelip de yapılmamış kelimeler buraya dahil değil — onlar yarının
        // haberi değil, bugünün kalanı.
        gte(userWords.dueAt, sql`${start}::date`),
        lt(userWords.dueAt, sql`${end}::date`),
      ),
    );
  return Number(row?.n ?? 0);
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

// Gün kaydırma ve seri hesabı `lib/award.ts`'te; buradan yeniden dışa
// aktarılıyor çünkü çağıranların çoğu zaten oturum modülünü kullanıyor.
export { shiftDay };

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
  const recent: string[] = [];
  const usage = new Map<string, number>();
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
      // Aynı kelime tekrar gelirse mutlaka başka bir oyunla sorulur; ayrıca
      // son turlarda çıkan oyunlar da dışarıda kalır. Meydan okuma 27 tur
      // sürüyor — tekdüzelik burada normal turdan daha çabuk hissediliyor.
      const round = pickRound(
        word,
        wordStrength(row.uw),
        pool,
        [...seen, ...recent],
        nextId,
        bias,
        usage,
      );
      if (!round) continue;
      seen.add(round.game);
      usedGames.set(row.w.id, seen);
      rounds.push(round);
      tiers.push(tier);
      usage.set(round.game, (usage.get(round.game) ?? 0) + 1);
      recent.push(round.game);
      if (recent.length > RECENT_GAME_WINDOW) recent.shift();
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
): Promise<{ best: number; previous: number; xpGained: number }> {
  const profile = await ensureProfile(userId);
  const previous = profile.challengeBest;
  if (score <= previous) return { best: previous, previous, xpGained: 0 };

  // Rekor kırmak ayrıca ödüllendiriliyor. Turun cevapları zaten `/api/answers`
  // üzerinden XP kazandırıyor; buradaki ödül iyi oynamanın karşılığı — aksi
  // hâlde uygulamanın en zorlu bölümü, kolay bir tekrar turuyla aynı puanı
  // veriyordu.
  const xpGained = xpForChallengeRecord(score, previous);

  await db
    .update(profiles)
    .set({ challengeBest: score, totalXp: profile.totalXp + xpGained })
    .where(eq(profiles.userId, userId));
  return { best: score, previous, xpGained };
}

/** İlerleme ekranı verileri */
export type LeaderboardRow = {
  rank: number;
  userId: string;
  name: string | null;
  xp: number;
  streak: number;
  isMe: boolean;
};

export type LeaderboardWeek = {
  rows: LeaderboardRow[];
  /** Haftanın başladığı gün (pazartesi, YYYY-MM-DD). */
  start: string;
  /** Tablonun sıfırlanmasına kaç gün kaldı — bugün dahil. */
  daysLeft: number;
};

/**
 * Haftanın başı (pazartesi).
 *
 * Pazar değil pazartesi: hafta sonu en çok çalışılan iki gün ve pazar gecesi
 * sıfırlanan bir tablo, cumartesi kazanılanı pazar akşamı silerdi. Pazartesi
 * sıfırlama hafta sonunu tablonun FİNALİ yapıyor.
 */
export function weekStart(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  const dow = d.getUTCDay(); // 0 pazar … 6 cumartesi
  return shiftDay(day, -((dow + 6) % 7));
}

/**
 * Öğren ekranındaki sıralama: bu HAFTANIN XP'sine göre ilk 10 kişi.
 *
 * Önce tüm zamanların toplam XP'siydi ve rekabet üretmiyordu: en çok
 * çalışmış kişi kalıcı olarak tepede duruyor, yeni gelen ise matematiksel
 * olarak ona asla yaklaşamıyordu. Böyle bir tablo iki tarafa da bir şey
 * söylemez — öndeki tehdit altında değil, arkadaki umutsuz.
 *
 * Haftalık pencere bunu tersine çeviriyor: herkes pazartesi eşit başlıyor,
 * öndeki yerini korumak için çalışmak zorunda, arkadaki için hedef bir
 * haftalık mesafede. Ölçü yine emek (XP) ama artık YAKIN geçmişin emeği.
 *
 * Toplam XP kaybolmuyor, profil ekranında birikimli ölçü olarak duruyor.
 * İkisi farklı soruya cevap veriyor: "ne kadar yol geldim" ve "bu hafta kim
 * çalışıyor".
 *
 * Veri `daily_stats`ten okunuyor, yeni sayaç yazılmıyor — aynı olayı iki
 * yerde saymak er geç ayrışan iki sayı demek.
 */
export async function getLeaderboard(
  userId: string,
  today: string,
  limit = 10,
): Promise<LeaderboardWeek> {
  const start = weekStart(today);
  const end = shiftDay(start, 7);
  const elapsed = Math.round(
    (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000,
  );
  const daysLeft = Math.min(7, Math.max(1, 7 - elapsed));

  // Haftanın XP'si tek bir toplamda: her kullanıcı için bir satır.
  const weekly = db
    .select({
      userId: dailyStats.userId,
      xp: sql<number>`sum(${dailyStats.xp})::int`.as("week_xp"),
    })
    .from(dailyStats)
    .where(and(gte(dailyStats.day, start), lt(dailyStats.day, end)))
    .groupBy(dailyStats.userId)
    .having(sql`sum(${dailyStats.xp}) > 0`)
    .as("weekly");

  const top = await db
    .select({
      userId: profiles.userId,
      name: profiles.displayName,
      xp: weekly.xp,
      streak: profiles.currentStreak,
    })
    .from(weekly)
    .innerJoin(profiles, eq(profiles.userId, weekly.userId))
    .orderBy(desc(weekly.xp), desc(profiles.currentStreak), asc(profiles.createdAt))
    .limit(limit);

  const rows: LeaderboardRow[] = top.map((r, i) => ({
    rank: i + 1,
    userId: r.userId,
    name: r.name,
    xp: Number(r.xp),
    streak: r.streak,
    isMe: r.userId === userId,
  }));
  if (rows.some((r) => r.isMe)) return { rows, start, daysLeft };

  // Kendi satırı: bu hafta önünde kaç kişi var. Hiç çalışmamış olsa bile
  // gösteriliyor — listede kendini göremeyen kişi için tablo anlamsızlaşır.
  const [me] = await db.select().from(profiles).where(eq(profiles.userId, userId));
  if (!me) return { rows, start, daysLeft };

  const [mine] = await db
    .select({ xp: sql<number>`coalesce(sum(${dailyStats.xp}), 0)::int` })
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), gte(dailyStats.day, start), lt(dailyStats.day, end)));
  const myXp = Number(mine?.xp ?? 0);

  const [ahead] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(weekly)
    .where(sql`${weekly.xp} > ${myXp}`);

  rows.push({
    rank: Number(ahead?.n ?? 0) + 1,
    userId,
    name: me.displayName,
    xp: myXp,
    streak: me.currentStreak,
    isMe: true,
  });
  return { rows, start, daysLeft };
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

  // Son 30 günün yanlışları hata tipine göre (WP-02). Profil "zayıf noktaların"
  // bölümü (WP-51) bunun üstüne kurulur; burada yalnız ham sayı.
  const errorRows = await db
    .select({ type: reviews.errorType, n: sql<number>`count(*)::int` })
    .from(reviews)
    .where(
      and(
        eq(reviews.userId, userId),
        eq(reviews.correct, false),
        isNotNull(reviews.errorType),
        gte(reviews.createdAt, new Date(Date.now() - 30 * 86400000)),
      ),
    )
    .groupBy(reviews.errorType)
    .orderBy(desc(sql`count(*)`));
  const errors = errorRows
    .filter((r): r is { type: ErrorType; n: number } => isErrorType(r.type))
    .map((r) => ({ type: r.type, n: r.n }));

  return { profile, levels, days, dueNow, upcoming, games, seconds, leeches, errors };
}
