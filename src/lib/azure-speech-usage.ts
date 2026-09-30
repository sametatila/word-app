import "server-only";
import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { aiUsage } from "@/lib/db/schema";

/**
 * Azure Speech (kaynak `lernomi-speech`, F0) — aylık kullanım ve anahtar sağlığı.
 *
 * F0 kotası AŞILINCA Azure ücret kesmiyor, isteği reddediyor: konuşma tanıma
 * ayda 5 saat, seslendirme ayda 500.000 karakter. İkisi de sessiz bozulmaya
 * yol açıyor: STT tavanında kod Azure'u o ay zincirden çıkarıyor (lib/stt
 * `azureBudgetOk`), TTS kotasında seslendirme cihazın kendi sesine düşüyor.
 * Anahtar da sessizce geçersizleşebiliyor (eski kaynağın anahtarı öyle
 * gitti, 2026-09-27). Uyarı motoru (lib/alerts `azure`) ve panel buradan okuyor.
 */

export { AZURE_STT_MONTHLY_SECONDS, AZURE_TTS_MONTHLY_CHARS } from "@/lib/azure-speech-limits";

export type AzureMonth = { sttSeconds: number; ttsChars: number };

export async function azureMonthUsage(): Promise<AzureMonth> {
  const month = sql`date_trunc('month', now())`;
  const [stt] = await db
    .select({ s: sql<number>`coalesce(sum(audio_seconds), 0)::int` })
    .from(aiUsage)
    .where(and(eq(aiUsage.provider, "azure"), eq(aiUsage.kind, "stt"), eq(aiUsage.ok, true), gte(aiUsage.createdAt, month)));
  const [tts] = await db
    .select({ c: sql<number>`coalesce(sum(chars), 0)::int` })
    .from(aiUsage)
    .where(and(eq(aiUsage.provider, "azure"), eq(aiUsage.kind, "tts"), eq(aiUsage.ok, true), gte(aiUsage.createdAt, month)));
  return { sttSeconds: Number(stt?.s ?? 0), ttsChars: Number(tts?.c ?? 0) };
}

/**
 * Anahtar yoklaması: jeton ucu (`/sts/v1.0/issueToken`) ücretsiz ve kotadan
 * düşmüyor. 200 = anahtar geçerli; 401/403 = geçersiz ya da kaynak kapalı;
 * ağ hatası ya da başka durum = bilinmiyor (uyarı üretmez, yanlış alarm olmasın).
 */
export async function azureKeyHealth(): Promise<"ok" | "invalid" | "unknown"> {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) return "unknown";
  try {
    const res = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": key, "content-length": "0" },
      signal: AbortSignal.timeout(8_000),
    });
    if (res.ok) return "ok";
    return res.status === 401 || res.status === 403 ? "invalid" : "unknown";
  } catch {
    return "unknown";
  }
}
