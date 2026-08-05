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
 * Sıra **dakikadaki istek hakkına** göre kuruluyor, günlük token hakkına
 * göre değil. Ölçüm bunu tersine çevirdi: sohbette darboğaz token değil,
 * eşzamanlı istek. Cerebras günde 1M token veriyor ama dakikada yalnızca
 * 5 istek — iki kişi aynı anda yazışırsa hemen 429 geliyor. Bu yüzden en
 * cömert görünen sağlayıcı birincil değil.
 *
 * Limitler ve gecikmeler `npm run test:chat` ile ölçüldü (yanıt başlıkları
 * + 8 turluk A2 senaryosu, bkz. scripts/chat-eval.ts).
 *
 * NVIDIA NIM denendi ve elendi: ilan edilen 40 istek/dk kâğıt üzerinde kalıyor,
 * çünkü ücretsiz katman paylaşımlı bir işçi havuzunda kuyruğa giriyor. Ölçümde
 * ilk bayt tutarlı biçimde 25-29 saniye sürdü ve çoğu istek
 * "Worker local total request limit reached" ile döndü — sohbet için kullanılamaz.
 *
 * Anahtarı olmayan sağlayıcı listeye hiç girmez; birini kullanmak için tek
 * yapılacak şey anahtarını tanımlamak. Zincir uzadıkça toplam dakikalık
 * kapasite toplanır — 20 kullanıcı hedefi tek sağlayıcıyla tutmuyor.
 */

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ProviderName =
  | "mistral"
  | "groq"
  | "cerebras"
  | "gemini"
  | "openrouter";

type ProviderConfig = {
  baseUrl: string;
  envKey: string;
  envModel: string;
  defaultModel: string;
  /** Ücretsiz katman sınırı — kullanıcıya durum anlatırken işe yarıyor. */
  freeTier: string;
};

const CATALOG: Record<ProviderName, ProviderConfig> = {
  mistral: {
    // Ölçüm: 50 istek/dk, 25K token/dk, ayda 1 milyar token. Dakikalık hak
    // bakımından en genişi, o yüzden birincil. 3/3 hatayı yakaladı.
    baseUrl: "https://api.mistral.ai/v1",
    envKey: "MISTRAL_API_KEY",
    envModel: "MISTRAL_MODEL",
    defaultModel: "mistral-medium-latest",
    freeTier: "50 istek/dk · 1B token/ay",
  },
  groq: {
    // Ölçüm: en hızlısı (~191ms ilk parça) ama 12K token/dk — bir sohbet turu
    // ~1.7K token olduğu için pratikte ~7 istek/dk'ya denk geliyor.
    baseUrl: "https://api.groq.com/openai/v1",
    envKey: "GROQ_API_KEY",
    envModel: "GROQ_MODEL",
    defaultModel: "llama-3.3-70b-versatile",
    freeTier: "12K token/dk · 1000 istek/gün",
  },
  cerebras: {
    // Ölçüm: kalite ve hız iyi, ama dakikada 5 istek. Günlük 1M token bu
    // tavanın arkasında erişilemez kalıyor; zincirde ancak taze dakika
    // yakalayan bir yedek olarak anlamlı.
    baseUrl: "https://api.cerebras.ai/v1",
    envKey: "CEREBRAS_API_KEY",
    envModel: "CEREBRAS_MODEL",
    defaultModel: "gpt-oss-120b",
    freeTier: "5 istek/dk · 1M token/gün",
  },
  gemini: {
    // Google'ın OpenAI uyumlu ucu — katalogda özel dal gerekmiyor.
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
    envKey: "GEMINI_API_KEY",
    envModel: "GEMINI_MODEL",
    defaultModel: "gemini-2.0-flash",
    freeTier: "istek/gün tabanlı (token değil)",
  },
  openrouter: {
    // Toplayıcı. Ücretsiz katmanı günde 50 istekle sınırlı olduğu için zincirin
    // en sonunda: ancak diğer dördü aynı anda tükendiğinde işe yarar.
    baseUrl: "https://openrouter.ai/api/v1",
    envKey: "OPENROUTER_API_KEY",
    envModel: "OPENROUTER_MODEL",
    defaultModel: "google/gemma-4-31b-it:free",
    freeTier: "50 istek/gün",
  },
};

/** Dakikalık hakkı geniş olanlar önce, günlük kotayla sınırlı olan en sonda. */
const ORDER: ProviderName[] = ["mistral", "groq", "cerebras", "gemini", "openrouter"];

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
          error?: { message?: string };
        };
        // Kapasite hatası her zaman HTTP durumuyla gelmiyor: bazı sağlayıcılar
        // 200 döndürüp hatayı akışın içine koyuyor. Yakalamazsak akış sessizce
        // boş biter ve yedek sağlayıcıya hiç geçilmez.
        if (parsed.error) {
          throw new Error(`${name}: ${parsed.error.message ?? "akış içi hata"}`);
        }
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
