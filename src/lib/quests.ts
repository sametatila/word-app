import "server-only";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  dailyScores,
  dailyStats,
  questClaims,
  reviews,
  userLessons,
  userSkills,
} from "@/lib/db/schema";

/**
 * Günün görevleri.
 *
 * İki işi var. Birincisi kullanıcıyı uygulamaya çağırmak — Duolingo günlük
 * görevleri eklediğinde günlük aktif kullanıcısı %25 artmıştı. İkincisi, ve
 * bu uygulamada daha önemlisi, kullanıcıyı **görmediği bölümlere** götürmek:
 * ölçümde yedi kullanıcıdan yalnızca biri beceriler bölümünü açmış, üçü
 * dersleri denemişti. Uygulamanın en zengin içeriği kimsenin uğramadığı
 * sekmelerde duruyordu.
 *
 * İlerleme burada BİRİKTİRİLMİYOR, mevcut tablolardan okunuyor. Ayrı bir
 * sayaç tutmak, aynı olayın iki yerde sayılması ve er geç ayrışması demekti.
 */

export type QuestId =
  | "reviews10"
  | "reviews25"
  | "newWords3"
  | "artikel5"
  | "listen5"
  | "daily"
  | "skill1"
  | "lesson1";

type QuestDef = {
  id: QuestId;
  label: string;
  /** Nereye götürdüğü — kart dokununca oraya gider. */
  href: string;
  target: number;
  xp: number;
  /**
   * Keşif görevi mi?
   *
   * Günün üç görevinden en az biri bilerek keşif havuzundan seçiliyor. Hepsi
   * kelime turundan gelseydi görevler yalnızca zaten yapılan işi ödüllendirir,
   * kimsenin açmadığı bölümler kapalı kalmaya devam ederdi.
   */
  discovery?: boolean;
};

const QUESTS: QuestDef[] = [
  { id: "reviews10", label: "10 kelime tekrar et", href: "/learn", target: 10, xp: 120 },
  { id: "reviews25", label: "25 kelime tekrar et", href: "/learn", target: 25, xp: 200 },
  { id: "newWords3", label: "3 yeni kelime öğren", href: "/learn", target: 3, xp: 120 },
  { id: "artikel5", label: "5 artikel doğru bil", href: "/learn", target: 5, xp: 150 },
  { id: "listen5", label: "5 kelimeyi duyarak bul", href: "/learn", target: 5, xp: 150 },
  { id: "daily", label: "Günün turunu oyna", href: "/learn", target: 1, xp: 200, discovery: true },
  { id: "skill1", label: "Bir beceri alıştırması bitir", href: "/skills", target: 1, xp: 200, discovery: true },
  { id: "lesson1", label: "Bir ders tamamla", href: "/lessons", target: 1, xp: 200, discovery: true },
];

/** Üçünü birden bitirmenin ödülü — ayrı bir "görev" gibi talep edilir. */
export const ALL_DONE_ID = "all";
export const ALL_DONE_XP = 300;

const byId = new Map(QUESTS.map((q) => [q.id, q]));

