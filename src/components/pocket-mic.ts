"use client";

import { afterMs, tickClock } from "@/components/pocket-clock";
import { apiFetch, AI_CONSENT_DECLINED } from "@/lib/api-fetch";

/**
 * Yürürken modunun KAYIT yolu — tarayıcıda konuşma tanıyıcısı yokken.
 *
 * Ekranda asıl yol tarayıcının kendi tanıyıcısı (`SpeechRecognition`). Onu
 * sunmayan tarayıcıda (ör. Firefox) ya da tanıyıcı oturum içinde ölünce
 * (`walk-player` `BROWSER_DEAD`) her cevap burada kısa bir klip olarak
 * kaydedilip `/api/stt`ye gönderiliyor.
 *
 * Mikrofon ilk cevapta açılıyor ve kaydedici tur boyunca DURMADAN çalışıyor;
 * her cevap için tampon sıfırlanıp o cevabın parçaları kesintisiz alınıyor
 * (`recordAnswerClip`). Sebebi ölçüldü: cevap başına `MediaRecorder` kurup
 * başlatmanın bir kalkış gecikmesi vardı ve kullanıcı soruyu duyar duymaz
 * konuşmaya başladığı için kelimenin BAŞI kayda girmiyordu. Başı kesik ses
 * tanıyıcıya en kötü girdi: baştan okuyor, baş yoksa uyduruyor —
 *
 *   tam ses          → "Der Weg", "Die Katze", "der Großvater"   (6/6)
 *   sonu kesik ses   → "Der Weg", "Die Katze", "der Großvater"   (6/6)
 *   BAŞI kesik ses   → "Vielen Dank.", "Vielen Dank.", "Krater"
 *
 * Konuşmanın bittiği, WebAudio'ya dayanmadan parça bayt boyutundan
 * anlaşılıyor ve kayıt o an kapanıyor.
 *
 * (Eskiden burada ekran KAPALIYKEN çalışan cep yolu da vardı: halka tampondan
 * geriye kesme, PCM üstünde konuşma bölgesi bulma. Ekran kapanınca sistemin
 * mikrofonu susturduğu cihaz testinde görülünce kaldırıldı, 2026-09-17.)
 */

let stream: MediaStream | null = null;
let recorder: MediaRecorder | null = null;
/**
 * Bu cevabın parçaları.
 *
 * `t` parçanın ELİMİZE geçtiği an; işaret körlüğü bu damgaya göre.
 */
let chunks: { t: number; data: Blob }[] = [];
/**
 * İlk parça ayrı tutuluyor: webm başlığı yalnızca onda var. Sonraki
 * cevapların parçaları tek başına geçerli bir dosya değil, başına bu
 * eklenmek zorunda.
 */
let header: Blob | null = null;
let mime = "";

/** Parça uzunluğu — konuşma bitişi algısının çözünürlüğü bu. */
const SLICE_MS = 200;
/** Tamponda tutulan en fazla süre; cevaplar arasında birikmesin, gerisi düşüyor. */
const BUFFER_MS = 20_000;

/**
 * Bir parçanın "konuşma" sayılması için gereken bayt.
 *
 * Ölçüldü: Chrome'un kaydedicisi opus'u değişken hızda kodluyor ve 200 ms'lik
 * bir parça sessizlikte **72 bayt**, konuşmada **3.880 bayt**. Elli kattan
 * fazla fark; eşik ikisinin ortasında değil, sessizliğin epey üstünde ve
 * konuşmanın çok altında duruyor.
 *
 * Bu ölçüt WebAudio gerektirmiyor — önemi burada: telefon kilitlendiğinde
 * `AudioContext` askıya alınıyor ve çözümleyiciye dayalı bir çözüm tam
 * ihtiyaç duyulan yerde çalışmıyordu.
 */
