"use client";

import { useState } from "react";
import type { RequestStatus, StudioRequest } from "@/lib/studio-requests";
import type { StudioRole } from "@/lib/studio-auth";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { BTN, FIELD, FIELD_STYLE, Notice, type Tone } from "../../admin/_ui/ui";

export const REQUEST_STATE: Record<RequestStatus, { label: string; tone?: Tone }> = {
  open: { label: "Samet'e gönderildi", tone: "warn" },
  in_progress: { label: "İşleme alındı", tone: "info" },
  done: { label: "Ses geldi", tone: "ok" },
  rejected: { label: "Reddedildi", tone: "bad" },
  cancelled: { label: "Geri çekildi" },
};

export async function requestCall(body: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await apiFetch("/api/studio/requests", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) return null;
    const d = (await res.json().catch(() => ({}))) as { error?: string };
    if (d.error === "reason_required") return "Reddetmek için gerekçe yaz.";
    if (d.error === "audio_ready") return "Seslerin hepsi zaten hazır.";
    if (d.error === "closed") return "Talep zaten kapanmış.";
    return adminErrorText(d.error ?? res.status);
  } catch {
    return adminErrorText("network");
  }
}

/** Admin: işleme al / reddet (gerekçe). Talep eden: geri çek. */
export function RequestActions({ r, role, email, onDone }: { r: StudioRequest; role: StudioRole; email: string; onDone: () => Promise<void> }) {
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const isOpen = r.status === "open" || r.status === "in_progress";
  if (!isOpen) return null;
  const run = async (action: string) => {
    setBusy(true);
    setErr(null);
    const e = await requestCall({ action, id: r.id, reply });
    setBusy(false);
    if (e) return setErr(e);
    setReply("");
    await onDone();
  };
  return (
    <div className="space-y-2">
      {role === "admin" ? (
        <div className="flex flex-wrap items-center gap-2">
          <input aria-label="Cevap ya da gerekçe" className={`${FIELD} min-w-[12rem] flex-1`} style={FIELD_STYLE} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Cevap (reddederken zorunlu)" />
          {r.status === "open" ? <button type="button" className={BTN.small} disabled={busy} onClick={() => void run("take")}>İşleme al</button> : null}
          <button type="button" className={BTN.small} disabled={busy} onClick={() => void run("reject")}>Reddet</button>
        </div>
      ) : null}
      {r.requestedBy === email ? <button type="button" className={BTN.small} disabled={busy} onClick={() => void run("cancel")}>Talebi geri çek</button> : null}
      {err ? <Notice tone="bad">{err}</Notice> : null}
    </div>
  );
}
