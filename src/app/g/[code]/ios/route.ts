import { NextResponse } from "next/server";
import { AUTH_BASE_URL } from "@/lib/auth/server";
import { iosRedirect, type TrialPlan } from "@/lib/premium/store-trial";
import { consume } from "@/lib/social/ratelimit";

export const dynamic = "force-dynamic";

/**
 * `lernomi.app/g/<KOD>/ios?plan=monthly|yearly` — iPhone ziyaretçisini Apple'ın
 * teklif kodu sayfasına götüren tek kapı.
 *
 * NEDEN SUNUCUDAN GEÇİYOR: iOS'ta grup kodu uygulamada girilmiyor (Guideline
 * 3.1.1) ve Apple'ın kodu TEK, yani App Store tarafında hangi gruptan
 * gelindiği görünmüyor. Gruba yazılabilen tek halka bu yönlendirme: kod
 * doğrulanıyor, tıklama ANONİM sayılıyor (kimlik yok) ve 302 ile Apple'a
 * gidiliyor. Karşılama sayfası doğrudan Apple adresine bağlansaydı bu sayı
 * hiç olmazdı.
 *
 * Geçersiz kod ya da iOS kodu henüz tanımlı değil: karşılama sayfasına geri
 * dönülüyor, orada durum cümlesi var. Hız sınırı aşılırsa kullanıcı YİNE
 * yönlendiriliyor ama sayım yazılmıyor: sayı şişirilemesin, gerçek kullanıcı
 * da mağazadan alıkonmasın.
 *
 * GENEL ADRESE geri dönüş (`AUTH_BASE_URL`): `req.url` nginx arkasında iç
 * adres taşıyor (bkz. `app/get/[target]`).
 */
export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code: raw } = await ctx.params;
  let ham = raw ?? "";
  try {
    ham = decodeURIComponent(ham);
  } catch {
    /* ham hâliyle devam */
  }
  const planParam = new URL(req.url).searchParams.get("plan");
  const plan: TrialPlan = planParam === "yearly" ? "yearly" : "monthly";
  const back = () => NextResponse.redirect(new URL(`/g/${encodeURIComponent(ham)}`, AUTH_BASE_URL), 302);

  const ip = req.headers.get("x-real-ip") ?? "?";
  const rl = await consume(`trial-click:${ip}`, 10, 600).catch(() => ({ ok: false }));
  const r = await iosRedirect(ham, plan, rl.ok).catch(() => ({ error: "invalid" as const }));
  if ("error" in r) return back();
  return NextResponse.redirect(r.url, 302);
}