/** Gün + kullanıcı → tohum. Herkesin görevi aynı olmasın, ama gün boyu sabit kalsın. */
function seedOf(day: string, userId: string): number {
  let h = 2166136261;
  const key = `${day}|${userId}`;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(items: T[], rand: () => number): T {
  return items[Math.floor(rand() * items.length)];
}

/** Günün üç görevi: ikisi çalışma, biri keşif. */
export function questsFor(day: string, userId: string): QuestDef[] {
  const rand = rng(seedOf(day, userId));
  const work = QUESTS.filter((q) => !q.discovery);
  const discovery = QUESTS.filter((q) => q.discovery);

  const chosen: QuestDef[] = [];
  const pool = [...work];
  for (let i = 0; i < 2 && pool.length; i++) {
    const q = pick(pool, rand);
    chosen.push(q);
    pool.splice(pool.indexOf(q), 1);
  }
  chosen.push(pick(discovery, rand));
  return chosen;
}

export type QuestProgress = {
  id: QuestId;
  label: string;
  href: string;
  target: number;
  done: number;
  xp: number;
  /** Ödül alındı mı — alınmamış ve tamamlanmış görev arayüzde parlar. */
  claimed: boolean;
};

/**
 * Görevlerin bugünkü ilerlemesi.
 *
 * Her görev tipi kendi kaynağından okunuyor. Sorgular tek seferde ve yalnızca
 * o gün seçilmiş görevler için yapılıyor; kullanılmayan görev tipinin sorgusu
 * hiç çalışmıyor.
 */
export async function questBoard(
  userId: string,
  day: string,
): Promise<{ quests: QuestProgress[]; allDone: boolean; allClaimed: boolean }> {
  const chosen = questsFor(day, userId);
  const ids = chosen.map((q) => q.id);

  const [stat, claims] = await Promise.all([
    db
      .select({ reviews: dailyStats.reviews, newWords: dailyStats.newWords })
      .from(dailyStats)
      .where(and(eq(dailyStats.userId, userId), eq(dailyStats.day, day)))
      .limit(1),
    db
      .select({ questId: questClaims.questId })
      .from(questClaims)
      .where(and(eq(questClaims.userId, userId), eq(questClaims.day, day))),
  ]);

  const claimed = new Set(claims.map((c) => c.questId));
  const counts = new Map<QuestId, number>();
  counts.set("reviews10", stat[0]?.reviews ?? 0);
  counts.set("reviews25", stat[0]?.reviews ?? 0);
  counts.set("newWords3", stat[0]?.newWords ?? 0);

  // Oyun bazlı görevler: o gün verilen doğru cevaplar. `reviews` tablosunda
  // gün alanı yok, zaman damgası var — bu yüzden günün sınırları kullanıcının
  // yerel gününden değil, tarihin kendisinden hesaplanıyor.
  const gameQuests = ids.filter((id) => id === "artikel5" || id === "listen5");
  if (gameQuests.length) {
    const rows = await db
      .select({ game: reviews.game, n: sql<number>`count(*)::int` })
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, userId),
          eq(reviews.correct, true),
          inArray(reviews.game, gameQuests.map((id) => (id === "artikel5" ? "artikel" : "listen"))),
          gte(reviews.createdAt, sql`${day}::date`),
          sql`${reviews.createdAt} < ${day}::date + 1`,
        ),
      )
      .groupBy(reviews.game);
    for (const r of rows) {
      if (r.game === "artikel") counts.set("artikel5", Number(r.n));
      if (r.game === "listen") counts.set("listen5", Number(r.n));
    }
  }

  if (ids.includes("daily")) {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(dailyScores)
      .where(and(eq(dailyScores.userId, userId), eq(dailyScores.day, day)));
    counts.set("daily", Number(row?.n ?? 0));
  }

  if (ids.includes("skill1")) {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userSkills)
      .where(
        and(
          eq(userSkills.userId, userId),
          gte(userSkills.lastAt, sql`${day}::date`),
          sql`${userSkills.lastAt} < ${day}::date + 1`,
        ),
      );
    counts.set("skill1", Number(row?.n ?? 0));
  }

  if (ids.includes("lesson1")) {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessons)
      .where(
        and(
          eq(userLessons.userId, userId),
          gte(userLessons.lastAt, sql`${day}::date`),
          sql`${userLessons.lastAt} < ${day}::date + 1`,
        ),
      );
    counts.set("lesson1", Number(row?.n ?? 0));
  }

  const quests: QuestProgress[] = chosen.map((q) => ({
    id: q.id,
    label: q.label,
    href: q.href,
    target: q.target,
    done: Math.min(q.target, counts.get(q.id) ?? 0),
    xp: q.xp,
    claimed: claimed.has(q.id),
  }));

  return {
    quests,
    allDone: quests.every((q) => q.done >= q.target),
    allClaimed: claimed.has(ALL_DONE_ID),
  };
}

/**
 * Ödülü talep eder.
 *
 * Tamamlanma sunucuda YENİDEN doğrulanıyor: istemcinin "bitirdim" demesi
 * yeterli değil. Kayıt birincil anahtarla korunduğu için aynı ödül iki kez
 * verilemiyor — yarışan iki istek olsa bile ikincisi sessizce düşüyor.
 */
export async function claimQuest(
  userId: string,
  day: string,
  questId: string,
): Promise<{ xp: number }> {
  const board = await questBoard(userId, day);

  let xp = 0;
  if (questId === ALL_DONE_ID) {
    if (!board.allDone || board.allClaimed) return { xp: 0 };
    xp = ALL_DONE_XP;
  } else {
    const q = board.quests.find((x) => x.id === questId);
    const def = byId.get(questId as QuestId);
    if (!q || !def || q.claimed || q.done < q.target) return { xp: 0 };
    xp = def.xp;
  }

  const saved = await db
    .insert(questClaims)
    .values({ userId, day, questId, xp })
    .onConflictDoNothing({ target: [questClaims.userId, questClaims.day, questClaims.questId] })
    .returning({ questId: questClaims.questId });

  return { xp: saved.length ? xp : 0 };
}
