"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { EpisodeDetail, RenderView } from "@/lib/studio";
import type { SocialPlatform, SocialPost, SocialStatus } from "@/lib/social-posts";
import type { StudioRequest } from "@/lib/studio-requests";
import type { StudioRole } from "@/lib/studio-auth";
import { REQUEST_STATE, RequestActions, requestCall } from "../requests/actions";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, BTN, Badge, FIELD, FIELD_STYLE, Field, KeyValue, Notice, PageHeader, Panel, Segmented, TONE, type Tone, when } from "../../admin/_ui/ui";
import { TwoStep } from "../../admin/_ui/two-step";
import { APPROACH_TR, CONTENT_STATE, PLATFORMS, POST_STATE, THEME_TR, contentState, dayLabel, postState } from "../shared";
import { Fields } from "./fields";
import { Preview, type PreviewState } from "./preview";

/**
 * BÖLÜM EDİTÖRÜ. Akış: metni düzenle (önizleme canlı) → Kaydet (yeni sürüm) → Onayla ve üret (Defne sesleri tam,
 * yerleşim temiz) → sunucu videoyu üretir → MP4 / kapak / açıklamayı indir (kayıpsız) → platforma koy, durumu işaretle.
 * Onaydan sonra metin değişirse onay düşer; eski video "eski sürüm" diye indirilebilir kalır.
 */

type Msg = { tone: Tone; text: string } | null;
const SLOTS = ["07:30", "12:30", "18:30"];

async function call(url: string, body: Record<string, unknown>): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  try {
    const res = await apiFetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    return { ok: res.ok, data: (await res.json().catch(() => ({}))) as Record<string, unknown> };
  } catch {
    return { ok: false, data: { error: "network" } };
  }
}
function errorText(d: Record<string, unknown>): string {
  switch (d.error) {
    case "conflict":
      return `Bu bölüm sen düzenlerken başkası tarafından kaydedildi (${String((d.detail as { by?: string })?.by ?? "")}). Değişikliklerini bir yere kopyala ve sayfayı yenile.`;
    case "shape":
      return `Yalnız metinler değiştirilebilir: ${String(d.detail)}`;
    case "audio":
      return `Defne sesi olmayan metin var: ${(d.detail as string[]).join(" · ")}`;
    case "slot":
      return String(d.detail);
    case "not_queued":
      return "Üretim artık sırada değil (başlamış ya da bitmiş).";
    case "db":
      return "Sunucu hatası.";
    default:
      return adminErrorText((d.error as string) ?? "failed");
  }
}

const mb = (b: number | null) => (b ? `${(b / 1e6).toFixed(1)} MB` : "");

