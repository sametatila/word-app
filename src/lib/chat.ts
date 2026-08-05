import "server-only";
import { and, asc, desc, eq, gt, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, userWords, words } from "@/lib/db/schema";
import { ensureProfile } from "@/lib/session";

/**
 * Sohbet ortağı — GitHub Models üzerinden.
 *
 * Sağlayıcı EğitimKit'in satış danışmanı botuyla aynı: GitHub Models
 * çıkarım uçları (OpenAI uyumlu, SSE akışı) ve Llama-3.3-70B-Instruct.
 * Ücretsiz katmanda çalışır — konuşma alıştırmalarında "açık uçlu muhatap
 * için dil modeli gerekir ve o paralı" dediğim sınır bu sayede kalkıyor.
 *
 * Anahtar koda gömülmez. Bu depo GitHub'a push ediliyor ve GitHub kendi
 * token biçimini tarayıp bulduğu anda iptal ediyor; gömülen anahtar hem
 * burada hem EğitimKit'te birkaç dakika içinde ölürdü. `.env` zaten
 * .gitignore'da, Vercel'e taşımak da tek satır.
 */

const ENDPOINT = "https://models.github.ai/inference/chat/completions";
const MODEL = process.env.GITHUB_MODELS_MODEL || "Llama-3.3-70B-Instruct";
/** İlk chunk'a kadar beklenecek süre; ağ takılırsa kullanıcı sonsuza kadar beklemesin. */
const TIMEOUT_MS = 30_000;

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Sohbetin hangi seviyede ve hangi kelimelerle yürüyeceği. */
export type ChatContext = {
  level: string;
  course: string;
  /** Öğrencinin şu sıralar çalıştığı kelimeler — konuşmaya bunlar dokunur. */
  focus: { de: string; tr: string }[];
};

export function chatConfigured(): boolean {
  return Boolean(process.env.GITHUB_MODELS_API_KEY);
}

/**
 * Konuşmanın zeminini kurar: seviye, kurs ve öğrencinin o an çalıştığı kelimeler.
 *
 * Kelimeleri sohbete taşımak bu botu genel bir sohbet modelinden ayıran şey —
 * uygulamanın tekrar kuyruğunda ne varsa konuşma da onun etrafında dönüyor,
 * yani sohbet SRS'in üstüne biniyor, ondan kopmuyor.
 */
export async function buildChatContext(userId: string): Promise<ChatContext> {
  const profile = await ensureProfile(userId);
  const now = new Date();

  const rows = await db
    .select({ de: words.de, tr: words.tr, artikel: words.artikel })
    .from(userWords)
    .innerJoin(words, eq(words.id, userWords.wordId))
    .where(and(eq(userWords.userId, userId), eq(words.course, profile.course)))
    // Önce tekrarı gelenler, sonra en son çalışılanlar: sohbet güncel
    // kuyruğu yansıtsın, aylar önce pekişmiş kelimeleri değil.
    .orderBy(
      sql`case when ${userWords.dueAt} <= ${now} then 0 else 1 end`,
      desc(userWords.lastReviewedAt),
    )
    .limit(18);

  return {
    level: profile.level,
    course: profile.course,
    focus: rows.map((r) => ({
      de: r.artikel ? `${r.artikel} ${r.de}` : r.de,
      tr: r.tr,
    })),
  };
}

/**
 * Sistem istemi.
 *
 * Kurallar bilerek az ve kesin: uzun kural listeleri küçük modellerde
 * birbirini eziyor. Asıl iki şey söyleniyor — seviyeye göre konuş ve
 * hatayı düzeltirken konuşmayı kesme.
 */
export function systemPrompt(ctx: ChatContext): string {
  const dialect =
    ctx.course === "gsw-zh"
      ? "Zürih Almancası (Züritüütsch) konuşuyorsun; Hochdeutsch karşılığını parantezle verebilirsin."
      : "Standart Almanca (Hochdeutsch) konuşuyorsun.";

  const focus = ctx.focus.length
    ? ctx.focus.map((w) => `${w.de} (${w.tr})`).join(", ")
    : "(henüz kelime çalışılmamış)";

  return `Sen bir Almanca konuşma partnerisin. Öğrencinin ana dili Türkçe, seviyesi ${ctx.level}. ${dialect}

NASIL KONUŞURSUN
- Almanca konuş ve ${ctx.level} seviyesinde kal: bu seviyenin üstünde yapı ve kelime kullanma.
- Kısa konuş: en fazla 3 cümle. Sonunda bir soru sorarak konuşmayı sürdür.
- Öğrenci Türkçe yazarsa ya da tıkanırsa, kısa bir Türkçe açıklama ver, sonra Almancaya dön.

HATA DÜZELTME
- Anlamı bozan ya da seviyesinin altında kalan hataları düzelt; küçük üslup farklarını bırak.
- Düzeltmeyi tek satırda ver: ✏️ ile başla, yanlışı ve doğrusunu yaz, tek cümlelik Türkçe sebep ekle.
- Düzeltmeden sonra konuşmayı kaldığı yerden sürdür. Sohbeti derse çevirme.
- Cümle doğruysa düzeltme satırı hiç yazma.

ŞU KELİMELER ÖĞRENCİNİN ŞU AN ÇALIŞTIĞI KELİMELER
${focus}
Konu uygun düştüğünde bunları doğal biçimde kullan; zorlama, listeleme, "şu kelimeyi kullanalım" deme.

Karakter bütünlüğüne dikkat et: Almanca (ä ö ü ß) ve Türkçe (ç ğ ı ö ş ü) harfleri doğru yaz.`;
}

/**
 * Yanıtı parça parça akıtır.
 *
 * Akış tercih ediliyor çünkü bekleme süresi konuşma hissini bozuyor: cevabın
 * tamamı gelene kadar boş ekrana bakmak yerine kelimeler belirdikçe okunuyor.
 */
export async function* streamChat(
  messages: ChatMessage[],
  ctx: ChatContext,
): AsyncGenerator<string> {
  const apiKey = process.env.GITHUB_MODELS_API_KEY;
  if (!apiKey) throw new Error("GITHUB_MODELS_API_KEY tanımsız");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        accept: "text/event-stream",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        max_tokens: 400,
        // Düşük sıcaklık: küçük modellerde Türkçe/Almanca harf bozulmasını
        // ve kural kaçırmayı azaltıyor (satış botunda da aynı sebeple 0.2).
        temperature: 0.3,
        messages: [{ role: "system", content: systemPrompt(ctx) }, ...messages],
      }),
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new Error(`GitHub Models ${response.status}: ${detail.slice(0, 300)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE çerçeveleri satır satır gelir ama chunk sınırı satırın ortasına
    // düşebilir; son yarım satır tamponda bekletilir.
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
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        /* yarım ya da bozuk çerçeve — atla, akış sürsün */
      }
    }
  }
}
