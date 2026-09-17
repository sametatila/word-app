import { eq, getTableName, is, like, or } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/db/schema";

/**
 * KVKK m.11 / GDPR m.15-20: bir kullanıcının verisinin MAKİNE OKUNUR kopyası.
 *
 * TEK KAYNAK: komut satırı betiği (`scripts/export-user.ts`) ve yönetim paneli
 * (kullanıcı detayı › "Verisini indir") aynı işlevi çağırıyor. Tablo listesi
 * ŞEMADAN türetiliyor: yeni bir kullanıcı tablosu eklendiğinde çıktıya
 * kendiliğinden giriyor (`check:purge` silme tarafında aynı sütun kümesini
 * kolluyor).
 *
 * KİMLİK DOĞRULAMA MALZEMESİ ADIYLA DIŞARIDA (`AUTH_SECRET_TABLES`). `schema.ts`
 * `auth-schema`yı yeniden dışa açıyor ve bu tablolarda da `userId` sütunu
 * var; önceki betik bu yüzden dışa aktarılan dosyaya GEÇERLİ oturum
 * jetonlarını (`session`), parola özetini ve OAuth jetonlarını (`account`),
 * 2FA sırrını ve yedek kodlarını (`twoFactor`) koyuyordu (bulundu:
 * 2026-09-17). O dosyayı alan kişi hesaba girebilirdi. Kullanıcıya bunların
 * yerine zararsız özet veriliyor: hangi giriş yolları bağlı, ne zamandan beri.
 *
 * SALT OKUNUR. `server-only` işaretli değil, çünkü betik de çağırıyor; veritabanı
 * örneği parametre (betik kendi havuzunu kuruyor, bkz. oradaki not).
 */

/** Kullanıcıya bağlı sütun adları — `check:purge` ile aynı küme. */
export const USER_COLUMNS = [
  "userId", "fromUserId", "toUserId", "actorId", "requesterId", "addresseeId",
  "blockerId", "blockedId", "reporterId", "reportedId", "userAId", "userBId",
  "inviterUserId", "inviteeUserId",
] as const;

/** Asla dışa verilmeyen tablolar — güvenlik malzemesi, kullanıcı verisi değil. */
export const AUTH_SECRET_TABLES = new Set(["session", "account", "verification", "twoFactor"]);

export type UserExport = { data: Record<string, unknown>; tables: number; rows: number };

/** `who`: kullanıcı kimliği ya da e-posta. Bulunamazsa null. */
export async function buildUserExport(db: NodePgDatabase<typeof schema>, who: string): Promise<UserExport | null> {
  const { user, account } = await import("@/lib/db/auth-schema");
  const [row] = await db
    .select({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt })
    .from(user)
    .where(or(eq(user.id, who), eq(user.email, who)))
    .limit(1);
  if (!row) return null;
  const userId = row.id;
  // Giriş yolları: yalnız sağlayıcı adı ve tarih (jeton, parola özeti YOK).
  const logins = await db
    .select({ provider: account.providerId, linkedAt: account.createdAt })
    .from(account)
    .where(eq(account.userId, userId));

  const data: Record<string, unknown> = {
    _meta: {
      // Üretim tarihi ve kapsam çıktının İÇİNDE: gönderen neyi gönderdiğini,
      // alan neyi aldığını belgeleyebilsin.
      generatedAt: new Date().toISOString(),
      userId,
      email: row.email,
      name: row.name,
      accountCreatedAt: row.createdAt,
      loginMethods: logins,
      note: "KVKK m.11 / GDPR m.15-20 kapsaminda makine okunur kopya. Kimlik dogrulama malzemesi (parola ozeti, oturum jetonlari, 2FA sirri) guvenlik nedeniyle dahil degildir.",
    },
  };

  let tables = 0;
  for (const value of Object.values(schema)) {
    if (!is(value, PgTable)) continue;
    if (AUTH_SECRET_TABLES.has(getTableName(value))) continue;
    const t = value as unknown as Record<string, unknown>;
    const columns = USER_COLUMNS.filter((c) => c in t);
    if (!columns.length) continue;
    const conditions = columns.map((c) => eq(t[c] as never, userId as never));
    data[getTableName(value)] = await db
      .select()
      .from(value as never)
      .where(conditions.length === 1 ? conditions[0] : or(...conditions));
    tables++;
  }
  // `rate_limits` kullanıcıya metin anahtarıyla bağlı, sütunla değil.
  data.rate_limits = await db.select().from(schema.rateLimits).where(like(schema.rateLimits.key, `%:${userId}`));
  tables++;

  const rows = Object.entries(data)
    .filter(([k]) => k !== "_meta")
    .reduce((n, [, v]) => n + (Array.isArray(v) ? v.length : 0), 0);
  return { data, tables, rows };
}
