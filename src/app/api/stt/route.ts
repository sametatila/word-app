import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { sameOrigin } from "@/lib/auth/origin";
import { sttProviders } from "@/lib/chat-providers";
import { STT_SAMPLE_RATE, SttError, transcribe, wavInfo } from "@/lib/stt";
import { canPocketWalk } from "@/lib/premium/access";
import { premiumConfig, takeUsage } from "@/lib/premium";
import { aiConsentGate } from "@/lib/ai-consent";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Kısa bir klip için fazlasıyla yeterli; sağlayıcı takılırsa istek burada
// kesilsin ki yürüyüş turu sonsuza kadar beklemesin.
export const maxDuration = 30;

/**
 * En uzun klip (sn). Yürüyüş kelime başına 3-4 sn dinliyor (mobil
 * `AZURE_WINDOW_MS`, evet/hayır 4 sn); pay, konuşma bitişini algılayan bir
 * kayıt penceresi gelirse diye. Süre WAV başlığından hesaplanıyor (`wavInfo`):
 * yalnız bayta bakan sınır sıkıştırılmış biçimle dakikalarca sese izin
 * veriyordu (güvenlik denetimi 2026-10-03, Y3).
 */
const MAX_SECONDS = 15;
/** Bayt sınırı süreden türüyor: 16 bit mono PCM saniyede 2 × örnekleme baytı, artı başlık payı. */
const MAX_BYTES = MAX_SECONDS * STT_SAMPLE_RATE * 2 + 4_096;
/** Kullanıcı başına günlük STT isteği (başarısızlar dâhil). */
const DAILY_LIMIT = DAILY_QUOTAS.sttRequests;

