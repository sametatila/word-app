import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { activityEvents, eventReactions } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { blockedEitherWay } from "./blocks";
import { serverToday } from "./dates";
import { SocialError } from "./errors";
import { notify } from "./notify";
import { limited } from "./ratelimit";
import { friendIds, publicUsers } from "./stats";
import { REACTION_KINDS, REACTION_LABELS, type ActivityType, type ReactionKind, type ReactionSummary } from "./types";

/** Akış olayını tek satır Türkçeyle anlatır — bildirim ve push metinleri buradan. */
export function describeEvent(type: ActivityType | string, payload: Record<string, unknown>): string {
  switch (type) {
    case "streak_milestone":
      return `${Number(payload.days ?? 0)} günlük seri`;
    case "achievement":
      return `"${String(payload.title ?? "rozet")}" rozeti`;
    case "friend_joined":
      return `${String(payload.friendName ?? "biri")} ile arkadaşlık`;
    case "quest_completed":
      return `${Number(payload.targetXp ?? 0)} XP'lik ortak görev`;
    case "weekly_top":
      return `haftanın ${Number(payload.rank ?? 0)}. sırası`;
    case "friend_streak":
      return `${Number(payload.days ?? 0)} günlük arkadaş serisi`;
    default:
      return "bir kilometre taşı";
  }
}

export async function reactionSummaries(eventIds: number[], me: string): Promise<Map<number, ReactionSummary>> {
  const map = new Map<number, ReactionSummary>();
  if (!eventIds.length) return map;
  const rows = await db
    .select()
    .from(eventReactions)
    .where(inArray(eventReactions.eventId, eventIds))
    .orderBy(desc(eventReactions.createdAt));
  const sampleIds = new Map<number, string[]>();
  for (const r of rows) {
    const s = map.get(r.eventId) ?? { counts: {}, total: 0, mine: null, names: [] };
    const kind = r.kind as ReactionKind;
    s.counts[kind] = (s.counts[kind] ?? 0) + 1;
    s.total += 1;
    if (r.fromUserId === me) s.mine = kind;
    const ids = sampleIds.get(r.eventId) ?? [];
    if (ids.length < 3 && r.fromUserId !== me) ids.push(r.fromUserId);
    sampleIds.set(r.eventId, ids);
    map.set(r.eventId, s);
  }
  const allIds = [...new Set([...sampleIds.values()].flat())];
  const users = await publicUsers(allIds);
  for (const [eventId, ids] of sampleIds) {
    const s = map.get(eventId);
    if (s) s.names = ids.map((id) => users.get(id)?.name ?? "Biri");
  }
  return map;
}

export function isReactionKind(v: unknown): v is ReactionKind {
  return typeof v === "string" && (REACTION_KINDS as readonly string[]).includes(v);
}

/**
 * Tepki ver / değiştir. Yalnız ARKADAŞIN olayına: akış zaten arkadaşlarla
 * sınırlı, herkese açık profilden gelen yabancı tepkisi sohbetin arka kapısı
 * olurdu. Kendi olayına tepki yok. Olay sahibine bildirim yalnız İLK tepkide
 * gider; tür değiştirmek yeni bildirim üretmez.
 */
export async function react(me: string, eventId: number, kind: ReactionKind): Promise<ReactionSummary> {
  const [ev] = await db.select().from(activityEvents).where(eq(activityEvents.id, eventId)).limit(1);
  if (!ev) throw new SocialError("not_found", 404);
  if (ev.userId === me) throw new SocialError("self", 400);
  if (await blockedEitherWay(me, ev.userId)) throw new SocialError("not_found", 404);
  const friends = await friendIds(me);
  if (!friends.includes(ev.userId)) throw new SocialError("not_friends", 403);
  const rl = await limited("reaction", me);
  if (!rl.ok) throw new SocialError("rate_limited", 429, rl.retryAfterSec);

  const [existing] = await db
    .select({ kind: eventReactions.kind })
    .from(eventReactions)
    .where(and(eq(eventReactions.eventId, eventId), eq(eventReactions.fromUserId, me)))
    .limit(1);
  await db
    .insert(eventReactions)
    .values({ eventId, fromUserId: me, kind })
    .onConflictDoUpdate({ target: [eventReactions.eventId, eventReactions.fromUserId], set: { kind, createdAt: new Date() } });

  if (!existing) {
    const meP = (await publicUsers([me])).get(me);
    await notify(
      ev.userId,
      { type: "reaction", actorId: me, refType: "event", refId: eventId },
      {
        title: `${meP?.name ?? "Biri"} tepki gönderdi`,
        body: `${describeEvent(ev.type, ev.payload as Record<string, unknown>)} için ${REACTION_LABELS[kind].toLocaleLowerCase("tr-TR")}`,
        url: "/friends?tab=feed",
        tag: `reaction-${eventId}`,
      },
    );
  }
  await track(me, "reaction_send", serverToday(), 0, kind);
  return (await reactionSummaries([eventId], me)).get(eventId) ?? { counts: {}, total: 0, mine: null, names: [] };
}

export async function unreact(me: string, eventId: number): Promise<ReactionSummary> {
  await db.delete(eventReactions).where(and(eq(eventReactions.eventId, eventId), eq(eventReactions.fromUserId, me)));
  return (await reactionSummaries([eventId], me)).get(eventId) ?? { counts: {}, total: 0, mine: null, names: [] };
}
