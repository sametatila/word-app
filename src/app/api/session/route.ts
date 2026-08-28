import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { buildWalk, clearSessionState, loadSession, saveSessionProgress } from "@/lib/session";
import { parseProgress } from "@/lib/progress";
import { PLAYABLE_GAMES, type PlayableGame } from "@/lib/types";

export const dynamic = "force-dynamic";

/** Atlanacak kelime listesinin üst sınırı — adres uzunluğu için. */
const SKIP_LIMIT = 200;

/** Günün turu: yarım kalan varsa o, yoksa yenisi. Tur sunucuda tutulur. */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const today = normalizeDay(url.searchParams.get("day"));
  const extra = url.searchParams.get("extra") === "1";
  // Yürüyüş turu: kendi temiz kuyruğunu kurar ve `session_state`'e hiç
  // dokunmaz (normal oturumla aynı satırı paylaşıp birbirini ezmesinler).
  const walk = url.searchParams.get("walk") === "1";
  // Tek oyunlu tur: "?game=artikel". Tanıtım kartı bir oyun değil, bir
  // ekran — tek başına 20 tur tanıtım istenmesi anlamsız olurdu.
  const raw = url.searchParams.get("game");
  const only =
    raw && (PLAYABLE_GAMES as readonly string[]).includes(raw) ? (raw as PlayableGame) : undefined;
  /*
    Atlanacak kelimeler: "?skip=12,34".

    Yürürken modu yirmi tur bitince taze bir tur çekiyor ve bu yürüyüşte
    sorulanları veriyor — aynı yürüyüşte aynı kelimeyi ikinci kez sormanın
    öğretici bir karşılığı yok.

    Sayı sınırlı: adres uzunluğunun sınırı var ve uzun bir yürüyüşte liste
    büyümeye devam ederdi. Sondaki kırpılıyor değil BAŞTAKİ, çünkü en son
    sorulanların tekrar gelmemesi daha önemli.
  */
  const skip = (url.searchParams.get("skip") ?? "")
    .split(",")
    .map((x) => Number.parseInt(x, 10))
    .filter((n) => Number.isInteger(n) && n > 0)
    .slice(-SKIP_LIMIT);
  try {
    const payload = walk
      ? await buildWalk(userId, today, skip)
      : await loadSession(userId, today, extra, only, skip);
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[session]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/**
 * Turda nerede kalındığını bildirir.
 *
 * Cevap verilen turlarda ilerleme cevaplarla birlikte gider; bu uç yalnızca
 * cevap üretmeyen adımlar için gerekir ("bunu zaten biliyorum" gibi).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const progress = parseProgress(b.progress);
  if (!progress) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    await saveSessionProgress(userId, normalizeDay(b.day), progress);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[session:progress]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/** "Yeni tura başla": kayıtlı tur atılır, sonraki istek sıfırdan kurar. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    await clearSessionState(userId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[session:clear]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function normalizeDay(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : new Date().toISOString().slice(0, 10);
}
