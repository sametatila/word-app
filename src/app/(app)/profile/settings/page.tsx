import { getUserInfo, authEnabled } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ayarlar" };

/** Ayarlar: öğrenme, uygulama ve hesap. Profilden tek dokunuşla açılıyor. */
export default async function SettingsPage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    return (
      <ProfileForm
        authEnabled={authEnabled}
        accountName={user.name}
        userId={user.id}
        initial={{
          displayName: profile.displayName ?? "",
          dailyGoal: profile.dailyGoal,
          newPerDay: profile.newPerDay,
          level: profile.level,
          course: profile.course,
          voice: profile.voice ?? null,
          currentStreak: profile.currentStreak,
          longestStreak: profile.longestStreak,
          totalXp: profile.totalXp,
        }}
      />
    );
  } catch (err) {
    console.error("[settings page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Ayarlar yüklenemedi</h2>
        <p className="muted mt-2 text-sm">Birkaç saniye sonra tekrar dene.</p>
      </div>
    );
  }
}
