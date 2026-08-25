import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { errorReport } from "@/lib/error-analytics";

export const dynamic = "force-dynamic";

/** Zayıf noktalar (WP-51): son 30 günün hata tipi dağılımı, karıştırma çiftleri, zayıf kurallar. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const profile = await ensureProfile(userId);
    return NextResponse.json(await errorReport(userId, profile.course), { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[errors]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
