import { getUserInfo, googleConfigured } from "@/lib/auth/server";
import { getLang, getT } from "@/lib/i18n/server";
import { LANG_LABEL, isNativeLang } from "@/lib/i18n/dict";
import { ensureProfile } from "@/lib/session";
import { isPremium } from "@/lib/premium";
import { courseName } from "@/lib/courses";
import { APP_VERSION } from "@/lib/version";
import { socialMe } from "@/lib/social/profile";
import type { SettingsValues } from "@/components/settings-nav";
import { shownStreak } from "@/lib/streak-live";

/**
 * Ayar sayfalarının ortak verisi — liste değerleri, form başlangıcı, sosyal
 * kısım. Okuma try/catch içinde ve JSX dışında (bkz. eski `settings/page.tsx`
 * yorumu: React çizim hatasını buradaki catch'e düşürmez).
 */
export async function loadSettings(withSocial: boolean) {
  const user = await getUserInfo();
  if (!user) return { user: null } as const;
  try {
    const lang = await getLang();
    const [profile, premium, social] = await Promise.all([
      ensureProfile(user.id, user.name),
      isPremium(user.id).catch(() => false),
      withSocial ? socialMe(user.id).catch((err) => { console.error("[settings] sosyal", err); return null; }) : Promise.resolve(null),
    ]);
    const t = await getT();
    const values: SettingsValues = {
      learning: `${courseName(profile.course, lang)} · ${profile.level}`,
      app: LANG_LABEL[isNativeLang(lang) ? lang : "tr"],
      account: user.email ?? null,
      subscription: t(premium ? "settings.plan_premium" : "settings.plan_free"),
      version: APP_VERSION,
    };
    return {
      user,
      data: {
        values,
        social,
        googleEnabled: googleConfigured,
        initial: {
          displayName: profile.displayName ?? "",
          dailyGoal: profile.dailyGoal,
          newPerDay: profile.newPerDay,
          level: profile.level,
          course: profile.course,
          voice: profile.voice ?? null,
          currentStreak: shownStreak(profile),
          longestStreak: profile.longestStreak,
          totalXp: profile.totalXp,
        },
      },
    } as const;
  } catch (err) {
    console.error("[settings page]", err);
    return { user, data: null } as const;
  }
}
