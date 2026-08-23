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
  /**
   * Akıl yürütme modelleri için düşünme bütçesi.
   *
   * Ölçülerek eklendi. gpt-oss-120b varsayılan ayarda cevaptan önce uzun bir
   * akıl yürütme üretiyor ve bu jeton bütçesinden düşüyor: max_tokens=120 ile
   * yapılan istek `finish_reason: "length"` ve **boş içerik** dönüyordu, yani
   * koç Cerebras'tan hiçbir zaman cevap alamıyordu.
   *
   *   120 jeton, varsayılan → içerik 0, akıl yürütme 418 karakter
   *   120 jeton, "low"      → içerik 191 karakter ✓
   *   400 jeton, varsayılan → çalışıyor ama 873 karakter boşa gidiyor
   *
   * "low" hem hatayı kapatıyor hem dakikalık jeton limitini koruyor. Yalnızca
   * bu alanı tanıyan sağlayıcıya gönderiliyor: bilinmeyen alan diğerlerinde
   * isteği reddettirebilir.
   */
  reasoningEffort?: string;
  /**
   * Konuşmayı yazıya çeviren uç ve modeli.
   *
   * Yalnızca iki sağlayıcıda var. OpenAI uyumlu biçim aynı: çok parçalı gövde
   * (`file` + `model`), `{baseUrl}/audio/transcriptions` adresi. Diğer üçünde
   * bu uç olmadığı için alan boş kalıyor ve zincir onları atlıyor.
   */
  sttModel?: string;
  sttEnvModel?: string;
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
    sttModel: "voxtral-mini-latest",
    sttEnvModel: "MISTRAL_STT_MODEL",
  },
  groq: {
    // Ölçüm: en hızlısı (~191ms ilk parça) ama 12K token/dk — bir sohbet turu
    // ~1.7K token olduğu için pratikte ~7 istek/dk'ya denk geliyor.
    baseUrl: "https://api.groq.com/openai/v1",
    envKey: "GROQ_API_KEY",
    envModel: "GROQ_MODEL",
    defaultModel: "llama-3.3-70b-versatile",
    freeTier: "12K token/dk · 1000 istek/gün",
    // Ücretsiz katmanı bu iş için fazlasıyla geniş: günde 2.000 istek ve
    // 28.800 saniye ses. Bir yürüyüş turu ~20 saniyelik ses demek.
    sttModel: "whisper-large-v3-turbo",
    sttEnvModel: "GROQ_STT_MODEL",
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
    reasoningEffort: "low",
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

/**
 * Bir çağrının sonucu — muhasebe için.
 *
 * Başarılı ve BAŞARISIZ her deneme bildiriliyor. Zincir düşen sağlayıcıyı
 * sessizce atladığı için, bildirilmeyen bir hata hiç olmamış gibi duruyor:
 * her istekte 429 alan bir birincil dışarıdan "hiç kullanılmıyor" gibi
 * görünüyordu, oysa her seferinde bir gidiş dönüş ve bir kullanıcı gecikmesi
 * harcıyordu.
 *
 * Katman burada db'ye yazmıyor, yalnızca bildiriyor: sağlayıcı dosyası
 * betiklerden de kullanılıyor (roleplay-eval, coach-eval) ve oraya veritabanı
 * bağımlılığı taşımak testleri veritabanına bağlardı.
 */
export type CallReport = (r: {
  provider: ProviderName;
  model: string;
  ok: boolean;
  status: number;
  ms: number;
  error?: string;
  promptTokens?: number;
  completionTokens?: number;
  limits?: Record<string, string>;
}) => void;

export type Provider = {
  name: ProviderName;
  model: string;
  freeTier: string;
  stream: (
    system: string,
    messages: ChatMessage[],
    /** İlk parça gelmeden önce hangi sağlayıcının cevapladığını bildirir. */
    onMeta?: (meta: ProviderMeta) => void,
    report?: CallReport,
  ) => AsyncGenerator<string>;
  /** Akışsız tek atış — koç düzeltmeleri gibi kısa, bölünmesi anlamsız işler. */
  complete: (
    system: string,
    messages: ChatMessage[],
    maxTokens?: number,
    report?: CallReport,
  ) => Promise<string>;
};

/** Kısa sohbet turu: uzun cevap istemiyoruz, bekleme konuşmayı bozuyor. */
const MAX_TOKENS = 400;
const TEMPERATURE = 0.3;
const TIMEOUT_MS = 30_000;

/** 429'da başlık yoksa varsayılan bekleme: dakikalık limitler dakika başı sıfırlanıyor. */
const DEFAULT_COOLDOWN_MS = 60_000;
/** Ağ/5xx hatası limit değil, ama art arda denemek de anlamsız. */
const ERROR_COOLDOWN_MS = 15_000;

/**
 * Limiti dolan sağlayıcının ne zaman tekrar denenebileceği.
 *
 * Soğuma olmadan zincir işe yaramıyor: limiti dolmuş bir birincil her istekte
 * baştan deneniyor, her seferinde bir gidiş-dönüş ve 429 harcanıyor, kullanıcı
 * da o gecikmeyi bekliyor. Soğumayla dolan sağlayıcı sıradan çıkıyor ve süre
 * dolunca kendiliğinden geri geliyor.
 *
 * Bu bellek süreç başına: Vercel'de her örnek kendi tablosunu tutar, yani
 * paylaşımlı bir sayaç değil. Yine de işe yarıyor — art arda gelen istekler
 * çoğunlukla aynı örneğe düşüyor — ve ücretsiz kalmanın bedeli bu.
 */
const cooldownUntil = new Map<ProviderName, number>();

function coolDown(name: ProviderName, ms: number): void {
  cooldownUntil.set(name, Date.now() + ms);
}

/** `Retry-After` saniye ya da HTTP tarihi olabilir; ikisi de destekleniyor. */
function retryAfterMs(res: Response): number {
  const raw = res.headers.get("retry-after");
  if (!raw) return DEFAULT_COOLDOWN_MS;
  const seconds = Number(raw);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, 15 * 60_000);
  const at = Date.parse(raw);
  if (Number.isFinite(at)) return Math.min(Math.max(at - Date.now(), 0), 15 * 60_000);
  return DEFAULT_COOLDOWN_MS;
}

