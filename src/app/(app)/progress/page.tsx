import { getUserId } from "@/lib/auth";
import { getProgress } from "@/lib/session";
import { ProgressView } from "@/components/progress-view";

export const dynamic = "force-dynamic";

function localDayFallback() {
  return new Date().toISOString().slice(0, 10);
}

export default async function ProgressPage() {
  const userId = await getUserId();
  if (!userId) return null;

  try {
    const data = await getProgress(userId, localDayFallback());
    return (
      <ProgressView
        levels={data.levels}
        days={data.days.map((d) => ({
          day: String(d.day),
          reviews: d.reviews,
          correct: d.correct,
          xp: d.xp,
        }))}
        dueNow={data.dueNow}
        upcoming={data.upcoming}
        games={data.games}
        streak={data.profile.currentStreak}
        longest={data.profile.longestStreak}
        totalXp={data.profile.totalXp}
        today={localDayFallback()}
      />
    );
  } catch (err) {
    console.error("[progress]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">İlerleme yüklenemedi</h2>
        <p className="muted mt-2 text-sm">
          Veritabanı bağlantısını kontrol et: <code>npm run db:push</code> ve{" "}
          <code>npm run db:seed</code>.
        </p>
      </div>
    );
  }
}
