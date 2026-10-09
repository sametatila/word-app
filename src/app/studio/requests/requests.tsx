"use client";

import Link from "next/link";
import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import type { StudioRequest } from "@/lib/studio-requests";
import type { StudioRole } from "@/lib/studio-auth";
import { AdminPage, Badge, Empty, Notice, PageHeader, Panel, when } from "../../admin/_ui/ui";
import { RequestActions, REQUEST_STATE } from "./actions";

/**
 * Talepler: admin bütün etkin talepleri işler (işleme al / reddet), editör kendi taleplerinin durumunu izler.
 * Açılan sayfa editörün "görmediği güncelleme"lerini görüldü sayar.
 */
export function RequestsView({ requests: initial, role, email }: { requests: StudioRequest[]; role: StudioRole; email: string }) {
  const [requests, setRequests] = useState(initial);
  useEffect(() => {
    for (const r of initial) if (r.requestedBy === email && !r.requesterSeen) void apiFetch("/api/studio/requests", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "seen", id: r.id }) });
  }, [initial, email]);
  const pending = requests.filter((r) => r.status === "open" || r.status === "in_progress");
  const closed = requests.filter((r) => !pending.includes(r));
  const reload = async () => {
    const res = await apiFetch("/api/studio/requests", { cache: "no-store" });
    if (res.ok) setRequests(((await res.json()) as { requests: StudioRequest[] }).requests);
  };
  return (
    <AdminPage>
      <PageHeader
        crumb={["/studio", "Takvim"]}
        title="Talepler"
        description={role === "admin" ? "Editörün gönderdiği Defne sesi talepleri. İşleme alınca metin hemen Mac'in üretim listesine girer; Mac sabah turunda (ya da elle eksik_mac.sh) üretir, kayıt gelince talep kendiliğinden kapanır." : "Samet'e gönderdiğin talepler. Ses gelince talep kendiliğinden kapanır ve bölüm onaylanabilir."}
      />
      <Notice tone="info">Seslendirmede yalnız Defne kullanılır; geçici ya da başka bir sesle (Edge vb.) üretim yok.</Notice>
      <Panel title={`Etkin (${pending.length})`}>
        {pending.length ? <List items={pending} role={role} email={email} onDone={reload} /> : <Empty>Bekleyen talep yok.</Empty>}
      </Panel>
      {closed.length ? (
        <Panel title="Son 30 gün">
          <List items={closed} role={role} email={email} onDone={reload} />
        </Panel>
      ) : null}
    </AdminPage>
  );
}

function List({ items, role, email, onDone }: { items: StudioRequest[]; role: StudioRole; email: string; onDone: () => Promise<void> }) {
  return (
    <ul className="space-y-3">
      {items.map((r) => (
        <li key={r.id} className="space-y-2 rounded-tile border p-3" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
          <div className="flex flex-wrap items-center gap-2 text-caption">
            <Badge tone={REQUEST_STATE[r.status].tone}>{REQUEST_STATE[r.status].label}</Badge>
            <Link className="text-strong underline-offset-2 hover:underline" href={`/studio/${r.episodeId}`}>{r.episodeTitle}</Link>
            <span className="muted">· {r.requestedBy} · {when(r.createdAt)}</span>
          </div>
          <ul className="list-disc pl-5 text-caption">
            {r.texts.map((t) => <li key={t}>{t}{r.missing.includes(t) ? "" : " ✓"}</li>)}
          </ul>
          {r.note ? <p className="text-caption"><span className="muted">Not:</span> {r.note}</p> : null}
          {r.reply ? <p className="text-caption"><span className="muted">Cevap:</span> {r.reply}</p> : null}
          <details className="text-caption">
            <summary className="muted cursor-pointer">Süreç ({r.history.length} adım)</summary>
            <ol className="mt-1 space-y-0.5 pl-4">
              {r.history.map((h, i) => <li key={i}>{when(h.at)} · {h.by} · {REQUEST_STATE[h.status as keyof typeof REQUEST_STATE]?.label ?? h.status}{h.note ? ` · ${h.note}` : ""}</li>)}
            </ol>
          </details>
          <RequestActions r={r} role={role} email={email} onDone={onDone} />
        </li>
      ))}
    </ul>
  );
}
