import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { candoSummary } from "@/lib/cando-progress";

export const dynamic = "force-dynamic";

/** Yapabildiklerim (WP-43): ifade listesi + kullanıcının kanıt durumu. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const profile = await ensureProfile(userId);
    const summary = await candoSummary(userId, profile.course);
    return NextResponse.json({ level: profile.level, ...summary }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[cando]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
