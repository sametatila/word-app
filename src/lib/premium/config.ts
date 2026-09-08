import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { appSettings } from "@/lib/db/schema";
import { DEFAULT_PREMIUM_CONFIG, type PlanPrice, type PremiumConfig } from "./gates";

/**
 * Yürürlükteki premium yapılandırması — kod varsayılanı + panelden gelen üstyazım.
 *
 * OKUMA SICAK YOLDA: her kilit kontrolü buradan geçiyor, yani sayfa başına
 * onlarca kez. Bu yüzden kısa ömürlü bir bellek önbelleği var. TTL bilerek
 * küçük: panelde bir sayı değiştiren kişi etkisini saniyeler içinde görmeli,
 * yoksa "değişmedi" deyip iki kez değiştirir.
 *
 * ÖNBELLEK SÜRECE ÖZEL. Sunucu blue-green'de renk başına üç instance koşuyor
 * (AGENTS.md), yani bir kaydın tüm instance'lara yayılması en kötü ihtimalle
 * TTL kadar sürer. Yetki değil AYAR taşıdığı için bu kabul edilebilir: aradaki
 * saniyelerde bir kullanıcı eski limitle karşılaşır, kimse yetkisini kaybetmez.
 *
 * OKUMA ASLA PATLAMAZ. Veritabanı okunamazsa varsayılana düşülür ve uygulama
 * çalışmaya devam eder. Alternatifi — ayar okunamadığı için kilit kontrolünün
 * hata vermesi — kullanıcıyı ürünün tamamından eder.
 */
const KEY = "premium.config";
const TTL_MS = 30_000;

let cache: { at: number; value: PremiumConfig } | null = null;

/** Panelden gelen değeri güvenli aralığa çeker. Bozuk/eksik alan varsayılana düşer. */
function int(v: unknown, fallback: number, min: number, max: number): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

/** Metin alanı: boş/uzun/yanlış tipte olan varsayılana düşer. */
function str(v: unknown, fallback: string, max = 120): string {
  if (typeof v !== "string") return fallback;
  const t = v.trim();
  return t && t.length <= max ? t : fallback;
}

/**
 * Fiyat listesi. Tutarlar METİN olarak tutuluyor, sayı olarak değil: gösterim
 * biçimi (binlik ayracı, para birimi simgesinin yeri, virgül) bölgeye göre
 * değişiyor ve bunu sayıdan yeniden üretmek her bölge için ayrı bir kural
 * demek. Zaten mobilde gerçek fiyat mağazadan geliyor; burası vitrin.
 */
function prices(v: unknown, fallback: PlanPrice[]): PlanPrice[] {
  if (!Array.isArray(v) || v.length === 0) return fallback;
  const out = v.slice(0, 20).map((raw) => {
    const p = (raw ?? {}) as Record<string, unknown>;
    return {
      region: str(p.region, "?", 16),
      currency: str(p.currency, "?", 8),
      monthly: str(p.monthly, "", 32),
      yearly: str(p.yearly, "", 32),
      yearlySavePct: int(p.yearlySavePct, 0, 0, 99),
    };
  }).filter((p) => p.monthly && p.yearly);
  return out.length ? out : fallback;
}

/**
 * Ham JSON'u geçerli bir yapılandırmaya çevirir.
 *
 * Üst sınırlar keyfi değil, KORUMA: panelde yanlışlıkla yazılan bir sayı
 * (ör. ücretsiz katmana 100000 AI değerlendirmesi) faturayı patlatabilir ya da
 * premium'u anlamsız kılabilir. Alt sınır 0, çünkü "bu özellik ücretsizde hiç
 * yok" geçerli bir ayar (cepte yürüyüşün varsayılanı tam olarak bu).
 */
