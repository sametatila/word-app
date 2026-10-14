import "server-only";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { socialAccountDays, socialEpisodes, socialPostSnapshots, socialPosts, socialRenders } from "@/lib/db/schema";
import { instagramStatus, tiktokStatus, youtubeStatus } from "@/lib/social-posts";
import { LONG_THEME } from "@/lib/studio";
import { GROWTH_STEPS, PLATFORM_KEYS, growth, overview, viewsAt, type AccountNow, type Overview, type Platform, type StatEpisode, type StatPost, type StatSnapshot } from "@/lib/social-stats-core";

/**
 * Stüdyo istatistikleri: veritabanından okur, hesap `lib/social-stats-core` (harmanlama kuralları orada).
 * Geçmiş tabloları (`social_post_snapshots`, `social_account_days`) işçilerin `scripts/social/lib/stats.mjs`i yazar.
 */

const iso = (d: Date | null) => (d ? d.toISOString() : null);

async function load() {
  const [eps, posts, renders, snaps, days, ig, tt, yt] = await Promise.all([
    db.select({ id: socialEpisodes.id, template: socialEpisodes.template, format: socialEpisodes.format, slot: socialEpisodes.slot, data: socialEpisodes.data, ytTitle: socialEpisodes.ytTitle }).from(socialEpisodes),
    db.select().from(socialPosts),
    db.select({ episodeId: socialRenders.episodeId, duration: socialRenders.duration }).from(socialRenders).where(eq(socialRenders.status, "done")).orderBy(desc(socialRenders.id)),
    db.select().from(socialPostSnapshots),
    db.select().from(socialAccountDays),
    instagramStatus(),
    tiktokStatus(),
    youtubeStatus(),
  ]);
  const duration = new Map<string, number>();
  for (const r of renders) if (r.duration && !duration.has(r.episodeId)) duration.set(r.episodeId, r.duration);
  const episodes: (StatEpisode & { ytTitle: string | null })[] = eps.map((e) => {
    // yatay (YouTube uzun video): yaklaşım "yatay" (kısa videolarla aynı kefeye konmaz), tema serinin teması
    if (e.format === "yatay") {
      const title = [e.data.series, e.data.ep].filter((x) => typeof x === "string" && x).join(": ") || e.id;
      return { id: e.id, title, slot: e.slot, approach: e.format, theme: LONG_THEME[e.template] ?? e.template, duration: duration.get(e.id) ?? null, ytTitle: e.ytTitle };
    }
    const t = (e.data.copy as { title?: unknown } | undefined)?.title;
    const [approach, theme] = e.template.split("-");
    return { id: e.id, title: typeof t === "string" && t ? t : e.id, slot: e.slot, approach, theme, duration: duration.get(e.id) ?? null, ytTitle: e.ytTitle };
  });
  const statPosts: StatPost[] = posts
    .filter((p) => (PLATFORM_KEYS as string[]).includes(p.platform))
    .map((p) => ({ id: p.id, episodeId: p.episodeId, platform: p.platform as Platform, status: p.status, url: p.url, publishedAt: iso(p.publishedAt), metrics: p.metrics ?? null, metricsAt: iso(p.metricsAt) }));
  const snapshots: StatSnapshot[] = snaps.map((s) => ({ postId: s.postId, at: s.at.toISOString(), metrics: s.metrics }));
  const accounts: AccountNow[] = (
    [
      ["tiktok", tt],
      ["instagram", ig],
      ["youtube", yt],
    ] as const
  ).map(([platform, s]) => ({ platform, connected: s.connected, ok: s.ok, retrying: s.retrying, followers: s.followers, lastSyncAt: s.lastSyncAt, metricsAt: s.metricsAt, error: s.error, stale: s.stale }));
  return { episodes, posts: statPosts, snapshots, accountDays: days.map((d) => ({ platform: d.platform as Platform, day: d.day, followers: d.followers })), accounts };
}

export const RANGES = ["7", "30", "all"] as const;
export type RangeKey = (typeof RANGES)[number];
export const isRange = (v: unknown): v is RangeKey => (RANGES as readonly unknown[]).includes(v);

/** Genel bakış. Tablolar yoksa (göç uygulanmamış) `missing`. */
export async function studioOverview(range: RangeKey): Promise<{ data: Overview; missing: false } | { data: null; missing: true }> {
  try {
    const d = await load();
    return { data: overview({ ...d, now: Date.now(), rangeDays: range === "all" ? null : Number(range), rangeKey: range }), missing: false };
  } catch (err) {
    console.error("[social-stats] okunamadı", err);
    return { data: null, missing: true };
  }
}

export type PostPerformance = {
  episode: StatEpisode & { ytTitle: string | null };
  steps: number[];
  platforms: { platform: Platform; status: string; url: string | null; publishedAt: string | null; metrics: Record<string, number> | null; metricsAt: string | null; views24: number | null; growth: (number | null)[]; snapshots: number }[];
  /** Aynı platformdaki öbür videoların ilk 24 saat medyanı (kıyas için) */
  peers24: Partial<Record<Platform, { median: number; n: number }>>;
  overview: Overview;
};

/** Tek bölümün performansı: platform başına bütün metrikler, büyüme eğrisi, öbür videolarla kıyas. */
export async function postPerformance(episodeId: string): Promise<PostPerformance | null> {
  const d = await load();
  const episode = d.episodes.find((e) => e.id === episodeId);
  if (!episode) return null;
  const now = Date.now();
  const ov = overview({ ...d, now, rangeDays: null, rangeKey: "all" });
  const peers24: PostPerformance["peers24"] = {};
  for (const pl of PLATFORM_KEYS) {
    const xs = ov.episodes.filter((r) => r.id !== episodeId).map((r) => r.cells[pl]?.views24 ?? null).filter((x): x is number => x !== null).sort((a, b) => a - b);
    if (xs.length) peers24[pl] = { median: xs.length % 2 ? xs[(xs.length - 1) / 2] : (xs[xs.length / 2 - 1] + xs[xs.length / 2]) / 2, n: xs.length };
  }
  const mine = d.posts.filter((p) => p.episodeId === episodeId);
  return {
    episode,
    steps: GROWTH_STEPS,
    platforms: PLATFORM_KEYS.map((platform) => {
      const p = mine.find((x) => x.platform === platform);
      if (!p) return { platform, status: "planned", url: null, publishedAt: null, metrics: null, metricsAt: null, views24: null, growth: [], snapshots: 0 };
      const live = p.status === "published" && !!p.publishedAt;
      return {
        platform,
        status: p.status,
        url: p.url,
        publishedAt: p.publishedAt,
        metrics: p.metrics,
        metricsAt: p.metricsAt,
        views24: live ? viewsAt(p, d.snapshots, 24, now) : null,
        growth: live ? growth(p, d.snapshots, now) : [],
        snapshots: d.snapshots.filter((s) => s.postId === p.id).length,
      };
    }),
    peers24,
    overview: ov,
  };
}

/** Editör başlığındaki kısa özet için: bölümün yayında olduğu platformların toplam izlenmesi. */
export async function episodeViews(episodeId: string): Promise<number | null> {
  const rows = await db.select({ metrics: socialPosts.metrics, status: socialPosts.status }).from(socialPosts).where(inArray(socialPosts.episodeId, [episodeId]));
  const live = rows.filter((r) => r.status === "published");
  return live.length ? live.reduce((a, r) => a + Number(r.metrics?.views ?? 0), 0) : null;
}