const SPEECH_BYTES = 300;
/**
 * Eşik, pencerenin GÜRÜLTÜ TABANINA göre kuruluyor.
 *
 * Bir önceki sürüm tabanı pencerenin İLK parçalarından ölçüyordu ve varsayımı
 * yanlıştı: kullanıcı okumanın bitişini duyar duymaz konuşmaya başlıyor, yani
 * ilk parçalar sessizlik değil KONUŞMA oluyor. Taban konuşma seviyesine
 * kuruluyor, hiçbir parça eşiği geçemiyor ve kayıt üst sınıra kadar
 * bekliyordu. İzlemede görüldü: her cevap 7 saniyelik tavanı sonuna kadar
 * doldurdu.
 *
 * Taban artık pencerenin tamamının alt yüzdeliği ve her turda yeniden
 * hesaplanıyor: konuşma önce gelse bile, arkasından gelen sessizlik tabanı
 * aşağı çekiyor ve o ana kadarki parçalar yeniden değerlendiriliyor.
 */
const FLOOR_PERCENTILE = 0.15;
/**
 * Gürültü tabanının kaç katı konuşma sayılıyor.
 *
 * Üçten ikiye indi ve sebebi ölçüm: gerçek yürüyüş kayıtlarında klip süreleri
 * neredeyse hep 6–7 saniyeydi, yani pencere HİÇ erken kapanmıyordu. Sokakta
 * taban yüksek olduğu için üç katı hiç aşılmıyor, konuşma hiç "başlamış"
 * sayılmıyor ve her cevapta üst sınıra kadar bekleniyordu — kullanıcının "çok
 * bekliyor" dediği şey buydu. Erken kapanmaya karşı zaten üç ayrı koruma var
 * (işaret körlüğü, iki ardışık dilim, en kısa dinleme), yani gevşetmenin
 * bedeli o taraftan karşılanıyor.
 */
const FLOOR_FACTOR = 2;
/** Konuşma bittikten sonra kaydın kapanması için beklenen sessiz parça sayısı. */
const TAIL_SLICES = 3;
/**
 * Konuşma sayılması için gereken ARDIŞIK gürültülü parça.
 *
 * Tek bir gürültülü parça konuşma değil: bir tık, bir nefes ya da okumanın son
 * hecesi de eşiği geçebiliyor. Tek parçaya güvenildiğinde kayıt kullanıcı daha
 * ağzını açmadan "konuşma başladı, bitti" sayıp kapanıyordu.
 */
const MIN_SPEECH_SLICES = 2;
/**
 * Kayıt bu süreden önce kapanmıyor.
 *
 * Kaydın başı okumanın ses kuyruğunu ya da işareti içerebiliyor ve o eşiği
 * geçebiliyor; ardından kullanıcının düşünme sessizliği geliyor ve kayıt daha
 * cevap verilmeden kapanıyordu. Kullanıcının bildirdiği "mikrofon açıldığı gibi
 * kapandı" tam olarak buydu. Alt sınır, konuşmaya başlamak için her koşulda
 * bir pay bırakıyor.
 */
const MIN_LISTEN_MS = 1200;

/**
 * İşaretin algılamaya karışmadığı süre.
 *
 * Bip 140 ms ama çalması ve mikrofona dönmesi biraz sürüyor; pay bunun için.
 * Klibe girmesi zararsız — zararlı olan, "konuşma başladı" sanılması.
 */
const CUE_BLIND_MS = 350;

/** Tarayıcının kabul ettiği ilk kayıt biçimi. */
function pickMime(): string {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4", // Safari
    "audio/ogg;codecs=opus",
  ];
  const R = typeof window !== "undefined" ? window.MediaRecorder : undefined;
  if (!R) return "";
  return candidates.find((t) => R.isTypeSupported?.(t)) ?? "";
}

export function micSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.MediaRecorder !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  );
}

