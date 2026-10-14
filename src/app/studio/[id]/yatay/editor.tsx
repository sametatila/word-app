"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { EpisodeDetail } from "@/lib/studio";
import type { SocialPost } from "@/lib/social-posts";
import type { StudioRequest } from "@/lib/studio-requests";
import type { StudioRole } from "@/lib/studio-auth";
import { REQUEST_STATE, RequestActions, requestCall } from "../../requests/actions";
import { apiFetch } from "@/lib/api-fetch";
import { AdminPage, BTN, Badge, FIELD, FIELD_STYLE, Field, Notice, PageHeader, Panel, TONE, type Tone, when } from "../../../admin/_ui/ui";
import { TwoStep } from "../../../admin/_ui/two-step";
import { CONTENT_STATE, LONG_SERIES_TR, POST_STATE, contentState, dayLabel, postState } from "../../shared";
import { CopyButton } from "../fields";
import { History, PlatformBox, call, errorText, files, mb } from "../editor";
import { LongPreview, type LongState } from "./oynatici";
import { Script, VOICE } from "./senaryo";

/**
 * YATAY BÖLÜM EDİTÖRÜ (YouTube uzun video, 10–15 dk; 2026-10-13). Dikey editörün akışı, uzun videoya göre:
 *   Düzenle (senaryo, bölüm bölüm) → Seslendir (bölüm başına tek talep, dört karakter; Samet Mac'te üretir) →
 *   Onayla (kayıtların hepsi + yerleşim temiz) → sunucuda video (~1 saat) → YouTube'a koy (başlık, bölüm listeli
 *   açıklama, kapak 1280×720).
 * Önizleme videoyu üretmeden sunucuyla aynı motorla çalar; kaydı olmayan satır sessiz ve süresi tahmin.
 */

type Msg = { tone: Tone; text: string } | null;
type RenderViewLike = { target: "server" | "mac" };
type Tab = "icerik" | "paylasim";

