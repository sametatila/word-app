import "server-only";
import { sttProviders, type SttProvider } from "@/lib/chat-providers";
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
  const providers = sttProviders();
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
  }
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
