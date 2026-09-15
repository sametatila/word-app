"use client";

import { useEffect } from "react";
import { RefreshIcon } from "@/components/icons";
import { FlowColumn, FlowActions, StateBody } from "@/components/flow";
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

  /* DURUM ŞABLONU (components/flow): üzgün maskot · başlık · tek cümle ·
     tek çıkış. Mobil `ui/ErrorBoundary` aynı parçaları çiziyor. */
  return (
    <FlowColumn>
      <StateBody
        alert
        mood="sad"
        title={t("crash.title")}
        body={t("crash.body")}
      >
        {error.digest ? (
          <p className="muted mb-3 text-caption">
            {t("err.code")} <code>{error.digest}</code>
          </p>
        ) : null}
        <FlowActions primary={{ label: t("common.try_again"), icon: <RefreshIcon size={18} />, onClick: reset }} />
      </StateBody>
    </FlowColumn>
  );
}
