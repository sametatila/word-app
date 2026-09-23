"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { analyticsMirror, setAnalyticsEnabled, setAnalyticsMirror } from "@/lib/track";
import { legalPath } from "@/lib/legal";
import { apiFetch } from "@/lib/api-fetch";
import { useT, useLang } from "@/lib/i18n/client";

/**
 * Hesapta duran iki hukuki tercihi tarayıcıyla eşitler (hukuk denetimi 2026-09-23).
 *
 * 1. ANALİTİK (LEG-9). Asıl tercih `profiles.analytics_opt_out`; tarayıcıdaki
 *    anahtar yalnız ayna (bkz. lib/track). Sunucu kapalı diyorsa ayna kapanır.
 *    Tarayıcı eski sürümde yerel olarak kapatılmışsa ("off") o seçim hesaba
 *    taşınır: kullanıcının verdiği kararı kaybetmek yerine kapalıyı korumak.
 *    Ayna "server" ama hesap açık diyorsa başka cihazdan açılmıştır, ayna
 *    silinir.
 * 2. ŞARTLAR DEĞİŞTİ (LEG-11). Profilin kabul ettiği sürüm güncel değilse
 *    altta bir kez şerit çıkar; "Anladım" güncel sürümü hesaba yazar.
 */
export function AccountSync({ analyticsOptOut, termsUpdate }: { analyticsOptOut: boolean; termsUpdate: { version: string } | null }) {
  useEffect(() => {
    const mirror = analyticsMirror();
    if (analyticsOptOut) setAnalyticsMirror("server");
    else if (mirror === "off") void setAnalyticsEnabled(false);
    else if (mirror === "server") setAnalyticsMirror(null);
  }, [analyticsOptOut]);

  return termsUpdate ? <TermsBanner version={termsUpdate.version} /> : null;
}

function TermsBanner({ version }: { version: string }) {
  const t = useT();
  const lang = useLang();
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(false);
  if (!open) return null;

  async function accept() {
    setBusy(true);
    try {
      const res = await apiFetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ acceptTerms: true }),
      });
      /* İstek düşerse şerit yine kapanıyor ama sürüm yazılmadığı için bir
         sonraki açılışta tekrar çıkıyor: kayıt olmadan "kabul" sayılmıyor. */
      if (!res.ok) console.warn("[terms] accept failed", res.status);
    } catch {
      /* ağ yok: bir sonraki açılışta yeniden */
    }
    setOpen(false);
  }

  return (
    <div
      role="region"
      aria-label={t("termsw.updated_title")}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div className="card mx-auto flex w-full max-w-xl flex-col gap-2 p-4 shadow-lg sm:flex-row sm:items-center">
        <p className="flex-1 text-caption leading-relaxed">
          <strong className="block text-body">{t("termsw.updated_title")}</strong>
          {t("termsw.updated_body", { version })}{" "}
          <Link href={legalPath("terms", lang)} prefetch={false} className="underline underline-offset-4">
            {t("termsw.read_terms")}
          </Link>
          {" · "}
          <Link href={legalPath("privacy", lang)} prefetch={false} className="underline underline-offset-4">
            {t("termsw.read_privacy")}
          </Link>
        </p>
        <button type="button" onClick={() => void accept()} disabled={busy} className="btn btn-primary shrink-0 px-4 py-2 text-body">
          {t("termsw.ok")}
        </button>
      </div>
    </div>
  );
}
