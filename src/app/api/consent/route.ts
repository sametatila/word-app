import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { sameOrigin } from "@/lib/auth/origin";
import { getLang } from "@/lib/i18n/server";
import { isLegalLocale, legalPath, type LegalLocale } from "@/lib/legal";
import { takeUsage } from "@/lib/premium";
import { AI_CONSENT_PURPOSES, isAiConsentPurpose } from "@/lib/ai-consent-shared";
import {
  aiConsentProcessors,
  aiConsentStatuses,
  isConsentPlatform,
  recordAiConsent,
} from "@/lib/ai-consent";

export const dynamic = "force-dynamic";

/**
 * Yapay zekâ işleme rızası — iki istemcinin (mobil `lib/aiConsent`, web
 * `lib/ai-consent-client`) okuduğu ve yazdığı tek uç.
 *
 *   GET  ?lang=tr|en|de
 *        200 { statuses: { ai_text, ai_voice }, processors: { ai_text: [...], ai_voice: [...] }, privacyPath }
 *   POST { purpose: "ai_text"|"ai_voice", granted: boolean, platform?: "ios"|"android"|"web" }
 *        200 { status } · 400 · 401 · 403 · 429
 *
 * ALICILAR SUNUCUDAN geliyor ve kasıtlı olarak: rıza ekranı, gizlilik
 * politikasının alıcılar tablosuyla (`lib/legal` `PROCESSORS`) AYNI listeyi
 * gösteriyor. İstemcide ikinci bir kopya olsaydı politika değişip uygulama
 * güncellenmeden eski bir listeye izin alınabilirdi — rızanın geçerli
 * olmadığı tam o durum.
 */
export async function GET(req: Request) {
  /* HESAP İSTER: yapay zekâ misafire kapalı, rıza defteri de yalnız hesaba tutuluyor (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  const asked = new URL(req.url).searchParams.get("lang") ?? "";
  const locale: LegalLocale = isLegalLocale(asked) ? asked : await getLang();

  try {
    const statuses = await aiConsentStatuses(userId);
    const processors = Object.fromEntries(AI_CONSENT_PURPOSES.map((p) => [p, aiConsentProcessors(p, locale)]));
    return NextResponse.json(
      { statuses, processors, privacyPath: legalPath("privacy", locale) },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[consent] read failed", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/** Günlük karar tavanı — defter eklemeli; bir döngü tabloyu şişirmesin. */
const DAILY_DECISIONS = 60;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  /* HESAP İSTER: yapay zekâ misafire kapalı, rıza defteri de yalnız hesaba tutuluyor (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!isAiConsentPurpose(body.purpose) || typeof body.granted !== "boolean") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!(await takeUsage(userId, "consent_decisions", "day", DAILY_DECISIONS))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const status = await recordAiConsent(userId, body.purpose, body.granted, isConsentPlatform(body.platform) ? body.platform : null);
    return NextResponse.json({ status });
  } catch (err) {
    console.error("[consent] write failed", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
