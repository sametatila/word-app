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
 * SIRA (2026-09-30, Samet): Cloudflare Workers AI (Gemma 4 26B) birincil, Groq
 * (gpt-oss-120b) yedek. Mistral ücretsiz API'sini kaldırdı (canlıda 2026-09-04'ten
 * beri her çağrı 429), Cerebras kartsız ücretsiz katmanı kaldırdı; ikisi de
 * katalogdan, env'den ve alıcılar tablosundan kalıcı olarak çıktı. Kalite ve
 * jeton ölçümü: `npm run test:chat` ve `npm run test:assess` (Gemma 4 ile
 * gpt-oss-120b aynı ölçütleri geçiyor; maliyet docs/premium/README.md §2.4).
 *
 * Anahtarı olmayan sağlayıcı listeye hiç girmez. Birincil 429 ya da 5xx
 * verince soğumaya girer ve istek yedeğe düşer.
 *
 * KATALOĞA SAĞLAYICI EKLEMEK ENV İŞİ DEĞİL, BEYAN İŞİ. Buraya giren her
 * sağlayıcı, kullanıcının yazdığı ve söylediği metni alan bir ALICIDIR ve
 * gizlilik politikasının alıcılar tablosunda (`lib/legal.ts` PROCESSORS) adıyla
 * yazılı olmak zorunda; Play Veri Güvenliği beyanı da (`docs/play/data-safety.md`)
 * aynı listeyi sayıyor. Üçü birlikte değişir.
 *
 * Google Gemini ve OpenRouter tam olarak bu yüzden ÇIKARILDI (2026-09-09):
 * katalogda duruyorlardı, anahtarları hiçbir env dosyasında yoktu, ama alıcılar
 * tablosunda alıcı olarak sayılıyorlardı. Fazla beyan ihlal değil ama tablo
 * gerçeği anlatmıyordu; ikisi de kullanılmayacak (sahibin kararı). Katalogda
 * bırakmak, bir gün `GEMINI_API_KEY` tanımlanınca beyanın kendiliğinden
 * doğrulanacağı anlamına gelirdi — yani yanlışın hangi yönde olduğu şansa
 * kalırdı.
 */

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ProviderName = "cloudflare" | "groq";

type ProviderConfig = {
  /** Sabit adres ya da env'den kurulan adres (hesap/kaynak kimliği adreste). Boş dönerse sağlayıcı kapalı. */
  baseUrl: string | (() => string);
  envKey: string;
  envModel: string;
  defaultModel: string;
  /** Ücretsiz katman sınırı — kullanıcıya durum anlatırken işe yarıyor. */
  freeTier: string;
  /**
   * Konuşmayı yazıya çeviren uç ve modeli.
   *
   * Yalnız Groq'ta dolu: ses zincirindeki tek OpenAI biçimli sağlayıcı
   * (`{baseUrl}/audio/transcriptions`).
   */
  sttModel?: string;
  sttEnvModel?: string;
};

const CATALOG: Record<ProviderName, ProviderConfig> = {
  cloudflare: {
    // Workers AI: günde 10.000 neuron ücretsiz, sonrası $0.011/1K neuron
    // (Workers Paid). Girdiyle eğitim ve saklama yok. Model başına dakikada
    // 300 istek. Adres hesap kimliğini taşıyor.
    baseUrl: () => {
      const acc = process.env.CLOUDFLARE_ACCOUNT_ID;
      return acc ? `https://api.cloudflare.com/client/v4/accounts/${acc}/ai/v1` : "";
    },
    envKey: "CLOUDFLARE_AI_TOKEN",
    envModel: "CLOUDFLARE_AI_MODEL",
    defaultModel: "@cf/google/gemma-4-26b-a4b-it",
    freeTier: "10K neuron/gün",
  },
  groq: {
    // En hızlısı. Ücretsiz katmanda 8K token/dk ve 200K token/gün: yedek
    // olarak yeter, birincil olarak yetmez. Sıfır veri saklama açık.
    baseUrl: "https://api.groq.com/openai/v1",
    envKey: "GROQ_API_KEY",
    envModel: "GROQ_MODEL",
    // 2026-08: `llama-3.3-70b-versatile` Groq'tan kaldırıldı (404 "model does
    // not exist") ve zincirdeki yedek sessizce ölmüştü. gpt-oss-120b akıl
    // yürütme modeli; düşünme bütçesi `modelOptions`ta kısılıyor.
    defaultModel: "openai/gpt-oss-120b",
    freeTier: "8K token/dk · 200K token/gün",
    // Ücretsiz katmanı bu iş için fazlasıyla geniş: günde 2.000 istek ve
    // 28.800 saniye ses. Bir yürüyüş turu ~20 saniyelik ses demek.
    sttModel: "whisper-large-v3-turbo",
    sttEnvModel: "GROQ_STT_MODEL",
  },
};

