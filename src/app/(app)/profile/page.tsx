import { getUserInfo } from "@/lib/auth/server";
import { getT } from "@/lib/i18n/server";
import { ensureProfile } from "@/lib/session";
import { isPremium } from "@/lib/premium";
import { ProfileView } from "@/components/profile/profile-view";
import { titleMeta } from "@/lib/page-meta";
import { RetryButton } from "@/components/retry-button";
import { FlowColumn, StateBody } from "@/components/flow";

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
          email: user.email ?? null,
          streak: profile.currentStreak,
          xp: profile.totalXp,
          premium: await isPremium(user.id),
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
