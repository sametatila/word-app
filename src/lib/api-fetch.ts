import { aiConsentShouldPrompt, asAiConsentRequired, type AiConsentRequired } from "@/lib/ai-consent-shared";

/**
 * Zaman aşımlı `fetch` — mobil `api/client.ts`in karşılığı.
 *
 * ASILI KALAN İSTEK SONSUZA KADAR ASILI KALIYORDU. Tarayıcının `fetch`i
 * kendiliğinden vazgeçmiyor: kaptif portalda, zayıf hücresel bağlantıda ya da
 * sunucu yanıt vermeyi bıraktığında istek yıllarca bekleyebilir. Ekranda
 * duran şey de iskeletin kendisi oluyor — kullanıcı "yükleniyor" görüyor,
 * oysa hiçbir şey yüklenmiyor ve bir daha da yüklenmeyecek.
 *
 * Android'de böyle değil: HER çağrı `api()`den geçiyor ve 25 saniyede
 * vazgeçip hatayı fırlatıyor; ekranların zaten yazılı olan "yüklenemedi ·
 * tekrar dene" dalı devreye giriyor. Web'de ölçüm elli yedi istemci
 * çağrısından elli dördünün hiçbir sınırı olmadığını gösterdi.
 *
 * Süre MOBİLDEKİYLE AYNI SAYI ve burada adı var: iki taraf ayrı ayrı
 * değiştirilemesin.
 *
 * DEĞERLENDİRME ÇAĞRILARI BU TAVANIN DIŞINDA ve öyle kalmalı: yapay zekâ
 * yanıtı 25 saniyeden uzun sürebiliyor, o yüzden kendi (daha uzun) süreleri
 * var ve ikisi de iki platformda eşleştirilmiş durumda (`ASSESS_TIMEOUT_MS`,
 * `ASSESS_ROLEPLAY_TIMEOUT_MS`). Yine de BU İŞLEVDEN geçiyorlar, sürelerini
 * `timeoutMs` ile vererek: yapay zekâ rızası yakalayıcısı (aşağıda) yalnız
 * burada.
 */
export const API_TIMEOUT_MS = 25_000;

/**
 * SOHBET ÜRETİMİ GENEL TAVANA DÜŞÜYORDU.
 *
 * `/api/roleplay` bir cevap yazdırıyor (değerlendirme gibi hazır metni
 * puanlamıyor) ve uzun bir turda kırk saniyeye kadar sürebiliyor. İki
 * çağıran da (`lessons/lesson-player`, `lessons/roleplay-exam`) kendi
 * süresini vermediği için 25 saniyede kesiliyordu — Android aynı çağrıyı
 * kırk beş saniye bekliyor (`api/client` `ROLEPLAY_TIMEOUT_MS`), yani
 * ağır bir cevap mobilde geliyor, webde "sohbet kurulamadı" oluyordu.
 * Yanıt AKIŞLI okunduğu için bu tavan akışın tamamını kapsıyor: sinyal
 * gövde okunurken de geçerli.
 *
 * Sayı ve ad mobildekiyle birebir aynı: iki taraf ayrı ayrı değişmesin.
 */
export const ROLEPLAY_TIMEOUT_MS = 45_000;

export type ApiFetchInit = RequestInit & {
  /**
   * Bu çağrının süre tavanı. `signal: AbortSignal.timeout(n)` yazmaktan farkı:
   * süre HER DENEMEDE baştan başlıyor. Rıza ekranı açıkken geçen süre isteğin
   * süresinden sayılmamalı — kullanıcı sağlayıcı listesini okurken yirmi
   * saniyelik değerlendirme tavanı doluyor ve onaydan sonraki deneme daha
   * yola çıkmadan zaman aşımına düşüyordu. `signal` ile birlikte verilebilir:
   * hangisi önce keserse.
   */
  timeoutMs?: number;
  /**
   * `false` → izin yoksa ekran AÇILMAZ, doğrudan "vazgeçildi" yanıtı döner.
   * Ekranın görülemediği çağrılar için: ekran kapalıyken cepte yürüyüş.
   */
  consentPrompt?: boolean;
};

