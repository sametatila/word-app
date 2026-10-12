"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Group, Overview, Platform } from "@/lib/social-stats-core";
import type { PostPerformance } from "@/lib/social-stats";
import { AdminPage, BTN, Badge, Notice, PageHeader, Panel, Segmented, Stat, Stats, fmt } from "../admin/_ui/ui";
import { BarList, Sparkline, StackedDaily } from "../admin/_ui/charts";
import { DataTable } from "../admin/_ui/table";
import { APPROACH_TR, PLATFORMS, POST_STATE, THEME_TR, dayLabel } from "./shared";

/**
 * STÜDYO İSTATİSTİKLERİ: Genel bakış (stüdyonun ilk sayfası) ve bölüm performansı. Hesap ve harmanlama kuralları
 * `lib/social-stats-core` (izlenme üç platformda oynatma sayısı, toplanır; erişim yalnız Instagram; izleme süresi
 * Instagram + YouTube, izlenmeyle ağırlıklı; karşılaştırmalar ilk 24 saatle). Renk sırası grafiklerle aynı:
 * TikTok, Instagram, YouTube.
 */

const COLOR: Record<Platform, string> = {
  tiktok: "var(--color-brand-600)",
  instagram: "var(--color-sky-500)",
  youtube: "light-dark(var(--color-violet-600), var(--color-violet-500))",
};
const LABEL = Object.fromEntries(PLATFORMS.map((p) => [p.key, p.label])) as Record<Platform, string>;
const TZ = "Europe/Berlin";

const int = (n: number | null | undefined) => (n == null ? "—" : Math.round(n).toLocaleString("tr-TR"));
const pct = (r: number | null | undefined, d = 1) => (r == null ? "—" : `%${(r * 100).toFixed(d)}`);
const sec = (s: number | null | undefined) => (s == null ? "—" : `${s.toFixed(1)} sn`);
const signed = (n: number | null | undefined) => (n == null ? null : n === 0 ? "±0" : n > 0 ? `+${int(n)}` : `−${int(-n)}`);
const at = (iso: string | null) => (iso ? new Date(iso).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short", timeZone: TZ }) : "—");
const ago = (iso: string | null) => {
  if (!iso) return "hiç";
  const m = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  return m < 60 ? `${m} dk önce` : m < 48 * 60 ? `${Math.round(m / 60)} sa önce` : `${Math.round(m / 1440)} gün önce`;
};

function Swatch({ p }: { p: Platform }) {
  return <span aria-hidden className="inline-block h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: COLOR[p] }} />;
}
function PlatformName({ p }: { p: Platform }) {
  return <span className="inline-flex items-center gap-1.5"><Swatch p={p} />{LABEL[p]}</span>;
}

/** Platform payı: tek yığılmış çubuk, renkler platforma sabit (grafiklerle aynı), sıra TikTok → Instagram → YouTube. */
function PlatformShare({ items }: { items: { platform: Platform; value: number }[] }) {
  const total = items.reduce((a, i) => a + i.value, 0);
  if (!total) return <p className="muted text-caption">Henüz izlenme yok.</p>;
  return (
    <div>
      <div role="img" aria-label={items.map((i) => `${LABEL[i.platform]} %${Math.round((i.value / total) * 100)}`).join(", ")} className="flex h-3 gap-[2px] overflow-hidden rounded-full">
        {items.filter((i) => i.value > 0).map((i) => <span key={i.platform} style={{ width: `${(i.value / total) * 100}%`, background: COLOR[i.platform] }} />)}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-caption">
        {items.map((i) => (
          <span key={i.platform} className="inline-flex items-center gap-1.5"><PlatformName p={i.platform} /><span className="muted tabular-nums">{int(i.value)} izlenme · %{Math.round((i.value / total) * 100)}</span></span>
        ))}
      </div>
    </div>
  );
}

/** Hangi değerin nereden geldiği: sayfanın altında, kısa. */
function Definitions() {
  return (
    <details className="text-caption">
      <summary className="muted cursor-pointer">Sayılar nasıl birleştiriliyor?</summary>
      <ul className="muted mt-2 list-disc space-y-1 pl-5">
        <li><b>İzlenme</b>: üç platformda da oynatma sayısı (tekrar oynatma dahil), bu yüzden toplanıyor.</li>
        <li><b>Etkileşim</b>: beğeni + yorum + paylaşım + kaydetme. Kaydetme yalnız Instagram&apos;da; YouTube paylaşımı Analytics&apos;ten 1–2 gün gecikmeli gelir. Oran = etkileşim / izlenme.</li>
        <li><b>Erişim</b> (tekil hesap) yalnız Instagram&apos;da, toplama girmez.</li>
        <li><b>Ortalama izleme</b>: Instagram ve YouTube veriyor, TikTok API&apos;si vermiyor. İzlenmeyle ağırlıklı ortalama; oran = süre / video süresi (tekrar izlemeyle %100&apos;ü geçebilir).</li>
        <li><b>Toplamlar</b> seçili aralıkta yayınlanan videoların bugünkü değerleri; <b>günlük grafik</b> o gün kazanılan izlenme (saatlik ölçümlerin farkı).</li>
        <li><b>Karşılaştırmalar</b> ilk 24 saatle: eski video daha çok izlenmiş görünmesin diye. 24 saati dolmamış video girmez.</li>
        <li>Metrikler saatte bir güncellenir (Instagram ilk günlerde daha sık); YouTube izleme süresi 6 saatte bir.</li>
      </ul>
    </details>
  );
}

function ApiLine({ ov }: { ov: Overview }) {
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-1">
      {ov.platforms.map((p) => {
        const a = p.account;
        const tone = !a?.connected ? undefined : !a.ok || a.stale ? "warn" : "ok";
        return (
          <span key={p.platform} className="inline-flex items-center gap-1.5">
            <PlatformName p={p.platform} />
            <Badge tone={tone}>{!a?.connected ? "bağlı değil" : !a.ok ? "hata" : a.stale ? "işçi durdu" : `eşitleme ${ago(a.lastSyncAt)}`}</Badge>
          </span>
        );
      })}
    </span>
  );
}

