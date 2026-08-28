/**
 * Seri (streak) hesabı birim testi: npm run test:award
 *
 * Asıl sınanan: gün GERİ gittiğinde (saat dilimi gürültüsü / geç istek) seri
 * BOZULMUYOR. Samet 10 gün kesintisiz çalışmışken serisi 2'ye düşmüştü çünkü
 * uçların bir kısmı yerel gün, bir kısmı UTC gün gönderiyordu.
 */
import assert from "node:assert/strict";
import { nextStreak, type StreakInput } from "../src/lib/award";

const base = (over: Partial<StreakInput> = {}): StreakInput => ({
  lastActiveDay: "2026-08-27",
  currentStreak: 10,
  longestStreak: 10,
  streakRepairAt: null,
  ...over,
});

// Ardışık gün → +1
assert.equal(nextStreak(base(), "2026-08-28").currentStreak, 11, "ardışık gün seriyi artırır");

// Aynı gün tekrar → değişmez
assert.equal(nextStreak(base(), "2026-08-27").currentStreak, 10, "aynı gün dondurur");

// GÜN GERİ (UTC+3 gece: yerel 28 yazılmış, sonra UTC 27 geliyor) → BOZULMAZ
assert.equal(nextStreak(base({ lastActiveDay: "2026-08-28" }), "2026-08-27").currentStreak, 10, "geri giden gün seriyi düşürmez");
assert.equal(nextStreak(base({ lastActiveDay: "2026-08-28" }), "2026-08-26").currentStreak, 10, "iki gün geri de düşürmez");

// Gerçek kaçırma (iki tam gün ileri, onarım hakkı yok çünkü 2 günden fazla) → sıfır
assert.equal(nextStreak(base({ lastActiveDay: "2026-08-24" }), "2026-08-28").currentStreak, 1, "3+ gün boşluk sıfırlar");

// Tek gün kaçırma + onarım hakkı → seri korunur (+1, repaired)
const rep = nextStreak(base({ lastActiveDay: "2026-08-26", streakRepairAt: null }), "2026-08-28");
assert.equal(rep.currentStreak, 11, "tek gün boşluk onarılır");
assert.ok(rep.repaired, "onarım işaretlenir");

// Seri 1'den küçükken onarım yok
assert.equal(nextStreak(base({ lastActiveDay: "2026-08-26", currentStreak: 1 }), "2026-08-28").currentStreak, 1, "korunacak seri yoksa onarım yok");

// longest korunur/güncellenir
assert.equal(nextStreak(base({ currentStreak: 10, longestStreak: 10 }), "2026-08-28").longestStreak, 11);
assert.equal(nextStreak(base({ lastActiveDay: "2026-08-28", currentStreak: 5, longestStreak: 10 }), "2026-08-27").longestStreak, 10, "geri gitmede longest de bozulmaz");

console.log("test:award — ardışık/aynı/geri/kaçırma/onarım/longest: tamam");