/**
 * YAPAY ZEKÂ RIZASI — kırk çağrı yerine tek yakalayıcı; mobil `api/client` ile
 * aynı sözleşme.
 *
 * Sunucu metni ya da sesi sağlayıcıya göndermeden önce izni kendisi okuyor ve
 * izin yoksa isteği HİÇ İLETMEDEN `403 { error: "ai_consent_required",
 * purpose, state }` döndürüyor (`lib/ai-consent`). İstemcinin işi o anda izin
 * ekranını açmak: onay gelirse AYNI istek BİR KEZ yeniden gidiyor, gelmezse
 * çağırana `403 { error: "ai_consent_declined" }` dönüyor ve çağrı yerinin
 * zaten var olan `!res.ok` dalı (senaryolu konuşma, kural tabanlı puan)
 * devralıyor.
 *
 * Ekranı açan kod burada değil (`lib/ai-consent-client` +
 * `components/ai-consent-dialog`); o modül bu dosyayı içe aktardığı için ters
 * yönde bir kayıt kancası kuruldu, yoksa döngüsel içe aktarma olurdu.
 */
export const AI_CONSENT_DECLINED = "ai_consent_declined";

type ConsentHandler = (req: AiConsentRequired) => Promise<boolean>;
let consentHandler: ConsentHandler | null = null;

export function setAiConsentHandler(h: ConsentHandler | null): void {
  consentHandler = h;
}

export async function apiFetch(input: string, init?: ApiFetchInit): Promise<Response> {
  const res = await send(input, init, false);
  if (res.status !== 403) return res;
  /* Gövde KOPYADAN okunuyor: rıza isteği değilse (premium kapısı da 403)
     çağıran asıl yanıtı yine kendisi çözebilmeli. */
  const req = asAiConsentRequired(await res.clone().json().catch(() => null));
  if (!req) return res;
  if (init?.consentPrompt !== false && (await askConsent(req))) {
    /* TEK yeniden deneme: ikinci kez 403 gelirse olduğu gibi dönüyor, döngü yok. */
    return send(input, init, true);
  }
  return new Response(JSON.stringify({ error: AI_CONSENT_DECLINED }), {
    status: 403,
    headers: { "content-type": "application/json" },
  });
}

/**
 * Ekran açılacak mı, açıldıysa onay geldi mi. "declined" ekranı KENDİLİĞİNDEN
 * açtırmaz (`aiConsentShouldPrompt`): hayır diyene her çağrıda yeniden sormak
 * rızayı yıpratarak koparmak olurdu; kapalı amaç Ayarlar'dan açılıyor. Ekranın
 * sahibi bağlı değilse de cevap "hayır" — izin ekranı gösterilemiyorsa izin de
 * alınmış sayılmaz.
 */
async function askConsent(req: AiConsentRequired): Promise<boolean> {
  if (!aiConsentShouldPrompt(req.state) || !consentHandler) return false;
  try {
    return await consentHandler(req);
  } catch {
    return false;
  }
}

function send(input: string, init: ApiFetchInit | undefined, retry: boolean): Promise<Response> {
  return fetch(input, { ...init, signal: signalFor(init, retry) });
}

/**
 * Denemenin sinyali.
 *
 *   timeoutMs var   süre her denemede baştan; çağıranın sinyali de geçerli
 *   yalnız signal   çağıranın kendi ömrü, dokunulmuyor: iptal edilebilir bir
 *                   istek (ekrandan çıkınca durduruluyor) ömrünü kendisi
 *                   yönetiyor. Ama o sinyal bir SÜRE sınırıysa ve izin ekranı
 *                   açıkken dolduysa, yeniden deneme onu miras almıyor.
 *   hiçbiri         genel tavan
 */
function signalFor(init: ApiFetchInit | undefined, retry: boolean): AbortSignal {
  const own = init?.signal ?? null;
  if (init?.timeoutMs) return own ? anySignal(own, AbortSignal.timeout(init.timeoutMs)) : AbortSignal.timeout(init.timeoutMs);
  if (!own) return AbortSignal.timeout(API_TIMEOUT_MS);
  if (retry && own.aborted && (own.reason as { name?: string } | undefined)?.name === "TimeoutError") {
    return AbortSignal.timeout(API_TIMEOUT_MS);
  }
  return own;
}

/** İki sinyalden hangisi önce keserse. `AbortSignal.any` Safari 17.4'ten eski sürümlerde yok. */
function anySignal(a: AbortSignal, b: AbortSignal): AbortSignal {
  if (typeof AbortSignal.any === "function") return AbortSignal.any([a, b]);
  const ctl = new AbortController();
  for (const s of [a, b]) {
    if (s.aborted) {
      ctl.abort(s.reason);
      break;
    }
    s.addEventListener("abort", () => ctl.abort(s.reason), { once: true });
  }
  return ctl.signal;
}
