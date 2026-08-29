import type { Metadata } from "next";
import { getUserId } from "@/lib/auth/server";
import { isPremium, PREMIUM_PLANS, PREMIUM_FEATURES } from "@/lib/premium";
import { PremiumPaywall } from "@/components/premium-paywall";

export const metadata: Metadata = { title: "Premium" };
export const dynamic = "force-dynamic";

/** Paywall'a nereden gelindiği — huni ölçümünde `paywall_view` kind'ı. */
const SOURCES = new Set(["exam", "walk", "limit", "profile", "nav"]);

/**
 * Premium sayfası (dönüşüm planı §4). Paywall'ı sunar; `?from=` ile huni
 * kaynağını taşır. Kullanıcı zaten premium'sa kutlama durumu gösterilir.
 */
export default async function PremiumPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const source = from && SOURCES.has(from) ? from : "other";
  const userId = await getUserId();
  const premium = await isPremium(userId);

  const benefits = [
    ...Object.values(PREMIUM_FEATURES),
    "Reklamsız, dikkat dağıtmayan deneyim",
    "Yeni içeriklere erken erişim",
  ];

  return (
    <PremiumPaywall
      plans={PREMIUM_PLANS.map((p) => ({ ...p }))}
      benefits={benefits}
      source={source}
      alreadyPremium={premium}
    />
  );
}
