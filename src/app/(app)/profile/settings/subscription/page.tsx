import { titleMeta } from "@/lib/page-meta";
import { getT } from "@/lib/i18n/server";
import { getUserInfo } from "@/lib/auth/server";
import { premiumStatus } from "@/lib/premium";
import type { PremiumStatusView } from "@/lib/premium/state-copy";
import { SettingsPanelTitle } from "@/components/settings-section";
import { SubscriptionSummary } from "@/components/subscription-summary";
import { RetryButton } from "@/components/retry-button";
import { FlowColumn, StateBody } from "@/components/flow";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("settings.group_subscription");

/**
 * Ayarlar › Abonelik (2026-09-29 Samet: web ayarlar masaüstü düzeni).
 *
 * Menüdeki satır `/premium?from=settings`e, yani ayarların dışına çıkıyordu.
 * Panel planın özetini gösteriyor, ayrıntı ve yükseltme `/premium`da (gerekçe
 * `subscription-summary`). Okuma burada, JSX dışında: durum okunamazsa
 * "ücretsiz" DEMİYOR (ödeyen kullanıcıya yanlış söz), tekrar deneme sunuyor.
 */
export default async function SubscriptionSettingsPage() {
  const t = await getT();
  const who = await getUserInfo();
  if (!who) return null;
  let status: PremiumStatusView | null = null;
  let failed = false;
  try {
    const s = await premiumStatus(who.id);
    status = s && {
      premium: s.premium,
      until: s.until ? s.until.toISOString() : null,
      entSource: s.source,
      storeState: s.store?.state ?? null,
      storePlatform: s.store?.platform ?? null,
      bonusDaysPending: s.bonusDaysPending,
      bonusUntil: s.bonusUntil ? s.bonusUntil.toISOString() : null,
    };
  } catch (err) {
    console.error("[settings subscription]", err);
    failed = true;
  }
  if (failed) {
    return (
      <FlowColumn>
        <StateBody alert title={t("settingsw.load_failed")} body={t("socialw.try_in_a_moment")}>
          <RetryButton className="btn btn-primary flex w-full items-center justify-center gap-2 px-5 py-4 disabled:opacity-60" />
        </StateBody>
      </FlowColumn>
    );
  }
  return (
    <div className="w-full space-y-4">
      <SettingsPanelTitle title={t("settings.group_subscription")} />
      <SubscriptionSummary status={status} />
    </div>
  );
}
