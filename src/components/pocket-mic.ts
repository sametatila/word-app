"use client";

/**
 * Cepte çalışan mikrofon.
 *
 * Tarayıcının kendi konuşma tanıyıcısı (`SpeechRecognition`) yalnızca sayfa
 * GÖRÜNÜRKEN çalışıyor; telefon kilitlenince susuyor. `getUserMedia` ile
 * açılan mikrofon akışı ise arka planda yaşamaya devam ediyor — sesli not
 * uygulamalarının ekran kapalıyken kayıt yapabilmesinin sebebi bu.
 *
 * Bu yüzden akış oturum boyunca **bir kez** açılıp AÇIK TUTULUYOR. Her tur
 * için yeniden açmak iki şeyi birden bozardı: her açılış yarım saniyeye kadar
 * gecikme ekliyor ve daha önemlisi, akış kapalıyken sekmenin arka planda
 * canlı kalması için bir sebep kalmıyor. Açık bir yakalama, tarayıcının
 * sekmeyi dondurmamasının en güçlü güvencesi.
 *
 * Kaydedici de oturum boyunca DURMADAN çalışıyor ve cevaplar halka tampondan
 * kesiliyor. Sebebi ölçüldü: önceki sürüm her cevap için `MediaRecorder`
 * kurup başlatıyordu ve arada bir kalkış gecikmesi vardı. Kullanıcı Türkçeyi
 * duyar duymaz konuşmaya başladığı için kelimenin BAŞI kayda girmiyordu.
 *
 * Whisper'a başı kesik ses vermek en kötü girdi: baştan okuyor, baş yoksa
 * uyduruyor. Aynı seslerle yapılan deney bunu birebir gösterdi —
 *
 *   tam ses          → "Der Weg", "Die Katze", "der Großvater"   (6/6)
 *   sonu kesik ses   → "Der Weg", "Die Katze", "der Großvater"   (6/6)
 *   BAŞI kesik ses   → "Vielen Dank.", "Vielen Dank.", "Krater"
 *
 * Gerçek kullanımda görülen "der Weg → Ja, das ist", "Großvater →
 * Wolfsfatter" tam olarak üçüncü satır. Sağlayıcının suçu değil: doğru sesle
 * Groq 6/6 ve 130 ms.
 *
 * Sürekli kayıtta kalkış gecikmesi yok; üstelik ön-pay ile okumanın bitişinden
 * biraz ÖNCESİ de alınabiliyor, yani erken başlayan cevap da tam giriyor.
 */

let stream: MediaStream | null = null;
let recorder: MediaRecorder | null = null;
/**
 * Halka tampon.
 *
 * `t` parçanın ELİMİZE geçtiği an. Dilim sınırları bu damgalara göre
 * seçiliyor; 200 ms'lik parçalarda hata payı da o kadar.
 */
let chunks: { t: number; data: Blob }[] = [];
/**
 * İlk parça ayrı tutuluyor: webm başlığı yalnızca onda var. Ortadan alınan
 * bir dilim tek başına geçerli bir dosya değil, başına bu eklenmek zorunda.
 */
let header: Blob | null = null;
let mime = "";

/** Parça uzunluğu — dilim çözünürlüğü bu. */
const SLICE_MS = 200;
/** Tamponda tutulan en fazla süre; gerisi düşüyor. */
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
 * Önceki sürüm tabanı pencerenin İLK parçalarından ölçüyordu ve varsayımı
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
const FLOOR_FACTOR = 3;
/** Konuşma bittikten sonra kaydın kapanması için beklenen sessiz parça sayısı. */
const TAIL_SLICES = 4;
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
 * Ön-pay okumanın ses kuyruğunu içeriyor ve o kuyruk eşiği geçebiliyor;
 * ardından kullanıcının düşünme sessizliği geliyor ve kayıt daha cevap
 * verilmeden kapanıyordu. Kullanıcının bildirdiği "mikrofon açıldığı gibi
 * kapandı" tam olarak buydu. Alt sınır, konuşmaya başlamak için her koşulda
 * bir pay bırakıyor.
 */
const MIN_LISTEN_MS = 1800;

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
 * Mikrofonu açar ve açık tutar.
 *
 * Ses işleme açık bırakıldı: yankı/gürültü bastırma ve kazanç denetimi, cepteki
 * telefonun kumaşa sürtünmesi ve sokak gürültüsü karşısında yazıya çevirmeyi
 * belirgin biçimde kolaylaştırıyor.
 */
