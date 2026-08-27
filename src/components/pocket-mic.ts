"use client";

import { afterMs, tickClock } from "@/components/pocket-clock";
import { decodePcm, encodeWav } from "@/lib/pronounce-client";
import { trimSpeech } from "@/lib/vad";

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
 *
 * Sunucuya giden şey kesilen pencere değil, içindeki KONUŞMA. Pencere PCM'e
 * çözülüp konuşma bölgesi bulunuyor (lib/vad) ve yalnız o parça gidiyor;
 * konuşma yoksa istek hiç atılmıyor. Sebep kota: cep yolunun ana hattı Azure
 * ve ücretsiz katmanı ayda beş saat. Ölçüldü — 6 saniyelik pencereler 1–1,4
 * saniyeye indi, güven düşmedi; uzun sessizlik doğruluğu bile bozuyordu.
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
 * Ön-pay okumanın ses kuyruğunu içeriyor ve o kuyruk eşiği geçebiliyor;
 * ardından kullanıcının düşünme sessizliği geliyor ve kayıt daha cevap
 * verilmeden kapanıyordu. Kullanıcının bildirdiği "mikrofon açıldığı gibi
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
 * oturum boyunca açık tutulduğu için bu, turun TAMAMI boyunca sürüyordu.
 *
 * Yankı bastırmadan vazgeçmenin bedeli burada küçük: kulaklıkta hoparlörden
 * mikrofona giden yol zaten yok, hoparlörde de kayıt okuma BİTTİKTEN sonra
 * başlıyor. Karşılığında çıkış kalitesi turun tamamında korunuyor.
 *
 * Gürültü bastırma ve kazanç denetimi KALIYOR: ikisi yazılımda çalışıyor,
 * çıkış yolunu değiştirmiyor ve cepteki telefonun kumaşa sürtünmesi ile sokak
 * gürültüsü karşısında yazıya çevirmeyi belirgin biçimde kolaylaştırıyor.
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
 * Mikrofonu AÇIK ama SUSTURULMUŞ hâlde alır.
 *
 * Sıra hayati: gerçek telefonda ekran kilitlendikten SONRA `getUserMedia`
 * reddediliyor. Kullanıcı ekranı kapattığında mikrofonu açmaya çalışan bir
 * akış, isteği anında düşürüp cevabı "duyamadım" yazıyordu — hem de mikrofon
 * açılma sesiyle aynı anda, çünkü hiç kayıt başlamıyordu.
 *
 * Bu yüzden akış oturum başında, ekran AÇIKKEN alınıyor. Ama tarayıcının
 * konuşma tanıyıcısıyla çekişmemesi için parçalar kapatılıyor: izin ve cihaz
 * elimizde kalıyor, ses akmıyor. Ekran kapandığında yalnızca açılması yetiyor.
 */
