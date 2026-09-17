import { NextResponse } from "next/server";
import { applyStoreEvent, applyStoreTransfer } from "@/lib/premium";
import { adapterFor, DEFAULT_ADAPTER } from "@/lib/premium/providers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Mağaza webhook'u — yetkinin tek yazma kapısı.
 *
 * SAĞLAYICIDAN BAĞIMSIZ. Yol `/api/premium/webhook/<sağlayıcı>`; sağlayıcı adı
 * verilmezse RevenueCat varsayılıyor, yani eski `/api/premium/webhook` adresi
 * çalışmaya devam ediyor (panelde kayıtlı URL'i değiştirmeye gerek yok).
 * İkinci bir sağlayıcı eklendiğinde bu dosya DEĞİŞMEZ: yalnız
 * `lib/premium/providers/index.ts`e bir satır girer.
 *
 * Bu uç doğrulamayı kendi yapmıyor; adaptöre bırakıyor (her sağlayıcı farklı
 * imzalıyor). Buradaki iş üç şey: adaptörü bulmak, sonucu HTTP'ye çevirmek,
 * yetkiyi ve referans ödülünü uygulamak.
 *
 * YANIT KODLARI SAĞLAYICIYA GÖRE SEÇİLDİ. RevenueCat 2xx dışını yeniden deniyor;
 * bu yüzden "bizim işimize yaramayan ama geçerli" olaylar (TEST, SANDBOX,
 * tanınmayan tür) 200 ile kapatılıyor — yoksa sağlayıcı aynı olayı günlerce
 * yeniden yollar ve gerçek bir sorun varmış gibi görünür. Yalnız yetkilendirme
 * hatası (401) ve yapılandırma eksikliği (503) gerçek hata sayılıyor.
 */
export async function POST(req: Request, ctx: { params: Promise<{ provider?: string[] }> }) {
  const { provider } = await ctx.params;
  const name = provider?.[0] ?? DEFAULT_ADAPTER;
  const adapter = adapterFor(name);
  if (!adapter) return NextResponse.json({ error: "unknown_provider", provider: name }, { status: 404 });
  if (!adapter.configured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  // Ham gövde okunuyor: imza doğrulayan sağlayıcılar (Stripe, Apple) baytların
  // kendisini imzalıyor, yeniden serileştirilmiş JSON'u değil.
  const raw = await req.text();
  const parsed = await adapter.parse(req, raw);

  if (!parsed.ok) {
    if (parsed.status === 401 || parsed.status === 503) {
      return NextResponse.json({ error: parsed.reason }, { status: parsed.status });
    }
    // Yeniden denenmesi anlamsız olan her şey: sessizce kabul et.
    return NextResponse.json({ ok: true, skipped: parsed.reason });
  }

  try {
    if ("transfer" in parsed) {
      const { applied, moved } = await applyStoreTransfer(parsed.transfer);
      return NextResponse.json({ ok: true, applied, moved });
    }
    /* `firstPayment` ARTIK OKUNMUYOR ve bu bilerek. Burada davet ödülü
       yazılıyordu (ilk gerçek ödemede davetçiye 7 gün); ödül premium süresi
       olmaktan çıkıp arkadaşlığa döndüğü için zincirin bu halkası kalktı
       (gerekçe: lib/premium/referral başı). Bayrağı `applyStoreEvent`
       döndürmeye devam ediyor — "ilk ödeme" hâlâ anlamlı bir olay ve
       ölçüm/telafi için okunabilir. */
    const { applied } = await applyStoreEvent(parsed.event);
    return NextResponse.json({ ok: true, applied });
  } catch (err) {
    console.error("[premium/webhook]", err);
    // 500 = sağlayıcı yeniden denesin. Yetki yazılamadıysa tekrar denenmeli.
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
