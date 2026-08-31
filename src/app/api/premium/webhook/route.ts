import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { grantPremium, revokePremium } from "@/lib/premium";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * RevenueCat abonelik webhook'u (WP-90) — premium yetki tek yazma kapısı.
 *
 * ALTYAPI HAZIR, KAYNAK BAĞLI DEĞİL: `REVENUECAT_WEBHOOK_AUTH` tanımsızsa uç
 * 503 döner. Bağlamak için RevenueCat panosunda bu sırla bir webhook tanımlanır;
 * RevenueCat her olayı `Authorization: <sır>` başlığıyla POST eder. app_user_id
 * mobilde `Purchases.logIn(userId)` ile bizim kullanıcı kimliğimize eşitlenir.
 *
 * Yetki YALNIZ buradan (ve web ödeme onayından) yazılır; istemci hiçbir uçtan
 * premium set edemez.
 */
type RcEvent = {
  event?: {
    type?: string;
    app_user_id?: string;
    expiration_at_ms?: number;
  };
};

const GRANT = new Set(["INITIAL_PURCHASE", "RENEWAL", "UNCANCELLATION", "NON_RENEWING_PURCHASE", "PRODUCT_CHANGE"]);
const REVOKE = new Set(["EXPIRATION", "REFUND", "SUBSCRIPTION_PAUSED"]);

function authorized(req: Request, secret: string): boolean {
  const given = Buffer.from(req.headers.get("authorization") ?? "");
  const want = Buffer.from(secret);
  return given.length === want.length && timingSafeEqual(given, want);
}

export async function POST(req: Request) {
  const secret = process.env.REVENUECAT_WEBHOOK_AUTH;
  if (!secret) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!authorized(req, secret)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: RcEvent;
  try {
    body = (await req.json()) as RcEvent;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const ev = body.event;
  const userId = ev?.app_user_id;
  const type = ev?.type;
  if (!userId || !type) return NextResponse.json({ error: "bad_event" }, { status: 400 });

  try {
    if (GRANT.has(type)) {
      // expiration_at_ms yoksa (tek seferlik) bir yıl ver; abonelikte sağlayıcı bildirir.
      const until = new Date(ev?.expiration_at_ms ?? Date.now() + 365 * 24 * 3600 * 1000);
      await grantPremium(userId, until, "revenuecat");
    } else if (REVOKE.has(type)) {
      await revokePremium(userId);
    }
    // Diğer olay türleri (CANCELLATION = otomatik yenileme kapatıldı ama süre
    // dolana dek yetki sürer, TEST vb.) yetkiye dokunmaz.
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[premium/webhook]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
