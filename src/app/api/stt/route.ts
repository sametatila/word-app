import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { sttProviders } from "@/lib/chat-providers";

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
 * yerine getiremiyor.
 *
 * `getUserMedia` ile açılan mikrofon akışı ise arka planda yaşamaya devam
 * ediyor — sesli not uygulamalarının ekran kapalıyken kayıt yapabilmesinin
 * sebebi bu. Dolayısıyla ses tarayıcıda KAYDEDİLİP buraya gönderiliyor ve
 * yazıya burada çevriliyor.
 *
 * Ses saklanmıyor: klip bellekte sağlayıcıya iletiliyor ve cevapla birlikte
 * düşüyor. Rol yapma kayıtlarında da aynı ilke geçerli (orada da yalnızca
 * metin tutuluyor, ses hiç sunucuya gelmiyordu) — burada ses gelmek zorunda
 * ama kalmıyor.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const providers = sttProviders();
  if (!providers.length) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let file: File | null = null;
  let language = "de";
  try {
    const form = await req.formData();
    const f = form.get("audio");
    if (f instanceof File) file = f;
    const lang = form.get("language");
    if (typeof lang === "string" && /^[a-z]{2}$/.test(lang)) language = lang;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!file || file.size === 0) return NextResponse.json({ error: "no_audio" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });

  const failures: string[] = [];
  for (const provider of providers) {
    try {
      const body = new FormData();
      // Dosya adı uzantısı önemli: sağlayıcılar biçimi ondan anlıyor.
      body.append("file", file, file.name || "clip.webm");
      body.append("model", provider.model);
      // Dil veriliyor: hedef dil belli olduğu için tanıyıcının dil tahmini
      // yapmasına gerek yok ve tahmin, tek kelimelik kliplerde sık şaşıyor.
      body.append("language", language);
      body.append("response_format", "json");

      const res = await fetch(`${provider.baseUrl}/audio/transcriptions`, {
        method: "POST",
        headers: { authorization: `Bearer ${provider.key}` },
        body,
      });
      if (!res.ok) {
        failures.push(`${provider.name}: ${res.status}`);
        continue;
      }
      const data = (await res.json()) as { text?: string };
      const text = (data.text ?? "").trim();
      return NextResponse.json({ text, provider: provider.name, model: provider.model });
    } catch (err) {
      failures.push(`${provider.name}: ${(err as Error).message}`);
    }
  }

  console.error("[api/stt] tüm sağlayıcılar düştü", failures.join(" · "));
  return NextResponse.json({ error: "failed" }, { status: 502 });
}

/** Arayüz, modu kurmadan önce bu ucun açık olup olmadığını soruyor. */
export async function GET() {
  const providers = sttProviders();
  return NextResponse.json({
    configured: providers.length > 0,
    provider: providers[0]?.name ?? null,
  });
}
