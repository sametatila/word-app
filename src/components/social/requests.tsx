"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/avatar";
import { errorText, social, timeAgo, type PendingView } from "@/lib/social/client";

/** Gelen istekler (kabul/reddet) ve giden istekler (iptal). */
export function Requests({ incoming, outgoing, onChanged }: { incoming: PendingView[]; outgoing: PendingView[]; onChanged: () => void }) {
  if (!incoming.length && !outgoing.length) {
    return (
      <div className="card p-6 text-center">
        <p className="font-bold">Bekleyen istek yok</p>
        <p className="muted mt-1 text-sm">Gelen istekler burada birikir; gönderdiklerini de buradan iptal edersin.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {incoming.length ? (
        <section>
          <h3 className="muted mb-2 px-1 text-xs font-bold uppercase tracking-wide">Gelen</h3>
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {incoming.map((r) => (
              <RequestRow key={r.friendshipId} r={r} incoming onChanged={onChanged} />
            ))}
          </ol>
        </section>
      ) : null}
      {outgoing.length ? (
        <section>
          <h3 className="muted mb-2 px-1 text-xs font-bold uppercase tracking-wide">Gönderilen</h3>
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {outgoing.map((r) => (
              <RequestRow key={r.friendshipId} r={r} incoming={false} onChanged={onChanged} />
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

function RequestRow({ r, incoming, onChanged }: { r: PendingView; incoming: boolean; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function act(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try {
      await fn();
      onChanged();
    } catch (e) {
      setErr(errorText(e));
      setBusy(false);
    }
  }
  const href = r.user.username ? `/u/${r.user.username}` : null;
  return (
    <li className="flex items-center gap-3 px-4 py-3" style={{ borderColor: "var(--border)" }}>
      <Avatar userId={r.user.userId} name={r.user.name} size={40} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">
          {href ? <Link href={href} prefetch={false}>{r.user.name ?? "İsimsiz öğrenci"}</Link> : r.user.name ?? "İsimsiz öğrenci"}
          {r.user.username ? <span className="muted ml-1.5 text-xs font-normal">@{r.user.username}</span> : null}
        </p>
        <p className="muted text-[11px]">
          {r.user.level} · {timeAgo(r.createdAt)}
        </p>
        {err ? <p className="text-[11px]" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      </div>
      {incoming ? (
        <div className="flex shrink-0 gap-1.5">
          <button className="btn btn-primary h-8 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.respond(r.friendshipId, "accept"))}>
            Kabul et
          </button>
          <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.respond(r.friendshipId, "decline"))}>
            Reddet
          </button>
        </div>
      ) : (
        <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.remove(r.user.userId))}>
          İptal
        </button>
      )}
    </li>
  );
}
