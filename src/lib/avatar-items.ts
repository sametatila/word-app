import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { avatarItems } from "@/lib/db/schema";

/**
 * Nomi avatar altyapısı — sunucu tarafı (2026-09-28).
 *
 * `AVATAR_3D_BASE`: 3B kataloğun kökü (`katalog.json` + katmanlar, 3B avatar
 * hattının `cikti/avatar_512` çıktısı). Boşken istemciler 2B maskotu çiziyor.
 * Sahiplik `avatar_items`te; kazanım yolları (rozet, lig, seri, Premium,
 * etkinlik) katalog açılınca bu tabloya yazacak.
 */
export function avatar3dBase(): string | null {
  const v = (process.env.AVATAR_3D_BASE ?? "").trim().replace(/\/+$/, "");
  return /^https?:\/\//.test(v) ? v : null;
}

export async function ownedAvatarItems(userId: string): Promise<{ itemId: string; source: string; acquiredAt: Date }[]> {
  return db.select({ itemId: avatarItems.itemId, source: avatarItems.source, acquiredAt: avatarItems.acquiredAt }).from(avatarItems).where(eq(avatarItems.userId, userId));
}

/** Parçayı verir; zaten sahipse dokunmaz. */
export async function grantAvatarItem(userId: string, itemId: string, source: string): Promise<void> {
  await db.insert(avatarItems).values({ userId, itemId, source }).onConflictDoNothing();
}

export async function ownsAvatarItem(userId: string, itemId: string): Promise<boolean> {
  const r = await db.select({ itemId: avatarItems.itemId }).from(avatarItems).where(and(eq(avatarItems.userId, userId), eq(avatarItems.itemId, itemId))).limit(1);
  return r.length > 0;
}
