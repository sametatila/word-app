import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";
import { skillLibraryAccess } from "@/lib/premium/skill-access";

export const dynamic = "force-dynamic";

/**
 * Beceriler kütüphanesinin kilit görünümü — mobil liste bununla çiziyor.
 *
 * Web aynı kararı sayfanın kendisinde (sunucuda) veriyor; kararın tek yeri
 * `lib/premium/skill-access`. Bu uç SAYMAZ: hak değerlendirme anında
 * `/api/assess` içinde düşüyor. Misafirde yapay zekâ zaten kapalı, `null`.
 */
export async function GET() {
  const who = await getUserInfo();
  if (!who) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (who.guest) return NextResponse.json({ access: null }, { headers: { "cache-control": "no-store" } });
  try {
    // Kütüphane kotası seviyeden bağımsız (bkz. `canAiPractice` `scope: "skill"`).
    const access = await skillLibraryAccess(who.id, "A1");
    return NextResponse.json({ access }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[skills/access]", err);
    // Okunamadıysa kilit çizilmiyor; kapıyı zaten sunucu tutuyor.
    return NextResponse.json({ access: null }, { headers: { "cache-control": "no-store" } });
  }
}
