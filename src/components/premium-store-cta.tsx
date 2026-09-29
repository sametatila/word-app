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
 * Masaüstünde QR + iki mağaza düğmesi, telefonda tek düğme (paywall yeniden
 * tasarımı 2026-09-29, C3 web panosu). Düğme metni "mağazada aç": webde ödeme
 * alındığı izlenimi verilmiyor.
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4 rounded-panel p-4" style={{ background: "var(--surface-2)" }}>
        {platform === "desktop" && qrSvg && (
          /* SVG sunucuda `qrcode` ile üretildi; içerik bizim adresimiz, kullanıcı girdisi yok. */
          <div
            className="h-24 w-24 shrink-0 overflow-hidden rounded-tile bg-white p-1.5"
            role="img"
            aria-label={t("store.scan_qr")}
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
        )}
        <div className="min-w-0">
          <p className="text-strong">{t("paywallw.qr_title")}</p>
          <p className="muted mt-1 text-caption">{platform === "desktop" && qrSvg ? t("store.scan_qr") : t("store.cta_body")}</p>
          <p className="muted mt-1 text-caption">{accountLine}</p>
        </div>
      </div>
      {soonNotice && <p role="status" className="muted text-caption">{t("store.soon_notice")}</p>}

      {!anyLive ? (
        <p className="text-body">{t("store.none_live")}</p>
      ) : platform === "desktop" ? (
        <div className="grid grid-cols-2 gap-2">
          {(["ios", "android"] as const).map((p) =>
            stores[p].live ? (
              <a
                key={p}
                href={stores[p].url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("store_redirect", 0, `desktop:${source}_${p}`)}
                className="btn btn-primary flex min-h-12 items-center justify-center px-2 text-center text-strong"
              >
                {t(p === "ios" ? "store.app_store" : "store.google_play")}
              </a>
            ) : (
              <span key={p} className="muted flex min-h-12 items-center justify-center text-center text-caption">
                {t(p === "ios" ? "store.soon_ios" : "store.soon_android")}
              </span>
            ),
          )}
        </div>
      ) : stores[platform].live ? (
        <a
          href={href}
          onClick={() => track("store_redirect", 0, `${platform}:${source}_tap`)}
          className="btn btn-primary flex min-h-12 items-center justify-center px-5 text-strong"
        >
          {t("store.open_app")}
        </a>
      ) : (
        <p className="text-body">{t(platform === "ios" ? "store.soon_ios" : "store.soon_android")}</p>
      )}
    </div>
  );
}
