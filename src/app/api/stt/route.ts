import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { sttProviders, type SttMode } from "@/lib/chat-providers";
import { SttError, transcribe } from "@/lib/stt";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Kısa bir klip için fazlasıyla yeterli; sağlayıcı takılırsa istek burada
// kesilsin ki yürüyüş turu sonsuza kadar beklemesin.
export const maxDuration = 30;

/** Kabul edilen en büyük klip — bir kelimelik cevap birkaç yüz kilobayt. */
const MAX_BYTES = 2_000_000;

/**
 * Konuşmayı yazıya çevirme.
 *
 * Yürürken modu bunun için var. Tarayıcının kendi konuşma tanıyıcısı
 * (`SpeechRecognition`) yalnızca sayfa GÖRÜNÜRKEN çalışıyor: telefon
 * kilitlenince susuyor ve mod, asıl vaadi olan "telefon cepte kalabilir"i
 * yerine getiremiyor. `getUserMedia` akışı arka planda yaşıyor; ses
 * tarayıcıda kaydedilip buraya gönderiliyor.
 *
 * Sağlayıcı zinciri ve muhasebe `lib/stt.ts`'te (WP-20 ile `/api/pronounce`
 * ile ortak). Ses saklanmıyor.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let file: File | null = null;
  let language = "de";
  /** Beklenen cevap — yalnızca kayda geçiyor, karara etki etmiyor. */
  let expected = "";
  /**
   * Zincir kipi. Yürürken modunun EKRAN KAPALI yolu `walk` gönderir ve yalnız
   * o kipte Azure zincire girer (bkz. chat-providers `SttMode`). Ekran
   * açıkken istemci bu uca hiç gelmiyor; gelse de `walk` demediği sürece
   * Azure kotası harcanmıyor.
   */
  let mode: SttMode = "default";
  try {
    const form = await req.formData();
    const f = form.get("audio");
    if (f instanceof File) file = f;
    const lang = form.get("language");
    if (typeof lang === "string" && /^[a-z]{2}$/.test(lang)) language = lang;
    const want = form.get("expected");
    if (typeof want === "string") expected = want.slice(0, 120);
    if (form.get("mode") === "walk") mode = "walk";
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!sttProviders(mode).length) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!file || file.size === 0) return NextResponse.json({ error: "no_audio" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });

  try {
    const out = await transcribe(file, { language, userId, expected, mode });
    return NextResponse.json({ text: out.text, confidence: out.confidence, provider: out.provider, model: out.model });
  } catch (err) {
    if (err instanceof SttError) console.error("[api/stt] tüm sağlayıcılar düştü", err.failures.join(" · "));
    else console.error("[api/stt]", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}

/**
 * Arayüz, modu kurmadan önce bu ucun açık olup olmadığını soruyor.
 * `walk`: cep yolunun ilk sağlayıcısı — başlangıç ekranı "cepte çalışır"
 * sözünü buna göre veriyor.
 */
export async function GET() {
  const providers = sttProviders();
  const walk = sttProviders("walk");
  return NextResponse.json({
    configured: providers.length > 0 || walk.length > 0,
    provider: providers[0]?.name ?? null,
    walk: walk[0]?.name ?? null,
  });
}
