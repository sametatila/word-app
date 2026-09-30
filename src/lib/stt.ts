import "server-only";
import { AZURE_STT_MONTHLY_SECONDS } from "@/lib/azure-speech-limits";
import { sttProviders, type SttProvider } from "@/lib/chat-providers";
import { recordAiUsage } from "@/lib/ai-usage";

/**
 * Konuşmayı yazıya çevirme — yalnız ekran kapalı yürüyüş (mobil, `/api/stt`).
 *
 * Sunucuya ses yalnız ekran kapalıyken geliyor (Samet, 2026-09-27): ekran
 * açıkken mobil cihazın, web tarayıcının kendi tanıyıcısını kullanıyor.
 * `/api/pronounce` artık ses almıyor, tarayıcının metnini puanlıyor. Zincir
 * Azure → Deepgram → Groq (bkz. chat-providers `sttProviders`); Azure'un
 * aylık F0 kotası burada korunuyor.
 *
 * Her deneme `ai_usage`'a yazılır (başarısızlar dâhil): kotaya ne kadar
 * yaklaşıldığı ancak buradan görülür. Ses saklanmaz.
 */
export type SttWord = { word: string; start: number; end: number };

export type SttResult = {
  text: string;
  /** Klip süresi (sn) — sağlayıcı bildirdiyse, yoksa boyuttan tahmin. */
  duration: number;
  /** Tanıyıcının kendi güveni (0–1) — Azure/Deepgram. */
  confidence?: number;
  provider: string;
  model: string;
};

export type SttOptions = {
  language?: string;
  /** Muhasebe için: kim, ne bekleniyordu. */
  userId: string;
  expected?: string;
};

export function sttConfigured(): boolean {
  return sttProviders().length > 0;
}

/** Klip uzunluğu tahmini: opus ~16 kB/sn, wav 16 kHz mono ~32 kB/sn. */
export function estimateSeconds(file: File): number {
  const rate = file.type.includes("wav") ? 32_000 : 16_000;
  return Math.max(1, Math.min(60, file.size / rate));
}

const ext = (file: File) => (file.type.includes("wav") ? "wav" : file.type.includes("mp4") ? "mp4" : file.type.includes("ogg") ? "ogg" : "webm");

/**
 * SAĞLAYICI ÇAĞRISININ TAVANI YOKTU.
 *
 * Zincirin bütün anlamı bir sağlayıcı düşünce öbürüne geçmek; ama DÜŞMEK ile
 * ASILI KALMAK aynı şey değil. Aşağıdaki yedi çağrının hiçbiri zaman aşımı
 * taşımıyordu: yanıt vermeyen bir sağlayıcı ucun otuz saniyelik bütçesini
 * (`api/stt` `maxDuration`) tek başına yiyor ve sıradaki sağlayıcıya HİÇ
 * geçilmiyordu. Kullanıcı tarafında bu "duyamadım" olarak görünüyor (web
 * istemcisi sekiz saniyede, Android native yolu yirmide vazgeçiyor), yani
 * yedek zincir tam da gerektiği anda çalışmıyordu.
 *
 * Sekiz saniye: bütçe içinde en az üç denemeye yer bırakıyor. Kardeş
 * sağlayıcılarda tavan zaten vardı (`chat-providers` 30 sn, `tts/azure`
 * 15 sn) - eksik olan yalnız bu dosyaydı.
 */
const PROVIDER_TIMEOUT_MS = 8_000;

/** Tavanlı `fetch` — bu dosyadaki HER dış çağrı buradan geçiyor. */
const sttFetch = (url: string, init?: RequestInit): Promise<Response> =>
  fetch(url, { ...init, signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS) });

export class SttError extends Error {
  constructor(
    message: string,
    public readonly failures: string[],
  ) {
    super(message);
  }
}

/**
 * Zinciri sırayla dener; ilk başarılı cevabı döner. Hiçbiri dönmezse
 * `SttError` (failures listesiyle). 429/5xx → sonraki sağlayıcı; 400 (bozuk
 * dosya) da sonraki sağlayıcıya geçer — bir sağlayıcının çözemediğini
 * öbürü bazen çözüyor (ölçüldü: aynı klip Groq'ta 400, Deepgram'da metin).
 */