export function StudioEditor({ initial, posts: initialPosts, role, email, requests: initialRequests }: { initial: EpisodeDetail; posts: SocialPost[]; role: StudioRole; email: string; requests: StudioRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const reloadRequests = useCallback(async () => {
    const res = await apiFetch("/api/studio/requests", { cache: "no-store" });
    if (res.ok) setRequests(((await res.json()) as { requests: StudioRequest[] }).requests.filter((r) => r.episodeId === initial.id));
  }, [initial.id]);
  // ses talebi kapandıysa (geldi / reddedildi) talep eden bölümü açınca görülmüş sayılır
  useEffect(() => {
    for (const r of initialRequests) if (r.requestedBy === email && !r.requesterSeen && r.status !== "open" && r.status !== "in_progress") void requestCall({ action: "seen", id: r.id });
  }, [initialRequests, email]);
  const [ep, setEp] = useState(initial);
  const [draft, setDraft] = useState<Record<string, unknown>>(initial.data);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const [pv, setPv] = useState<PreviewState | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [focus, setFocus] = useState<{ t: number; n: number }>();
  /**
   * Alana tıklanınca önizleme ilgili ana gider. Kart/tur alanı (items[2].tr gibi): o öğenin Almanca metninin
   * seslendirildiği an (destede sonraki kartlar baştan sahnede durduğu için "ilk görünme" yanıltır). Diğerleri
   * (kanca, kapanış, sabit yazılar): yazının ilk göründüğü ya da seslendirildiği an.
   */
  const focusText = useCallback((value: string, path?: (string | number)[]) => {
    if (!pv) return;
    const low = (x: string) => x.trim().toLowerCase();
    let t = Infinity;
    if (path && path.length >= 2 && typeof path[1] === "number" && Array.isArray(draft[path[0] as string])) {
      const el = (draft[path[0] as string] as unknown[])[path[1]];
      const own = JSON.stringify(el ?? "").match(/"([^"]{2,})"/g)?.map((m) => low(m.slice(1, -1))) ?? [];
      const said = pv.voice.filter((x) => own.some((o) => low(x.text).includes(o)));
      if (said.length) t = Math.min(...said.map((x) => x.t)) + 0.4;
    }
    if (!Number.isFinite(t)) {
      const v = low(value);
      if (!v) return;
      const said = pv.voice.find((x) => low(x.text).includes(v));
      const seen = (pv.visible ?? []).filter(({ s: x }) => low(x).includes(v) || (x.length > 2 && v.includes(low(x)))).map((x) => x.t);
      t = Math.min(said ? said.t : Infinity, seen.length ? Math.min(...seen) + 0.3 : Infinity);
    }
    if (Number.isFinite(t)) setFocus((f) => ({ t, n: (f?.n ?? 0) + 1 }));
  }, [pv, draft]);
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(ep.data), [draft, ep.data]);

  const reload = useCallback(async () => {
    const res = await apiFetch(`/api/studio/episodes/${ep.id}`, { cache: "no-store" });
    if (res.ok) setEp((await res.json()) as EpisodeDetail);
  }, [ep.id]);

  // üretim sürerken durumu izle
  const live = ep.render && (ep.render.status === "queued" || ep.render.status === "running");
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => void reload(), 3000);
    return () => clearInterval(t);
  }, [live, reload]);

  // kaydedilmemiş değişiklikle sayfadan çıkma uyarısı
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const save = useCallback(async () => {
    if (!dirty || busy || !pv?.ready) return;
    setBusy(true);
    setMsg(null);
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "save", baseRevision: ep.revision, data: draft, spoken: pv.spoken, note });
    setBusy(false);
    if (!r.ok) return setMsg({ tone: "bad", text: errorText(r.data) });
    setNote("");
    await reload();
    setMsg({ tone: "ok", text: `Kaydedildi: sürüm ${String(r.data.revision)}.` });
  }, [dirty, busy, pv, ep.id, ep.revision, draft, note, reload]);

  // Ctrl/Cmd+S
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [save]);

  // yeni sürüm gelince taslak ona eşitlenir (yalnız kayıt/geri dönüşten sonra; yazarken değil)
  useEffect(() => {
    setDraft(ep.data);
  }, [ep.revision]); // eslint-disable-line react-hooks/exhaustive-deps

  async function approve() {
    setBusy(true);
    setMsg(null);
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "approve", revision: ep.revision });
    setBusy(false);
    if (!r.ok) return setMsg({ tone: "bad", text: errorText(r.data) });
    await reload();
    setMsg({ tone: "ok", text: "Onaylandı: video sunucuda üretiliyor (yaklaşık 1–3 dakika)." });
  }
  async function restore(to: number | "origin") {
    setBusy(true);
    setMsg(null);
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "restore", baseRevision: ep.revision, to });
    setBusy(false);
    if (!r.ok) return setMsg({ tone: "bad", text: errorText(r.data) });
    await reload();
    setMsg({ tone: "ok", text: to === "origin" ? "Claude'un sürümüne dönüldü." : `${to}. sürüme dönüldü.` });
  }
  async function cancel(renderId: number) {
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "cancel_render", renderId });
    if (!r.ok) setMsg({ tone: "bad", text: errorText(r.data) });
    await reload();
  }

  // onay engelleri (sunucu da denetler; burada nedenini söylemek için)
  const auditFresh = pv?.audit.forKey === JSON.stringify(draft);
  const blockers: string[] = [];
  if (dirty) blockers.push("Önce kaydet.");
  if (!pv?.ready) blockers.push(pv?.error ? `Önizleme kurulamadı: ${pv.error}` : "Önizleme hazırlanıyor.");
  if (ep.missing.length) blockers.push(`Defne sesi bekleyen ${ep.missing.length} metin var.`);
  if (pv?.audit.running || !auditFresh) blockers.push("Yerleşim denetleniyor…");
  else if (pv?.audit.issues?.length) blockers.push(`Yerleşim sorunu: ${pv.audit.issues.length}`);
  const cs = contentState(ep);
  const cur = ep.render;
  const canApprove = !blockers.length && !(cur && ["queued", "running", "done"].includes(cur.status)) && !busy;

  return (
    <AdminPage>
      <PageHeader
        crumb={["/studio", "Takvim"]}
        title={ep.title}
        description={<>{APPROACH_TR[ep.approach] ?? ep.approach} · {THEME_TR[ep.theme] ?? ep.theme} · <span className="font-mono">{ep.id}</span> · sürüm {ep.revision}{ep.updatedBy ? ` (${ep.updatedBy === "claude" ? "Claude" : ep.updatedBy}, ${when(ep.updatedAt)})` : ""}</>}
        meta={<span className="flex flex-wrap items-center gap-2"><Badge tone={CONTENT_STATE[cs.key].tone}>{cs.label}</Badge>{ep.slot ? <span>Yayın: {dayLabel(ep.slot.slice(0, 10))} {ep.slot.slice(11)} (Berlin)</span> : <span>Takvim dışı</span>}</span>}
        actions={
          <>
            {dirty ? <span className="text-caption" style={{ color: "var(--color-flame)" }}>Kaydedilmemiş değişiklik var</span> : null}
            <button type="button" className={BTN.primary} disabled={!dirty || busy || !pv?.ready} onClick={() => void save()}>{busy ? "…" : "Kaydet"}</button>
          </>
        }
      />
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      {ep.archived ? <Notice tone="warn" title="Bu bölüm depodan kaldırıldı">Takvimde görünmez; yayınlandıysa kayıt olarak kalır.</Notice> : null}
      {ep.originChanged ? (
        <Notice tone="warn" title="Claude bu bölümü depoda güncelledi">
          Senin düzenlemen korunuyor. Claude&apos;un yeni sürümünü almak istersen (düzenlemelerin gider, geçmişte kalır):{" "}
          <TwoStep small danger={false} label="Claude'un sürümünü al" confirm="Evet, Claude'un sürümüne dön" onConfirm={() => void restore("origin")} disabled={busy} />
        </Notice>
      ) : null}

      <Steps ep={ep} dirty={dirty} posts={posts} />

      <div className="grid gap-5 @5xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-5">
          <Panel title="İçerik" hint="Videodaki her yazı, videonun akış sırasıyla. Ctrl/Cmd+S kaydeder.">
            <Fields data={draft} saved={ep.data} spoken={pv?.spoken ?? ep.spoken} visible={pv?.visible ?? null} uiUsed={pv?.uiUsed ?? []} uiDefaults={pv?.uiDefaults ?? {}} onChange={setDraft} onFocusText={focusText} disabled={busy} />
            <div className="mt-5 flex flex-wrap items-end gap-2 border-t pt-4" style={{ borderColor: "var(--border)" }}>
              <div className="min-w-[14rem] flex-1">
                <Field label="Kayıt notu (isteğe bağlı)">
                  <input aria-label="Kayıt notu" className={FIELD} style={FIELD_STYLE} value={note} onChange={(e) => setNote(e.target.value)} placeholder="ör. kanca kısaltıldı" />
                </Field>
              </div>
              <button type="button" className={BTN.secondary} disabled={!dirty || busy} onClick={() => setDraft(ep.data)}>Değişiklikleri at</button>
              <button type="button" className={BTN.primary} disabled={!dirty || busy || !pv?.ready} onClick={() => void save()}>{busy ? "…" : "Kaydet"}</button>
            </div>
          </Panel>
          <History ep={ep} busy={busy} onRestore={(r) => void restore(r)} />
        </div>

        <div className="min-w-0 space-y-5 @5xl:sticky @5xl:top-20 @5xl:self-start">
          <Panel title="Önizleme" hint="Sunucudaki üretimle aynı motor; kaydetmeden de görünür. Videoya dokununca oynar/durur.">
            <Preview template={ep.template} data={draft} onState={setPv} focus={focus} />
          </Panel>
          <StatusBox ep={ep} pv={pv} dirty={dirty} auditFresh={auditFresh} blockers={blockers} canApprove={canApprove} busy={busy} onApprove={() => void approve()} onCancel={(id) => void cancel(id)} audio={<AudioRequest ep={ep} dirty={dirty} role={role} email={email} requests={requests} onChanged={async () => { await reloadRequests(); await reload(); }} />} />
          <Publish ep={ep} posts={posts} setPosts={setPosts} onSaved={reload} setMsg={setMsg} />
        </div>
      </div>
    </AdminPage>
  );
}

