import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ownedAvatarItems } from "@/lib/avatar-items";

export const dynamic = "force-dynamic";

/** Kullanıcının kazandığı avatar parçaları — düzenleyici kilitleri buna göre çizer. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const items = await ownedAvatarItems(userId);
  return NextResponse.json({ items: items.map((i) => ({ id: i.itemId, source: i.source, at: i.acquiredAt.toISOString() })) }, { headers: { "cache-control": "no-store" } });
}