export function parsePremiumConfig(raw: unknown): PremiumConfig {
  const d = DEFAULT_PREMIUM_CONFIG;
  const o = (raw ?? {}) as Record<string, Record<string, unknown> | undefined>;
  const f = o.free ?? {};
  const u = o.fairUse ?? {};
  const m = o.mock ?? {};
  const r = o.referral ?? {};
  const pl = o.plans ?? {};
  return {
    free: {
      mockPapersPerLevel: int(f.mockPapersPerLevel, d.free.mockPapersPerLevel, 0, 50),
      weeklyExams: int(f.weeklyExams, d.free.weeklyExams, 0, 50),
      pocketWalksPerDay: int(f.pocketWalksPerDay, d.free.pocketWalksPerDay, 0, 100),
      speakingLessonsPerLevel: int(f.speakingLessonsPerLevel, d.free.speakingLessonsPerLevel, 0, 100),
      writingLessonsPerLevel: int(f.writingLessonsPerLevel, d.free.writingLessonsPerLevel, 0, 100),
      speakingSkills: int(f.speakingSkills, d.free.speakingSkills, 0, 100),
      writingSkills: int(f.writingSkills, d.free.writingSkills, 0, 100),
      weeklyAiPractice: int(f.weeklyAiPractice, d.free.weeklyAiPractice, 0, 100),
    },
    fairUse: {
      // Tavan 1'den küçük olamaz: 0 yazılırsa premium kullanıcı hiçbir şey
      // yapamaz ve bu, parasını ödemiş birini kilitlemek demektir.
      pocketWalksPerDay: int(u.pocketWalksPerDay, d.fairUse.pocketWalksPerDay, 1, 500),
      aiPracticePerDay: int(u.aiPracticePerDay, d.fairUse.aiPracticePerDay, 1, 500),
    },
    mock: {
      packSize: int(m.packSize, d.mock.packSize, 1, 20),
      unlockPct: int(m.unlockPct, d.mock.unlockPct, 0, 100),
      unlockOnComplete: bool(m.unlockOnComplete, d.mock.unlockOnComplete),
    },
    referral: {
      rewardDays: int(r.rewardDays, d.referral.rewardDays, 0, 365),
      maxRewards: int(r.maxRewards, d.referral.maxRewards, 0, 10_000),
    },
    plans: {
      productMonthly: str(pl.productMonthly, d.plans.productMonthly),
      productYearly: str(pl.productYearly, d.plans.productYearly),
      trialDays: int(pl.trialDays, d.plans.trialDays, 0, 365),
      prices: prices(pl.prices, d.plans.prices),
    },
  };
}

export async function premiumConfig(): Promise<PremiumConfig> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.value;
  try {
    const [row] = await db.select({ value: appSettings.value }).from(appSettings).where(eq(appSettings.key, KEY)).limit(1);
    const value = parsePremiumConfig(row?.value);
    cache = { at: now, value };
    return value;
  } catch {
    // Okunamadı: varsayılanla devam et ama ÖNBELLEĞE ALMA — bir sonraki istek
    // yeniden denesin, geçici bir kesinti yüzünden yarım saat varsayılanla
    // koşmayalım.
    return DEFAULT_PREMIUM_CONFIG;
  }
}

/**
 * Paneldeki kaydetme. Gelen veri `parsePremiumConfig`ten geçirilerek yazılıyor,
 * yani veritabanına hiçbir zaman geçersiz bir yapılandırma girmiyor.
 */
export async function savePremiumConfig(raw: unknown, actor: string | null): Promise<PremiumConfig> {
  const value = parsePremiumConfig(raw);
  await db
    .insert(appSettings)
    .values({ key: KEY, value, updatedBy: actor })
    .onConflictDoUpdate({ target: appSettings.key, set: { value, updatedBy: actor, updatedAt: new Date() } });
  cache = { at: Date.now(), value };
  return value;
}

/** Testler ve panel kaydından sonra: önbelleği düşür. */
export function clearPremiumConfigCache(): void {
  cache = null;
}
