import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";
import { takeUsage } from "@/lib/premium";
import { MAX_TEXT } from "@/lib/tts/edge";
import { synthesizeSpeech } from "@/lib/tts/synth";
import { ownVoiceAudio, ownVoicesLive } from "@/lib/tts/own";
import { parseRange } from "@/lib/http-range";
import { CAST, edgeVoiceOf, isOwnVoice, OWN_VOICES, paceFromParam, pitchFromParam, TURKISH_VOICE, VOICES, type VoiceId } from "@/lib/tts/voices";

/**
 * Seslendirme ucu.
 *
 * Tasarımın tamamı **önbelleğe alınabilmek** üzerine kurulu, çünkü asıl kazanç
 * orada: aynı kelime dönüp duruyor (tekrar algoritmasının doğası bu), yani her
 * parça ömründe bir kez sentezlenip sonsuza kadar önbellekten dönebilir.
 *
 * PAYLAŞIMLI KATMAN nginx'te (2026-09-15, `/etc/nginx/conf.d/lernomi-tts-cache.conf`
 * + sitede `location = /api/tts`). Vercel bırakılınca aradaki CDN gitmişti ve
 * bir kelimeyi ilk kez dinleyen HER kullanıcı onu yeniden sentezletiyordu
 * (günlükte isteklerin ~%46'sı başka birinin istediği metnin tekrarıydı).
 * Şimdi üç katman var:
 *   1. Tarayıcı önbelleği — aynı cihazda ikinci dinleme hiç ağa çıkmıyor.
 *   2. nginx önbelleği — anahtar yalnız adres (ses, hız, perde, metin); çerezden ve
 *      alan adından bağımsız, 60 gün. Önbellekten dönen istek BU UCA HİÇ
 *      GELMİYOR: oturum, köken ve günlük tavan denetimi yalnız sentezlenecek
 *      yeni metinde çalışıyor. Bu bilinçli — içerik gizli değil, maliyet sentezde.
 *      Range yukarı gönderilmiyor, aralıkları nginx kesiyor; Set-Cookie bu uçta
 *      saklanmıyor ve gönderilmiyor (oturum sızmasın).
 *   3. Sentez zinciri (Edge → Azure) — ikisinde de olmayan her parça için.
 *
 * `rateFor` ya da ses kataloğu değişirse nginx önbelleği BOŞALTILMALI (aynı
 * adres artık farklı bir ses demek): `rm -rf /var/cache/nginx/lernomi-tts/*`.
 * Ölçüt "katalog büyüdü mü" değil, "VAR OLAN bir adres artık başka bir ses mi
 * veriyor": 2026-09-18'de sekiz kadro sesi ve `p=` perde parametresi eklendi,
 * ama eski adreslerin hiçbirinin karşılığı değişmediği (perdesiz istek hâlâ
 * `+0Hz`) için önbellek boşaltılmadı ve boşaltılması da gerekmiyordu.
 *
 * Cevap biçimi önbelleğe uygun kalmak zorunda:
 *
 *   - GET olmak zorunda. POST cevapları paylaşımlı önbelleklerde saklanmıyor.
 *   - `Cache-Control` tek başına yetmez, çünkü ara katmanların bir kısmı
 *     `s-maxage`'i tarayıcıya iletmiyor; `CDN-Cache-Control` ayrıca veriliyor.
 *   - Durum kodu 200 olmalı; hata cevapları bilerek önbelleklenmiyor
 *     (geçici bir kesinti kalıcı bir sessizliğe dönüşmesin).
 *
 * Sentez OTURUM İSTİYOR (aşağıda, günlük tavanla birlikte): açık uç Azure
 * yedeğinin ücretli kotasını herkesin harcayabildiği bir servis olurdu. Oturum
 * cevabı kullanıcıya özel yapmıyor — cevapta çerez yok, içerik herkes için
 * aynı — yani nginx önbelleği paylaşmaya devam ediyor. `sameOrigin` başka bir
 * siteden doğrudan bağlanmayı engelliyor.
 */

export const dynamic = "force-dynamic";
/** Node çalışma zamanı gerekiyor: sentez WebSocket ve Buffer kullanıyor. */
export const runtime = "nodejs";

