import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { advanceLevel, levelStatus } from "@/lib/level-readiness";

export const dynamic = "force-dynamic";

/**
 * Seviye ilerlemesi (docs/plan/level-progress.md).
 *   GET                         → { level, next, readiness: { vocab, path, total, ready }, advance }
 *   POST {action:"advance", to} → onaylı geçiş; yalnız geçilmiş seviye sınavının açtığı seviyeye
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const st = await levelStatus(userId);
    if (!st) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json(st, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[level]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (body.action !== "advance" || typeof body.to !== "string") return NextResponse.json({ error: "bad_request" }, { status: 400 });
  try {
    const r = await advanceLevel(userId, body.to);
    return NextResponse.json(r, { status: r.ok ? 200 : 409 });
  } catch (err) {
    console.error("[level]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
