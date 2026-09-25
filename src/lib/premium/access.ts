import "server-only";
import { and, eq, inArray, isNotNull, like, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { mockExamAttempts, profiles, usageCounters, userConversations } from "@/lib/db/schema";
import { mockCourseOf } from "@/lib/courses";
import { mockCatalogFor, mockPapersFor } from "@/lib/mock-exams/serve";
import type { MockLevel } from "@/lib/mock-exams/types";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { premiumConfig } from "./config";
import { isPremiumCached } from "./entitlement";
import { bumpUsage, checkQuota, getUsage, levelKey, periodKey, refundUsage, takeUsage, type Period, type QuotaCheck } from "./quota";
import type { PremiumConfig, PremiumGate } from "./gates";
import {
  freeUnlock,
  liveStreak,
  premiumMockUnlock,
  type FreeUnlock,
  type MockUnlock,
  type TierRule,
  type TieredUnlock,
  type WalkUnlock,
} from "./unlock";

/**
 * KİLİT KARARLARI — "bu kullanıcı bunu yapabilir mi" sorusunun tek cevabı.
 *
 * Üç platform da bu kararları SUNUCUDAN alıyor. İstemcilerin kendi kopyası yok
 * ve olmamalı: aynı kilit web'de, Android'de ve iOS'ta aynı davranmak zorunda,
 * üstelik istemcide duran bir kilit kilit değildir. Arayüz yalnız kararı
 * ÇİZİYOR; kapıyı sunucu tutuyor (ilgili uçların kendi içindeki kontroller).
 *
 * KURAL 2026-09-25 (`docs/premium/README.md` §2): kotalı her yüzeyin AYRI sayacı
 * var ve ücretsiz hak "taban + (bitir + 7 günlük seri) dilimleri" ile büyüyor.
 * Hak hesabı `unlock.ts`te, saf; burası yalnız veriyi okuyup kararı veriyor.
 * Haftada 2 yenilenen ortak hak (`ai_practice_weekly`) KALKTI: hak bitince yol
 * seriden ve bitirmekten geçiyor ya da Premium'dan.
 */

export type AccessReason =
  | "premium" // yetkisi var
  | "free_quota" // ücretsiz hakkından karşılandı
  | "quota_spent" // ücretsiz hak bitti → paywall
  | "premium_only" // ücretsizde hiç yok → paywall
  | "fair_use" // premium ama günlük kötüye kullanım tavanı doldu
  | "locked_progression"; // premium ama önceki paket bitmedi

export type Access = {
  allowed: boolean;
  reason: AccessReason;
  gate: PremiumGate;
  /** Kota bilgisi — arayüz "2 hakkından 1'i kaldı" diyebilsin. */
  quota?: QuotaCheck;
  /** Kararın dayandığı sayaç (bilgi amaçlı). */
  counter?: { key: string; period: Period };
};

/* ─────────────────────────── Kademeli yüzeyler ─────────────────────────── */

/**
 * Seviye başına sayılan dört yapay zekâ yüzeyi — hepsi AYRI sayaç.
 *
 *  - `conversation`   Patika Konuşma adımı (anlatım + sohbet + puanlı kısım, tek hak)
 *  - `path_writing`   Patika Yazma adımı (değerlendirilmiş gönderim)
 *  - `skill_speaking` Beceriler konuşma, B1+ monolog (A1–A2 drili yapay zekâsız)
 *  - `skill_writing`  Beceriler yazma
 *
 * Sayaç adları: kullanılmış hak `<yüzey>:<SEVİYE>` (ömürlük), sahiplenilmiş madde
 * işareti `<yüzey>_owned:` önekli ayrı bir anahtar. Beceriler'in iki yüzeyi TEK
 * sahiplik işaretini paylaşıyor (`skill_owned:<egzersiz>`): egzersiz ya konuşma
 * ya yazma, ikisi birden değil. Eski adlar (`writing_conversation:`, `owned_conversation:`,
 * `speaking_skill:`, `writing_skill:`, `skill_ai:`) 2026-09-25'te
 * `drizzle/0069_rename_conversation.sql` ile taşındı.
 */
export type TieredSurface = "conversation" | "path_writing" | "skill_speaking" | "skill_writing";

const SURFACES: Record<TieredSurface, { used: (level: string) => string; owned: (level: string, id: string) => string; gate: PremiumGate }> = {
  conversation: { used: (l) => levelKey("conversation", l), owned: (l, id) => `conversation_owned:${l}:${id}`, gate: "conversation" },
  path_writing: { used: (l) => levelKey("path_writing", l), owned: (_l, id) => `path_writing_owned:${id}`, gate: "writing" },
  skill_speaking: { used: (l) => levelKey("skill_speaking", l), owned: (_l, id) => `skill_owned:${id}`, gate: "speaking" },
  skill_writing: { used: (l) => levelKey("skill_writing", l), owned: (_l, id) => `skill_owned:${id}`, gate: "writing" },
};

/** Yüzeyin kuralı — hepsi aynı seri adımı ve tavanı, taban ve bonus yüzeye göre. */
export function tierRule(cfg: PremiumConfig, surface: TieredSurface | "mock"): TierRule {
  const f = cfg.free;
  const base =
    surface === "conversation" ? f.conversationsPerLevel
    : surface === "path_writing" ? f.pathWritingPerLevel
    : surface === "skill_speaking" ? f.speakingSkills
    : surface === "skill_writing" ? f.writingSkills
    : f.mockPapersPerLevel;
  const bonus = surface === "mock" ? f.mockStreakBonus : f.streakBonus;
  return { base, bonus, step: f.streakStep, maxTiers: f.maxTiers };
}

type StreakInfo = { longest: number; current: number };

/**
 * Seri — kazanılan hakkın ölçüsü (en uzun) ve bir sonraki eşiğe kalan günün
 * ölçüsü (bugün yaşayan).
 *
 * Okunamazsa SIFIR: hata payı kullanıcının aleyhine değil tabanın lehine
 * çalışsın — taban hak her hâlükârda duruyor, yalnız kademe düşüyor.
 */
async function streakOf(userId: string): Promise<StreakInfo> {
  try {
    const [row] = await db
      .select({ longest: profiles.longestStreak, current: profiles.currentStreak, last: profiles.lastActiveDay })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);
    if (!row) return { longest: 0, current: 0 };
    return { longest: row.longest, current: liveStreak(row.current, row.last, periodKey("day")) };
  } catch {
    return { longest: 0, current: 0 };
  }
}

