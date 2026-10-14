/**
 * SOSYAL İSTATİSTİK HESABI (stüdyo Genel bakış, 2026-10-12; Samet: "3 platformun istatistiklerini doğru harmanlayarak
 * hem genel hem postlara özel"). Saf fonksiyonlar: veritabanı `lib/social-stats`, test `scripts/test-social-stats.ts`.
 *
 * HARMANLAMA KURALLARI (platformlar aynı adla farklı şey ölçebiliyor; yalnız karşılaştırılabilir olan toplanır):
 *  - İzlenme: TikTok `view_count`, Instagram Reels `views`, YouTube `viewCount`. Üçü de OYNATMA sayısı (tekrar
 *    oynatma dahil; YouTube Shorts'ta 2025'ten beri her oynatma sayılıyor) → toplanır.
 *  - Etkileşim = beğeni + yorum + paylaşım + kaydetme (platform hangisini veriyorsa; kaydetme yalnız Instagram,
 *    YouTube paylaşımı Analytics'ten 6 saatte bir ve 1–2 gün gecikmeli). Oran = etkileşim / izlenme.
 *  - Erişim (tekil hesap) yalnız Instagram'da: toplama girmez, yalnız Instagram satırında.
 *  - Ortalama izleme süresi Instagram ve YouTube'da var, TikTok API'si vermiyor: izlenmeyle AĞIRLIKLI ortalama, yalnız
 *    veren platformlardan. İzlenme oranı = ortalama süre / video süresi (tekrar oynatmayla %100'ü geçebilir).
 *  - Toplamlar seçili aralıkta YAYINLANAN videoların bugünkü değerleri; günlük grafik ise o gün KAZANILAN izlenme
 *    (anlık görüntü farkı). Karşılaştırmalar (yaklaşım, saat, tema) videonun yaşına göre yanıltmasın diye
 *    "ilk 24 saat" izlenmesiyle; 24 saati dolmamış video bu karşılaştırmaya girmez.
 */

export type Platform = "tiktok" | "instagram" | "youtube";
export const PLATFORM_KEYS: Platform[] = ["tiktok", "instagram", "youtube"];
export type Metrics = Record<string, number>;

export type StatEpisode = { id: string; title: string; slot: string | null; approach: string; theme: string; duration: number | null };
export type StatPost = { id: number; episodeId: string | null; platform: Platform; status: string; url: string | null; publishedAt: string | null; metrics: Metrics | null; metricsAt: string | null };
export type StatSnapshot = { postId: number; at: string; metrics: Metrics };
export type AccountDay = { platform: Platform; day: string; followers: number };
export type AccountNow = { platform: Platform; connected: boolean; ok: boolean; retrying?: boolean; followers: number | null; lastSyncAt: string | null; metricsAt: string | null; error: string | null; stale: boolean };

const TZ = "Europe/Berlin";
const HOUR = 3_600_000;
export const berlinDay = (ms: number) => new Date(ms).toLocaleDateString("sv-SE", { timeZone: TZ });
const addDays = (day: string, n: number) => {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);

