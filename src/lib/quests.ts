import "server-only";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { ALL_DONE_ID, ALL_DONE_XP } from "@/lib/quest-constants";
import { translate, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";
import { supportsGame } from "@/lib/courses";
import type { PlayableGame } from "@/lib/types";
import {
  dailyStats,
  questClaims,
  reviews,
  userConversations,
  userSkills,
} from "@/lib/db/schema";

/**
 * Günün görevleri.
 *
 * İki işi var. Birincisi kullanıcıyı uygulamaya çağırmak — Duolingo günlük
 * görevleri eklediğinde günlük aktif kullanıcısı %25 artmıştı. İkincisi, ve
 * bu uygulamada daha önemlisi, kullanıcıyı **görmediği bölümlere** götürmek:
 * ölçümde yedi kullanıcıdan yalnızca biri beceriler bölümünü açmış, üçü
 * konuşmaları denemişti. Uygulamanın en zengin içeriği kimsenin uğramadığı
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
  | "skill1"
  | "conversation1";

type QuestDef = {
  id: QuestId;
  /**
   * Etiketin SÖZLÜK ANAHTARI, metnin kendisi değil.
   *
   * Metin burada Türkçe sabit yazılıydı ve API'den öyle gidiyordu — yani mobil
   * uygulama, arayüzü İngilizce ya da Almanca olsa bile görevleri Türkçe
   * gösteriyordu. Çeviri sunucuda, kullanıcının `native_lang`ine göre yapılıyor:
   * tek değişiklik iki platformu birden düzeltiyor ve mobilin YAYINLANMIŞ
   * sürümleri için bile geçerli, çünkü sözleşme (`label`) değişmiyor.
   */
  labelKey: string;
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
  /**
   * Oyuna bağlı görevin oyunu — ilerleme o oyundaki doğru cevaplardan okunur.
   *
   * Aynı alan görevin KURSTA verilip verilemeyeceğini de belirliyor
   * (`supportsGame`): İngilizcede artikel yok, "5 artikel doğru bil" orada hiç
   * bitmeyecek bir görevdi.
   */
  game?: PlayableGame;
};

const QUESTS: QuestDef[] = [
  { id: "reviews10", labelKey: "quest.reviews10", href: "/learn", target: 10, xp: 120 },
  { id: "reviews25", labelKey: "quest.reviews25", href: "/learn", target: 25, xp: 200 },
  { id: "newWords3", labelKey: "quest.newWords3", href: "/learn", target: 3, xp: 120 },
  { id: "artikel5", labelKey: "quest.artikel5", href: "/learn", target: 5, xp: 150, game: "artikel" },
  { id: "listen5", labelKey: "quest.listen5", href: "/learn", target: 5, xp: 150, game: "listen" },
  { id: "skill1", labelKey: "quest.skill1", href: "/immersion", target: 1, xp: 200, discovery: true },
  { id: "conversation1", labelKey: "quest.conversation1", href: "/immersion", target: 1, xp: 200, discovery: true },
];

/* Üçünü birden bitirmenin ödülü ve kimliği: kart da (istemci) okuduğu için
   `server-only` olmayan `lib/quest-constants` içinde duruyor, bkz. orası. */
export { ALL_DONE_ID, ALL_DONE_XP } from "@/lib/quest-constants";

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

/** Görev bu kursta yapılabilir mi — oyuna bağlıysa oyun kursta olmalı. */
function fitsCourse(q: QuestDef, course: string | null | undefined): boolean {
  return !q.game || supportsGame(course, q.game);
}

/**
 * Günün üç görevi: ikisi çalışma, biri keşif.
 *
 * KURSA GÖRE ELEME SEÇİMDEN SONRA. Görevler hiçbir yerde saklanmıyor, her
 * okumada gün + kullanıcı tohumundan yeniden türetiliyor; saklanan yalnız
 * alınan ödüller (`quest_claims`). Havuz seçimden ÖNCE süzülseydi İngilizce
 * öğrenenin tohumu başka görevlere düşer, sabah aldığı ödülün görevi
 * panodan kaybolur, yerine ikinci kez ödül alabileceği yenisi gelirdi. Bu
 * yüzden seçim her kurs için aynı yapılıyor ve yalnız kursa uymayan görev,
 * aynı tohumun DEVAMIYLA seçilen bir yedekle değiştiriliyor:
 *   - Almanca kursunda sonuç eskisiyle birebir aynı.
 *   - İngilizce kursunda bugün "5 artikel" almış kullanıcı düzeltme canlıya
 *     çıkar çıkmaz yerine yapılabilir bir görev görüyor; öteki iki görevi
 *     değişmiyor. Veritabanına dokunmak gerekmiyor.
 *   - Gün içinde kurs değiştiren kullanıcının panosu bir sonraki okumada yeni
 *     kursa uyuyor; geri dönünce eski pano aynen geri geliyor. Önceki kursta
 *     alınmış bir ödül `quest_claims`te kalıyor (XP zaten verildi); aynı
 *     görev iki kez ödüllenemiyor, birincil anahtar gün + görev.
 */
export function questsFor(day: string, userId: string, course: string | null | undefined): QuestDef[] {
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

  const spare = work.filter((q) => fitsCourse(q, course) && !chosen.includes(q));
  return chosen.flatMap((q) => {
    if (fitsCourse(q, course)) return [q];
    if (!spare.length) return [];
    return spare.splice(Math.floor(rand() * spare.length), 1);
  });
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
  /** Etiketlerin çevrileceği arayüz dili — çağıranın profilinden gelir. */
  lang: NativeLang,
  /**
   * Kullanıcının ŞU ANKİ kursu (profilden). Zorunlu: varsayılanı olsaydı
   * unutan çağıran sessizce Almanca havuzu alırdı — hatanın kendisi buydu.
   */
  course: string | null | undefined,
): Promise<{ quests: QuestProgress[]; allDone: boolean; allClaimed: boolean }> {
  const chosen = questsFor(day, userId, course);
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
  const gameQuests = chosen.filter((q): q is QuestDef & { game: PlayableGame } => !!q.game);
  if (gameQuests.length) {
    const rows = await db
      .select({ game: reviews.game, n: sql<number>`count(*)::int` })
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, userId),
          eq(reviews.correct, true),
          inArray(reviews.game, gameQuests.map((q) => q.game)),
          gte(reviews.createdAt, sql`${day}::date`),
          sql`${reviews.createdAt} < ${day}::date + 1`,
        ),
      )
      .groupBy(reviews.game);
    for (const r of rows) {
      for (const q of gameQuests) if (q.game === r.game) counts.set(q.id, Number(r.n));
    }
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

  if (ids.includes("conversation1")) {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userConversations)
      .where(
        and(
          eq(userConversations.userId, userId),
          gte(userConversations.lastAt, sql`${day}::date`),
          sql`${userConversations.lastAt} < ${day}::date + 1`,
        ),
      );
    counts.set("conversation1", Number(row?.n ?? 0));
  }

  const quests: QuestProgress[] = chosen.map((q) => ({
    id: q.id,
    label: translate(lang, q.labelKey),
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
  /** Panoyla AYNI kurs: kursa uymayan görev panoda yok, ödülü de alınamaz. */
  course: string | null | undefined,
): Promise<{ xp: number }> {
  // Dil yalnız etiketi çeviriyor; doğrulamada etikete bakılmıyor.
  const board = await questBoard(userId, day, DEFAULT_NATIVE, course);

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
