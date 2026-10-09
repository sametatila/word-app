import { getUserInfo } from "@/lib/auth/server";
import { getT } from "@/lib/i18n/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { socialMe } from "@/lib/social/profile";
import { isPremium } from "@/lib/premium";
import { referralStats } from "@/lib/premium/referral";
import { ProfileView } from "@/components/profile/profile-view";
import { titleMeta } from "@/lib/page-meta";
import { RetryButton } from "@/components/retry-button";
import { FlowColumn, StateBody } from "@/components/flow";
import { shownStreak } from "@/lib/streak-live";

export const dynamic = "force-dynamic";

/**
 * Profil — "ben" ekranının kapısı.
 *
 * Eskiden burası bir panoydu: kimlik, seviye, iki haftalık ritim, yetkinlik
 * paneli, rozet duvarı ve beş satırlık menü tek sayfada üst üsteydi. Bloklar
 * artık kendi adreslerinde (`/profile/progress`, `/profile/achievements`) ve
 * bu sayfa yalnız kim olduğunu, ne biriktirdiğini ve nereye gidebileceğini
 * söylüyor — mobil `ProfileScreen` ile aynı kurgu.
 */
export const generateMetadata = titleMeta("profile.profile");

export default async function ProfilePage() {
  const t = await getT();
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    const today = new Date().toISOString().slice(0, 10);
    /* Gelişim kutusunun sayısı ve kullanıcı adı — ikisi de düşerse profil yine
       çiziliyor (sayı 0, alt satırda yalnız kurs). */
    const [progress, social, referral] = await Promise.all([
      getProgress(user.id, today).catch(() => null),
      socialMe(user.id).catch(() => null),
      /* Davet hesap istiyor (lib/auth/guest): misafire kod üretilmiyor. */
      user.guest ? Promise.resolve(null) : referralStats(user.id).catch(() => null),
    ]);

    return (
      <ProfileView
        stats={{
          /*
            AD YEDEGI ANDROID'IN ZINCIRI. Iki fark vardi:
            - Anahtar `social.student` idi; o anahtar LISTE satirlarinin
              yedegi (lider tablosu, gunun turu - iki platformda da oyle).
              Profil kartinin kendi yedegi `profile.student` ve Android orada
              onu kullaniyor. Ayni yuzey, iki ayri anahtar: biri duzeltilirse
              oteki eski kaliyor.
            - Android adi bulamazsa E-POSTANIN yerel parcasini kullaniyor
              ("samet@..." → "samet") ve ancak o da yoksa sozluge dusuyor;
              web dogrudan "Ogrenci" yaziyordu.
          */
          name: profile.displayName || user.name || user.email?.split("@")[0] || t("profile.student"),
          streak: shownStreak(profile),
          xp: profile.totalXp,
          premium: await isPremium(user.id),
          username: social?.username ?? null,
          mastered: progress ? progress.levels.reduce((n, l) => n + l.mastered, 0) : 0,
          referral,
        }}
      />
    );
  } catch (err) {
    console.error("[profile page]", err);
    return (
      <FlowColumn>
        <StateBody alert title={t("profw.load_failed")} body={t("socialw.try_in_a_moment")}>
          <RetryButton className="btn btn-primary flex w-full items-center justify-center gap-2 px-5 py-4 disabled:opacity-60" />
        </StateBody>
      </FlowColumn>
    );
  }
}