const GROUP_LABEL = (kind: "approach" | "slot" | "theme", k: string) => (kind === "approach" ? APPROACH_TR[k] ?? k : kind === "theme" ? THEME_TR[k] ?? k : `${k} (Berlin)`);

function Compare({ ov }: { ov: Overview }) {
  const [metric, setMetric] = useState<Platform | "total">("total");
  const list = (kind: "approach" | "slot" | "theme", groups: Group[]) =>
    groups
      .filter((g) => g.avg[metric])
      .map((g) => ({ label: GROUP_LABEL(kind, g.key), value: Math.round(g.avg[metric]!.avg), right: `${int(g.avg[metric]!.avg)} · ${g.avg[metric]!.n} video` }));
  const any = (["approach", "slot", "theme"] as const).some((k) => list(k, ov.groups[k]).length);
  return (
    <Panel
      span
      title="Ne daha iyi çalışıyor?"
      hint={`Video başına ilk 24 saatte izlenme ortalaması${metric === "total" ? " (yayında olduğu platformların toplamı)" : ` (${LABEL[metric]})`}. Az videoyla fark rastlantı olabilir: video sayısına bak.${ov.groups.pending24 ? ` ${ov.groups.pending24} video henüz 24 saati doldurmadı.` : ""}`}
      actions={<Segmented label="Platform" value={metric} onChange={setMetric} items={[["total", "Toplam"], ...PLATFORMS.map((p) => [p.key, p.label] as const)]} />}
    >
      {any ? (
        <div className="grid gap-6 @3xl:grid-cols-3">
          {(["approach", "slot", "theme"] as const).map((k) => (
            <div key={k} className="min-w-0">
              <div className="muted mb-2 text-micro uppercase tracking-eyebrow">{k === "approach" ? "Yaklaşım" : k === "slot" ? "Yayın saati" : "Tema"}</div>
              <BarList items={list(k, ov.groups[k])} empty="24 saati dolan video yok." />
            </div>
          ))}
        </div>
      ) : (
        <p className="muted text-caption">İlk 24 saati ölçülen video yok. Ölçüm saatlik geçmişle (2026-10-12&apos;den beri) yapılıyor; ilk karşılaştırma yarın akşam dolar.</p>
      )}
    </Panel>
  );
}

