import "server-only";
import { randomInt } from "node:crypto";
import { and, desc, eq, isNotNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, referrals } from "@/lib/db/schema";
import { grantBonus, daysToMinutes } from "./entitlement";
import { premiumConfig } from "./config";

/**
 * Davet zinciri — davet edilen ÖDEME YAPINCA davetçi premium kazanır.
 *
 * ÖDÜL NEDEN ÖDEMEDE, DENEMEDE DEĞİL. 1 aylık deneme kart isteyerek başlıyor
 * ama iptal edilebiliyor; ödül denemeye bağlansaydı sahte hesapla hafta üretmek
 * serbest kalırdı. Ödeme alındığında ödül düşüyor (karar: 2026-09-08). Bedeli
 * ödülün ~1 ay gecikmesi; karşılığı, ödülün gerçek gelire bağlı kalması.
 *
 * ÖDÜL BİRİKİR. Süre bakiyeye ekleniyor (`grantBonus`), tarihe değil: üç davet
 * = 21 gün ve bunlar birbirinin üstüne biner. Davetçi o sırada abone ise bakiye
 * bekler, aboneliği bitince çalışmaya başlar — hediye ödenen ayın içinde yanmaz.
 */

// Karışan karakter yok; kod ağızdan söyleniyor ve elle yazılıyor.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomCode(length = 6): string {
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

export const normalizeReferral = (s: string): string => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

/**
 * Kullanıcının davet kodu; yoksa üretir.
 *
 * Kod bir kez üretilip profilde SABİT kalıyor: dağıtılmış bir bağlantının bir
 * gün ölmesi, kullanıcının paylaştığı her yerin ölmesi demek.
 */
export async function ensureReferralCode(userId: string): Promise<string> {
  const [p] = await db.select({ code: profiles.referralCode }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (p?.code) return p.code;

  for (let attempt = 0; attempt < 6; attempt++) {
    const code = randomCode();
    try {
      await db.update(profiles).set({ referralCode: code }).where(eq(profiles.userId, userId));
      return code;
    } catch {
      /* benzersiz indeks çarptı — yeni kod dene */
    }
  }
  throw new Error("referral_code_failed");
}

export async function userIdByReferralCode(code: string): Promise<string | null> {
  const c = normalizeReferral(code);
  if (!c) return null;
  const [row] = await db.select({ userId: profiles.userId }).from(profiles).where(eq(profiles.referralCode, c)).limit(1);
  return row?.userId ?? null;
}

export type AttachResult = "ok" | "self" | "already" | "unknown_code";

/**
 * Yeni kullanıcıyı bir davetçiye bağlar. Kayıt/ilk açılışta çağrılır.
 *
 * Ödül BURADA verilmiyor — yalnız bağ kuruluyor. Ödül davet edilenin ilk
 * ödemesinde (`rewardForFirstPayment`) düşüyor.
 */
export async function attachReferral(inviteeUserId: string, code: string): Promise<AttachResult> {
  const inviter = await userIdByReferralCode(code);
  if (!inviter) return "unknown_code";
  if (inviter === inviteeUserId) return "self";

  try {
    await db.insert(referrals).values({
      inviterUserId: inviter,
      inviteeUserId,
      code: normalizeReferral(code),
    });
    return "ok";
  } catch {
    // `referrals_invitee_idx` benzersiz: bir kişi yalnız bir kez davet edilir.
    // İlk davetçi kazanır; sonradan gelen kod bağı değiştiremez.
    return "already";
  }
}

/**
 * Davet edilenin İLK ödemesi alındı — davetçiye ödül yaz.
 *
 * `applyStoreEvent` `firstPayment: true` döndüğünde çağrılıyor. Tekrar
 * teslimat koruması iki katmanlı: webhook tarafında olay kimliği eleniyor,
 * burada da `rewarded_at` dolu satır ikinci kez ödüllendirilmiyor.
 *
 * @returns ödül verildiyse davetçinin kimliği
 */
export async function rewardForFirstPayment(inviteeUserId: string): Promise<string | null> {
  const [row] = await db.select().from(referrals).where(eq(referrals.inviteeUserId, inviteeUserId)).limit(1);
  if (!row || row.rewardedAt) return null;

  const cfg = await premiumConfig();
  const days = cfg.referral.rewardDays;
  if (days <= 0) return null;

  // Davet başına tavan (0 = sınırsız). Panelden ayarlanıyor; kötüye kullanım
  // ortaya çıkarsa kod değiştirmeden kısılabilsin diye.
  if (cfg.referral.maxRewards > 0) {
    const [c] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(referrals)
      .where(and(eq(referrals.inviterUserId, row.inviterUserId), isNotNull(referrals.rewardedAt)));
    if ((c?.n ?? 0) >= cfg.referral.maxRewards) return null;
  }

  const minutes = daysToMinutes(days);
  // Koşullu güncelleme: ödülü YAZAN istek kazanır, ikincisi boş döner.
  const claimed = await db
    .update(referrals)
    .set({ rewardedAt: new Date(), rewardMinutes: minutes })
    .where(and(eq(referrals.id, row.id), sql`${referrals.rewardedAt} is null`))
    .returning({ id: referrals.id });
  if (claimed.length === 0) return null;

  await grantBonus(row.inviterUserId, minutes, {
    source: "referral",
    ref: inviteeUserId,
    actor: "system",
    note: `${days} gün — davet ettiği kullanıcı ilk ödemesini yaptı`,
  });
  return row.inviterUserId;
}

export type ReferralStats = {
  code: string;
  /** Kodla kayıt olan toplam kişi. */
  invited: number;
  /** Ödeme yapıp ödül üreten kişi. */
  rewarded: number;
  /** Kazanılan toplam gün. */
  earnedDays: number;
};

export async function referralStats(userId: string): Promise<ReferralStats> {
  const code = await ensureReferralCode(userId);
  const [row] = await db
    .select({
      invited: sql<number>`count(*)::int`,
      rewarded: sql<number>`count(*) filter (where ${referrals.rewardedAt} is not null)::int`,
      minutes: sql<number>`coalesce(sum(${referrals.rewardMinutes}), 0)::int`,
    })
    .from(referrals)
    .where(eq(referrals.inviterUserId, userId));
  return {
    code,
    invited: row?.invited ?? 0,
    rewarded: row?.rewarded ?? 0,
    earnedDays: Math.round((row?.minutes ?? 0) / (60 * 24)),
  };
}

/** Panel için: en çok davet üreten kullanıcılar. */
export async function topReferrers(limit = 20) {
  return db
    .select({
      userId: referrals.inviterUserId,
      invited: sql<number>`count(*)::int`,
      rewarded: sql<number>`count(*) filter (where ${referrals.rewardedAt} is not null)::int`,
    })
    .from(referrals)
    .groupBy(referrals.inviterUserId)
    .orderBy(desc(sql`count(*)`))
    .limit(limit);
}
