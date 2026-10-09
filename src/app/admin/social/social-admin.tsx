"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PlanEpisode, SocialPlatform, SocialPost, SocialStatus } from "@/lib/social-posts";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, BTN, Badge, Empty, FIELD, FIELD_STYLE, Field, KeyValue, Notice, PageHeader, Panel, Segmented, Stat, Stats, TONE, type Tone, when } from "../_ui/ui";
import { TwoStep } from "../_ui/two-step";

/**
 * Sosyal medya takvimi.
 *
 * ÜÇ SORUYA CEVAP VERİYOR:
 *  1. Bu hafta ne yayınlanacak? (gün × saat ızgarası; saatler Berlin, yayın planı o saate göre)
 *  2. Platformlara koyuldu mu, yayınlandı mı? (her hücrede TikTok ve Instagram ayrı)
 *  3. Saati geçtiği hâlde yayında işaretlenmeyen var mı? (zamanlayıcı başarısız olabilir: elle bakılmalı)
 *
 * Plan Claude'un yazdığı bölümlerden gelir; burada değişmez. Değişen yalnız platformdaki durum.
 */

const TZ = "Europe/Berlin";
const SLOTS = ["07:30", "12:30", "18:30"];
const PLATFORMS: { key: SocialPlatform; label: string; short: string }[] = [
  { key: "tiktok", label: "TikTok", short: "TT" },
  { key: "instagram", label: "Instagram", short: "IG" },
];
const URL_HINT: Record<SocialPlatform, string> = { tiktok: "https://www.tiktok.com/@…/video/…", instagram: "https://www.instagram.com/reel/…" };
const APPROACH_TR: Record<string, string> = { artikel: "Artikel", diyalog: "Diyalog", kelime: "Kelime destesi", duy: "Hangisini duydun?", kur: "Cümleyi kur" };
/** Hücrede yer dar: kısa ad. */
const APPROACH_SHORT: Record<string, string> = { artikel: "Artikel", diyalog: "Diyalog", kelime: "Kelime", duy: "Duy", kur: "Kur" };
const THEME_TR: Record<string, string> = { gece: "Gece", kagit: "Kâğıt", turuncu: "Turuncu", lacivert: "Lacivert" };

type Shown = SocialStatus | "planned" | "overdue";
const STATUS_TR: Record<Shown, string> = { planned: "Planlandı", scheduled: "Zamanlandı", published: "Yayında", skipped: "Atlandı", overdue: "Saati geçti" };
const STATUS_TONE: Record<Shown, Tone | undefined> = { planned: undefined, scheduled: "info", published: "ok", skipped: undefined, overdue: "warn" };
const EDITABLE: readonly (readonly [SocialStatus | "planned", string])[] = [
  ["planned", "Planlandı"],
  ["scheduled", "Zamanlandı"],
  ["published", "Yayında"],
  ["skipped", "Atlandı"],
];

