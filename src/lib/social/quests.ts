import { and, desc, eq, gte, inArray, lt, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { friendQuests } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { emitActivity } from "./activity";
import { blockedEitherWay } from "./blocks";
import { daysLeftInWeek, serverToday, shiftDay, weekStart } from "./dates";
import { SocialError } from "./errors";
import { notify } from "./notify";
import { limited } from "./ratelimit";
import { friendIds, publicUsers, xpBetween } from "./stats";
import type { QuestView } from "./types";

/**
 * Ortak görev: iki arkadaş bu hafta birlikte hedef XP toplar.
 *
 * Hedef geçen haftanın ikisinin toplamının %120'si (300-5000, 50'ye yuvarlı):
 * ulaşılabilir ama bedava değil. Ödül XP DEĞİL — rozet felsefesiyle aynı
 * (achievements.ts): beş dakikada kazanılan ödül ödül değildir. Ödül, akışa
 * düşen "birlikte başardık" olayı ve profildeki tamamlanmış görev sayısıdır.
 *
 * Kişi başına aynı anda tek görev (davet ya da aktif): iki görevle iki
 * arkadaşa bölünen dikkat, ikisini de yarım bırakır.
 */
const MIN_TARGET = 300;
const MAX_TARGET = 5000;

export async function questTarget(a: string, b: string, today: string): Promise<number> {
  const ws = weekStart(today);
  const last = await xpBetween([a, b], shiftDay(ws, -7), ws);
  const sum = (last.get(a) ?? 0) + (last.get(b) ?? 0);
  const raw = Math.round((sum * 1.2) / 50) * 50;
  return Math.max(MIN_TARGET, Math.min(MAX_TARGET, raw || MIN_TARGET));
}

function isWeekOver(questWeek: string, today: string): boolean {
  return weekStart(today) > questWeek;
}

/** Süresi dolmuş görevleri kapatır — cron yok, ilk okuyan yapar; idempotent. */
export async function finalizeExpiredQuests(today: string): Promise<void> {
  const ws = weekStart(today);
  await db.update(friendQuests).set({ status: "failed" }).where(and(eq(friendQuests.status, "active"), lt(friendQuests.weekStart, ws)));
  await db.update(friendQuests).set({ status: "cancelled" }).where(and(eq(friendQuests.status, "invited"), lt(friendQuests.weekStart, ws)));
}

async function pairQuestThisWeek(a: string, b: string, ws: string) {
  const rows = await db
    .select()
    .from(friendQuests)
    .where(
      and(
        eq(friendQuests.weekStart, ws),
        inArray(friendQuests.status, ["invited", "active", "completed"]),
        or(
          and(eq(friendQuests.userAId, a), eq(friendQuests.userBId, b)),
          and(eq(friendQuests.userAId, b), eq(friendQuests.userBId, a)),
        ),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function inviteQuest(me: string, friendId: string, today: string): Promise<QuestView> {
  if (me === friendId) throw new SocialError("self", 400);
  if (await blockedEitherWay(me, friendId)) throw new SocialError("not_found", 404);
  const friends = await friendIds(me);
  if (!friends.includes(friendId)) throw new SocialError("not_friends", 403);
  await finalizeExpiredQuests(today);
  const ws = weekStart(today);
  if (await pairQuestThisWeek(me, friendId, ws)) throw new SocialError("already_exists", 409);
  const mine = await db
    .select({ id: friendQuests.id })
    .from(friendQuests)
    .where(
      and(
        eq(friendQuests.weekStart, ws),
        inArray(friendQuests.status, ["invited", "active"]),
        or(eq(friendQuests.userAId, me), eq(friendQuests.userBId, me)),
      ),
    )
    .limit(1);
  if (mine.length) throw new SocialError("already_exists", 409);
  const rl = await limited("questInvite", me);
  if (!rl.ok) throw new SocialError("rate_limited", 429, rl.retryAfterSec);

  const targetXp = await questTarget(me, friendId, today);
  const [row] = await db
    .insert(friendQuests)
    .values({ userAId: me, userBId: friendId, weekStart: ws, targetXp, invitedBy: me })
    .returning();
  const meP = (await publicUsers([me])).get(me);
  await notify(
    friendId,
    { type: "quest_invite", actorId: me, refType: "quest", refId: row.id },
    {
      title: "Ortak görev daveti",
      body: `${meP?.name ?? "Bir arkadaşın"} seni davet etti: bu hafta birlikte ${targetXp} XP`,
      url: "/friends?tab=quests",
      tag: `quest-${row.id}`,
    },
  );
  await track(me, "quest_invite", serverToday(), targetXp);
  return (await questViews(me, today)).find((q) => q.id === row.id) as QuestView;
}

export async function respondQuest(me: string, questId: number, accept: boolean): Promise<void> {
  const [row] = await db.select().from(friendQuests).where(eq(friendQuests.id, questId)).limit(1);
  if (!row) throw new SocialError("not_found", 404);
  const invitee = row.invitedBy === row.userAId ? row.userBId : row.userAId;
  if (invitee !== me) throw new SocialError("forbidden", 403);
  if (row.status !== "invited") throw new SocialError("not_found", 404);
  const today = serverToday();
  if (isWeekOver(String(row.weekStart), today)) {
    await db.update(friendQuests).set({ status: "cancelled" }).where(eq(friendQuests.id, questId));
    throw new SocialError("week_over", 410);
  }
  if (!accept) {
    await db.update(friendQuests).set({ status: "cancelled", respondedAt: new Date() }).where(eq(friendQuests.id, questId));
    return;
  }
  await db.update(friendQuests).set({ status: "active", respondedAt: new Date() }).where(eq(friendQuests.id, questId));
  const meP = (await publicUsers([me])).get(me);
  await notify(
    row.invitedBy,
    { type: "quest_accepted", actorId: me, refType: "quest", refId: questId },
    {
      title: "Görev başladı",
      body: `${meP?.name ?? "Arkadaşın"} kabul etti — hedef birlikte ${row.targetXp} XP`,
      url: "/friends?tab=quests",
      tag: `quest-${questId}`,
    },
  );
  // Kabul anında zaten hedefe ulaşılmış olabilir (hafta ortasında davet).
  await checkQuestProgress(me, today);
}

export async function cancelQuest(me: string, questId: number): Promise<void> {
  const [row] = await db.select().from(friendQuests).where(eq(friendQuests.id, questId)).limit(1);
  if (!row || (row.userAId !== me && row.userBId !== me)) throw new SocialError("not_found", 404);
  if (row.status !== "invited" && row.status !== "active") throw new SocialError("not_found", 404);
  await db.update(friendQuests).set({ status: "cancelled" }).where(eq(friendQuests.id, questId));
}

export async function questViews(me: string, today: string): Promise<QuestView[]> {
  await finalizeExpiredQuests(today);
  const rows = await db
    .select()
    .from(friendQuests)
    .where(and(or(eq(friendQuests.userAId, me), eq(friendQuests.userBId, me)), gte(friendQuests.weekStart, shiftDay(weekStart(today), -28))))
    .orderBy(desc(friendQuests.createdAt))
    .limit(12);
  if (!rows.length) return [];
  const partnerIds = rows.map((r) => (r.userAId === me ? r.userBId : r.userAId));
  const users = await publicUsers([...new Set(partnerIds)]);
  const views: QuestView[] = [];
  for (const r of rows) {
    const partner = r.userAId === me ? r.userBId : r.userAId;
    const ws = String(r.weekStart);
    const xp = await xpBetween([me, partner], ws, shiftDay(ws, 7));
    const myXp = xp.get(me) ?? 0;
    const partnerXp = xp.get(partner) ?? 0;
    const total = myXp + partnerXp;
    const current = ws === weekStart(today);
    views.push({
      id: r.id,
      status: r.status as QuestView["status"],
      weekStart: ws,
      targetXp: r.targetXp,
      partner: users.get(partner) ?? { userId: partner, name: null, username: null, level: "A1" },
      invitedByMe: r.invitedBy === me,
      myXp,
      partnerXp,
      totalXp: total,
      pct: Math.min(100, Math.round((total / r.targetXp) * 100)),
      daysLeft: current ? daysLeftInWeek(today) : 0,
      completedAt: r.completedAt ? new Date(r.completedAt).toISOString() : null,
    });
  }
  return views;
}

/** XP yazan her yerden çağrılır: bu haftanın aktif görevleri hedefe ulaştı mı? İdempotent. */
export async function checkQuestProgress(userId: string, today: string): Promise<void> {
  const ws = weekStart(today);
  const rows = await db
    .select()
    .from(friendQuests)
    .where(and(eq(friendQuests.status, "active"), eq(friendQuests.weekStart, ws), or(eq(friendQuests.userAId, userId), eq(friendQuests.userBId, userId))));
  for (const r of rows) {
    const xp = await xpBetween([r.userAId, r.userBId], ws, shiftDay(ws, 7));
    const total = (xp.get(r.userAId) ?? 0) + (xp.get(r.userBId) ?? 0);
    if (total < r.targetXp) continue;
    const done = await db
      .update(friendQuests)
      .set({ status: "completed", completedAt: new Date() })
      .where(and(eq(friendQuests.id, r.id), eq(friendQuests.status, "active")))
      .returning({ id: friendQuests.id });
    if (!done.length) continue; // yarışan istek zaten kapattı
    const users = await publicUsers([r.userAId, r.userBId]);
    for (const [self, partner] of [[r.userAId, r.userBId], [r.userBId, r.userAId]] as const) {
      const p = users.get(partner);
      await emitActivity(self, "quest_completed", { partnerId: partner, partnerName: p?.name ?? null, targetXp: r.targetXp });
      await notify(
        self,
        { type: "quest_completed", actorId: partner, refType: "quest", refId: r.id },
        { title: "Ortak görev tamamlandı", body: `${p?.name ?? "Arkadaşın"} ile birlikte ${r.targetXp} XP topladınız`, url: "/friends?tab=quests", tag: `quest-${r.id}` },
      );
      await track(self, "quest_complete", today, r.targetXp);
    }
  }
}
