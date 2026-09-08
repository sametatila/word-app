import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { achievementBoard, markAchievementsSeen } from "@/lib/achievements";
import { ensureProfile } from "@/lib/session";
import { isNativeLang, DEFAULT_NATIVE } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "auth" }, { status: 401 });
  try {
    /*
      Rozet adları SUNUCUDA çevriliyor ve dil PROFİLDEN okunuyor — çerezden
      değil, çünkü bu ucu mobil de kullanıyor ve orada bizim çerezimiz yok.
      Sözleşme değişmiyor (`title`/`hint` yine hazır metin), yani mobilin
      yayınlanmış sürümleri de bu düzeltmeden yararlanıyor.
    */
    const profile = await ensureProfile(userId).catch(() => null);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : DEFAULT_NATIVE;
    const board = await achievementBoard(userId, lang);
    return NextResponse.json(board);
  } catch (err) {
    console.error("[api/achievements]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}

/** Kutlaması gösterilen rozetleri işaretler — aynı rozet iki kez patlamasın. */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "auth" }, { status: 401 });
  try {
    const body = (await req.json()) as { seen?: unknown };
    const ids = Array.isArray(body.seen) ? body.seen.filter((x): x is string => typeof x === "string") : [];
    await markAchievementsSeen(userId, ids);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/achievements POST]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
