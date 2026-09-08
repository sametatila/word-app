import { getUserInfo, authEnabled, googleConfigured } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";
import { SocialSettings } from "@/components/social/social-settings";
import { LinkedAccounts } from "@/components/account/linked-accounts";
import { socialMe } from "@/lib/social/profile";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ayarlar" };

/** Ayarlar: öğrenme, uygulama ve hesap. Profilden tek dokunuşla açılıyor. */
export default async function SettingsPage() {
  const user = await getUserInfo();
  if (!user) return null;

  /*
    VERİ try/catch İÇİNDE, JSX DIŞINDA.

    Eskiden dönüş de try'ın içindeydi ve React bunu yakalayamıyor: bileşenler
    JSX kurulurken değil, sonra çiziliyor; çizim sırasında oluşan hata bu
    catch'e hiç uğramıyor (react-hooks/error-boundaries). Yani koruma
    görünürdeydi. Şimdi try yalnız veriyi okuyor, hata olursa `veri` null
    kalıyor ve JSX tek yerde kuruluyor.
  */
  const veri = await (async () => {
    try {
      const profile = await ensureProfile(user.id, user.name);
      // Sosyal ayarlar aynı sayfada, formun altında (#social). Ayrı sayfa, iki
      // "ayarlar" demekti; kullanıcı hangisinde ne var bilemezdi.
      const me = await socialMe(user.id).catch((err) => {
        console.error("[settings page] sosyal", err);
        return null;
      });
      return { profile, me };
    } catch (err) {
      console.error("[settings page]", err);
      return null;
    }
  })();

  if (!veri) {
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Ayarlar yüklenemedi</h2>
        <p className="muted mt-2 text-sm">Birkaç saniye sonra tekrar dene.</p>
      </div>
    );
  }

  const { profile, me } = veri;
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
      {/* Giriş yöntemleri: parola + sosyal hesaplar tek yerde. Apple web akışı
          açık olmadığı için burada yalnız Google teklif ediliyor; iOS'ta Apple
          native yoldan bağlanıyor. */}
      <LinkedAccounts googleEnabled={googleConfigured} />
      {me ? (
        <div className="mx-auto w-full max-w-md">
          <SocialSettings initial={me} />
        </div>
      ) : null}
    </>
  );
}
