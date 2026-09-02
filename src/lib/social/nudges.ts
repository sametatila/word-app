import { and, eq, gte, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { nudges, profiles } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { blockedEitherWay } from "./blocks";
import { serverToday } from "./dates";
import { SocialError } from "./errors";
import { notify } from "./notify";
import { LIMITS, limited } from "./ratelimit";
import { friendIds, publicUsers, weeklyXpFor } from "./stats";
import { NUDGE_KINDS, type NudgeKind } from "./types";

export function isNudgeKind(v: unknown): v is NudgeKind {
  return typeof v === "string" && (NUDGE_KINDS as readonly string[]).includes(v);
}

/**
 * Dürtme: sohbetsiz "seni düşündüm". Yalnız arkadaşa, arkadaş başına günde
 * bir, toplam günde yirmi. Push metni alıcının KENDİ sayısını taşır (seri ya
 * da haftalık XP) — push.ts'in kuralı: genel laf yok, kişiye özel rakam var.
 */
export async function sendNudge(me: string, to: string, kind: NudgeKind): Promise<{ id: number; remainingToday: number }> {
  if (me === to) throw new SocialError("self", 400);
  if (await blockedEitherWay(me, to)) throw new SocialError("not_found", 404);
  const friends = await friendIds(me);
  if (!friends.includes(to)) throw new SocialError("not_friends", 403);
  const per = await limited("nudgePerFriend", me, to);
  if (!per.ok) throw new SocialError("rate_limited", 429, per.retryAfterSec);
  const total = await limited("nudgeTotal", me);
  if (!total.ok) throw new SocialError("rate_limited", 429, total.retryAfterSec);

  const [row] = await db.insert(nudges).values({ fromUserId: me, toUserId: to, kind }).returning({ id: nudges.id });
  const [users, target, weekly] = await Promise.all([
    publicUsers([me]),
    db.select({ streak: profiles.currentStreak, name: profiles.displayName }).from(profiles).where(eq(profiles.userId, to)).limit(1),
    weeklyXpFor([to], serverToday()),
  ]);
  const meName = users.get(me)?.name ?? "Bir arkadaşın";
  const streak = target[0]?.streak ?? 0;
  const xp = weekly.get(to) ?? 0;
  const body =
    kind === "remind"
      ? streak > 0
        ? `${meName} seni dürttü: ${streak} günlük serin bugün de sürsün`
        : `${meName} seni dürttü: bugün kısa bir tur yeter`
      : `${meName} sana aferin dedi: bu hafta ${xp} XP topladın`;
  await notify(
    to,
    { type: "nudge", actorId: me, refType: "nudge", refId: row.id },
    { title: kind === "remind" ? "Bir arkadaşın seni dürttü" : "Bir arkadaşın seni alkışladı", body, url: "/learn", tag: `nudge-${me}` },
  );
  await track(me, "nudge_send", serverToday(), 0, kind);
  return { id: row.id, remainingToday: Math.max(0, LIMITS.nudgeTotal.limit - total.count) };
}

/** Bugün (UTC) zaten dürttüklerim — arayüz düğmeyi kapatır, 429 yemez. */
export async function nudgedToday(me: string, friendIdList: string[]): Promise<Set<string>> {
  const set = new Set<string>();
  if (!friendIdList.length) return set;
  const start = new Date(`${serverToday()}T00:00:00Z`);
  const rows = await db
    .select({ to: nudges.toUserId })
    .from(nudges)
    .where(and(eq(nudges.fromUserId, me), inArray(nudges.toUserId, friendIdList), gte(nudges.createdAt, start)));
  for (const r of rows) set.add(r.to);
  return set;
}
