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
export async function GET(req: Request) {
  const who = await getUserInfo();
  if (!who) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (who.guest) return NextResponse.json({ access: null }, { headers: { "cache-control": "no-store" } });
  try {
    /* Hak 2026-09-25'ten beri SEVİYE BAŞINA: `levels` her seviyenin kapısını
       taşıyor. Üst düzeydeki `writing`/`speaking` eski sürümlerin alanı —
       `?level=` verilmezse A1'in kapısı (eski istemci seviye göndermiyordu). */
    const level = new URL(req.url).searchParams.get("level") ?? "A1";
    const access = await skillLibraryAccess(who.id, /^(A1|A2|B1|B2|C1)$/.test(level) ? level : "A1");
    return NextResponse.json({ access }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[skills/access]", err);
    // Okunamadıysa kilit çizilmiyor; kapıyı zaten sunucu tutuyor.
    return NextResponse.json({ access: null }, { headers: { "cache-control": "no-store" } });
  }
}
