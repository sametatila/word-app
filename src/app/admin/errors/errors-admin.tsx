"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import type { ErrorGroup } from "@/lib/client-errors";

/**
 * Hata grupları: en son görülen önce. Her satır kapalı gelir; açınca yığın.
 * "Çözüldü" işareti grubu listeden düşürür; aynı hata yeniden gelirse işaret
 * kendiliğinden kalkar (sunucu `resolved_at = null`).
 */
const when = (v: string) => new Date(v).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" });
const PLATFORM: Record<string, string> = { web: "Web", android: "Android", ios: "iOS" };

export function ErrorsAdmin({ groups, showAll }: { groups: ErrorGroup[]; showAll: boolean }) {
  const [gone, setGone] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState("");
  const [platform, setPlatform] = useState("");

  async function resolve(fingerprint: string) {
    setMsg("");
    try {
      const res = await apiFetch("/api/admin/app", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "resolve_error", id: fingerprint }) });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setMsg(adminErrorText(data.error ?? res.status));
        return;
      }
      setGone((s) => new Set(s).add(fingerprint));
    } catch {
      setMsg(adminErrorText("network"));
    }
  }

  const list = groups.filter((g) => !gone.has(g.fingerprint) && (!platform || g.platform === platform));
  const total = list.reduce((a, g) => a + g.count, 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-h1">Hatalar</h1>
        <p className="muted text-body">
          {list.length} grup · {total} olay. Web ve mobil JS hataları; native çökmeler Firebase Crashlytics&apos;te.
        </p>
        {msg ? <p role="status" className="text-caption" style={{ color: "var(--color-rose)" }}>{msg}</p> : null}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-caption">
          {["", "web", "android", "ios"].map((p) => (
            <button key={p || "all"} type="button" aria-pressed={platform === p} onClick={() => setPlatform(p)} className="chip h-8 px-3" style={platform === p ? { background: "var(--color-brand)", color: "var(--on-fill)" } : undefined}>
              {p ? PLATFORM[p] : "Hepsi"}
            </button>
          ))}
          <a href={showAll ? "/admin/errors" : "/admin/errors?all=1"} className="chip h-8 px-3">{showAll ? "Yalnız açıklar" : "Çözülenler dahil"}</a>
        </div>
      </header>

      <div className="mt-6 space-y-2">
        {list.length === 0 ? (
          <div className="card px-3 py-4 text-caption" style={{ color: "var(--text-muted)" }}>Açık hata grubu yok.</div>
        ) : (
          list.map((g) => (
            <details key={g.fingerprint} className="card px-3 py-2 text-caption">
              <summary className="flex cursor-pointer flex-wrap items-baseline gap-x-2">
                <b className="tabular-nums" style={{ color: g.count >= 20 ? "var(--color-rose)" : undefined }}>{g.count}×</b>
                <span className="chip h-5 px-1.5 text-micro">{PLATFORM[g.platform] ?? g.platform}</span>
                <span className="font-semibold">{g.name ? `${g.name}: ` : ""}{g.message}</span>
                <span className="muted">{g.screen || "—"} · son {when(g.lastSeen)} · ilk {when(g.firstSeen)}{g.appVersion ? ` · ${g.appVersion}` : ""}{g.resolved ? " · çözüldü" : ""}</span>
              </summary>
              {g.stack ? <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-tile p-2 font-mono text-micro" style={{ background: "var(--surface-2)" }}>{g.stack}</pre> : <p className="muted mt-2">Yığın yok.</p>}
              {!g.resolved ? (
                <button type="button" onClick={() => resolve(g.fingerprint)} className="chip mt-2 h-8 px-3 text-caption">Çözüldü olarak işaretle</button>
              ) : null}
            </details>
          ))
        )}
      </div>
    </div>
  );
}
