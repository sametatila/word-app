import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { user } from "@/lib/db/auth-schema";
import { entitlements } from "@/lib/db/schema";
import { grantBonus } from "./entitlement";
import { LIFETIME_MINUTES, lifetimeConfigError, lifetimeDone, needsLifetime, parseLifetimeEmails } from "./lifetime-policy";

/**
 * Listedeki DOĞRULANMIŞ hesaplara ömür boyu Premium verir (gerekçe
 * `lifetime-policy`). Doğrulama şartı: e-postasını doğrulamamış biri listedeki
 * bir adresle hesap açıp hak alamasın (Google/Apple doğrulanmış gelir, e-posta
 * kaydı doğrulama postasıyla).
 *
 * Özet yalnız SAYI taşıyor: adresler cron kaydına ve günlüğe yazılmıyor.
 */
export async function runLifetimeGrants(): Promise<{ listed: number; accounts: number; granted: number; waiting: number; done: boolean; reason: string | null }> {
  const emails = parseLifetimeEmails(process.env.LIFETIME_PREMIUM_EMAILS);
  const until = process.env.LIFETIME_PREMIUM_UNTIL;
  /* Yapılandırma hatası turu bitirmez: fırlatılır, uç 500 döner, sarmalayıcı timer'ı kapatmaz. */
  const bad = lifetimeConfigError(emails, until);
  if (bad) throw new Error(bad);
  /* Süre dolduysa hiçbir şey verilmiyor: tur kapandı. */
  const expired = lifetimeDone(until, null);
  if (expired.done) return { listed: emails.size, accounts: 0, granted: 0, waiting: 0, ...expired };

  const rows = await db
    .select({ id: user.id, email: user.email, bonusMinutes: entitlements.bonusMinutes, bonusUntil: entitlements.bonusUntil })
    .from(user)
    .leftJoin(entitlements, eq(entitlements.userId, user.id))
    .where(and(inArray(sql`lower(${user.email})`, [...emails]), eq(user.emailVerified, true)));

  let granted = 0;
  for (const r of rows) {
    const ent = r.bonusMinutes == null ? null : { bonusMinutes: r.bonusMinutes, bonusUntil: r.bonusUntil };
    if (!needsLifetime(ent)) continue;
    await grantBonus(r.id, LIFETIME_MINUTES, {
      source: "manual",
      ref: "lifetime",
      actor: "system",
      note: "Ömür boyu Premium: test kullanıcısı (LIFETIME_PREMIUM_EMAILS)",
    });
    granted++;
  }
  const found = new Set(rows.map((r) => r.email.toLowerCase()));
  const waiting = [...emails].filter((e) => !found.has(e)).length;
  return { listed: emails.size, accounts: rows.length, granted, waiting, ...lifetimeDone(until, waiting) };
}
