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
        crumb={["/studio/takvim", "Takvim"]}
        title="Talepler"
        description={role === "admin" ? "Editörün gönderdiği Defne sesi talepleri. İşleme alınca metin hemen Mac'in üretim listesine girer; Mac sabah turunda (ya da elle eksik_mac.sh) üretir, kayıt gelince talep kendiliğinden kapanır." : "Samet'e gönderdiğin talepler. Ses gelince talep kendiliğinden kapanır ve bölüm onaylanabilir."}
      />
      <Notice tone="info">Kısa videolarda yalnız Defne, uzun videolarda dört karakter (Defne, Aras, Can, Mira) kullanılır; geçici ya da başka bir sesle (Edge vb.) üretim yok.</Notice>
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

const KEY_RE = /^(defne|aras|can|mira)\|(de|tr|en)\|(.*?)(#\w+)?$/s;
const VOICE: Record<string, string> = { defne: "Defne", aras: "Aras", can: "Can", mira: "Mira" };
const LANG: Record<string, string> = { tr: "Türkçe", de: "Almanca", en: "İngilizce" };
/** Metinler: dikeyde düz liste (Defne); yatayda ses ve dile göre gruplu + Mac komutu. ✓ kaydı gelmiş. */
function TextList({ r }: { r: StudioRequest }) {
  const keyed = r.texts.filter((t) => KEY_RE.test(t));
  if (!keyed.length)
    return (
      <ul className="list-disc pl-5 text-caption">
        {r.texts.map((t) => <li key={t}>{t}{r.missing.includes(t) ? "" : " ✓"}</li>)}
      </ul>
    );
  const groups = new Map<string, string[]>();
  for (const k of keyed) {
    const m = k.match(KEY_RE) as RegExpMatchArray;
    const g = `${VOICE[m[1]] ?? m[1]} · ${LANG[m[2]] ?? m[2]}${m[4] ? ` (${m[4].slice(1)})` : ""}`;
    (groups.get(g) ?? groups.set(g, []).get(g))!.push(k);
  }
  const done = keyed.length - r.missing.length;
  return (
    <div className="space-y-2 text-caption">
      <p className="muted">{done} / {keyed.length} kayıt hazır · Mac&apos;te: <span className="font-mono">~/Workspace/tts-test/yatay_mac.sh {r.id}</span></p>
      {[...groups].map(([g, ks]) => (
        <details key={g} open={ks.some((k) => r.missing.includes(k))}>
          <summary className="cursor-pointer text-strong">{g} <span className="muted">({ks.filter((k) => !r.missing.includes(k)).length}/{ks.length})</span></summary>
          <ul className="mt-1 list-disc pl-5">
            {ks.map((k) => <li key={k}>{(k.match(KEY_RE) as RegExpMatchArray)[3]}{r.missing.includes(k) ? "" : " ✓"}</li>)}
          </ul>
        </details>
      ))}
    </div>
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
          <TextList r={r} />
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
