import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Hesap silme kaydı — KİŞİSEL VERİ YOK.
 *
 * Silmeler hiçbir iz bırakmıyordu: panel "bu ay kaç kişi hesabını sildi,
 * kaçı ilk haftasında" sorusunu cevaplayamıyordu. Kimlik, e-posta ya da ad
 * yazılmıyor (gizlilik politikası §11: hesap kalıcı olarak silinir); yalnız
 * yol (self/admin/guest), hesabın yaşı ve panel silmesinde gerekçe kategorisi.
 *
 * YAZMA HİÇBİR ZAMAN FIRLATMIYOR: kayıt tutulamadı diye silme durmamalı.
 */
export async function recordDeletion(input: {
  source: "self" | "admin" | "guest";
  adminEmail?: string | null;
  reason?: string | null;
  wasGuest?: boolean;
  createdAt?: Date | string | null;
}): Promise<void> {
  try {
    const created = input.createdAt ? new Date(input.createdAt) : null;
    const ageDays = created && !Number.isNaN(created.getTime()) ? Math.max(0, Math.floor((Date.now() - created.getTime()) / 86_400_000)) : null;
    await db.execute(sql`
      insert into account_deletions (source, admin_email, reason, was_guest, age_days)
      values (${input.source}, ${input.adminEmail ?? null}, ${input.reason?.slice(0, 80) ?? null}, ${input.wasGuest === true}, ${ageDays})`);
  } catch (err) {
    console.error("[deletion-log]", err);
  }
}