function modelFor(name: ProviderName): string {
  const cfg = CATALOG[name];
  return process.env[cfg.envModel] || cfg.defaultModel;
}

/** İstek gövdesi ve başlıklar akışlı/akışsız iki yolda da aynı. */
async function post(
  name: ProviderName,
  system: string,
  messages: ChatMessage[],
  stream: boolean,
  maxTokens: number,
  report?: CallReport,
): Promise<Response> {
  const cfg = CATALOG[name];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const startedAt = Date.now();

  let res: Response;
  try {
    res = await fetch(`${cfg.baseUrl}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${process.env[cfg.envKey]}`,
        "content-type": "application/json",
        accept: stream ? "text/event-stream" : "application/json",
      },
      body: JSON.stringify({
        model: modelFor(name),
        stream,
        max_tokens: maxTokens,
        temperature: TEMPERATURE,
        ...(cfg.reasoningEffort ? { reasoning_effort: cfg.reasoningEffort } : {}),
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });
  } catch (err) {
    coolDown(name, ERROR_COOLDOWN_MS);
    // Ağ hatası ya da zaman aşımı: HTTP durumu yok, 0 yazılıyor.
    report?.({
      provider: name,
      model: modelFor(name),
      ok: false,
      status: 0,
      ms: Date.now() - startedAt,
      error: (err as Error).message,
    });
    throw err;
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    // 429 ve 5xx geçici: sağlayıcıyı sıradan çıkar. 4xx kalıcı bir yapılandırma
    // hatası (yanlış anahtar, yanlış model) — onu soğutmak sorunu gizlerdi.
    if (res.status === 429) coolDown(name, retryAfterMs(res));
    else if (res.status >= 500) coolDown(name, ERROR_COOLDOWN_MS);
    const detail = await res.text().catch(() => "");
    report?.({
      provider: name,
      model: modelFor(name),
      ok: false,
      status: res.status,
      ms: Date.now() - startedAt,
      error: detail.slice(0, 200),
      limits: readLimits(res),
    });
    throw new Error(`${name} ${res.status}: ${detail.slice(0, 200)}`);
  }
  // Başarı burada bildirilmiyor: jeton sayısı ve kalan hak çağıranda biliniyor
  // (akışta başlıklardan, akışsızda gövdeden). Süre oradan da ölçülebilsin
  // diye başlangıç anı dönülüyor.
  (res as Response & { startedAt?: number }).startedAt = startedAt;
  return res;
}

