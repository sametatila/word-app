import { NextResponse } from "next/server";
import { accountRequired, GUEST_AI_TRIAL_KEY, GUEST_AI_TRIALS } from "@/lib/auth/guest";
import { getUserInfo } from "@/lib/auth/server";
import { getUsage, refundUsage } from "@/lib/premium/quota";
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
import { claimLessonAi } from "@/lib/premium/access";
import { claimSkillAi } from "@/lib/premium/skill-access";
import { getExercise } from "@/lib/skills";
import { premiumConfig, takeUsage } from "@/lib/premium";
import { signScore, openKey, examWritingTask } from "@/lib/exam-grade";
import { clampDay } from "@/lib/award";
import { aiConsentGate } from "@/lib/ai-consent";

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

  /* HESAP İSTER — misafirin tek deneme hakkı dışında (bkz. lib/auth/guest
     `GUEST_AI_TRIALS`). Hakkı bitmiş misafire 403 account_required RIZA
     KAPISINDAN ÖNCE: yoksa kullanamayacağı bir izin ekranı açılırdı. */
  const who = await getUserInfo();
  if (!who) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const userId = who.id;
  if (who.guest && (await getUsage(userId, GUEST_AI_TRIAL_KEY, "all")) >= GUEST_AI_TRIALS) return accountRequired();

  /*
    YAPAY ZEKÂ RIZASI — metin dil modeline gitmeden ÖNCE (App Store 5.1.2(i),
    Play Kullanıcı Verileri). İzin yoksa istek sağlayıcıya hiç iletilmiyor;
    istemci 403'ü yakalayıp izin ekranını açıyor (bkz. lib/ai-consent).
  */
  const consent = await aiConsentGate(userId, "ai_text");
  if (consent) return consent;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  // Misafirin denemesi yalnız yazma ve konuşmada; kısa cümle ve sohbet hesap istiyor.
  if (who.guest && parsed.req.kind !== "writing" && parsed.req.kind !== "speaking") return accountRequired();
  if (parsed.tooLong) return NextResponse.json({ error: "too_long", max: ASSESS_MAX_CHARS }, { status: 413 });

  /*
   * SINAV YAZMA OVERRIDE — güvenlik denetimi F7 (teorik açık kapatma).
   *
   * Geçerli bir sınav `examToken`'ı (start'ta mühürlenen keyToken) + exerciseId
   * gelirse, GÖREV TANIMI istemciden DEĞİL mühürlü kâğıttan alınır ve seviye de
   * sınavınki olur. Böylece değiştirilmiş bir istemci "kolay görev + mükemmel
   * cevap" ile yüksek puan alamaz: AI her zaman sunucunun gerçek sınav görevine
   * karşı puanlıyor. Skor jetonu YALNIZ bu override gerçekleştiğinde imzalanır
   * (`examVerified`), yani jetonun varlığı = "sunucu görevine karşı puanlandı".
   */
  let examVerified = false;
  const examToken = typeof (body as { examToken?: unknown }).examToken === "string" ? (body as { examToken: string }).examToken : null;
  if (examToken && parsed.req.kind === "writing" && typeof parsed.req.exerciseId === "string") {
    const key = openKey(examToken);
    const wt = key ? examWritingTask(key, parsed.req.exerciseId) : null;
    if (wt) {
      parsed.req.task = { prompt: wt.prompt, constraints: wt.constraints };
      parsed.req.level = wt.level as AssessLevel;
      examVerified = true;
    }
  }

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
   * mobil. Yani DERS turu/alıştırması başına hak HİÇ HARCANMIYOR (Beceriler
   * kütüphanesi 2026-09-15'ten beri aşağıda, sunucuda sayılıyor); sayılan tek şey
   * aşağıdaki `ai_assess_calls` emniyet tavanı. Kotayı gerçekten işletmek bir
   * ÜRÜN kararı (bugün ücretsiz kullanılan bir yüzeyi kilitler) ve premium
   * hâlâ pasif; kayıt `docs/plan/web-parity.md` §11.489'da.
   */
  const gated = parsed.req.kind === "writing" || parsed.req.kind === "speaking" || parsed.req.kind === "roleplay";
  /*
    BECERİLER KÜTÜPHANESİ kendi kotasıyla ve GERÇEKTEN sayılarak kapılanıyor
    (bkz. lib/premium/skill-access): hak alıştırmanın ilk değerlendirmesinde
    düşüyor, sonraki değerlendirmeler aynı hakla geçiyor. Sınav kâğıdının
    yazma görevi (`examVerified`) bu kapıya girmez.
  */
  /* Misafir bu kapıya girmez: sınırı zaten ömürlük tek deneme hakkı
     (`GUEST_AI_TRIALS`, aşağıda atomik alınıyor ve başarısızlıkta geri
     veriliyor). Kapıya girseydi beceri kotası da düşer, geri verilmez ve
     premium_required ile misafirin tek hakkını hiç kullanamamasına yol açardı. */
  const skillExercise = gated && !examVerified && !who.guest && typeof parsed.req.exerciseId === "string" ? await getExercise(parsed.req.exerciseId) : undefined;
  const skillGate = skillExercise ? await claimSkillAi(userId, skillExercise, parsed.req.level) : null;
  if (skillGate && !skillGate.allowed) {
    return NextResponse.json({ error: "premium_required", reason: skillGate.reason, gate: skillGate.gate }, { status: 403 });
  }
  if (gated && !skillGate) {
    /* KONTROL ETMEKLE KALMIYOR, HARCIYOR (2026-09-17). Eskiden yalnız
       `canAiPractice` çağrılıyordu ve sayaç hiç artmadığı için kontrol her
       zaman geçiyordu — duyurulan hak fiilen sınırsızdı. Hak alıştırmanın ilk
       değerlendirmesinde düşüyor; gerekçe `claimLessonAi`de. */
    const kind = parsed.req.kind === "writing" ? "writing" : "speaking";
    const gate = await claimLessonAi(userId, kind, parsed.req.level, parsed.req.exerciseId);
    if (!gate.allowed) {
      return NextResponse.json({ error: "premium_required", reason: gate.reason, gate: gate.gate }, { status: 403 });
    }
  }

  /**
   * Emniyet tavanı — ÇAĞRI başına, HER TÜR İÇİN (`sentence` dahil).
   *
   * Değiştirilmiş bir istemci hak sayacını hiç çağırmadan sınırsız değerlendirme
   * isteyebilirdi. Günlük çağrı tavanı buna karşı: alıştırma başına birkaç
   * değerlendirmeye izin verecek kadar cömert (×4), tek bir hesabın Mistral
   * bütçesini yakmasına izin vermeyecek kadar dar.
   *
   * Güvenlik denetimi F2 (2026-09-14): tavan eskiden yalnız `if (gated)`
   * içindeydi ve `sentence` bilerek gated değildi — o yol yalnız assess.ts'teki
   * read-then-act sayaçla (`n >= dailyLimit()`) korunuyordu. Bu klasik bir
   * TOCTOU: eşzamanlı `sentence` burst'ünde hepsi `n < limit` okuyup gerçek
   * Mistral çağrısı yapıyordu; üstüne client `day` (±1) sayacı üç kovaya bölüp
   * ~3× aşmaya izin veriyordu. Atomik `takeUsage` sunucu-günü anahtarlı ve
   * yarış-güvenli (ON CONFLICT ... count < limit); tüm türleri kapsayacak
   * şekilde `if (gated)` dışına alındı. Premium kapısı yukarıda gated kalır.
   */
  const cfg = await premiumConfig();
  const ceiling = Math.max(cfg.fairUse.aiPracticePerDay, 1) * 4;
  if (!(await takeUsage(userId, "ai_assess_calls", "day", ceiling))) {
    return NextResponse.json({ error: "quota", reason: "fair_use" }, { status: 429 });
  }

  // Deneme hakkı ATOMİK alınıyor: eşzamanlı iki istek iki hak harcayamaz.
  if (who.guest && !(await takeUsage(userId, GUEST_AI_TRIAL_KEY, "all", GUEST_AI_TRIALS))) return accountRequired();

  const outcome = await assess(userId, parsed.req, parsed.day, (r) =>
    recordAiUsage(userId, { kind: "assess", ...r }),
  );
  // Değerlendirme olmadıysa misafirin hakkı yanmıyor.
  if (who.guest && !outcome.ok) await refundUsage(userId, GUEST_AI_TRIAL_KEY, "all");

  if (outcome.ok) {
    // F7: yazma puanını imzala — AMA yalnız sınav görevine karşı puanlandıysa
    // (examVerified). Böylece jeton, sunucunun gerçek görevine karşı hesaplanmış
    // bir skoru kanıtlar; istemci-görevli çağrılar jeton üretmez.
    const overall = outcome.result?.score?.overall;
    const scoreToken =
      examVerified && typeof parsed.req.exerciseId === "string" && typeof overall === "number"
        ? signScore(userId, "writing", parsed.req.exerciseId, overall)
        : undefined;
    return NextResponse.json({
      result: outcome.result,
      cached: outcome.cached,
      provider: outcome.provider,
      ...(scoreToken ? { scoreToken } : {}),
    });
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