/**
 * MODELE ÖZGÜ İSTEK AYARLARI — sağlayıcıya değil modele bağlı (2026-09-29).
 *
 * Aynı model farklı sağlayıcıda aynı ayarı istiyor, farklı model aynı
 * sağlayıcıda farklısını. Ölçülen:
 *   gpt-oss      düşünme bütçesi "low". Varsayılanda cevaptan önce uzun bir
 *                akıl yürütme üretiyor: max_tokens=120 ile içerik 0,
 *                "low" ile 191 karakter.
 *   gemma-4, qwen3  varsayılan olarak önce düşünüyor ve bütçeyi bitiriyor;
 *                `chat_template_kwargs.enable_thinking=false` kapatıyor
 *                (`reasoning_effort` Cloudflare'de etkisiz).
 * Tanınmayan model sade gövdeyle gider.
 */
function modelOptions(model: string, maxTokens: number): Record<string, unknown> {
  if (/gpt-oss/.test(model)) return { max_tokens: maxTokens, reasoning_effort: "low" };
  if (/gemma-4|qwen3/.test(model)) return { max_tokens: maxTokens, chat_template_kwargs: { enable_thinking: false } };
  return { max_tokens: maxTokens };
}

function baseUrlOf(name: ProviderName): string {
  const b = CATALOG[name].baseUrl;
  return typeof b === "function" ? b() : b;
}

/** Birincil önce; yedek yalnız birincil soğumadayken ya da hata verince. */
const ORDER: ProviderName[] = ["cloudflare", "groq"];

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
 * betiklerden de kullanılıyor (chat-eval, coach-eval) ve oraya veritabanı
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
 * Bu bellek süreç başına: aktif renkte üç Node örneği çalışıyor ve her biri
 * kendi tablosunu tutuyor, yani paylaşımlı bir sayaç değil. Yine de işe
 * yarıyor — art arda gelen istekler çoğunlukla aynı örneğe düşüyor — ve
 * paylaşımlı bir sayaç (Redis) kurmamanın bedeli bu.
 */
const cooldownUntil = new Map<ProviderName, number>();

/**
 * ART ARDA 429 → KATLANAN SOĞUMA.
 *
 * Sabit 60 saniyelik soğuma yalnız YOĞUN trafikte işe yarıyordu. Seyrek
 * çağrıda (günde birkaç değerlendirme) her istek soğuma bittikten sonra
 * geliyor ve kalıcı olarak kapalı bir sağlayıcıyı YENİDEN deniyordu: eski
 * birincilin dakikalık hakkı 0'a düştüğünde (başlık `x-ratelimit-limit-req-minute: 0`)
 * 13 gün boyunca 51 değerlendirmenin 51'i önce ondan 429 yedi
 * (2026-09-04 → 17). Art arda her 429 soğumayı ikiye katlıyor (en çok 6 saat);
 * sağlayıcı "hakkın sıfır" diyorsa doğrudan 6 saat. İlk başarı sayacı sıfırlıyor.
 */
const MAX_COOLDOWN_MS = 6 * 3_600_000;
const strikes = new Map<ProviderName, number>();

function coolDown(name: ProviderName, ms: number): void {
  cooldownUntil.set(name, Date.now() + ms);
}