export function LongEditor({ initial, posts: initialPosts, role, email, requests: initialRequests, tab: initialTab, mac }: { initial: EpisodeDetail; posts: SocialPost[]; role: StudioRole; email: string; requests: StudioRequest[]; tab?: Tab; mac: { seenAt: string; busy: boolean } | null }) {
  const [tab, setTabState] = useState<Tab>(initialTab ?? (initial.approved && initial.render?.status === "done" && initial.render.hasFiles ? "paylasim" : "icerik"));
  const setTab = useCallback((t: Tab) => {
    setTabState(t);
    window.history.replaceState(null, "", `?sekme=${t}`);
    window.scrollTo({ top: 0 });
  }, []);
  const [ep, setEp] = useState(initial);
  const [draft, setDraft] = useState<Record<string, unknown>>(initial.data);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const [pv, setPv] = useState<LongState | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [requests, setRequests] = useState(initialRequests);
  const [focus, setFocus] = useState<{ t: number; n: number }>();
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(ep.data), [draft, ep.data]);
  const [ytDraft, setYtDraft] = useState(initial.ytTitle ?? "");

  // sayfa tazelenince (StudioRefresh): kaydedilmemiş metin varken bölüm verisi alınmaz
  const [fresh, setFresh] = useState({ initial, initialPosts, initialRequests });
  if (fresh.initial !== initial || fresh.initialPosts !== initialPosts || fresh.initialRequests !== initialRequests) {
    setFresh({ initial, initialPosts, initialRequests });
    if (fresh.initialPosts !== initialPosts) setPosts(initialPosts);
    if (fresh.initialRequests !== initialRequests) setRequests(initialRequests);
    if (fresh.initial !== initial && !dirty && !busy) setEp(initial);
  }
  const reload = useCallback(async () => {
    const res = await apiFetch(`/api/studio/episodes/${ep.id}`, { cache: "no-store" });
    if (res.ok) setEp((await res.json()) as EpisodeDetail);
  }, [ep.id]);
  const reloadRequests = useCallback(async () => {
    const res = await apiFetch("/api/studio/requests", { cache: "no-store" });
    if (res.ok) setRequests(((await res.json()) as { requests: StudioRequest[] }).requests.filter((r) => r.episodeId === ep.id));
  }, [ep.id]);
  const live = ep.render && (ep.render.status === "queued" || ep.render.status === "running");
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => void reload(), 5000);
    return () => clearInterval(t);
  }, [live, reload]);
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);
  useEffect(() => setDraft(ep.data), [ep.revision]); // eslint-disable-line react-hooks/exhaustive-deps

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

  /** Alana tıklanınca: satırsa söylendiği an, yazıysa göründüğü an. */
  const onFocus = useCallback(({ key, text }: { key?: string; text: string }) => {
    if (!pv?.plan) return;
    let t: number | undefined = key ? pv.plan.voice.find((v) => v.key === key)?.t : undefined;
    if (t == null && text.trim().length > 1) {
      const v = text.trim().toLowerCase();
      t = (pv.texts ?? []).find((x) => x.s.toLowerCase().includes(v) || (x.s.length > 3 && v.includes(x.s.toLowerCase())))?.t;
    }
    if (t != null) setFocus((f) => ({ t: (t as number) + 0.05, n: (f?.n ?? 0) + 1 }));
  }, [pv]);

  async function approve(target: "server" | "mac") {
    setBusy(true);
    setMsg(null);
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "approve", revision: ep.revision, target });
    setBusy(false);
    if (!r.ok) return setMsg({ tone: "bad", text: errorText(r.data) });
    await reload();
    setMsg({ tone: "ok", text: target === "mac" ? "Onaylandı: video Mac'te üretilecek (Mac açıkken bir dakika içinde başlar, 11 dakikalık video ~15 dakika). Sayfayı kapatabilirsin." : "Onaylandı: video sunucuda üretiliyor. 11 dakikalık video yaklaşık bir saat sürer; sayfayı kapatabilirsin." });
  }
  async function moveRender(renderId: number, target: "server" | "mac") {
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "render_target", renderId, target });
    if (!r.ok) setMsg({ tone: "bad", text: errorText(r.data) });
    await reload();
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

  const missing = dirty ? (pv?.missing ?? ep.missing) : ep.missing;
  const auditFresh = pv?.audit.forKey === JSON.stringify(draft);
  const blockers: string[] = [];
  if (dirty) blockers.push("Önce kaydet.");
  if (!pv?.ready) blockers.push(pv?.error ? `Önizleme kurulamadı: ${pv.error}` : "Önizleme hazırlanıyor.");
  if (ep.missing.length) blockers.push(`Kaydı bekleyen ${ep.missing.length} satır var.`);
  if (pv?.audit.running || !auditFresh) blockers.push("Yerleşim denetleniyor…");
  else if (pv?.audit.issues?.length) blockers.push(`Yerleşim sorunu: ${pv.audit.issues.length}`);
  const cur = ep.render;
  const canApprove = !blockers.length && !(cur && ["queued", "running", "done"].includes(cur.status)) && !busy;
  const ready = ep.approved && cur?.status === "done" && !!cur.hasFiles;
  const cs = contentState(ep);
  const yt = posts.find((p) => p.platform === "youtube") ?? null;

  return (
    <AdminPage>
      <PageHeader
        crumb={["/studio/takvim", "Takvim"]}
        title={ep.title}
        description={<>Uzun video (YouTube) · {LONG_SERIES_TR[ep.template] ?? ep.template} · <span className="font-mono">{ep.id}</span> · sürüm {ep.revision}{ep.updatedBy ? ` (${ep.updatedBy === "claude" ? "Claude" : ep.updatedBy}, ${when(ep.updatedAt)})` : ""}</>}
        meta={<span className="flex flex-wrap items-center gap-2"><Badge tone={CONTENT_STATE[cs.key].tone}>{cs.label}</Badge>{ep.slot ? <span>Yayın: {dayLabel(ep.slot.slice(0, 10))} {ep.slot.slice(11)} (Berlin)</span> : <span>Takvim dışı</span>}{pv?.plan ? <span className="muted">· {Math.floor(pv.plan.duration / 60)} dk {Math.round(pv.plan.duration % 60)} sn</span> : null}</span>}
        actions={
          <>
            {dirty ? <span className="text-caption" style={{ color: "var(--color-flame)" }}>Kaydedilmemiş değişiklik var</span> : null}
            {posts.some((p) => p.status === "published") ? <Link href={`/studio/${ep.id}/performans`} className={BTN.secondary}>Performans</Link> : null}
            {tab === "icerik" ? <button type="button" className={BTN.primary} disabled={!dirty || busy || !pv?.ready} onClick={() => void save()}>{busy ? "…" : "Kaydet"}</button> : null}
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

      <Steps ep={ep} dirty={dirty} missing={missing.length} yt={yt} onTab={setTab} />
      <div role="tablist" aria-label="Bölüm sekmeleri" className="flex gap-1 border-b pb-2" style={{ borderColor: "var(--border)" }}>
        {([["icerik", "Senaryo ve onay", "metin, önizleme, ses, onay"], ["paylasim", "Paylaşım", ready ? "YouTube" : "video bekliyor"]] as [Tab, string, string][]).map(([k, label, sub]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className="flex items-baseline gap-2 rounded-tile px-3 py-2 text-left transition-colors hover:bg-[var(--surface-2)]" style={tab === k ? { background: "var(--brand-soft)", color: "var(--on-brand-soft)" } : { color: "var(--text-muted)" }}>
            <span className="text-strong">{label}</span>
            <span className="hidden text-caption opacity-75 sm:inline">{sub}</span>
          </button>
        ))}
      </div>

      {tab === "paylasim" ? (
        <Share ep={ep} dirty={dirty} posts={posts} setPosts={setPosts} reload={reload} setMsg={setMsg} ytDraft={ytDraft} setYtDraft={setYtDraft} onEdit={() => setTab("icerik")} chapters={pv?.chapters ?? []} />
      ) : (
        <div className="grid gap-5 @6xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="min-w-0 space-y-5 @6xl:order-1">
            <Panel title="Senaryo" hint="Videonun akış sırasıyla. Satıra tıkla: önizleme o ana gider. Ctrl/Cmd+S kaydeder.">
              <Script data={draft} saved={ep.data} missing={missing} onChange={setDraft} onFocus={onFocus} disabled={busy} />
              <div className="mt-5 flex flex-wrap items-end gap-2 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <div className="min-w-[14rem] flex-1">
                  <Field label="Kayıt notu (isteğe bağlı)">
                    <input aria-label="Kayıt notu" className={FIELD} style={FIELD_STYLE} value={note} onChange={(e) => setNote(e.target.value)} placeholder="ör. 2. konunun anlatımı kısaltıldı" />
                  </Field>
                </div>
                <button type="button" className={BTN.secondary} disabled={!dirty || busy} onClick={() => setDraft(ep.data)}>Değişiklikleri at</button>
                <button type="button" className={BTN.primary} disabled={!dirty || busy || !pv?.ready} onClick={() => void save()}>{busy ? "…" : "Kaydet"}</button>
              </div>
            </Panel>
            <History ep={ep} busy={busy} onRestore={(r) => void restore(r)} />
          </div>
          <div className="min-w-0 space-y-5 @6xl:sticky @6xl:top-20 @6xl:order-2 @6xl:self-start">
            <Panel title="Önizleme" hint="Sunucudaki üretimle aynı motor; kaydetmeden de görünür. Videoya dokununca oynar/durur.">
              <LongPreview template={ep.template} data={draft} onState={setPv} focus={focus} />
            </Panel>
            <Panel title="Ses ve onay">
              <div className="space-y-3 text-caption">
                <Voices spoken={pv?.spoken ?? ep.spoken} missing={missing} />
                <AudioRequest ep={ep} dirty={dirty} role={role} email={email} requests={requests} onChanged={async () => { await reloadRequests(); await reload(); }} />
                <div className="flex items-start gap-2">
                  <Badge tone={pv?.audit.running || !auditFresh ? undefined : pv?.audit.issues?.length ? "bad" : "ok"}>Yerleşim</Badge>
                  <span>{pv?.audit.running || !auditFresh ? "Denetleniyor…" : pv?.audit.issues?.length ? `${pv.audit.issues.length} sorun` : "Taşma ya da çakışma yok"}</span>
                </div>
                {auditFresh && pv?.audit.issues?.length ? (
                  <Notice tone="bad" title="Yerleşim sorunu">
                    <ul className="list-disc pl-4">{pv.audit.issues.slice(0, 8).map((i) => <li key={i}>{i}</li>)}</ul>
                    <p className="mt-1">Genelde metin kutusuna sığmıyor: kısalt. Saniye sorunun göründüğü sahnenin başı.</p>
                  </Notice>
                ) : null}
                <RenderBox ep={ep} mac={mac} blockers={blockers} canApprove={canApprove} busy={busy} onApprove={(target) => void approve(target)} onMove={(id, target) => void moveRender(id, target)} onCancel={(id) => void cancel(id)} onShare={() => setTab("paylasim")} />
              </div>
            </Panel>
          </div>
        </div>
      )}
    </AdminPage>
  );
}

