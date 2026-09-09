import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { registerDevice, unregisterDevice } from "@/lib/fcm";

export const dynamic = "force-dynamic";

/**
 * Mobil cihaz jetonu kaydı (FCM).
 *
 * Web'in `/api/push/subscribe` ucunun native karşılığı. Uygulama girişten
 * sonra ve jeton her yenilendiğinde çağırıyor; jeton cihaza ait olduğu için
 * aynı satır hesap değişince el değiştiriyor.
 */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: { token?: unknown; platform?: unknown } | null = null;
  try {
    body = (await req.json()) as { token?: unknown; platform?: unknown };
  } catch {
    /* gövde yok */
  }
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  const platform = body?.platform === "ios" ? "ios" : body?.platform === "android" ? "android" : null;
  // Jeton uzun ama sınırsız değil: 4096 üstü hiçbir FCM jetonunda görülmez.
  if (!token || token.length > 4096 || !platform) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  try {
    await registerDevice(userId, token, platform);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[push:device] kaydedilemedi", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/** Çıkışta ya da bildirim kapatılınca — cihaz artık bu hesabın bildirimini almasın. */
export async function DELETE(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: { token?: unknown } | null = null;
  try {
    body = (await req.json()) as { token?: unknown };
  } catch {
    /* gövde yok */
  }
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  if (!token) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  try {
    await unregisterDevice(token);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[push:device] silinemedi", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
