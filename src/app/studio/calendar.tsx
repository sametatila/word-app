"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { EpisodeSummary } from "@/lib/studio";
import type { PlatformApiStatus, SocialPlatform, SocialPost, SocialStatus } from "@/lib/social-posts";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, BTN, Notice, TONE, type Tone } from "../admin/_ui/ui";
import { TwoStep } from "../admin/_ui/two-step";
import { ApiStatus } from "./api-status";
import { APPROACH_SHORT, CONTENT_STATE, LONG_SERIES_SHORT, PLACED, PLATFORMS, POST_STATE, THEME_TR, contentState, postState, type PostShown } from "./shared";

/**
 * STÜDYO TAKVİMİ. Açılışta BUGÜNÜN haftası (Samet: "bugünün olduğu haftaya otomatik kaysın"); hafta hafta serbest
 * gezinme. Plan SÜRÜKLE-BIRAK ile değişir: kart boş ya da dolu bir saate bırakılır (doluysa iki bölüm yer
 * değiştirir), takvim dışına bırakılırsa saati kalkar. Geçmiş saatler bırakmayı kabul etmez. Her taşıma sunucuda
 * doğrulanır (`lib/studio` moveEpisode); sonuç, takvim uyarıları ve "Geri al" alttaki bildirimde. Saatler Berlin.
 * UZUN VİDEO (yatay, YouTube; 2026-10-13): üç saatin altında ayrı şerit, gün başına bir video; kart yalnız şerit içinde
 * gün değiştirir (saatini korur), kısa video şeride, uzun video saat satırlarına bırakılamaz. Yalnız YouTube sayılır.
 */
const SLOTS = ["07:30", "12:30", "18:30"];
const LONG_TIME = "19:00";
const isLong = (e: { format?: string }) => e.format === "yatay";
/** Uzun video yalnız YouTube'da (TikTok denemesi isteğe bağlı, takvimde sayılmaz). */
const platformsOf = (e: { format?: string }) => (isLong(e) ? PLATFORMS.filter((p) => p.key === "youtube") : PLATFORMS);
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

