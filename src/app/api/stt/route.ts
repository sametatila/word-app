import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { sameOrigin } from "@/lib/auth/origin";
import { sttProviders, type SttMode } from "@/lib/chat-providers";
import { SttError, transcribe } from "@/lib/stt";
import { canPocketWalk } from "@/lib/premium/access";
import { premiumConfig, takeUsage } from "@/lib/premium";
import { aiConsentGate } from "@/lib/ai-consent";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { mockExamAttempts } from "@/lib/db/schema";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Kısa bir klip için fazlasıyla yeterli; sağlayıcı takılırsa istek burada
// kesilsin ki yürüyüş turu sonsuza kadar beklemesin.
export const maxDuration = 30;

/** Kabul edilen en büyük klip — bir kelimelik cevap birkaç yüz kilobayt. */
const MAX_BYTES = 2_000_000;
/** Kullanıcı başına günlük STT isteği (başarısızlar dâhil); pronounce'ın 120'si bunun içinde sayılır. */
const DAILY_LIMIT = DAILY_QUOTAS.sttRequests;

/**
 * Konuşmayı yazıya çevirme.
 *
 * Yürürken modu bunun için var. Tarayıcının kendi konuşma tanıyıcısı
 * (`SpeechRecognition`) yalnızca sayfa GÖRÜNÜRKEN çalışıyor: telefon
 * kilitlenince susuyor ve mod, asıl vaadi olan "telefon cepte kalabilir"i
 * yerine getiremiyor. `getUserMedia` akışı arka planda yaşıyor; ses
 * tarayıcıda kaydedilip buraya gönderiliyor.
 *
 * Sağlayıcı zinciri ve muhasebe `lib/stt.ts`'te (WP-20 ile `/api/pronounce`
 * ile ortak). Ses saklanmıyor.
 */
/**
 * Sunulan kimlik, BU kullanıcının ÇALIŞAN bir deneme sınavı kâğıdı mı.
 *
 * Doğrulama üç şeyi birden arıyor: satır var, sahibi bu kullanıcı, ve durumu
 * `running`. Yalnız kimliğin varlığına bakmak yetmezdi — başkasının ya da
 * bitmiş bir denemenin kimliği de bir dizgedir ve kapıyı açardı.
 */
async function isRunningMockAttempt(userId: string, id: number): Promise<boolean> {
  try {
    const [row] = await db
      .select({ id: mockExamAttempts.id })
      .from(mockExamAttempts)
      .where(and(eq(mockExamAttempts.id, id), eq(mockExamAttempts.userId, userId), eq(mockExamAttempts.state, "running")))
      .limit(1);
    return Boolean(row);
  } catch {
    /* Okunamıyorsa sınav sayılmıyor: karar KAPALI tarafa düşüyor. */
    return false;
  }
}

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
  /**
   * Zincir kipi. Yürürken modunun EKRAN KAPALI yolu `walk` gönderir ve yalnız
   * o kipte Azure zincire girer (bkz. chat-providers `SttMode`). Ekran
   * açıkken istemci bu uca hiç gelmiyor; gelse de `walk` demediği sürece
   * Azure kotası harcanmıyor.
   */
  let mode: SttMode = "default";
  /**
   * Deneme sınavı bağlamı — YETKİNİN dayanağı.
   *
   * Konuşma bölümünde ses sunucuda yazıya çevriliyor ve o yol cepte yürüyüş
   * değil; ayırt edici şey istemcinin beyanı değil, ÇALIŞAN BİR DENEME
   * KAĞIDININ kimliği olmalı. Kimlik doğrulanamazsa istek cepte yürüyüş
   * sayılıyor ve premium kapısına giriyor (aşağıda).
   */
  let examId: number | null = null;
  try {
    const form = await req.formData();
    const f = form.get("audio");
    if (f instanceof File) file = f;
    const lang = form.get("language");
    if (typeof lang === "string" && /^[a-z]{2}$/.test(lang)) language = lang;
    const want = form.get("expected");
    if (typeof want === "string") expected = want.slice(0, 120);
    if (form.get("mode") === "walk") mode = "walk";
    const ex = form.get("exam");
    if (typeof ex === "string" && /^\d{1,12}$/.test(ex)) examId = Number(ex);
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  /*
    YETKİ KARARI İSTEMCİNİN BEYANINDAN ÇIKARILDI.

    Eskiden premium kapısı yalnız gövdede `mode=walk` geldiğinde çalışıyordu:
    alanı göndermeyen bir istemci kapıyı hiç çalıştırmadan sunucu STT'sine
    ulaşıyordu. Dosyanın kendi ilkesiyle çelişiyordu — "kapı SUNUCUDA çünkü
    istemcide duran bir kapı kapı değil" — çünkü kapının AÇILIP AÇILMAYACAĞINA
    istemci karar veriyordu.

    Artık karar bağlamdan: çalışan ve KULLANICIYA AİT bir deneme sınavı
    kâğıdının kimliği sunulmuşsa sınav yolu, sunulmamışsa cepte yürüyüş.
    Varsayılan kapalı tarafta; alanı düşürmek artık kapıyı atlatmıyor, kapıya
    SOKUYOR.

    `mode` yalnız SAĞLAYICI SIRASI için kaldı (ekran açıkken asla Azure);
    yetkiyle ilgisi yok.

    EKRAN AÇIK YÜRÜYÜŞ BURAYA HİÇ GELMİYOR: o yol cihazın/tarayıcının kendi
    tanıyıcısını kullanıyor ve bize maliyeti yok — ücretsiz katmanda sınırsız
    kalabilmesinin sebebi bu. Kilit özelliğin kendisinde değil, faturayı
    üreten yolda.
  */
  const examOk = examId !== null && (await isRunningMockAttempt(userId, examId));
  if (!examOk) {
    const gate = await canPocketWalk(userId);
    if (!gate.allowed) {
      return NextResponse.json({ error: "premium_required", reason: gate.reason, gate: gate.gate }, { status: 403 });
    }
    /**
     * Emniyet tavanı — KELİME başına.
     *
     * Adil kullanım tavanı TUR cinsinden duyuruluyor ve tasarımda tur başında
     * bir kez sayılıyor (`/api/premium/consume`). O ucu bugün HİÇBİR İSTEMCİ
     * ÇAĞIRMIYOR (2026-09-12 ölçüldü), yani tur sayacı hiç artmıyor ve
     * aşağıdaki kelime başına tavan tek gerçek sınır. Değiştirilmiş bir
     * istemci için düşünülmüştü; bugün NORMAL istemci için de o.
     * Tur başına kelime sayısı cömert tutuldu: normal kullanıcı bunu görmez.
     */
    const cfg = await premiumConfig();
    const ceiling = Math.max(cfg.fairUse.pocketWalksPerDay, 1) * 40;
    if (!(await takeUsage(userId, "pocket_walk_words", "day", ceiling))) {
      return NextResponse.json({ error: "quota", reason: "fair_use" }, { status: 429 });
    }
  }

  if (!sttProviders(mode).length) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!file || file.size === 0) return NextResponse.json({ error: "no_audio" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });

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
    const out = await transcribe(file, { language, userId, expected, mode });
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
 * sözünü buna göre veriyor.
 */
export async function GET() {
  const providers = sttProviders();
  const walk = sttProviders("walk");
  return NextResponse.json({
    configured: providers.length > 0 || walk.length > 0,
    provider: providers[0]?.name ?? null,
    walk: walk[0]?.name ?? null,
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
