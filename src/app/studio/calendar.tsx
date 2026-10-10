"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { EpisodeSummary } from "@/lib/studio";
import type { InstagramStatus, SocialPlatform, SocialPost, SocialStatus } from "@/lib/social-posts";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, BTN, Notice, TONE, type Tone } from "../admin/_ui/ui";
import { TwoStep } from "../admin/_ui/two-step";
import { APPROACH_SHORT, CONTENT_STATE, PLACED, PLATFORMS, POST_STATE, THEME_TR, contentState, postState, type PostShown } from "./shared";

/**
 * STÜDYO TAKVİMİ. Açılışta BUGÜNÜN haftası (Samet: "bugünün olduğu haftaya otomatik kaysın"); hafta hafta serbest
 * gezinme. Plan SÜRÜKLE-BIRAK ile değişir: kart boş ya da dolu bir saate bırakılır (doluysa iki bölüm yer
 * değiştirir), takvim dışına bırakılırsa saati kalkar. Geçmiş saatler bırakmayı kabul etmez. Her taşıma sunucuda
 * doğrulanır (`lib/studio` moveEpisode); sonuç, takvim uyarıları ve "Geri al" alttaki bildirimde. Saatler Berlin.
 */
const SLOTS = ["07:30", "12:30", "18:30"];
const TZ = "Europe/Berlin";
type Ep = EpisodeSummary;

const key = (episodeId: string, p: SocialPlatform) => `${episodeId}|${p}`;
function monday(day: string): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  const k = d.toISOString().slice(0, 10); // gün anahtarı, gösterim değil
  return k;
}
function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  const k = d.toISOString().slice(0, 10); // gün anahtarı, gösterim değil
  return k;
}
const berlinDay = (iso: string) => new Date(iso).toLocaleDateString("sv-SE", { timeZone: TZ });
/** "2026-10-12 07:30" Berlin → ms (o günün yaz/kış saati farkıyla). */
function slotMs(slot: string): number {
  const [d, t] = slot.split(" ");
  const guess = new Date(`${d}T${t}:00Z`);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = off.match(/GMT([+-])(\d{2}):(\d{2})/);
  return guess.getTime() - (m ? (m[1] === "+" ? 1 : -1) * (Number(m[2]) * 60 + Number(m[3])) : 0) * 60_000;
}
const weekday = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString("tr-TR", { weekday: "short", timeZone: "UTC" });
const dayNum = (day: string) => new Date(`${day}T12:00:00Z`).getUTCDate();
const rangeLabel = (a: string, b: string) => {
  const f = (d: string, o: Intl.DateTimeFormatOptions) => new Date(`${d}T12:00:00Z`).toLocaleDateString("tr-TR", { ...o, timeZone: "UTC" });
  return `${f(a, { day: "numeric", month: a.slice(5, 7) === b.slice(5, 7) ? undefined : "long" })} – ${f(b, { day: "numeric", month: "long", year: "numeric" })}`;
};
const slotLabel = (slot: string) => `${weekday(slot.slice(0, 10))} ${dayNum(slot.slice(0, 10))} · ${slot.slice(11)}`;
/** Videonun teması (kartın sol şeridi): video tasarımının kendi renkleri. */
const THEME_SWATCH: Record<string, string> = { gece: "#1b1b1f", kagit: "#e9dcc4", turuncu: "#f37021", lacivert: "#1f3a8a" };

type Toast = { tone: Tone; text: string; detail?: string[]; undo?: () => void } | null;

