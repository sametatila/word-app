import { getUserInfo, googleConfigured } from "@/lib/auth/server";
import { titleMeta } from "@/lib/page-meta";
import { getT } from "@/lib/i18n/server";
import { ensureProfile } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";
import { LinkedAccounts } from "@/components/account/linked-accounts";
import { APP_VERSION } from "@/lib/version";
import { socialMe } from "@/lib/social/profile";
import { RetryButton } from "@/components/retry-button";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("settings.settings");
/** Ayarlar: öğrenme, uygulama ve hesap. Profilden tek dokunuşla açılıyor. */
export default async function SettingsPage() {
  const t = await getT();
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
        <h2 className="text-lg font-bold">{t("settingsw.load_failed")}</h2>
        <p className="muted mt-2 text-sm">{t("socialw.try_in_a_moment")}</p>
        <RetryButton />
      </div>
    );
  }

  const { profile } = veri;
  return (
    <>
      <ProfileForm
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
        /* Giriş yöntemleri: parola + sosyal hesaplar tek yerde. Apple web
           akışı açık olmadığı için burada yalnız Google teklif ediliyor;
           iOS'ta Apple native yoldan bağlanıyor. Formun İÇİNE veriliyor
           çünkü yeri HESAP'ın hemen altı — mobildeki sıra. */
        linkedAccounts={<LinkedAccounts googleEnabled={googleConfigured} />}
      />
      {/* SOSYAL VE GİZLİLİK BURADA DEĞİL. Kullanıcı adı, görünürlük ve engel
          listesi Arkadaşlar'a ait; mobilin ayarlar ekranında da böyle bir
          bölüm yok. Kendi adresine taşındı: /friends/settings. */}
      {/* Sürüm en altta — mobilde de ayarların dibinde. Destek isteyen
          kullanıcının söyleyebileceği tek şey bu, aramak zorunda kalmasın. */}
      <p className="muted mx-auto w-full max-w-3xl pb-2 pt-1 text-center text-caption">
        Lernomi {APP_VERSION}
      </p>
    </>
  );
}
