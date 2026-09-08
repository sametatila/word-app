import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { entitlements, premiumGrants, profiles } from "@/lib/db/schema";
import { STATE_GRANTS, type StoreEvent } from "./ports";

/**
 * YETKİNİN HESAPLANDIĞI VE YAZILDIĞI TEK YER.
 *
 * Yetki iki bağımsız bileşenin bileşimi:
 *
 *   MAĞAZA PENCERESİ  mutlak bitiş, sağlayıcı bildirir, her olayda üzerine yazılır.
 *   BONUS             bizim verdiğimiz süre (promo/referans/elle); bakiye olarak
 *                     birikir, ancak mağaza kapsamı YOKKEN harcanmaya başlar.
 *
 * İkisinin ayrı tutulması bu tasarımın can damarı. Tek bir `premium_until`
 * sütununda toplansalardı her abonelik yenilemesi — sağlayıcı mutlak bir tarih
 * bildirdiği için — üzerine yazıp biriken hediye günlerini sessizce silerdi.
 * Ayrı tutulunca yenileme bonusa dokunmuyor, bonus da yenilemeyi bozmuyor.
 *
 * `profiles.premium_until` bu hesabın ÖNBELLEĞİ. Sıcak yolda iki tabloyu
 * birleştirmemek için var ve yalnız buradan yazılıyor.
 */

const MIN_MS = 60_000;

export type EntitlementView = {
  premium: boolean;
  /** Yetkinin efektif bitişi. Premium değilse null. */
  until: Date | null;
  /** Yetkiyi şu an ne sağlıyor. */
  source: "store" | "bonus" | null;
  store: {
    state: string | null;
    platform: string | null;
    product: string | null;
    provider: string | null;
    until: Date | null;
    /** Otomatik yenileme kapalı mı — arayüz "şu tarihte bitecek" der. */
    canceled: boolean;
  } | null;
  /** Henüz harcanmamış bonus (gün, yukarı yuvarlanmış) — "3 hafta hediyen var". */
  bonusDaysPending: number;
  bonusUntil: Date | null;
};

type Row = typeof entitlements.$inferSelect;

const EMPTY: Omit<Row, "userId"> = {
  storeUntil: null,
  storeProvider: null,
  storePlatform: null,
  storeProduct: null,
  storeState: null,
  storeRef: null,
  storePaidAt: null,
  bonusMinutes: 0,
  bonusUntil: null,
  updatedAt: new Date(),
};

async function readRow(userId: string): Promise<Row> {
  const [row] = await db.select().from(entitlements).where(eq(entitlements.userId, userId)).limit(1);
  return row ?? { userId, ...EMPTY };
}

const active = (until: Date | null | undefined, now: number): boolean => !!until && until.getTime() > now;

/**
 * Kullanıcının şu anki yetkisi. Gerektiğinde durumu İLERLETİR:
 *
 *  - Mağaza kapsamı yokken bekleyen bonus varsa pencereyi BAŞLATIR
 *    (bakiye → çalışan pencere). Bu "okurken yazma" bilinçli: bonusun ne zaman
 *    başlaması gerektiğini bilen tek an, kapsamın bittiği andır ve o anı yakalayan
 *    zamanlanmış bir iş kurmak, aynı işi ilk okumada yapmaktan çok daha kırılgan.
 *  - `profiles.premium_until` önbelleğini gerçekle eşitler.
 *
 * Yazma YALNIZ durum gerçekten değiştiğinde yapılıyor; sıradan okuma tek SELECT.
 */
