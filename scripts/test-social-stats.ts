/**
 * Sosyal istatistik hesabının birim testi (`src/lib/social-stats-core`): üç platformun harmanlanması, ilk 24 saat,
 * günlük kazanılan izlenme. Veritabanı istemiyor.
 */
import assert from "node:assert/strict";
import { dailyGains, interactions, overview, viewsAt, watch, type StatPost, type StatSnapshot } from "../src/lib/social-stats-core";

const H = 3_600_000;
const t0 = Date.parse("2026-10-12T10:30:00Z"); // 12:30 Berlin
const iso = (ms: number) => new Date(ms).toISOString();
const post = (id: number, platform: StatPost["platform"], m: Record<string, number>, metricsAt: number, episodeId = "kelime-kagit-001", publishedAt = t0): StatPost => ({ id, episodeId, platform, status: "published", url: null, publishedAt: iso(publishedAt), metrics: m, metricsAt: iso(metricsAt) });

// etkileşim: platform hangisini veriyorsa (kaydetme yalnız Instagram)
assert.equal(interactions({ views: 100, likes: 4, comments: 1, shares: 2, saves: 3, reach: 50 }), 10);
assert.equal(interactions({ views: 100, likes: 4 }), 4);

// izleme süresi izlenmeyle ağırlıklı, TikTok (süre yok) katılmaz
const w = watch([{ m: { views: 100, avgWatchSec: 10 }, duration: 20 }, { m: { views: 300, avgWatchSec: 6 }, duration: 20 }, { m: { views: 1000 }, duration: 20 }]);
assert.equal(w.avgSec, 7);
assert.equal(w.pct, 0.35);

// ilk 24 saat: öncesi ve sonrası ölçüm → ara değer
const p = post(1, "instagram", { views: 300 }, t0 + 30 * H);
const snaps: StatSnapshot[] = [
  { postId: 1, at: iso(t0 + 2 * H), metrics: { views: 50 } },
  { postId: 1, at: iso(t0 + 23 * H), metrics: { views: 200 } },
  { postId: 1, at: iso(t0 + 25 * H), metrics: { views: 220 } },
];
assert.equal(viewsAt(p, snaps, 24, t0 + 31 * H), 210);
assert.equal(viewsAt(p, snaps, 24, t0 + 20 * H), null, "24 saat dolmadıysa yok");
// yalnız çok geç ölçüm varsa (ör. 3 gün sonra) bilinmiyor; 6 saat içindeyse kabul
assert.equal(viewsAt(post(2, "tiktok", { views: 900 }, t0 + 72 * H), [], 24, t0 + 80 * H), null);
assert.equal(viewsAt(post(3, "tiktok", { views: 90 }, t0 + 27 * H), [], 24, t0 + 28 * H), 90);

// günlük kazanılan izlenme (Berlin günü)
const days = ["2026-10-12", "2026-10-13", "2026-10-14"];
// 12'si: 14:30'da 50; 13'ü: 11:30 200, 13:30 220, 18:30 son değer 300
assert.deepEqual(dailyGains(p, snaps, days), [50, 250, 0]);
// aralık 13'ünden başlarsa öncesi (50) taban
assert.deepEqual(dailyGains(p, snaps, days.slice(1)), [250, 0]);

// genel bakış: izlenme üç platformda toplanır, erişim yalnız Instagram'da, oran etkileşim/izlenme
const now = t0 + 31 * H;
const posts: StatPost[] = [
  post(10, "tiktok", { views: 100, likes: 5, comments: 1, shares: 1 }, now - H),
  post(11, "instagram", { views: 200, likes: 10, comments: 2, shares: 0, saves: 3, reach: 120, avgWatchSec: 8 }, now - H),
  post(12, "youtube", { views: 50, likes: 1, comments: 0, avgWatchSec: 12 }, now - H),
  { ...post(13, "tiktok", { views: 999 }, now - H, "kur-gece-001"), status: "scheduled" }, // yayında değil: sayılmaz
];
const ov = overview({
  episodes: [
    { id: "kelime-kagit-001", title: "Resmî daire", slot: "2026-10-12 12:30", approach: "kelime", theme: "kagit", duration: 20 },
    { id: "kur-gece-001", title: "Kafede", slot: "2026-10-13 12:30", approach: "kur", theme: "gece", duration: 30 },
  ],
  posts,
  snapshots: [],
  accountDays: [
    { platform: "instagram", day: "2026-10-12", followers: 590 },
    { platform: "instagram", day: "2026-10-13", followers: 596 },
  ],
  accounts: [
    { platform: "tiktok", connected: true, ok: true, followers: 1062, lastSyncAt: null, metricsAt: null, error: null, stale: false },
    { platform: "instagram", connected: true, ok: true, followers: 596, lastSyncAt: null, metricsAt: null, error: null, stale: false },
    { platform: "youtube", connected: true, ok: true, followers: 1, lastSyncAt: null, metricsAt: null, error: null, stale: false },
  ],
  now,
  rangeDays: 30,
  rangeKey: "30",
});
assert.equal(ov.totals.views, 350);
assert.equal(ov.totals.videos, 1);
assert.equal(ov.totals.posts, 3);
assert.equal(ov.totals.interactions, 7 + 15 + 1);
assert.equal(ov.totals.rate, 23 / 350);
assert.equal(ov.totals.avgWatchSec, (200 * 8 + 50 * 12) / 250, "TikTok izleme süresine katılmaz");
assert.equal(ov.totals.followers, 1062 + 596 + 1);
assert.equal(ov.platforms.find((x) => x.platform === "instagram")?.reach, 120);
assert.equal(ov.platforms.find((x) => x.platform === "tiktok")?.reach, null);
assert.equal(ov.platforms.find((x) => x.platform === "tiktok")?.saves, null);
assert.equal(ov.platforms.find((x) => x.platform === "instagram")?.followersDelta, 0 + 6);
assert.equal(ov.platforms.find((x) => x.platform === "tiktok")?.followersDelta, null, "geçmişi olmayan platformda değişim bilinmiyor");
assert.equal(ov.episodes[0].views24, 350, "24. saatten 6 saat içindeki ölçüm ilk 24 saat sayılır (üç platform toplamı)");

console.log("✓ sosyal istatistik: harmanlama, ilk 24 saat, günlük kazanım");
