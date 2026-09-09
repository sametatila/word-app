import { and, asc, eq, inArray, lt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { leagueMembers, profiles } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { translate } from "@/lib/i18n/dict";
import { emitActivity } from "./activity";
import { daysLeftInWeek, shiftDay, weekStart } from "./dates";
import { langOf, notify } from "./notify";
import { xpBetween } from "./stats";
import { LEAGUE_TIERS, type LeagueOutcome } from "./types";
import { ensureUsernames } from "./usernames";

/**
 * Haftalık ligler.
 *
 * Genel sıralama düz bir tabloydu ve düz tablo yalnız tepesindekini motive
 * eder. Burada tablo küçültülüyor: her kullanıcı en çok LEAGUE_SIZE kişilik
 * bir grupta yarışıyor, hafta sonunda ilk beşte kalırsa bir üst lige çıkıyor,
 * son beşe düşerse bir alta iniyor. Aynı XP, ulaşılabilir bir hedef.
 *
 * Üç kural yapının tamamını belirliyor:
 *
 *  - XP BURADA SAYILMIYOR. Hafta sürerken sıralama `daily_stats`ten canlı
 *    okunuyor; `final_xp` yalnız kapanışta yazılıyor. İkinci bir sayaç iki
 *    doğruluk kaynağı demekti ve er geç ayrışırdı.
 *  - GRUP HAFTAYA BAĞLI. Bir kez atanan grup hafta boyunca değişmiyor;
 *    yarıştığın insanların pazartesiden pazara aynı kalması yarışın kendisi.
 *  - KAPANIŞ TEMBEL. Cron'a bağlı değil: yeni haftanın ilk sosyal okuması
 *    geçen haftayı kapatıyor (bkz. weekly.ts, claimOnce ile tek sefer).
 */

/** Bir gruptaki en çok kişi. Duolingo'nun otuzu; küçük grup baskıyı korur, listeyi taranabilir tutar. */
export const LEAGUE_SIZE = 30;

/** Bu sayının altında terfi/düşme yok: dört kişilik bir "lig" sıralama değildir. */
const MIN_COMPETITIVE = 5;

/** Grubun yüzde kaçı yükselir/düşer, tavanlarıyla. */
const MOVE_SHARE = 0.2;
const MAX_PROMOTE = 7;
const MAX_DEMOTE = 5;

export type LeagueRow = {
  rank: number;
  userId: string;
  name: string | null;
  username: string | null;
  level: string;
  xp: number;
  streak: number;
  isMe: boolean;
};

export type LeagueResult = {
  weekStart: string;
  tier: number;
  nextTier: number;
  rank: number;
  xp: number;
  outcome: LeagueOutcome;
};

export type LeagueView = {
  weekStart: string;
  tier: number;
  daysLeft: number;
  rows: LeagueRow[];
  /** İlk kaç kişi yükselir, son kaç kişi düşer — arayüz kuşakları buna göre çizer. */
  promote: number;
  demote: number;
  /** Gösterilmemiş geçen hafta sonucu; gösterildikten sonra `seen` işaretlenir. */
  result: LeagueResult | null;
};

function clampTier(t: number): number {
  return Math.max(0, Math.min(LEAGUE_TIERS.length - 1, t));
}

function nextTierAfter(tier: number, outcome: string | null): number {
  if (outcome === "promoted") return clampTier(tier + 1);
  if (outcome === "demoted") return clampTier(tier - 1);
  return clampTier(tier);
}

/** Gruptaki kişi sayısına göre yükselen/düşen sayısı. Küçük grupta hareket yok. */
export function moveCounts(size: number, tier: number): { promote: number; demote: number } {
  if (size < MIN_COMPETITIVE) return { promote: 0, demote: 0 };
  const share = Math.max(1, Math.round(size * MOVE_SHARE));
  const promote = tier >= LEAGUE_TIERS.length - 1 ? 0 : Math.min(MAX_PROMOTE, share);
  const demote = tier <= 0 ? 0 : Math.min(MAX_DEMOTE, share);
  // İki kuşak çakışamaz: ortada en az bir kişi kalmalı, yoksa herkes hem yükselip hem düşerdi.
  if (promote + demote >= size) return { promote: Math.min(promote, Math.max(0, size - 1)), demote: 0 };
  return { promote, demote };
}

/**
 * Kullanıcıyı bu haftanın ligine yerleştirir (zaten varsa dokunmaz).
 *
 * İki yerden çağrılıyor: XP kazanıldığında (asıl yol) ve tablo okunduğunda.
 * İkincisi kasıtlı — sıralamayı AÇMAK da yarışa girmektir ve pazartesi sabahı
 * boş bir tablo görmek kimseyi çalışmaya itmez.
 */
export async function joinLeague(userId: string, today: string): Promise<{ tier: number; cohort: number }> {
  const ws = weekStart(today);
  const [existing] = await db
    .select({ tier: leagueMembers.tier, cohort: leagueMembers.cohort })
    .from(leagueMembers)
    .where(and(eq(leagueMembers.userId, userId), eq(leagueMembers.weekStart, ws)))
    .limit(1);
  if (existing) return existing;

  // Geçen haftaki lig + sonucu: dönen kullanıcı ligini kaybetmiyor, kaldığı yerden sürüyor.
  const [prev] = await db
    .select({ tier: leagueMembers.tier, outcome: leagueMembers.outcome })
    .from(leagueMembers)
    .where(and(eq(leagueMembers.userId, userId), lt(leagueMembers.weekStart, ws)))
    .orderBy(sql`${leagueMembers.weekStart} desc`)
    .limit(1);
  const tier = prev ? nextTierAfter(prev.tier, prev.outcome) : 0;

  // En az dolu grup; hepsi doluysa yeni grup. Üç instance aynı anda okursa
  // ikisi de aynı grubu seçer — grup birkaç kişi taşabilir, bu zararsız.
  const groups = await db
    .select({ cohort: leagueMembers.cohort, n: sql<number>`count(*)::int` })
    .from(leagueMembers)
    .where(and(eq(leagueMembers.weekStart, ws), eq(leagueMembers.tier, tier)))
    .groupBy(leagueMembers.cohort)
    .orderBy(sql`count(*) asc`, asc(leagueMembers.cohort));
  const open = groups.find((g) => Number(g.n) < LEAGUE_SIZE);
  const cohort = open ? open.cohort : groups.length ? Math.max(...groups.map((g) => g.cohort)) + 1 : 0;

  await db.insert(leagueMembers).values({ userId, weekStart: ws, tier, cohort }).onConflictDoNothing();
  const [row] = await db
    .select({ tier: leagueMembers.tier, cohort: leagueMembers.cohort })
    .from(leagueMembers)
    .where(and(eq(leagueMembers.userId, userId), eq(leagueMembers.weekStart, ws)))
    .limit(1);
  return row ?? { tier, cohort };
}

/** Gösterilmemiş geçen hafta sonucu — tabloyu açan bir kez görür. */
async function pendingResult(userId: string, ws: string): Promise<LeagueResult | null> {
  const [row] = await db
    .select()
    .from(leagueMembers)
    .where(and(eq(leagueMembers.userId, userId), lt(leagueMembers.weekStart, ws), eq(leagueMembers.seen, false)))
    .orderBy(sql`${leagueMembers.weekStart} desc`)
    .limit(1);
  if (!row || !row.outcome || row.rank == null) return null;
  return {
    weekStart: String(row.weekStart),
    tier: row.tier,
    nextTier: nextTierAfter(row.tier, row.outcome),
    rank: row.rank,
    xp: row.finalXp,
    outcome: row.outcome as LeagueOutcome,
  };
}

/** Sonuç ekranı gösterildi: bir daha çıkmaz. */
export async function markLeagueResultSeen(userId: string): Promise<void> {
  await db
    .update(leagueMembers)
    .set({ seen: true })
    .where(and(eq(leagueMembers.userId, userId), eq(leagueMembers.seen, false), sql`${leagueMembers.outcome} is not null`));
}

/** Bu haftanın lig tablosu — canlı XP ile. */
export async function leagueBoard(userId: string, today: string): Promise<LeagueView> {
  const ws = weekStart(today);
  const me = await joinLeague(userId, today);
  const members = await db
    .select({ userId: leagueMembers.userId })
    .from(leagueMembers)
    .where(and(eq(leagueMembers.weekStart, ws), eq(leagueMembers.tier, me.tier), eq(leagueMembers.cohort, me.cohort)));
  const ids = members.map((m) => m.userId);
  await ensureUsernames(ids);
  const [xp, prof, result] = await Promise.all([
    xpBetween(ids, ws, shiftDay(ws, 7)),
    db
      .select({ userId: profiles.userId, name: profiles.displayName, username: profiles.username, level: profiles.level, streak: profiles.currentStreak })
      .from(profiles)
      .where(inArray(profiles.userId, ids)),
    pendingResult(userId, ws),
  ]);
  const rows = prof
    .map((p) => ({ userId: p.userId, name: p.name, username: p.username, level: p.level, xp: xp.get(p.userId) ?? 0, streak: p.streak, isMe: p.userId === userId }))
    .sort((a, b) => b.xp - a.xp || b.streak - a.streak || (a.name ?? "").localeCompare(b.name ?? "", "tr"))
    .map((r, i) => ({ rank: i + 1, ...r }));
  const { promote, demote } = moveCounts(rows.length, me.tier);
  return { weekStart: ws, tier: me.tier, daysLeft: daysLeftInWeek(today), rows, promote, demote, result };
}

/**
 * Geçen haftayı kapatır: sıra, dondurulmuş XP ve sonuç. İdempotent — yalnız
 * sonucu henüz yazılmamış satırlara dokunur, iki kez çağrılsa da bir şey
 * değişmez.
 */
export async function closeLeagueWeek(lastWeek: string): Promise<void> {
  const groups = await db
    .select({ tier: leagueMembers.tier, cohort: leagueMembers.cohort })
    .from(leagueMembers)
    .where(and(eq(leagueMembers.weekStart, lastWeek), sql`${leagueMembers.outcome} is null`))
    .groupBy(leagueMembers.tier, leagueMembers.cohort);

  for (const g of groups) {
    const members = await db
      .select({ userId: leagueMembers.userId, createdAt: leagueMembers.createdAt })
      .from(leagueMembers)
      .where(
        and(
          eq(leagueMembers.weekStart, lastWeek),
          eq(leagueMembers.tier, g.tier),
          eq(leagueMembers.cohort, g.cohort),
          sql`${leagueMembers.outcome} is null`,
        ),
      );
    if (!members.length) continue;
    const ids = members.map((m) => m.userId);
    const xp = await xpBetween(ids, lastWeek, shiftDay(lastWeek, 7));
    // Eşitlikte önce gruba katılan önde: "aynı XP" bir kura değil, bir sıra sorusu.
    const ranked = members
      .map((m) => ({ userId: m.userId, xp: xp.get(m.userId) ?? 0, at: new Date(m.createdAt).getTime() }))
      .sort((a, b) => b.xp - a.xp || a.at - b.at);
    const { promote, demote } = moveCounts(ranked.length, g.tier);

    const rows = ranked.map((r, i) => {
      const rank = i + 1;
      // Hiç XP toplamayan yükselemez; en alt ligin dışında düşer.
      const outcome: LeagueOutcome =
        r.xp <= 0 ? (g.tier > 0 ? "demoted" : "stayed") : rank <= promote ? "promoted" : demote > 0 && rank > ranked.length - demote ? "demoted" : "stayed";
      return { ...r, rank, outcome };
    });

    const values = sql.join(
      rows.map((r) => sql`(${r.userId}, ${r.xp}::int, ${r.rank}::int, ${r.outcome}::text)`),
      sql`, `,
    );
    await db.execute(sql`
      update league_members as m
         set final_xp = v.xp, rank = v.rank, outcome = v.outcome
        from (values ${values}) as v(user_id, xp, rank, outcome)
       where m.user_id = v.user_id and m.week_start = ${lastWeek} and m.outcome is null
    `);

    const promoted = rows.filter((r) => r.outcome === "promoted");
    if (!promoted.length) continue;
    const nextTier = clampTier(g.tier + 1);
    for (const r of promoted) {
      await emitActivity(r.userId, "league_up", { tier: nextTier, from: g.tier, rank: r.rank, xp: r.xp });
      // Lig adı ALICININ dilinde çözülüyor: `vars` yer tutucuya hazır metin
      // koyar, anahtar değil (bkz. notify.ts — metni okuyan ile tetikleyen ayrı).
      const league = translate(await langOf(r.userId), `league.tier_${LEAGUE_TIERS[nextTier]}`);
      await notify(
        r.userId,
        { type: "league_up", actorId: null, refType: null, refId: null },
        {
          titleKey: "push.league_up_title",
          bodyKey: "push.league_up_body",
          vars: { league, rank: r.rank },
          url: "/leaderboard",
          tag: "league",
        },
      );
      await track(r.userId, "league_up", lastWeek, nextTier, LEAGUE_TIERS[nextTier]);
    }
  }
}