export async function resolveEntitlement(userId: string): Promise<EntitlementView> {
  const now = Date.now();
  let row: Row;
  try {
    row = await readRow(userId);
  } catch {
    // Yetki okunamıyorsa ücretsiz say. Premium vermek de vermemek de yanlış
    // olabilir, ama okunamayan bir kayda dayanarak ücretli özellik AÇMAK
    // geri alınamaz; kapalı varsayılan doğru taraf.
    return { premium: false, until: null, source: null, store: null, bonusDaysPending: 0, bonusUntil: null };
  }

  let { bonusMinutes, bonusUntil } = row;
  const storeActive = active(row.storeUntil, now);

  // Bonus penceresini başlatma anı: mağaza kapsamı yok, çalışan pencere de yok,
  // ama bakiye var.
  if (!storeActive && !active(bonusUntil, now) && bonusMinutes > 0) {
    bonusUntil = new Date(now + bonusMinutes * MIN_MS);
    bonusMinutes = 0;
    try {
      await db
        .insert(entitlements)
        .values({ ...row, userId, bonusMinutes, bonusUntil, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: entitlements.userId,
          set: { bonusMinutes, bonusUntil, updatedAt: new Date() },
        });
    } catch {
      /* yazılamadıysa bu istekte yine premium sayılır; sonraki istek tekrar dener */
    }
  }

  const bonusActive = active(bonusUntil, now);
  const untilMs = Math.max(storeActive ? row.storeUntil!.getTime() : 0, bonusActive ? bonusUntil!.getTime() : 0);
  const premium = untilMs > now;
  const until = premium ? new Date(untilMs) : null;

  await syncCache(userId, until);

  return {
    premium,
    until,
    // Kaynak = yetkiyi UZATAN bileşen. İkisi de aktifse mağaza yazılır: kullanıcıya
    // "aboneliğin sürüyor" demek, "hediyen sürüyor" demekten doğru.
    source: !premium ? null : storeActive ? "store" : "bonus",
    store: row.storeState
      ? {
          state: row.storeState,
          platform: row.storePlatform,
          product: row.storeProduct,
          provider: row.storeProvider,
          until: row.storeUntil,
          canceled: row.storeState === "canceled",
        }
      : null,
    bonusDaysPending: Math.ceil(bonusMinutes / (60 * 24)),
    bonusUntil: bonusActive ? bonusUntil : null,
  };
}

