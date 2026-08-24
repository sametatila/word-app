import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { sttProviders } from "@/lib/chat-providers";
import { recordAiUsage } from "@/lib/ai-usage";

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
  /** Beklenen cevap — yalnızca kayda geçiyor, karara etki etmiyor. */
  let expected = "";
  try {
    const form = await req.formData();
    const f = form.get("audio");
    if (f instanceof File) file = f;
    const lang = form.get("language");
    if (typeof lang === "string" && /^[a-z]{2}$/.test(lang)) language = lang;
    const want = form.get("expected");
    if (typeof want === "string") expected = want.slice(0, 120);
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!file || file.size === 0) return NextResponse.json({ error: "no_audio" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });

  // Klip uzunluğu istemciden değil boyuttan tahmin ediliyor: opus ~16 kB/sn.
  // Kesin olması gerekmiyor, sınıra ne kadar yaklaşıldığını görmeye yetiyor.
  const seconds = Math.max(1, Math.min(60, file.size / 16_000));

  const failures: string[] = [];
  for (const provider of providers) {
    const startedAt = Date.now();
    try {
      /*
        İki lehçe: OpenAI biçimi çok parçalı gövde ve JSON cevap istiyor,
        Deepgram ise parametreleri adreste, sesi ham gövdede alıyor.
      */
      const res =
        provider.dialect === "deepgram"
          ? await fetch(
              `${provider.baseUrl}?${new URLSearchParams({
                model: provider.model,
                language,
                // Noktalama ve biçimlendirme kapalı: tek kelimelik cevapta
                // ikisi de gürültü, karşılaştırma zaten normalleştiriyor.
                punctuate: "false",
                smart_format: "false",
              })}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${provider.key}`,
                  "content-type": file.type || "audio/webm",
                },
                body: await file.arrayBuffer(),
              },
            )
          : await (async () => {
              const body = new FormData();
              // Dosya adı uzantısı önemli: sağlayıcılar biçimi ondan anlıyor.
              body.append("file", file, file.name || "clip.webm");
              body.append("model", provider.model);
              // Dil veriliyor: hedef dil belli olduğu için tanıyıcının dil
              // tahmini yapmasına gerek yok ve tahmin, tek kelimelik kliplerde
              // sık şaşıyor.
              body.append("language", language);
              body.append("temperature", "0");
              body.append("response_format", "json");
              return fetch(`${provider.baseUrl}/audio/transcriptions`, {
                method: "POST",
                headers: { authorization: `Bearer ${provider.key}` },
                body,
              });
            })();
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        recordAiUsage(userId, {
          kind: "stt",
          provider: provider.name,
          model: provider.model,
          ok: false,
          status: res.status,
          ms: Date.now() - startedAt,
          error: detail.slice(0, 200),
          audioSeconds: Math.round(seconds),
        });
        failures.push(`${provider.name}: ${res.status}`);
        continue;
      }
      const data = (await res.json()) as {
        text?: string;
        results?: {
          channels?: { alternatives?: { transcript?: string; confidence?: number }[] }[];
        };
      };
      const best = data.results?.channels?.[0]?.alternatives?.[0];
      const text = (
        provider.dialect === "deepgram" ? (best?.transcript ?? "") : (data.text ?? "")
      ).trim();
      /*
        Tanıyıcının kendi güveni — veren sağlayıcılarda.

        Gürültüyü ve arkadan gelen konuşmayı kelimeye çevirmek tanıyıcının
        doğası: duyacak bir şey verilince duyuyor. Ayırt eden şey metin değil,
        tanıyıcının o metne ne kadar inandığı. Whisper biçimi bunu vermiyor;
        orada `undefined` kalıyor ve süzme uygulanmıyor.
      */
      const confidence = provider.dialect === "deepgram" ? best?.confidence : undefined;

      /*
        Her çağrı muhasebeye yazılıyor.

        Ücretsiz katmanların bağlayıcı sınırı jeton değil İSTEK SAYISI (groq:
        günde 2.000 istek ve 28.800 saniye ses). Sayaç olmadan limite ne kadar
        yaklaşıldığı ancak 429 gelince öğrenilir — sağlayıcı kimliğini
        kaydetmeyi de aynı ders yüzünden eklemiştik.
      */
      recordAiUsage(userId, {
        kind: "stt",
        provider: provider.name,
        model: provider.model,
        ok: true,
        status: res.status,
        ms: Date.now() - startedAt,
        audioSeconds: Math.round(seconds),
        expected,
        heard: text,
        confidence,
      });

      return NextResponse.json({
        text,
        confidence,
        provider: provider.name,
        model: provider.model,
      });
    } catch (err) {
      recordAiUsage(userId, {
        kind: "stt",
        provider: provider.name,
        model: provider.model,
        ok: false,
        status: 0,
        ms: Date.now() - startedAt,
        error: (err as Error).message,
        audioSeconds: Math.round(seconds),
      });
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