/**
 * Sağlayıcının cevabında bildirdiği kalan hak.
 *
 * Hepsi `x-ratelimit-…` ailesinden başlık döndürüyor ama adları birebir aynı
 * değil, o yüzden ad listesi yerine örüntü kullanılıyor: adında "ratelimit"
 * geçen her başlık alınıyor. Yeni bir sağlayıcı eklendiğinde ya da mevcut
 * biri başlık adını değiştirdiğinde burada bir şey yapmak gerekmiyor.
 */
export type ProviderMeta = {
  provider: ProviderName;
  model: string;
  /** Ham başlıklar — yorumlamadan, olduğu gibi. */
  limits: Record<string, string>;
};

/**
 * Cevabın bildirdiği kalan hak.
 *
 * Eşleştirici önce yalnızca "ratelimit" içeren başlıklara bakıyordu ve ÖLÇÜM
 * bunun çalışmadığını gösterdi: 30 gerçek turun otuzunda da alan boş `{}`
 * yazılmıştı. Sağlayıcı adı ve model doğru kaydedildiğine göre sorun kayıt
 * yolunda değil, eşleştiricideydi — kullandığımız sağlayıcı hakkını o
 * yazımla bildirmiyor.
 *
 * Sağlayıcılar bu başlıkları standartlaştırmadı: kimi `x-ratelimit-*`, kimi
 * `ratelimitbysize-*`, kimi `x-request-limit-remaining` yazıyor; 429'da ise
 * asıl işe yarayan `retry-after` oluyor. Liste bu yüzden ada değil ANLAMA
 * bakıyor. Yakalanan başlık sayısı azsa gürültü de az; hiçbir şey
 * yakalanmıyorsa alan yine boş kalır ama en azından sebebi "dar desen"
 * olmaz.
 */
const LIMIT_HINTS = ["ratelimit", "rate-limit", "remaining", "quota", "retry-after", "reset"];

export function readLimits(res: { headers: Headers }): Record<string, string> {
  const out: Record<string, string> = {};
  res.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (LIMIT_HINTS.some((hint) => k.includes(hint))) out[k] = value;
  });
  return out;
}

/**
 * OpenAI uyumlu akış — üç sağlayıcı da aynı gövdeyi ve aynı SSE biçimini
 * kullandığı için tek gövde yetiyor.
 */
type StreamFrame = {
  choices?: { delta?: { content?: string } }[];
  error?: { message?: string };
};

/**
 * Tek bir SSE satırını çözer.
 *
 * Ayrıştırma bilerek ayrı bir işlevde: bozuk çerçeveyi atlayan `catch`
 * gövdenin içinde olsaydı, hata çerçevesi için atılan istisnayı da yutardı.
 * Burada `catch` yalnızca `JSON.parse`'ı sarıyor.
 */
function parseFrame(line: string): StreamFrame | null {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:")) return null;
  const payload = trimmed.slice(5).trim();
  if (!payload || payload === "[DONE]") return null;
  try {
    return JSON.parse(payload) as StreamFrame;
  } catch {
    return null; // yarım ya da bozuk çerçeve — akış sürsün
  }
}