/** Bir yıl — içerik hiç değişmiyor, bir kelimenin sesi hep aynı. */
const MAX_AGE = 31_536_000;

/*
  Uç, kullanıcının SEÇEBİLDİĞİNDEN fazlasını seslendiriyor ve ikisi de ayrı
  sebeple listede değil:
    - anlatım sesi (`TURKISH_VOICE`) — konuşmanın öğretmeni, alternatifi yok;
    - kadro sesleri (`CAST`) — diyalogda ikinci/üçüncü konuşmacıyı ayırıyor,
      seçim ekranında görünmesi anlamsız olurdu.
  Küme katalogdan TÜRETİLİYOR: yeni bir kadro sesi eklendiğinde burayı da
  düzenlemek gerekseydi unutulur ve o ses 400 `bad_voice` ile susardı.
*/
const VOICE_IDS = new Set<string>([
  ...VOICES.map((v) => v.id),
  TURKISH_VOICE,
  ...Object.values(CAST).flatMap((c) => [...c.female, ...c.male]),
  // Karakter sesleri (Defne/Aras, üç dil) ve Edge'in eski seçilebilir sesleri: 2026-09-23 öncesi
  // seçimi saklı eski bir mobil sürüm Katja/Conrad/Jenny/Guy istemeye devam ediyor, 400 ile susmasın.
  ...Object.keys(OWN_VOICES),
  "de-DE-KatjaNeural",
  "de-DE-ConradNeural",
  "en-US-JennyNeural",
  "en-US-GuyNeural",
]);

/** Hesap başına günlük sentez tavanı — gerekçesi aşağıda, kotanın koyulduğu yerde. */
const DAILY_TTS_CEILING = 2000;
/**
 * Misafir kimliği başına günlük tavan. Misafir saniyeler içinde, e-postasız
 * açılıyor (IP başına saatte 10); hesabın tavanı misafire verilseydi bir IP
 * saatte 20.000 sentez harcayabilirdi. Bir tur ~20 kelime, 500 en yoğun günü
 * de karşılıyor; misafir tavana çarparsa istemci cihaz sesine düşüyor.
 */