export async function openMic(): Promise<boolean> {
  if (!micSupported()) return false;
  if (stream?.active && recorder?.state === "recording") return true;
  try {
    if (!stream?.active) {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    }
    return startRecorder();
  } catch {
    closeMic();
    return false;
  }
}

/** Sürekli kaydı başlatır ve halka tamponu doldurmaya başlar. */
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
    if (!e.data.size) return;
    // İlk parça başlık: saklanıyor ve tampona girmiyor, yoksa her dilimde iki
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

export function micOpen(): boolean {
  return Boolean(stream?.active) && recorder?.state === "recording";
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
 * Belirtilen süre kadar kaydeder.
 *
 * `null` dönmesi "kayıt yapılamadı" demek — çağıran taraf bunu duyulmamış
 * cevaptan ayırt edebilsin diye boş bir blob dönülmüyor.
 */
/**
 * Cevap klibi: şu andan itibaren `ms` kadar bekleyip, biraz da ÖNCESİNİ
 * alarak tampondan keser.
 *
 * Ön-pay olmasaydı, okumanın son hecesiyle birlikte konuşmaya başlayan
 * kullanıcının kelimesi başından kesilirdi — ölçümde bunun sonucu doğrudan
 * halüsinasyondu ("Vielen Dank.", "Krater"). İçine yalnızca okumanın sessiz
 * kuyruğu giriyor, o da tanımayı bozmuyor.
 *
 * `null` dönmesi "kayıt yapılamadı" demek; çağıran taraf bunu duyulmamış
 * cevaptan ayırt edebilsin diye boş blob dönülmüyor.
 */
export type ClipResult = { blob: Blob; ms: number } | null;

export async function recordClip(maxMs: number, preRollMs = 400): Promise<ClipResult> {
  // Algılama penceresi ön-paydan SONRA başlıyor: ön-pay klibe giriyor ama
  // "konuşma başladı" kararına karışmıyor, çünkü içinde okumanın kuyruğu var.
  const detectFrom = Date.now();
  /*
    Kaydedici ölmüşse tur SESSİZCE bitmemeli.

    İlk sürüm burada `null` dönüyordu ve sonuç ağırdı: kaydedici bir kez
    düştüğünde (ekran kapanması, sekmenin dondurulması) sonraki HER cevap
    "duyamadım" oluyordu. Kullanıcının gördüğü şey buydu. Artık önce
    toparlanmaya, olmazsa tek seferlik kayda düşülüyor — bir turu kaybetmek,
    turun tamamını kaybetmekten iyi.
  */
  if (!micOpen()) {
    if (!(await openMic())) return oneShotClip(maxMs);
    // Kaydedici yeni kuruldu: başlık parçasının gelmesi için bir soluk.
    await new Promise((r) => setTimeout(r, SLICE_MS * 2));
    if (!micOpen() || !header) return oneShotClip(maxMs);
  }
  const from = Date.now() - preRollMs;
  const deadline = Date.now() + maxMs;

  /** Pencerenin o ana kadarki gürültü tabanı ve ondan türeyen eşik. */
  const thresholdOf = (sizes: number[]): number => {
    if (!sizes.length) return SPEECH_BYTES;
    const sorted = [...sizes].sort((a, b) => a - b);
    const floor = sorted[Math.floor(sorted.length * FLOOR_PERCENTILE)];
    return Math.max(SPEECH_BYTES, Math.round(floor * FLOOR_FACTOR));
  };

  let threshold = SPEECH_BYTES;

  return new Promise<ClipResult>((resolve) => {
    let started = false;

    const tick = () => {
      const slice = chunks.filter((c) => c.t >= from);

      /*
        Pencerenin TAMAMI her turda yeniden değerlendiriliyor.

        Artımlı sayım daha ucuzdu ama taban değiştiğinde eski parçaların
        kararı sabit kalıyordu: konuşmayla başlayan bir pencerede taban önce
        yüksek kuruluyor, sonra sessizlikle düşüyor ve o parçaların yeniden
        bakılması gerekiyor. Otuz parçayı yeniden taramanın bedeli yok.
      */
      // Eşik pencerenin TAMAMINDAN (ön-pay dâhil) hesaplanıyor: gürültü tabanı
      // ne kadar çok örnekten çıkarsa o kadar isabetli.
      threshold = thresholdOf(slice.map((c) => c.data.size));

      // Karar ise yalnızca ön-pay SONRASINDAN veriliyor.
      const heardWindow = slice.filter((c) => c.t >= detectFrom).map((c) => c.data.size);

      let quiet = 0;
      let run = 0;
      started = false;
      for (const size of heardWindow) {
        if (size >= threshold) {
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
        setTimeout(tick, SLICE_MS);
        return;
      }

      if (!header) return resolve(null);

      /*
        Bayt eşiği YALNIZCA kırpmak için — reddetmek için değil.

        İlk sürümde eşiğin altında kalan klip hiç gönderilmiyordu ve gerçek
        cihazda sonuç "her cevap duyamadım" oldu. Eşik sentetik bir ses
        cihazında ölçülmüştü (sessizlik 72, konuşma 3.880 bayt); gerçek
        mikrofonun seviyesi, gürültü bastırması ve kodlayıcısı başka. Ölçüye
        güvenip kullanıcıyı susturmaktansa, şüphede kalanı gönderip Whisper'ın
        karar vermesi doğru.
      */
      const all = chunks;
      const loud = all.findIndex((c) => c.t >= from && c.data.size >= threshold);

      let first: number;
      if (loud >= 0) {
        // Konuşma bulundu: başını kaçırmamak için geriye yürünüyor. Kelimenin
        // ilk sesi (patlamalı ünsüz) çoğu zaman eşiğin altında kalıyor.
        first = loud;
        while (first > 0 && all[first - 1].data.size >= threshold) first--;
        first = Math.max(0, first - 2);
      } else {
        // Eşiğe takılan olmadı: pencerenin tamamı gönderiliyor.
        first = all.findIndex((c) => c.t >= from);
        if (first < 0) return resolve(null);
      }

      const parts = all.slice(first).map((c) => c.data);
      if (!parts.length) return resolve(null);
      resolve({
        blob: new Blob([header, ...parts], { type: mime || "audio/webm" }),
        ms: parts.length * SLICE_MS,
      });
    };

    setTimeout(tick, SLICE_MS);
  });
}

/**
 * Tek seferlik kayıt — sürekli kaydedici kurulamadığında son çare.
 *
 * Sürekli kaydın bütün avantajlarını kaybediyor (kalkış gecikmesi geri
 * geliyor), ama hiç kayıt yapamamaktan iyi.
 */
function oneShotClip(ms: number): Promise<ClipResult> {
  if (!stream?.active) return Promise.resolve(null);
  const type = pickMime();
  let rec: MediaRecorder;
  try {
    rec = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
  } catch {
    return Promise.resolve(null);
  }
  return new Promise<ClipResult>((resolve) => {
    const parts: BlobPart[] = [];
    let settled = false;
    const done = (v: ClipResult) => {
      if (settled) return;
      settled = true;
      resolve(v);
    };
    rec.ondataavailable = (e) => {
      if (e.data.size) parts.push(e.data);
    };
    rec.onstop = () =>
      done(parts.length ? { blob: new Blob(parts, { type: type || "audio/webm" }), ms } : null);
    rec.onerror = () => done(null);
    try {
      rec.start();
    } catch {
      return done(null);
    }
    setTimeout(() => {
      try {
        if (rec.state !== "inactive") rec.stop();
      } catch {
        done(null);
      }
    }, ms);
  });
}

/** Kaydı sunucuya gönderip yazıya çevirir. Başarısızsa boş dizi. */
export async function transcribe(
  clip: Blob,
  language = "de",
  /** Beklenen cevap — karara etki etmiyor, yalnızca kayda geçiyor. */
  expected = "",
): Promise<string[]> {
  const form = new FormData();
  const ext = clip.type.includes("mp4") ? "mp4" : clip.type.includes("ogg") ? "ogg" : "webm";
  form.append("audio", clip, `clip.${ext}`);
  form.append("language", language);
  if (expected) form.append("expected", expected);
  try {
    const res = await fetch("/api/stt", { method: "POST", body: form });
    if (!res.ok) return [];
    const data = (await res.json()) as { text?: string };
    const text = (data.text ?? "").trim();
    return text ? [text] : [];
  } catch {
    return [];
  }
}

/** Sunucuda yazıya çevirme açık mı — mod hangi yolu kullanacağını buna göre seçiyor. */
export async function sttAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/api/stt", { cache: "no-store" });
    if (!res.ok) return false;
    const data = (await res.json()) as { configured?: boolean };
    return data.configured === true;
  } catch {
    return false;
  }
}
