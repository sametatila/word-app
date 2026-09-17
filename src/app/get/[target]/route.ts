import { NextResponse } from "next/server";
import { appControl } from "@/lib/app-control";
import { getUserId } from "@/lib/auth/server";
import { track } from "@/lib/events";
import { cleanSource, platformOf } from "@/lib/store-link";

export const dynamic = "force-dynamic";

/**
 * `lernomi.app/get/premium` — webden uygulamaya satın alma yönlendirmesi.
 *
 * Bu adres iki yerde yaşıyor ve ikisi de bilerek:
 *   1. Uygulama KURULUYSA işletim sistemi adresi uygulamaya veriyor (App Link /
 *      Universal Link, bkz. `.well-known` ve mobil `parseDeepLink` "paywall")
 *      ve bu uç hiç çağrılmıyor - kullanıcı doğrudan uygulamanın paywall'ında.
 *   2. Kurulu DEĞİLSE (ya da masaüstünde QR okutulduysa) istek buraya geliyor:
 *      telefon türüne göre mağaza sayfasına yönlendiriliyor. Mağaza panelde
 *      "yayında" işaretli değilse kırık bir sayfaya değil paywall'a dönülüyor.
 *
 * Ölçüm: girişli ziyaretçide `store_redirect` (kind = platform:kaynak). Web
 * paywall → mağaza → mobil satın alma hunisinin orta basamağı.
 *
 * Yalnız `premium` hedefi var; başka hedef paywall'a düşüyor.
 */
export async function GET(req: Request, ctx: { params: Promise<{ target: string }> }) {
  const { target } = await ctx.params;
  const url = new URL(req.url);
  const platform = platformOf(req.headers.get("user-agent"));
  const source = cleanSource(url.searchParams.get("src"));
  const back = (q: string) => NextResponse.redirect(new URL(`/premium?${q}`, req.url));

  if (target !== "premium") return back("from=get");

  const userId = await getUserId().catch(() => null);
  if (userId) void track(userId, "store_redirect", new Date().toISOString().slice(0, 10), 0, `${platform}:${source}`);

  if (platform === "desktop") return back("from=get");
  const store = (await appControl()).store[platform];
  if (!store.live) return back("from=get&store=soon");
  return NextResponse.redirect(store.url, 302);
}
