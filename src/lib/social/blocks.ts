import { and, eq, inArray, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { friendQuests, friendships, profiles, socialNotifications, userBlocks, userReports } from "@/lib/db/schema";
import type { PublicUser, ReportReason } from "./types";

/** İki yönden biri engellemişse true — engellenen kişi bunu asla öğrenmez, sadece "bulunamadı" görür. */
export async function blockedEitherWay(a: string, b: string): Promise<boolean> {
  if (a === b) return false;
  const [row] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userBlocks)
    .where(
      or(
        and(eq(userBlocks.blockerId, a), eq(userBlocks.blockedId, b)),
        and(eq(userBlocks.blockerId, b), eq(userBlocks.blockedId, a)),
      ),
    );
  return Number(row?.n ?? 0) > 0;
}

/** Benim engellediklerim + beni engelleyenler — arama, öneri ve akış bunları dışarıda bırakır. */
export async function blockedSet(userId: string): Promise<Set<string>> {
  const rows = await db
    .select({ a: userBlocks.blockerId, b: userBlocks.blockedId })
    .from(userBlocks)
    .where(or(eq(userBlocks.blockerId, userId), eq(userBlocks.blockedId, userId)));
  const s = new Set<string>();
  for (const r of rows) s.add(r.a === userId ? r.b : r.a);
  return s;
}

/**
 * Engelle: arkadaşlık ve bekleyen istek iki yönde silinir, aradaki görev
 * iptal olur, engellenenden gelen okunmamış bildirimler kaldırılır. Engellenen
 * tarafa bildirim gitmez.
 */
export async function blockUser(blockerId: string, blockedId: string): Promise<void> {
  if (blockerId === blockedId) return;
  await db.insert(userBlocks).values({ blockerId, blockedId }).onConflictDoNothing();
  await db
    .delete(friendships)
    .where(
      or(
        and(eq(friendships.requesterId, blockerId), eq(friendships.addresseeId, blockedId)),
        and(eq(friendships.requesterId, blockedId), eq(friendships.addresseeId, blockerId)),
      ),
    );
  await db
    .update(friendQuests)
    .set({ status: "cancelled" })
    .where(
      and(
        inArray(friendQuests.status, ["invited", "active"]),
        or(
          and(eq(friendQuests.userAId, blockerId), eq(friendQuests.userBId, blockedId)),
          and(eq(friendQuests.userAId, blockedId), eq(friendQuests.userBId, blockerId)),
        ),
      ),
    );
  await db
    .delete(socialNotifications)
    .where(and(eq(socialNotifications.userId, blockerId), eq(socialNotifications.actorId, blockedId)));
}

export async function unblockUser(blockerId: string, blockedId: string): Promise<void> {
  await db.delete(userBlocks).where(and(eq(userBlocks.blockerId, blockerId), eq(userBlocks.blockedId, blockedId)));
}

export async function listBlocked(userId: string): Promise<(PublicUser & { since: string })[]> {
  const rows = await db
    .select({
      userId: userBlocks.blockedId,
      since: userBlocks.createdAt,
      name: profiles.displayName,
      username: profiles.username,
      level: profiles.level,
    })
    .from(userBlocks)
    .leftJoin(profiles, eq(profiles.userId, userBlocks.blockedId))
    .where(eq(userBlocks.blockerId, userId));
  return rows.map((r) => ({
    userId: r.userId,
    name: r.name ?? null,
    username: r.username ?? null,
    level: r.level ?? "A1",
    since: new Date(r.since).toISOString(),
  }));
}

export async function reportUser(reporterId: string, reportedId: string, reason: ReportReason, detail: string | null) {
  if (reporterId === reportedId) return;
  await db.insert(userReports).values({ reporterId, reportedId, reason, detail });
}