/** Önbelleği (profiles.premium_until) yalnız DEĞİŞMİŞSE yaz. */
async function syncCache(userId: string, until: Date | null): Promise<void> {
  try {
    const [p] = await db.select({ until: profiles.premiumUntil }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
    const cur = p?.until ? p.until.getTime() : null;
    const next = until ? until.getTime() : null;
    // Saniye altı fark önbelleği yenilemeye değmez; her istekte UPDATE atmayalım.
    if (cur === next || (cur != null && next != null && Math.abs(cur - next) < 1000)) return;
    await db.update(profiles).set({ premiumUntil: until }).where(eq(profiles.userId, userId));
  } catch {
    /* önbellek; tutmazsa bir sonraki okumada yeniden denenir */
  }
}

/** Hızlı kontrol — önbellekten okur, hesap yapmaz. Sıcak yolda bunu kullan. */
export async function isPremiumCached(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  try {
    const [row] = await db.select({ until: profiles.premiumUntil }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
    return Boolean(row?.until && row.until.getTime() > Date.now());
  } catch {
    return false;
  }
}

export type BonusSource = "promo" | "referral" | "manual";

/**
 * Bonus süre ekler — promo kodu, referans ödülü, elle verilen hediye.
 *
 * BAKİYEYE eklenir, tarihe değil. Kullanıcı o an ödeyen bir aboneyse süre
 * beklemeye alınır ve aboneliği bittiğinde çalışmaya başlar; böylece hediye
 * ödediği ayın üstüne binip yanmaz. İki referans ödülü üstüste biner çünkü
 * ikisi de aynı bakiyeye ekleniyor — "birikebilen ve birbirine eklenebilen"
 * şartının karşılığı tam olarak bu.
 */
export async function grantBonus(
  userId: string,
  minutes: number,
  opts: { source: BonusSource; ref?: string | null; actor?: string | null; note?: string | null },
): Promise<EntitlementView> {
  if (minutes <= 0) return resolveEntitlement(userId);
  await db
    .insert(entitlements)
    .values({ userId, ...EMPTY, bonusMinutes: minutes, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: entitlements.userId,
      set: { bonusMinutes: sql`${entitlements.bonusMinutes} + ${minutes}`, updatedAt: new Date() },
    });
  await db.insert(premiumGrants).values({
    userId,
    source: opts.source,
    minutes,
    ref: opts.ref ?? null,
    actor: opts.actor ?? "system",
    note: opts.note ?? null,
  });
  return resolveEntitlement(userId);
}

export const daysToMinutes = (days: number): number => Math.round(days * 24 * 60);

/**
 * Mağaza olayını uygular. Sağlayıcıdan bağımsız: gelen şey `StoreEvent`.
 *
 * İki koruma var ve ikisi de gerçek olaylardan doğdu:
 *
 *  TEKRAR TESLİMAT. Sağlayıcılar webhook'u yanıt alamayınca yeniden yolluyor.
 *  Aynı olayın iki kez işlenmesi deftere iki satır yazar ve — daha kötüsü —
 *  referans ödülünü iki kez tetikleyebilirdi. `eventId` defterde aranıyor.
 *
 *  BONUSUN KORUNMASI. Kullanıcı hediye süresi çalışırken abone olursa kalan
 *  hediye bakiyeye GERİ DÖNÜYOR. Yoksa ödediği ay hediyenin üstüne biner ve
 *  kullanıcı hediyesini fark etmeden kaybeder.
 *
 * @returns ödül tetiklenecekse `firstPayment: true` (referans zinciri buna bakar)
 */
export async function applyStoreEvent(ev: StoreEvent): Promise<{ applied: boolean; firstPayment: boolean }> {
  // Tekrar teslimat elemesi.
  const [seen] = await db
    .select({ id: premiumGrants.id })
    .from(premiumGrants)
    .where(and(eq(premiumGrants.source, "store"), eq(premiumGrants.ref, ev.eventId)))
    .limit(1);
  if (seen) return { applied: false, firstPayment: false };

  const now = Date.now();
  const row = await readRow(ev.userId);
  const grants = STATE_GRANTS.has(ev.state);
  const wasCovered = active(row.storeUntil, now);

  // Yetki veren bir olayda bitiş sağlayıcıdan gelir; vermeyen olayda pencere kapanır.
  const storeUntil = grants ? ev.expiresAt : null;

  let bonusMinutes = row.bonusMinutes;
  let bonusUntil = row.bonusUntil;
  // Hediye çalışırken abonelik başladı: kalanı bakiyeye geri al.
  if (grants && !wasCovered && active(bonusUntil, now)) {
    bonusMinutes += Math.ceil((bonusUntil!.getTime() - now) / MIN_MS);
    bonusUntil = null;
  }

  const firstPayment = ev.paid && !row.storePaidAt;
  const storePaidAt = row.storePaidAt ?? (ev.paid ? new Date() : null);

  const next = {
    storeUntil,
    storeProvider: ev.provider,
    storePlatform: ev.platform,
    storeProduct: ev.productId,
    storeState: ev.state,
    storeRef: ev.ref,
    storePaidAt,
    bonusMinutes,
    bonusUntil,
    updatedAt: new Date(),
  };
  await db
    .insert(entitlements)
    .values({ userId: ev.userId, ...EMPTY, ...next })
    .onConflictDoUpdate({ target: entitlements.userId, set: next });

  await db.insert(premiumGrants).values({
    userId: ev.userId,
    source: "store",
    until: storeUntil,
    ref: ev.eventId,
    actor: ev.provider,
    note: `${ev.state}${ev.productId ? ` · ${ev.productId}` : ""}${ev.paid ? " · ödendi" : ""}`,
  });

  await resolveEntitlement(ev.userId);
  return { applied: true, firstPayment };
}

/**
 * Yetkiyi tamamen kaldırır (admin). Mağaza penceresini de bonusu da sıfırlar.
 *
 * Mağaza aboneliği HÂLÂ DEVAM EDİYORSA bir sonraki yenileme olayı yetkiyi geri
 * getirir — doğrusu da bu: para alınmaya devam ederken yetkiyi kapalı tutmak,
 * ödeme alıp hizmet vermemek olurdu. Gerçekten durdurmak isteniyorsa abonelik
 * mağaza tarafında iptal edilmeli.
 */
export async function revokeEntitlement(userId: string, actor: string | null, note?: string): Promise<void> {
  const cleared = { storeUntil: null, storeState: "expired", bonusMinutes: 0, bonusUntil: null, updatedAt: new Date() };
  await db
    .insert(entitlements)
    .values({ userId, ...EMPTY, ...cleared })
    .onConflictDoUpdate({ target: entitlements.userId, set: cleared });
  await db.insert(premiumGrants).values({
    userId,
    source: "manual",
    minutes: 0,
    actor: actor ?? "system",
    note: note ?? "yetki kaldırıldı",
  });
  await db.update(profiles).set({ premiumUntil: null }).where(eq(profiles.userId, userId));
}