function VideoTable({ ov }: { ov: Overview }) {
  const cell = (r: Overview["episodes"][number], p: Platform): ReactNode => {
    const c = r.cells[p];
    if (!c) return <span className="faint">—</span>;
    if (c.status !== "published") return <span className="faint">{POST_STATE[c.status as keyof typeof POST_STATE]?.label ?? c.status}</span>;
    const v = int(c.metrics?.views ?? 0);
    return c.url ? <a href={c.url} target="_blank" rel="noreferrer" className="tabular-nums underline-offset-2 hover:underline">{v}</a> : <span className="tabular-nums">{v}</span>;
  };
  return (
    <DataTable
      name="sosyal-videolar"
      head={["Video", "Yayın", "Yaklaşım", { label: "TikTok", align: "right" }, { label: "Instagram", align: "right" }, { label: "YouTube", align: "right" }, { label: "Toplam", align: "right" }, { label: "İlk 24 sa", align: "right" }, { label: "Etkileşim", align: "right" }, { label: "İzlenme oranı", align: "right" }]}
      rows={ov.episodes.map((r) => [
        <Link key="t" href={`/studio/${r.id}/performans`} className="text-strong underline-offset-2 hover:underline">{r.title}</Link>,
        r.slot ? `${r.slot.slice(0, 10)} ${r.slot.slice(11)}` : at(r.publishedAt),
        APPROACH_TR[r.approach] ?? r.approach,
        cell(r, "tiktok"),
        cell(r, "instagram"),
        cell(r, "youtube"),
        <b key="v" className="tabular-nums">{int(r.views)}</b>,
        r.views24 == null ? <span key="p" className="faint">sürüyor</span> : int(r.views24),
        pct(r.rate),
        pct(r.watchPct, 0),
      ])}
      empty="Bu aralıkta yayınlanan video yok."
    />
  );
}

