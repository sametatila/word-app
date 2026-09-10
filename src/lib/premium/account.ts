import "server-only";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { user } from "@/lib/db/auth-schema";
import { entitlements, premiumGrants, profiles } from "@/lib/db/schema";

/**
 * Tek hesabın yetki görünümü — YÖNETİM PANELİ İÇİN, salt okunur.
 *
 * NEDEN `resolveEntitlement` DEĞİL. O fonksiyon bir YAN ETKİ taşıyor: bekleyen
 * bonus bakiyesi varsa ve çalışan bir pencere yoksa pencereyi BAŞLATIYOR
 * (bkz. entitlement.ts). Yönetici birinin durumuna bakmak istediğinde o kişinin
 * hediye saati başlamamalı — bakmak, harcamak değildir. Burası bu yüzden ham
 * satırı okuyup görünümü kendisi türetiyor ve hiçbir şey yazmıyor.
 *
 * `profiles.premium_until` de gösteriliyor çünkü sıcak yolda okunan sütun o
 * (`isPremiumCached`); ham satırla arasında bir fark varsa yönetici bunu
 * görebilmeli — fark, bekleyen bir bonusun henüz başlamamış olduğu anlamına
 * gelir ve "neden premium görünmüyor" sorusunun cevabıdır.
 */
export type PremiumAccount = {
  userId: string;
  email: string;
  name: string;
  displayName: string | null;
  premium: boolean;
  /** Yetkinin efektif bitişi; premium değilse null. */
  until: string | null;
  source: "store" | "bonus" | null;
  store: {
    state: string | null;
    platform: string | null;
    product: string | null;
    provider: string | null;
    until: string | null;
  } | null;
  /** Henüz başlamamış bonus (gün, yukarı yuvarlanmış). */
  bonusDaysPending: number;
  bonusUntil: string | null;
  /** Sıcak yolun okuduğu önbellek sütunu — ham satırla karşılaştırmak için. */
  cachedUntil: string | null;
  /** Son defter satırları: kim, ne zaman, ne kadar verdi. */
  grants: { source: string; minutes: number | null; actor: string | null; note: string | null; at: string }[];
};

const iso = (d: Date | null | undefined): string | null => (d ? d.toISOString() : null);
const future = (d: Date | null | undefined, now: number): boolean => Boolean(d && d.getTime() > now);

/**
 * E-posta ya da kullanıcı kimliğiyle hesap bulur.
 *
 * KÜÇÜK HARFE ÇEVİRME POSTGRES'TE. JavaScript'in `toLowerCase()`i yerelе
 * duyarlı: Türkçe klavyeyle yazılan "İ" birleşik noktalı bir harfe dönüşüyor
 * ve karşılaştırma sessizce tutmuyor. `lower()` iki tarafa da SQL'de
 * uygulanınca bu tuzak hiç doğmuyor.
 */
export async function findPremiumAccount(query: string): Promise<PremiumAccount | null> {
  const q = query.trim();
  if (!q) return null;

  const [account] = await db
    .select({ id: user.id, email: user.email, name: user.name })
    .from(user)
    .where(q.includes("@") ? sql`lower(${user.email}) = lower(${q})` : eq(user.id, q))
    .limit(1);
  if (!account) return null;

  const [ent] = await db.select().from(entitlements).where(eq(entitlements.userId, account.id)).limit(1);
  const [profile] = await db
    .select({ displayName: profiles.displayName, premiumUntil: profiles.premiumUntil })
    .from(profiles)
    .where(eq(profiles.userId, account.id))
    .limit(1);
  const ledger = await db
    .select()
    .from(premiumGrants)
    .where(eq(premiumGrants.userId, account.id))
    .orderBy(desc(premiumGrants.createdAt))
    .limit(10);

  const now = Date.now();
  const storeActive = future(ent?.storeUntil, now);
  const bonusActive = future(ent?.bonusUntil, now);
  const untilMs = Math.max(
    storeActive ? ent!.storeUntil!.getTime() : 0,
    bonusActive ? ent!.bonusUntil!.getTime() : 0,
  );

  return {
    userId: account.id,
    email: account.email,
    name: account.name,
    displayName: profile?.displayName ?? null,
    premium: untilMs > now,
    until: untilMs > now ? new Date(untilMs).toISOString() : null,
    source: storeActive ? "store" : bonusActive ? "bonus" : null,
    store: ent?.storeUntil || ent?.storeState
      ? {
          state: ent.storeState ?? null,
          platform: ent.storePlatform ?? null,
          product: ent.storeProduct ?? null,
          provider: ent.storeProvider ?? null,
          until: iso(ent.storeUntil),
        }
      : null,
    bonusDaysPending: Math.ceil((ent?.bonusMinutes ?? 0) / (24 * 60)),
    bonusUntil: iso(ent?.bonusUntil),
    cachedUntil: iso(profile?.premiumUntil),
    grants: ledger.map((g) => ({
      source: g.source,
      minutes: g.minutes ?? null,
      actor: g.actor ?? null,
      note: g.note ?? null,
      at: g.createdAt.toISOString(),
    })),
  };
}
