import { getUserInfo, authEnabled } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";
import { ProgressView } from "@/components/progress-view";

export const dynamic = "force-dynamic";

function localDayFallback() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Profil sayfası: kimlik + ilerleme + ayarlar tek yerde.
 * Eski /progress sayfasının tüm içeriği başlığın hemen altında yaşar;
 * ayarlar ve hesap bölümleri onun altındadır.
 */
export default async function ProfilePage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    const today = localDayFallback();
    const data = await getProgress(user.id, today);

    return (
      <ProfileForm
        authEnabled={authEnabled}
        accountName={user.name}
        initial={{
          displayName: profile.displayName ?? "",
          dailyGoal: profile.dailyGoal,
          newPerDay: profile.newPerDay,
          level: profile.level,
          course: profile.course,
          currentStreak: profile.currentStreak,
          longestStreak: profile.longestStreak,
          totalXp: profile.totalXp,
        }}
      >
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
          seconds={data.seconds}
          leeches={data.leeches}
          streak={data.profile.currentStreak}
          longest={data.profile.longestStreak}
          today={today}
        />
      </ProfileForm>
    );
  } catch (err) {
    console.error("[profile page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Profil yüklenemedi</h2>
        <p className="muted mt-2 text-sm">
          Veritabanı bağlantısını kontrol et: <code>npm run db:push</code>.
        </p>
      </div>
    );
  }
}