/**
 * Yakalama kısıtları — ses ÇIKIŞINI bozmayacak biçimde.
 *
 * `echoCancellation` masum bir istek değil: Android/Chrome yankı bastırmayı
 * gördüğünde yakalamayı "konuşma" yoluna alıyor ve o yol ÇIKIŞI da içine
 * çekiyor. Sonuç, mikrofon açık kaldığı sürece çalan her şeyin bozulması —
 * Bluetooth kulaklıkta A2DP bırakılıp HFP'ye düşülüyor (16 kHz, tek kanal:
 * telefon görüşmesi sesi), hoparlörde de çıkış incelip boğuklaşıyor. Mikrofon
 * tur boyunca açık tutulduğu için bu, turun TAMAMI boyunca sürüyordu.
 *
 * Yankı bastırmadan vazgeçmenin bedeli burada küçük: kulaklıkta hoparlörden
 * mikrofona giden yol zaten yok, hoparlörde de kayıt okuma BİTTİKTEN sonra
 * başlıyor. Karşılığında çıkış kalitesi turun tamamında korunuyor.
 *
 * Gürültü bastırma ve kazanç denetimi KALIYOR: ikisi yazılımda çalışıyor,
 * çıkış yolunu değiştirmiyor ve sokak gürültüsü karşısında yazıya çevirmeyi
 * belirgin biçimde kolaylaştırıyor.
 *
 * Sıra bir geri çekilme merdiveni: ilki yankı bastırmanın gerçekten kapalı
 * olmasını ŞART koşuyor (düz değer yalnızca "tercih" sayılır ve sessizce
 * yok sayılabilir), cihaz bunu yapamıyorsa sırayla gevşetiliyor. Hiç akış
 * alamamak, kalitesiz akıştan kötü.
 */
const CAPTURE_TRIES: MediaTrackConstraints[] = [
  { echoCancellation: { exact: false }, noiseSuppression: true, autoGainControl: true },
  { echoCancellation: false },
  {},
];

/**
 * Mikrofonu SUSTURULMUŞ hâlde alır; kayıt `activateMic` ile açılıyor.
 *
 * Kısıt merdiveni `CAPTURE_TRIES` sırasıyla deneniyor.
 */
async function openMic(): Promise<boolean> {
  if (!micSupported()) return false;
  if (stream?.active) return true;
  for (const audio of CAPTURE_TRIES) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio });
      // Varsayılan susturulmuş: kayıt yolu istendiğinde açılıyor.
      stream.getAudioTracks().forEach((t) => (t.enabled = false));
      return true;
    } catch {
      closeMic();
    }
  }
  return false;
}

/** Kayıt yolunu açar: parçalar açılır ve sürekli kayıt başlar. */
function activateMic(): boolean {
  if (!stream?.active) return false;
  stream.getAudioTracks().forEach((t) => (t.enabled = true));
  return startRecorder();
}

/** Sürekli kaydı başlatır ve tamponu doldurmaya başlar. */
function startRecorder(): boolean {
  if (!stream?.active) return false;
  if (recorder?.state === "recording") return true;
  mime = pickMime();
  try {
    recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  } catch {
    recorder = null;
    return false;
  }
  chunks = [];
  header = null;

  recorder.ondataavailable = (e) => {
    // Kaydedici 200 ms'de bir ateşliyor: saate ek bir nabız (bkz. pocket-clock).
    tickClock();
    if (!e.data.size) return;
    // İlk parça başlık: saklanıyor ve tampona girmiyor, yoksa ilk klipte iki
    // kez yer alırdı.
    if (!header) {
      header = e.data;
      return;
    }
    const now = Date.now();
    chunks.push({ t: now, data: e.data });
    const cutoff = now - BUFFER_MS;
    while (chunks.length && chunks[0].t < cutoff) chunks.shift();
  };
  // Kaydedici kendiliğinden durursa (sekme dondu, cihaz değişti) yeniden
  // kuruluyor: durmuş bir kaydedici sessizce boş klip üretirdi.
  recorder.onerror = () => restart();
  recorder.onstop = () => {
    if (stream?.active) restart();
  };

  try {
    recorder.start(SLICE_MS);
    return true;
  } catch {
    recorder = null;
    return false;
  }
}