/** Ömürlük sayaçlardan öneki tutanların sonekleri (sahiplenilmiş madde kimlikleri). */
async function ownedWithPrefix(userId: string, prefix: string): Promise<string[]> {
  try {
    const rows = await db
      .select({ key: usageCounters.key })
      .from(usageCounters)
      .where(
        and(
          eq(usageCounters.userId, userId),
          eq(usageCounters.period, "all"),
          like(usageCounters.key, `${prefix}%`),
          sql`${usageCounters.count} > 0`,
        ),
      );
    return rows.map((r) => r.key.slice(prefix.length));
  } catch {
    return [];
  }
}

/** Bitirilmiş dersler — Konuşma adımının "bitirildi" ölçüsü (`user_conversations`). */
async function finishedConversations(userId: string, ids: string[]): Promise<number> {
  if (!ids.length) return 0;
  try {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userConversations)
      .where(and(eq(userConversations.userId, userId), inArray(userConversations.conversationId, ids)));
    return row?.n ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Bir yüzeyin o seviyedeki "kullanıldı" ve "bitirildi" sayıları.
 *
 * BİTİRMEK yüzeye göre:
 *  - Konuşma: sahiplenilmiş adımın dersi bitirilmiş (`user_conversations` satırı —
 *    dersin sonunda `/api/conversation` yazıyor). Sahiplenip bitirmemek dilimi
 *    tamamlamıyor.
 *  - Yazma ve Beceriler: hak ilk değerlendirmede düşüyor, yani sahiplenmek
 *    değerlendirilmiş bir gönderim demek; kullanılan = bitirilen.
 */
async function tieredCounts(userId: string, surface: TieredSurface, level: string): Promise<{ used: number; done: number }> {
  const used = await getUsage(userId, SURFACES[surface].used(level), "all");
  if (surface !== "conversation") return { used, done: used };
  const ids = await ownedWithPrefix(userId, `conversation_owned:${level}:`);
  return { used, done: await finishedConversations(userId, ids) };
}

/** Tek yüzeyin durumu — kapı ve arayüz aynı hesabı görüyor. */
export async function tieredState(userId: string, surface: TieredSurface, level: string): Promise<TieredUnlock> {
  const cfg = await premiumConfig();
  if (await isPremiumCached(userId)) return { premium: true };
  const [counts, streak] = await Promise.all([tieredCounts(userId, surface, level), streakOf(userId)]);
  return freeUnlock(tierRule(cfg, surface), { ...counts, longestStreak: streak.longest, currentStreak: streak.current });
}

/**
 * Bir maddeye (Konuşma adımı, yazma görevi, beceri alıştırması) hak düşürür.
 *
 * SAHİPLENME: hak maddenin İLK yapay zekâ kullanımında düşüyor ve madde
 * sahipleniliyor; sonra kota bitse de açık kalıyor (başladığın konuşmayı ya da
 * yazıyı bitirebilmelisin, yeniden açmak hak yemiyor).
 *
 * YARIŞSIZ: önce işaret (`takeUsage`, tavan 1) — aynı maddeye eşzamanlı iki
 * istek hakkı iki kez yakamıyor; sonra seviye sayacı İZİN VERİLEN sayıyla
 * atomik (`takeUsage`, tavan = taban + bonus × k) — iki farklı maddeye aynı anda
 * gelen istekler tavanı aşamıyor. Sayaç doluysa işaret geri alınıyor.
 *
 * PREMIUM: kademe yok. Yazma/konuşma değerlendirmesi günlük kötüye kullanım
 * tavanına (`ai_practice`) sayılıyor; Konuşma adımının tavanı sohbet mesajı
 * (`chat_turns`, `/api/chat`). Premium'da da madde sahipleniliyor:
 * abonelik biterse başladığı adım açık kalsın.
 */
export async function claimTiered(userId: string, surface: TieredSurface, level: string, itemId: string): Promise<Access> {
  const s = SURFACES[surface];
  const gate = s.gate;
  const ownedKey = s.owned(level, itemId);
  const already = (await getUsage(userId, ownedKey, "all")) > 0;

  if (await isPremiumCached(userId)) {
    if (already || surface === "conversation") {
      if (!already) await takeUsage(userId, ownedKey, "all", 1);
      return { allowed: true, reason: "premium", gate };
    }
    const cfg = await premiumConfig();
    const q = await checkQuota(userId, "ai_practice", "day", cfg.fairUse.aiPracticePerDay);
    if (!q.allowed) return { allowed: false, reason: "fair_use", gate, quota: q };
    if (await takeUsage(userId, ownedKey, "all", 1)) await bumpUsage(userId, "ai_practice", "day");
    return { allowed: true, reason: "premium", gate, quota: q, counter: { key: "ai_practice", period: "day" } };
  }

  if (already) return { allowed: true, reason: "free_quota", gate };
  const state = await tieredState(userId, surface, level);
  if (state.premium) return { allowed: true, reason: "premium", gate };
  const quota: QuotaCheck = { allowed: state.remaining > 0, used: state.used, limit: state.open, remaining: state.remaining, period: "all" };
  if (state.remaining <= 0) return { allowed: false, reason: "quota_spent", gate, quota };
  // İşaret önce: eşzamanlı ikinci istek burada "zaten sahiplenildi" görüyor.
  if (!(await takeUsage(userId, ownedKey, "all", 1))) return { allowed: true, reason: "free_quota", gate, quota };
  if (!(await takeUsage(userId, s.used(level), "all", state.open))) {
    await refundUsage(userId, ownedKey, "all");
    return { allowed: false, reason: "quota_spent", gate, quota: { ...quota, allowed: false, remaining: 0 } };
  }
  return { allowed: true, reason: "free_quota", gate, quota, counter: { key: s.used(level), period: "all" } };
}

/** Madde sahiplenilmiş mi — sayaç yazmaz. */
export async function isOwned(userId: string, surface: TieredSurface, level: string, itemId: string): Promise<boolean> {
  return (await getUsage(userId, SURFACES[surface].owned(level, itemId), "all")) > 0;
}

/* ───────────────────────────── Yürüyüş modu ───────────────────────────── */

/**
 * Günlük TUR sayacı. `updated_at` son sayılan turun başladığı an.
 *
 * Birim 2026-09-25 düzeltmesiyle "oturum"dan "tur"a döndü (Samet): her
 * `/api/session?walk=1` isteği — tur sonundaki "devam" dahil — bir tur ve
 * günlük haktan bir düşüyor; eski 30 dakikalık "aynı oturum" penceresi kalktı.
 * Eski sayaç `walk_sessions` yalnız o günle sınırlıydı (period = gün), taşımaya
 * gerek yok: ertesi gün kendiliğinden anlamını yitiriyor.
 */
const WALK_KEY = "walk_rounds";

/**
 * ÇİFT İSTEK KORUMASI — pencere DEĞİL. Aynı tur isteği ağ tekrarı ya da çift
 * tetiklenme yüzünden iki kez gelebiliyor (ör. geliştirme kipinde efekt iki kez
 * koşuyor); ikincisi aynı turu istiyor, ikinci tur saymamalı. İstemcinin tur
 * kimliğine güvenilmiyor (değiştirilmiş bir istemci her isteğe aynı kimliği
 * koyup hiç saydırmazdı); ölçü sunucunun saati ve yalnız birkaç saniye: son
 * sayılan turdan bu kadar kısa süre sonra gelen istek aynı turun tekrarı.
 */
const WALK_DUPLICATE_SEC = 2;

/** Bugünün yürüyüş durumu — SAYMAZ. */
export async function walkState(userId: string, premium?: boolean, cfgIn?: PremiumConfig): Promise<WalkUnlock> {
  const cfg = cfgIn ?? (await premiumConfig());
  const isPro = premium ?? (await isPremiumCached(userId));
  const perDay = isPro ? cfg.fairUse.walkRoundsPerDay : cfg.free.walkRoundsPerDay;
  const used = (await walkRow(userId))?.count ?? 0;
  return { premium: isPro, perDay, used, remaining: Math.max(0, perDay - used), pocket: isPro };
}

async function walkRow(userId: string): Promise<{ count: number; at: Date } | null> {
  try {
    const [row] = await db
      .select({ count: usageCounters.count, at: usageCounters.updatedAt })
      .from(usageCounters)
      .where(and(eq(usageCounters.userId, userId), eq(usageCounters.key, WALK_KEY), eq(usageCounters.period, periodKey("day"))))
      .limit(1);
    return row ?? null;
  } catch {
    // Okunamadı: kapı AÇIK (bkz. `quota.getUsage`).
    return null;
  }
}

/**
 * Yürüyüş turu başlat — `/api/session?walk=1` her istekte çağırıyor.
 *
 * Tur TEK ifadede sayılıyor: sayaç tavanın altındaysa ve son sayılan tur çift
 * istek korumasının dışındaysa artar. Eşzamanlı iki istek iki tur yakamıyor —
 * ikincisi satırı kilitli bulup güncel `updated_at`i görüyor ve tekrar sayılıyor.
 */
export async function openWalkRound(userId: string): Promise<Access & { duplicate: boolean }> {
  const cfg = await premiumConfig();
  const premium = await isPremiumCached(userId);
  const limit = premium ? cfg.fairUse.walkRoundsPerDay : cfg.free.walkRoundsPerDay;
  const ok = { allowed: true, reason: premium ? ("premium" as const) : ("free_quota" as const), gate: "walk" as const };
  if (limit <= 0) return { allowed: false, reason: "premium_only", gate: "walk", duplicate: false };
  try {
    const rows = await db
      .insert(usageCounters)
      .values({ userId, key: WALK_KEY, period: periodKey("day"), count: 1 })
      .onConflictDoUpdate({
        target: [usageCounters.userId, usageCounters.key, usageCounters.period],
        set: { count: sql`${usageCounters.count} + 1`, updatedAt: new Date() },
        setWhere: sql`${usageCounters.count} < ${limit} and ${usageCounters.updatedAt} < now() - ${sql.raw(`interval '${WALK_DUPLICATE_SEC} seconds'`)}`,
      })
      .returning({ count: usageCounters.count });
    if (rows.length) return { ...ok, duplicate: false };
  } catch (err) {
    // Sayaç yazılamadı: yürüyüşü ENGELLEME (bkz. `quota.takeUsage`).
    console.error("[walk:round]", err);
    return { ...ok, duplicate: false };
  }
  // Güncellenmedi: ya az önce sayılan turun tekrarı ya tavan dolu.
  const row = await walkRow(userId);
  if (row && row.count > 0 && Date.now() - row.at.getTime() < WALK_DUPLICATE_SEC * 1000) return { ...ok, duplicate: true };
  const quota: QuotaCheck = { allowed: false, used: row?.count ?? limit, limit, remaining: 0, period: "day" };
  return { allowed: false, reason: premium ? "fair_use" : "quota_spent", gate: "walk", quota, duplicate: false };
}

/** Tur kurulamadıysa (sunucu hatası) hak geri veriliyor. */
export async function refundWalkRound(userId: string): Promise<void> {
  await refundUsage(userId, WALK_KEY, "day");
}

/**
 * Cepte / ekran kapalı yürüyüş — yalnız premium.
 *
 * Ekran AÇIK yürüyüş buradan HİÇ geçmiyor: cihazın kendi tanıyıcısı kullanılıyor,
 * bize maliyeti yok (sayılan yalnız günlük tur, `openWalkRound`). Kilit
 * sunucu ses tanımaya (Azure) düşen yolda; premium'daki tavan kelime ve istek
 * sayısı (`/api/stt`).
 */
export async function canPocketWalk(userId: string): Promise<Access> {
  return (await isPremiumCached(userId))
    ? { allowed: true, reason: "premium", gate: "pocket_walk" }
    : { allowed: false, reason: "premium_only", gate: "pocket_walk" };
}

/* ───────────────────────── Deneme sınavı ilerlemesi ───────────────────────── */

export type MockPack = {
  /** Paketteki kâğıt kimlikleri, sırayla. */
  ids: string[];
  unlocked: boolean;
  /** Paketteki nesnel maddelerin doğruluk yüzdesi (hiç çözülmediyse null) — yalnız bilgi. */
  pct: number | null;
  /** Kaç kâğıt en az bir kez bitirildi. */
  done: number;
};

export type MockAccess = {
  premium: boolean;
  /** Açık kâğıt kimlikleri. */
  unlocked: string[];
  packs: MockPack[];
  /** Ücretsiz taban (seviye başına). */
  freeLimit: number;
  /** Bitirilmiş kâğıtlar — liste "✓" çiziyor. */
  finished: string[];
  /** Sonraki kâğıdın/paketin nasıl açılacağı (`unlock.ts`). */
  unlock: MockUnlock;
};

/**
 * Bir seviyedeki kâğıtların açık/kilitli durumu.
 *
 * ÜCRETSİZ: taban `mockPapersPerLevel` (1) + her "o kâğıdı bitir ve 7 günlük seri
 * yap" diliminde `mockStreakBonus` (1). Açık kâğıtlar sıradaki ilk N.
 *
 * PREMIUM: paketler sırayla; ilk paket açık, sonraki paket öncekinin kâğıtlarının
 * HEPSİ bitirilince açılıyor. Bir dönem pakette %60 başarı da açıyordu; kural
 * 2026-09-25'te "yalnız bitir"e indi — iki farklı "başarı" tanımı yok, puanı
 * tutturamayan ödeme yapmış kullanıcı da çalışarak ilerliyor.
 */
export async function mockAccess(userId: string | null, level: MockLevel, course: string): Promise<MockAccess> {
  const cfg = await premiumConfig();
  const papers = (await mockPapersFor(level, course)).map((p) => p.id);
  const premium = await isPremiumCached(userId);
  const stat = userId ? await paperStats(userId, papers) : new Map<string, PaperStat>();
  const finished = papers.filter((id) => stat.get(id)?.done);

  if (!premium) {
    const streak = userId ? await streakOf(userId) : { longest: 0, current: 0 };
    const unlock = freeUnlock(tierRule(cfg, "mock"), {
      used: finished.length,
      done: finished.length,
      longestStreak: streak.longest,
      currentStreak: streak.current,
    });
    const open = Math.min(unlock.open, papers.length);
    return {
      premium: false,
      unlocked: papers.slice(0, open),
      packs: [],
      freeLimit: cfg.free.mockPapersPerLevel,
      finished,
      unlock: capToPapers(unlock, papers.length),
    };
  }

  const { packs, unlocked } = computePacks(papers, stat, cfg.mock);
  return {
    premium: true,
    unlocked,
    packs,
    freeLimit: cfg.free.mockPapersPerLevel,
    finished,
    unlock: premiumMockUnlock(papers.map((id) => Boolean(stat.get(id)?.done)), cfg.mock.packSize),
  };
}

/** Kâğıt sayısını aşan açılış vaat edilmiyor: son kâğıt da açıksa "sonraki" yok. */
function capToPapers(u: FreeUnlock, total: number): FreeUnlock {
  const open = Math.min(u.open, total);
  return { ...u, open, remaining: Math.max(0, open - u.used), next: open >= total ? null : u.next };
}

/** Kâğıt başına doğru/toplam ve "bitirildi mi". */
async function paperStats(userId: string, papers: string[]): Promise<Map<string, PaperStat>> {
  const stat = new Map<string, PaperStat>();
  if (!papers.length) return stat;
  try {
    const rows = await db
      .select({ paperId: mockExamAttempts.paperId, correct: mockExamAttempts.correct, total: mockExamAttempts.total })
      .from(mockExamAttempts)
      .where(and(eq(mockExamAttempts.userId, userId), isNotNull(mockExamAttempts.finishedAt), inArray(mockExamAttempts.paperId, papers)));
    for (const r of rows) {
      const s = stat.get(r.paperId) ?? { correct: 0, total: 0, done: false };
      s.correct += r.correct;
      s.total += r.total;
      s.done = true;
      stat.set(r.paperId, s);
    }
  } catch {
    // İlerleme okunamadı: yalnız taban / ilk paket açık kalır — ödeme yapmış
    // kullanıcıyı tamamen kilitlememek için ilk paket her koşulda açık.
  }
  return stat;
}

/** Tek kâğıt açık mı — oynatıcı başlarken sorulan soru. */
export async function canMockPaper(userId: string | null, paperId: string, level: MockLevel, course: string): Promise<Access> {
  const a = await mockAccess(userId, level, course);
  if (a.unlocked.includes(paperId)) {
    return { allowed: true, reason: a.premium ? "premium" : "free_quota", gate: "mock_exam" };
  }
  return { allowed: false, reason: a.premium ? "locked_progression" : "quota_spent", gate: "mock_exam" };
}

/** Bir kâğıdın biriken istatistiği — `computePacks` girdisi. */
export type PaperStat = { correct: number; total: number; done: boolean };

/**
 * Paket ilerlemesinin SAF hesabı — veritabanına dokunmaz.
 *
 * `mockAccess`ten ayrıldı ki kural veritabanı olmadan sınanabilsin
 * (`scripts/test-premium.ts`). Kilidin doğru davranması iki uçta da kritik:
 * gevşek olursa premium'un anlamı kalmaz, sıkı olursa ödeme yapmış kullanıcı
 * kilitli kalır.
 *
 * Kapı TEK: paketteki her kâğıt en az bir kez bitirildiyse sonraki paket açılır.
 * Yüzde yalnız gösterim için hesaplanıyor (madde başına ağırlıklı: 40 maddelik
 * bir kâğıtla 20 maddelik biri eşit sayılsaydı kısa kâğıtta iyi olan ortalamayı
 * hak etmeden yukarı çekerdi).
 */
export function computePacks(
  papers: string[],
  stat: Map<string, PaperStat>,
  rule: { packSize: number },
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
    const pct = total > 0 ? Math.round((100 * correct) / total) : null;
    packs.push({ ids, unlocked: open, pct, done });
    if (open) unlocked.push(...ids);
    // `open &&` zinciri önemli — kapalı bir paketin arkasındaki paket, içi boş
    // olduğu için "tamamlandı" sayılıp açılmamalı.
    open = open && done >= ids.length;
  }
  return { packs, unlocked };
}

