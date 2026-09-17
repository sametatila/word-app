"use client";

import { useEffect } from "react";
import { RefreshIcon } from "@/components/icons";
import { FlowColumn, FlowActions, StateBody } from "@/components/flow";
import { track } from "@/lib/track";
import { screenKey } from "@/lib/screens";
import { useT } from "@/lib/i18n/client";
import { reportError } from "@/lib/error-report";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useT();
  useEffect(() => {
    console.error("[lernomi]", error);
    // Hata sınırına düşen ekran ölçülüyor: "bir şeyler ters gitti"yi kaç
    // kişi, hangi ekranda gördü — yoksa yalnız şikâyet edenler sayılır.
    track("client_error", 1, screenKey(window.location.pathname));
    // Hangi hata: mesaj ve yığın gruplanarak panele (lib/error-report).
    reportError(error, screenKey(window.location.pathname));
  }, [error]);

  /* DURUM ŞABLONU (components/flow). Kök sınır uygulama kabuğunun dışında
     ama kök düzenin İÇİNDE çiziliyor (onu değiştiren `global-error`); maskot
     hiçbir sağlayıcıya dayanmıyor, burada da güvenle çiziliyor. */
  return (
    <div className="flex min-h-dvh items-center px-5">
      <FlowColumn>
        <StateBody alert title={t("crash.title")} body={t("crash.body")}>
          {error.digest ? (
            <p className="muted mb-3 text-caption">
              {t("err.code")} <code>{error.digest}</code>
            </p>
          ) : null}
          <FlowActions
            primary={{ label: t("common.try_again"), icon: <RefreshIcon size={18} />, onClick: reset }}
            tertiary={{ label: t("common.home"), href: "/" }}
          />
        </StateBody>
      </FlowColumn>
    </div>
  );
}
