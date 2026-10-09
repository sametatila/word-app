"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EpisodeSummary } from "@/lib/studio";
import type { SocialPlatform, SocialPost } from "@/lib/social-posts";
import { apiFetch } from "@/lib/api-fetch";
import { adminErrorText } from "@/lib/admin-errors";
import { AdminPage, BTN, Badge, Empty, Notice, PageHeader, Panel, Stat, Stats, TONE, type Tone } from "../admin/_ui/ui";
import { TwoStep } from "../admin/_ui/two-step";
import { APPROACH_SHORT, CONTENT_STATE, PLATFORMS, POST_STATE, THEME_TR, contentState, dayLabel, postState, type PostShown } from "./shared";

/**
 * Stüdyo takvimi: gün × 3 saat (Berlin). Her hücrede İÇERİK durumu (Claude taslağı → düzenlendi → onaylandı →
 * video hazır) ve iki platformun durumu. Hücre editörü açar. Uyarılar: yakında yayınlanacak ama videosu
 * hazır olmayan, saati geçip yayında işaretlenmeyen, planın sonu.
 */
const SLOTS = ["07:30", "12:30", "18:30"];
const TZ = "Europe/Berlin";

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

export function StudioCalendar({ episodes, posts: initial, missing, now }: { episodes: EpisodeSummary[]; posts: SocialPost[]; missing: boolean; now: string }) {
  const [posts, setPosts] = useState(() => new Map(initial.filter((p) => p.episodeId).map((p) => [key(p.episodeId as string, p.platform), p])));
  const nowMs = new Date(now).getTime();
  const today = berlinDay(now);
  const planned = useMemo(() => episodes.filter((e) => e.slot) as (EpisodeSummary & { slot: string })[], [episodes]);
  const loose = episodes.filter((e) => !e.slot);
  const weeks = useMemo(() => [...new Set(planned.map((e) => monday(e.slot.slice(0, 10))))].sort(), [planned]);
  const [week, setWeek] = useState(() => {
    const cur = monday(today);
    return weeks.includes(cur) ? cur : (weeks.find((w) => w > cur) ?? weeks[weeks.length - 1] ?? cur);
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: Tone; text: string } | null>(null);

  const bySlot = useMemo(() => new Map(planned.map((e) => [e.slot, e])), [planned]);
  const days = Array.from({ length: 7 }, (_, i) => addDays(week, i));
  const weekEps = planned.filter((e) => days.includes(e.slot.slice(0, 10)));
  const shown = (e: EpisodeSummary & { slot: string }, p: SocialPlatform): PostShown => postState(posts.get(key(e.id, p))?.status, slotMs(e.slot) < nowMs);
  const count = (eps: (EpisodeSummary & { slot: string })[], p: SocialPlatform, ...st: PostShown[]) => eps.filter((e) => st.includes(shown(e, p))).length;

  const overdue = planned.filter((e) => PLATFORMS.some((p) => shown(e, p.key) === "overdue"));
  // 3 gün içinde yayınlanacak ama indirilebilir videosu bu sürümden değil (ya da hiç yok)
  const notReady = planned.filter((e) => {
    const t = slotMs(e.slot);
    return t > nowMs && t - nowMs < 3 * 86_400_000 && !(e.render?.status === "done" && e.render.hasFiles);
  });
  const last = planned[planned.length - 1];
  const daysLeft = last ? Math.floor((slotMs(last.slot) - nowMs) / 86_400_000) : -1;

  async function bulk(platform: SocialPlatform) {
    const ids = weekEps.filter((e) => shown(e, platform) === "planned").map((e) => e.id);
    if (!ids.length) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await apiFetch("/api/studio/posts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "bulk", episodeIds: ids, platform, status: "scheduled" }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) return setMsg({ tone: "bad", text: adminErrorText(data.error ?? res.status) });
    } catch {
      return setMsg({ tone: "bad", text: adminErrorText("network") });
    } finally {
      setBusy(false);
    }
    const at = new Date().toISOString();
    setPosts((m) => {
      const n = new Map(m);
      for (const id of ids) n.set(key(id, platform), { ...(n.get(key(id, platform)) ?? { episodeId: id, platform, url: null, externalId: null, publishedAt: null, metrics: null, metricsAt: null, note: null, updatedBy: null }), status: "scheduled", updatedAt: at });
      return n;
    });
    setMsg({ tone: "ok", text: `${ids.length} bölüm ${PLATFORMS.find((p) => p.key === platform)?.label}'ta zamanlandı olarak işaretlendi.` });
  }

  const wi = weeks.indexOf(week);
  const jump = (list: (EpisodeSummary & { slot: string })[]) =>
    list.slice(0, 6).map((e, i) => (
      <span key={e.id}>
        {i ? " · " : " "}
        <Link className="underline underline-offset-2" href={`/studio/${e.id}`}>{e.slot.slice(5)} {e.title}</Link>
      </span>
    ));

  return (
    <AdminPage>
      <PageHeader
        title="Sosyal medya takvimi"
        description="TikTok ve Instagram Reels: günde 3 video, iki platforma aynı dosya. Bölüme tıkla: metinleri düzenle, önizle, onayla; video sunucuda üretilir, buradan kayıpsız indirilir. Saatler Berlin saati."
        meta={planned.length ? <>Plan: <b>{planned.length}</b> bölüm, {dayLabel(planned[0].slot.slice(0, 10))} – {dayLabel(last.slot.slice(0, 10))}</> : "Plan boş"}
      />
      {missing ? <Notice tone="bad" title="Stüdyo tabloları okunamadı">Göç uygulanmamış olabilir (drizzle/0085_social_studio.sql).</Notice> : null}
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      {notReady.length ? (
        <Notice tone="warn" title={`3 gün içinde yayınlanacak, videosu hazır değil: ${notReady.length} bölüm`}>
          Onaylanmamış, sesi bekleyen ya da metni onaydan sonra değişmiş bölümler. Zamanlayıcıya koymadan önce onaylayıp videoyu indir.{jump(notReady)}
        </Notice>
      ) : null}
      {overdue.length ? (
        <Notice tone="warn" title={`Saati geçmiş, yayında işaretlenmemiş: ${overdue.length} bölüm`}>
          Platformda gerçekten yayınlandı mı bak; yayınlandıysa bağlantıyla &quot;Yayında&quot;, yayınlanmadıysa &quot;Atlandı&quot; işaretle.{jump(overdue)}
        </Notice>
      ) : null}
      {last && daysLeft < 7 ? (
        <Notice tone={daysLeft < 3 ? "bad" : "warn"} title={daysLeft < 0 ? "Plan bitti" : `Plan ${daysLeft} gün sonra bitiyor`}>
          Claude&apos;dan yeni iki haftalık parti iste.
        </Notice>
      ) : null}

      <Panel title="Bu hafta">
        <Stats cols={5}>
          <Stat label="Planlanan" value={weekEps.length} sub={`${weeks.length} haftalık plan`} />
          <Stat label="Video hazır" value={`${weekEps.filter((e) => e.render?.status === "done" && e.render.hasFiles).length}/${weekEps.length}`} tone={weekEps.every((e) => e.render?.status === "done") ? "ok" : "warn"} />
          {PLATFORMS.map((p) => (
            <Stat key={p.key} label={`${p.label} zamanlandı`} value={`${count(weekEps, p.key, "scheduled", "published")}/${weekEps.length}`} tone={count(weekEps, p.key, "planned") ? "warn" : "ok"} sub={count(weekEps, p.key, "published") ? `${count(weekEps, p.key, "published")} yayında` : undefined} />
          ))}
          <Stat label="Saati geçti" value={PLATFORMS.reduce((a, p) => a + count(weekEps, p.key, "overdue"), 0)} tone={PLATFORMS.some((p) => count(weekEps, p.key, "overdue")) ? "warn" : undefined} />
        </Stats>
      </Panel>

      <Panel
        title={`Hafta: ${dayLabel(days[0])} – ${dayLabel(days[6])}`}
        hint="Üst rozet içeriğin durumu, alttakiler platformlar (TT TikTok, IG Instagram). Mavi zamanlandı, yeşil yayında / video hazır, turuncu dikkat."
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
            <div className="grid min-w-[60rem] gap-2" style={{ gridTemplateColumns: "4rem repeat(7, minmax(0, 1fr))" }}>
              <div />
              {days.map((d) => (
                <div key={d} className="text-caption text-strong" style={d === today ? { color: TONE.info } : undefined}>{dayLabel(d)}{d === today ? " · bugün" : ""}</div>
              ))}
              {SLOTS.map((t) => (
                <Row key={t} t={t} days={days} bySlot={bySlot} shown={shown} />
              ))}
            </div>
          </div>
        ) : (
          <Empty>Bu haftada planlanmış bölüm yok.</Empty>
        )}
      </Panel>

      {loose.length ? (
        <Panel title={`Takvim dışı: ${loose.length} bölüm`} hint="Saati olmayan bölümler. Editörde boş bir saate yerleştirilebilir.">
          <div className="flex flex-wrap gap-2">
            {loose.map((e) => (
              <Link key={e.id} href={`/studio/${e.id}`} className="rounded-tile border px-3 py-2 text-caption" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                <span className="muted">{APPROACH_SHORT[e.approach] ?? e.approach} · {THEME_TR[e.theme] ?? e.theme}</span> · {e.title}
              </Link>
            ))}
          </div>
        </Panel>
      ) : null}
    </AdminPage>
  );
}