/* ───────────────────────────── Genel görünüm ───────────────────────────── */

const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
type Level = (typeof LEVELS)[number];

export type LevelUnlock = {
  conversation: TieredUnlock;
  pathWriting: TieredUnlock;
  skillSpeaking: TieredUnlock;
  skillWriting: TieredUnlock;
  /** Kursun o seviyede deneme sınavı yoksa null. */
  mock: MockUnlock | null;
};

/**
 * KİLİT AÇMA GÖRÜNÜMÜ — `/api/premium/status` bunu döndürüyor.
 *
 * Her kotalı yüzey için kalan hak, açık sayısı ve bir sonraki hakkın koşulları
 * (bitir: x/y, seri: x/7, tahmini gün). Mobil ve web aynı sayıdan aynı cümleyi
 * kuruyor; hesap `unlock.ts`te.
 *
 * Tüm seviyeler TEK çağrıda: istemci Patika'da seviye değiştirdikçe ayrı istek
 * atmasın. Maliyeti birkaç sorgu (profil, ömürlük sayaçlar, bitirilmiş dersler,
 * bitirilmiş kâğıtlar) — hesap bellekte.
 */
export type UnlockOverview = {
  streak: { current: number; longest: number; step: number };
  walk: WalkUnlock;
  levels: Record<Level, LevelUnlock>;
  /** Sahiplenilmiş maddeler — hak bitse de açık kalanlar. */
  owned: { conversation: string[]; pathWriting: string[]; skills: string[] };
  /** Premium'un sohbet mesajı tavanı (sabit, `lib/quotas`). */
  chatTurnsPerDay: number;
};