export function StudioCalendar({ episodes: initial, posts: initialPosts, missing, now, ig }: { episodes: Ep[]; posts: SocialPost[]; missing: boolean; now: string; ig: InstagramStatus }) {
  const [episodes, setEpisodes] = useState(initial);
  const [posts, setPosts] = useState(() => new Map(initialPosts.filter((p) => p.episodeId).map((p) => [key(p.episodeId as string, p.platform), p])));
  const nowMs = new Date(now).getTime();
  const today = berlinDay(now);
  const [week, setWeek] = useState(() => monday(today));
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!toast) return;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), toast.tone === "bad" ? 9000 : toast.detail?.length ? 12000 : 7000);
  }, [toast]);

  const planned = useMemo(() => episodes.filter((e) => e.slot).sort((a, b) => (a.slot as string).localeCompare(b.slot as string)), [episodes]);
  const loose = episodes.filter((e) => !e.slot);
  const bySlot = useMemo(() => new Map(planned.map((e) => [e.slot as string, e])), [planned]);
  const days = Array.from({ length: 7 }, (_, i) => addDays(week, i));
  const weekEps = planned.filter((e) => days.includes((e.slot as string).slice(0, 10)));
  const shown = (e: Ep, p: SocialPlatform): PostShown => postState(posts.get(key(e.id, p))?.status, !!e.slot && slotMs(e.slot) < nowMs);
  const count = (eps: Ep[], p: SocialPlatform, ...st: PostShown[]) => eps.filter((e) => st.includes(shown(e, p))).length;
  const past = (slot: string) => slotMs(slot) <= nowMs;
  const movable = (e: Ep) => !(e.slot && past(e.slot)) || PLATFORMS.every((p) => shown(e, p.key) !== "published");

  const overdue = planned.filter((e) => PLATFORMS.some((p) => shown(e, p.key) === "overdue"));
  const failed = planned.filter((e) => shown(e, "instagram") === "failed");
  /** Toplu işaretin hedefi: Instagram bağlıysa otomatik yayın, değilse "zamanlandı" (platformun kendi zamanlayıcısı). */
  const bulkTarget = (p: SocialPlatform): SocialStatus => (p === "instagram" && ig.connected ? "auto" : "scheduled");
  const notReady = planned.filter((e) => {
    const t = slotMs(e.slot as string);
    return t > nowMs && t - nowMs < 3 * 86_400_000 && !(e.render?.status === "done" && e.render.hasFiles);
  });
  const last = planned[planned.length - 1];
  const daysLeft = last ? Math.floor((slotMs(last.slot as string) - nowMs) / 86_400_000) : -1;

  /** Yerelde uygula (sunucu onaylayınca kalıcı; hata olursa geri). */
  function applyMove(id: string, slot: string | null, from: string | null, swapped: string | null) {
    setEpisodes((xs) => xs.map((e) => (e.id === id ? { ...e, slot } : swapped && e.id === swapped ? { ...e, slot: from } : e)));
  }

  async function move(id: string, slot: string | null, opts: { undo?: boolean } = {}) {
    const ep = episodes.find((e) => e.id === id);
    if (!ep || busy || ep.slot === slot) return;
    const from = ep.slot;
    const occupant = slot ? bySlot.get(slot) : undefined;
    applyMove(id, slot, from, occupant?.id ?? null); // iyimser
    setBusy(true);
    let data: { error?: string; detail?: unknown; warnings?: string[]; swapped?: string | null; from?: string | null } = {};
    let ok = false;
    try {
      const res = await apiFetch("/api/studio/plan", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "move", id, slot }) });
      data = await res.json().catch(() => ({}));
      ok = res.ok;
    } catch {
      data = { error: "network" };
    }
    setBusy(false);
    if (!ok) {
      setEpisodes((xs) => xs.map((e) => (e.id === id ? { ...e, slot: from } : occupant && e.id === occupant.id ? { ...e, slot } : e))); // geri al
      const text = data.error === "past" ? String(data.detail) : data.error === "admin_2fa_required" ? adminErrorText(data.error) : `Taşınamadı: ${adminErrorText(data.error ?? "failed")}`;
      setToast({ tone: "bad", text });
      return;
    }
    const swapped = data.swapped ?? null;
    if (swapped !== (occupant?.id ?? null)) applyMove(id, slot, from, swapped); // sunucunun gördüğü (başkası değiştirdiyse)
    const what = `„${ep.title}“`;
    const text = opts.undo
      ? `Geri alındı: ${what} ${from ? slotLabel(from) : "takvim dışı"} → ${slot ? slotLabel(slot) : "takvim dışı"}`
      : slot
        ? `${what} → ${slotLabel(slot)}${swapped ? ` (yer değiştirdi: „${episodes.find((e) => e.id === swapped)?.title ?? swapped}“ → ${from ? slotLabel(from) : "takvim dışı"})` : ""}`
        : `${what} takvim dışına alındı`;
    setToast({ tone: data.warnings?.length ? "warn" : "ok", text, detail: data.warnings, undo: opts.undo ? undefined : () => void move(id, from, { undo: true }) });
  }

  async function bulk(platform: SocialPlatform) {
    const ids = weekEps.filter((e) => shown(e, platform) === "planned").map((e) => e.id);
    if (!ids.length) return;
    const target = bulkTarget(platform);
    let done = 0;
    setBusy(true);
    try {
      const res = await apiFetch("/api/studio/posts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "bulk", episodeIds: ids, platform, status: target }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; count?: number };
      if (!res.ok) return setToast({ tone: "bad", text: adminErrorText(data.error ?? res.status) });
      done = data.count ?? ids.length;
    } catch {
      return setToast({ tone: "bad", text: adminErrorText("network") });
    } finally {
      setBusy(false);
    }
    const at = new Date().toISOString();
    setPosts((m) => {
      const n = new Map(m);
      for (const id of ids) n.set(key(id, platform), { ...(n.get(key(id, platform)) ?? { episodeId: id, platform, url: null, externalId: null, publishedAt: null, metrics: null, metricsAt: null, note: null, job: null, updatedBy: null }), status: target, updatedAt: at });
      return n;
    });
    const label = PLATFORMS.find((p) => p.key === platform)?.label;
    setToast({ tone: done < ids.length ? "warn" : "ok", text: target === "auto" ? `${done} video ${label}'da saatinde otomatik yayınlanacak.${done < ids.length ? ` ${ids.length - done} tanesi atlandı (saati geçmiş).` : ""}` : `${done} bölüm ${label}'ta zamanlandı olarak işaretlendi.` });
  }

  const drop = (slot: string | null) => (ev: React.DragEvent) => {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text/x-episode") || drag;
    setDrag(null);
    setOver(null);
    if (id) void move(id, slot);
  };
  const allow = (slot: string | null) => (ev: React.DragEvent) => {
    if (!drag) return;
    if (slot && past(slot)) return; // geçmiş saat: bırakılamaz (imleç "yasak" gösterir)
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    setOver(slot ?? "loose");
  };
  const readyCount = weekEps.filter((e) => e.render?.status === "done" && e.render.hasFiles).length;

  return (
    <AdminPage>
      {/* başlık: hafta ve gezinme */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="muted text-caption">Sosyal medya takvimi · günde 3 video · Berlin saati</p>
          <h1 className="text-h2">{rangeLabel(days[0], days[6])}</h1>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className={BTN.small} aria-label="Önceki hafta" onClick={() => setWeek(addDays(week, -7))}>‹</button>
          <button type="button" className={BTN.small} aria-pressed={week === monday(today)} onClick={() => setWeek(monday(today))}>Bugün</button>
          <button type="button" className={BTN.small} aria-label="Sonraki hafta" onClick={() => setWeek(addDays(week, 7))}>›</button>
        </div>
      </div>

      {/* haftanın özeti */}
      <div className="flex flex-wrap gap-2 text-caption">
        <Pill label="Bu hafta" value={`${weekEps.length} video`} />
        <Pill label="Video hazır" value={`${readyCount}/${weekEps.length}`} tone={weekEps.length && readyCount < weekEps.length ? "warn" : weekEps.length ? "ok" : undefined} />
        {PLATFORMS.map((p) => (
          <Pill key={p.key} label={p.label} value={`${count(weekEps, p.key, ...PLACED)}/${weekEps.length} ${p.key === "instagram" && ig.connected ? "sırada" : "zamanlandı"}`} tone={count(weekEps, p.key, "planned") ? "warn" : weekEps.length ? "ok" : undefined} />
        ))}
        <IgPill ig={ig} />
        {PLATFORMS.map((p) => {
          const n = count(weekEps, p.key, "planned");
          if (!n) return null;
          return bulkTarget(p.key) === "auto" ? (
            <TwoStep key={p.key} small danger={false} disabled={busy || missing} label={`${p.label}: ${n} videoyu otomatik yayına al`} confirm={`Evet, ${n} video saatinde yayınlansın`} onConfirm={() => void bulk(p.key)} />
          ) : (
            <TwoStep key={p.key} small danger={false} disabled={busy || missing} label={`${p.label}: ${n} videoyu zamanlandı işaretle`} confirm={`Evet, ${n} video ${p.label}'ta zamanlandı`} onConfirm={() => void bulk(p.key)} />
          );
        })}
      </div>
      {ig.connected ? <p className="faint text-caption">Instagram otomatik: saatinde Lernomi yayınlar. Şart: güncel sürüm onaylı ve videosu hazır. Hazır değilse 3 saat bekler, sonra “Yayınlanamadı” der ve Telegram&apos;a yazar. Platformda elle paylaşılan video saatinden tanınır, ikinci kez gönderilmez.</p> : null}

      {missing ? <Notice tone="bad" title="Stüdyo tabloları okunamadı">Göç uygulanmamış olabilir (drizzle/0085_social_studio.sql).</Notice> : null}
      {notReady.length ? <Alert tone="warn" title={`3 gün içinde yayınlanacak, videosu hazır değil: ${notReady.length}`} items={notReady} hint="Onaylanmamış, sesi bekleyen ya da metni onaydan sonra değişmiş." /> : null}
      {failed.length ? <Alert tone="bad" title={`Instagram'da otomatik yayınlanamadı: ${failed.length}`} items={failed} hint="Bölümü aç: sebebi Yayın kutusunda. Düzeltip durumu yeniden “Otomatik” yaparsan tekrar dener; elle paylaştıysan bağlantıyla “Yayında”." /> : null}
      {overdue.length ? <Alert tone="warn" title={`Saati geçti, yayında işaretlenmedi: ${overdue.length}`} items={overdue} hint="Platformda yayınlandıysa bağlantıyla “Yayında”, yayınlanmadıysa “Atlandı” işaretle." /> : null}
      {last && daysLeft < 7 ? <Notice tone={daysLeft < 3 ? "bad" : "warn"} title={daysLeft < 0 ? "Plan bitti" : `Plan ${daysLeft} gün sonra bitiyor`}>Claude&apos;dan yeni iki haftalık parti iste.</Notice> : null}

      {/* ızgara */}
      <div className="overflow-x-auto rounded-panel border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="grid min-w-[62rem]" style={{ gridTemplateColumns: "3.5rem repeat(7, minmax(0, 1fr))" }}>
          <div className="border-b" style={{ borderColor: "var(--border)" }} />
          {days.map((d) => {
            const isToday = d === today;
            return (
              <div key={d} className="flex items-center gap-2 border-b border-l px-3 py-2" style={{ borderColor: "var(--border)", background: isToday ? "var(--brand-soft)" : undefined, opacity: d < today ? 0.6 : 1 }}>
                <span className="muted text-micro uppercase tracking-eyebrow">{weekday(d)}</span>
                <span className={`grid size-7 place-items-center rounded-full text-caption text-strong ${isToday ? "on-fill" : ""}`} style={isToday ? { background: TONE.info } : undefined}>{dayNum(d)}</span>
                {isToday ? <span className="text-micro" style={{ color: TONE.info }}>bugün</span> : null}
              </div>
            );
          })}
          {SLOTS.map((t) => (
            <Row key={t} t={t} days={days} today={today} bySlot={bySlot} shown={shown} past={past} drag={drag} over={over} movable={movable} setDrag={setDrag} setOver={setOver} allow={allow} drop={drop} />
          ))}
        </div>
      </div>

      {/* takvim dışı */}
      <div
        className="rounded-panel border border-dashed p-3 transition-colors"
        style={{ borderColor: over === "loose" ? TONE.info : "var(--border)", background: over === "loose" ? "var(--brand-soft)" : "transparent" }}
        onDragOver={allow(null)}
        onDragLeave={() => setOver(null)}
        onDrop={drop(null)}
      >
        <p className="muted mb-2 text-caption">Takvim dışı ({loose.length}) · bir videoyu takvimden çıkarmak için buraya bırak, buradan bir saate sürükle.</p>
        <div className="flex flex-wrap gap-2">
          {loose.map((e) => <Card key={e.id} e={e} shown={shown} drag={drag} movable setDrag={setDrag} setOver={setOver} compact />)}
        </div>
      </div>

      <p className="faint text-caption">Kartı tutup başka bir saate sürükle: o saat doluysa iki video yer değiştirir. Geçmiş saatlere bırakılamaz. Karta tıkla: metinleri düzenle, önizle, onayla.</p>

      {toast ? (
        <div role={toast.tone === "bad" ? "alert" : "status"} className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(92vw,34rem)] rounded-panel border p-3 shadow-lg" style={{ borderColor: TONE[toast.tone], background: "var(--surface)" }}>
          <div className="flex items-start gap-3">
            <span className="mt-1 size-2.5 shrink-0 rounded-full" style={{ background: TONE[toast.tone] }} />
            <div className="min-w-0 flex-1 text-caption">
              <p className="text-strong">{toast.text}</p>
              {toast.detail?.length ? <ul className="muted mt-1 list-disc pl-4">{toast.detail.map((d) => <li key={d}>{d}</li>)}</ul> : null}
            </div>
            {toast.undo ? <button type="button" className={BTN.small} onClick={() => { const u = toast.undo; setToast(null); u?.(); }}>Geri al</button> : null}
            <button type="button" className={BTN.small} aria-label="Kapat" onClick={() => setToast(null)}>×</button>
          </div>
        </div>
      ) : null}
    </AdminPage>
  );
}

