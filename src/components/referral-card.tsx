"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/client";
import type { ReferralStats } from "@/lib/premium/referral-types";

/**
 * Davet kartı — Profil'de.
 *
 * Premium ekranındaydı ve oraya ait değildi: davetin karşılığı premium süresi
 * değil, arkadaşlık bağı ve ortak seri (2026-09-17). Satın alma kararı
 * verilen ekranda satın almayla ilgisi olmayan bir kutu, planları ve fiyatı
 * aşağı itiyordu (paywall yeniden tasarımı, 2026-09-29). Mobil karşılığı
 * `mobile/src/components/ReferralCard.tsx`.
 */
export function ReferralCard({ referral }: { referral: ReferralStats }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  /*
    PAYLAŞILAN ADRES `/r/<KOD>`: bağı DOKUNUŞLA kuruyor ve uygulaması kurulu
    olanda uygulamada açılıyor. Eski `/premium?code=…` kodu yalnız kutuya
    dolduruyordu ve o kutu iOS'ta hiç yok (3.1.1).
  */
  const url = typeof window !== "undefined" ? `${window.location.origin}/r/${referral.code}` : "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* pano yoksa kullanıcı kodu elle kopyalar — kod ekranda duruyor */
    }
  }

  return (
    <section className="card p-4" aria-labelledby="referral-title">
      <h2 id="referral-title" className="text-h3">{t("referral.title")}</h2>
      <p className="mt-1 text-body">{t("referral.explain")}</p>
      <p className="muted mt-1 text-caption">{t("referral.reward_note")}</p>
      <div className="mt-3 flex items-center gap-2">
        <code
          className="flex-1 rounded-tile border px-3 py-2 text-center font-mono text-h3 tracking-[0.3em]"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        >
          {referral.code}
        </code>
        <button type="button" onClick={copy} className="rounded-panel px-4 py-2 text-strong" style={{ background: "var(--surface-2)" }}>
          {copied ? t("referral.copied") : t("referral.copy_link")}
        </button>
      </div>
      <p className="muted mt-3 text-caption">
        {referral.invited === 0 ? t("referral.none_yet") : t("referral.invited", { n: referral.invited })}
      </p>
    </section>
  );
}