export const views = (m: Metrics | null | undefined) => num(m?.views);
export const interactions = (m: Metrics | null | undefined) => num(m?.likes) + num(m?.comments) + num(m?.shares) + num(m?.saves);
export const rate = (inter: number, v: number) => (v > 0 ? inter / v : null);
export function median(xs: number[]): number | null {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** İzlenmeyle ağırlıklı ortalama izleme süresi ve oranı (yalnız süre veren gönderilerden). */
export function watch(items: { m: Metrics | null; duration: number | null }[]): { avgSec: number | null; pct: number | null } {
  let w = 0;
  let sec = 0;
  let wp = 0;
  let pct = 0;
  for (const { m, duration } of items) {
    const v = views(m);
    const a = m?.avgWatchSec;
    if (typeof a !== "number" || v <= 0) continue;
    w += v;
    sec += a * v;
    if (duration && duration > 0) {
      wp += v;
      pct += (a / duration) * v;
    }
  }
  return { avgSec: w ? sec / w : null, pct: wp ? pct / wp : null };
}

/** Gönderinin zaman çizgisi: anlık görüntüler + son değer (metrics_at), zamana göre. */
function points(p: StatPost, snaps: StatSnapshot[]): { t: number; v: number; m: Metrics }[] {
  const out = snaps.filter((s) => s.postId === p.id).map((s) => ({ t: Date.parse(s.at), v: views(s.metrics), m: s.metrics }));
  if (p.metrics && p.metricsAt) out.push({ t: Date.parse(p.metricsAt), v: views(p.metrics), m: p.metrics });
  return out.filter((x) => Number.isFinite(x.t)).sort((a, b) => a.t - b.t);
}

/**
 * Yayından `hours` saat sonraki izlenme. Saat dolmadıysa null. Öncesi ve sonrası ölçüm varsa doğrusal ara değer;
 * yalnız sonrası varsa en çok 6 saat geç ölçüm kabul (biraz fazla sayar), yalnız öncesi varsa en çok 2 saat erken.
 */
export function viewsAt(p: StatPost, snaps: StatSnapshot[], hours: number, now: number): number | null {
  const base = p.publishedAt ? Date.parse(p.publishedAt) : NaN;
  if (!Number.isFinite(base)) return null;
  const target = base + hours * HOUR;
  if (now < target) return null;
  const pts = points(p, snaps);
  let before: { t: number; v: number } | null = { t: base, v: 0 };
  let after: { t: number; v: number } | null = null;
  for (const x of pts) {
    if (x.t <= target) before = x;
    else if (!after) after = x;
  }
  if (after && before && before.t > base) return Math.round(before.v + ((after.v - before.v) * (target - before.t)) / (after.t - before.t));
  if (after && after.t - target <= 6 * HOUR) return after.v;
  if (before && before.t > base && target - before.t <= 2 * HOUR) return before.v;
  return null;
}

/** Gün gün KAZANILAN izlenme (Berlin günü). Anlık görüntü öncesi izlenmeler ilk ölçüm gününe yazılır. */
export function dailyGains(p: StatPost, snaps: StatSnapshot[], days: string[]): number[] {
  const pts = points(p, snaps);
  const byDay = new Map<string, number>();
  for (const x of pts) byDay.set(berlinDay(x.t), x.v); // günün son değeri (zamana göre sıralı)
  let prev = 0;
  // aralıktan önceki son değer
  const first = days[0];
  for (const [d, v] of [...byDay].sort((a, b) => a[0].localeCompare(b[0]))) if (d < first) prev = v;
  return days.map((d) => {
    const cur = byDay.get(d);
    if (cur === undefined) return 0;
    const g = Math.max(0, cur - prev);
    prev = Math.max(prev, cur);
    return g;
  });
}

export type PlatformRow = {
  platform: Platform;
  posts: number;
  views: number;
  medianViews: number | null;
  likes: number;
  comments: number;
  shares: number;
  saves: number | null;
  reach: number | null;
  interactions: number;
  rate: number | null;
  avgWatchSec: number | null;
  watchPct: number | null;
  followers: number | null;
  followersDelta: number | null;
  account: AccountNow | null;
};
export type PostCell = { status: string; url: string | null; publishedAt: string | null; metrics: Metrics | null; metricsAt: string | null; views24: number | null };
export type EpisodeRow = {
  id: string;
  title: string;
  slot: string | null;
  approach: string;
  theme: string;
  duration: number | null;
  publishedAt: string | null;
  cells: Partial<Record<Platform, PostCell>>;
  views: number;
  interactions: number;
  rate: number | null;
  avgWatchSec: number | null;
  watchPct: number | null;
  /** Yayında olan her platformun ilk 24 saati biliniyorsa toplamı */
  views24: number | null;
};
export type Group = { key: string; n: number; avg: Partial<Record<Platform | "total", { avg: number; n: number }>> };
export type Overview = {
  range: { key: string; from: string | null; to: string };
  totals: { videos: number; posts: number; views: number; interactions: number; rate: number | null; avgWatchSec: number | null; watchPct: number | null; followers: number | null; followersDelta: number | null };
  platforms: PlatformRow[];
  daily: { days: string[]; series: { platform: Platform; values: number[] }[] };
  followers: { days: string[]; series: { platform: Platform; values: (number | null)[] }[] };
  episodes: EpisodeRow[];
  groups: { approach: Group[]; slot: Group[]; theme: Group[]; pending24: number };
};

const published = (p: StatPost) => p.status === "published" && !!p.publishedAt;

/**
 * Genel bakış. `rangeDays` null: hepsi. Aralık YAYIN tarihine göre (bölümün ilk yayınlandığı platform). Günlük
 * grafik aralığın günleri (hepsi seçiliyse ilk yayından bugüne, en çok 120 gün).
 */
export function overview(input: { episodes: StatEpisode[]; posts: StatPost[]; snapshots: StatSnapshot[]; accountDays: AccountDay[]; accounts: AccountNow[]; now: number; rangeDays: number | null; rangeKey: string }): Overview {
  const { episodes, snapshots, accountDays, accounts, now, rangeDays } = input;
  const today = berlinDay(now);
  const from = rangeDays ? addDays(today, -(rangeDays - 1)) : null;
  const epById = new Map(episodes.map((e) => [e.id, e]));
  const pub = input.posts.filter((p) => published(p) && p.episodeId && epById.has(p.episodeId));

  // bölüm satırları (aralıktaki ilk yayına göre)
  const rows: EpisodeRow[] = [];
  for (const e of episodes) {
    const mine = pub.filter((p) => p.episodeId === e.id);
    if (!mine.length) continue;
    const first = Math.min(...mine.map((p) => Date.parse(p.publishedAt as string)));
    if (from && berlinDay(first) < from) continue;
    const cells: EpisodeRow["cells"] = {};
    for (const p of input.posts.filter((x) => x.episodeId === e.id)) {
      cells[p.platform] = { status: p.status, url: p.url, publishedAt: p.publishedAt, metrics: p.metrics, metricsAt: p.metricsAt, views24: published(p) ? viewsAt(p, snapshots, 24, now) : null };
    }
    const v = mine.reduce((a, p) => a + views(p.metrics), 0);
    const i = mine.reduce((a, p) => a + interactions(p.metrics), 0);
    const w = watch(mine.map((p) => ({ m: p.metrics, duration: e.duration })));
    const v24s = mine.map((p) => cells[p.platform]?.views24 ?? null);
    rows.push({
      id: e.id,
      title: e.title,
      slot: e.slot,
      approach: e.approach,
      theme: e.theme,
      duration: e.duration,
      publishedAt: new Date(first).toISOString(),
      cells,
      views: v,
      interactions: i,
      rate: rate(i, v),
      avgWatchSec: w.avgSec,
      watchPct: w.pct,
      views24: v24s.every((x) => x !== null) ? (v24s as number[]).reduce((a, b) => a + b, 0) : null,
    });
  }
  const inRange = new Set(rows.map((r) => r.id));
  const posts = pub.filter((p) => inRange.has(p.episodeId as string));

  // takipçi: gün gün (eksik gün öncekini taşır), aralık başına göre değişim
  const fDays = (() => {
    const known = accountDays.map((d) => d.day).sort();
    const start = from ?? known[0] ?? today;
    const out: string[] = [];
    for (let d = start; d <= today && out.length < 400; d = addDays(d, 1)) out.push(d);
    return out;
  })();
  const fSeries = PLATFORM_KEYS.map((platform) => {
    const mine = accountDays.filter((d) => d.platform === platform).sort((a, b) => a.day.localeCompare(b.day));
    let last: number | null = null;
    for (const d of mine) if (d.day < fDays[0]) last = d.followers;
    const values = fDays.map((day) => {
      const hit = mine.find((d) => d.day === day);
      if (hit) last = hit.followers;
      return last;
    });
    return { platform, values };
  });
  const followersOf = (platform: Platform) => accounts.find((a) => a.platform === platform)?.followers ?? null;
  const deltaOf = (platform: Platform) => {
    const now_ = followersOf(platform);
    const vals = fSeries.find((s) => s.platform === platform)?.values ?? [];
    const start = vals.find((v) => v !== null) ?? null;
    // geçmiş yalnız bugünse değişim bilinmiyor
    const firstDay = fDays[vals.findIndex((v) => v !== null)];
    return now_ !== null && start !== null && firstDay && firstDay < today ? now_ - start : null;
  };

  const platforms: PlatformRow[] = PLATFORM_KEYS.map((platform) => {
    const mine = posts.filter((p) => p.platform === platform);
    const sum = (k: string) => mine.reduce((a, p) => a + num(p.metrics?.[k]), 0);
    const has = (k: string) => mine.some((p) => typeof p.metrics?.[k] === "number");
    const v = sum("views");
    const i = mine.reduce((a, p) => a + interactions(p.metrics), 0);
    const w = watch(mine.map((p) => ({ m: p.metrics, duration: epById.get(p.episodeId as string)?.duration ?? null })));
    return {
      platform,
      posts: mine.length,
      views: v,
      medianViews: median(mine.map((p) => views(p.metrics))),
      likes: sum("likes"),
      comments: sum("comments"),
      shares: sum("shares"),
      saves: has("saves") ? sum("saves") : null,
      reach: has("reach") ? sum("reach") : null,
      interactions: i,
      rate: rate(i, v),
      avgWatchSec: w.avgSec,
      watchPct: w.pct,
      followers: followersOf(platform),
      followersDelta: deltaOf(platform),
      account: accounts.find((a) => a.platform === platform) ?? null,
    };
  });

  // günlük kazanılan izlenme
  const firstPub = pub.length ? berlinDay(Math.min(...pub.map((p) => Date.parse(p.publishedAt as string)))) : today;
  // grafik ilk yayından başlar (boş haftalar göstermez), en çok 120 gün
  const floor = from ?? addDays(today, -119);
  const dStart = firstPub > floor ? firstPub : floor;
  const days: string[] = [];
  for (let d = dStart; d <= today; d = addDays(d, 1)) days.push(d);
  const daily = {
    days,
    series: PLATFORM_KEYS.map((platform) => {
      const values = days.map(() => 0);
      for (const p of pub.filter((x) => x.platform === platform)) dailyGains(p, snapshots, days).forEach((g, k) => (values[k] += g));
      return { platform, values };
    }),
  };

  // karşılaştırmalar: ilk 24 saat izlenme ortalaması (platform başına ve bölüm toplamı)
  const group = (keyOf: (r: EpisodeRow) => string | null): Group[] => {
    const map = new Map<string, EpisodeRow[]>();
    for (const r of rows) {
      const k = keyOf(r);
      if (k) (map.get(k) || map.set(k, []).get(k))!.push(r);
    }
    return [...map].map(([key, list]) => {
      const avg: Group["avg"] = {};
      const add = (k: Platform | "total", xs: number[]) => {
        if (xs.length) avg[k] = { avg: xs.reduce((a, b) => a + b, 0) / xs.length, n: xs.length };
      };
      add("total", list.map((r) => r.views24).filter((x): x is number => x !== null));
      for (const pl of PLATFORM_KEYS) add(pl, list.map((r) => r.cells[pl]?.views24 ?? null).filter((x): x is number => x !== null));
      return { key, n: list.length, avg };
    });
  };
  const totalsWatch = watch(posts.map((p) => ({ m: p.metrics, duration: epById.get(p.episodeId as string)?.duration ?? null })));
  const tv = posts.reduce((a, p) => a + views(p.metrics), 0);
  const ti = posts.reduce((a, p) => a + interactions(p.metrics), 0);
  const fNow = PLATFORM_KEYS.map(followersOf);
  const fDelta = PLATFORM_KEYS.map(deltaOf);
  return {
    range: { key: input.rangeKey, from, to: today },
    totals: {
      videos: rows.length,
      posts: posts.length,
      views: tv,
      interactions: ti,
      rate: rate(ti, tv),
      avgWatchSec: totalsWatch.avgSec,
      watchPct: totalsWatch.pct,
      followers: fNow.some((x) => x !== null) ? fNow.reduce<number>((a, b) => a + (b ?? 0), 0) : null,
      followersDelta: fDelta.some((x) => x !== null) ? fDelta.reduce<number>((a, b) => a + (b ?? 0), 0) : null,
    },
    platforms,
    daily,
    followers: { days: fDays, series: fSeries },
    episodes: rows.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")),
    groups: {
      approach: group((r) => r.approach),
      slot: group((r) => r.slot?.slice(11) ?? null),
      theme: group((r) => r.theme),
      pending24: rows.filter((r) => r.views24 === null).length,
    },
  };
}

/** Büyüme eğrisi: yayından sonraki saat → izlenme (ilk 48 saat saatlik, sonra günlük; en çok 30 gün). */
export const GROWTH_STEPS: number[] = [...Array.from({ length: 48 }, (_, i) => i + 1), ...Array.from({ length: 28 }, (_, i) => (i + 3) * 24)];
export function growth(p: StatPost, snaps: StatSnapshot[], now: number): (number | null)[] {
  return GROWTH_STEPS.map((h) => viewsAt(p, snaps, h, now));
}