export async function transcribe(file: File, opts: SttOptions): Promise<SttResult> {
  let providers = sttProviders();
  if (providers.some((p) => p.name === "azure") && !(await azureBudgetOk())) {
    providers = providers.filter((p) => p.name !== "azure");
  }
  if (!providers.length) throw new SttError("not_configured", []);
  const language = opts.language ?? "de";
  const seconds = estimateSeconds(file);
  const failures: string[] = [];

  for (const provider of providers) {
    const startedAt = Date.now();
    try {
      const out = await callProvider(provider, file, language);
      recordAiUsage(opts.userId, {
        kind: "stt",
        provider: provider.name,
        model: provider.model,
        ok: true,
        status: 200,
        ms: Date.now() - startedAt,
        audioSeconds: Math.round(out.duration || seconds),
        expected: opts.expected,
        heard: out.text,
        confidence: out.confidence,
      });
      return { ...out, duration: out.duration || seconds, provider: provider.name, model: provider.model };
    } catch (err) {
      const e = err as Error & { status?: number };
      recordAiUsage(opts.userId, {
        kind: "stt",
        provider: provider.name,
        model: provider.model,
        ok: false,
        status: e.status ?? 0,
        ms: Date.now() - startedAt,
        error: (e.message ?? "").slice(0, 200),
        audioSeconds: Math.round(seconds),
      });
      failures.push(`${provider.name}: ${e.status ?? ""} ${e.message ?? ""}`.trim());
    }
  }
  throw new SttError("failed", failures);
}

type Raw = Omit<SttResult, "provider" | "model" | "duration"> & { duration?: number };

function httpError(status: number, detail: string): Error & { status: number } {
  const e = new Error(detail.slice(0, 200)) as Error & { status: number };
  e.status = status;
  return e;
}

async function callProvider(p: SttProvider, file: File, language: string): Promise<Raw> {
  switch (p.dialect) {
    case "openai":
      return openaiStyle(p, file, language);
    case "deepgram":
      return deepgram(p, file, language);
    case "azure":
      return azure(p, file, language);
  }
}

/**
 * Azure Speech, kısa-ses REST ucu (≤ 60 sn; WAV 16 kHz mono ya da OGG/Opus).
 *
 * Ekran kapalı yürüyüşün ana hattı (bkz. chat-providers `sttProviders`).
 * `format=detailed` NBest listesini ve her adayın güvenini veriyor; sessizlikte
 * uydurmak yerine `InitialSilenceTimeout`/`NoMatch` dönüyor. O hâller boş
 * metin ve sıfır güven olarak geçiyor, HATA değil: hata sayılsa zincir
 * sıradakine geçer ve Whisper aynı sessizliğe bir kelime uydururdu.
 *
 * Dil kodu BCP-47 istiyor; uçlar iki harfli kod taşıdığı için burada
 * eşleniyor. Webm gövde kabul edilmiyor: istemci zaten WAV'a çeviriyor,
 * çeviremediği ham dilim için 400 atılır ve zincir sonraki sağlayıcıya geçer.
 */
const AZURE_LOCALE: Record<string, string> = { de: "de-DE", tr: "tr-TR", en: "en-US", fr: "fr-FR", it: "it-IT", es: "es-ES" };

async function azure(p: SttProvider, file: File, language: string): Promise<Raw> {
  const type = file.type.includes("wav")
    ? "audio/wav; codecs=audio/pcm; samplerate=16000"
    : file.type.includes("ogg")
      ? "audio/ogg; codecs=opus"
      : null;
  if (!type) throw httpError(400, `azure: desteklenmeyen biçim ${file.type || "bilinmiyor"}`);
  const locale = AZURE_LOCALE[language] ?? `${language}-${language.toUpperCase()}`;
  // Küfür maskelenir: tanınan metin ekranda "duyduğum: …" olarak yansıyor.
  const query = new URLSearchParams({ language: locale, format: "detailed", profanity: "masked" });
  const res = await sttFetch(`${p.baseUrl}/speech/recognition/conversation/cognitiveservices/v1?${query}`, {
    method: "POST",
    headers: { "Ocp-Apim-Subscription-Key": p.key, "content-type": type, accept: "application/json" },
    body: await file.arrayBuffer(),
  });
  if (!res.ok) throw httpError(res.status, await res.text().catch(() => ""));
  const data = (await res.json()) as {
    RecognitionStatus?: string;
    NBest?: { Confidence?: number; Lexical?: string; Display?: string }[];
  };
  const status = data.RecognitionStatus ?? "";
  if (status === "Success") {
    const best = data.NBest?.[0];
    // Lexical: küçük harf, noktalamasız — kabul mantığının istediği biçim.
    return { text: (best?.Lexical ?? "").trim(), confidence: best?.Confidence };
  }
  if (status === "NoMatch" || status === "InitialSilenceTimeout" || status === "BabbleTimeout") {
    return { text: "", confidence: 0 };
  }
  throw httpError(502, `azure: ${status || "cevap yok"}`);
}

