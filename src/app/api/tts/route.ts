import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { bumpUsage, getUsage } from "@/lib/premium";
import { MAX_TEXT } from "@/lib/tts/edge";
import { synthesizeSpeech } from "@/lib/tts/synth";
import { TURKISH_VOICE, VOICES, type VoiceId } from "@/lib/tts/voices";

/**
 * Seslendirme ucu.
 *
 * Tasarımın tamamı **önbelleğe alınabilmek** üzerine kurulu, çünkü asıl kazanç
 * orada: aynı kelime dönüp duruyor (tekrar algoritmasının doğası bu), yani her
 * parça ömründe bir kez sentezlenip sonsuza kadar önbellekten dönebilir.
 *
 * Üç katman var:
 *   1. Tarayıcı önbelleği — aynı cihazda ikinci dinleme hiç ağa çıkmıyor.
 *   2. Vercel CDN — bir kelimeyi ilk dinleyen kişi onu herkes için ısıtıyor;
 *      isabet hâlinde bu fonksiyon hiç çalışmıyor.
 *   3. Sentez zinciri (Edge → Azure) — yalnızca gerçek ıskalamada.
 *
 * Bunun çalışması için Vercel'in kuralları harfiyen uygulanıyor, aksi hâlde
 * önbellek **sessizce hiç devreye girmez**:
 *
 *   - GET olmak zorunda. POST cevapları CDN'de hiç saklanmıyor.
 *   - `Cache-Control` tek başına yetmiyor: Vercel `s-maxage`'i tarayıcıya
 *     göndermeden siliyor, bu yüzden `CDN-Cache-Control` ayrıca veriliyor.
 *   - Durum kodu 200 olmalı; hata cevapları bilerek önbelleklenmiyor
 *     (geçici bir kesinti kalıcı bir sessizliğe dönüşmesin).
 *
 * Kimlik doğrulaması bilerek **yok**: `Authorization` başlığı taşıyan istekler
 * Vercel'de önbelleğe alınmıyor ve oturum okumak cevabı kullanıcıya özel hâle
 * getirip paylaşımı bozardı. Okunan içerik zaten gizli değil — sözlükteki
 * Almanca kelimeler. Karşılığında `sameOrigin` denetimi var; bu, başka bir
 * siteden doğrudan bağlanmayı engelliyor ama kararlı birini durdurmaz.
 * Kötüye kullanım görülürse doğru çözüm imzalı URL, oturum değil.
 */

export const dynamic = "force-dynamic";
/** Node çalışma zamanı gerekiyor: sentez WebSocket ve Buffer kullanıyor. */
export const runtime = "nodejs";

/** Bir yıl — içerik hiç değişmiyor, bir kelimenin sesi hep aynı. */
const MAX_AGE = 31_536_000;

// Anlatım sesi listede yok (kullanıcı seçmiyor) ama uç onu da seslendirmeli.
const VOICE_IDS = new Set<string>([...VOICES.map((v) => v.id), TURKISH_VOICE]);

/** Hesap başına günlük sentez tavanı — gerekçesi aşağıda, kotanın koyulduğu yerde. */
const DAILY_TTS_CEILING = 2000;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const text = (url.searchParams.get("t") ?? "").trim();
  const voice = url.searchParams.get("v") ?? "";
  // Hız yalnızca iki değer alıyor. Serbest bir sayı olsaydı her farklı hız
  // ayrı bir önbellek girdisi açar ve isabet oranı düşerdi.
  const slow = url.searchParams.get("r") === "slow";

  if (!text || text.length > MAX_TEXT) {
    return NextResponse.json({ error: "bad_text" }, { status: 400 });
  }
  if (!VOICE_IDS.has(voice)) {
    return NextResponse.json({ error: "bad_voice" }, { status: 400 });
  }
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  // Girişsiz sayfaların hiçbiri seslendirme kullanmıyor; açık uç, Azure yedeğinin
  // ücretli kotasını herkesin harcayabildiği bir sentez servisi olurdu.
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  /**
   * Emniyet tavanı — hesap başına GÜNLÜK sentez sayısı.
   *
   * Oturum ve aynı-köken denetimi ucu tarayıcıdan gelen isteklere kapatıyor ama
   * KAÇ istek geldiğini sınırlamıyordu: hesabı olan biri (ya da çalınmış bir
   * çerez) Azure kotasını tek başına yakabilirdi. `stt` ve `assess` uçlarındaki
   * desenin aynısı — kullanıcıya duyurulan bir sınır değil, kaçak kullanımın
   * tavanı.
   *
   * Sayı bilerek cömert: bir tur ~20 kelime, en yoğun gün bile birkaç yüzü
   * geçmiyor; önbellek (tarayıcı + CDN) zaten çoğu isteği buraya hiç
   * getirmiyor. Yani normal kullanıcı bu tavanı göremez.
   */
  if ((await getUsage(userId, "tts_calls", "day")) >= DAILY_TTS_CEILING) {
    return NextResponse.json(
      { error: "quota" },
      { status: 429, headers: { "cache-control": "no-store" } },
    );
  }
  void bumpUsage(userId, "tts_calls", "day");

  try {
    const { audio, source } = await synthesizeSpeech(text, voice as VoiceId, slow);
    return new Response(new Uint8Array(audio), {
      headers: {
        "content-type": "audio/mpeg",
        "content-length": String(audio.length),
        // Hangi yoldan geldiği yalnızca teşhis için: Edge kırılırsa bu
        // başlıktan görülüyor, kullanıcı için bir farkı yok.
        "x-tts-source": source,
        // Tarayıcı için: `immutable` sayesinde sayfa yenilense bile yeniden
        // doğrulama isteği bile gitmiyor.
        "cache-control": `public, max-age=${MAX_AGE}, immutable`,
        // CDN için ayrı başlık: yukarıdakinin s-maxage'i buraya ulaşmıyor.
        "cdn-cache-control": `public, s-maxage=${MAX_AGE}, immutable`,
        "vercel-cdn-cache-control": `public, s-maxage=${MAX_AGE}, immutable`,
      },
    });
  } catch (err) {
    console.error("[tts]", err);
    // 503 ve `no-store`: istemci bunu sessizce tarayıcı sentezine düşerek
    // karşılıyor, ve hata önbelleğe yazılmadığı için sonraki deneme temiz.
    return NextResponse.json(
      { error: "upstream" },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}

/**
 * İsteğin kendi sayfamızdan geldiğinin kaba denetimi.
 *
 * `lib/auth/origin` yerine burada ayrı duruyor çünkü oradaki sürüm yazma
 * istekleri için kurgulanmış ve `Origin` başlığını şart koşuyor; oysa `<audio>`
 * etiketinin yaptığı GET isteğinde `Origin` çoğu tarayıcıda hiç gönderilmiyor,
 * elde yalnızca `Referer` oluyor.
 */
function sameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const source = req.headers.get("origin") ?? req.headers.get("referer");
  // Başlık hiç yoksa geçiriyoruz: yüklü PWA'da ve bazı mobil tarayıcılarda
  // medya isteği ikisini de göndermiyor. Reddetmek sesi tamamen susturur.
  if (!source) return true;
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}