const key = (episodeId: string, p: SocialPlatform) => `${episodeId}|${p}`;
/** "2026-10-12" → o haftanın pazartesisi (takvim günü, saat dilimi yok). */
function monday(day: string): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  const key = d.toISOString().slice(0, 10); // gün anahtarı, gösterim değil
  return key;
}
function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  const key = d.toISOString().slice(0, 10); // gün anahtarı, gösterim değil
  return key;
}
const dayLabel = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString("tr-TR", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const berlinDay = (iso: string) => new Date(iso).toLocaleDateString("sv-SE", { timeZone: TZ });
const istanbulTime = (iso: string) => new Date(iso).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" });

async function post(body: Record<string, unknown>): Promise<{ error: string | null; data: Record<string, unknown> }> {
  try {
    const res = await apiFetch("/api/admin/social", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (res.ok) return { error: null, data };
    return { error: data.error === "db" ? "Veritabanı hatası (social_posts tablosu var mı?)." : adminErrorText((data.error as string) ?? res.status), data };
  } catch {
    return { error: adminErrorText("network"), data: {} };
  }
}

export function SocialAdmin({ plan, posts: initial, missing, now }: { plan: PlanEpisode[]; posts: SocialPost[]; missing: boolean; now: string }) {
  const [posts, setPosts] = useState(() => new Map(initial.filter((p) => p.episodeId).map((p) => [key(p.episodeId as string, p.platform), p])));
  const nowMs = new Date(now).getTime();
  const today = berlinDay(now);
  const weeks = useMemo(() => [...new Set(plan.map((e) => monday(e.slot.slice(0, 10))))].sort(), [plan]);
  const [week, setWeek] = useState(() => {
    const cur = monday(today);
    return weeks.includes(cur) ? cur : (weeks.find((w) => w > cur) ?? weeks[weeks.length - 1] ?? cur);
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: Tone; text: string } | null>(null);

  const bySlot = useMemo(() => new Map(plan.map((e) => [e.slot, e])), [plan]);
  const days = Array.from({ length: 7 }, (_, i) => addDays(week, i));
  const weekEps = plan.filter((e) => days.includes(e.slot.slice(0, 10)));

  const shown = (e: PlanEpisode, p: SocialPlatform): Shown => {
    const s = posts.get(key(e.id, p))?.status;
    if (s === "published" || s === "skipped") return s;
    if (new Date(e.at).getTime() < nowMs) return "overdue";
    return s ?? "planned";
  };
  const count = (eps: PlanEpisode[], p: SocialPlatform, ...st: Shown[]) => eps.filter((e) => st.includes(shown(e, p))).length;
  const overdue = plan.filter((e) => PLATFORMS.some((p) => shown(e, p.key) === "overdue"));
  const last = plan[plan.length - 1];
  const daysLeft = last ? Math.floor((new Date(last.at).getTime() - nowMs) / 86_400_000) : -1;

  function apply(episodeId: string, platform: SocialPlatform, p: SocialPost | null) {
    setPosts((m) => {
      const n = new Map(m);
      if (p) n.set(key(episodeId, platform), p);
      else n.delete(key(episodeId, platform));
      return n;
    });
  }

  async function bulk(platform: SocialPlatform) {
    const ids = weekEps.filter((e) => shown(e, platform) === "planned").map((e) => e.id);
    if (!ids.length) return;
    setBusy(true);
    setMsg(null);
    const r = await post({ action: "bulk", episodeIds: ids, platform, status: "scheduled" });
    setBusy(false);
    if (r.error) return setMsg({ tone: "bad", text: r.error });
    const at = new Date().toISOString();
    setPosts((m) => {
      const n = new Map(m);
      for (const id of ids) n.set(key(id, platform), { ...(n.get(key(id, platform)) ?? { episodeId: id, platform, url: null, externalId: null, publishedAt: null, metrics: null, metricsAt: null, note: null, updatedBy: null }), status: "scheduled", updatedAt: at });
      return n;
    });
    setMsg({ tone: "ok", text: `${ids.length} bölüm ${PLATFORMS.find((p) => p.key === platform)?.label}'ta zamanlandı olarak işaretlendi.` });
  }

  const sel = selected ? plan.find((e) => e.id === selected) ?? null : null;
  const wi = weeks.indexOf(week);

  return (
    <AdminPage>
      <PageHeader
        title="Sosyal medya"
        description="TikTok ve Instagram Reels takvimi: günde 3 video, iki platforma aynı dosya. Plan Claude'un yazdığı bölümlerden gelir (data/social/plan.json); burada platformdaki durumu işaretlersin. Saatler Berlin saati."
        meta={plan.length ? <>Plan: <b>{plan.length}</b> bölüm, {dayLabel(plan[0].slot.slice(0, 10))} – {dayLabel(last.slot.slice(0, 10))}</> : "Plan boş"}
      />

      {missing ? <Notice tone="bad" title="social_posts tablosu okunamadı">Göç uygulanmamış olabilir: drizzle/0084_social_posts.sql. Takvim görünür ama durum kaydedilemez.</Notice> : null}
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      {last && daysLeft < 7 ? (
        <Notice tone={daysLeft < 3 ? "bad" : "warn"} title={daysLeft < 0 ? "Plan bitti" : `Plan ${daysLeft} gün sonra bitiyor`}>
          Claude&apos;dan yeni iki haftalık parti iste (bölümler + MP4). Zamanlayıcıya en az birkaç gün önce koymak gerekiyor.
        </Notice>
      ) : null}
      {overdue.length ? (
        <Notice tone="warn" title={`Saati geçmiş, yayında işaretlenmemiş: ${overdue.length} bölüm`}>
          Platformda gerçekten yayınlandı mı bak; yayınlandıysa bağlantıyla &quot;Yayında&quot; işaretle, yayınlanmadıysa &quot;Atlandı&quot;.
          {" "}
          {overdue.slice(0, 6).map((e) => (
            <button key={e.id} type="button" className="underline underline-offset-2" onClick={() => { setWeek(monday(e.slot.slice(0, 10))); setSelected(e.id); }}>
              {e.slot.slice(5)} {e.title}
            </button>
          )).reduce<React.ReactNode[]>((a, b, i) => (i ? [...a, " · ", b] : [b]), [])}
        </Notice>
      ) : null}

      <Panel title="Bu hafta">
        <Stats cols={5}>
          <Stat label="Planlanan" value={weekEps.length} sub={`${weeks.length} haftalık plan`} />
          {PLATFORMS.map((p) => (
            <Stat key={p.key} label={`${p.label} zamanlandı`} value={`${count(weekEps, p.key, "scheduled", "published")}/${weekEps.length}`} tone={count(weekEps, p.key, "planned") ? "warn" : "ok"} />
          ))}
          {PLATFORMS.map((p) => (
            <Stat key={`${p.key}-y`} label={`${p.label} yayında`} value={count(weekEps, p.key, "published")} sub={count(weekEps, p.key, "overdue") ? `${count(weekEps, p.key, "overdue")} saati geçti` : undefined} tone={count(weekEps, p.key, "overdue") ? "warn" : undefined} />
          ))}
        </Stats>
      </Panel>

      <Panel
        title={`Hafta: ${dayLabel(days[0])} – ${dayLabel(days[6])}`}
        hint="Hücreye tıkla: açıklama metni, dosya yolu ve platform durumu. Renk: gri planlandı, mavi zamanlandı, yeşil yayında, turuncu saati geçti."
        actions={
          <>
            <button type="button" className={BTN.small} disabled={wi <= 0} onClick={() => setWeek(weeks[wi - 1])}>← Önceki</button>
            <button type="button" className={BTN.small} disabled={wi < 0 || wi >= weeks.length - 1} onClick={() => setWeek(weeks[wi + 1])}>Sonraki →</button>
            {PLATFORMS.map((p) => {
              const n = count(weekEps, p.key, "planned");
              return n ? <TwoStep key={p.key} small danger={false} disabled={busy || missing} label={`${p.label}: ${n} bölümü zamanlandı işaretle`} confirm={`Evet, ${n} bölüm ${p.label}'ta zamanlandı`} onConfirm={() => void bulk(p.key)} /> : null;
            })}
          </>
        }
      >
        {weekEps.length ? (
          <div className="overflow-x-auto">
            <div className="grid min-w-[56rem] gap-2" style={{ gridTemplateColumns: "4rem repeat(7, minmax(0, 1fr))" }}>
              <div />
              {days.map((d) => (
                <div key={d} className="text-caption text-strong" style={d === today ? { color: TONE.info } : undefined}>{dayLabel(d)}{d === today ? " · bugün" : ""}</div>
              ))}
              {SLOTS.map((t) => (
                <Row key={t} t={t} days={days} bySlot={bySlot} shown={shown} selected={selected} onSelect={setSelected} />
              ))}
            </div>
          </div>
        ) : (
          <Empty>Bu haftada planlanmış bölüm yok.</Empty>
        )}
      </Panel>

      {sel ? <Detail key={sel.id} e={sel} posts={posts} shown={shown} disabled={missing} onSaved={apply} onClose={() => setSelected(null)} /> : null}
    </AdminPage>
  );
}

function Row({ t, days, bySlot, shown, selected, onSelect }: {
  t: string;
  days: string[];
  bySlot: Map<string, PlanEpisode>;
  shown: (e: PlanEpisode, p: SocialPlatform) => Shown;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <div className="muted pt-2 font-mono text-caption">{t}</div>
      {days.map((d) => {
        const e = bySlot.get(`${d} ${t}`);
        if (!e) return <div key={d} className="rounded-tile border border-dashed" style={{ borderColor: "var(--border)", minHeight: "5.5rem" }} />;
        const on = selected === e.id;
        return (
          <button
            key={d}
            type="button"
            onClick={() => onSelect(e.id)}
            className="flex min-w-0 flex-col gap-1 rounded-tile border p-2 text-left"
            style={{ borderColor: on ? TONE.info : "var(--border)", background: on ? "var(--brand-soft)" : "var(--surface-2)", minHeight: "5.5rem" }}
          >
            <span className="muted truncate text-micro uppercase tracking-eyebrow">{APPROACH_SHORT[e.approach] ?? e.approach} · {THEME_TR[e.theme] ?? e.theme}</span>
            <span className="line-clamp-2 text-caption text-strong">{e.title}</span>
            <span className="mt-auto flex flex-wrap gap-1">
              {PLATFORMS.map((p) => {
                const s = shown(e, p.key);
                return <Badge key={p.key} tone={STATUS_TONE[s]}>{p.short} · {STATUS_TR[s]}</Badge>;
              })}
            </span>
          </button>
        );
      })}
    </>
  );
}

function Detail({ e, posts, shown, disabled, onSaved, onClose }: {
  e: PlanEpisode;
  posts: Map<string, SocialPost>;
  shown: (e: PlanEpisode, p: SocialPlatform) => Shown;
  disabled: boolean;
  onSaved: (episodeId: string, platform: SocialPlatform, p: SocialPost | null) => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }), []);
  return (
    <div ref={ref}>
    <Panel
      title={e.title}
      hint={<>{dayLabel(e.slot.slice(0, 10))} {e.slot.slice(11)} Berlin (İstanbul {istanbulTime(e.at)}) · {APPROACH_TR[e.approach] ?? e.approach} · {THEME_TR[e.theme] ?? e.theme}{e.duration ? ` · ${e.duration} sn` : ""} · <span className="font-mono">{e.id}</span></>}
      actions={<button type="button" className={BTN.small} onClick={onClose}>Kapat</button>}
    >
      <div className="grid gap-4 @3xl:grid-cols-2">
        <div className="min-w-0 space-y-3">
          <Field label="Kanca (ilk kare)">
            <p className="text-body">{e.hook || "—"}</p>
          </Field>
          <Field label="Açıklama metni (iki platformda aynı)">
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-tile border p-3 text-caption" style={FIELD_STYLE}>{e.caption}</pre>
          </Field>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={BTN.small}
              onClick={() => {
                void navigator.clipboard?.writeText(e.caption).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                });
              }}
            >
              {copied ? "Kopyalandı" : "Açıklamayı kopyala"}
            </button>
            <span className="muted text-caption">Dosyalar: <span className="font-mono">.shots/social/out/{e.id}/</span> (MP4, kapak.jpg, aciklama.txt) · yapay zekâ etiketini aç</span>
          </div>
        </div>
        <div className="grid min-w-0 gap-3">
          {PLATFORMS.map((p) => (
            <PlatformBox key={p.key} e={e} platform={p.key} label={p.label} post={posts.get(key(e.id, p.key)) ?? null} state={shown(e, p.key)} disabled={disabled} onSaved={onSaved} />
          ))}
        </div>
      </div>
    </Panel>
    </div>
  );
}