function Pill({ label, value, tone }: { label: string; value: string; tone?: Tone }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1" style={{ borderColor: tone ? TONE[tone] : "var(--border)", background: "var(--surface)" }}>
      <span className="muted">{label}</span>
      <span className="text-strong" style={tone ? { color: TONE[tone] } : undefined}>{value}</span>
    </span>
  );
}

/** Instagram API bağlantısı (işçinin durum dosyası): bağlı mı, belirteç kaç gün, son eşitleme. */
function IgPill({ ig }: { ig: InstagramStatus }) {
  if (!ig.connected) return <Pill label="Instagram API" value="bağlı değil" />;
  const sync = ig.lastSyncAt ? new Date(ig.lastSyncAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: TZ }) : "—";
  const bad = !ig.ok || ig.stale;
  const warn = ig.tokenDays != null && ig.tokenDays < 10;
  const value = bad ? (ig.stale ? "işçi durmuş" : "bağlantı hatası") : `@${ig.username ?? "?"} · eşitleme ${sync}`;
  const title = [ig.error, ig.tokenDays != null ? `Belirteç ${ig.tokenDays} gün geçerli (kendiliğinden yenilenir)` : null].filter(Boolean).join(" · ");
  return (
    <span title={title} aria-label={`Instagram API: ${value}${title ? ` · ${title}` : ""}`}>
      <Pill label="Instagram API" value={value} tone={bad ? "bad" : warn ? "warn" : "ok"} />
    </span>
  );
}