export function StudioOverview({ ov }: { ov: Overview }) {
  const t = ov.totals;
  const v24 = ov.episodes.map((r) => r.views24).filter((x): x is number => x !== null);
  return (
    <AdminPage>
      <PageHeader
        title="Genel bakış"
        description="TikTok, Instagram ve YouTube Shorts birlikte: önce toplam, sonra platform ve video bazında."
        meta={<ApiLine ov={ov} />}
        actions={<Segmented label="Aralık" value={ov.range.key} href={(k) => (k === "30" ? "/studio" : `/studio?aralik=${k}`)} items={[["7", "7 gün"], ["30", "30 gün"], ["all", "Tümü"]]} />}
      />
      <div className="mt-5 space-y-5">
        <Panel title="Özet" hint={ov.range.from ? `${dayLabel(ov.range.from)} – ${dayLabel(ov.range.to)} arasında yayınlanan videolar.` : "Yayınlanan bütün videolar."}>
          <Stats cols={6}>
            <Stat label="İzlenme" value={fmt(t.views)} sub={`${t.videos} video, ${t.posts} gönderi`} />
            <Stat label="Etkileşim" value={fmt(t.interactions)} sub={`oran ${pct(t.rate)}`} />
            <Stat label="Ort. izleme" value={sec(t.avgWatchSec)} sub={t.watchPct == null ? "Instagram + YouTube" : `videonun ${pct(t.watchPct, 0)}'i · IG + YT`} />
            <Stat label="İlk 24 sa / video" value={v24.length ? fmt(v24.reduce((a, b) => a + b, 0) / v24.length) : "—"} sub={v24.length ? `${v24.length} video ortalaması` : "24 saati dolan video yok"} />
            <Stat label="Takipçi" value={t.followers == null ? "—" : int(t.followers)} sub={signed(t.followersDelta) ? `${signed(t.followersDelta)} bu aralıkta` : "değişim için geçmiş birikiyor"} />
            <Stat label="Video başına izlenme" value={t.videos ? fmt(t.views / t.videos) : "—"} sub="üç platform toplamı" />
          </Stats>
        </Panel>

        <Panel title="Platformlar" hint="Aynı videoların platform platform sonucu. Pay: toplam izlenmedeki yeri.">
          <div className="mb-4"><PlatformShare items={ov.platforms.map((p) => ({ platform: p.platform, value: p.views }))} /></div>
          <DataTable
            name="sosyal-platformlar"
            head={["Platform", { label: "Gönderi", align: "right" }, { label: "İzlenme", align: "right" }, { label: "Medyan", align: "right" }, { label: "Beğeni", align: "right" }, { label: "Yorum", align: "right" }, { label: "Paylaşım", align: "right" }, { label: "Kaydetme", align: "right" }, { label: "Erişim", align: "right" }, { label: "Etkileşim", align: "right" }, { label: "Ort. izleme", align: "right" }, { label: "Takipçi", align: "right" }]}
            rows={ov.platforms.map((p) => [
              <PlatformName key="p" p={p.platform} />,
              p.posts,
              <b key="v" className="tabular-nums">{int(p.views)}</b>,
              int(p.medianViews),
              int(p.likes),
              int(p.comments),
              int(p.shares),
              p.saves == null ? <span key="s" className="faint">yok</span> : int(p.saves),
              p.reach == null ? <span key="r" className="faint">yok</span> : int(p.reach),
              pct(p.rate),
              p.avgWatchSec == null ? <span key="w" className="faint">{p.platform === "tiktok" ? "API vermiyor" : "—"}</span> : p.watchPct == null ? sec(p.avgWatchSec) : `${sec(p.avgWatchSec)} · ${pct(p.watchPct, 0)}`,
              <span key="f" className="tabular-nums">{int(p.followers)}{signed(p.followersDelta) ? <span className="muted"> ({signed(p.followersDelta)})</span> : null}</span>,
            ])}
          />
        </Panel>

        <div className="grid gap-5 @5xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Panel title="Günlük kazanılan izlenme" hint="O gün eklenen izlenme, platforma göre (eski videolar dahil). Ölçüm geçmişi 2026-10-12'de başladı: öncesindeki izlenmeler ilk ölçüm gününe yazılır.">
            <StackedDaily days={ov.daily.days} series={ov.daily.series.map((s) => ({ label: LABEL[s.platform], values: s.values }))} />
          </Panel>
          <Panel title="Takipçi" hint="Hesap başına, günde bir ölçüm.">
            <div className="space-y-3">
              {ov.followers.series.map((s) => {
                const vals = s.values.filter((v): v is number => v !== null);
                const p = ov.platforms.find((x) => x.platform === s.platform);
                return (
                  <div key={s.platform}>
                    <div className="flex items-baseline justify-between gap-2 text-caption">
                      <PlatformName p={s.platform} />
                      <span className="tabular-nums"><b>{int(p?.followers)}</b>{signed(p?.followersDelta) ? <span className="muted"> {signed(p?.followersDelta)}</span> : null}</span>
                    </div>
                    {vals.length > 1 ? <Sparkline values={vals} label={`${LABEL[s.platform]} takipçi`} /> : <p className="faint text-micro">Eğilim için en az iki gün gerekiyor.</p>}
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <Compare ov={ov} />

        <Panel span flush title="Videolar" hint="Her satır bir bölüm; platform sütunundaki sayı izlenme (tıklayınca gönderi açılır). Başlığa tıkla: videonun ayrıntılı performansı.">
          <VideoTable ov={ov} />
        </Panel>

        <Definitions />
      </div>
    </AdminPage>
  );
}

/** Yayından sonraki saatlere göre birikimli izlenme; platform başına çizgi. Değerler altta metin olarak da var. */
function GrowthChart({ steps, lines }: { steps: number[]; lines: { platform: Platform; values: (number | null)[] }[] }) {
  const last = Math.max(-1, ...lines.map((l) => l.values.reduce<number>((a, v, i) => (v !== null ? i : a), -1)));
  if (last < 1) return <p className="muted rounded-tile border border-dashed px-4 py-5 text-center text-caption" style={{ borderColor: "var(--border)" }}>Eğri için en az iki saatlik ölçüm gerekiyor. Ölçüm saatte bir.</p>;
  const n = last + 1;
  const max = Math.max(1, ...lines.flatMap((l) => l.values.slice(0, n).filter((v): v is number => v !== null)));
  const x = (i: number) => (i / (n - 1)) * 100;
  const y = (v: number) => 96 - (v / max) * 92;
  const label = (h: number) => (h < 48 ? `${h} sa` : `${h / 24} gün`);
  return (
    <div>
      <div className="flex gap-2">
        <div aria-hidden className="faint flex w-10 shrink-0 flex-col justify-between text-right text-micro tabular-nums" style={{ height: 160 }}>
          <span>{fmt(max)}</span><span>{fmt(max / 2)}</span><span>0</span>
        </div>
        <svg role="img" aria-label={`İzlenme eğrisi, ilk ${label(steps[last])}`} viewBox="0 0 100 100" preserveAspectRatio="none" className="min-w-0 flex-1 border-b" style={{ height: 160, borderColor: "var(--border)" }}>
          <line x1="0" x2="100" y1="50" y2="50" stroke="var(--hairline)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          {lines.map((l) => {
            const pts = l.values.slice(0, n).map((v, i) => (v === null ? null : `${x(i)},${y(v)}`)).filter(Boolean).join(" ");
            return pts ? <polyline key={l.platform} points={pts} fill="none" stroke={COLOR[l.platform]} strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" /> : null;
          })}
        </svg>
      </div>
      <div className="muted ml-12 mt-1.5 flex justify-between text-micro tabular-nums"><span>{label(steps[0])}</span><span>{label(steps[last])}</span></div>
    </div>
  );
}

const METRIC_ROWS: [string, string, (v: number, d: number | null) => string][] = [
  ["views", "İzlenme", (v) => int(v)],
  ["reach", "Erişim (tekil hesap)", (v) => int(v)],
  ["likes", "Beğeni", (v) => int(v)],
  ["comments", "Yorum", (v) => int(v)],
  ["shares", "Paylaşım", (v) => int(v)],
  ["saves", "Kaydetme", (v) => int(v)],
  ["avgWatchSec", "Ort. izleme", (v, d) => `${sec(v)}${d ? ` · videonun ${pct(v / d, 0)}'i` : ""}`],
  ["avgViewPct", "Ort. izlenen kısım (YouTube)", (v) => `%${v.toFixed(0)}`],
  ["watchMin", "Toplam izleme", (v) => `${int(v)} dk`],
  ["subsGained", "Kazanılan abone", (v) => int(v)],
];

export function PostPerformanceView({ perf }: { perf: PostPerformance }) {
  const e = perf.episode;
  const row = perf.overview.episodes.find((r) => r.id === e.id);
  const live = perf.platforms.filter((p) => p.status === "published");
  const lines = perf.platforms.filter((p) => p.growth.length).map((p) => ({ platform: p.platform, values: p.growth }));
  return (
    <AdminPage>
      <PageHeader
        crumb={["/studio", "Genel bakış"]}
        title={e.title}
        description={<>{APPROACH_TR[e.approach] ?? e.approach} · {THEME_TR[e.theme] ?? e.theme} · <span className="font-mono">{e.id}</span>{e.slot ? ` · ${dayLabel(e.slot.slice(0, 10))} ${e.slot.slice(11)} (Berlin)` : ""}{e.duration ? ` · ${e.duration.toFixed(0)} sn` : ""}</>}
        meta={e.ytTitle ? <>YouTube başlığı: {e.ytTitle}</> : null}
        actions={<Link href={`/studio/${e.id}`} className={BTN.secondary}>Bölümü aç</Link>}
      />
      <div className="mt-5 space-y-5">
        {!live.length ? <Notice title="Henüz hiçbir platformda yayında değil">Yayına çıkınca metrikler saatte bir gelir.</Notice> : null}
        <Panel title="Özet" hint="Yayında olduğu platformların toplamı.">
          <Stats cols={5}>
            <Stat label="İzlenme" value={int(row?.views ?? 0)} sub={`${live.length} platform`} />
            <Stat label="İlk 24 sa" value={row?.views24 == null ? "—" : int(row.views24)} sub={row?.views24 == null ? "24 saat dolmadı ya da ölçüm yok" : "üç platform toplamı"} />
            <Stat label="Etkileşim" value={int(row?.interactions ?? 0)} sub={`oran ${pct(row?.rate)}`} />
            <Stat label="Ort. izleme" value={sec(row?.avgWatchSec)} sub={row?.watchPct == null ? "Instagram + YouTube" : `videonun ${pct(row.watchPct, 0)}'i`} />
            <Stat label="İzlenme payı" value={live.length ? LABEL[[...live].sort((a, b) => (b.metrics?.views ?? 0) - (a.metrics?.views ?? 0))[0].platform] : "—"} sub="en çok izlendiği platform" />
          </Stats>
          {live.length > 1 ? <div className="mt-4"><PlatformShare items={live.map((p) => ({ platform: p.platform, value: p.metrics?.views ?? 0 }))} /></div> : null}
        </Panel>

        <Panel title="İzlenme eğrisi" hint="Yayından sonra birikimli izlenme (ilk 48 saat saatlik, sonra günlük). Platformlar farklı saatte yayına çıktıysa her biri kendi yayın anından sayılır.">
          <GrowthChart steps={perf.steps} lines={lines} />
          <div className="muted mt-2 flex flex-wrap gap-3 text-micro">{lines.map((l) => <PlatformName key={l.platform} p={l.platform} />)}</div>
        </Panel>

        <div className="grid gap-5 @4xl:grid-cols-3">
          {perf.platforms.map((p) => {
            const peer = perf.peers24[p.platform];
            const shown = POST_STATE[p.status as keyof typeof POST_STATE];
            return (
              <Panel key={p.platform} title={<PlatformName p={p.platform} />} actions={<Badge tone={shown?.tone}>{shown?.label ?? p.status}</Badge>}>
                {p.status !== "published" ? (
                  <p className="muted text-caption">Yayında değil.</p>
                ) : (
                  <div className="space-y-3 text-caption">
                    <dl className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
                      {METRIC_ROWS.filter(([k]) => typeof p.metrics?.[k] === "number").map(([k, l, f]) => (
                        <div key={k} className="contents"><dt className="muted">{l}</dt><dd className="text-right tabular-nums">{f(p.metrics![k], e.duration)}</dd></div>
                      ))}
                      <div className="contents"><dt className="muted">Etkileşim oranı</dt><dd className="text-right tabular-nums">{pct(p.metrics?.views ? ((p.metrics.likes ?? 0) + (p.metrics.comments ?? 0) + (p.metrics.shares ?? 0) + (p.metrics.saves ?? 0)) / p.metrics.views : null)}</dd></div>
                      <div className="contents"><dt className="muted">İlk 24 sa</dt><dd className="text-right tabular-nums">{int(p.views24)}{p.views24 != null && peer ? <span className="muted"> · medyan {int(peer.median)}</span> : null}</dd></div>
                    </dl>
                    {p.views24 != null && peer && peer.median > 0 ? <p className="muted">Öbür {peer.n} videonun ilk 24 saat medyanının <b>{(p.views24 / peer.median).toFixed(1)} katı</b>.</p> : null}
                    <p className="faint">Yayın {at(p.publishedAt)} · ölçüm {ago(p.metricsAt)} · {p.snapshots} geçmiş ölçüm</p>
                    {p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">Gönderiyi aç ↗</a> : null}
                    {p.platform === "tiktok" ? <p className="faint">TikTok API&apos;si izleme süresi ve kaydetme vermiyor.</p> : null}
                  </div>
                )}
              </Panel>
            );
          })}
        </div>
        <Definitions />
      </div>
    </AdminPage>
  );
}
