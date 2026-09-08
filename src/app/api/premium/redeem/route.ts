import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { redeemCode } from "@/lib/premium/promo";
import { attachReferral } from "@/lib/premium/referral";
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
    if (r.ok) {
      const ent = await resolveEntitlement(userId);
      return NextResponse.json({ ok: true, kind: "promo", days: r.days, premium: ent.premium, until: ent.until });
    }

    /**
     * Kod bulunamadıysa DAVET kodu olabilir.
     *
     * Kullanıcı iki kod türü olduğunu bilmiyor ve bilmek zorunda da değil: eline
     * bir kod geçiyor, giriyor. Paylaşım bağlantısı da tek biçimde
     * (`/premium?code=…`) ve içinde davet kodu taşıyor — burada ayrıştırılmasa
     * o bağlantıyla gelen herkes "bu kod bulunamadı" görürdü.
     *
     * Davet ÖDÜL VERMİYOR, yalnız bağ kuruyor; ödül davet edilenin ilk
     * ödemesinde webhook üzerinden düşüyor. Bu yüzden yanıt premium açmıyor.
     */
    if (r.reason === "not_found") {
      const a = await attachReferral(userId, code);
      if (a === "ok") return NextResponse.json({ ok: true, kind: "referral" });
      // "already"/"self" kullanıcı hatası değil ama kodun da bir karşılığı yok:
      // bulunamadı demek en dürüstü, yoksa "kabul edildi" sanır.
      return NextResponse.json({ error: a === "unknown_code" ? "not_found" : a }, { status: 400 });
    }
    return NextResponse.json({ error: r.reason }, { status: 400 });
  } catch (err) {
    console.error("[premium/redeem]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
