import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { deleteAssessment, listAssessments } from "@/lib/assess";

export const dynamic = "force-dynamic";

/**
 * Yazılarım (WP-30/64): kullanıcının değerlendirme kayıtları.
 *   GET            → son 20 kayıt (metin, puan, düzeltme; bekleyenler `result: null`)
 *   DELETE ?id=    → kendi kaydını siler (gizlilik: metin kullanıcının)
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ items: await listAssessments(userId) }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[assessments]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  try {
    const ok = await deleteAssessment(userId, id);
    return NextResponse.json({ deleted: ok });
  } catch (err) {
    console.error("[assessments] silme", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
