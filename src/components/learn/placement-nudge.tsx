"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-fetch";
import { useT } from "@/lib/i18n/client";

/**
 * İLK HAFTA SEVİYE ÖNERİSİ — seviye testinin emniyet ağı (sunucu `lib/placement-nudge`,
 * docs/plan/placement-v2.md). Öneri sunucuda hesaplanıp sayfayla geliyor; yalnız bir kez ve
 * yalnız ilk 10 günde. Karar (geç / kalsın) profile yazılır, seviye ancak kabulde değişir.
 * Mobil karşılığı `M/src/ui/PlacementNudge`.
 */
export function PlacementNudge({ nudge }: { nudge: { direction: "up" | "down"; from: string; to: string } }) {
  const t = useT();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState(false);
  if (!open) return null;
  const up = nudge.direction === "up";

  async function decide(accept: boolean) {
    setBusy(true);
    try {
      await apiFetch("/api/placement", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "nudge", to: nudge.to, accept }),
      });
      if (accept) router.refresh();
    } catch { /* kart kapanır; öneri bir sonraki açılışta yeniden gelebilir */ }
    setBusy(false);
    setOpen(false);
  }

  return (
    <section role="status" className="card mb-5 grid gap-2 p-5">
      <h2 className="text-h3">{t(up ? "plc2.nudge_up_title" : "plc2.nudge_down_title")}</h2>
      <p className="muted">{t(up ? "plc2.nudge_up_body" : "plc2.nudge_down_body", { from: nudge.from, to: nudge.to })}</p>
      <div className="mt-1 grid grid-cols-2 gap-2">
        <button type="button" disabled={busy} onClick={() => void decide(false)} className="btn btn-ghost px-4 py-2.5">
          {t("plc2.nudge_keep", { from: nudge.from })}
        </button>
        <button type="button" disabled={busy} onClick={() => void decide(true)} className="btn btn-primary px-4 py-2.5">
          {t("plc2.nudge_accept", { to: nudge.to })}
        </button>
      </div>
    </section>
  );
}