export async function openMic(): Promise<boolean> {
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

/**
 * Akışın gerçekte hangi kısıtlarla açıldığı.
 *
 * İstemek ile almak aynı şey değil: `exact` dışındaki kısıtlar sessizce yok
 * sayılabiliyor ve cihazın ne yaptığı ancak buradan görülüyor. Ses kalitesi
 * şikâyetinde ilk bakılacak yer burası.
 */
export function micSettings(): MediaTrackSettings | null {
  return stream?.getAudioTracks()[0]?.getSettings() ?? null;
}

/** Kayıt yolunu açar: parçalar açılır ve sürekli kayıt başlar. */
export function activateMic(): boolean {
  if (!stream?.active) return false;
  stream.getAudioTracks().forEach((t) => (t.enabled = true));
  return startRecorder();
}

/** Kayıt yolunu kapatır ama akışı BIRAKMAZ — ekran yeniden kapanabilir. */
export function deactivateMic() {
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
  stream?.getAudioTracks().forEach((t) => (t.enabled = false));
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
    // Kaydedici gizli sayfada da 200 ms'de bir ateşliyor: saatin en güvenilir
    // ikinci nabzı bu (bkz. pocket-clock).
    tickClock();
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

/** Kayıt yolu şu anda dönüyor mu. */
export function micOpen(): boolean {
  return Boolean(stream?.active) && recorder?.state === "recording";
}

/** Akış elimizde mi — ekran kapanınca açılabilir mi. */
export function micHeld(): boolean {
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
 *
 * `signal` iptal için: süresi dolan ya da ekranın geri açılmasıyla anlamını
 * yitiren bir dinleme kaydı sürdürmesin. Eskiden süresi dolan dinleme arkada
 * kaydı bitirip sunucuya da gönderiyordu — üretimde aynı saniyede iki çağrı
 * görüldü, saf kota israfı.
 */
export type ClipResult = { blob: Blob; ms: number } | null;

export async function recordClip(maxMs: number, preRollMs = 400, signal?: AbortSignal): Promise<ClipResult> {
  if (signal?.aborted) return null;
  /*
    Algılama penceresi ön-paydan ve İŞARETTEN sonra başlıyor.

    Ön-pay klibe giriyor ama "konuşma başladı" kararına karışmıyor, çünkü
    içinde okumanın kuyruğu var. Aynısı mikrofon işareti için de gerekli ve
    bunu gerçek yürüyüş verisi gösterdi: bip 140 ms sürüyor, yani iki dilime
    yayılabiliyor ve "iki ardışık gürültülü dilim" koşulunu tek başına
    karşılıyor. Ardından kullanıcı daha konuşmaya başlamadan gelen sessizlik
    kuyruğu dolduruyor ve kayıt bir saniyede kapanıyordu — sahadaki bir
    saniyelik ve BOŞ dönen kliplerin hepsi buydu (die Heimat, schlafen, hallo,
    der Termin...).
  */
  const detectFrom = Date.now() + CUE_BLIND_MS;
  /*
    Kaydedici ölmüşse tur SESSİZCE bitmemeli.

    İlk sürüm burada `null` dönüyordu ve sonuç ağırdı: kaydedici bir kez
    düştüğünde (ekran kapanması, sekmenin dondurulması) sonraki HER cevap
    "duyamadım" oluyordu. Kullanıcının gördüğü şey buydu. Artık önce
    toparlanmaya, olmazsa tek seferlik kayda düşülüyor — bir turu kaybetmek,
    turun tamamını kaybetmekten iyi.
  */
  if (!micOpen()) {
    // Akış elimizdeyse yalnızca etkinleştirmek yetiyor; yoksa açmayı deniyoruz
    // (ekran kapalıyken reddedilebilir, o yüzden asıl açılış oturum başında).
    if (!micHeld() && !(await openMic())) return oneShotClip(maxMs);
    activateMic();
    // Başlık parçasının gelmesi için bir soluk.
    await new Promise<void>((r) => afterMs(SLICE_MS * 3, r));
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
    signal?.addEventListener("abort", () => resolve(null), { once: true });

    const tick = () => {
      if (signal?.aborted) return resolve(null);
      // Kaydedici bu arada öldüyse (ekran açıldı, akış kapandı) süre dolana
      // kadar sessiz beklemenin anlamı yok.
      if (!header && !micOpen()) return resolve(null);
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
        // `setTimeout` DEĞİL: sayfa gizliyken zamanlayıcılar dakikada bire
        // kısılıyor ve bu döngü tam ekran kapalıyken, yani asıl gerekli
        // olduğu anda duruyordu. Sonuç, cevap penceresinin hiç kapanmaması ve
        // turun üst sınıra kadar sessiz beklemesiydi. Saat nabzını kaydedicinin
        // kendi parçalarından da alıyor (bkz. pocket-clock).
        afterMs(SLICE_MS, tick);
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
      /*
        Pencerenin ilk parçası — klibin ASLA gerisine geçemeyeceği sınır.

        Geriye yürüme buna bağlanmasa ne olduğu gerçek yürüyüş verisinde
        görüldü: altı saniyelik pencere için 16 ve 17 SANİYELİK klipler gitti
        ve içlerinde önceki cevaplar vardı ("dabei sein" sorulurken "der weg
        dabei sein", "schlafen" sorulurken "wie machst schlafen" duyuldu).
        Sebep, sokakta gürültü tabanının yüksek olması: neredeyse her parça
        eşiği geçiyor, geriye yürüme de durmadan yirmi saniyelik tamponun
        başına kadar gidiyordu.
      */
      const windowStart = all.findIndex((c) => c.t >= from);
      if (windowStart < 0) return resolve(null);
      const loud = all.findIndex((c) => c.t >= from && c.data.size >= threshold);

      let first: number;
      let last: number;
      if (loud >= 0) {
        // Konuşma bulundu: başını kaçırmamak için geriye yürünüyor. Kelimenin
        // ilk sesi (patlamalı ünsüz) çoğu zaman eşiğin altında kalıyor —
        // ama pencerenin gerisine ASLA geçilmiyor.
        first = loud;
        while (first > windowStart && all[first - 1].data.size >= threshold) first--;
        first = Math.max(windowStart, first - 2);

        /*
          Klibin SONU da kırpılıyor.

          Önceden pencerenin sonuna kadar her şey gönderiliyordu: kullanıcı
          sustuktan sonraki sessizlik, sokak gürültüsü ve —asıl sorun— arkadan
          gelen konuşmalar. Tanıyıcıya duyacak bir şey verilince duyuyor;
          "arkadaki konuşmaları da algılıyor, başka dillerde kelimeler duyduğunu
          iddia ediyor" şikâyetinin doğrudan kaynağı buydu.

          Son gürültülü parçadan sonra yalnızca kuyruk payı kalıyor: kelimenin
          sönen sonunu kesmemek için gerekli, fazlası zararlı.
        */
        last = all.length - 1;
        while (last > first && all[last].data.size < threshold) last--;
        last = Math.min(all.length - 1, last + TAIL_SLICES);
      } else {
        // Eşiğe takılan olmadı: pencerenin tamamı gönderiliyor. Reddetmek
        // ölçüldü ve gerçek cihazda "her cevap duyamadım" oldu — karar
        // tanıyıcıya bırakılıyor (bkz. aşağıdaki not).
        first = windowStart;
        last = all.length - 1;
      }

      const parts = all.slice(first, last + 1).map((c) => c.data);
      if (!parts.length) return resolve(null);
      resolve({
        blob: new Blob([header, ...parts], { type: mime || "audio/webm" }),
        ms: parts.length * SLICE_MS,
      });
    };

    afterMs(SLICE_MS, tick);
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
    afterMs(ms, () => {
      try {
        if (rec.state !== "inactive") rec.stop();
      } catch {
        done(null);
      }
    });
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
/** Sunucuya giden sesin örnekleme hızı — sağlayıcıların ortak biçimi. */
const SEND_RATE = 16_000;

export type PocketHeard = {
  /** Duyulan metin — hiç duyulmadıysa boş. */
  alternatives: string[];
  /** Sağlayıcının güveni (0–1), verdiyse. */
  confidence?: number;
  provider?: string;
  /** Sunucuya giden ses (sn); gönderilmediyse 0 — kota izlemesi için. */
  sentSeconds: number;
  /** Boş dönüşün sebebi. */
  reason?: "silent" | "network" | "empty" | "low_confidence" | "aborted";
};

/**
 * Kaydı sunucuya gönderip yazıya çevirir.
 *
 * Zincir kipi burada seçiliyor ve sayfanın görünürlüğüne bağlı: sayfa gizliyse
 * `walk` (Azure önde), görünürse `default` (Groq önde). Sahibin şartı "ekran
 * açıkken asla Azure" böylece tek yerde ve istemcinin elinde değil — görünür
 * sayfa `walk` isteyemiyor. Görünürken bu işlev zaten yalnız tarayıcı
 * tanıyıcısı olmayan tarayıcılarda çağrılıyor.
 */
export async function transcribe(
  clip: Blob,
  language = "de",
  /** Beklenen cevap — karara etki etmiyor, yalnızca kayda geçiyor. */
  expected = "",
  opts: { signal?: AbortSignal } = {},
): Promise<PocketHeard> {
  const none = (reason: PocketHeard["reason"], sentSeconds = 0): PocketHeard => ({ alternatives: [], sentSeconds, reason });
  /*
    Pencere değil, konuşma gidiyor.

    Halka tampondan kesilen webm dilimi her zaman geçerli bir dosya değil:
    başlık eklense de ilk parça bir kümenin ortasından başlayabiliyor ve
    sağlayıcılar bunu "bozuk dosya" (400) diye reddediyordu — ölçüldü: aynı
    klip üç sağlayıcıda da 400. O yüzden dilim PCM'e çözülüyor; çözülmüşken
    konuşma bölgesi de bulunuyor (lib/vad) ve yalnız o parça WAV olarak
    gidiyor. Bölge yoksa istek yok: "duyamadım" kotaya dokunmuyor. Çözülemezse
    ham dilim gider — eskisinden kötü değil.
  */
  let sendable: Blob = clip;
  let sentSeconds = clip.size / SEND_RATE;
  try {
    const pcm = await decodePcm(clip, SEND_RATE);
    const cut = trimSpeech(pcm, SEND_RATE);
    if (!cut) return none("silent");
    sendable = encodeWav(cut.pcm, SEND_RATE);
    sentSeconds = cut.pcm.length / SEND_RATE;
  } catch {
    /* çözülemeyen klip ham gider; sunucu 400 verirse zincir sıradakine geçer */
  }
  if (opts.signal?.aborted) return none("aborted");

  const hidden = typeof document !== "undefined" && document.visibilityState === "hidden";
  const form = new FormData();
  const ext = sendable.type.includes("wav") ? "wav" : clip.type.includes("mp4") ? "mp4" : clip.type.includes("ogg") ? "ogg" : "webm";
  form.append("audio", sendable, `clip.${ext}`);
  form.append("language", language);
  form.append("mode", hidden ? "walk" : "default");
  if (expected) form.append("expected", expected);
  // Zaman aşımı ŞART. Cepteki telefon zayıf sinyalde bir isteği dakikalarca
  // asılı tutabiliyor ve tur o istekte donuyordu. Süresi geçen bir yazıya
  // çevirme zaten işe yaramaz: kullanıcı çoktan sıradakini bekliyor.
  const timeout = AbortSignal.timeout(STT_TIMEOUT_MS);
  const signal = opts.signal && typeof AbortSignal.any === "function" ? AbortSignal.any([timeout, opts.signal]) : timeout;
  try {
    const res = await fetch("/api/stt", { method: "POST", body: form, signal });
    if (!res.ok) return none("network", sentSeconds);
    const data = (await res.json()) as { text?: string; confidence?: number; provider?: string };
    const text = (data.text ?? "").trim();
    if (!text) return { ...none("empty", sentSeconds), confidence: data.confidence, provider: data.provider };
    /*
      Güveni düşük metin, metin sayılmıyor.

      Tanıyıcı gürültüyü ve arkadan gelen konuşmayı da kelimeye çeviriyor —
      duyacak bir şey verilince duyuyor ve bazen başka bir dilde duyuyor.
      Ayırt eden şey metnin kendisi değil, tanıyıcının o metne ne kadar
      inandığı: ölçümde Azure doğru kelimeye 0,85–0,95, yanlış dilde çöpe
      0,21 verdi. Eşik yine de gevşek: daha önce ölçülmeden konan bir eşik
      gerçek cihazda "her cevap duyamadım"a dönüşmüştü. Her çağrının güveni
      `ai_usage`'a yazılıyor; eşik veriyle sıkılır.
    */
    if (typeof data.confidence === "number" && data.confidence < MIN_CONFIDENCE) {
      return { ...none("low_confidence", sentSeconds), confidence: data.confidence, provider: data.provider };
    }
    return { alternatives: [text], confidence: data.confidence, provider: data.provider, sentSeconds };
  } catch {
    return none(opts.signal?.aborted ? "aborted" : "network", sentSeconds);
  }
}

/** Sunucuda yazıya çevirme açık mı — mod hangi yolu kullanacağını buna göre seçiyor. */
export async function sttAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/api/stt", {
      cache: "no-store",
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { configured?: boolean };
    return data.configured === true;
  } catch {
    return false;
  }
}