function Alert({ tone, title, items, hint }: { tone: Tone; title: string; items: Ep[]; hint: string }) {
  return (
    <Notice tone={tone} title={title}>
      {hint}{" "}
      {items.slice(0, 6).map((e, i) => (
        <span key={e.id}>
          {i ? " · " : ""}
          <Link className="underline underline-offset-2" href={`/studio/${e.id}`}>{e.slot ? slotLabel(e.slot) : ""} {e.title}</Link>
        </span>
      ))}
    </Notice>
  );
}

function Row({ t, days, today, bySlot, shown, past, drag, over, movable, setDrag, setOver, allow, drop }: {
  t: string; days: string[]; today: string; bySlot: Map<string, Ep>; shown: (e: Ep, p: SocialPlatform) => PostShown; past: (slot: string) => boolean;
  drag: string | null; over: string | null; movable: (e: Ep) => boolean; setDrag: (id: string | null) => void; setOver: (s: string | null) => void;
  allow: (slot: string | null) => (ev: React.DragEvent) => void; drop: (slot: string | null) => (ev: React.DragEvent) => void;
}) {
  return (
    <>
      <div className="muted border-t px-2 pt-3 text-right font-mono text-micro" style={{ borderColor: "var(--border)" }}>{t}</div>
      {days.map((d) => {
        const slot = `${d} ${t}`;
        const e = bySlot.get(slot);
        const isPast = past(slot);
        const target = over === slot;
        return (
          <div
            key={d}
            className="min-h-[7.5rem] border-l border-t p-1.5 transition-colors"
            style={{
              borderColor: "var(--border)",
              background: target ? "var(--brand-soft)" : d === today ? "color-mix(in srgb, var(--brand-soft) 45%, transparent)" : undefined,
              outline: target ? `1px dashed ${TONE.info}` : undefined,
              outlineOffset: -4,
              opacity: drag && isPast ? 0.45 : 1,
            }}
            onDragOver={allow(slot)}
            onDragLeave={() => over === slot && setOver(null)}
            onDrop={drop(slot)}
          >
            {e ? <Card e={e} shown={shown} drag={drag} movable={movable(e)} setDrag={setDrag} setOver={setOver} /> : drag && !isPast ? <div className="faint grid h-full min-h-[6.5rem] place-items-center text-micro">buraya bırak</div> : null}
          </div>
        );
      })}
    </>
  );
}