function restart() {
  recorder = null;
  header = null;
  chunks = [];
  if (stream?.active) startRecorder();
}

/** Kayıt yolu şu anda dönüyor mu. */
function micOpen(): boolean {
  return Boolean(stream?.active) && recorder?.state === "recording";
}

/** Akış elimizde mi — yalnız kaydın açılması mı yetiyor. */
function micHeld(): boolean {
  return Boolean(stream?.active);
}

export function closeMic() {
  try {
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = null;
      recorder.stop();
    }
  } catch {
    /* zaten durmuş olabilir */
  }
  recorder = null;
  header = null;
  chunks = [];
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
}

/**
 * `null` "kayıt yapılamadı" demek — çağıran taraf bunu duyulmamış cevaptan
 * ayırt edebilsin diye boş bir blob dönülmüyor.
 */
export type ClipResult = { blob: Blob; ms: number } | null;

/**
 * Bir cevabın klibi — SÜREKLİ kaydediciden, geçerli webm olarak.
 *
 * Geriye yürüyerek kesmek geçerli webm VERMİYOR (ölçüldü): ortadan başlayan
 * dilim bir küme sınırında olmuyor ve sağlayıcılar "bozuk dosya" (400)
 * diyordu. Bu yüzden cevap başında tampon sıfırlanıyor (başlık korunuyor) ve
 * cevabın parçaları BAŞTAN SONA kesintisiz gidiyor: başlık + ardışık küme(ler)
 * geçerli bir dosya. Konuşma bitişi bayt boyutundan.
 *
 * `signal` iptal için: süresi dolan dinleme kaydı sürdürüp sunucuya
 * göndermesin (üretimde aynı saniyede iki çağrı görülmüştü).
 */
export async function recordAnswerClip(maxMs: number, signal?: AbortSignal): Promise<ClipResult> {
  if (signal?.aborted) return null;
  // İlk cevapta (ya da kaydedici düştüyse) mikrofon burada açılıyor; başlık
  // parçasının gelmesi için kısa bir soluk.
  if (!micOpen()) {
    if (!micHeld() && !(await openMic())) return null;
    activateMic();
    await new Promise<void>((r) => afterMs(SLICE_MS * 3, r));
  }
  if (!header) return null;

  // Bu cevabın parçaları baştan: geriye yürüme yok, kesintisiz.
  chunks = [];
  const detectFrom = Date.now() + CUE_BLIND_MS;
  const deadline = Date.now() + maxMs;

  return new Promise<ClipResult>((resolve) => {
    let settled = false;
    const done = (v: ClipResult) => {
      if (settled) return;
      settled = true;
      resolve(v);
    };
    signal?.addEventListener("abort", () => done(null), { once: true });

    const tick = () => {
      if (signal?.aborted) return done(null);
      // Kaydedici öldüyse (akış bırakıldı) beklemenin anlamı yok.
      if (!micOpen()) return done(header && chunks.length ? { blob: new Blob([header, ...chunks.map((c) => c.data)], { type: mime || "audio/webm" }), ms: chunks.length * SLICE_MS } : null);

      const sizes = chunks.map((c) => c.data.size);
      const sorted = [...sizes].sort((a, b) => a - b);
      const floor = sorted.length ? sorted[Math.floor(sorted.length * FLOOR_PERCENTILE)] : 0;
      const threshold = Math.max(SPEECH_BYTES, Math.round(floor * FLOOR_FACTOR));

      let started = false;
      let quiet = 0;
      let run = 0;
      for (const c of chunks) {
        if (c.t < detectFrom) continue; // işaret körlüğü
        if (c.data.size >= threshold) {
          run++;
          if (run >= MIN_SPEECH_SLICES) {
            started = true;
            quiet = 0;
          }
        } else {
          run = 0;
          if (started) quiet++;
        }
      }

      const elapsed = Date.now() - detectFrom;
      const finished = started && quiet >= TAIL_SLICES && elapsed >= MIN_LISTEN_MS;
      if (!finished && Date.now() < deadline) {
        afterMs(SLICE_MS, tick);
        return;
      }
      if (!header || !chunks.length) return done(null);
      done({ blob: new Blob([header, ...chunks.map((c) => c.data)], { type: mime || "audio/webm" }), ms: chunks.length * SLICE_MS });
    };

    afterMs(SLICE_MS, tick);
  });
}

