import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { recordAiUsage } from "@/lib/ai-usage";
import { assess } from "@/lib/assess";
import {
  ASSESS_KINDS,
  ASSESS_LEVELS,
  ASSESS_MAX_CHARS,
  type AssessKind,
  type AssessLevel,
  type AssessRequest,
} from "@/lib/assess-prompts";
import { canAiPractice } from "@/lib/premium/access";
import { premiumConfig, bumpUsage, getUsage } from "@/lib/premium";
import { clampDay } from "@/lib/award";

export const dynamic = "force-dynamic";

/**
 * AI değerlendirme ucu (WP-03).
 *
 *   POST { kind, level, task: {prompt, target?, targets?, constraints?},
 *          answer: {text, transcript?}, exerciseId?, day? }
 *   200 { result, cached, provider }
 *   400 bad_request · 401 · 403 · 413 too_long · 429 quota
 *   502 invalid (model şemaya uymadı) · 503 not_configured | upstream
 *
 * Koç ucuyla (coach/route.ts) aynı sözleşme: 503 "istek bozuk değil, servis
 * şu an yok" demek ve istemci bunu hata olarak göstermez, kural tabanlı
 * yedeğine düşer (lib/assess-client.ts).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  if (parsed.tooLong) return NextResponse.json({ error: "too_long", max: ASSESS_MAX_CHARS }, { status: 413 });

  /**
   * PREMIUM KAPISI — yalnız AI değerlendirmesi taşıyan türlerde.
   *
   * `sentence` bilerek DIŞARIDA: o, kelime turunun içindeki serbest cümle
   * görevi ve kelime turları iki katmanda da sınırsız. Kilit, ücretsiz katmanda
   * kotalı olan konuşma ve yazma alıştırmalarında.
   *
   * `roleplay` konuşma sayılıyor: uygulamada "Konuşma" dersinin kendisi o.
   *
   * KOTA BURADA ARTMIYOR. Bir alıştırma birden çok değerlendirme üretebiliyor
   * (yaz, düzelt, yeniden gönder) ve her birini hak saymak kullanıcının iki
   * hakkını tek alıştırmada yakardı. Tasarım şu: hak alıştırma BAŞINDA bir kez
   * sayılıyor (`/api/premium/consume`), burası yalnız "hakkı var mı" diye
   * bakıyor.
   *
   * AMA O UCU BUGÜN HİÇBİR İSTEMCİ ÇAĞIRMIYOR (2026-09-12 ölçüldü): ne web ne
   * mobil. Yani tur/alıştırma başına hak HİÇ HARCANMIYOR; sayılan tek şey
   * aşağıdaki `ai_assess_calls` emniyet tavanı. Kotayı gerçekten işletmek bir
   * ÜRÜN kararı (bugün ücretsiz kullanılan bir yüzeyi kilitler) ve premium
   * hâlâ pasif; kayıt `docs/plan/web-parity.md` §11.489'da.
   */
  const gated = parsed.req.kind === "writing" || parsed.req.kind === "speaking" || parsed.req.kind === "roleplay";
  if (gated) {
    const kind = parsed.req.kind === "writing" ? "writing" : "speaking";
    const gate = await canAiPractice(userId, kind, "lesson", parsed.req.level);
    if (!gate.allowed) {
      return NextResponse.json({ error: "premium_required", reason: gate.reason, gate: gate.gate }, { status: 403 });
    }
    /**
     * Emniyet tavanı — ÇAĞRI başına.
     *
     * Hak sayacını hiç çağırmayan değiştirilmiş bir istemci yukarıdaki kapıyı
     * geçip aynı hakla sınırsız değerlendirme isteyebilirdi. Günlük çağrı
     * tavanı buna karşı: alıştırma başına birkaç değerlendirmeye izin verecek
     * kadar cömert (×4), tek bir hesabın Mistral bütçesini yakmasına izin
     * vermeyecek kadar dar.
     */
    const cfg = await premiumConfig();
    const ceiling = Math.max(cfg.fairUse.aiPracticePerDay, 1) * 4;
    if ((await getUsage(userId, "ai_assess_calls", "day")) >= ceiling) {
      return NextResponse.json({ error: "quota", reason: "fair_use" }, { status: 429 });
    }
    void bumpUsage(userId, "ai_assess_calls", "day");
  }

  const outcome = await assess(userId, parsed.req, parsed.day, (r) =>
    recordAiUsage(userId, { kind: "assess", ...r }),
  );

  if (outcome.ok) {
    return NextResponse.json({ result: outcome.result, cached: outcome.cached, provider: outcome.provider });
  }
  switch (outcome.reason) {
    case "not_configured":
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    case "quota":
      return NextResponse.json({ error: "quota" }, { status: 429 });
    case "invalid":
      return NextResponse.json({ error: "invalid" }, { status: 502 });
    default:
      console.error("[assess]", outcome.detail);
      return NextResponse.json({ error: "upstream" }, { status: 503 });
  }
}

const MAX_TASK = 600;
const MAX_LIST = 12;

function text(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function list(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const out = v.map((x) => text(x, 200)).filter(Boolean).slice(0, MAX_LIST);
  return out.length ? out : undefined;
}

function parseBody(body: unknown): { req: AssessRequest; day: string; tooLong: boolean } | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (!ASSESS_KINDS.includes(b.kind as AssessKind)) return null;
  if (!ASSESS_LEVELS.includes(b.level as AssessLevel)) return null;
  const task = (b.task ?? {}) as Record<string, unknown>;
  const answer = (b.answer ?? {}) as Record<string, unknown>;
  const prompt = text(task.prompt, MAX_TASK);
  const answerText = typeof answer.text === "string" ? answer.text.trim() : "";
  if (!prompt || !answerText) return null;

  /*
   * Gün SINIRLANIYOR, yalnız biçimi denetlenmiyor.
   *
   * `day` bir yazma anahtarı: değerlendirme satırı o güne yazılıyor ve
   * GÜNLÜK KOTA da o günün satırları sayılarak bulunuyor (`lib/assess`).
   * Biçimi doğru ama her istekte farklı bir tarih göndermek o sayımı hep
   * sıfır gösterirdi. Yukarıdaki emniyet tavanı sunucunun kendi gününe
   * baktığı için sınırsız çağrı yine mümkün değildi; yine de asıl kotanın
   * atlanabilir olması yanlış.
   *
   * `clampDay` sunucunun gününe ±1 gün uzaklıktakini kabul ediyor - depodaki
   * öteki uçların hepsi (answers, daily, session, weekly, exam, mock-exam)
   * baştan beri böyle yapıyor.
   */
  const day = clampDay(b.day);

  return {
    tooLong: answerText.length > ASSESS_MAX_CHARS,
    day,
    req: {
      kind: b.kind as AssessKind,
      level: b.level as AssessLevel,
      task: {
        prompt,
        target: text(task.target, MAX_TASK) || undefined,
        targets: list(task.targets),
        constraints: list(task.constraints),
      },
      answer: {
        text: answerText.slice(0, ASSESS_MAX_CHARS),
        transcript: list(answer.transcript),
      },
      exerciseId: text(b.exerciseId, 40) || undefined,
      // Hedef dil: istemci vermezse Almanca (tarihsel varsayılan). İngilizce
      // kütüphane egzersizleri (2026-09) "en" gönderir; tip zaten alanı
      // taşıyordu ama route hiç okumuyordu, yani İngilizce metin Almanca
      // rubriğiyle puanlanırdı.
      lang: b.lang === "en" ? "en" : "de",
    },
  };
}
