import "server-only";
import { eq, like, or } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  achievements,
  activityEvents,
  aiUsage,
  assessments,
  contentReports,
  dailyScores,
  dailyStats,
  eventReactions,
  events,
  exams,
  friendQuests,
  friendships,
  moduleClears,
  nudges,
  placements,
  profiles,
  pushSubscriptions,
  questClaims,
  rateLimits,
  reviews,
  roleplayLogs,
  sessionState,
  socialNotifications,
  userBlocks,
  userLessons,
  userReports,
  userSkills,
  userWords,
} from "@/lib/db/schema";

/**
 * Hesap silme: kullanıcıya ait HER satırı kaldırır.
 *
 * Better Auth `user` satırını (ve FK ile session/account'u) kendisi siler; uygulama
 * tabloları `user`'a FK taşımadığı için burada tek tek temizlenir. Sıra önemsiz
 * (tablolar arası FK yok), ama hepsi tek transaction: yarım silinmiş hesap,
 * hiç silinmemiş hesaptan kötüdür.
 *
 * Silinmeyen tek şey yok: değerlendirme metinleri, konuşma kayıtları, ölçüm
 * olayları, sosyal iz (arkadaşlık, tepki, dürtme, bildirim) dâhil. Başkalarına
 * ait satırlarda bu kullanıcının kimliği geçiyorsa (arkadaşlık, dürtme, ortak
 * görev) o satırlar da gider — karşı taraf için "arkadaş ayrıldı" demektir.
 */
export async function purgeUserData(userId: string): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(profiles).where(eq(profiles.userId, userId));
    await tx.delete(pushSubscriptions).where(eq(pushSubscriptions.userId, userId));
    await tx.delete(userWords).where(eq(userWords.userId, userId));
    await tx.delete(reviews).where(eq(reviews.userId, userId));
    await tx.delete(dailyStats).where(eq(dailyStats.userId, userId));
    await tx.delete(userSkills).where(eq(userSkills.userId, userId));
    await tx.delete(sessionState).where(eq(sessionState.userId, userId));
    await tx.delete(dailyScores).where(eq(dailyScores.userId, userId));
    await tx.delete(questClaims).where(eq(questClaims.userId, userId));
    await tx.delete(achievements).where(eq(achievements.userId, userId));
    await tx.delete(events).where(eq(events.userId, userId));
    await tx.delete(moduleClears).where(eq(moduleClears.userId, userId));
    await tx.delete(aiUsage).where(eq(aiUsage.userId, userId));
    await tx.delete(userLessons).where(eq(userLessons.userId, userId));
    await tx.delete(roleplayLogs).where(eq(roleplayLogs.userId, userId));
    await tx.delete(assessments).where(eq(assessments.userId, userId));
    await tx.delete(placements).where(eq(placements.userId, userId));
    await tx.delete(exams).where(eq(exams.userId, userId));
    await tx.delete(contentReports).where(eq(contentReports.userId, userId));
    // Sosyal katman
    await tx.delete(friendships).where(or(eq(friendships.requesterId, userId), eq(friendships.addresseeId, userId)));
    await tx.delete(userBlocks).where(or(eq(userBlocks.blockerId, userId), eq(userBlocks.blockedId, userId)));
    await tx.delete(userReports).where(or(eq(userReports.reporterId, userId), eq(userReports.reportedId, userId)));
    await tx.delete(eventReactions).where(eq(eventReactions.fromUserId, userId));
    await tx.delete(activityEvents).where(eq(activityEvents.userId, userId));
    await tx.delete(nudges).where(or(eq(nudges.fromUserId, userId), eq(nudges.toUserId, userId)));
    await tx.delete(friendQuests).where(or(eq(friendQuests.userAId, userId), eq(friendQuests.userBId, userId)));
    await tx.delete(socialNotifications).where(or(eq(socialNotifications.userId, userId), eq(socialNotifications.actorId, userId)));
    // Anahtar "<kapsam>:<userId>" biçiminde (bkz. schema.ts rateLimits).
    await tx.delete(rateLimits).where(like(rateLimits.key, `%:${userId}`));
  });
}
