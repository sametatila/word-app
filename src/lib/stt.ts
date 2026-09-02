import "server-only";
import { sttProviders, type SttMode, type SttProvider } from "@/lib/chat-providers";
import { recordAiUsage } from "@/lib/ai-usage";

/**
 * Konuşmayı yazıya çevirme — tek zincir, iki uç (WP-20).
 *
 * `/api/stt` (yürüyüş modu, tek kelime) ve `/api/pronounce` (telaffuz puanı,
 * kelime zaman damgalı) aynı sağlayıcı zincirini kullanır: Groq → Cloudflare
 * Workers AI → Speechmatics → Deepgram → Mistral. Sıra kota ölçümünden
 * (`docs/plan/stt-capacity.md`): Groq'un darboğazı dakikada 20 istek, o
 * yüzden 429'da hemen bir sonrakine geçilir; Cloudflare günlük süreyle
 * sınırlı ama dakika sınırı yok — tepe dakikanın ikinci hattı.
 *
 * Yürürken modunun ekran kapalı yolu (`mode: "walk"`) başka bir sıra kullanır:
 * Azure → Deepgram → Whisper'lar. Orada ölçüt hız değil dürüstlük — bkz.
 * chat-providers `SttMode`. Azure'un aylık F0 kotası burada korunuyor.
 *
 * Her deneme `ai_usage`'a yazılır (başarısızlar dâhil): kotaya ne kadar
 * yaklaşıldığı ancak buradan görülür. Ses saklanmaz.
 */
export type SttWord = { word: string; start: number; end: number };

export type SttResult = {
  text: string;
  /** Kelime zaman damgaları — yalnız veren sağlayıcılarda ve istenince. */
  words?: SttWord[];
  /** Klip süresi (sn) — sağlayıcı bildirdiyse, yoksa boyuttan tahmin. */
  duration: number;
  /** Tanıyıcının kendi güveni (0–1) — Deepgram/Speechmatics. */
  confidence?: number;
  provider: string;
  model: string;
};

export type SttOptions = {
  language?: string;
  /** Kelime zaman damgası iste (telaffuz puanı için). */
  words?: boolean;
  /** Muhasebe için: kim, ne bekleniyordu. */
  userId: string;
  expected?: string;
  /** Zincir kipi — yürürken modunun cep yolu `walk` (Azure önde). */
  mode?: SttMode;
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
  let providers = sttProviders(opts.mode ?? "default");
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
      const out = await callProvider(provider, file, language, Boolean(opts.words));
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

async function callProvider(p: SttProvider, file: File, language: string, words: boolean): Promise<Raw> {
  switch (p.dialect) {
    case "openai":
      return openaiStyle(p, file, language, words);
    case "deepgram":
      return deepgram(p, file, language);
    case "cloudflare":
      return cloudflare(p, file, language);
    case "speechmatics":
      return speechmatics(p, file, language);
    case "azure":
      return azure(p, file, language);
  }
}

/**
 * Azure Speech, kısa-ses REST ucu (≤ 60 sn; WAV 16 kHz mono ya da OGG/Opus).
 *
 * Yürürken modunun cep yolunda ana hat (bkz. chat-providers `SttMode`).
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
  const res = await fetch(`${p.baseUrl}/speech/recognition/conversation/cognitiveservices/v1?${query}`, {
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
const AZURE_MONTHLY_SECONDS = Number(process.env.AZURE_STT_MONTHLY_SECONDS) || 16_200;
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
    ok = (row?.s ?? 0) < AZURE_MONTHLY_SECONDS;
    if (!ok) console.warn(`[stt] azure aylık tavan aşıldı (${row?.s} sn ≥ ${AZURE_MONTHLY_SECONDS}), bu ay zincirden düştü`);
  } catch {
    /* sayaç okunamazsa Azure denenir: bu bir emniyet payı, kapı değil */
  }
  azureBudget = { at: Date.now(), ok };
  return ok;
}

/** Groq / Mistral: OpenAI biçimi. Groq kelime zaman damgası verir (verbose_json). */
async function openaiStyle(p: SttProvider, file: File, language: string, words: boolean): Promise<Raw> {
  const body = new FormData();
  body.append("file", file, `clip.${ext(file)}`);
  body.append("model", p.model);
  body.append("language", language);
  body.append("temperature", "0");
  const wantWords = words && p.name === "groq";
  body.append("response_format", wantWords ? "verbose_json" : "json");
  if (wantWords) body.append("timestamp_granularities[]", "word");
  const res = await fetch(`${p.baseUrl}/audio/transcriptions`, { method: "POST", headers: { authorization: `Bearer ${p.key}` }, body });
  if (!res.ok) throw httpError(res.status, await res.text().catch(() => ""));
  const data = (await res.json()) as { text?: string; duration?: number; words?: { word: string; start: number; end: number }[] };
  return { text: (data.text ?? "").trim(), duration: data.duration, words: data.words?.map((w) => ({ word: w.word, start: w.start, end: w.end })) };
}