/**
 * Yazıya çevirmenin üst sınırı.
 *
 * Azure ve Deepgram tipik olarak bir saniyenin altında dönüyor; sekiz saniye
 * ağın kötü olduğu ama çalıştığı hâli kapsıyor. Ötesi artık gecikme değil,
 * kopukluk.
 */
const STT_TIMEOUT_MS = 8_000;
/** Yalnızca "yapılandırılmış mı" sorusu — kısa tutulabilir. */
const PROBE_TIMEOUT_MS = 5_000;
/** Bunun altındaki güven, duyulmamış sayılıyor. Bkz. `transcribe`. */
const MIN_CONFIDENCE = 0.4;
/** Ses saniyesi tahmini için: webm/opus ~2 kB/sn. Yalnız kota izlemesinde. */
const OPUS_BYTES_PER_SEC = 2_000;

export type PocketHeard = {
  /** Duyulan metin — hiç duyulmadıysa boş. */
  alternatives: string[];
  /** Sağlayıcının güveni (0–1), verdiyse. */
  confidence?: number;
  provider?: string;
  /** Sunucuya giden ses (sn); gönderilmediyse 0 — kota izlemesi için. */
  sentSeconds: number;
  /**
   * Boş dönüşün sebebi.
   *
   *   network — istek gitti, sunucu hata/400 döndü.
   *   empty   — sunucu boş metin döndü (Deepgram/Azure sessizliği).
   *   premium — sunucu 403 `premium_required` döndü: sınav bağlamı taşımayan
   *             sunucu STT'si ücretsiz katmanda kapalı. Bu bir HATA DEĞİL, bir
   *             kapı; çağıranın onu "duyamadım" diye göstermemesi için ayrı
   *             tutuluyor.
   *   consent — sesin sağlayıcıya gitmesine izin yok (`ai_voice`): klip sunucudan
   *             öteye gitmedi. O da bir kapı, "duyamadım" değil.
   */
  reason?: "network" | "empty" | "low_confidence" | "aborted" | "premium" | "consent";
};

/**
 * Kaydı sunucuya gönderip yazıya çevirir.
 *
 * Klip GEÇERLİ webm olarak gidiyor (bkz. `recordAnswerClip`) ve sunucuda ham
 * hâliyle çözülüyor — istemcide WAV'a çevirme YOK. webm'i Deepgram ve Groq ham
 * çözüyor (chat-providers `SttMode`).
 *
 * Kip sayfanın görünürlüğünden: gizliyse `walk`, görünürse `default`. Yürüyüş
 * gizlenen sayfada durduğu için pratikte hep `default`; seçim yine burada,
 * çünkü sahibin şartı "ekran açıkken asla Azure" istemcinin elinde olmamalı —
 * görünür sayfa `walk` isteyemiyor. Yetki kararı `mode`a bağlı DEĞİL (bkz.
 * api/stt).
 */