function Row({ t, days, bySlot, shown }: { t: string; days: string[]; bySlot: Map<string, EpisodeSummary & { slot: string }>; shown: (e: EpisodeSummary & { slot: string }, p: SocialPlatform) => PostShown }) {
  return (
    <>
      <div className="muted pt-2 font-mono text-caption">{t}</div>
      {days.map((d) => {
        const e = bySlot.get(`${d} ${t}`);
        if (!e) return <div key={d} className="rounded-tile border border-dashed" style={{ borderColor: "var(--border)", minHeight: "6.5rem" }} />;
        const cs = contentState(e);
        return (
          <Link key={d} href={`/studio/${e.id}`} className="flex min-w-0 flex-col gap-1 rounded-tile border p-2 text-left hover:border-[var(--color-brand)]" style={{ borderColor: "var(--border)", background: "var(--surface-2)", minHeight: "6.5rem" }}>
            <span className="muted truncate text-micro uppercase tracking-eyebrow">{APPROACH_SHORT[e.approach] ?? e.approach} · {THEME_TR[e.theme] ?? e.theme}</span>
            <span className="line-clamp-2 text-caption text-strong">{e.title}</span>
            <span className="mt-auto flex flex-wrap gap-1">
              <Badge tone={CONTENT_STATE[cs.key].tone}>{cs.label}</Badge>
              {PLATFORMS.map((p) => {
                const s = shown(e, p.key);
                return <Badge key={p.key} tone={POST_STATE[s].tone}>{p.short} · {POST_STATE[s].label}</Badge>;
              })}
            </span>
          </Link>
        );
      })}
    </>
  );
}
