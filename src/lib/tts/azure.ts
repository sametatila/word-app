import "server-only";
import { rateFor, type VoiceId } from "./voices";
import { buildSsml } from "./ssml";

/**
 * Azure Speech ile seslendirme — Edge yolunun resmî yedeği.
 *
 * Sesler **birebir aynı**: Katja, Conrad, Leni, Jan. Yedeğe düşmek
 * kaliteyi düşürmüyor, kullanıcı farkı duymuyor. Zaten bu yüzden seçildi;
 * başka bir sağlayıcıya düşmek sesin ortasında kimlik değiştirmek olurdu.
 *
 * Neden ikisi birden: Edge yolu resmî bir API değil ve Microsoft'un onu
 * değiştirdiği kurulum sırasında bizzat görüldü (güvenlik jetonunun sürümü
 * değişince 403). Azure ise sözleşmeli: ücretsiz F0 katmanı ayda 500.000
 * karakter veriyor ve süresi dolmuyor.
 *
 * Sıra yine de Edge önce: onun karakter kotası yok. Azure yalnızca Edge
 * kırıldığında devreye giriyor, yani F0 kotası bir tampon olarak duruyor,
 * günlük yük olarak değil.
 *
 * Anahtar tanımlı değilse bu yol sessizce atlanır — kurulum zorunlu değil.
 */

const TIMEOUT_MS = 15_000;

/** Edge ile aynı biçim: 24 kHz mono MP3. */
const OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";

export function azureConfigured(): boolean {
  return Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION);
}

export async function synthesizeAzure(clean: string, voice: VoiceId, slow = false): Promise<Buffer> {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) throw new Error("azure yapılandırılmadı");

  const ssml = buildSsml(clean, voice, rateFor(voice, slow));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": OUTPUT_FORMAT,
          // Azure bu başlığı istiyor; boş bırakılırsa bazı bölgelerde reddediyor.
          "User-Agent": "nomi",
        },
        body: ssml,
      },
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`azure ${res.status}: ${detail.slice(0, 160)}`);
    }
    const audio = Buffer.from(await res.arrayBuffer());
    if (!audio.length) throw new Error("azure boş ses döndü");
    return audio;
  } finally {
    clearTimeout(timer);
  }
}
