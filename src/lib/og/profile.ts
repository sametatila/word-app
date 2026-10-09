import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { isGuestUser } from "@/lib/auth/guest-user";
import { normalizeUsername } from "@/lib/social/username";
import { shownStreakSql } from "@/lib/streak-live";

export type ProfileCard = {
  username: string;
  name: string | null;
  avatar: string | null;
  level: string;
  streak: number;
};

/**
 * Önizleme kartının okuduğu profil — YALNIZ "herkese açık" profil.
 *
 * Önizlemeyi çeken servis girişsiz: `publicProfile` bir bakan kimliği
 * istiyor ve arkadaş görünürlüğünü ona göre açıyor. Burada bakan yok, yani
 * "arkadaşlar" ve "gizli" profil bu yoldan HİÇ okunmuyor (genel kart çizilir);
 * misafirin sosyal kimliği de yok. Alanlar profil sayfasının herkese
 * gösterdikleri: ad, kullanıcı adı, avatar, seviye, seri.
 */
export async function publicProfileCard(raw: string): Promise<ProfileCard | null> {
  const username = normalizeUsername(raw);
  if (!username) return null;
  const [p] = await db
    .select({
      userId: profiles.userId,
      name: profiles.displayName,
      avatar: profiles.avatar,
      level: profiles.level,
      streak: shownStreakSql(),
    })
    .from(profiles)
    .where(and(eq(profiles.username, username), eq(profiles.visibility, "public")))
    .limit(1);
  if (!p || (await isGuestUser(p.userId))) return null;
  return { username, name: p.name?.trim() || null, avatar: p.avatar, level: p.level, streak: p.streak };
}
