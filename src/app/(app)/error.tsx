"use client";

import { useEffect } from "react";
import { AlertIcon, RefreshIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { screenKey } from "@/lib/screens";
import { useT } from "@/lib/i18n/client";

/**
 * Uygulama kabuğunun İÇİNDEKİ hata sınırı.
 *
 * Kök `app/error.tsx` bütün ekranı kaplıyor: sekme çubuğu, üst şerit ve seri
 * göstergesi dahil her şey kayboluyor ve kullanıcının elinde yalnız "ana
 * sayfa" bağlantısı kalıyor. Oysa bir sekmenin içeriği patladığında öteki
 * sekmeler çalışıyor. Mobilde de öyle: ekran kendi hata durumunu çiziyor,
 * sekme çubuğu yerinde duruyor.
 *
 * Bu sınır kabuğun altında olduğu için gezinme ayakta kalıyor; kök sınır
 * yalnız kabuk dışındaki sayfalar (giriş, açılış, hukuki metinler) ve
 * kabuğun kendisi patlarsa devreye giriyor.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useT();
  useEffect(() => {
    console.error("[lernomi]", error);
    track("client_error", 1, screenKey(window.location.pathname));
  }, [error]);

  return (
    <div className="card mx-auto flex w-full max-w-md flex-col items-center gap-3 p-6 text-center">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-tile"
        style={{
          background: "color-mix(in srgb, var(--color-rose) 14%, transparent)",
          color: "var(--color-rose)",
        }}
      >
        <AlertIcon size={24} />
      </span>
      <h1 className="text-h2">{t("err.title")}</h1>
      <p className="muted text-body">{t("err.body")}</p>
      {error.digest ? (
        <p className="muted text-caption">
          {t("err.code")} <code>{error.digest}</code>
        </p>
      ) : null}
      <button onClick={reset} className="btn btn-primary mt-2 flex items-center gap-2 px-5 py-3">
        <RefreshIcon size={18} /> {t("common.try_again")}
      </button>
    </div>
  );
}
