import "server-only";
import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { mockExamAttempts } from "@/lib/db/schema";
import { mockPapersFor } from "@/lib/mock-exams";
import type { MockLevel } from "@/lib/mock-exams/types";
import { premiumConfig } from "./config";
import { isPremiumCached } from "./entitlement";
import { checkQuota, levelKey, type Period, type QuotaCheck } from "./quota";
import type { PremiumGate } from "./gates";

/**
 * KİLİT KARARLARI — "bu kullanıcı bunu yapabilir mi" sorusunun tek cevabı.
 *
 * Üç platform da bu kararları SUNUCUDAN alıyor. İstemcilerin kendi kopyası yok
 * ve olmamalı: aynı kilit web'de, Android'de ve iOS'ta aynı davranmak zorunda,
 * üstelik istemcide duran bir kilit kilit değildir. Arayüz yalnız kararı
 * ÇİZİYOR; kapıyı sunucu tutuyor (`/api/premium/access`, ve ilgili uçların
 * kendi içindeki kontroller).
 *
 * Her karar `reason` taşıyor çünkü arayüzün söyleyeceği cümle sebebe göre
 * değişiyor ve bu cümle dönüşümün kendisi: "premium'a geç" ile "hakkın yarın
 * yenilenecek" ile "önceki paketi bitir" bambaşka üç şey.
 */

export type AccessReason =
  | "premium" // yetkisi var
  | "free_quota" // ücretsiz hakkından karşılandı
  | "quota_spent" // ücretsiz hak bitti → paywall
  | "premium_only" // ücretsizde hiç yok → paywall
  | "fair_use" // premium ama günlük adil kullanım tavanı doldu
  | "locked_progression"; // premium ama önceki paket açılmadı

export type Access = {
  allowed: boolean;
  reason: AccessReason;
  gate: PremiumGate;
  /** Kota bilgisi — arayüz "2 hakkından 1'i kaldı" diyebilsin. */
  quota?: QuotaCheck;
  /**
   * Kararın DAYANDIĞI sayaç — eylem gerçekleşince artırılacak olan.
   *
   * Kararla birlikte dönüyor çünkü aynı `reason` iki farklı sayaçtan gelebiliyor:
   * ücretsiz bir kullanıcı ya seviye başına ömürlük hakkını ya da o bitince
   * haftalık yenilenen hakkını kullanıyor, ikisi de "free_quota". Sayacı
   * çağıran tarafta yeniden türetmek, kararı iki yerde yazmak olurdu ve ikisi
   * er geç ayrışırdı.
   */
  counter?: { key: string; period: Period };
};

/** Ücretsiz kotayı önce ömürlük, sonra haftalık yenilenen haktan karşılar. */
async function freeAiQuota(
  userId: string,
  gate: "speaking" | "writing",
  lifetimeKey: string,
  lifetimeLimit: number,
  weeklyLimit: number,
): Promise<Access> {
  const lifetime = await checkQuota(userId, lifetimeKey, "all", lifetimeLimit);
  if (lifetime.allowed) {
    return { allowed: true, reason: "free_quota", gate, quota: lifetime, counter: { key: lifetimeKey, period: "all" } };
  }

  // Ömürlük hak bitti: haftalık yenilenen hakka düş. Bu, ücretsiz kullanıcıyı
  // duvara çarpıp bir daha hiç dönmemekten kurtaran şey.
  const WEEKLY_KEY = "ai_practice_weekly";
  const weekly = await checkQuota(userId, WEEKLY_KEY, "week", weeklyLimit);
  if (weekly.allowed) {
    return { allowed: true, reason: "free_quota", gate, quota: weekly, counter: { key: WEEKLY_KEY, period: "week" } };
  }
  return { allowed: false, reason: "quota_spent", gate, quota: weekly };
}

/** Premium'un adil kullanım tavanı — kullanıcıya duyurulmuş sayı. */
async function fairUse(userId: string, gate: PremiumGate, key: string, limit: number, period: Period = "day"): Promise<Access> {
  const q = await checkQuota(userId, key, period, limit);
  return q.allowed
    ? { allowed: true, reason: "premium", gate, quota: q, counter: { key, period } }
    : { allowed: false, reason: "fair_use", gate, quota: q };
}

/**
 * Cepte / ekran kapalı yürüyüş.
 *
 * Ekran AÇIK yürüyüş buradan HİÇ geçmiyor: cihazın kendi tanıyıcısı kullanılıyor,
 * bize maliyeti yok ve iki katmanda da sınırsız. Kilit yalnız sunucu STT'ye
 * (Azure) düşen yolda.
 */