const GUEST_DAILY_TTS_CEILING = 500;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const text = (url.searchParams.get("t") ?? "").trim();
  const voice = url.searchParams.get("v") ?? "";
  // Hız yalnızca sabit kademeleri alıyor (bkz. `rateFor`). Serbest bir sayı
  // olsaydı her farklı hız ayrı bir önbellek girdisi açar ve isabet düşerdi.
  const slow = paceFromParam(url.searchParams.get("r"));
  // Perde de hız gibi KAPALI bir küme, aynı sebeple: her değer ayrı bir
  // önbellek girdisi ve serbest bir sayı isabeti eritirdi.
  const pitch = pitchFromParam(url.searchParams.get("p"));
  /*
    KELİME İSTEĞİ (`k=w`) — günlük tur, pratik ve yürüyüş modunun kelime katmanı.

    Bu metinlerin hepsi Defne ve Aras'la önceden üretildi ve Samet'in kararıyla (2026-09-23) YALNIZ oradan
    çalıyor: tabloda yoksa Edge karşılığına DÜŞÜLMÜYOR, 404 dönüyor ve istemci o okumayı atlıyor. Düşüş
    sessiz bir kalite kaybıydı (Defne seçmiş kullanıcı bir kelimede Katja duyardı) ve kimse fark etmezdi;
    404 günlüğe düşüyor ve kapsam kapısı (`scripts/tts-own-coverage.ts`) bunu yayından önce yakalıyor.
    İşaretsiz istek (konuşma, beceri, sohbet — henüz üretilmemiş katmanlar) Edge karşılığıyla sürüyor.
  */
  const word = url.searchParams.get("k") === "w";
  /* KARAKTER ANLATIMI (`k=n`, 2026-09-23) — yürüyüş modunun yönergeleri. Dosya varsa karakterin kendi sesi, yoksa
     aynı karakterin Edge karşılığı: anlatım kelime katmanı değil, üretimi (tur özetleri) sürerken tur susmamalı. */
  const narration = url.searchParams.get("k") === "n";

  if (!text || text.length > MAX_TEXT) {
    return NextResponse.json({ error: "bad_text" }, { status: 400 });
  }
  if (!VOICE_IDS.has(voice)) {
    return NextResponse.json({ error: "bad_voice" }, { status: 400 });
  }
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  // Kendi karakter seslerimiz (`lib/tts/own`): önceden üretilmiş statik dosya. Sentez yok, maliyet
  // yok — oturum ve günlük tavan kapısı yalnız üretilmemiş metinde kalıyor (plan bölüm 4 "Yetki").
  // YALNIZ KELİME İSTEĞİNE. İşaretsiz istek (sohbet, beceri, konuşma cümlesi) metni tabloda bulsa da
  // Edge karşılığında kalıyor: yoksa bir örnek cümleyle birebir aynı tek replik Defne'nin kendi sesiyle,
  // çevresi Katja'yla çalardı. Kelime dışı her şey üretilene kadar Katja/Conrad (Samet, 2026-09-23).
  const own = word || narration ? await ownVoiceAudio(text, voice as VoiceId, slow, pitch) : null;
  if (own) return ownResponse(req, own.audio, own.name);
  if (word && isOwnVoice(voice) && ownVoicesLive()) {
    console.warn("[tts-own] kelime tabloda yok:", voice, slow, pitch, JSON.stringify(text.slice(0, 120)));
    return NextResponse.json({ error: "no_own_audio" }, { status: 404, headers: { "cache-control": "no-store" } });
  }

  // Girişsiz sayfaların hiçbiri seslendirme kullanmıyor; açık uç, Azure yedeğinin
  // ücretli kotasını herkesin harcayabildiği bir sentez servisi olurdu.
  const who = await getUserInfo();
  const userId = who?.id ?? null;
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  /**
   * Emniyet tavanı — hesap başına GÜNLÜK sentez sayısı.
   *
   * Oturum ve aynı-köken denetimi ucu tarayıcıdan gelen isteklere kapatıyor ama
   * KAÇ istek geldiğini sınırlamıyordu: hesabı olan biri (ya da çalınmış bir
   * çerez) Azure kotasını tek başına yakabilirdi. `stt` ve `assess` uçlarındaki
   * desenin aynısı — kullanıcıya duyurulan bir sınır değil, kaçak kullanımın
   * tavanı.
   *
   * Sayı bilerek cömert: bir tur ~20 kelime, en yoğun gün bile birkaç yüzü
   * geçmiyor; önbellek (tarayıcı + CDN) zaten çoğu isteği buraya hiç
   * getirmiyor. Yani normal kullanıcı bu tavanı göremez.
   */
  const key = `${voice}|${slow}|${pitch}|${text}`;
  let hit = recent.get(key);
  if (hit) {
    // LRU: son kullanılanı sona taşı.
    recent.delete(key);
    recent.set(key, hit);
  } else {
    if (!(await takeUsage(userId, "tts_calls", "day", who?.guest ? GUEST_DAILY_TTS_CEILING : DAILY_TTS_CEILING))) {
      return NextResponse.json(
        { error: "quota" },
        { status: 429, headers: { "cache-control": "no-store" } },
      );
    }
  }

  try {
    if (!hit) {
      // Karakter sesi burada yalnız işaretsiz (kelime dışı) metinde: henüz üretilmemiş katmanın Edge karşılığı.
      hit = await synthesizeSpeech(text, edgeVoiceOf(voice as VoiceId), slow, userId, pitch);
      remember(key, hit);
    }
    return audioResponse(req, hit.audio, "audio/mpeg", hit.source);
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
 * Karakter sesi cevabı — önceden üretilmiş m4a.
 *
 * `immutable, 1 yıl` DEĞİL, bir gün + ETag: sentez sesinin aksine bu dosyalar değişebiliyor (uyarılı bir
 * kayıt dinlenip yeniden üretilince aynı adres yeni dosyayı vermeli). Ad içerik özeti olduğu için ETag
 * tam da bu; ertesi gün tarayıcı `If-None-Match` ile soruyor ve değişmediyse 304 alıyor. nginx de bu
 * `max-age`i izliyor (`proxy_cache_valid` yalnız başlık yoksa geçerli), yani yenilenen kayıt en geç bir
 * günde her yerde.
 */
function ownResponse(req: Request, audio: Buffer, name: string): Response {
  const etag = `"${name.replace(/[^\w./-]/g, "")}"`;
  const cache = `public, max-age=${OWN_MAX_AGE}`;
  if (req.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { etag, "cache-control": cache } });
  }
  return audioResponse(req, audio, "audio/mp4", "own", { etag, "cache-control": cache, "cdn-cache-control": cache });
}

