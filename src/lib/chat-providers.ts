import "server-only";

/**
 * Sohbet sağlayıcıları — needle/essay_scorer'daki `provider_router.py`'ın
 * bu uygulamaya uyarlanmış hâli.
 *
 * Oradaki fikir şu: bütün ücretsiz sağlayıcılar OpenAI uyumlu bir
 * `/chat/completions` ucu sunuyor, dolayısıyla tek bir istemci ve yalnızca
 * `baseUrl` + anahtar değişimiyle aralarında dönülebiliyor. Limiti dolan
 * sağlayıcı atlanır, 429/5xx'te sıradakine düşülür.
 *
 * Sıra **sohbete göre** kuruluyor, toplu işe göre değil — asıl fark burada:
 *
 *   cerebras — 1M token/gün, ücretsizler arasında en hızlısı. Sohbette
 *              gecikme her şeyden önemli olduğu için birincil bu.
 *   groq     — ~500K token/gün, yine çok hızlı. İlk yedek.
 *   mistral  — ayda 1 milyar token, ücretsiz katmanın en cömerti; ama
 *              ~2 RPM. Sohbette tek başına kullanılamaz (bir tur atıp yarım
 *              dakika beklemek gerekirdi), diğerleri tükendiğinde taşma
 *              yedeği olarak anlamlı.
 *
 * Anahtarı olmayan sağlayıcı listeye hiç girmez; birini kullanmak için tek
 * yapılacak şey anahtarını tanımlamak.
 */

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ProviderName = "cerebras" | "groq" | "mistral";

type ProviderConfig = {
  baseUrl: string;
  envKey: string;
  envModel: string;
  defaultModel: string;
  /** Ücretsiz katman sınırı — kullanıcıya durum anlatırken işe yarıyor. */
  freeTier: string;
};

/** Hızlı ücretsizler önce, cömert ama yavaş olan taşma yedeği olarak sonda. */
const CATALOG: Record<ProviderName, ProviderConfig> = {
  cerebras: {
    baseUrl: "https://api.cerebras.ai/v1",
    envKey: "CEREBRAS_API_KEY",
    envModel: "CEREBRAS_MODEL",
    defaultModel: "gpt-oss-120b",
    freeTier: "1M token/gün",
  },
  groq: {
    baseUrl: "https://api.groq.com/openai/v1",
    envKey: "GROQ_API_KEY",
    envModel: "GROQ_MODEL",
    defaultModel: "llama-3.3-70b-versatile",
    freeTier: "~500K token/gün",
  },
  mistral: {
    baseUrl: "https://api.mistral.ai/v1",
    envKey: "MISTRAL_API_KEY",
    envModel: "MISTRAL_MODEL",
    defaultModel: "mistral-medium-latest",
    freeTier: "1B token/ay (~2 RPM)",
  },
};

const ORDER: ProviderName[] = ["cerebras", "groq", "mistral"];

export type Provider = {
  name: ProviderName;
  model: string;
  freeTier: string;
  stream: (system: string, messages: ChatMessage[]) => AsyncGenerator<string>;
};

/** Kısa sohbet turu: uzun cevap istemiyoruz, bekleme konuşmayı bozuyor. */
const MAX_TOKENS = 400;
const TEMPERATURE = 0.3;
const TIMEOUT_MS = 30_000;

function modelFor(name: ProviderName): string {
  const cfg = CATALOG[name];
  return process.env[cfg.envModel] || cfg.defaultModel;
}

/**
 * OpenAI uyumlu akış — üç sağlayıcı da aynı gövdeyi ve aynı SSE biçimini
 * kullandığı için tek gövde yetiyor.
 */
async function* streamOpenAiCompatible(
  name: ProviderName,
  system: string,
  messages: ChatMessage[],
): AsyncGenerator<string> {
  const cfg = CATALOG[name];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${cfg.baseUrl}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${process.env[cfg.envKey]}`,
        "content-type": "application/json",
        accept: "text/event-stream",
      },
      body: JSON.stringify({
        model: modelFor(name),
        stream: true,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${name} ${res.status}: ${detail.slice(0, 200)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    // Chunk sınırı satırın ortasına düşebilir; son yarım satır beklemede kalır.
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const parsed = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[];
        };
        // Yalnızca `content` alınıyor: gpt-oss-120b bir akıl yürütme modeli ve
        // ayrı bir `reasoning` alanı gönderebiliyor — o kullanıcıya gitmemeli.
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        /* yarım ya da bozuk çerçeve — atla, akış sürsün */
      }
    }
  }
}

function hasKey(name: ProviderName): boolean {
  return Boolean(process.env[CATALOG[name].envKey]);
}

function build(name: ProviderName): Provider {
  return {
    name,
    model: modelFor(name),
    freeTier: CATALOG[name].freeTier,
    stream: (system, messages) => streamOpenAiCompatible(name, system, messages),
  };
}

/**
 * Denenecek sağlayıcılar: birincil önce, kalanlar yedek.
 *
 * `CHAT_PROVIDER` verilmişse o başa alınır; anahtarı yoksa ya da tanınmıyorsa
 * yok sayılır — yanlış yazılmış bir değişken sohbeti tamamen kapatmasın.
 */
export function chatProviders(): Provider[] {
  const available = ORDER.filter(hasKey);
  const preferred = process.env.CHAT_PROVIDER as ProviderName | undefined;
  if (preferred && available.includes(preferred)) {
    return [preferred, ...available.filter((n) => n !== preferred)].map(build);
  }
  return available.map(build);
}

export function chatConfigured(): boolean {
  return chatProviders().length > 0;
}
