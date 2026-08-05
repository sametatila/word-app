import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { rateFor, type VoiceId } from "./voices";
import { escapeXml } from "./ssml";

/**
 * Microsoft Edge'in okuma servisiyle konuşma sentezi.
 *
 * Neden bu: aynı nöral sesler Azure'da paralı satılıyor ama Edge tarayıcısının
 * "sesli oku" özelliği aynı uca anahtarsız erişiyor. Bize gereken tam olarak
 * bu — ücretsiz ve kaliteden ödün vermeyen.
 *
 * Resmî bir API olmadığını bilerek kullanıyoruz. Kurarken canlı görüldü:
 * ilk deneme 403 döndü çünkü Microsoft güvenlik jetonunun sürüm dizgesini
 * değiştirmişti. Bu yüzden iki şey yapılıyor — sürüm tek bir sabitte tutuluyor
 * (kırıldığında değişecek tek yer orası) ve çağıran taraf hata hâlinde
 * tarayıcının kendi sentezine düşüyor, yani servis kesilse bile ses susmuyor.
 *
 * Protokol WebSocket: önce yapılandırma çerçevesi, sonra SSML, karşılığında
 * ikili ses çerçeveleri ve `turn.end` ile bitiş.
 */

const TRUSTED_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";

/** 24 kHz mono MP3: konuşma için fazlasıyla yeterli, cümle başına ~25 KB. */
const OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";

const SYNTH_TIMEOUT_MS = 15_000;

/** Tek seferde sentezlenecek metnin üst sınırı — en uzun örneğimiz bunun çok altında. */
export const MAX_TEXT = 600;

/**
 * Tarayıcı sürümü — bu yolun tek kırılgan noktası ve ölçülerek bulundu.
 *
 * Kurulum sırasında uç 403 döndürüyordu ve sebebini önce güvenlik jetonunun
 * sürüm dizgesine yormuştum. Yanlıştı. Değişkenleri tek tek ayırınca ortaya
 * çıkan tablo şu:
 *
 *   User-Agent Edg/130 + sürüm 130 → 403
 *   User-Agent Edg/130 + sürüm 143 → 403
 *   User-Agent Edg/143 + sürüm 130 → çalışıyor
 *   User-Agent Edg/143 + sürüm yok → 403
 *
 * Yani kapıyı tutan şey `User-Agent`'taki tarayıcı sürümü. `Sec-MS-GEC-Version`
 * parametresinin **var olması** gerekiyor ama değeri denetlenmiyor.
 *
 * Belirleyici olan ikinci ölçüm: Microsoft yalnızca bir **alt sınır**
 * uyguluyor. Edg/145, 150, 200, hatta 999 sorunsuz bağlanıyor. Dolayısıyla
 * doğru savunma eski sürümleri denemek değil (ilk tasarımım tam ters yöne
 * gidiyordu) — sınırın hep önünde durmak.
 *
 * Sürüm bu yüzden tarihten türetiliyor: Edge kabaca dört haftada bir yeni ana
 * sürüm çıkarıyor, buna birkaç sürümlük pay ekleniyor. Böylece sayı hem
 * gerçekçi kalıyor hem de alt sınır yükseldikçe kendiliğinden önde kalıyor,
 * kimsenin bir şey güncellemesi gerekmiyor.
 */

/** Ölçümün yapıldığı an: 2026-08 başında güncel ana sürüm 143'tü. */
const BASE_VERSION = 143;
const BASE_DATE = Date.UTC(2026, 7, 1);
const RELEASE_DAYS = 28;
/** Alt sınırın önünde durmak için pay — birkaç sürümlük tampon. */
const VERSION_MARGIN = 3;

function browserVersion(): number {
  const override = Number(process.env.EDGE_TTS_BROWSER_VERSION);
  // Ortam değişkeni son çare: ölçüm yanılırsa Vercel'de tek değer değiştirip
  // redeploy etmek yetsin, yeni kod beklemeye gerek kalmasın.
  if (Number.isFinite(override) && override > 0) return Math.floor(override);
  const elapsed = Math.max(0, Date.now() - BASE_DATE);
  return BASE_VERSION + Math.floor(elapsed / (RELEASE_DAYS * 86_400_000)) + VERSION_MARGIN;
}

/**
 * Sec-MS-GEC jetonu.
 *
 * Windows dosya zamanı (1601'den bu yana 100 nanosaniyelik adımlar) beş
 * dakikaya yuvarlanıp güvenilen jetonla birleştiriliyor, SHA-256'sının büyük
 * harfli hex'i gönderiliyor. Yuvarlama sayesinde saat farkı olan istemciler de
 * aynı değeri üretiyor.
 */
function securityToken(): string {
  const ticks = Math.floor((Date.now() / 1000 + 11_644_473_600) / 300) * 300 * 1e7;
  return createHash("sha256").update(`${ticks}${TRUSTED_TOKEN}`).digest("hex").toUpperCase();
}

