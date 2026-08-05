import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { clearSessionState, loadSession, saveSessionProgress } from "@/lib/session";
import { parseProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

/** Günün turu: yarım kalan varsa o, yoksa yenisi. Tur sunucuda tutulur. */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const today = normalizeDay(url.searchParams.get("day"));
  const extra = url.searchParams.get("extra") === "1";
  try {
    const payload = await loadSession(userId, today, extra);
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