function PlatformBox({ e, platform, label, post: saved, state, disabled, onSaved }: {
  e: PlanEpisode;
  platform: SocialPlatform;
  label: string;
  post: SocialPost | null;
  state: Shown;
  disabled: boolean;
  onSaved: (episodeId: string, platform: SocialPlatform, p: SocialPost | null) => void;
}) {
  const [status, setStatus] = useState<SocialStatus | "planned">(saved?.status ?? "planned");
  const [url, setUrl] = useState(saved?.url ?? "");
  const [note, setNote] = useState(saved?.note ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: Tone; text: string } | null>(null);
  const dirty = status !== (saved?.status ?? "planned") || url !== (saved?.url ?? "") || note !== (saved?.note ?? "");

  async function save() {
    setBusy(true);
    setMsg(null);
    const r = await post({ action: "set", episodeId: e.id, platform, status, url, note });
    setBusy(false);
    if (r.error) return setMsg({ tone: "bad", text: r.error });
    onSaved(e.id, platform, (r.data.post as SocialPost | null) ?? null);
    setMsg({ tone: "ok", text: "Kaydedildi." });
  }

  return (
    <div className="space-y-2 rounded-tile border p-3" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-strong">{label}</span>
        <Badge tone={STATUS_TONE[state]}>{STATUS_TR[state]}</Badge>
      </div>
      <Segmented label={`${label} durumu`} items={EDITABLE} value={status} onChange={setStatus} />
      <Field label="Gönderi bağlantısı">
        <input aria-label={`${label} gönderi bağlantısı`} className={FIELD} style={FIELD_STYLE} value={url} onChange={(ev) => setUrl(ev.target.value)} placeholder={URL_HINT[platform]} inputMode="url" />
      </Field>
      <Field label="Not">
        <input aria-label={`${label} notu`} className={FIELD} style={FIELD_STYLE} value={note} onChange={(ev) => setNote(ev.target.value)} placeholder="ör. müzik değiştirildi, saat kaydırıldı" />
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={BTN.primary} disabled={busy || disabled || !dirty} onClick={() => void save()}>{busy ? "Kaydediliyor…" : "Kaydet"}</button>
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
  );
}