async function* streamOpenAiCompatible(
  name: ProviderName,
  system: string,
  messages: ChatMessage[],
  onMeta?: (meta: ProviderMeta) => void,
  report?: CallReport,
): AsyncGenerator<string> {
  const res = await post(name, system, messages, true, MAX_TOKENS, report);
  if (!res.body) throw new Error(`${name}: gövdesiz yanıt`);
  const limits = readLimits(res);
  onMeta?.({ provider: name, model: modelFor(name), limits });
  // Akışta jeton sayısı gelmiyor (son parçada isteyen sağlayıcılar var ama
  // istek gövdesine bilinmeyen alan eklemek katı sağlayıcılarda 400 üretiyor).
  // Ölçülen şey BAŞLIKLARA kadar geçen süre — kullanıcının beklediği gecikme
  // de tam olarak o.
  report?.({
    provider: name,
    model: modelFor(name),
    ok: true,
    status: res.status,
    ms: Date.now() - ((res as Response & { startedAt?: number }).startedAt ?? Date.now()),
    limits,
  });

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
      const frame = parseFrame(line);
      if (!frame) continue;
      // Kapasite hatası her zaman HTTP durumuyla gelmiyor: bazı sağlayıcılar
      // 200 döndürüp hatayı akışın içine koyuyor. Yakalamazsak akış sessizce
      // boş biter ve yedek sağlayıcıya hiç geçilmez.
      if (frame.error) {
        coolDown(name, ERROR_COOLDOWN_MS);
        throw new Error(`${name}: ${frame.error.message ?? "akış içi hata"}`);
      }
      // Yalnızca `content` alınıyor: gpt-oss-120b bir akıl yürütme modeli ve
      // ayrı bir `reasoning` alanı gönderebiliyor — o kullanıcıya gitmemeli.
      const delta = frame.choices?.[0]?.delta?.content;
      if (delta) yield delta;
    }
  }
}

/** Akışsız tek atış: kısa ve bütün olarak anlamlı cevaplar için. */
async function completeOpenAiCompatible(
  name: ProviderName,
  system: string,
  messages: ChatMessage[],
  maxTokens: number,
  report?: CallReport,
): Promise<string> {
  const res = await post(name, system, messages, false, maxTokens, report);
  const startedAt = (res as Response & { startedAt?: number }).startedAt ?? Date.now();
  const limits = readLimits(res);
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string };
    // Akışsız yolda jeton sayısı gövdede geliyor — maliyetin tek gerçek ölçüsü.
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };

  const fail = (message: string) => {
    report?.({
      provider: name,
      model: modelFor(name),
      ok: false,
      status: res.status,
      ms: Date.now() - startedAt,
      error: message,
      limits,
    });
    return new Error(`${name}: ${message}`);
  };

  if (data.error) {
    coolDown(name, ERROR_COOLDOWN_MS);
    throw fail(data.error.message ?? "yanıt içi hata");
  }
  const text = data.choices?.[0]?.message?.content?.trim();
  // 200 dönüp boş içerik vermek de bir başarısızlık: akıl yürütme modellerinde
  // jeton bütçesi cevaba yer bırakmadığında tam olarak bu oluyordu.
  if (!text) throw fail("boş yanıt");

  report?.({
    provider: name,
    model: modelFor(name),
    ok: true,
    status: res.status,
    ms: Date.now() - startedAt,
    promptTokens: data.usage?.prompt_tokens,
    completionTokens: data.usage?.completion_tokens,
    limits,
  });
  return text;
}

function hasKey(name: ProviderName): boolean {
  return Boolean(process.env[CATALOG[name].envKey]);
}

function build(name: ProviderName): Provider {
  return {
    name,
    model: modelFor(name),
    freeTier: CATALOG[name].freeTier,
    stream: (system, messages, onMeta, report) =>
      streamOpenAiCompatible(name, system, messages, onMeta, report),
    complete: (system, messages, maxTokens = MAX_TOKENS, report) =>
      completeOpenAiCompatible(name, system, messages, maxTokens, report),
  };
}

