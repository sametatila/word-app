import "server-only";
import { cleanForSpeech, synthesizeEdge, MAX_TEXT } from "./edge";
import { azureConfigured, synthesizeAzure } from "./azure";
import type { VoiceId } from "./voices";

/**
 * Seslendirme zinciri.
 *
 * Sıra: Edge → Azure. İkisi de **aynı sesleri** üretiyor, yani yedeğe düşmek
 * kullanıcı için duyulur bir değişiklik değil; tek fark hangi kapıdan
 * geçildiği.
 *
 * Edge önce çünkü karakter kotası yok. Azure'un ücretsiz katmanı ayda 500.000
 * karakterle sınırlı, dolayısıyla onu günlük yük olarak kullanmak kotayı
 * gereksiz yere eritirdi. Bu sırayla Azure bir tampon olarak duruyor: yalnızca
 * Edge kırıldığında (Microsoft o resmî olmayan ucu değiştirdiğinde) devreye
 * giriyor ve o gün uygulama sessizleşmiyor.
 *
 * İkisi de düşerse hata fırlatılıyor; istemci bunu tarayıcının kendi sentezine
 * düşerek karşılıyor. Yani üçüncü bir yedek daha var ve o hiçbir servise
 * bağlı değil.
 */

export type SynthResult = { audio: Buffer; source: "edge" | "azure" };

export async function synthesizeSpeech(
  text: string,
  voice: VoiceId,
  slow = false,
): Promise<SynthResult> {
  // Sadeleştirme tek yerde: iki yol da birebir aynı metni seslendirmeli.
  const clean = cleanForSpeech(text).slice(0, MAX_TEXT);
  if (!clean) throw new Error("boş metin");

  const problems: string[] = [];
  try {
    return { audio: await synthesizeEdge(clean, voice, slow), source: "edge" };
  } catch (err) {
    problems.push(`edge: ${(err as Error).message}`);
  }

  if (azureConfigured()) {
    try {
      return { audio: await synthesizeAzure(clean, voice, slow), source: "azure" };
    } catch (err) {
      problems.push(`azure: ${(err as Error).message}`);
    }
  } else {
    problems.push("azure: anahtar yok");
  }

  throw new Error(`seslendirme başarısız — ${problems.join(" | ")}`);
}
