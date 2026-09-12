import "server-only";
import { cleanForSpeech, synthesizeEdge, MAX_TEXT } from "./edge";
import { azureConfigured, synthesizeAzure } from "./azure";
import { recordAiUsage } from "@/lib/ai-usage";
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
 *
 * ZİNCİR ARTIK MUHASEBEYE YAZIYOR. `ai-usage`ın kendi gerekçesi bunu zaten
 * istiyordu — "BAŞARISIZ çağrılar da yazılıyor, çünkü zincir düşen
 * sağlayıcıyı sessizce atladığı için kaydedilmeyen bir hata hiç olmamış gibi
 * duruyor" — ama seslendirme zinciri hiçbir şey yazmıyordu. Sonucu şuydu:
 * Edge kırıldığı gün (Microsoft o resmî olmayan ucu değiştirdiğinde) Azure
 * devreye girip uygulama sessizleşmiyor, ama BUNU KİMSE GÖRMÜYOR; kotanın
 * erimesi de ancak fatura gelince anlaşılıyordu. Tek görünen iz teşhis için
 * konmuş bir yanıt başlığıydı (`x-tts-source`), yani kimsenin bakmadığı yer.
 *
 * Ölçü karakterde: Azure orada ücretlendiriyor (bkz. şema `chars`).
 */

export type SynthResult = { audio: Buffer; source: "edge" | "azure" };

export async function synthesizeSpeech(
  text: string,
  voice: VoiceId,
  slow = false,
  /** Muhasebe için — kim tetikledi. Arka plan işlerinde boş. */
  userId: string | null = null,
): Promise<SynthResult> {
  // Sadeleştirme tek yerde: iki yol da birebir aynı metni seslendirmeli.
  const clean = cleanForSpeech(text).slice(0, MAX_TEXT);
  if (!clean) throw new Error("boş metin");

  const problems: string[] = [];
  /* Her DENEME ayrı yazılıyor: yedeğe düşen bir çağrıda iki satır oluşuyor
     (düşen Edge + geçen Azure) ve zincirin gerçek hâli ancak böyle görünüyor. */
  const yaz = (provider: string, ok: boolean, basladi: number, err?: unknown) =>
    recordAiUsage(userId, {
      kind: "tts",
      provider,
      model: voice,
      ok,
      ms: Date.now() - basladi,
      chars: clean.length,
      error: err ? String((err as Error).message ?? err) : undefined,
    });

  const edgeBas = Date.now();
  try {
    const audio = await synthesizeEdge(clean, voice, slow);
    yaz("edge", true, edgeBas);
    return { audio, source: "edge" };
  } catch (err) {
    yaz("edge", false, edgeBas, err);
    problems.push(`edge: ${(err as Error).message}`);
  }

  if (azureConfigured()) {
    const azureBas = Date.now();
    try {
      const audio = await synthesizeAzure(clean, voice, slow);
      yaz("azure", true, azureBas);
      return { audio, source: "azure" };
    } catch (err) {
      yaz("azure", false, azureBas, err);
      problems.push(`azure: ${(err as Error).message}`);
    }
  } else {
    problems.push("azure: anahtar yok");
  }

  throw new Error(`seslendirme başarısız — ${problems.join(" | ")}`);
}
