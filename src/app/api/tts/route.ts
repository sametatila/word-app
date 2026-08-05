import { NextResponse } from "next/server";
import { synthesize, MAX_TEXT } from "@/lib/tts/edge";
import { VOICES, type VoiceId } from "@/lib/tts/voices";

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
 *   3. Edge TTS — yalnızca gerçek ıskalamada.
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

const VOICE_IDS = new Set<string>(VOICES.map((v) => v.id));

export async function GET(req: Request) {
  const url = new URL(req.url);
  const text = (url.searchParams.get("t") ?? "").trim();
  const voice = url.searchParams.get("v") ?? "";

  if (!text || text.length > MAX_TEXT) {
    return NextResponse.json({ error: "bad_text" }, { status: 400 });
  }
  if (!VOICE_IDS.has(voice)) {
    return NextResponse.json({ error: "bad_voice" }, { status: 400 });
  }
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const audio = await synthesize(text, voice as VoiceId);
    return new Response(new Uint8Array(audio), {
      headers: {
        "content-type": "audio/mpeg",
        "content-length": String(audio.length),
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
