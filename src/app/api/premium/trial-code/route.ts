import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { sameOrigin } from "@/lib/auth/origin";
import { claimStoreTrial, peekStoreTrialCode, type TrialPlan, type TrialPlatform } from "@/lib/premium/store-trial";
import { track } from "@/lib/events";
import { consume } from "@/lib/social/ratelimit";

export const dynamic = "force-dynamic";

/**
 * Grup kodu (mağaza denemesi) — `lib/premium/store-trial`.
 *
 *   POST  { code, platform, plan }  → oturum ister; kodu talep eder ve Play
 *                                     teklifinin etiketini döndürür. YALNIZ
 *                                     ANDROID: iOS `ios_web_only` alır.
 *   GET   ?code=…                   → herkese açık ön bakış; hiçbir şey harcamaz.
 *
 * iOS NEDEN YOK: App Store Guideline 3.1.1 uygulamanın kendi koduyla içerik
 * açmasını yasaklıyor. iPhone kullanıcısı webdeki `/g/<KOD>` sayfasından
 * Apple'ın KENDİ teklif kodu sayfasına gidiyor (`app/g/[code]/ios`).
 *
 * Promo ucundan (`/api/premium/redeem`) AYRI, çünkü sözleşme farklı: orada
 * sunucu yetkiyi kendisi yazıyor, burada yalnız kapıyı açıyor ve yetki mağazadan
 * webhook'la geliyor. İki tür tek uçta toplansaydı istemci "bu kod gün mü verdi
 * yoksa mağazaya mı gitmeliyim" sorusunu cevaptan tahmin etmek zorunda kalırdı.
 *
 * HATA SEBEPLERİ AYRIŞIK (bkz. redeem ucunun başı): her birinde kullanıcının
 * yapacağı şey farklı ve istemci sebebi doğrudan sözlük anahtarına çeviriyor.
 */
const PLATFORMS = new Set<TrialPlatform>(["ios", "android"]);
const PLANS = new Set<TrialPlan>(["monthly", "yearly"]);

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  /* HESAP İSTER: mağaza aboneliği hesaba yazılıyor; misafirde RevenueCat hesap
     kimliğine eşlenmiyor ve abonelik sahipsiz kalırdı (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  // Promo ucuyla aynı sınır ve aynı gerekçe: 8 haneli kod kaba kuvvetle denenmesin.
  const rl = await consume(`trial-code:${userId}`, 10, 600);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: rl.retryAfterSec },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSec) } },
    );
  }

  let body: { code?: unknown; platform?: unknown; plan?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const code = typeof body.code === "string" ? body.code : "";
  const platform = body.platform as TrialPlatform;
  const plan = body.plan as TrialPlan;
  if (!code.trim()) return NextResponse.json({ error: "not_found" }, { status: 400 });
  if (!PLATFORMS.has(platform) || !PLANS.has(plan)) return NextResponse.json({ error: "bad_input" }, { status: 400 });

  try {
    const r = await claimStoreTrial(userId, code, platform, plan);
    if (!r.ok) {
      // Misafir kapısı istemcinin tanıdığı ortak biçimde (403 account_required).
      const status = r.reason === "account_required" ? 403 : 400;
      return NextResponse.json({ error: r.reason }, { status });
    }
    /* Huni ölçümü: talep (deneme değil — o webhook'tan `store_trial_claims`e
       düşüyor). kind = platform:plan; kod ya da grup adı olaya YAZILMIYOR,
       etiket kapalı sözlükten olmalı (lib/events `cleanKind`). */
    void track(userId, "trial_code_claim", new Date().toISOString().slice(0, 10), 0, `${platform}:${plan}`);
    return NextResponse.json({ ok: true, platform: r.platform, plan: r.plan, offerTag: r.offerTag, code: r.code });
  } catch (err) {
    console.error("[premium/trial-code]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code") ?? "";
  /* HERKESE AÇIK UÇ, IP BAŞINA SINIR. Kimlik yok; anahtar nginx'in yazdığı
     `x-real-ip` (istemcinin kendisi yazamıyor, bkz. lib/auth/server). Sınır
     gevşek: karşılama sayfası ve uygulama kodu bir kez soruyor, ama kod
     alanını tarayan biri dakikada otuzdan fazlasını göremiyor. */
  const ip = req.headers.get("x-real-ip") ?? "?";
  const rl = await consume(`trial-peek:${ip}`, 30, 60);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: rl.retryAfterSec },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSec) } },
    );
  }
  try {
    const r = await peekStoreTrialCode(code);
    return NextResponse.json(r, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[premium/trial-code peek]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
