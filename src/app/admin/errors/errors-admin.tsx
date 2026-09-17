"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import type { ErrorGroup } from "@/lib/client-errors";
import { EXTERNAL } from "@/lib/admin-links";
import { AdminPage, Badge, BTN, Empty, Notice, PageHeader, Panel, TONE, when } from "../_ui/ui";

/**
 * Hata grupları: en son görülen önce. Her satır kapalı gelir; açınca yığın.
 * "Çözüldü" işareti grubu listeden düşürür; aynı hata yeniden gelirse işaret
 * kendiliğinden kalkar (sunucu `resolved_at = null`).
 */
const PLATFORM: Record<string, string> = { web: "Web", android: "Android", ios: "iOS" };

export function ErrorsAdmin({ groups, showAll, top, focus = null }: { groups: ErrorGroup[]; showAll: boolean; top?: React.ReactNode; focus?: string | null }) {
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
    <AdminPage>
      <PageHeader
        title="Hatalar"
        description={<>Web ve mobil JavaScript hataları, mesaj + yığın + ekran + sürümle gruplanmış. Native (Android/iOS) çökmeler Firebase Crashlytics&apos;te: <a className="underline" href={EXTERNAL.crashlytics} target="_blank" rel="noopener noreferrer">{EXTERNAL.crashlytics}</a></>}
        meta={`${list.length} grup · ${total} olay`}
        actions={<a href={showAll ? "/admin/errors" : "/admin/errors?all=1"} className={BTN.secondary}>{showAll ? "Yalnız açıklar" : "Çözülenler dahil"}</a>}
      />
      {msg ? <Notice tone="bad">{msg}</Notice> : null}
      {focus && !groups.some((g) => g.fingerprint === focus) ? (
        <Notice tone="warn">Uyarıdaki hata grubu bulunamadı (kayıt silinmiş olabilir). Bütün gruplar: <a className="underline" href="/admin/errors?all=1">/admin/errors?all=1</a></Notice>
      ) : null}
      {top}
      <div className="inline-flex flex-wrap gap-0.5 rounded-tile p-0.5" style={{ background: "var(--surface-2)" }}>
        {["", "web", "android", "ios"].map((p) => (
          <button key={p || "all"} type="button" aria-pressed={platform === p} onClick={() => setPlatform(p)} className="inline-flex h-8 items-center rounded-chip px-3 text-caption"
            style={platform === p ? { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-soft)" } : { color: "var(--text-muted)" }}>
            {p ? PLATFORM[p] : "Hepsi"}
          </button>
        ))}
      </div>

      <Panel flush>
        {list.length === 0 ? (
          <div className="px-3 pb-2"><Empty>Açık hata grubu yok.</Empty></div>
        ) : (
          <div>
            {list.map((g) => (
              <details key={g.fingerprint} id={`grup-${g.fingerprint}`} open={g.fingerprint === focus} className="scroll-mt-32 border-t px-3 py-2.5 text-caption first:border-t-0" style={g.fingerprint === focus ? { borderColor: "var(--hairline)", background: "color-mix(in srgb, var(--color-brand) 6%, var(--surface))" } : { borderColor: "var(--hairline)" }}>
                <summary className="flex cursor-pointer flex-wrap items-center gap-x-2 gap-y-1">
                  <b className="w-12 shrink-0 tabular-nums" style={{ color: g.count >= 20 ? TONE.bad : undefined }}>{g.count}×</b>
                  <Badge>{PLATFORM[g.platform] ?? g.platform}</Badge>
                  {g.resolved ? <Badge tone="ok">çözüldü</Badge> : null}
                  <span className="text-strong min-w-0 break-words">{g.name ? `${g.name}: ` : ""}{g.message}</span>
                  <span className="muted w-full pl-14">{g.screen || "—"} · son {when(g.lastSeen)} · ilk {when(g.firstSeen)}{g.appVersion ? ` · ${g.appVersion}` : ""}</span>
                </summary>
                <div className="mt-2 pl-14">
                  {g.stack ? <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-tile p-3 font-mono text-micro" style={{ background: "var(--surface-2)" }}>{g.stack}</pre> : <p className="muted">Yığın yok.</p>}
                  {!g.resolved ? (
                    <button type="button" onClick={() => resolve(g.fingerprint)} className={`${BTN.small} mt-2`}>Çözüldü olarak işaretle</button>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        )}
      </Panel>
    </AdminPage>
  );
}
