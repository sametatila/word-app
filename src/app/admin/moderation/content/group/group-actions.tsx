"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { BTN, FIELD, FIELD_STYLE, Notice } from "../../../_ui/ui";
import { TwoStep } from "../../../_ui/two-step";

const ERROR_TR: Record<string, string> = {
  not_found: "Grup bulunamadı.",
  no_target: "Bu grubun içerik paketi türetilemedi; kapatılacak madde yok.",
  bad_input: "Geçersiz istek.",
};

/**
 * Grup kararı: Gereği yapıldı / Asılsız / İçeriği kapat. Yazma ucu
 * `/api/admin/moderation` (2FA, işlem kaydı); başarıda sayfa sunucudan yenileniyor.
 */
export function GroupActions({ group, open, canDisable, ready }: { group: string; open: number; canDisable: boolean; ready: boolean }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);

  async function send(body: Record<string, unknown>, done: string) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await apiFetch("/api/admin/moderation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, group, note }),
      });
      const j = (await res.json().catch(() => ({}))) as { error?: string; closed?: number; notified?: number };
      if (!res.ok) {
        const code = String(j.error ?? res.status);
        setMsg({ tone: "bad", text: ERROR_TR[code] ?? adminErrorText(code) });
        return;
      }
      setMsg({ tone: "ok", text: j.closed != null ? `${done}: ${j.closed} bildirim kapandı, ${j.notified ?? 0} kişiye sonuç gitti.` : done });
      setNote("");
      router.refresh();
    } catch {
      setMsg({ tone: "bad", text: "Ağ hatası" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      {!ready ? <Notice tone="warn">Karar tablosu (moderation_actions) canlıda yok: bildirimler kapanır ama karar kaydı yazılmaz.</Notice> : null}
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      <div className="flex flex-wrap items-center gap-2">
        <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} placeholder="Not (isteğe bağlı): ne yapıldı, hangi commit" aria-label="Karar notu" className={`${FIELD} flex-1 basis-64`} style={FIELD_STYLE} />
        <button type="button" disabled={busy || open === 0} onClick={() => void send({ action: "close_group", decision: "resolved" }, "Gereği yapıldı")} className={BTN.secondary}>Gereği yapıldı</button>
        <button type="button" disabled={busy || open === 0} onClick={() => void send({ action: "close_group", decision: "dismissed" }, "Asılsız")} className={BTN.secondary}>Asılsız</button>
        {canDisable ? <TwoStep label="İçeriği kapat" confirm="Evet, madde yayından kalksın" disabled={busy} onConfirm={() => void send({ action: "disable_content" }, "İçerik kapatıldı, grup kapandı")} /> : null}
      </div>
      {open === 0 ? <p className="muted text-caption">Açık bildirim yok; yeni bildirim gelirse grup yeniden açılır.</p> : null}
    </div>
  );
}