export function rateLimited(name: ProviderName, res: Response): void {
  const n = (strikes.get(name) ?? 0) + 1;
  strikes.set(name, n);
  const zeroQuota = res.headers.get("x-ratelimit-limit-req-minute") === "0";
  const ms = zeroQuota ? MAX_COOLDOWN_MS : Math.min(retryAfterMs(res) * 2 ** (n - 1), MAX_COOLDOWN_MS);
  coolDown(name, ms);
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
    const key = process.env[cfg.envKey] ?? "";
    res = await fetch(`${baseUrlOf(name)}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
        accept: stream ? "text/event-stream" : "application/json",
      },
      body: JSON.stringify({
        model: modelFor(name),
        stream,
        /* Akışta jeton sayısı son parçada gelsin (muhasebe: ai_usage). Zincirdeki
           iki sağlayıcı da destekliyor (2026-10-01 ölçüldü); eskiden katı bir
           sağlayıcı bilinmeyen alana 400 verdiği için gönderilmiyordu ve akışlı
           sohbetin maliyeti hiç kaydedilmiyordu. */
        ...(stream ? { stream_options: { include_usage: true } } : {}),
        temperature: TEMPERATURE,
        ...modelOptions(modelFor(name), maxTokens),
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
    if (res.status === 429) rateLimited(name, res);
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
  strikes.delete(name);
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
type FrameUsage = { prompt_tokens?: number; completion_tokens?: number };
type StreamFrame = {
  choices?: { delta?: { content?: string } }[];
  error?: { message?: string };
  /** `stream_options.include_usage`: Cloudflare her parçada (sonuncusu dolu), Groq son parçada. */
  usage?: FrameUsage | null;
  /** Groq bitiş parçasında ayrıca burada veriyor. */
  x_groq?: { usage?: FrameUsage };
};

/**
 * Akıştaki kullanım bilgisi — son DOLU değer kazanıyor. Cloudflare ara
 * parçalarda 0 gönderiyor, gerçek sayı son parçada; Groq bitişte `x_groq.usage`
 * ve ardından boş `choices`li ayrı bir `usage` parçası gönderiyor (ölçüldü,
 * 2026-10-01). Saf işlev: `test:chat-usage`.
 */
export function usageFromFrame(frame: StreamFrame, prev: { prompt: number; completion: number } | null): { prompt: number; completion: number } | null {
  const u = frame.usage ?? frame.x_groq?.usage;
  const prompt = Number(u?.prompt_tokens ?? 0);
  const completion = Number(u?.completion_tokens ?? 0);
  /* Giriş jetonu 0 olan parça kabul edilmiyor: Cloudflare ara parçalarda
     kısmi sayı (ör. 0 giriş, 1 çıkış) gönderiyor; akış yarıda kesilirse bu
     "0 giriş" diye yazılırdı. Bilinmeyen sayı boş kalır, yanlış yazılmaz. */
  return prompt > 0 ? { prompt, completion } : prev;
}

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
  /*
    MUHASEBE AKIŞ BİTİNCE: jeton sayısı son parçada geliyor (`stream_options`).
    Satır `finally`de bir kez yazılıyor: akış tamamlanınca da, kullanıcı
    kopunca da (üreteç erken kapanır) ve akış içi hatada da. Gecikme yine
    BAŞLIKLARA kadar geçen süre: kullanıcının beklediği an o. Akış içi hata
    artık başarısız çağrı sayılıyor; eskiden başlık anında "başarılı" yazılıp
    sonra hata atılıyordu. Kullanıcı cevap bitmeden ayrılırsa giriş jetonu
    doğru, çıkış jetonu o ana kadar görülen (alt sınır) yazılıyor.
  */
  const ms = Date.now() - ((res as Response & { startedAt?: number }).startedAt ?? Date.now());
  let usage: { prompt: number; completion: number } | null = null;
  let streamError: string | null = null;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
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
          streamError = frame.error.message ?? "akış içi hata";
          throw new Error(`${name}: ${streamError}`);
        }
        usage = usageFromFrame(frame, usage);
        // Yalnızca `content` alınıyor: gpt-oss-120b bir akıl yürütme modeli ve
        // ayrı bir `reasoning` alanı gönderebiliyor — o kullanıcıya gitmemeli.
        const delta = frame.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      }
    }
    // Son satır "\n" ile bitmediyse tamponda kalır; kullanım parçası o olabilir.
    const tail = parseFrame(buffer);
    if (tail) usage = usageFromFrame(tail, usage);
  } finally {
    report?.({
      provider: name,
      model: modelFor(name),
      ok: streamError === null,
      status: res.status,
      ms,
      ...(streamError ? { error: streamError.slice(0, 300) } : {}),
      ...(usage ? { promptTokens: usage.prompt, completionTokens: usage.completion } : {}),
      limits,
    });
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
  return Boolean(process.env[CATALOG[name].envKey]) && Boolean(baseUrlOf(name));
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
 *
 * `rotate`: yeniden üretimde başka modelden başlamak için (`streamSystem`, QA F-0002). YALNIZ hazır
 * sağlayıcılar arasında döner; soğumadaki sonda kalır. Eskiden döndürme çağıranda bütün listeye
 * uygulanıyordu ve günlük kotası dolup soğumaya alınan Groq her yeniden denemede başa geliyordu:
 * 24 saatte 73 Groq çağrısının 50'si 429 (2026-10-10, Telegram `budget:groq-rejected`).
 */
export function chatProviders(rotate = 0, now = Date.now()): Provider[] {
  const ordered = chatChainNames();
  const ready = ordered.filter((n) => (cooldownUntil.get(n) ?? 0) <= now);
  const cooling = ordered.filter((n) => (cooldownUntil.get(n) ?? 0) > now);
  const k = ready.length ? rotate % ready.length : 0;
  return [...ready.slice(k), ...ready.slice(0, k), ...cooling].map(build);
}

/** Yapılandırılmış zincir, soğumadan bağımsız sırayla (`CHAT_PROVIDER` başa alınmış). */
function chatChainNames(): ProviderName[] {
  const available = ORDER.filter(hasKey);
  const preferred = process.env.CHAT_PROVIDER as ProviderName | undefined;
  return preferred && available.includes(preferred)
    ? [preferred, ...available.filter((n) => n !== preferred)]
    : available;
}

/**
 * Bugünkü sohbet zinciri: ad ve model, kararlı sırayla. İzleme (uyarı motoru,
 * panel) bunu okuyor, `ai_usage`deki geçmişi değil: zincirden çıkan bir
 * sağlayıcının eski hataları "fiilen kapalı" uyarısı üretmesin (2026-09-30,
 * Mistral/Cerebras çıktıktan sonra 24 saat boyunca uyarı gelmişti).
 */
export function chatChain(): { name: ProviderName; model: string }[] {
  return chatChainNames().map((name) => ({ name, model: modelFor(name) }));
}

/** `avoid` adlı sağlayıcıyı sona atar; öteki sıra korunur (bkz. `completeChat`). */
export function avoidLast<T extends { name: ProviderName }>(providers: T[], avoid?: ProviderName): T[] {
  if (!avoid) return providers;
  return [...providers.filter((p) => p.name !== avoid), ...providers.filter((p) => p.name === avoid)];
}

export function chatConfigured(): boolean {
  return chatProviders().length > 0;
}

/**
 * Yazıya çevirme sağlayıcısı.
 *
 * `dialect` gerekiyor çünkü hepsi OpenAI biçimini konuşmuyor: Deepgram
 * parametreleri adreste, sesi ham gövdede istiyor ve cevabı başka bir yapıda
 * dönüyor. Sohbet tarafında böyle bir ayrım yok, orada ikisi de aynı biçimi
 * konuşuyor.
 */
export type SttProvider = {
  name: string;
  dialect: "openai" | "deepgram" | "azure" | "workers-ai";
  baseUrl: string;
  key: string;
  model: string;
};

/**
 * Konuşmayı yazıya çeviren sağlayıcılar, sırayla — YALNIZ ekran kapalı yürüyüş.
 *
 * SUNUCUYA SES YALNIZ EKRAN KAPALIYKEN GELİYOR (Samet, 2026-09-27). Ekran
 * açıkken her yüzey cihazın ya da tarayıcının kendi tanıyıcısını kullanıyor:
 * mobilde native tanıyıcı, web'de Web Speech API; tanıyıcısı olmayan tarayıcıda
 * özellik açılmıyor, sunucuya ses yedeği yok. Eskiden web'in telaffuz puanı,
 * deneme sınavı konuşması ve tanıyıcısız tarayıcıdaki yürüyüş sesi buraya
 * geliyordu ("default" kip, Groq önde); o kip kaldırıldı.
 *
 * Sıra sabit: Azure → Deepgram → Cloudflare Workers AI → Groq.
 *   1. Azure kısa ses (F0, ayda 5 saat): mobil modülün 16 kHz mono WAV'ını
 *      doğrudan alıyor; öncelikli sağlayıcı. Aylık tavanı dolarsa o ay atlanıyor
 *      (bkz. lib/stt `azureBudgetOk`).
 *   2. Deepgram: başı kesik seste uydurmuyor, boş dönüyor (ölçüldü) — güvenli yedek.
 *      Kredisi 200 $ başlangıç kredisi; bitince 402 dönüyor ve bir saat atlanıyor.
 *   3. Cloudflare Workers AI, Whisper large v3 turbo (2026-10-05, Samet: "Deepgram
 *      bitince otomatik Workers AI"). Dakikası 0,0005 $, istek tabanı yok, VAD
 *      süzgeci açık. 2026-09-27'de ses zincirinden çıkarılmıştı; dönüşüyle alıcılar
 *      tablosu, ses rızası (sürüm 4) ve gizlilik §4 birlikte değişti (hukuk 1.10.0).
 *      Ölçüm `npm run test:stt-quality`.
 *   4. Groq Whisper: son yedek; Zero Data Retention açık (2026-09-27).
 * Speechmatics ses zincirinden kalıcı olarak çıktı (2026-09-27).
 *
 * STT_ORDER="deepgram,azure" gibi bir liste bu üçünün sırasını ezer ve
 * listede olmayanı dışarıda bırakır (bir hattı geçici olarak denemek ya da
 * kaldırmak için); listede olmayan bir sağlayıcıyı ekleyemez.
 */
/** Workers AI'daki konuşma tanıma modeli (fiyatı `ai-budget-limits` CLOUDFLARE.sttNeuronsPerMinute). */
export const CLOUDFLARE_STT_MODEL = "@cf/openai/whisper-large-v3-turbo";

export function sttProviders(): SttProvider[] {
  const out: SttProvider[] = [];
  const azKey = process.env.AZURE_SPEECH_KEY;
  const azRegion = process.env.AZURE_SPEECH_REGION;
  if (azKey && azRegion) {
    out.push({ name: "azure", dialect: "azure", baseUrl: `https://${azRegion}.stt.speech.microsoft.com`, key: azKey, model: "short-audio" });
  }
  const dgKey = process.env.DEEPGRAM_API_KEY;
  if (dgKey) {
    out.push({ name: "deepgram", dialect: "deepgram", baseUrl: "https://api.deepgram.com/v1/listen", key: dgKey, model: process.env.DEEPGRAM_STT_MODEL || "nova-3" });
  }
  /* Deepgram'ın yedeği: kredisi bitince (402) ya da düşünce ses buraya geliyor (bkz. lib/stt `deepgramResting`). */
  const cfAccount = process.env.CLOUDFLARE_ACCOUNT_ID;
  const cfToken = process.env[CATALOG.cloudflare.envKey];
  if (cfAccount && cfToken) {
    out.push({ name: "cloudflare", dialect: "workers-ai", baseUrl: `https://api.cloudflare.com/client/v4/accounts/${cfAccount}`, key: cfToken, model: CLOUDFLARE_STT_MODEL });
  }
  const groq = process.env[CATALOG.groq.envKey];
  if (groq && CATALOG.groq.sttModel) {
    out.push({ name: "groq", dialect: "openai", baseUrl: baseUrlOf("groq"), key: groq, model: (CATALOG.groq.sttEnvModel && process.env[CATALOG.groq.sttEnvModel]) || CATALOG.groq.sttModel });
  }
  const order = (process.env.STT_ORDER ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (order.length) {
    const picked = order.map((n) => out.find((p) => p.name === n)).filter((p): p is SttProvider => Boolean(p));
    if (picked.length) return picked;
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
  /**
   * Bu sağlayıcı sıranın SONUNA atılır (listeden çıkarılmaz; tek sağlayıcı
   * varsa yine o denenir). Kullanım: sağlayıcı 200 döndü ama çıktısı
   * okunamadı, ikinci deneme öteki modelden gelsin (QA F-0061,
   * `lib/assess` `retryProvider`).
   */
  avoid?: ProviderName,
): Promise<string> {
  const providers = avoidLast(chatProviders(), avoid);
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