const OWN_MAX_AGE = 86_400;

/** Ses cevabı — sentezlenen mp3 de, önceden üretilmiş m4a da aynı aralık kurallarıyla dönüyor. */
function audioResponse(req: Request, audio: Buffer, type: string, source: string, override: Record<string, string> = {}): Response {
  const headers: Record<string, string> = {
    "content-type": type,
    "accept-ranges": "bytes",
    // Hangi yoldan geldiği yalnızca teşhis için: Edge kırılırsa bu
    // başlıktan görülüyor, kullanıcı için bir farkı yok.
    "x-tts-source": source,
    // Tarayıcı için: `immutable` sayesinde sayfa yenilense bile yeniden
    // doğrulama isteği bile gitmiyor.
    "cache-control": `public, max-age=${MAX_AGE}, immutable`,
    // Paylaşımlı önbellek için ayrı başlık: yukarıdakinin s-maxage'i her
    // ara katmana ulaşmıyor. Bugün önde önbellek yok, başlık ileriye dönük.
    "cdn-cache-control": `public, s-maxage=${MAX_AGE}, immutable`,
    ...override,
  };
  /*
    BAYT ARALIĞI — iOS'ta `<audio>` bunsuz HİÇ çalmıyor.

    iOS'un medya katmanı bir ses dosyasını açmadan önce `Range: bytes=0-1`
    istiyor ve 206 bekliyor; düz 200 gelince oynatmayı hata ile bırakıyor.
    Uç Range başlığını yok sayıyordu, önündeki nginx de proxy'lenen 200'e
    aralık uygulamıyor (ölçüldü: 206 yok, `Accept-Ranges` yok). Sonuç: iOS
    web uygulamasında (Safari ve ana ekrana eklenmiş PWA) ses öğesi yolu hep
    düşüyor, tarayıcı sentezi de dokunuşun dışında kaldığı için susuyordu.
    Aynı `<audio>`u mobil uygulamanın iOS'taki ses köprüsü de kullanıyor.
    Android ve masaüstü Chrome aralık istemediği için orada sorun görünmüyordu.
  */
  const range = parseRange(req.headers.get("range"), audio.length);
  if (range === "unsatisfiable") {
    return new Response(null, { status: 416, headers: { "content-range": `bytes */${audio.length}`, "cache-control": "no-store" } });
  }
  if (range) {
    const [start, end] = range;
    return new Response(new Uint8Array(audio.subarray(start, end + 1)), {
      status: 206,
      headers: { ...headers, "content-range": `bytes ${start}-${end}/${audio.length}`, "content-length": String(end - start + 1) },
    });
  }
  return new Response(new Uint8Array(audio), { headers: { ...headers, "content-length": String(audio.length) } });
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

/**
 * Son sentezler — süreç içi, küçük.
 *
 * iOS bir sesi en az İKİ istekle alıyor (`bytes=0-1`, sonra geri kalanı).
 * Her istek yeniden sentezleseydi bir kelime iki kez Edge'e gider ve günlük
 * tavandan iki kez düşerdi. Önbellekten dönen istek sayılmıyor: maliyet
 * sentezde. Instance başına tutuluyor (3 instance); aralık istekleri çoğunlukla
 * aynı bağlantıdan aynı instance'a gidiyor, gitmezse yalnız bir fazla sentez olur.
 */
type Synth = Awaited<ReturnType<typeof synthesizeSpeech>>;
const recent = new Map<string, Synth>();
const RECENT_MAX_ITEMS = 400;
const RECENT_MAX_BYTES = 24 * 1024 * 1024;
let recentBytes = 0;

function remember(key: string, value: Synth) {
  recent.set(key, value);
  recentBytes += value.audio.length;
  while (recent.size > RECENT_MAX_ITEMS || recentBytes > RECENT_MAX_BYTES) {
    const oldest = recent.keys().next();
    if (oldest.done) break;
    recentBytes -= recent.get(oldest.value)?.audio.length ?? 0;
    recent.delete(oldest.value);
  }
}
