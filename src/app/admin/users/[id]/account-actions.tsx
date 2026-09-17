"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { BTN, DANGER, Field, FIELD, FIELD_STYLE, Notice, TONE, when } from "../../_ui/ui";
import { TwoStep } from "../../_ui/two-step";

/**
 * Kullanıcı detay sayfasının hesap işlemleri: dışa aktar, askıya al / kaldır, sil.
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
  const [msg, setMsg] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);
  const [done, setDone] = useState<"" | "suspended" | "lifted" | "deleted">("");

  async function act(body: Record<string, unknown>, ok: typeof done) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await apiFetch("/api/admin/users", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ userId, ...body }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) setMsg({ tone: "bad", text: adminErrorText(data.error ?? res.status) });
      else setDone(ok);
    } catch {
      setMsg({ tone: "bad", text: adminErrorText("network") });
    } finally {
      setBusy(false);
    }
  }

  /* Veri dışa aktarma: sunucu JSON döndürüyor, tarayıcı dosya olarak indiriyor
     (sunucuda dosya bırakılmıyor). */
  async function exportData() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await apiFetch("/api/admin/users", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ userId, action: "export" }) });
      const body = (await res.json().catch(() => ({}))) as { error?: string; data?: unknown; tables?: number; rows?: number };
      if (!res.ok || !body.data) {
        setMsg({ tone: "bad", text: adminErrorText(body.error ?? res.status) });
        return;
      }
      const blob = new Blob([JSON.stringify(body.data, null, 2)], { type: "application/json" });
      const stamp = new Date().toISOString().slice(0, 10);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `lernomi-veri-${userId.slice(0, 8)}-${stamp}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
      setMsg({ tone: "ok", text: `İndirildi: ${body.tables} tablo, ${body.rows} satır. Kişisel veri - yalnız talep sahibine, güvenli kanaldan gönder.` });
    } catch {
      setMsg({ tone: "bad", text: adminErrorText("network") });
    } finally {
      setBusy(false);
    }
  }

  if (done === "deleted") return <Notice tone="bad">Hesap ve bütün verisi silindi.</Notice>;

  const box = "flex min-w-0 flex-col gap-2 rounded-tile border p-4 text-caption";
  const boxStyle = { borderColor: "var(--border)" };

  return (
    <div className="space-y-3">
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className={box} style={boxStyle}>
          <b className="text-strong">Veri dışa aktarma (KVKK / GDPR)</b>
          <p className="muted">Kullanıcının bütün verisi makine okunur JSON olarak. Parola özeti, oturum jetonları ve 2FA sırrı dahil değildir.</p>
          <div className="mt-auto pt-1">
            <button type="button" disabled={busy} onClick={exportData} className={BTN.secondary}>Verisini indir (JSON)</button>
          </div>
        </div>

        <div className={box} style={boxStyle}>
          <b className="text-strong">Askıya alma</b>
          {suspended && done !== "lifted" ? (
            <>
              <p style={{ color: TONE.bad }}>Askıda: {suspended.reason} · {suspended.until ? `bitiş ${when(suspended.until)}` : "süresiz"}</p>
              <div className="mt-auto pt-1">
                <button type="button" disabled={busy} onClick={() => act({ action: "lift" }, "lifted")} className={BTN.secondary}>Askıyı kaldır</button>
              </div>
            </>
          ) : done === "suspended" ? (
            <p role="status" style={{ color: TONE.bad }}>Askıya alındı; açık oturumlar kapatıldı (en geç 1 dakikada etkili).</p>
          ) : (
            <>
              <p className="muted">Hesap yeni oturum açamaz, açık oturumları kapanır. Veri silinmez; geri alınabilir.</p>
              <Field label="İç gerekçe (kullanıcıya gösterilmez)">
                <input aria-label="Askıya alma gerekçesi" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className={FIELD} style={FIELD_STYLE} />
              </Field>
              <div className="flex flex-wrap items-end gap-2">
                <Field label="Gün (boş = süresiz)" className="w-36">
                  <input aria-label="Süre (gün)" value={days} inputMode="numeric" onChange={(e) => setDays(e.target.value.replace(/\D/g, ""))} className={FIELD} style={FIELD_STYLE} />
                </Field>
                <button type="button" disabled={busy || !reason.trim()} onClick={() => act({ action: "suspend", reason, days: days ? Number(days) : null }, "suspended")} className={BTN.secondary} style={DANGER}>
                  Askıya al
                </button>
              </div>
            </>
          )}
        </div>

        <div className={box} style={{ borderColor: "var(--color-rose)" }}>
          <b className="text-strong" style={{ color: TONE.bad }}>Hesabı sil</b>
          <p className="muted">Kalıcı: hesap, ilerleme, yazılar, sosyal izler silinir; mali kayıt anonimleşir (gizlilik politikası §11: <a className="underline" href="/privacy" target="_blank" rel="noopener noreferrer">/privacy</a>). Mağaza aboneliği varsa mağazada ayrıca iptal edilmesi gerekir.</p>
          <Field label="Gerekçe">
            <select value={delReason} onChange={(e) => setDelReason(e.target.value)} className={FIELD} style={FIELD_STYLE}>
              <option value="">Seç…</option>
              {DELETE_REASONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
            </select>
          </Field>
          <div className="flex flex-wrap items-end gap-2">
            <Field label='Onay için "SİL" yaz' className="w-36">
              <input aria-label="Silme onayı" value={typed} onChange={(e) => setTyped(e.target.value)} className={FIELD} style={FIELD_STYLE} />
            </Field>
            <TwoStep
              label="Kalıcı olarak sil"
              confirm="Evet, şimdi sil"
              disabled={busy || !delReason || typed.trim() !== "SİL"}
              onConfirm={() => void act({ action: "delete", reason: delReason, confirm: userId }, "deleted")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
