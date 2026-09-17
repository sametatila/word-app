"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n/client";
import { track } from "@/lib/track";
import type { StoreLinks, WebPlatform } from "@/lib/store-link";

/**
 * Web paywall'ının "satın alma" bölümü — web satmıyor, uygulamaya yönlendiriyor.
 *
 * Kurgunun gerekçesi `lib/store-link.ts`te. Bu bileşen üç şeyi garanti ediyor:
 *   1. Yayında olmayan mağazaya bağlantı ÇİZİLMİYOR (kırık bağlantı yerine
 *      "yakında" satırı).
 *   2. "Aynı hesapla giriş yap" satırı her zaman görünür - başka hesapla alınan
 *      abonelik bu hesapta görünmez ve en sık destek sorusu budur.
 *   3. Kullanıcı mağazadan/uygulamadan döndüğünde sayfa sunucudan TAZELENİYOR:
 *      durum sunucuda çiziliyor, sekme görünür olunca `router.refresh()`.
 *
 * Görünüm mağaza düğmesi değil, SATIN ALMA DÜĞMESİ GİBİ DE DEĞİL: "Premium'a
 * uygulamadan geç". Webde ödeme alındığı izlenimi verilmiyor.
 */
export function PremiumStoreCta({
  platform,
  stores,
  qrSvg,
  account,
  source,
  soonNotice,
}: {
  platform: WebPlatform;
  stores: StoreLinks;
  /** Masaüstünde `/get/premium?src=qr` adresinin QR kodu (sunucuda üretilmiş SVG). */
  qrSvg: string | null;
  /** Uygulamada girilecek hesap (e-posta); bilinmiyorsa genel cümle. */
  account: string | null;
  source: string;
  /** `/get/premium` bu cihazın mağazası yayında değil diye geri yolladı. */
  soonNotice: boolean;
}) {
  const t = useT();
  const router = useRouter();

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [router]);

  const anyLive = stores.ios.live || stores.android.live;
  const href = `/get/premium?src=${encodeURIComponent(source)}`;
  const accountLine = account ? t("store.same_account", { account }) : t("store.same_account_generic");

  return (
    <section className="brand-gradient mt-4 rounded-panel px-4 py-4 text-center on-fill" aria-labelledby="store-cta-title">
      <h2 id="store-cta-title" className="text-strong">{t("store.cta_title")}</h2>
      {/* "Yükseltme mobil uygulamadan yapılır" cümlesi ortak sözlükten (mobilde de
          aynı cümle); webe özel ek: alınan hakkın burada da açıldığı. */}
      <p className="mt-1 text-body">{t("paywall.upgrade_in_app")}</p>
      <p className="mt-1 text-caption opacity-90">{t("store.cta_body")}</p>
      {soonNotice && <p role="status" className="mt-2 text-caption">{t("store.soon_notice")}</p>}

      {!anyLive ? (
        <p className="mt-3 text-body">{t("store.none_live")}</p>
      ) : platform === "desktop" ? (
        <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {qrSvg && (
            /* SVG sunucuda `qrcode` ile üretildi; içerik bizim adresimiz, kullanıcı girdisi yok. */
            <div
              className="h-36 w-36 shrink-0 overflow-hidden rounded-tile bg-white p-2"
              role="img"
              aria-label={t("store.scan_qr")}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          )}
          <div className="flex max-w-xs flex-col gap-2 text-left">
            <p className="text-caption">{t("store.scan_qr")}</p>
            <StoreLinksRow stores={stores} source={source} />
          </div>
        </div>
      ) : stores[platform].live ? (
        <a
          href={href}
          onClick={() => track("store_redirect", 0, `${platform}:${source}_tap`)}
          className="btn mt-3 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-strong"
          style={{ background: "var(--on-fill)", color: "var(--color-brand)" }}
        >
          {t("store.open_app")}
        </a>
      ) : (
        <p className="mt-3 text-body">{t(platform === "ios" ? "store.soon_ios" : "store.soon_android")}</p>
      )}

      <p className="mt-3 text-caption opacity-90">{accountLine}</p>
      {/* Vitrin fiyatının bağlayıcı olmadığı ve otomatik yenileme beyanı: App
          Store 3.1.2 ve Play, gösterilen teklifin kendi içinde eksiksiz olmasını
          istiyor (eski bloktan taşındı). */}
      <p className="mt-1 text-caption opacity-90">{t("paywall.price_note_store")}</p>
      <p className="mt-1 text-caption opacity-90">{t("paywall.renew_note_web")}</p>
      <p className="mt-1 text-caption opacity-90">{t("store.auto_refresh")}</p>
    </section>
  );
}

function StoreLinksRow({ stores, source }: { stores: StoreLinks; source: string }) {
  const t = useT();
  return (
    <div className="flex flex-wrap gap-2">
      {(["ios", "android"] as const).map((p) =>
        stores[p].live ? (
          <a
            key={p}
            href={stores[p].url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("store_redirect", 0, `desktop:${source}_${p}`)}
            className="chip min-h-9 px-3 text-caption"
          >
            {t(p === "ios" ? "store.app_store" : "store.google_play")}
          </a>
        ) : (
          <span key={p} className="text-caption opacity-80">{t(p === "ios" ? "store.soon_ios" : "store.soon_android")}</span>
        ),
      )}
    </div>
  );
}
