import { and, eq, inArray, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { suggestUsername } from "./username";

/**
 * Kullanıcı adı olmayan hesaplara TEMBEL atama.
 *
 * Sosyal katman gelmeden açılmış hesapların adı yok; onları kim listelerse
 * (arama, öneri, akış, arkadaş listesi) o an atanır — bir kez, benzersiz.
 * Migration'da toplu atamak yerine tembel: kullanıcı ilk kez göründüğünde
 * adının olması yeter, hiç görünmeyecek hesaba ad üretmenin anlamı yok.
 *
 * Yarış: iki istek aynı hesabı aynı anda görürse ikisi de aynı adayı
 * hesaplar; benzersiz indeks ikinciyi düşürür, o da yeni tohumla yeniden
 * dener. `where username is null` koşulu ilk yazanın adını korur.
 */
export async function ensureUsernames(ids: string[]): Promise<void> {
  if (!ids.length) return;
  const rows = await db
    .select({ userId: profiles.userId, name: profiles.displayName })
    .from(profiles)
    .where(and(inArray(profiles.userId, ids), isNull(profiles.username)));
  for (const r of rows) await assignOne(r.userId, r.name);
}

export async function assignOne(userId: string, name: string | null): Promise<string | null> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const candidate = suggestUsername(name, attempt === 0 ? userId : `${userId}:${attempt}:${Date.now()}`);
    try {
      const done = await db
        .update(profiles)
        .set({ username: candidate })
        .where(and(eq(profiles.userId, userId), sql`${profiles.username} is null`))
        .returning({ username: profiles.username });
      if (done.length) return done[0].username;
      // Satır zaten adlandırılmış (yarışı başka istek kazandı).
      const [now] = await db.select({ username: profiles.username }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
      return now?.username ?? null;
    } catch (err) {
      // Benzersizlik çakışması: yeni tohumla dene. Başka hata ise yut, ad sonra atanır.
      const msg = err instanceof Error ? err.message : "";
      if (!/unique|duplicate|profiles_username_idx/i.test(msg)) {
        console.error("[social:username]", err);
        return null;
      }
    }
  }
  return null;
}
