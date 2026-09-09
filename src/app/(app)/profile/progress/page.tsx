import { PageBack } from "@/components/page-back";
import { titleMeta } from "@/lib/page-meta";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { ActivityProgress } from "@/components/progress-view";
import { ProgressPanel } from "@/components/progress-panel";
import { getT } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("progw.my_progress");
/**
 * İlerleme — iki haftalık ritim + yetkinlik paneli.
 *
 * Mobilde kendi ekranı (`ProgressScreen`) ve seri rozetinden de açılıyor;
 * web'de profilin ortasına gömülüydü. İkisi aynı soruyu cevaplıyor —
 * "neredeyim" — ve o soru profilin "kim" ve "nereye" sorularının arasına
 * sıkıştırılacak kadar küçük değil.
 */
export default async function ProgressPage() {
  const t = await getT();
  const user = await getUserInfo();
  if (!user) return null;

  const today = new Date().toISOString().slice(0, 10);
  let content = null;
  try {
    const profile = await ensureProfile(user.id, user.name);
    const data = await getProgress(user.id, today);
    const mastered = data.levels.reduce((s, l) => s + l.mastered, 0);
    const totalWords = data.levels.reduce((s, l) => s + l.total, 0);
    content = (
      <ActivityProgress
        days={data.days.map((d) => ({
          day: String(d.day),
          reviews: d.reviews,
          correct: d.correct,
          xp: d.xp,
        }))}
        streak={profile.currentStreak}
        longestStreak={profile.longestStreak}
        seconds={data.seconds}
        mastered={mastered}
        totalWords={totalWords}
        xp={profile.totalXp}
        level={profile.level}
        today={today}
      />
    );
  } catch (err) {
    console.error("[progress] okunamadı", err);
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <PageBack fallback="/profile" title={t("progw.my_progress")} />
      {content}
      {/* Ölçüm bloğu: yetkinlik, dört haftalık değişim ve önerilen adım. */}
      <ProgressPanel />
    </div>
  );
}