/**
 * Denenecek sağlayıcılar: birincil önce, kalanlar yedek.
 *
 * Soğumadaki sağlayıcılar sıranın sonuna atılır, listeden çıkarılmaz. Çıkarmak
 * şu riski taşırdı: hepsi aynı anda soğumadaysa sohbet tamamen kapanırdı.
 * Sona atmak ise "önce taze olanı dene, gerekirse yine de dolmuşu dene"
 * demek — soğuma tahmini yanlışsa bile en kötü ihtimalle bir 429 harcanır.
 *
 * `CHAT_PROVIDER` verilmişse o başa alınır; anahtarı yoksa ya da tanınmıyorsa
 * yok sayılır — yanlış yazılmış bir değişken sohbeti tamamen kapatmasın.
 */
export function chatProviders(): Provider[] {
  const available = ORDER.filter(hasKey);
  const preferred = process.env.CHAT_PROVIDER as ProviderName | undefined;
  const ordered =
    preferred && available.includes(preferred)
      ? [preferred, ...available.filter((n) => n !== preferred)]
      : available;

  const now = Date.now();
  const ready = ordered.filter((n) => (cooldownUntil.get(n) ?? 0) <= now);
  const cooling = ordered.filter((n) => (cooldownUntil.get(n) ?? 0) > now);
  return [...ready, ...cooling].map(build);
}

export function chatConfigured(): boolean {
  return chatProviders().length > 0;
}

export type SttProvider = { name: ProviderName; baseUrl: string; key: string; model: string };

/**
 * Konuşmayı yazıya çevirebilen sağlayıcılar, sırayla.
 *
 * Sohbet zinciriyle aynı mantık ama ayrı bir liste: her sağlayıcının bu ucu
 * yok ve olanların sırası da farklı olmalı. Groq önde, çünkü ücretsiz katmanı
 * bu iş için ölçüsüz geniş (günde 2.000 istek · 28.800 saniye ses) ve gecikme
 * burada her şeyden önemli — kullanıcı cevabını söyledikten sonra beklediği
 * her saniye yürüyüşün ritmini bozuyor.
 */
export function sttProviders(): SttProvider[] {
  const order: ProviderName[] = ["groq", "mistral"];
  const out: SttProvider[] = [];
  for (const name of order) {
    const cfg = CATALOG[name];
    const key = process.env[cfg.envKey];
    if (!key || !cfg.sttModel) continue;
    out.push({
      name,
      baseUrl: cfg.baseUrl,
      key,
      model: (cfg.sttEnvModel && process.env[cfg.sttEnvModel]) || cfg.sttModel,
    });
  }
  return out;
}

export function sttConfigured(): boolean {
  return sttProviders().length > 0;
}

/**
 * Zincirdeki ilk çalışan sağlayıcıdan akışsız cevap.
 *
 * Sohbetteki akış döngüsünün karşılığı: sırayla denenir, düşen atlanır, hepsi
 * düşerse hata. Akışta "ilk parçadan sonra sağlayıcı değiştirme" kuralı vardı;
 * burada öyle bir kısıt yok — cevap bütün hâlinde geldiği için son ana kadar
 * yedeğe geçilebiliyor.
 */
export async function completeChat(
  system: string,
  messages: ChatMessage[],
  maxTokens?: number,
  report?: CallReport,
): Promise<string> {
  const providers = chatProviders();
  if (!providers.length) throw new Error("Sohbet sağlayıcısı tanımlı değil");

  const failures: string[] = [];
  for (const provider of providers) {
    try {
      return await provider.complete(system, messages, maxTokens, report);
    } catch (err) {
      failures.push(`${provider.name}: ${(err as Error).message}`);
    }
  }
  throw new Error(`Tüm sağlayıcılar başarısız — ${failures.join(" | ")}`);
}
