import "server-only";
import { and, asc, desc, eq, gt, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles, userWords, words } from "@/lib/db/schema";
import { ensureProfile } from "@/lib/session";
import { CORRECTION_MARK, SUGGESTION_MARK } from "@/lib/chat-format";
import { chatProviders, type ChatMessage } from "@/lib/chat-providers";

/**
 * Sohbet ortağı.
 *
 * Sağlayıcı seçimi ve akış chat-providers.ts'te; burada konuşmanın zemini
 * (seviye, kurs, çalışılan kelimeler) ve sistem istemi kuruluyor.
 *
 * Anahtarlar koda gömülmez. Bu depo GitHub'a push ediliyor ve GitHub kendi
 * token biçimini tarayıp bulduğu anda iptal ediyor; gömülen anahtar hem
 * burada hem EğitimKit'te birkaç dakika içinde ölürdü. `.env` zaten
 * .gitignore'da, Vercel'e taşımak da tek değişken.
 */

export type { ChatMessage };

/** Sohbetin hangi seviyede ve hangi kelimelerle yürüyeceği. */
export type ChatContext = {
  level: string;
  course: string;
  /** Öğrencinin şu sıralar çalıştığı kelimeler — konuşmaya bunlar dokunur. */
  focus: { de: string; tr: string }[];
};

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
- Öğrenci Türkçe yazarsa ya da tıkanırsa, cevabına MUTLAKA Türkçe bir
  açıklamayla başla (bu şart), sonra Almancaya dön ve konuşmayı sürdür.
- Yıldız, tire, madde işareti gibi biçimlendirme kullanma; düz metin yaz.

HATA DÜZELTME
- Anlamı bozan ya da seviyesinin altında kalan hataları düzelt; küçük üslup farklarını bırak.
- Düzeltmeyi tek satırda ver: ${CORRECTION_MARK} ile başla, yanlışı ve doğrusunu yaz,
  sonuna Türkçe olarak KURALIN ADINI ekle — açıklama cümlesi değil, etiket.
  Örnek: "seit 10 Jahre → seit 10 Jahren (seit + Dativ)".
  Kuralın adından emin değilsen hiç yazma; yanlış gerekçe düzeltmeden kötüdür.
- Düzeltmeden sonra konuşmayı kaldığı yerden sürdür. Sohbeti derse çevirme.
- Cümle doğruysa düzeltme satırı hiç yazma.

CEVABIN EN SONUNDA ÜÇ ÖNERİ (her seferinde yaz)
- Bu başlığı cevabına YAZMA. Yalnızca öneri satırlarını yaz.
- Öğrencinin sana verebileceği 3 farklı cevap öner. Her birini ayrı satıra ${SUGGESTION_MARK} ile başlayarak yaz.
- Öneriler Almanca, ${ctx.level} seviyesinde ve kısa olsun (en fazla 8 kelime).
- Üçü birbirinden farklı yöne gitsin: biri olumlu, biri olumsuz ya da farklı bir seçenek, biri sana soru soran.
- Öneri satırlarına açıklama, tırnak, numara ekleme — yalnızca söylenecek cümle.

ŞU KELİMELER ÖĞRENCİNİN ŞU AN ÇALIŞTIĞI KELİMELER
${focus}
Konu uygun düştüğünde bunları doğal biçimde kullan; zorlama, listeleme, "şu kelimeyi kullanalım" deme.

Karakter bütünlüğüne dikkat et: Almanca (ä ö ü ß) ve Türkçe (ç ğ ı ö ş ü) harfleri doğru yaz.`;
}

/**
 * Yanıtı parça parça akıtır; birincil sağlayıcı düşerse yedeğe geçer.
 *
 * Akış tercih ediliyor çünkü bekleme süresi konuşma hissini bozuyor: cevabın
 * tamamı gelene kadar boş ekrana bakmak yerine kelimeler belirdikçe okunuyor.
 *
 * Yedeğe **yalnızca tek bir parça bile gönderilmeden önce** geçiliyor. Akış
 * başladıktan sonra sağlayıcı değiştirmek yarım cümlenin üstüne başka bir
 * modelin cevabını eklemek olurdu; o noktadan sonra hata kullanıcıya bildirilir.
 */
export async function* streamChat(
  messages: ChatMessage[],
  ctx: ChatContext,
): AsyncGenerator<string> {
  const providers = chatProviders();
  if (!providers.length) throw new Error("Sohbet sağlayıcısı tanımlı değil");

  const system = systemPrompt(ctx);
  const failures: string[] = [];

  for (const provider of providers) {
    let started = false;
    try {
      for await (const delta of provider.stream(system, messages)) {
        started = true;
        yield delta;
      }
      // Hiç parça gelmemesi de bir başarısızlık: bazı sağlayıcılar kapasite
      // hatasını HTTP 200 ile, akışın içinde bildiriyor. Bunu "başarılı ama
      // boş" saymak kullanıcıya boş baloncuk gösterirdi.
      if (!started) throw new Error("boş akış");
      return;
    } catch (err) {
      if (started) throw err;
      failures.push(`${provider.name}: ${(err as Error).message}`);
    }
  }

  throw new Error(`Tüm sağlayıcılar başarısız — ${failures.join(" | ")}`);
}
