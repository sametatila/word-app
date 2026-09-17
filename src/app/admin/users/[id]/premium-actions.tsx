"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import type { PremiumAccount } from "@/lib/premium";
import { BTN, DataTable, Field, FIELD, FIELD_STYLE, Notice, Stat, Stats, when } from "../../_ui/ui";
import { TwoStep } from "../../_ui/two-step";

/**
 * Tek hesabın premium yetkisi — gör, ver, kaldır. KULLANICININ SAYFASINDA.
 *
 * Bu bölüm Premium sayfasındaydı: destek talebinde yönetici önce kullanıcıyı
 * bulup ayrıntısına bakıyor, sonra premium için başka sayfaya geçip aynı
 * hesabı YENİDEN arıyordu. Premium ayarları (limitler, kodlar) orada kaldı;
 * hesaba dokunan işlem hesabın yanında.
 *
 * GÜN EKLENİR, TARİH YAZILMAZ. Sunucu tarafı bilerek böyle (`grantPremiumDays`):
 * mutlak bir tarih yazmak mağaza penceresiyle bonusu aynı sütunda karıştırır ve
 * bir sonraki yenileme onu silerdi. Süreyi kısaltmak isteyen "yetkiyi kaldır"
 * deyip yeniden verir — defterde ikisi de görünür. Verilen süre BONUS:
 * mağaza alanlarına dokunulmaz.
 */
export function PremiumActions({ account }: { account: PremiumAccount }) {
  const [acc, setAcc] = useState(account);
  const [days, setDays] = useState(365);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);

  async function post(body: Record<string, unknown>, ok: string) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await apiFetch("/api/admin/premium", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, userId: acc.userId, note }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; account?: PremiumAccount };
      if (!res.ok) setMsg({ tone: "bad", text: adminErrorText(data.error ?? res.status) });
      else {
        if (data.account) setAcc(data.account);
        setMsg({ tone: "ok", text: ok });
      }
    } catch {
      setMsg({ tone: "bad", text: adminErrorText("network") });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      <Stats cols={4}>
        <Stat label="Durum" value={acc.premium ? "Premium" : "Ücretsiz"} tone={acc.premium ? "ok" : undefined} sub={acc.premium ? `${when(acc.until)} tarihine kadar` : undefined} />
        <Stat label="Kaynak" value={acc.source === "store" ? "Mağaza" : acc.source === "bonus" ? "Bonus" : "—"} sub={acc.store ? `${acc.store.provider ?? "?"} · ${acc.store.platform ?? "?"} · ${acc.store.state ?? "?"}` : undefined} />
        <Stat label="Bekleyen bonus" value={`${acc.bonusDaysPending} gün`} sub="yetki ilk okunduğunda başlar" />
        <Stat label="Önbellek" value={<span className="text-caption">{when(acc.cachedUntil)}</span>} sub="profiles.premium_until" />
      </Stats>
      <div className="flex flex-wrap items-end gap-2 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
        <Field label="Kaç gün eklensin" className="w-36">
          <input aria-label="Kaç gün eklensin" type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} className={`${FIELD} tabular-nums`} style={FIELD_STYLE} />
        </Field>
        <Field label="Not (deftere yazılır)" className="flex-1 basis-56">
          <input aria-label="Not" value={note} onChange={(e) => setNote(e.target.value)} className={FIELD} style={FIELD_STYLE} />
        </Field>
        <button type="button" disabled={busy || days <= 0} onClick={() => void post({ action: "grant_days", days }, `${days} gün premium verildi.`)} className={BTN.primary}>
          {days} gün premium ver
        </button>
        <TwoStep label="Yetkiyi kaldır" confirm="Evet, yetkiyi kaldır" disabled={busy} onConfirm={() => void post({ action: "revoke" }, "Premium yetkisi kaldırıldı.")} />
      </div>
      {acc.grants.length ? (
        <DataTable
          head={["Tarih", "Kaynak", "Süre", "Kim", "Not"]}
          rows={acc.grants.map((g) => [when(g.at), g.source, g.minutes ? `${Math.round(g.minutes / (24 * 60))} gün` : "—", <span key="a" className="muted">{g.actor ?? "—"}</span>, <span key="n" className="muted">{g.note ?? "—"}</span>])}
        />
      ) : null}
    </div>
  );
}
