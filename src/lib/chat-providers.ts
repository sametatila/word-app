import "server-only";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Sohbet sağlayıcıları — EğitimKit'in `ai_gateway` katmanının küçük karşılığı.
 *
 * Orada da tek bir sağlayıcıya bağlanılmıyor: birincil seçilir, kota/ağ hatası
 * olursa yedek devreye girer. Aynı yapı burada da gerekli, çünkü üç seçeneğin
 * dengesi farklı:
 *
 *   gemini    — AI Studio ücretsiz katmanı. Bu iş için varsayılan: bedava ve
 *               Türkçe/Almanca'da Llama'dan belirgin daha iyi.
 *   anthropic — ücretli ama kural takibi en iyi olan. İşaret sözleşmesini
 *               (düzeltme/öneri satırları) en tutarlı uygulayan sağlayıcı bu.
 *   github    — GitHub Models ücretsiz katmanı (Llama-3.3-70B). Ücretsiz ama
 *               Türkçe'de token sınırı bozulmaları görülüyor ve limiti dar.
 *
 * Anahtarı olan sağlayıcı kullanılır; birden fazlası varsa `CHAT_PROVIDER`
 * belirler, o da yoksa yukarıdaki sıra geçerlidir.
 */

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ProviderName = "gemini" | "anthropic" | "github";

export type Provider = {
  name: ProviderName;
  model: string;
  stream: (system: string, messages: ChatMessage[]) => AsyncGenerator<string>;
};

/** Kısa sohbet turu: uzun cevap istemiyoruz, bekleme süresi konuşmayı bozuyor. */
const MAX_TOKENS = 400;
const TEMPERATURE = 0.3;
const TIMEOUT_MS = 30_000;

/* ────────────────────────── Gemini ────────────────────────── */

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash-lite";

async function* streamGemini(system: string, messages: ChatMessage[]): AsyncGenerator<string> {
  const key = process.env.GEMINI_API_KEY!;
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}` +
    `:streamGenerateContent?alt=sse&key=${encodeURIComponent(key)}`;

  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      // Gemini asistan rolüne "model" diyor; diğer iki sağlayıcı "assistant".
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature: TEMPERATURE, maxOutputTokens: MAX_TOKENS },
    }),
  });

  yield* readSse(res, (json) => {
    const parsed = json as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    return parsed.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") || "";
  });
}

/* ────────────────────────── Anthropic ────────────────────────── */

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";

async function* streamAnthropic(system: string, messages: ChatMessage[]): AsyncGenerator<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = client.messages.stream({
    model: ANTHROPIC_MODEL,
    max_tokens: MAX_TOKENS,
    system,
    // Kısa sohbet turunda derin düşünme gecikme demek; düşük eforla açık
    // bırakmak kapatmaktan iyi — kapalıyken iç etiketler cevaba sızabiliyor.
    output_config: { effort: "low" },
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      yield event.delta.text;
    }
  }
}

/* ────────────────────────── GitHub Models ────────────────────────── */

const GITHUB_MODEL = process.env.GITHUB_MODELS_MODEL || "Llama-3.3-70B-Instruct";

async function* streamGithub(system: string, messages: ChatMessage[]): AsyncGenerator<string> {
  const res = await fetchWithTimeout("https://models.github.ai/inference/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.GITHUB_MODELS_API_KEY}`,
      "content-type": "application/json",
      accept: "text/event-stream",
    },
    body: JSON.stringify({
      model: GITHUB_MODEL,
      stream: true,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });

  yield* readSse(res, (json) => {
    const parsed = json as { choices?: { delta?: { content?: string } }[] };
    return parsed.choices?.[0]?.delta?.content ?? "";
  });
}

/* ────────────────────────── Ortak yardımcılar ────────────────────────── */

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${res.status}: ${detail.slice(0, 300)}`);
  }
  return res;
}

/**
 * SSE gövdesini metin parçalarına çevirir.
 *
 * Gemini ve GitHub Models farklı JSON şekilleri döndürüyor ama çerçeveleme
 * aynı; `pick` yalnızca parçayı çıkarır. Chunk sınırı satırın ortasına
 * düşebildiği için son yarım satır tamponda bekletilir.
 */
async function* readSse(
  res: Response,
  pick: (json: unknown) => string,
): AsyncGenerator<string> {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const delta = pick(JSON.parse(payload));
        if (delta) yield delta;
      } catch {
        /* yarım ya da bozuk çerçeve — atla, akış sürsün */
      }
    }
  }
}

/* ────────────────────────── Seçim ────────────────────────── */

/** Ücretsiz ve kaliteli olan başta: anahtarı olan ilk sağlayıcı seçilir. */
const ORDER: ProviderName[] = ["gemini", "anthropic", "github"];

const KEYS: Record<ProviderName, string> = {
  gemini: "GEMINI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY",
  github: "GITHUB_MODELS_API_KEY",
};

function build(name: ProviderName): Provider {
  if (name === "gemini") return { name, model: GEMINI_MODEL, stream: streamGemini };
  if (name === "anthropic") return { name, model: ANTHROPIC_MODEL, stream: streamAnthropic };
  return { name, model: GITHUB_MODEL, stream: streamGithub };
}

function hasKey(name: ProviderName): boolean {
  return Boolean(process.env[KEYS[name]]);
}

/**
 * Denenecek sağlayıcılar — sırayla: birincil, sonra yedek(ler).
 *
 * `CHAT_PROVIDER` verilmişse o başa alınır; anahtarı yoksa yok sayılır ki
 * yanlış yazılmış bir değişken sohbeti tamamen kapatmasın.
 */
export function chatProviders(): Provider[] {
  const preferred = process.env.CHAT_PROVIDER as ProviderName | undefined;
  const order = ORDER.filter(hasKey);
  if (preferred && order.includes(preferred)) {
    return [build(preferred), ...order.filter((n) => n !== preferred).map(build)];
  }
  return order.map(build);
}

export function chatConfigured(): boolean {
  return chatProviders().length > 0;
}