/**
 * Konuşmayı yazıya çevirme — YALNIZ ekran kapalı yürüyüş (mobil).
 *
 * Sunucuya ses yalnız ekran kapalıyken gelir (Samet, 2026-09-27). Ekran
 * açıkken her yüzey cihazın ya da tarayıcının kendi tanıyıcısını kullanıyor;
 * web'in telaffuz, deneme sınavı konuşması ve tanıyıcısız tarayıcıdaki yürüyüş
 * yolları buraya ses gönderiyordu, kaldırıldı. Uç `mode=walk` taşımayan her
 * isteği 400 ile reddediyor: iki mobil modül (Android `LernomiSpeechModule`,
 * iOS `LernomiSpeech`) bu alanı her yüklemede gönderiyor.
 *
 * Sağlayıcı zinciri (Azure → Deepgram → Groq) ve muhasebe `lib/stt.ts`'te.
 * Ses saklanmıyor.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  /* HESAP İSTER: sunucuda ses tanıma misafire kapalı; misafir cihazın kendi tanıyıcısıyla devam ediyor (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  /*
    YAPAY ZEKÂ RIZASI — ses kaydı konuşma tanıma sağlayıcısına gitmeden ÖNCE.
    Metinden AYRI bir izin: mikrofon açıklama ekranında verilen onay yalnız
    sesi kapsıyor (bkz. lib/ai-consent-shared).
  */
  const consent = await aiConsentGate(userId, "ai_voice");
  if (consent) return consent;

  let file: File | null = null;
  let language = "de";
  /** Beklenen cevap — yalnızca kayda geçiyor, karara etki etmiyor. */
  let expected = "";
  let walk = false;
  try {
    const form = await req.formData();
    const f = form.get("audio");
    if (f instanceof File) file = f;
    const lang = form.get("language");
    if (typeof lang === "string" && /^[a-z]{2}$/.test(lang)) language = lang;
    const want = form.get("expected");
    if (typeof want === "string") expected = want.slice(0, 120);
    walk = form.get("mode") === "walk";
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  /*
    EKRAN AÇIKKEN SES YOK. `walk` beyanı yetki değil, yol seçimi: taşımayan
    istek (eski web istemcisi, elle atılmış istek) sunucu tanımasına hiç
    girmiyor. Taşıyan istek aşağıdaki premium kapısından geçiyor; beyanı
    eklemek kapıyı atlatmıyor, kapıya sokuyor.
  */
  if (!walk) return NextResponse.json({ error: "screen_on_uses_device" }, { status: 400 });

  const gate = await canPocketWalk(userId);
  if (!gate.allowed) {
    return NextResponse.json({ error: "premium_required", reason: gate.reason, gate: gate.gate }, { status: 403 });
  }
  /**
   * Emniyet tavanı — KELİME başına.
   *
   * Premium'un yürüyüş tavanı TUR cinsinden duyuruluyor ve tur
   * `/api/session?walk=1` isteğinde sayılıyor (`openWalkRound`). Buradaki
   * kelime tavanı değiştirilmiş bir istemciye karşı ikinci kat: tur başına
   * kuyruğun (20 kelime, `buildWalk`) iki katı — normal kullanıcı bunu görmez.
   */
  const cfg = await premiumConfig();
  const ceiling = Math.max(cfg.fairUse.walkRoundsPerDay, 1) * 40;
  if (!(await takeUsage(userId, "pocket_walk_words", "day", ceiling))) {
    return NextResponse.json({ error: "quota", reason: "fair_use" }, { status: 429 });
  }

  if (!sttProviders().length) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!file || file.size === 0) return NextResponse.json({ error: "no_audio" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });
  /* Yalnız 16 kHz mono 16 bit PCM WAV: iki mobil modülün gönderdiği biçim.
     Gövde bir kez okunuyor ve sağlayıcılara aynı baytlar, istemcinin yazdığı
     türden bağımsız olarak `audio/wav` diye gidiyor. */
  const audio = await file.arrayBuffer();
  const wav = wavInfo(audio);
  if (!wav) return NextResponse.json({ error: "unsupported_audio" }, { status: 415 });
  if (wav.seconds > MAX_SECONDS) return NextResponse.json({ error: "too_long" }, { status: 413 });
  if (wav.dataBytes === 0) return NextResponse.json({ error: "no_audio" }, { status: 400 });
  const clip = new File([audio], "clip.wav", { type: "audio/wav" });

  if (!(await underDailyLimit(userId))) return NextResponse.json({ error: "quota" }, { status: 429 });
  /**
   * `underDailyLimit` tek başına paralel patlamayı durdurmuyor: saydığı
   * `ai_usage` satırı sağlayıcı cevap VERDİKTEN sonra yazılıyor, yani aynı
   * anda gelen yüz istek sayacı sıfırda görür ve yüzü de faturalanır. Atomik
   * sayaç o pencereyi kapatıyor; `ai_usage` sayımı yine duruyor çünkü düşen
   * sağlayıcı denemelerini de sayan o (bkz. `takeUsage`).
   */
  if (!(await takeUsage(userId, "stt_requests", "day", DAILY_LIMIT))) {
    return NextResponse.json({ error: "quota" }, { status: 429 });
  }
  try {
    const out = await transcribe(clip, { language, userId, expected });
    return NextResponse.json({ text: out.text, confidence: out.confidence, provider: out.provider, model: out.model });
  } catch (err) {
    if (err instanceof SttError) console.error("[api/stt] tüm sağlayıcılar düştü", err.failures.join(" · "));
    else console.error("[api/stt]", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}

/**
 * Arayüz, modu kurmadan önce bu ucun açık olup olmadığını soruyor.
 * `walk`: cep yolunun ilk sağlayıcısı — başlangıç ekranı "cepte çalışır"
 * sözünü buna göre veriyor. `provider` eski istemciler için aynı değer.
 */
export async function GET() {
  const providers = sttProviders();
  return NextResponse.json({
    configured: providers.length > 0,
    provider: providers[0]?.name ?? null,
    walk: providers[0]?.name ?? null,
  });
}

async function underDailyLimit(userId: string): Promise<boolean> {
  try {
    const { db } = await import("@/lib/db");
    const { aiUsage } = await import("@/lib/db/schema");
    const { and, eq, gte, sql } = await import("drizzle-orm");
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(aiUsage)
      .where(and(eq(aiUsage.userId, userId), eq(aiUsage.kind, "stt"), gte(aiUsage.createdAt, sql`now() - interval '1 day'`)));
    return (row?.n ?? 0) < DAILY_LIMIT;
  } catch {
    return true;
  }
}
