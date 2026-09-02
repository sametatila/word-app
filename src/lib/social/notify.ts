import { and, desc, eq, inArray, lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { activityEvents, eventReactions, friendQuests, nudges, socialNotifications } from "@/lib/db/schema";
import { sendToUser, type PushPayload } from "@/lib/push";
import { track } from "@/lib/events";
import { serverToday } from "./dates";
import { publicUsers } from "./stats";
import type { NotificationType, PublicUser } from "./types";

/**
 * Bildirim merkezi + web push aynası.
 *
 * Her sosyal olay önce gelen kutusuna yazılır; push yalnız DOĞRUDAN
 * etkileşimlerde gider (istek, kabul, tepki, dürtme, görev). Arkadaşın
 * kilometre taşı ("Ali 30 günlük seriye ulaştı") push GÖNDERMEZ — o, akışta
 * ve gelen kutusunda durur. Yoksa on arkadaşı olan kişiye günde on bildirim
 * düşerdi ve hepsini kapatırdı; push'un değeri azlığındadır.
 *
 * Mobilde uzak push yok: gelen kutusu uygulama açılınca çekilir, bu yüzden
 * satır her koşulda yazılır, push ise "varsa" gider.
 */
export type NotifyInput = {
  type: NotificationType;
  actorId?: string | null;
  refType?: "friendship" | "event" | "nudge" | "quest" | null;
  refId?: number | null;
};

export async function notify(userId: string, n: NotifyInput, push?: PushPayload | null): Promise<number> {
  const [row] = await db
    .insert(socialNotifications)
    .values({ userId, type: n.type, actorId: n.actorId ?? null, refType: n.refType ?? null, refId: n.refId ?? null })
    .returning({ id: socialNotifications.id });
  if (push) {
    try {
      const sent = await sendToUser(userId, push);
      if (sent) await track(userId, "push_sent", serverToday(), 0, `social:${n.type}`);
    } catch (err) {
      console.error("[social:push]", err);
    }
  }
  return row?.id ?? 0;
}

export async function unreadCount(userId: string): Promise<number> {
  const rows = await db
    .select({ id: socialNotifications.id })
    .from(socialNotifications)
    .where(and(eq(socialNotifications.userId, userId), eq(socialNotifications.read, false)))
    .limit(100);
  return rows.length;
}

export async function markRead(userId: string, ids: number[] | "all"): Promise<void> {
  if (ids === "all") {
    await db.update(socialNotifications).set({ read: true }).where(and(eq(socialNotifications.userId, userId), eq(socialNotifications.read, false)));
    return;
  }
  if (!ids.length) return;
  await db
    .update(socialNotifications)
    .set({ read: true })
    .where(and(eq(socialNotifications.userId, userId), inArray(socialNotifications.id, ids)));
}

export type NotificationView = {
  id: number;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  actor: PublicUser | null;
  ref: { type: string; id: number } | null;
  /** Türe göre küçük bağlam: tepki türü, olay türü/yükü, görev hedefi, dürtme türü. */
  detail: Record<string, unknown>;
};

/** İmleç = id (serial artan, createdAt ile aynı sırada). */
export async function listNotifications(
  userId: string,
  cursor: number | null,
  limit = 30,
): Promise<{ items: NotificationView[]; nextCursor: number | null }> {
  const where = cursor
    ? and(eq(socialNotifications.userId, userId), lt(socialNotifications.id, cursor))
    : eq(socialNotifications.userId, userId);
  const rows = await db
    .select()
    .from(socialNotifications)
    .where(where)
    .orderBy(desc(socialNotifications.id))
    .limit(limit + 1);
  const page = rows.slice(0, limit);
  const nextCursor = rows.length > limit ? page[page.length - 1].id : null;

  const actorIds = [...new Set(page.map((r) => r.actorId).filter((x): x is string => Boolean(x)))];
  const actors = await publicUsers(actorIds);

  // Bağlam: hangi olaya tepki, hangi görev, hangi dürtme. Tek tek değil, tür başına toplu.
  const eventIds = [...new Set(page.filter((r) => r.refType === "event" && r.refId).map((r) => r.refId as number))];
  const questIds = [...new Set(page.filter((r) => r.refType === "quest" && r.refId).map((r) => r.refId as number))];
  const nudgeIds = [...new Set(page.filter((r) => r.refType === "nudge" && r.refId).map((r) => r.refId as number))];
  const [events, quests, nudgeRows, reactions] = await Promise.all([
    eventIds.length ? db.select().from(activityEvents).where(inArray(activityEvents.id, eventIds)) : Promise.resolve([]),
    questIds.length ? db.select().from(friendQuests).where(inArray(friendQuests.id, questIds)) : Promise.resolve([]),
    nudgeIds.length ? db.select().from(nudges).where(inArray(nudges.id, nudgeIds)) : Promise.resolve([]),
    eventIds.length ? db.select().from(eventReactions).where(inArray(eventReactions.eventId, eventIds)) : Promise.resolve([]),
  ]);
  const eventMap = new Map(events.map((e) => [e.id, e]));
  const questMap = new Map(quests.map((q) => [q.id, q]));
  const nudgeMap = new Map(nudgeRows.map((n) => [n.id, n]));
  const reactionMap = new Map(reactions.map((r) => [`${r.eventId}:${r.fromUserId}`, r.kind]));

  const items: NotificationView[] = page.map((r) => {
    const detail: Record<string, unknown> = {};
    if (r.refType === "event" && r.refId) {
      const e = eventMap.get(r.refId);
      if (e) { detail.eventType = e.type; detail.payload = e.payload; }
      if (r.actorId) detail.reaction = reactionMap.get(`${r.refId}:${r.actorId}`) ?? null;
    } else if (r.refType === "quest" && r.refId) {
      const q = questMap.get(r.refId);
      if (q) { detail.targetXp = q.targetXp; detail.status = q.status; detail.weekStart = String(q.weekStart); }
    } else if (r.refType === "nudge" && r.refId) {
      const n = nudgeMap.get(r.refId);
      if (n) detail.kind = n.kind;
    }
    return {
      id: r.id,
      type: r.type as NotificationType,
      read: r.read,
      createdAt: new Date(r.createdAt).toISOString(),
      actor: r.actorId ? (actors.get(r.actorId) ?? null) : null,
      ref: r.refType && r.refId ? { type: r.refType, id: r.refId } : null,
      detail,
    };
  });
  return { items, nextCursor };
}