/**
 * Azure'un aylık F0 kotası (5 saat) için emniyet payı.
 *
 * Kota dolunca istekler reddediliyor; bunu yaşamadan zincirden düşmesi
 * gerekiyor ki cepteki tur Deepgram/Groq ile sürsün. `ai_usage` her başarılı
 * çağrının saniyesini tutuyor: ay başından beri toplanan saniye tavanı
 * geçince Azure o ay listeden çıkıyor. Sorgu her cep cevabında bir kez daha
 * yapılmasın diye bir dakikalık bellek var — bir dakikada tavanı aşacak kadar
 * ses gelmiyor.
 *
 * Tavan bilerek 5 saatin altında (varsayılan 4,5 sa): Azure'un kendi sayacı
 * bizim saniyeye yuvarlanmış toplamımızla birebir aynı değil.
 */
const BUDGET_CACHE_MS = 60_000;
let azureBudget: { at: number; ok: boolean } | null = null;

async function azureBudgetOk(): Promise<boolean> {
  if (azureBudget && Date.now() - azureBudget.at < BUDGET_CACHE_MS) return azureBudget.ok;
  let ok = true;
  try {
    const { db } = await import("@/lib/db");
    const { aiUsage } = await import("@/lib/db/schema");
    const { and, eq, gte, sql } = await import("drizzle-orm");
    const [row] = await db
      .select({ s: sql<number>`coalesce(sum(audio_seconds), 0)::int` })
      .from(aiUsage)
      .where(and(eq(aiUsage.provider, "azure"), eq(aiUsage.kind, "stt"), eq(aiUsage.ok, true), gte(aiUsage.createdAt, sql`date_trunc('month', now())`)));
    ok = (row?.s ?? 0) < AZURE_STT_MONTHLY_SECONDS;
    if (!ok) console.warn(`[stt] azure aylık tavan aşıldı (${row?.s} sn ≥ ${AZURE_STT_MONTHLY_SECONDS}), bu ay zincirden düştü`);
  } catch {
    /* sayaç okunamazsa Azure denenir: bu bir emniyet payı, kapı değil */
  }
  azureBudget = { at: Date.now(), ok };
  return ok;
}

/** Groq: OpenAI biçimi. */
async function openaiStyle(p: SttProvider, file: File, language: string): Promise<Raw> {
  const body = new FormData();
  body.append("file", file, `clip.${ext(file)}`);
  body.append("model", p.model);
  body.append("language", language);
  body.append("temperature", "0");
  body.append("response_format", "json");
  const res = await sttFetch(`${p.baseUrl}/audio/transcriptions`, { method: "POST", headers: { authorization: `Bearer ${p.key}` }, body });
  if (!res.ok) throw httpError(res.status, await res.text().catch(() => ""));
  const data = (await res.json()) as { text?: string; duration?: number };
  return { text: (data.text ?? "").trim(), duration: data.duration };
}

async function deepgram(p: SttProvider, file: File, language: string): Promise<Raw> {
  /* `mip_opt_out`: Deepgram'ın Model İyileştirme Programı varsayılanında ses,
     model eğitimi için saklanabiliyor. Gizlilik §4 "ses sağlayıcıda saklanmaz"
     diyor; bu bayrak o sözün bu yoldaki karşılığı (hukuk denetimi LEG-4). */
  const query = new URLSearchParams({ model: p.model, language, punctuate: "false", smart_format: "false", mip_opt_out: "true" });
  const res = await sttFetch(`${p.baseUrl}?${query}`, {
    method: "POST",
    headers: { Authorization: `Token ${p.key}`, "content-type": file.type || "audio/webm" },
    body: await file.arrayBuffer(),
  });
  if (!res.ok) throw httpError(res.status, await res.text().catch(() => ""));
  const data = (await res.json()) as {
    metadata?: { duration?: number };
    results?: { channels?: { alternatives?: { transcript?: string; confidence?: number }[] }[] };
  };
  const best = data.results?.channels?.[0]?.alternatives?.[0];
  return { text: (best?.transcript ?? "").trim(), confidence: best?.confidence, duration: data.metadata?.duration };
}
