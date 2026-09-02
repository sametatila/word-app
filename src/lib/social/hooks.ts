import { emitActivity, streakMilestoneCrossed } from "./activity";
import { checkQuestProgress } from "./quests";

/**
 * Öğrenme yollarından sosyal katmana giden kancalar.
 *
 * Hiçbir zaman hata fırlatmaz: sosyal katmandaki bir hata kullanıcının
 * turunu bozamaz (events.ts'teki `track` ile aynı ilke). XP yazan iki geçit
 * (award.ts ve session.ts/submitAnswers) ve rozet açan yer buradan geçer.
 */
export async function onActivityAwarded(userId: string, today: string, prevStreak: number, nextStreak: number): Promise<void> {
  try {
    const m = streakMilestoneCrossed(prevStreak, nextStreak);
    if (m) await emitActivity(userId, "streak_milestone", { days: m });
    await checkQuestProgress(userId, today);
  } catch (err) {
    console.error("[social:hook:award]", err);
  }
}

export async function onAchievementsUnlocked(
  userId: string,
  unlocked: { id: string; title: string; tier: string }[],
): Promise<void> {
  try {
    for (const a of unlocked) await emitActivity(userId, "achievement", { id: a.id, title: a.title, tier: a.tier });
  } catch (err) {
    console.error("[social:hook:achievement]", err);
  }
}