async function deepgram(p: SttProvider, file: File, language: string): Promise<Raw> {
  const res = await fetch(`${p.baseUrl}?${new URLSearchParams({ model: p.model, language, punctuate: "false", smart_format: "false" })}`, {
    method: "POST",
    headers: { Authorization: `Token ${p.key}`, "content-type": file.type || "audio/webm" },
    body: await file.arrayBuffer(),
  });
  if (!res.ok) throw httpError(res.status, await res.text().catch(() => ""));
  const data = (await res.json()) as {
    metadata?: { duration?: number };
    results?: { channels?: { alternatives?: { transcript?: string; confidence?: number; words?: { word: string; start: number; end: number }[] }[] }[] };
  };
  const best = data.results?.channels?.[0]?.alternatives?.[0];
  return { text: (best?.transcript ?? "").trim(), confidence: best?.confidence, duration: data.metadata?.duration, words: best?.words };
}

/**
 * Cloudflare Workers AI — REST, Worker gerekmez. Ses base64 gövdede.
 * Kelime zaman damgası yok; segment (VTT) var, telaffuz için yeterli değil.
 */
async function cloudflare(p: SttProvider, file: File, language: string): Promise<Raw> {
  const audio = Buffer.from(await file.arrayBuffer()).toString("base64");
  const res = await fetch(`${p.baseUrl}/ai/run/${p.model}`, {
    method: "POST",
    headers: { authorization: `Bearer ${p.key}`, "content-type": "application/json" },
    body: JSON.stringify({ audio, language, task: "transcribe", vad_filter: true }),
  });
  if (!res.ok) throw httpError(res.status, await res.text().catch(() => ""));
  const data = (await res.json()) as { success?: boolean; result?: { text?: string; segments?: { start: number; end: number; text: string }[]; transcription_info?: { duration?: number } }; errors?: { message: string }[] };
  if (data.success === false) throw httpError(502, data.errors?.map((e) => e.message).join("; ") ?? "cloudflare error");
  const segs = data.result?.segments ?? [];
  return { text: (data.result?.text ?? "").trim(), duration: data.result?.transcription_info?.duration ?? segs[segs.length - 1]?.end };
}

/**
 * Speechmatics toplu API: iş oluştur → sonucu yokla (kısa klipte 1–3 sn).
 * json-v2 kelime başına zaman ve güven verir.
 */
async function speechmatics(p: SttProvider, file: File, language: string): Promise<Raw> {
  const body = new FormData();
  body.append("data_file", file, `clip.${ext(file)}`);
  body.append("config", JSON.stringify({ type: "transcription", transcription_config: { language, operating_point: "enhanced" } }));
  const create = await fetch(`${p.baseUrl}/v2/jobs`, { method: "POST", headers: { authorization: `Bearer ${p.key}` }, body });
  if (!create.ok) throw httpError(create.status, await create.text().catch(() => ""));
  const { id } = (await create.json()) as { id: string };
  const deadline = Date.now() + 12_000;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 700));
    const st = await fetch(`${p.baseUrl}/v2/jobs/${id}`, { headers: { authorization: `Bearer ${p.key}` } });
    if (!st.ok) throw httpError(st.status, await st.text().catch(() => ""));
    const job = (await st.json()) as { job?: { status?: string; duration?: number } };
    if (job.job?.status === "rejected") throw httpError(400, "speechmatics rejected");
    if (job.job?.status !== "done") continue;
    const tr = await fetch(`${p.baseUrl}/v2/jobs/${id}/transcript?format=json-v2`, { headers: { authorization: `Bearer ${p.key}` } });
    if (!tr.ok) throw httpError(tr.status, await tr.text().catch(() => ""));
    const data = (await tr.json()) as { results?: { type: string; start_time: number; end_time: number; alternatives?: { content: string; confidence?: number }[] }[] };
    const words = (data.results ?? []).filter((r) => r.type === "word").map((r) => ({ word: r.alternatives?.[0]?.content ?? "", start: r.start_time, end: r.end_time, confidence: r.alternatives?.[0]?.confidence ?? 1 }));
    const conf = words.length ? words.reduce((s, w) => s + w.confidence, 0) / words.length : undefined;
    return { text: words.map((w) => w.word).join(" ").trim(), words: words.map(({ word, start, end }) => ({ word, start, end })), confidence: conf, duration: job.job?.duration };
  }
  throw httpError(504, "speechmatics timeout");
}
