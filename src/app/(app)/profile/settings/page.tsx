import { getUserInfo, authEnabled } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";
import { SocialSettings } from "@/components/social/social-settings";
import { socialMe } from "@/lib/social/profile";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ayarlar" };

/** Ayarlar: öğrenme, uygulama ve hesap. Profilden tek dokunuşla açılıyor. */
export default async function SettingsPage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    // Sosyal ayarlar aynı sayfada, formun altında (#social). Ayrı sayfa, iki
    // "ayarlar" demekti; kullanıcı hangisinde ne var bilemezdi.
    const me = await socialMe(user.id).catch((err) => {
      console.error("[settings page] sosyal", err);
      return null;
    });
    return (
      <>
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
      {me ? (
        <div className="mx-auto w-full max-w-md">
          <SocialSettings initial={me} />
        </div>
      ) : null}
      </>
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