export async function transcribe(
  clip: Blob,
  language = "de",
  /** Beklenen cevap — karara etki etmiyor, yalnızca kayda geçiyor. */
  expected = "",
  opts: { signal?: AbortSignal } = {},
): Promise<PocketHeard> {
  const sentSeconds = clip.size / OPUS_BYTES_PER_SEC;
  const none = (reason: PocketHeard["reason"]): PocketHeard => ({ alternatives: [], sentSeconds, reason });
  if (opts.signal?.aborted) return none("aborted");

  const hidden = typeof document !== "undefined" && document.visibilityState === "hidden";
  const form = new FormData();
  const ext = clip.type.includes("wav") ? "wav" : clip.type.includes("mp4") ? "mp4" : clip.type.includes("ogg") ? "ogg" : "webm";
  form.append("audio", clip, `clip.${ext}`);
  form.append("language", language);
  form.append("mode", hidden ? "walk" : "default");
  if (expected) form.append("expected", expected);
  try {
    const res = await apiFetch("/api/stt", {
      method: "POST",
      body: form,
      // Zaman aşımı ŞART. Cepteki telefon zayıf sinyalde bir isteği dakikalarca
      // asılı tutabiliyor ve tur o istekte donuyordu. Süresi geçen bir yazıya
      // çevirme zaten işe yaramaz: kullanıcı çoktan sıradakini bekliyor.
      timeoutMs: STT_TIMEOUT_MS,
      signal: opts.signal,
      /* İZİN DİYALOĞU BURADA AÇILMIYOR. Tur sesli ve ekrana bakılmadan
         (çoğu zaman karartılmış katmanın altında) sürüyor: açılan bir
         diyaloğu gören olmaz ve tur onun cevabını beklerken donardı. İzin
         yürüyüş başlarken soruluyor
         (`walk-player` `begin`); burada yoksa klip gitmiyor ve sebep
         `consent` olarak dönüyor. */
      consentPrompt: false,
    });
    /*
      403 PREMIUM KAPISI — "ağ hatası" değil.

      Sınav bağlamı taşımayan istek sunucuda `canPocketWalk` ile korunuyor ve
      ücretsiz katmanda günlük hak sıfır, yani ücretsiz bir hesapta bu istek HER
      ZAMAN 403 döner. Burada hepsi `network`e düşüyordu ve tur onu "duyamadım"
      diye okuyordu: kullanıcı mikrofonunun bozuk olduğunu sanıyordu. Mobilde
      aynı hata ölçülüp düzeltildi (2026-09-09), web de aynı davranıyor artık.
    */
    if (res.status === 403) {
      const body = await res.json().catch(() => null) as { error?: string } | null;
      return none(body?.error === "premium_required" ? "premium" : body?.error === AI_CONSENT_DECLINED ? "consent" : "network");
    }
    if (!res.ok) return none("network");
    const data = (await res.json()) as { text?: string; confidence?: number; provider?: string };
    const text = (data.text ?? "").trim();
    if (!text) return { ...none("empty"), confidence: data.confidence, provider: data.provider };
    /*
      Güveni düşük metin, metin sayılmıyor.

      Tanıyıcı gürültüyü ve arkadan gelen konuşmayı da kelimeye çeviriyor —
      duyacak bir şey verilince duyuyor ve bazen başka bir dilde duyuyor.
      Ayırt eden şey metnin kendisi değil, tanıyıcının o metne ne kadar
      inandığı. Eşik gevşek: daha önce ölçülmeden konan bir eşik gerçek
      cihazda "her cevap duyamadım"a dönüşmüştü. Her çağrının güveni
      `ai_usage`'a yazılıyor; eşik veriyle sıkılır.
    */
    if (typeof data.confidence === "number" && data.confidence < MIN_CONFIDENCE) {
      return { ...none("low_confidence"), confidence: data.confidence, provider: data.provider };
    }
    return { alternatives: [text], confidence: data.confidence, provider: data.provider, sentSeconds };
  } catch {
    return none(opts.signal?.aborted ? "aborted" : "network");
  }
}

/** Sunucuda yazıya çevirme açık mı — mod hangi yolu kullanacağını buna göre seçiyor. */
export async function sttAvailable(): Promise<boolean> {
  try {
    const res = await apiFetch("/api/stt", {
      cache: "no-store",
      timeoutMs: PROBE_TIMEOUT_MS,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { configured?: boolean };
    return data.configured === true;
  } catch {
    return false;
  }
}
