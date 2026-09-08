import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { redeemCode } from "@/lib/premium/promo";
import { resolveEntitlement } from "@/lib/premium";
import { consume } from "@/lib/social/ratelimit";

export const dynamic = "force-dynamic";

/**
 * Promo kodu bozdurma. Web, Android ve iOS aynı ucu çağırıyor.
 *
 * HIZ SINIRI ZORUNLU: kod alfabesi 31 karakter ve 8 hane, yani kaba kuvvetle
 * denemek teorik olarak mümkün. Dakikada birkaç deneme, gerçek kullanıcıyı hiç
 * rahatsız etmezken denemeyi anlamsız kılıyor.
 *
 * HATA SEBEPLERİ AYRIŞIK: "kod yok" ile "bu kodu zaten kullandın" ile "kod
 * tükendi" kullanıcı için bambaşka üç durum ve üçünde yapılacak şey farklı.
 * Tek bir "geçersiz kod" mesajı destek çağrısı üretir.
 */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const rl = await consume(`promo:${userId}`, 10, 600);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, { status: 429 });
  }

  let code = "";
  try {
    const body = (await req.json()) as { code?: unknown };
    code = typeof body.code === "string" ? body.code : "";
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!code.trim()) return NextResponse.json({ error: "not_found" }, { status: 400 });

  try {
    const r = await redeemCode(userId, code);
    if (!r.ok) return NextResponse.json({ error: r.reason }, { status: 400 });
    const ent = await resolveEntitlement(userId);
    return NextResponse.json({ ok: true, days: r.days, premium: ent.premium, until: ent.until });
  } catch (err) {
    console.error("[premium/redeem]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
