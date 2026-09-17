"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";

/**
 * Kullanıcı detay sayfasının hesap işlemleri: askıya al / kaldır, sil.
 *
 * Silme İKİ ADIM ve yazılı onay: gerekçe seçilmeden ve "SİL" yazılmadan düğme
 * açılmıyor. Geri alınamaz bir işlem tek tıklamaya bağlı olmamalı; sistem
 * onay kutusu da yok (parite §255), onay sayfanın kendi denetimleriyle.
 */

const DELETE_REASONS: { key: string; label: string }[] = [
  { key: "user_request", label: "Kullanıcının isteği (e-posta/destek)" },
  { key: "spam", label: "Spam / sahte hesap" },
  { key: "abuse", label: "Kural ihlali" },
  { key: "duplicate", label: "Mükerrer hesap" },
  { key: "test", label: "Test hesabı" },
  { key: "other", label: "Diğer" },
];

export function AccountActions({ userId, suspended }: { userId: string; suspended: { reason: string; until: string | null } | null }) {
  const [reason, setReason] = useState("");
  const [days, setDays] = useState("");
  const [delReason, setDelReason] = useState("");
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState<"" | "suspended" | "lifted" | "deleted">("");

  async function act(body: Record<string, unknown>, ok: typeof done) {
    setBusy(true);
    setMsg("");
    try {
      const res = await apiFetch("/api/admin/users", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ userId, ...body }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) setMsg(adminErrorText(data.error ?? res.status));
      else setDone(ok);
    } catch {
      setMsg("Ağ hatası");
    } finally {
      setBusy(false);
    }
  }

  const field = { borderColor: "var(--border)", background: "var(--surface-2)", color: "var(--text)" };

  if (done === "deleted") return <p role="status" className="text-body" style={{ color: "var(--color-rose)" }}>Hesap ve bütün verisi silindi.</p>;

  return (
    <div className="space-y-4 text-caption">
      {msg ? <p role="status" style={{ color: "var(--color-rose)" }}>{msg}</p> : null}

      <div className="card space-y-2 px-3 py-3">
        <b>Askıya alma</b>
        {suspended && done !== "lifted" ? (
          <>
            <p style={{ color: "var(--color-rose)" }}>
              Askıda: {suspended.reason} · {suspended.until ? `bitiş ${new Date(suspended.until).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}` : "süresiz"}
            </p>
            <button type="button" disabled={busy} onClick={() => act({ action: "lift" }, "lifted")} className="chip h-8 px-3 text-caption">Askıyı kaldır</button>
          </>
        ) : done === "suspended" ? (
          <p role="status" style={{ color: "var(--color-rose)" }}>Askıya alındı; açık oturumlar kapatıldı (en geç 1 dakikada etkili).</p>
        ) : (
          <>
            <p className="muted">Hesap yeni oturum açamaz, açık oturumları kapanır. Veri silinmez; geri alınabilir.</p>
            <input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} placeholder="İç gerekçe (kullanıcıya gösterilmez)" aria-label="Askıya alma gerekçesi" className="h-8 w-full rounded-tile border px-2" style={field} />
            <div className="flex flex-wrap items-center gap-2">
              <input value={days} onChange={(e) => setDays(e.target.value.replace(/\D/g, ""))} placeholder="Gün (boş = süresiz)" aria-label="Süre (gün)" className="h-8 w-40 rounded-tile border px-2" style={field} />
              <button type="button" disabled={busy || !reason.trim()} onClick={() => act({ action: "suspend", reason, days: days ? Number(days) : null }, "suspended")} className="chip h-8 px-3 text-caption" style={{ color: "var(--color-rose)" }}>
                Askıya al
              </button>
            </div>
          </>
        )}
      </div>

      <div className="card space-y-2 px-3 py-3">
        <b style={{ color: "var(--color-rose)" }}>Hesabı sil</b>
        <p className="muted">Kalıcı: hesap, ilerleme, yazılar, sosyal izler silinir; mali kayıt anonimleşir (gizlilik politikası §11). Mağaza aboneliği varsa mağazada ayrıca iptal edilmesi gerekir.</p>
        <select value={delReason} onChange={(e) => setDelReason(e.target.value)} aria-label="Silme gerekçesi" className="h-8 rounded-tile border px-2" style={field}>
          <option value="">Gerekçe seç…</option>
          {DELETE_REASONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
        <div className="flex flex-wrap items-center gap-2">
          <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder='Onay için "SİL" yaz' aria-label="Silme onayı" className="h-8 w-40 rounded-tile border px-2" style={field} />
          <button
            type="button"
            disabled={busy || !delReason || typed.trim() !== "SİL"}
            onClick={() => act({ action: "delete", reason: delReason, confirm: userId }, "deleted")}
            className="chip h-8 px-3 text-caption"
            style={{ color: "var(--color-rose)" }}
          >
            Kalıcı olarak sil
          </button>
        </div>
      </div>
    </div>
  );
}