function Card({ e, shown, drag, movable, setDrag, setOver, compact }: { e: Ep; shown: (e: Ep, p: SocialPlatform) => PostShown; drag: string | null; movable: boolean; setDrag: (id: string | null) => void; setOver: (s: string | null) => void; compact?: boolean }) {
  const cs = contentState(e);
  const tone = CONTENT_STATE[cs.key].tone;
  return (
    <Link
      href={`/studio/${e.id}`}
      draggable={movable}
      onDragStart={(ev) => {
        ev.dataTransfer.setData("text/x-episode", e.id);
        ev.dataTransfer.effectAllowed = "move";
        setDrag(e.id);
      }}
      onDragEnd={() => {
        setDrag(null);
        setOver(null);
      }}
      className={`group flex min-w-0 overflow-hidden rounded-tile border text-left shadow-sm transition hover:shadow-md ${movable ? "cursor-grab active:cursor-grabbing" : ""} ${compact ? "w-56" : "h-full"}`}
      style={{ borderColor: "var(--border)", background: "var(--surface)", opacity: drag === e.id ? 0.4 : 1 }}
    >
      <span className="w-1.5 shrink-0" style={{ background: THEME_SWATCH[e.theme] ?? "var(--border)" }} title={`Tema: ${THEME_TR[e.theme] ?? e.theme}`} role="img" aria-label={`Tema: ${THEME_TR[e.theme] ?? e.theme}`} />
      <span className="flex min-w-0 flex-1 flex-col gap-1.5 p-2">
        <span className="muted truncate text-micro uppercase tracking-eyebrow">{APPROACH_SHORT[e.approach] ?? e.approach} · {THEME_TR[e.theme] ?? e.theme}</span>
        <span className="line-clamp-2 text-caption text-strong">{e.title}</span>
        <span className="mt-auto flex items-center justify-between gap-1">
          <span className="truncate rounded-full px-2 py-0.5 text-micro" style={{ color: tone ? TONE[tone] : "var(--text-muted)", background: `color-mix(in srgb, ${tone ? TONE[tone] : "var(--text-muted)"} 12%, transparent)` }}>{cs.label}</span>
          <span className="flex shrink-0 gap-1">
            {PLATFORMS.map((p) => {
              const s = shown(e, p.key);
              const c = POST_STATE[s].tone;
              return (
                <span key={p.key} title={`${p.label}: ${POST_STATE[s].label}`} aria-label={`${p.label}: ${POST_STATE[s].label}`} className={`grid size-5 place-items-center rounded-full text-micro ${c ? "on-fill" : "muted"}`} style={{ background: c ? TONE[c] : "var(--surface-2)" }}>
                  {p.short[0]}
                </span>
              );
            })}
          </span>
        </span>
      </span>
    </Link>
  );
}
