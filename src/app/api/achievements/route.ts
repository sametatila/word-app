import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { achievementBoard, markAchievementsSeen, unlockKeysOf } from "@/lib/achievements";
import { ensureProfile } from "@/lib/session";
import { isNativeLang, DEFAULT_NATIVE } from "@/lib/i18n/dict";
import { partsForKeys } from "@/lib/avatar-items";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
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
    /* Kutlanacak rozetin açtığı avatar parçaları (`parts`, yoksa alan yok):
       kutlama kartı "yeni aksesuar" diye gösteriyor. Yalnız `fresh`e; duvar
       (`rows`) bunu taşımıyor.
       Kursun karşılık rozeti (`cloze300` → `artikel300`) o rozete bağlı
       parçayı da açıyor (`unlockKeysOf`); karşılık zaten kazanılmışsa (öteki
       kursta) parça yeni değil, kartta da yeni diye çıkmıyor. */
    const freshIds = new Set(board.fresh.map((r) => r.id));
    const opened = new Set(board.rows.filter((r) => r.unlocked && !freshIds.has(r.id)).map((r) => r.id));
    const fresh = await Promise.all(
      board.fresh.map(async (r) => {
        const keys = unlockKeysOf(r.id).filter((k) => k === r.id || !opened.has(k));
        const parts = await partsForKeys(keys, lang, req.headers.get("host"));
        return parts.length ? { ...r, parts } : r;
      }),
    );
    return NextResponse.json({ ...board, fresh });
  } catch (err) {
    console.error("[api/achievements]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}

/** Kutlaması gösterilen rozetleri işaretler — aynı rozet iki kez patlamasın. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
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