export async function unlockOverview(userId: string): Promise<UnlockOverview> {
  const cfg = await premiumConfig();
  const premium = await isPremiumCached(userId);

  const [streak, counters, profile, walk] = await Promise.all([
    streakOf(userId),
    allTimeCounters(userId),
    db.select({ course: profiles.course }).from(profiles).where(eq(profiles.userId, userId)).limit(1).then((r) => r[0] ?? null).catch(() => null),
    walkState(userId, premium, cfg),
  ]);

  const convOwned = new Map<Level, string[]>(LEVELS.map((l) => [l, []]));
  const pathOwned: string[] = [];
  const skillOwned: string[] = [];
  for (const [key] of counters) {
    if (key.startsWith("conversation_owned:")) {
      const [, lvl, ...rest] = key.split(":");
      convOwned.get(lvl as Level)?.push(rest.join(":"));
    } else if (key.startsWith("path_writing_owned:")) pathOwned.push(key.slice("path_writing_owned:".length));
    else if (key.startsWith("skill_owned:")) skillOwned.push(key.slice("skill_owned:".length));
  }
  const allConv = [...convOwned.values()].flat();
  const doneConversations = await finishedConversationSet(userId, allConv);

  const course = mockCourseOf(profile?.course);
  /* Künye kataloğu, tam kâğıt değil: durum ucu uygulama her açıldığında
     çağrılıyor ve yalnız kimlik ile sıra lazım (sıra `no`, `mockPapersFor` ile aynı). */
  const papersByLevel = await Promise.all(LEVELS.map((l) => mockCatalogFor(l, course).then((p) => p.map((x) => x.id)).catch(() => [] as string[])));
  const stat = await paperStats(userId, papersByLevel.flat());

  const s = { longestStreak: streak.longest, currentStreak: streak.current };
  const tiered = (surface: TieredSurface, level: Level, done?: number): TieredUnlock => {
    if (premium) return { premium: true };
    const used = counters.get(SURFACES[surface].used(level)) ?? 0;
    return freeUnlock(tierRule(cfg, surface), { used, done: done ?? used, ...s });
  };

  const levels = {} as Record<Level, LevelUnlock>;
  LEVELS.forEach((level, i) => {
    const papers = papersByLevel[i];
    let mock: MockUnlock | null = null;
    if (papers.length) {
      const finished = papers.map((id) => Boolean(stat.get(id)?.done));
      if (premium) mock = premiumMockUnlock(finished, cfg.mock.packSize);
      else {
        const n = finished.filter(Boolean).length;
        mock = capToPapers(freeUnlock(tierRule(cfg, "mock"), { used: n, done: n, ...s }), papers.length);
      }
    }
    levels[level] = {
      conversation: tiered("conversation", level, (convOwned.get(level) ?? []).filter((id) => doneConversations.has(id)).length),
      pathWriting: tiered("path_writing", level),
      skillSpeaking: tiered("skill_speaking", level),
      skillWriting: tiered("skill_writing", level),
      mock,
    };
  });

  return {
    streak: { current: streak.current, longest: streak.longest, step: cfg.free.streakStep },
    walk,
    levels,
    owned: { conversation: allConv, pathWriting: pathOwned, skills: skillOwned },
    chatTurnsPerDay: DAILY_QUOTAS.chatTurns,
  };
}

async function allTimeCounters(userId: string): Promise<Map<string, number>> {
  try {
    const rows = await db
      .select({ key: usageCounters.key, count: usageCounters.count })
      .from(usageCounters)
      .where(and(eq(usageCounters.userId, userId), eq(usageCounters.period, "all"), sql`${usageCounters.count} > 0`));
    return new Map(rows.map((r) => [r.key, r.count]));
  } catch {
    return new Map();
  }
}

async function finishedConversationSet(userId: string, ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  try {
    const rows = await db
      .select({ id: userConversations.conversationId })
      .from(userConversations)
      .where(and(eq(userConversations.userId, userId), inArray(userConversations.conversationId, ids)));
    return new Set(rows.map((r) => r.id));
  } catch {
    return new Set();
  }
}
