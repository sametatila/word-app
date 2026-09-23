import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { findPremiumAccount, premiumConfig } from "@/lib/premium";
import { listCodes } from "@/lib/premium/promo";
import { listStoreTrialCodes } from "@/lib/premium/store-trial";
import { topReferrers } from "@/lib/premium/referral";
import { PremiumAdmin, type TrialCodeRow } from "./premium-admin";

export const metadata: Metadata = { title: "Premium yönetimi" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/premium — premium'un tamamının yönetildiği yer.
 *
 * Üç bölüm: SINIRLAR (ücretsiz kotalar, adil kullanım tavanı, deneme sınavı
 * paket kuralı, referans ödülü, plan/fiyat bilgisi), KODLAR (üretim ve
 * kapatma), DAVET (kim kaç kişi getirdi).
 *
 * Sınırların panelde durmasının sebebi: bunlar ürün kararı ve deneyerek
 * ayarlanıyor. Kodda sabit olsalardı her deneme bir commit + bir mağaza sürümü
 * demek olurdu, yani pratikte hiç denenmezlerdi.
 */
export default async function AdminPremiumPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Premium yönetimi" email={gate.email} />;

  /* ESKİ BAĞLANTILAR (`/admin/premium?q=<e-posta>`, betik ve destek notları):
     hesap yetkisi kullanıcı sayfasına taşındı, bağlantı oraya götürüyor. */
  const q = (await searchParams).q?.trim();
  if (q) {
    const acc = await findPremiumAccount(q).catch(() => null);
    redirect(acc ? `/admin/users/${encodeURIComponent(acc.userId)}` : `/admin/users?q=${encodeURIComponent(q)}`);
  }

  const [config, codes, referrers, trialCodes] = await Promise.all([
    premiumConfig(),
    listCodes().catch(() => []),
    topReferrers().catch(() => []),
    listStoreTrialCodes().catch(() => []),
  ]);

  return (
    <PremiumAdmin
      config={config}
      codes={codes.map((c) => ({
        ...c,
        expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
        disabledAt: c.disabledAt ? c.disabledAt.toISOString() : null,
        createdAt: c.createdAt.toISOString(),
      }))}
      referrers={referrers}
      trialCodes={trialCodes.map(serializeTrialCode)}
      iosReady={{ monthly: Boolean(process.env.IOS_PROMO2M_CODE_MONTHLY?.trim()), yearly: Boolean(process.env.IOS_PROMO2M_CODE_YEARLY?.trim()) }}
    />
  );
}

/** Tarihler istemci bileşenine dizge olarak geçiyor (sunucu → istemci sınırı). */
function serializeTrialCode(c: Awaited<ReturnType<typeof listStoreTrialCodes>>[number]): TrialCodeRow {
  return {
    ...c,
    expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
    disabledAt: c.disabledAt ? c.disabledAt.toISOString() : null,
    createdAt: c.createdAt.toISOString(),
  };
}
