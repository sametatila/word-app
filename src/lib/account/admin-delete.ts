import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { revokeAppleSignIn } from "@/lib/account/apple-revoke";
import { purgeUserData } from "@/lib/account/purge";
import { recordDeletion } from "@/lib/account/deletion-log";

/**
 * Panelden hesap silme.
 *
 * Kullanıcının kendi silmesiyle (`POST /api/auth/delete-user`) AYNI SIRA:
 * önce Apple tarafındaki izin iptali (`account` satırı silinmeden okunmalı),
 * sonra uygulama verisinin tek transaction'da temizliği (`purgeUserData`),
 * en son `user` satırı - `session`, `account` ve `twoFactor` ona cascade ile
 * bağlı. Böylece iki yol da gizlilik politikası §11'in aynı sözünü tutuyor
 * ve `check:purge` ikisini birden kapsıyor.
 *
 * Kullanım: kullanıcının e-postayla gelen silme isteği (uygulamaya giremiyor),
 * spam/sahte hesap. Kalıcı ve geri alınamaz; panel iki adımlı onay istiyor.
 */
export async function adminDeleteUser(userId: string, adminEmail: string | null, reason: string): Promise<"ok" | "not_found"> {
  const res = (await db.execute(sql`select "createdAt" created_at, coalesce("isAnonymous", false) guest from "user" where id = ${userId}`)) as unknown;
  const rows = (Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows ?? []) as { created_at: string; guest: boolean }[];
  const u = rows[0];
  if (!u) return "not_found";
  await revokeAppleSignIn(userId);
  await purgeUserData(userId);
  await db.execute(sql`delete from "user" where id = ${userId}`);
  await recordDeletion({ source: "admin", adminEmail, reason, wasGuest: u.guest, createdAt: u.created_at });
  return "ok";
}