export function StudioCalendar({ week: initialWeek, episodes: initial, posts: initialPosts, missing, now, ig, tt, yt }: { week?: string; episodes: Ep[]; posts: SocialPost[]; missing: boolean; now: string; ig: PlatformApiStatus; tt: PlatformApiStatus; yt: PlatformApiStatus }) {
  const toMap = (xs: SocialPost[]) => new Map(xs.filter((p) => p.episodeId).map((p) => [key(p.episodeId as string, p.platform), p]));
  const [episodes, setEpisodes] = useState(initial);
  const [posts, setPosts] = useState(() => toMap(initialPosts));
  const nowMs = new Date(now).getTime();
  const today = berlinDay(now);
  const [week, setWeekState] = useState(() => monday(initialWeek ?? today));
  // hafta adreste (?hafta=): bölüme girip geri dönünce, sayfa tazelenince aynı hafta açılsın; bu hafta parametresiz
  const setWeek = (w: string) => {
    setWeekState(w);
    window.history.replaceState(null, "", w === monday(today) ? window.location.pathname : `?hafta=${w}`);
  };
  // adresten gelen hafta değişirse (menüden "Takvim", editörden "← Takvime dön") ona geç
  const [seenWeek, setSeenWeek] = useState(initialWeek);
  if (seenWeek !== initialWeek) {
    setSeenWeek(initialWeek);
    setWeekState(monday(initialWeek ?? today));
  }
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // sayfa tazelenince (StudioRefresh) sunucunun güncel verisi; sürükleme/kayıt sürerken ve yerel değişiklikten hemen
  // sonra değil (o anki istek eski veriyi getirmiş olabilir: yerel hâl birkaç saniye korunur)
  const touched = useRef(0);
  const [fresh, setFresh] = useState({ initial, initialPosts });
  if (fresh.initial !== initial || fresh.initialPosts !== initialPosts) {
    if (!drag && !busy && Date.now() - touched.current > 5_000) {
      setFresh({ initial, initialPosts });
      setEpisodes(initial);
      setPosts(toMap(initialPosts));
    }
  }
  useEffect(() => {
    if (!toast) return;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), toast.tone === "bad" ? 9000 : toast.detail?.length ? 12000 : 7000);
  }, [toast]);

  const all = useMemo(() => episodes.filter((e) => e.slot).sort((a, b) => (a.slot as string).localeCompare(b.slot as string)), [episodes]);
  const planned = useMemo(() => all.filter((e) => !isLong(e)), [all]);
  const longs = useMemo(() => all.filter(isLong), [all]);
  const loose = episodes.filter((e) => !e.slot);
  const bySlot = useMemo(() => new Map(planned.map((e) => [e.slot as string, e])), [planned]);
  const longByDay = useMemo(() => new Map(longs.map((e) => [(e.slot as string).slice(0, 10), e])), [longs]);
  const days = Array.from({ length: 7 }, (_, i) => addDays(week, i));
  const weekEps = planned.filter((e) => days.includes((e.slot as string).slice(0, 10)));
  const weekLongs = longs.filter((e) => days.includes((e.slot as string).slice(0, 10)));
  const dragged = drag ? episodes.find((e) => e.id === drag) : undefined;
  const dragLong = dragged ? isLong(dragged) : false;
  const dragTime = dragLong && dragged?.slot ? dragged.slot.slice(11) : LONG_TIME;
  const shown = (e: Ep, p: SocialPlatform): PostShown => postState(posts.get(key(e.id, p))?.status, !!e.slot && slotMs(e.slot) < nowMs);
  const count = (eps: Ep[], p: SocialPlatform, ...st: PostShown[]) => eps.filter((e) => st.includes(shown(e, p))).length;
  const past = (slot: string) => slotMs(slot) <= nowMs;
  const movable = (e: Ep) => !(e.slot && past(e.slot)) || platformsOf(e).every((p) => shown(e, p.key) !== "published");

  const overdue = all.filter((e) => platformsOf(e).some((p) => shown(e, p.key) === "overdue"));
  const failed = planned.filter((e) => shown(e, "instagram") === "failed");
  /** Toplu işaretin hedefi: Instagram bağlıysa otomatik yayın, değilse "zamanlandı" (platformun kendi zamanlayıcısı). */
  const bulkTarget = (p: SocialPlatform): SocialStatus => (p === "instagram" && ig.connected ? "auto" : "scheduled");
  const notReady = all.filter((e) => {
    const t = slotMs(e.slot as string);
    return t > nowMs && t - nowMs < 3 * 86_400_000 && !(e.render?.status === "done" && e.render.hasFiles);
  });
  const last = planned[planned.length - 1];
  const daysLeft = last ? Math.floor((slotMs(last.slot as string) - nowMs) / 86_400_000) : -1;

  /** Yerelde uygula (sunucu onaylayınca kalıcı; hata olursa geri). */
  function applyMove(id: string, slot: string | null, from: string | null, swapped: string | null) {
    touched.current = Date.now();
    setEpisodes((xs) => xs.map((e) => (e.id === id ? { ...e, slot } : swapped && e.id === swapped ? { ...e, slot: from } : e)));
  }

  async function move(id: string, slot: string | null, opts: { undo?: boolean } = {}) {
    const ep = episodes.find((e) => e.id === id);
    if (!ep || busy || ep.slot === slot) return;
    const from = ep.slot;
    const occupant = slot ? (isLong(ep) ? longByDay.get(slot.slice(0, 10)) : bySlot.get(slot)) : undefined;
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
    touched.current = Date.now();
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
    if (slot && dragLong !== !SLOTS.includes(slot.slice(11))) return; // uzun video yalnız şeride, kısa video yalnız saatlere
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    setOver(slot ?? "loose");
  };
  const readyCount = weekEps.filter((e) => e.render?.status === "done" && e.render.hasFiles).length;

  return (
    <AdminPage>
      {/* başlık: hafta, gezinme, API bağlantıları */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-h2">{rangeLabel(days[0], days[6])}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="muted text-caption">Günde 3 video · Berlin saati</span>
            <ApiStatus items={[{ platform: "tiktok", ...tt }, { platform: "instagram", ...ig }, { platform: "youtube", ...yt }]} />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className={BTN.small} aria-label="Önceki hafta" onClick={() => setWeek(addDays(week, -7))}>‹</button>
          <button type="button" className={BTN.small} aria-pressed={week === monday(today)} onClick={() => setWeek(monday(today))}>Bugün</button>
          <button type="button" className={BTN.small} aria-label="Sonraki hafta" onClick={() => setWeek(addDays(week, 7))}>›</button>
        </div>
      </div>

      {/* haftanın özeti: video hazır + platform başına ilerleme; kalanlar için toplu işlem hücrenin içinde */}
      <section aria-label="Bu hafta" className="overflow-hidden rounded-panel border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        {/* 1 px aralık + kenarlık rengi zemin: hücre çizgileri her kırılımda doğru */}
        <div className="grid grid-cols-2 gap-px @3xl:grid-cols-5" style={{ background: "var(--border)" }}>
          <WeekCell label="Video hazır" done={readyCount} total={weekEps.length} unit="hazır" />
          <WeekCell label="Uzun video (YouTube)" done={weekLongs.filter((e) => e.render?.status === "done" && e.render.hasFiles).length} total={weekLongs.length} unit="hazır" />
          {PLATFORMS.map((p) => {
            const n = count(weekEps, p.key, "planned");
            const auto = bulkTarget(p.key) === "auto";
            // YouTube'da zamanlanan Short kendiliğinden bulunur: elle işaret gerekmez
            const action = !n || (p.key === "youtube" && yt.connected) ? null : (
              <TwoStep small danger={false} disabled={busy || missing} label={auto ? `Otomatiğe al (${n})` : `Zamanlandı yap (${n})`} confirm={auto ? `Evet, ${n} video saatinde yayınlansın` : `Evet, ${n} video zamanlandı`} onConfirm={() => void bulk(p.key)} />
            );
            return <WeekCell key={p.key} label={p.label} done={count(weekEps, p.key, ...PLACED)} total={weekEps.length} unit={p.key === "instagram" && ig.connected ? "sırada" : "zamanlandı"} action={action} />;
          })}
        </div>
        <details className="border-t px-4 py-2 text-caption" style={{ borderColor: "var(--border)" }}>
          <summary className="muted cursor-pointer">Platformlar nasıl işliyor?</summary>
          <ul className="muted mt-2 list-disc space-y-1 pl-4">
            {ig.connected ? <li><span className="text-strong">Instagram</span> “Otomatik”: saatinde Lernomi yayınlar. Şart: güncel sürüm onaylı ve videosu hazır; değilse 3 saat bekler, sonra “Yayınlanamadı” der ve Telegram&apos;a yazar. Elle paylaşılan video saatinden tanınır, ikinci kez gönderilmez.</li> : null}
            <li><span className="text-strong">TikTok</span>: zamanlayıcıya koyunca “Zamanlandı” + bağlantı; yayına çıkınca kendiliğinden “Yayında”.</li>
            {yt.connected ? <li><span className="text-strong">YouTube</span>: Short&apos;u YouTube Studio&apos;da bölümün saatine zamanla (başlık ve açıklama bölümün Paylaşım sekmesinde); takvim kendiliğinden “Zamanlandı”, sonra “Yayında” olur.</li> : null}
            <li>Üçünde de saatinden 20 dk sonra yayında değilse Telegram&apos;a uyarı gider.</li>
          </ul>
        </details>
      </section>

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
          <LongRow days={days} today={today} byDay={longByDay} shown={shown} past={past} drag={drag} dragLong={dragLong} dragTime={dragTime} over={over} movable={movable} setDrag={setDrag} setOver={setOver} allow={allow} drop={drop} />
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

/** Haftanın bir göstergesi: "5/21 zamanlandı" + ince ilerleme çubuğu; eksik varsa turuncu, tamamsa yeşil. */
function WeekCell({ label, done, total, unit, action }: { label: string; done: number; total: number; unit: string; action?: React.ReactNode }) {
  const tone: Tone | undefined = !total ? undefined : done < total ? "warn" : "ok";
  const color = tone ? TONE[tone] : "var(--text-muted)";
  return (
    <div className="flex min-w-0 flex-col gap-1.5 px-4 py-3" style={{ background: "var(--surface)" }}>
      <span className="muted text-caption">{label}</span>
      <span className="flex items-baseline gap-1.5">
        <span className="text-h3 tabular-nums" style={{ color }}>{done}</span>
        <span className="muted text-caption tabular-nums">/ {total} {unit}</span>
      </span>
      <span className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <span className="block h-full rounded-full" style={{ width: total ? `${Math.round((done / total) * 100)}%` : 0, background: color }} />
      </span>
      {action ? <span className="pt-0.5">{action}</span> : null}
    </div>
  );
}

function Alert({ tone, title, items, hint }: { tone: Tone; title: string; items: Ep[]; hint: string }) {
  const max = 6;
  return (
    <Notice tone={tone} title={title}>
      <p className="muted text-caption">{hint}</p>
      <ul className="mt-2 grid gap-x-4 gap-y-1 text-caption @2xl:grid-cols-2 @5xl:grid-cols-3">
        {items.slice(0, max).map((e) => (
          <li key={e.id} className="flex min-w-0 items-baseline gap-2">
            <span className="muted shrink-0 tabular-nums">{e.slot ? slotLabel(e.slot) : ""}</span>
            <Link className="truncate underline underline-offset-2" href={`/studio/${e.id}`}>{e.title}</Link>
          </li>
        ))}
        {items.length > max ? <li className="muted">+{items.length - max} daha</li> : null}
      </ul>
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

/** Uzun video şeridi: gün başına bir video; boş güne bırakılan video saatini korur (yoksa 19:00). */
function LongRow({ days, today, byDay, shown, past, drag, dragLong, dragTime, over, movable, setDrag, setOver, allow, drop }: {
  days: string[]; today: string; byDay: Map<string, Ep>; shown: (e: Ep, p: SocialPlatform) => PostShown; past: (slot: string) => boolean; drag: string | null; dragLong: boolean; dragTime: string;
  over: string | null; movable: (e: Ep) => boolean; setDrag: (id: string | null) => void; setOver: (s: string | null) => void;
  allow: (slot: string | null) => (ev: React.DragEvent) => void; drop: (slot: string | null) => (ev: React.DragEvent) => void;
}) {
  return (
    <>
      <div className="border-t px-1 pt-3 text-right text-micro" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--surface-2) 60%, transparent)" }}>
        <span className="muted block font-mono">uzun</span>
        <span className="faint block">YouTube</span>
      </div>
      {days.map((d) => {
        const e = byDay.get(d);
        const slot = `${d} ${e?.slot?.slice(11) ?? dragTime}`;
        const isPast = past(`${d} 23:59`);
        const target = over === slot;
        return (
          <div
            key={d}
            className="min-h-[6.5rem] border-l border-t p-1.5 transition-colors"
            style={{ borderColor: "var(--border)", background: target ? "var(--brand-soft)" : d === today ? "color-mix(in srgb, var(--brand-soft) 45%, transparent)" : "color-mix(in srgb, var(--surface-2) 60%, transparent)", outline: target ? `1px dashed ${TONE.info}` : undefined, outlineOffset: -4, opacity: drag && (isPast || !dragLong) ? 0.45 : 1 }}
            onDragOver={allow(slot)}
            onDragLeave={() => over === slot && setOver(null)}
            onDrop={drop(slot)}
          >
            {e ? <Card e={e} shown={shown} drag={drag} movable={movable(e)} setDrag={setDrag} setOver={setOver} /> : drag && dragLong && !isPast ? <div className="faint grid h-full min-h-[5.5rem] place-items-center text-micro">buraya bırak</div> : null}
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
        <span className="muted truncate text-micro uppercase tracking-eyebrow">{isLong(e) ? `Uzun · ${LONG_SERIES_SHORT[e.template] ?? e.template} · ${e.slot?.slice(11) ?? ""}` : `${APPROACH_SHORT[e.approach] ?? e.approach} · ${THEME_TR[e.theme] ?? e.theme}`}</span>
        <span className="line-clamp-2 text-caption text-strong">{e.title}</span>
        <span className="mt-auto flex items-center justify-between gap-1">
          <span className="truncate rounded-full px-2 py-0.5 text-micro" style={{ color: tone ? TONE[tone] : "var(--text-muted)", background: `color-mix(in srgb, ${tone ? TONE[tone] : "var(--text-muted)"} 12%, transparent)` }}>{cs.label}</span>
          <span className="flex shrink-0 gap-1">
            {platformsOf(e).map((p) => {
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