export async function canPocketWalk(userId: string): Promise<Access> {
  const cfg = await premiumConfig();
  const premium = await isPremiumCached(userId);
  if (premium) return fairUse(userId, "pocket_walk", "pocket_walk", cfg.fairUse.pocketWalksPerDay);
  const limit = cfg.free.pocketWalksPerDay;
  if (limit <= 0) return { allowed: false, reason: "premium_only", gate: "pocket_walk" };
  const q = await checkQuota(userId, "pocket_walk", "day", limit);
  return q.allowed
    ? { allowed: true, reason: "free_quota", gate: "pocket_walk", quota: q, counter: { key: "pocket_walk", period: "day" } }
    : { allowed: false, reason: "quota_spent", gate: "pocket_walk", quota: q };
}

/**
 * AI değerlendirmeli konuşma/yazma (ders ya da beceri).
 *
 * `scope` ayrımı ücretsiz kotanın nasıl sayıldığını belirliyor: dersler SEVİYE
 * başına, beceriler seviyeden bağımsız. Premium tarafta ikisi de aynı günlük
 * tavana bakıyor — maliyet ikisinde de aynı çağrı.
 */
export async function canAiPractice(
  userId: string,
  kind: "speaking" | "writing",
  scope: "lesson" | "skill",
  level: string,
): Promise<Access> {
  const cfg = await premiumConfig();
  if (await isPremiumCached(userId)) {
    return fairUse(userId, kind, "ai_practice", cfg.fairUse.aiPracticePerDay);
  }
  const lifetimeLimit =
    scope === "lesson"
      ? kind === "speaking"
        ? cfg.free.speakingLessonsPerLevel
        : cfg.free.writingLessonsPerLevel
      : kind === "speaking"
        ? cfg.free.speakingSkills
        : cfg.free.writingSkills;
  const key = scope === "lesson" ? levelKey(`${kind}_lesson`, level) : `${kind}_skill`;
  return freeAiQuota(userId, kind, key, lifetimeLimit, cfg.free.weeklyAiPractice);
}

/** Haftalık sınav — ücretsizde haftada N, premium'da havuzun tamamı. */
export async function canWeeklyExam(userId: string): Promise<Access> {
  const cfg = await premiumConfig();
  if (await isPremiumCached(userId)) return { allowed: true, reason: "premium", gate: "weekly_exam" };
  const limit = cfg.free.weeklyExams;
  if (limit <= 0) return { allowed: false, reason: "premium_only", gate: "weekly_exam" };
  const q = await checkQuota(userId, "weekly_exam", "week", limit);
  return q.allowed
    ? { allowed: true, reason: "free_quota", gate: "weekly_exam", quota: q, counter: { key: "weekly_exam", period: "week" } }
    : { allowed: false, reason: "quota_spent", gate: "weekly_exam", quota: q };
}

/* ───────────────────────── Deneme sınavı ilerlemesi ───────────────────────── */

export type MockPack = {
  /** Paketteki kâğıt kimlikleri, sırayla. */
  ids: string[];
  unlocked: boolean;
  /** Paketteki nesnel maddelerin doğruluk yüzdesi (hiç çözülmediyse null). */
  pct: number | null;
  /** Kaç kâğıt en az bir kez bitirildi. */
  done: number;
};

export type MockAccess = {
  premium: boolean;
  /** Açık kâğıt kimlikleri. */
  unlocked: string[];
  packs: MockPack[];
  /** Sonraki paketi açmak için gereken yüzde. */
  unlockPct: number;
  /** Paketi bitirmenin de açtığı (emniyet supabı) — paywall metni buna bakıyor. */
  unlockOnComplete: boolean;
  freeLimit: number;
};

/**
 * Bir seviyedeki kâğıtların açık/kilitli durumu.
 *
 * ÜCRETSİZ: ilk `mockPapersPerLevel` kâğıt. İlerleme kuralı işlemiyor — ücretsiz
 * kullanıcı zaten tek kâğıt görüyor, üstüne bir de puan kapısı koymak "değeri
 * göster" amacını bozardı.
 *
 * PREMIUM: paketler sırayla. İlk paket her zaman açık. Sonraki paket iki yoldan
 * açılıyor:
 *   1. Önceki pakette nesnel doğruluk ≥ `unlockPct` — BAŞARI HIZLANDIRIR: üç
 *      kâğıdın ikisi %80 ile bitirildiyse üçüncüyü beklemeden sonraki paket açılır.
 *   2. `unlockOnComplete` açıkken paketteki her kâğıt en az bir kez bitirildiyse —
 *      ÇABA DA AÇAR. Bu supap olmadan %60'ı tutturamayan bir premium kullanıcı
 *      parasını ödeyip hiçbir yeni kâğıt göremezdi.
 *
 * Yüzde kâğıt başına değil MADDE başına ağırlıklı: uzun bir kâğıdın 40 maddesi
 * ile kısa bir kâğıdın 20 maddesi eşit sayılsaydı, kısa kâğıtta iyi olan biri
 * ortalamayı hak etmeden yukarı çekerdi.
 */
