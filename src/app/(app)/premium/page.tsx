import { DAILY_QUOTAS } from "@/lib/quotas";
import { cookies, headers } from "next/headers";
import QRCode from "qrcode";
import { appControl } from "@/lib/app-control";
import { GET_PREMIUM_PATH, platformOf } from "@/lib/store-link";
import { priceFor, resolveRegion } from "@/lib/premium/region";
import { TZ_COOKIE } from "@/lib/tz-cookie";
import { titleMeta } from "@/lib/page-meta";
import { getUserInfo } from "@/lib/auth/server";
import { premiumConfig, premiumCopy, premiumStatus } from "@/lib/premium";
import { referralStats } from "@/lib/premium/referral";
import { PremiumPaywall } from "@/components/premium-paywall";

export const generateMetadata = titleMeta("premium.title");
export const dynamic = "force-dynamic";

/** Paywall'a nereden gelindiği — huni ölçümünde `paywall_view` kind'ı. */
const SOURCES = new Set(["exam", "walk", "limit", "profile", "nav", "mock", "skill", "lesson"]);

/** `/r/<kod>`un döndürebileceği sonuçlar — adresten gelen başka değer yok sayılır. */
const REF_RESULTS = new Set(["ok", "linked", "already", "self", "unknown", "error"]);

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
export default async function PremiumPage({ searchParams }: { searchParams: Promise<{ from?: string; code?: string; ref?: string; store?: string }> }) {
  const { from, code, ref, store } = await searchParams;
  const source = from && SOURCES.has(from) ? from : "other";
  const who = await getUserInfo();
  const userId = who?.id ?? null;

  const [cfg, copy, status, referral, jar, control, hdr] = await Promise.all([
    premiumConfig(),
    premiumCopy(),
    premiumStatus(userId),
    userId ? referralStats(userId).catch(() => null) : Promise.resolve(null),
    cookies(),
    appControl(),
    headers(),
  ]);

  /*
    SATIN ALMA YÖNLENDİRMESİ (lib/store-link). Cihaz sunucuda UA'dan: telefonda
    tek düğme, masaüstünde QR. QR sunucuda üretiliyor, istemciye kütüphane
    gitmiyor. Adres mutlak ve SABİT alan adıyla: QR başka bir cihazda okunuyor.
  */
  const platform = platformOf(hdr.get("user-agent"));
  const qrSvg =
    platform === "desktop" && (control.store.ios.live || control.store.android.live)
      ? await QRCode.toString(`https://www.lernomi.app${GET_PREMIUM_PATH}?src=qr`, { type: "svg", margin: 1, errorCorrectionLevel: "M" }).catch(() => null)
      : null;

  /*
    TEK FİYAT, TEK BÖLGE. Sayfa üç bölgenin fiyatını yan yana listeliyordu:
    kullanıcı kendi para biriminin hangisi olduğunu tahmin etmek zorunda
    kalıyor, ötekiler de yalnız kıyas malzemesi oluyordu. Bölge konum izni
    İSTEMEDEN bulunuyor (gerekçe: lib/premium/region.ts) ve ekrana yalnız
    bulunan bölgenin fiyatı çıkıyor.
  */
  const region = resolveRegion(jar.get(TZ_COOKIE)?.value ?? null);
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
      fairUse={{ ...cfg.fairUse, chatTurnsPerDay: DAILY_QUOTAS.roleplayTurns }}
      referral={referral}
      /** Davet bağlantısındaki kod alanı doluysa form açık gelir. */
      prefillCode={typeof code === "string" ? code : ""}
      /** `/r/<kod>` bağı kurup buraya yönlendirdi — sonucu tek satırla söyle. */
      refResult={REF_RESULTS.has(ref ?? "") ? (ref as string) : ""}
      storeCta={{
        platform,
        stores: control.store,
        qrSvg,
        account: who && !who.guest ? who.email : null,
        soonNotice: store === "soon",
      }}
    />
  );
}
