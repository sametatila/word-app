import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { lockedAvatarParts, ownedAvatarItems } from "@/lib/avatar-items";
import { getLang } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

/**
 * Düzenleyicinin kilit bilgisi: bu kullanıcı için KİLİTLİ parçalar ve her
 * birinin nasıl açılacağı (kullanıcının dilinde). `items` ayrıca verilen
 * parçalar; eski mobil sürümler kilidi onunla çiziyor, kalıyor.
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const [items, locked] = await Promise.all([ownedAvatarItems(userId), lockedAvatarParts(userId, await getLang())]);
  return NextResponse.json(
    { items: items.map((i) => ({ id: i.itemId, source: i.source, at: i.acquiredAt.toISOString() })), locked },
    { headers: { "cache-control": "no-store" } },
  );
}