export async function mockAccess(userId: string | null, level: MockLevel, course: string): Promise<MockAccess> {
  const cfg = await premiumConfig();
  const papers = mockPapersFor(level, course).map((p) => p.id);
  const premium = await isPremiumCached(userId);
  const freeLimit = cfg.free.mockPapersPerLevel;

  if (!premium) {
    return {
      premium: false,
      unlocked: papers.slice(0, freeLimit),
      packs: [],
      unlockPct: cfg.mock.unlockPct,
      unlockOnComplete: cfg.mock.unlockOnComplete,
      freeLimit,
    };
  }

  // Bitmiş denemeler — kâğıt başına doğru/toplam ve "bitirildi mi".
  const stat = new Map<string, { correct: number; total: number; done: boolean }>();
  if (userId && papers.length) {
    try {
      const rows = await db
        .select({
          paperId: mockExamAttempts.paperId,
          correct: mockExamAttempts.correct,
          total: mockExamAttempts.total,
        })
        .from(mockExamAttempts)
        .where(
          and(
            eq(mockExamAttempts.userId, userId),
            isNotNull(mockExamAttempts.finishedAt),
            inArray(mockExamAttempts.paperId, papers),
          ),
        );
      for (const r of rows) {
        const s = stat.get(r.paperId) ?? { correct: 0, total: 0, done: false };
        s.correct += r.correct;
        s.total += r.total;
        s.done = true;
        stat.set(r.paperId, s);
      }
    } catch {
      // İlerleme okunamadı: yalnız ilk paket açık kalır. Ödeme yapmış kullanıcıyı
      // tamamen kilitlememek için ilk paket her koşulda açık.
    }
  }

  const { packs, unlocked } = computePacks(papers, stat, cfg.mock);
  return { premium: true, unlocked, packs, unlockPct: cfg.mock.unlockPct, unlockOnComplete: cfg.mock.unlockOnComplete, freeLimit };
}

/** Tek kâğıt açık mı — oynatıcı başlarken sorulan soru. */
export async function canMockPaper(userId: string | null, paperId: string, level: MockLevel, course: string): Promise<Access> {
  const a = await mockAccess(userId, level, course);
  if (a.unlocked.includes(paperId)) {
    return { allowed: true, reason: a.premium ? "premium" : "free_quota", gate: "mock_exam" };
  }
  return {
    allowed: false,
    reason: a.premium ? "locked_progression" : "premium_only",
    gate: "mock_exam",
  };
}

/** Bir kâğıdın biriken istatistiği — `computePacks` girdisi. */
export type PaperStat = { correct: number; total: number; done: boolean };

/**
 * Paket ilerlemesinin SAF hesabı — veritabanına dokunmaz.
 *
 * `mockAccess`ten ayrıldı ki kural veritabanı olmadan sınanabilsin
 * (`scripts/test-premium.ts`). Kilidin doğru davranması iki uçta da kritik:
 * gevşek olursa premium'un anlamı kalmaz, sıkı olursa ödeme yapmış kullanıcı
 * kilitli kalır — ikisi de ancak gerçek verinin üstünde fark edilirdi.
 */
export function computePacks(
  papers: string[],
  stat: Map<string, PaperStat>,
  rule: { packSize: number; unlockPct: number; unlockOnComplete: boolean },
): { packs: MockPack[]; unlocked: string[] } {
  const size = Math.max(1, rule.packSize);
  const packs: MockPack[] = [];
  const unlocked: string[] = [];
  let open = true; // ilk paket her zaman açık

  for (let i = 0; i < papers.length; i += size) {
    const ids = papers.slice(i, i + size);
    let correct = 0;
    let total = 0;
    let done = 0;
    for (const id of ids) {
      const s = stat.get(id);
      if (!s) continue;
      correct += s.correct;
      total += s.total;
      if (s.done) done++;
    }
    // Yüzde kâğıt başına değil MADDE başına ağırlıklı: 40 maddelik bir kâğıtla
    // 20 maddelik biri eşit sayılsaydı, kısa kâğıtta iyi olan ortalamayı hak
    // etmeden yukarı çekerdi.
    const pct = total > 0 ? Math.round((100 * correct) / total) : null;
    packs.push({ ids, unlocked: open, pct, done });
    if (open) unlocked.push(...ids);

    // Sonraki paketin kapısı: BAŞARI ya da TAMAMLAMA. `open &&` zinciri
    // önemli — kapalı bir paketin arkasındaki paket, içi boş olduğu için
    // "tamamlandı" sayılıp açılmamalı.
    const byScore = pct !== null && pct >= rule.unlockPct;
    const byEffort = rule.unlockOnComplete && done >= ids.length;
    open = open && (byScore || byEffort);
  }
  return { packs, unlocked };
}