/** Akış: Düzenle → Onayla → Video hazır → Platforma koy. Nerede olduğunu tek bakışta söyler. */
function Steps({ ep, dirty, posts }: { ep: EpisodeDetail; dirty: boolean; posts: SocialPost[] }) {
  const ready = ep.render?.status === "done" && ep.render.hasFiles;
  const placed = PLATFORMS.filter((p) => posts.some((x) => x.platform === p.key && (x.status === "scheduled" || x.status === "published"))).length;
  const steps = [
    { label: "Düzenle", done: !dirty, sub: dirty ? "kaydedilmedi" : `sürüm ${ep.revision}` },
    { label: "Onayla", done: ep.approved, sub: ep.approved ? (ep.approvedBy ?? "") : ep.missing.length ? "ses bekliyor" : "bekliyor" },
    { label: "Video hazır", done: !!ready, sub: ready ? "indirilebilir" : ep.render?.status === "running" ? `%${Math.round((ep.render.progress ?? 0) * 100)}` : ep.render?.status === "queued" ? "sırada" : ep.render?.status === "failed" ? "hata" : "—" },
    { label: "Platforma koy", done: placed === PLATFORMS.length, sub: `${placed}/${PLATFORMS.length} platform` },
  ];
  const current = steps.findIndex((x) => !x.done);
  return (
    <ol className="grid grid-cols-2 gap-2 @3xl:grid-cols-4">
      {steps.map((x, i) => {
        const on = i === current;
        const c = x.done ? TONE.ok : on ? TONE.info : "var(--border)";
        return (
          <li key={x.label} aria-current={on ? "step" : undefined} className="flex items-center gap-3 rounded-tile border px-3 py-2" style={{ borderColor: c, background: on ? "var(--brand-soft)" : "var(--surface)" }}>
            <span className={`grid size-7 shrink-0 place-items-center rounded-full text-caption text-strong ${x.done || on ? "on-fill" : "muted"}`} style={{ background: x.done ? TONE.ok : on ? TONE.info : "var(--surface-2)" }}>{x.done ? "✓" : i + 1}</span>
            <span className="min-w-0">
              <span className="block text-caption text-strong">{x.label}</span>
              <span className="muted block truncate text-micro">{x.sub}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Defne sesi yok: editör Samet'e talep gönderir (Telegram + Talepler), admin bilgi görür ve talebi işler.
 * Geçici/başka ses yok (Edge vb.): kayıt gelene kadar onay kapalı. Ses gelince talep kendiliğinden kapanır.
 */
function AudioRequest({ ep, dirty, role, email, requests, onChanged }: { ep: EpisodeDetail; dirty: boolean; role: StudioRole; email: string; requests: StudioRequest[]; onChanged: () => Promise<void> }) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const openReq = requests.find((r) => r.status === "open" || r.status === "in_progress");
  const last = requests[0];
  if (!ep.missing.length) {
    return last && last.status === "done" && last.requestedBy === email && !last.requesterSeen ? <Notice tone="ok" title="Defne sesi geldi">Talebin tamamlandı; bölümü onaylayabilirsin.</Notice> : null;
  }
  const send = async () => {
    setBusy(true);
    setErr(null);
    const e = await requestCall({ action: "create", episodeId: ep.id, note });
    setBusy(false);
    if (e) return setErr(e);
    setNote("");
    await onChanged();
  };
  return (
    <div className="space-y-2 rounded-tile border p-3" style={{ borderColor: "var(--color-flame)" }}>
      <div className="text-strong">Defne sesi yok: {ep.missing.length} metin</div>
      <ul className="list-disc pl-4">{ep.missing.map((t) => <li key={t}>{t}</li>)}</ul>
      <p className="muted">Yalnız Defne kullanılır (geçici ses yok). Kayıt gelene kadar onay kapalı.</p>
      {openReq ? (
        <div className="space-y-1">
          <p><span className="text-strong">{REQUEST_STATE[openReq.status].label}</span> <span className="muted">· {openReq.requestedBy} · {when(openReq.updatedAt)}</span></p>
          {openReq.reply ? <p><span className="muted">Samet:</span> {openReq.reply}</p> : null}
          <RequestActions r={openReq} role={role} email={email} onDone={onChanged} />
        </div>
      ) : role === "editor" ? (
        <div className="space-y-2">
          {dirty ? <p className="muted">Önce kaydet: talep kaydedilmiş metinler için gider.</p> : null}
          <input aria-label="Samet'e not" className={FIELD} style={FIELD_STYLE} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Not (isteğe bağlı): ör. salı yayını için lazım" />
          <button type="button" className={`${BTN.primary} w-full`} disabled={busy || dirty} onClick={() => void send()}>Samet&apos;e gönder</button>
        </div>
      ) : (
        <p>Bu metinler gece ses bekçisiyle Mac&apos;in üretim listesine girer, Mac sabah ~08:40&apos;ta (Berlin) üretir. Hemen gerekirse Mac&apos;te <span className="font-mono">eksik_mac.sh</span> çalıştır (ya da Claude&apos;a &quot;stüdyo seslerini üret&quot; de).</p>
      )}
      {last && !openReq && last.status === "rejected" ? <p><span className="muted">Son talep reddedildi:</span> {last.reply}</p> : null}
      {err ? <Notice tone="bad">{err}</Notice> : null}
    </div>
  );
}

function StatusBox({ ep, pv, dirty, auditFresh, blockers, canApprove, busy, onApprove, onCancel, audio }: {
  ep: EpisodeDetail; pv: PreviewState | null; dirty: boolean; auditFresh: boolean; blockers: string[]; canApprove: boolean; busy: boolean; onApprove: () => void; onCancel: (id: number) => void; audio: React.ReactNode;
}) {
  const draftMissing = pv?.missing ?? [];
  // kaydedilmemişse taslağın eksikleri, kayıtlıysa sunucunun saydığı (ikisi aynı veriden; büyük olanı göster)
  const missingCount = dirty ? draftMissing.length : Math.max(draftMissing.length, ep.missing.length);
  const issues = auditFresh ? pv?.audit.issues : null;
  const r = ep.render;
  const old = ep.video && ep.video.revision !== ep.revision ? ep.video : null;
  return (
    <Panel title="Durum ve video">
      <div className="space-y-3 text-caption">
        <ul className="space-y-1.5">
          <li className="flex items-start gap-2">
            <Badge tone={missingCount ? "warn" : "ok"}>Ses</Badge>
            <span>{missingCount ? `Defne sesi bekleyen ${missingCount} metin` : `${pv?.spoken.length ?? ep.spoken.length} seslendirmenin hepsi hazır`}</span>
          </li>
          <li className="flex items-start gap-2">
            <Badge tone={pv?.audit.running || !auditFresh ? undefined : issues?.length ? "bad" : "ok"}>Yerleşim</Badge>
            <span>{pv?.audit.running || !auditFresh ? "Denetleniyor…" : issues?.length ? `${issues.length} sorun` : "Taşma ya da çakışma yok"}</span>
          </li>
        </ul>
        {dirty && draftMissing.length ? (
          <Notice tone="warn" title={`Bu değişiklikle Defne sesi gereken ${draftMissing.length} metin`}>
            <ul className="list-disc pl-4">{draftMissing.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="mt-1">Önizlemede bu satırlar sessiz. Kaydedersen kayıt gelene kadar onay kapanır.</p>
          </Notice>
        ) : null}
        {audio}
        {issues?.length ? (
          <Notice tone="bad" title="Yerleşim sorunu">
            <ul className="list-disc pl-4">{issues.slice(0, 6).map((i) => <li key={i}>{i}</li>)}</ul>
            <p className="mt-1">Genelde metin kutusuna sığmıyor: kısalt. Saniyeler sorunun göründüğü an.</p>
          </Notice>
        ) : null}

        <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
          {!r || r.status === "cancelled" ? (
            <div className="space-y-2">
              <button type="button" className={`${BTN.primary} w-full`} disabled={!canApprove || busy} onClick={onApprove}>Onayla ve videoyu üret</button>
              <p className="muted">{blockers.length ? blockers.join(" ") : "Video sunucuda 1–3 dakikada üretilir (1080×1920, 30 fps)."}</p>
            </div>
          ) : r.status === "queued" ? (
            <div className="flex flex-wrap items-center gap-2"><Badge tone="info">Sırada</Badge><span className="muted">{r.requestedBy}</span><button type="button" className={BTN.small} onClick={() => onCancel(r.id)}>İptal</button></div>
          ) : r.status === "running" ? (
            <div className="space-y-1">
              <span>Video üretiliyor… %{Math.round((r.progress ?? 0) * 100)}</span>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}><div className="h-full transition-all" style={{ width: `${Math.round((r.progress ?? 0) * 100)}%`, background: "var(--color-brand)" }} /></div>
            </div>
          ) : r.status === "failed" ? (
            <div className="space-y-2">
              <Notice tone="bad" title="Üretim başarısız">{r.error ?? "bilinmeyen hata"}</Notice>
              <button type="button" className={`${BTN.primary} w-full`} disabled={!canApprove || busy} onClick={onApprove}>Yeniden dene</button>
            </div>
          ) : r.hasFiles ? (
            <div className="space-y-2">
              <p><Badge tone="ok">Video hazır</Badge> <span className="muted">{r.duration?.toFixed(1)} sn · {mb(r.bytes)} · {when(r.finishedAt)}</span></p>
              <video className="w-full rounded-tile" controls preload="metadata" src={`/api/studio/file/${r.id}?k=mp4&inline=1`} />
              {files(r)}
              <p className="faint">İndirilen dosya sunucudakinin aynısı (yeniden sıkıştırılmaz).</p>
            </div>
          ) : (
            <p className="muted">Bu sürümün dosyaları silinmiş (daha yeni bir üretim var).</p>
          )}
          {old ? (
            <div className="mt-3 space-y-1 border-t pt-2" style={{ borderColor: "var(--border)" }}>
              <p className="muted">Önceki sürümün videosu (s{old.revision}); metin o günden beri değişti:</p>
              {files(old)}
            </div>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}

function files(r: RenderView) {
  const u = (k: string) => `/api/studio/file/${r.id}?k=${k}`;
  return (
    <div className="flex flex-wrap gap-2">
      <a className={BTN.small} href={u("mp4")}>MP4 indir</a>
      <a className={BTN.small} href={u("kapak")}>Kapak</a>
      <a className={BTN.small} href={u("kapak34")}>Kapak 3:4</a>
      <a className={BTN.small} href={u("aciklama")}>Açıklama</a>
    </div>
  );
}

function Publish({ ep, posts, setPosts, onSaved, setMsg }: { ep: EpisodeDetail; posts: SocialPost[]; setPosts: (f: (xs: SocialPost[]) => SocialPost[]) => void; onSaved: () => Promise<void>; setMsg: (m: Msg) => void }) {
  return (
    <Panel title="Yayın" hint="Saat Berlin saati. Platformun zamanlayıcısına koyunca “Zamanlandı”, yayından sonra bağlantıyla “Yayında”.">
      <div className="space-y-4">
        <SlotBox ep={ep} onSaved={onSaved} setMsg={setMsg} />
        {PLATFORMS.map((p) => (
          <PlatformBox key={p.key} episodeId={ep.id} platform={p.key} label={p.label} post={posts.find((x) => x.platform === p.key) ?? null} onSaved={(post) => setPosts((xs) => [...xs.filter((x) => x.platform !== p.key), ...(post ? [post] : [])])} />
        ))}
      </div>
    </Panel>
  );
}

function SlotBox({ ep, onSaved, setMsg }: { ep: EpisodeDetail; onSaved: () => Promise<void>; setMsg: (m: Msg) => void }) {
  const [day, setDay] = useState(ep.slot?.slice(0, 10) ?? "");
  const [time, setTime] = useState(ep.slot?.slice(11) ?? "18:30");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const next = day ? `${day} ${time}` : null;
  async function save(slot: string | null) {
    setBusy(true);
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "slot", slot });
    setBusy(false);
    if (!r.ok) return setMsg({ tone: "bad", text: errorText(r.data) });
    setWarnings((r.data.warnings as string[]) ?? []);
    await onSaved();
    setMsg({ tone: "ok", text: slot ? `Yayın saati: ${slot} (Berlin).` : "Takvimden çıkarıldı." });
  }
  return (
    <div>
      <div className="mb-1 text-caption text-strong">Yayın saati</div>
      <div className="flex flex-wrap items-end gap-2">
        <Field label="Gün"><input aria-label="Yayın günü" type="date" className={FIELD} style={FIELD_STYLE} value={day} onChange={(e) => setDay(e.target.value)} /></Field>
        <Field label="Saat">
          <select aria-label="Yayın saati" className={FIELD} style={FIELD_STYLE} value={time} onChange={(e) => setTime(e.target.value)}>
            {SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <button type="button" className={BTN.small} disabled={busy || !next || next === ep.slot} onClick={() => void save(next)}>Saati kaydet</button>
        {ep.slot ? <TwoStep small danger={false} label="Takvimden çıkar" confirm="Evet, çıkar" onConfirm={() => void save(null)} disabled={busy} /> : null}
      </div>
      {warnings.length ? <div className="mt-2"><Notice tone="warn" title="Takvim uyarısı">{warnings.join(" · ")}</Notice></div> : null}
    </div>
  );
}

const EDITABLE: readonly (readonly [SocialStatus | "planned", string])[] = [
  ["planned", "Planlandı"],
  ["scheduled", "Zamanlandı"],
  ["published", "Yayında"],
  ["skipped", "Atlandı"],
];
const URL_HINT: Record<SocialPlatform, string> = { tiktok: "https://www.tiktok.com/@…/video/…", instagram: "https://www.instagram.com/reel/…" };

function PlatformBox({ episodeId, platform, label, post: saved, onSaved }: { episodeId: string; platform: SocialPlatform; label: string; post: SocialPost | null; onSaved: (p: SocialPost | null) => void }) {
  const [status, setStatus] = useState<SocialStatus | "planned">(saved?.status ?? "planned");
  const [url, setUrl] = useState(saved?.url ?? "");
  const [note, setNote] = useState(saved?.note ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const dirty = status !== (saved?.status ?? "planned") || url !== (saved?.url ?? "") || note !== (saved?.note ?? "");
  const shown = postState(saved?.status, false);
  async function save() {
    setBusy(true);
    setMsg(null);
    const r = await call("/api/studio/posts", { action: "set", episodeId, platform, status, url, note });
    setBusy(false);
    if (!r.ok) return setMsg({ tone: "bad", text: errorText(r.data) });
    onSaved((r.data.post as SocialPost | null) ?? null);
    setMsg({ tone: "ok", text: "Kaydedildi." });
  }
  return (
    <div className="space-y-2 border-t pt-3" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-caption text-strong">{label}</span>
        <Badge tone={POST_STATE[shown].tone}>{POST_STATE[shown].label}</Badge>
      </div>
      <div className="space-y-2">
        <Segmented label={`${label} durumu`} items={EDITABLE} value={status} onChange={setStatus} />
        <Field label="Gönderi bağlantısı">
          <input aria-label={`${label} gönderi bağlantısı`} className={FIELD} style={FIELD_STYLE} value={url} onChange={(ev) => setUrl(ev.target.value)} placeholder={URL_HINT[platform]} inputMode="url" />
        </Field>
        <Field label="Not">
          <input aria-label={`${label} notu`} className={FIELD} style={FIELD_STYLE} value={note} onChange={(ev) => setNote(ev.target.value)} placeholder="ör. platform müziği eklendi" />
        </Field>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={BTN.small} disabled={busy || !dirty} onClick={() => void save()}>{busy ? "…" : "Kaydet"}</button>
          {saved?.url ? <a className="text-caption underline underline-offset-2" href={saved.url} target="_blank" rel="noreferrer">Gönderiyi aç</a> : null}
          {saved ? <span className="muted text-caption">son: {when(saved.updatedAt)}{saved.updatedBy ? ` · ${saved.updatedBy}` : ""}</span> : null}
        </div>
        {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
        {saved?.metrics ? (
          <div>
            <div className="muted text-caption">Metrikler ({when(saved.metricsAt)})</div>
            <KeyValue data={saved.metrics} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function History({ ep, busy, onRestore }: { ep: EpisodeDetail; busy: boolean; onRestore: (r: number) => void }) {
  return (
    <details className="rounded-panel border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <summary className="cursor-pointer text-strong">Geçmiş ({ep.revisions.length} sürüm)</summary>
      <p className="faint mt-1 text-caption">Her kayıt bir sürüm. Eski bir sürüme dönmek onu yeni sürüm olarak yazar; geçmiş silinmez.</p>
      <ul className="mt-2 space-y-1 text-caption">
        {ep.revisions.map((r) => (
          <li key={r.revision} className="flex flex-wrap items-center gap-2">
            <span className="font-mono">s{r.revision}</span>
            <span>{r.author === "claude" ? "Claude" : r.author}</span>
            <span className="muted">{when(r.createdAt)}</span>
            {r.note ? <span className="muted">· {r.note}</span> : null}
            {r.revision === ep.revision ? <Badge tone="info">şu an</Badge> : <TwoStep small danger={false} label="Bu sürüme dön" confirm={`Evet, s${r.revision}`} onConfirm={() => onRestore(r.revision)} disabled={busy} />}
          </li>
        ))}
      </ul>
      <p className="mt-2"><Link className="text-caption underline underline-offset-2" href="/studio">← Takvime dön</Link></p>
    </details>
  );
}