/** Akış: Düzenle → Seslendir → Onayla → Video hazır → YouTube. */
function Steps({ ep, dirty, missing, yt, onTab }: { ep: EpisodeDetail; dirty: boolean; missing: number; yt: SocialPost | null; onTab: (t: Tab) => void }) {
  const ready = ep.render?.status === "done" && ep.render.hasFiles;
  const ytShown = postState(yt?.status, false);
  const steps = [
    { label: "Düzenle", done: !dirty, sub: dirty ? "kaydedilmedi" : `sürüm ${ep.revision}` },
    { label: "Seslendir", done: !ep.missing.length && !dirty, sub: ep.missing.length ? `${ep.missing.length} satır bekliyor` : missing ? `${missing} satır (kaydedilmemiş)` : "kayıtlar tam" },
    { label: "Onayla", done: ep.approved, sub: ep.approved ? (ep.approvedBy ?? "") : "bekliyor" },
    { label: "Video hazır", done: !!ready, sub: ready ? "indirilebilir" : ep.render?.status === "running" ? `%${Math.round((ep.render.progress ?? 0) * 100)}` : ep.render?.status === "queued" ? "sırada" : ep.render?.status === "failed" ? "hata" : "—" },
    { label: "YouTube", done: ytShown === "published", sub: POST_STATE[ytShown].label },
  ];
  const current = steps.findIndex((x) => !x.done);
  return (
    <ol className="grid grid-cols-2 gap-2 @3xl:grid-cols-5">
      {steps.map((x, i) => {
        const on = i === current;
        const c = x.done ? TONE.ok : on ? TONE.info : "var(--border)";
        return (
          <li key={x.label} aria-current={on ? "step" : undefined} className="rounded-tile border" style={{ borderColor: c, background: on ? "var(--brand-soft)" : "var(--surface)" }}>
            <button type="button" onClick={() => onTab(i >= 3 ? "paylasim" : "icerik")} className="flex w-full items-center gap-3 px-3 py-2 text-left">
              <span className={`grid size-7 shrink-0 place-items-center rounded-full text-caption text-strong ${x.done || on ? "on-fill" : "muted"}`} style={{ background: x.done ? TONE.ok : on ? TONE.info : "var(--surface-2)" }}>{x.done ? "✓" : i + 1}</span>
              <span className="min-w-0">
                <span className="block text-caption text-strong">{x.label}</span>
                <span className="muted block truncate text-micro">{x.sub}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/** Ses: karakter karakter kayıt durumu. */
function Voices({ spoken, missing }: { spoken: string[]; missing: string[] }) {
  const by = new Map<string, { all: number; miss: number }>();
  for (const k of spoken) {
    const g = `${k.split("|")[0]}|${k.split("|")[1]}`;
    const x = by.get(g) ?? { all: 0, miss: 0 };
    x.all++;
    if (missing.includes(k)) x.miss++;
    by.set(g, x);
  }
  return (
    <div className="space-y-1.5">
      <div className="flex items-start gap-2">
        <Badge tone={missing.length ? "warn" : "ok"}>Ses</Badge>
        <span>{missing.length ? `${spoken.length - missing.length} / ${spoken.length} kayıt hazır, ${missing.length} satır bekliyor` : `${spoken.length} kaydın hepsi hazır`}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[...by].map(([g, x]) => {
          const [v, l] = g.split("|");
          const c = VOICE[v]?.color ?? "var(--text-muted)";
          return <span key={g} className="rounded-full px-2 py-0.5 text-micro" style={{ background: `color-mix(in srgb, ${c} 10%, transparent)`, color: c }}>{VOICE[v]?.name ?? v} · {l === "tr" ? "TR" : "DE"} {x.all - x.miss}/{x.all}</span>;
        })}
      </div>
    </div>
  );
}

/**
 * Seslendirme talebi: bölüm başına tek talep (Samet, 2026-10-13). Editör ve admin gönderebilir; Samet Mac'te
 * `yatay_mac.sh <talep>` ile dört karakterle üretir, kayıtlar gelince talep kendiliğinden kapanır.
 */
function AudioRequest({ ep, dirty, role, email, requests, onChanged }: { ep: EpisodeDetail; dirty: boolean; role: StudioRole; email: string; requests: StudioRequest[]; onChanged: () => Promise<void> }) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const openReq = requests.find((r) => r.status === "open" || r.status === "in_progress");
  const last = requests[0];
  // anlatıcı satırları işçide kendiliğinden üretilir; talep yalnız Mac'in sesleri için
  const auto = ep.missing.filter((k) => VOICE[k.split("|")[0]]?.auto);
  const mac = ep.missing.filter((k) => !VOICE[k.split("|")[0]]?.auto);
  const autoNote = auto.length ? <Notice tone="warn" title={`Anlatım sesi üretiliyor: ${auto.length} satır`}>Ahu&apos;nun satırları kaydettikten sonra birkaç dakika içinde kendiliğinden gelir; sayfayı yenileyince görünür.</Notice> : null;
  if (!mac.length) return autoNote ?? (last && last.status === "done" && last.requestedBy === email && !last.requesterSeen ? <Notice tone="ok" title="Kayıtlar geldi">Talebin tamamlandı; bölümü onaylayabilirsin.</Notice> : null);
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
      {autoNote}
      <details>
        <summary className="cursor-pointer text-strong">Kaydı olmayan {mac.length} satır</summary>
        <ul className="mt-1 max-h-48 list-disc overflow-y-auto pl-4">{mac.map((k) => <li key={k}><span className="muted">{VOICE[k.split("|")[0]]?.name ?? k.split("|")[0]} · {k.split("|")[1]}:</span> {k.split("|").slice(2).join("|")}</li>)}</ul>
      </details>
      {openReq ? (
        <div className="space-y-1">
          <p><span className="text-strong">{REQUEST_STATE[openReq.status].label}</span> <span className="muted">· {openReq.requestedBy} · {when(openReq.updatedAt)} · {openReq.texts.length - openReq.missing.length}/{openReq.texts.length} kayıt</span></p>
          {openReq.reply ? <p><span className="muted">Samet:</span> {openReq.reply}</p> : null}
          {role === "admin" ? <p className="muted">Mac&apos;te: <span className="font-mono">~/Workspace/tts-test/yatay_mac.sh {openReq.id}</span></p> : null}
          <RequestActions r={openReq} role={role} email={email} onDone={onChanged} />
          {openReq.texts.length < mac.length ? <button type="button" className={BTN.small} disabled={busy || dirty} onClick={() => void send()}>Yeni satırları talebe ekle</button> : null}
        </div>
      ) : (
        <div className="space-y-2">
          {dirty ? <p className="muted">Önce kaydet: talep kaydedilmiş metinler için gider.</p> : <p className="muted">Metin editörden geçtiyse seslendirmeye gönder: Samet Mac&apos;te dört karakterle üretir. Kayıt gelene kadar onay kapalı.</p>}
          <input aria-label="Samet'e not" className={FIELD} style={FIELD_STYLE} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Not (isteğe bağlı): ör. cuma yayını için lazım" />
          <button type="button" className={`${BTN.primary} w-full`} disabled={busy || dirty} onClick={() => void send()}>Seslendirmeye gönder</button>
        </div>
      )}
      {last && !openReq && last.status === "rejected" ? <p><span className="muted">Son talep reddedildi:</span> {last.reply}</p> : null}
      {err ? <Notice tone="bad">{err}</Notice> : null}
    </div>
  );
}

/** Mac'in son görülmesi: 3 dakikadan yeniyse açık sayılır (Mac'teki alıcı dakikada bir sorar). */
function macLabel(mac: { seenAt: string; busy: boolean } | null): { on: boolean; text: string } {
  if (!mac) return { on: false, text: "Mac henüz hiç bağlanmadı" };
  const min = Math.round((Date.now() - Date.parse(mac.seenAt)) / 60000);
  const on = min <= 3;
  return { on, text: on ? (mac.busy ? "Mac açık, şu an bir video üretiyor" : "Mac açık ve hazır") : `Mac kapalı ya da uykuda (son görülme ${when(mac.seenAt)})` };
}

function RenderBox({ ep, mac, blockers, canApprove, busy, onApprove, onMove, onCancel, onShare }: { ep: EpisodeDetail; mac: { seenAt: string; busy: boolean } | null; blockers: string[]; canApprove: boolean; busy: boolean; onApprove: (target: "server" | "mac") => void; onMove: (id: number, target: "server" | "mac") => void; onCancel: (id: number) => void; onShare: () => void }) {
  const r = ep.render;
  const old = ep.video && ep.video.revision !== ep.revision ? ep.video : null;
  const m = macLabel(mac);
  const where = (x: RenderViewLike) => (x.target === "mac" ? "Mac" : "server");
  return (
    <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
      {!r || r.status === "cancelled" || r.status === "failed" ? (
        <div className="space-y-2">
          {r?.status === "failed" ? <Notice tone="bad" title="Üretim başarısız">{r.error ?? "bilinmeyen hata"}</Notice> : null}
          <div className="grid gap-2 @md:grid-cols-2">
            <button type="button" className={`${BTN.primary} w-full`} disabled={!canApprove || busy} onClick={() => onApprove("mac")}>Onayla, Mac&apos;te üret (~15 dk)</button>
            <button type="button" className={`${BTN.secondary} w-full`} disabled={!canApprove || busy} onClick={() => onApprove("server")}>Onayla, sunucuda üret (~1 sa)</button>
          </div>
          <p className="flex items-center gap-2"><span className="size-2 shrink-0 rounded-full" style={{ background: m.on ? TONE.ok : TONE.warn }} /><span className="muted">{m.text}. Mac kapalıysa iş bekler; sunucuya alabilirsin.</span></p>
          {blockers.length ? <p className="muted">{blockers.join(" ")}</p> : <p className="faint">1920×1080, 30 fps; dosyalar iki yolda da aynı yere gelir, Paylaşım aynı.</p>}
        </div>
      ) : r.status === "queued" ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2"><Badge tone="info">Sırada · {where(r)}</Badge><span className="muted">{r.requestedBy}</span><button type="button" className={BTN.small} onClick={() => onCancel(r.id)}>İptal</button></div>
          {r.target === "mac" ? (
            <p className="flex flex-wrap items-center gap-2"><span className="size-2 shrink-0 rounded-full" style={{ background: m.on ? TONE.ok : TONE.warn }} /><span className="muted">{m.text}.</span><button type="button" className={BTN.small} onClick={() => onMove(r.id, "server")}>Sunucuya al</button></p>
          ) : (
            <button type="button" className={BTN.small} onClick={() => onMove(r.id, "mac")}>Mac&apos;e al</button>
          )}
        </div>
      ) : r.status === "running" ? (
        <div className="space-y-1">
          <span>Video {where(r)} tarafında üretiliyor… %{Math.round((r.progress ?? 0) * 100)}</span>
          <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}><div className="h-full transition-all" style={{ width: `${Math.round((r.progress ?? 0) * 100)}%`, background: "var(--color-brand)" }} /></div>
        </div>
      ) : r.hasFiles ? (
        <div className="space-y-2">
          <p><Badge tone="ok">Video hazır</Badge> <span className="muted">{Math.floor((r.duration ?? 0) / 60)} dk {Math.round((r.duration ?? 0) % 60)} sn · {mb(r.bytes)} · {when(r.finishedAt)}</span></p>
          {ep.approved ? <button type="button" className={`${BTN.primary} w-full`} onClick={onShare}>Paylaşıma geç →</button> : files(r, true)}
        </div>
      ) : (
        <p className="muted">Bu sürümün dosyaları silinmiş (daha yeni bir üretim var).</p>
      )}
      {old ? (
        <div className="mt-3 space-y-1 border-t pt-2" style={{ borderColor: "var(--border)" }}>
          <p className="muted">Önceki sürümün videosu (s{old.revision}); metin o günden beri değişti:</p>
          {files(old, true)}
        </div>
      ) : null}
    </div>
  );
}

/** PAYLAŞIM: video + indirme, YouTube başlığı ve açıklaması (üretilen dosyadan, bölüm listesiyle), yayın saati, YouTube durumu. */
function Share({ ep, dirty, posts, setPosts, reload, setMsg, ytDraft, setYtDraft, onEdit, chapters }: {
  ep: EpisodeDetail; dirty: boolean; posts: SocialPost[]; setPosts: (f: (xs: SocialPost[]) => SocialPost[]) => void; reload: () => Promise<void>; setMsg: (m: Msg) => void; ytDraft: string; setYtDraft: (v: string) => void; onEdit: () => void; chapters: string[];
}) {
  const r = ep.render;
  const ready = ep.approved && r?.status === "done" && !!r.hasFiles;
  const [desc, setDesc] = useState<string | null>(null);
  useEffect(() => {
    if (!ready || !r) return;
    let dead = false;
    void apiFetch(`/api/studio/file/${r.id}?k=aciklama&inline=1`).then(async (res) => !dead && setDesc(res.ok ? (await res.text()).trim() : null));
    return () => {
      dead = true;
    };
  }, [ready, r]);
  return (
    <div className="grid gap-5 @5xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-5">
        <Panel title="Video">
          <div className="space-y-3 text-caption">
            {ready && r ? (
              <>
                <video className="aspect-video w-full rounded-tile bg-black" controls preload="metadata" poster={`/api/studio/file/${r.id}?k=kapak&inline=1`} src={`/api/studio/file/${r.id}?k=mp4&inline=1`} />
                {files(r, true)}
                <p className="faint">{Math.floor((r.duration ?? 0) / 60)} dk {Math.round((r.duration ?? 0) % 60)} sn · {mb(r.bytes)} · sürüm {r.revision}. İndirilen dosya sunucudakinin aynısı.</p>
              </>
            ) : (
              <Notice tone="warn" title={r?.status === "running" || r?.status === "queued" ? "Video üretiliyor" : "Video hazır değil"}>
                {r?.status === "running" ? `%${Math.round((r.progress ?? 0) * 100)} · ` : ""}Paylaşmak için güncel sürüm onaylanıp video üretilmeli.{" "}
                <button type="button" className="underline underline-offset-2" onClick={onEdit}>Senaryo ve onaya git</button>
              </Notice>
            )}
          </div>
        </Panel>
        <Panel title="Yayın saati" hint="Berlin saati; günde tek uzun video. Değiştirmek sürüm açmaz, onayı düşürmez.">
          <SlotBox ep={ep} onSaved={reload} setMsg={setMsg} />
        </Panel>
      </div>
      <div className="min-w-0 space-y-5">
        {dirty ? <Notice tone="warn">Senaryoda kaydedilmemiş değişiklik var; burada kayıtlı sürüm gösteriliyor.</Notice> : null}
        <Panel title="YouTube metinleri" hint="Başlık yayın bilgisi (sürüm açmaz). Açıklama üretilen videodan: bölümün metni + bölüm listesi (zaman damgaları) + kampanya bağlantısı + etiketler.">
          <div className="space-y-4 text-caption">
            <TitleBox ep={ep} value={ytDraft} setValue={setYtDraft} onSaved={reload} />
            <div className="space-y-1">
              <span className="flex items-center gap-2"><span className="muted">YouTube açıklaması</span><span className="ml-auto"><CopyButton text={desc ?? ""} /></span></span>
              <p className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-tile border px-3 py-2" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>{desc ?? <span className="faint">Video üretilince burada. Önizlemeye göre bölümler: {chapters.join(" · ")}</span>}</p>
            </div>
            <ul className="muted list-disc space-y-1 pl-4">
              <li>YouTube Studio: kapak olarak <span className="text-strong">Kapak 1280×720</span>; &quot;Hayır, çocuklara özel değil&quot;; &quot;Değiştirilmiş veya yapay içerik: Evet&quot; (sesler yapay).</li>
              <li>Görünürlük <span className="text-strong">Planla</span> → bölümün saati (Berlin). Takvim zamanlanan videoyu kendisi bulur.</li>
              <li>Bitiş ekranı: son 20 saniyede sağdaki boş kutuya &quot;video&quot;, soldaki daireye &quot;abone ol&quot; öğesi.</li>
            </ul>
          </div>
        </Panel>
        <Panel title="Platform">
          <PlatformBox episodeId={ep.id} platform="youtube" label="YouTube" auto={false} ready={ready} long copies={[{ label: "Başlığı kopyala", text: ep.ytTitle ?? "" }, { label: "Açıklamayı kopyala", text: desc ?? "" }]} post={posts.find((x) => x.platform === "youtube") ?? null} onSaved={(post) => setPosts((xs) => [...xs.filter((x) => x.platform !== "youtube"), ...(post ? [post] : [])])} />
          <details className="mt-3 text-caption">
            <summary className="muted cursor-pointer">TikTok denemesi (isteğe bağlı)</summary>
            <div className="mt-2">
              <PlatformBox episodeId={ep.id} platform="tiktok" label="TikTok (deneme)" auto={false} ready={ready} long copies={[{ label: "Açıklamayı kopyala", text: desc ?? "" }]} post={posts.find((x) => x.platform === "tiktok") ?? null} onSaved={(post) => setPosts((xs) => [...xs.filter((x) => x.platform !== "tiktok"), ...(post ? [post] : [])])} />
            </div>
          </details>
        </Panel>
      </div>
    </div>
  );
}

/** YouTube başlığı (uzun video): en çok 100 karakter, < > yok, #shorts YOK. */
function TitleBox({ ep, value, setValue, onSaved }: { ep: EpisodeDetail; value: string; setValue: (v: string) => void; onSaved: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const saved = ep.ytTitle ?? "";
  const changed = value.trim() !== saved;
  const local = !value.trim() ? "YouTube başlığı boş olamaz" : value.length > 100 ? `en çok 100 karakter (${value.length})` : /[<>]/.test(value) ? "< ve > olamaz" : /#shorts/i.test(value) ? "uzun videoda #shorts olmaz" : null;
  async function save(ytTitle: string | null) {
    setBusy(true);
    const r = await call(`/api/studio/episodes/${ep.id}`, { action: "yt_title", ytTitle });
    setBusy(false);
    if (!r.ok) return setMsg({ tone: "bad", text: errorText(r.data) });
    setValue((r.data.ytTitle as string | null) ?? "");
    await onSaved();
    setMsg({ tone: "ok", text: "YouTube başlığı kaydedildi." });
  }
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="flex flex-wrap items-center gap-1.5">
        <span className="muted">YouTube başlığı</span>
        {changed ? <Badge tone="warn">kaydedilmedi</Badge> : null}
        {ep.originYtTitle && saved !== ep.originYtTitle ? <span className="faint">Claude&apos;unkinden farklı</span> : null}
        <span className="faint ml-auto tabular-nums">{value.length}/100</span>
        <CopyButton text={changed ? "" : saved} />
      </span>
      <input aria-label="YouTube başlığı" className={FIELD} style={FIELD_STYLE} value={value} maxLength={100} onChange={(e) => { setMsg(null); setValue(e.target.value.replace(/[<>\n]/g, "")); }} />
      <span className="flex flex-wrap items-center gap-2">
        <span className="faint">Aramada en ağır alan: aranan konu başta, ilk ~60 karakter önerilerde görünür.</span>
        {changed ? (
          <span className="ml-auto flex gap-2">
            <button type="button" className={BTN.small} disabled={busy} onClick={() => { setMsg(null); setValue(saved); }}>Vazgeç</button>
            <button type="button" className={BTN.small} disabled={busy || !!local} onClick={() => void save(value.trim())}>Başlığı kaydet</button>
          </span>
        ) : ep.originYtTitle && saved !== ep.originYtTitle ? (
          <span className="ml-auto"><TwoStep small danger={false} label="Claude'un başlığına dön" confirm="Evet, dön" onConfirm={() => void save(null)} disabled={busy} /></span>
        ) : null}
      </span>
      {changed && local ? <span style={{ color: TONE.bad }}>{local}</span> : null}
      {msg ? <span style={{ color: TONE[msg.tone] }}>{msg.text}</span> : null}
    </div>
  );
}

function SlotBox({ ep, onSaved, setMsg }: { ep: EpisodeDetail; onSaved: () => Promise<void>; setMsg: (m: Msg) => void }) {
  const [day, setDay] = useState(ep.slot?.slice(0, 10) ?? "");
  const [time, setTime] = useState(ep.slot?.slice(11) ?? "19:00");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const next = day && /^\d{2}:\d{2}$/.test(time) ? `${day} ${time}` : null;
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
      <div className="flex flex-wrap items-end gap-2">
        <Field label="Gün"><input aria-label="Yayın günü" type="date" className={FIELD} style={FIELD_STYLE} value={day} onChange={(e) => setDay(e.target.value)} /></Field>
        <Field label="Saat"><input aria-label="Yayın saati" type="time" step={300} className={FIELD} style={FIELD_STYLE} value={time} onChange={(e) => setTime(e.target.value)} /></Field>
        <button type="button" className={BTN.small} disabled={busy || !next || next === ep.slot} onClick={() => void save(next)}>Saati kaydet</button>
        {ep.slot ? <TwoStep small danger={false} label="Takvimden çıkar" confirm="Evet, çıkar" onConfirm={() => void save(null)} disabled={busy} /> : null}
      </div>
      {warnings.length ? <div className="mt-2"><Notice tone="warn" title="Takvim uyarısı">{warnings.join(" · ")}</Notice></div> : null}
    </div>
  );
}
