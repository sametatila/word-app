import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { attachReferral, referralStats } from "@/lib/premium/referral";

export const dynamic = "force-dynamic";

/** Kullanıcının davet kodu ve kazanımları. Kod yoksa ilk çağrıda üretilir. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await referralStats(userId), { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[premium/referral]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/**
 * Daveti bağlar — yeni kullanıcı bir davet bağlantısıyla geldiyse.
 *
 * ÖDÜL BURADA VERİLMİYOR. Bu uç yalnız "kim kimi davet etti" bağını kuruyor;
 * ödül davet edilenin ilk ÖDEMESİNDE webhook üzerinden düşüyor. Ayrım kötüye
 * kullanımı kapatıyor: bu uç istemciden çağrılabildiği için, ödül burada
 * verilseydi sahte hesapla sınırsız hafta üretilirdi.
 *
 * Bağ bir kez kurulur ve DEĞİŞMEZ (`referrals_invitee_idx`): sonradan gelen
 * başka bir kod ilk davetçinin hakkını alamaz.
 */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let code = "";
  try {
    const body = (await req.json()) as { code?: unknown };
    code = typeof body.code === "string" ? body.code : "";
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!code.trim()) return NextResponse.json({ error: "unknown_code" }, { status: 400 });

  try {
    const r = await attachReferral(userId, code);
    // "already" ve "self" hata DEĞİL: kullanıcı yanlış bir şey yapmadı, bağ
    // kurulamadı o kadar. İstemci sessizce geçiyor.
    return NextResponse.json({ ok: r === "ok", result: r });
  } catch (err) {
    console.error("[premium/referral] bağ kurulamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