function endpoint(version: number): string {
  const params = new URLSearchParams({
    TrustedClientToken: TRUSTED_TOKEN,
    "Sec-MS-GEC": securityToken(),
    // Değeri denetlenmiyor ama parametrenin bulunması şart.
    "Sec-MS-GEC-Version": `1-${version}.0.0.0`,
  });
  return `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?${params}`;
}

/**
 * Okunacak metnin sadeleştirilmesi.
 *
 * Parantezli açıklamalar (Hochdeutsch karşılıkları) ve eğik çizgiyle ayrılmış
 * seçenekler ekranda anlamlı ama sesli okunduğunda cümleyi bozuyor. Bu kural
 * tarayıcı sentezinden devralındı; ses kaynağı değişse de gerekçesi aynı.
 */
export function cleanForSpeech(text: string): string {
  return text
    .replace(/\(.*?\)/g, "")
    .replace(/[/–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Sadeleştirilmiş metni seslendirir ve MP3 baytlarını döndürür.
 *
 * Parça parça değil bütün hâlinde dönüyor: çağıran uç bunu uzun ömürlü olarak
 * önbelleğe alacak, dolayısıyla akıtmanın kazancı yok — kazanç ikinci
 * dinlemede zaten ağa hiç çıkılmamasından geliyor.
 *
 * Metnin sadeleştirilmesi burada değil `synth.ts`'te yapılıyor: iki sentez
 * yolu da aynı metni almalı, yoksa yedeğe düşünce önbellek anahtarı tutmaz.
 */
export async function synthesizeEdge(clean: string, voice: VoiceId): Promise<Buffer> {
  return connectAndSynthesize(clean, voice, browserVersion());
}

function connectAndSynthesize(
  clean: string,
  voice: VoiceId,
  version: number,
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    // Yerleşik WebSocket (undici) `headers` seçeneğini kabul ediyor; uç
    // bunlar olmadan 403 dönüyor. Ek bir paket gerekmemesinin sebebi bu.
    // Tip tanımı ikinci parametreyi yalnızca alt protokol listesi sayıyor,
    // bu yüzden yapıcı burada tekrar tipleniyor.
    const Ctor = WebSocket as unknown as new (
      url: string,
      options: { headers: Record<string, string> },
    ) => WebSocket;

    const ws = new Ctor(endpoint(version), {
      headers: {
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version}.0.0.0 Safari/537.36 Edg/${version}.0.0.0`,
        Origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
      },
    });
    ws.binaryType = "arraybuffer";

    const chunks: Buffer[] = [];
    let settled = false;

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        ws.close();
      } catch {
        /* zaten kapalı olabilir */
      }
      fn();
    };

    const timer = setTimeout(
      () => finish(() => reject(new Error("sentez zaman aşımı"))),
      SYNTH_TIMEOUT_MS,
    );

    ws.onopen = () => {
      ws.send(
        `X-Timestamp:${new Date().toString()}\r\n` +
          `Content-Type:application/json; charset=utf-8\r\n` +
          `Path:speech.config\r\n\r\n` +
          JSON.stringify({
            context: {
              synthesis: {
                audio: {
                  // Kelime/cümle sınırı bildirimlerini istemiyoruz: karaoke
                  // vurgusu yapmıyoruz, sadece boşuna trafik olurdu.
                  metadataoptions: {
                    sentenceBoundaryEnabled: false,
                    wordBoundaryEnabled: false,
                  },
                  outputFormat: OUTPUT_FORMAT,
                },
              },
            },
          }),
      );

      const lang = voice.slice(0, 5);
      const ssml =
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'>` +
        `<voice name='${voice}'><prosody rate='${rateFor(voice)}' pitch='+0Hz'>` +
        `${escapeXml(clean)}</prosody></voice></speak>`;

      ws.send(
        `X-RequestId:${randomUUID().replace(/-/g, "")}\r\n` +
          `Content-Type:application/ssml+xml\r\n` +
          `X-Timestamp:${new Date().toString()}Z\r\n` +
          `Path:ssml\r\n\r\n${ssml}`,
      );
    };

    ws.onmessage = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        if (event.data.includes("Path:turn.end")) {
          const audio = Buffer.concat(chunks);
          finish(() =>
            audio.length ? resolve(audio) : reject(new Error("ses verisi gelmedi")),
          );
        }
        return;
      }
      // İkili çerçeve: ilk iki bayt başlık uzunluğu, ardından başlık, sonra ses.
      const frame = Buffer.from(event.data as ArrayBuffer);
      if (frame.length < 2) return;
      const headerLength = frame.readUInt16BE(0);
      const body = frame.subarray(2 + headerLength);
      if (body.length) chunks.push(body);
    };

    ws.onerror = () => finish(() => reject(new Error("sentez bağlantısı kurulamadı")));

    // Sunucu beklenmedik biçimde kapatırsa Promise asılı kalmasın.
    ws.onclose = () => finish(() => reject(new Error("sentez bağlantısı kapandı")));
  });
}
