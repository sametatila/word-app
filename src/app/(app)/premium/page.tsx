import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { priceFor, resolveRegion } from "@/lib/premium/region";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { premiumConfig, premiumCopy, premiumStatus } from "@/lib/premium";
import { referralStats } from "@/lib/premium/referral";
import { PremiumPaywall } from "@/components/premium-paywall";

export const generateMetadata = titleMeta("premium.title");
export const dynamic = "force-dynamic";

/** Paywall'a nereden gelindiği — huni ölçümünde `paywall_view` kind'ı. */
const SOURCES = new Set(["exam", "walk", "limit", "profile", "nav", "mock", "skill", "lesson"]);

/**
 * Premium sayfası.
 *
 * WEB'DE SATIN ALMA YOK — bilinçli. Mağaza aboneliği uygulama içinden alınıyor;
 * burası durumu, kapsamı, promo kodunu ve daveti yönetiyor. Web'e kendi ödeme
 * yolunu (Stripe) eklemek mimaride tek adaptörlük iş (`lib/premium/providers`),
 * ama bugün açık değil ve sayfa bunu SÖYLÜYOR — kilit gösterip satın alma yolu
 * sunmamak kullanıcıyı çıkmaza sokar.
 *
 * Yetki web'de de geçerli: mağazadan alınan abonelik, promo kodu ve referans
 * ödülü aynı deftere yazıldığı için üç platformda da aynı anda açılıyor.
 */
export default async function PremiumPage({ searchParams }: { searchParams: Promise<{ from?: string; code?: string }> }) {
  const { from, code } = await searchParams;
  const source = from && SOURCES.has(from) ? from : "other";
  const userId = await getUserId();

  const [cfg, copy, status, referral, tz, hdrs] = await Promise.all([
    premiumConfig(),
    premiumCopy(),
    premiumStatus(userId),
    userId ? referralStats(userId).catch(() => null) : Promise.resolve(null),
    userId
      ? db.select({ tz: profiles.timezone }).from(profiles).where(eq(profiles.userId, userId)).limit(1)
          .then((r) => r[0]?.tz ?? null)
          .catch(() => null)
      : Promise.resolve(null),
    headers(),
  ]);

  /*
    TEK FİYAT, TEK BÖLGE. Sayfa üç bölgenin fiyatını yan yana listeliyordu:
    kullanıcı kendi para biriminin hangisi olduğunu tahmin etmek zorunda
    kalıyor, ötekiler de yalnız kıyas malzemesi oluyordu. Bölge konum izni
    İSTEMEDEN bulunuyor (gerekçe: lib/premium/region.ts) ve ekrana yalnız
    bulunan bölgenin fiyatı çıkıyor.
  */
  const region = resolveRegion(tz, hdrs.get("accept-language"));
  const price = priceFor(cfg.plans.prices, region);

  return (
    <PremiumPaywall
      source={source}
      signedIn={!!userId}
      status={
        status && {
          premium: status.premium,
          until: status.until ? status.until.toISOString() : null,
          entSource: status.source,
          storeState: status.store?.state ?? null,
          storePlatform: status.store?.platform ?? null,
          bonusDaysPending: status.bonusDaysPending,
          bonusUntil: status.bonusUntil ? status.bonusUntil.toISOString() : null,
        }
      }
      copy={copy}
      plans={{
        productMonthly: cfg.plans.productMonthly,
        productYearly: cfg.plans.productYearly,
        trialDays: cfg.plans.trialDays,
      }}
      price={price}
      fairUse={cfg.fairUse}
      referral={referral}
      /** Davet bağlantısındaki kod alanı doluysa form açık gelir. */
      prefillCode={typeof code === "string" ? code : ""}
    />
  );
}
