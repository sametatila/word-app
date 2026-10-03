import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { revokeAppleSignIn } from "@/lib/account/apple-revoke";
import { purgeUserData } from "@/lib/account/purge";
import { deleteRevenueCatCustomer } from "@/lib/account/revenuecat-delete";
import { recordDeletion } from "@/lib/account/deletion-log";
import { logAdminAction, type AdminWriter } from "@/lib/admin";

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
 *
 * İŞLEM KAYDI BURADA, rotada değil (güvenlik denetimi 2026-10-03, D24): 29
 * Eylül'de 30 hesap bir betikle bu fonksiyon üzerinden silindi ve
 * `admin_audit`e tek satır düşmedi, çünkü kayıt yalnız `api/admin/users`
 * rotası yazıyordu. Artık her çağıran (panel ya da betik) bir yönetici
 * kimliği vermek zorunda ve silme kaydı burada yazılıyor. Betik
 * `{ email: "<kim>", userId: "script", ip: null }` geçer.
 */
export async function adminDeleteUser(userId: string, admin: AdminWriter, reason: string): Promise<"ok" | "not_found"> {
  if (!admin.email.trim()) throw new Error("adminDeleteUser: yönetici kimliği zorunlu");
  const res = (await db.execute(sql`select "createdAt" created_at, coalesce("isAnonymous", false) guest from "user" where id = ${userId}`)) as unknown;
  const rows = (Array.isArray(res) ? res : (res as { rows?: unknown[] }).rows ?? []) as { created_at: string; guest: boolean }[];
  const u = rows[0];
  if (!u) return "not_found";
  await revokeAppleSignIn(userId);
  await purgeUserData(userId);
  await deleteRevenueCatCustomer(userId);
  await db.execute(sql`delete from "user" where id = ${userId}`);
  await recordDeletion({ source: "admin", adminEmail: admin.email, reason, wasGuest: u.guest, createdAt: u.created_at });
  await logAdminAction(admin, "users.delete", userId, { reason: reason.slice(0, 120), ...(admin.userId === "script" ? { via: "script" } : {}) });
  return "ok";
}
