import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { premiumConfig } from "@/lib/premium";
import { listCodes } from "@/lib/premium/promo";
import { topReferrers } from "@/lib/premium/referral";
import { PremiumAdmin } from "./premium-admin";

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
export default async function AdminPremiumPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Premium yönetimi" email={gate.email} />;

  const [config, codes, referrers] = await Promise.all([
    premiumConfig(),
    listCodes().catch(() => []),
    topReferrers().catch(() => []),
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
    />
  );
}
