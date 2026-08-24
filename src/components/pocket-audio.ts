"use client";

import { startClock, stopClock } from "@/components/pocket-clock";

/**
 * Cepte çalmayı ayakta tutan katman.
 *
 * Yürürken modunun asıl vaadi "telefon cepte kalabilir"di ama ekran
 * kapandığında tur duruyordu. Sebep tek bir yanılgıydı: ekran kilidi
 * (`Screen Wake Lock`) yalnızca BOŞTA KALMA süresini engelliyor — kullanıcı
 * güç tuşuna basıp telefonu cebine attığında ekran yine kapanıyor ve o anda
 * iki şey birden oluyor:
 *
 *   1. `AudioContext` askıya alınıyor, yani WebAudio ile çalan her şey
 *      susuyor. (Ses ÖĞELERİ susmuyor — podcast uygulamaları bu yüzden
 *      çalışıyor.)
 *   2. Konuşma tanıyıcı kapanıyor. Bu bir hata değil, bilinçli bir platform
 *      kararı: kilitli telefonda dinleyen bir sekme, mikrofonu görünmez
 *      biçimde açık tutmak olurdu. Web'de arka planda konuşma tanıma YOK ve
 *      olmayacak.
 *
 * Buradaki iki parça (1) için: sessiz bir döngü sesi ve MediaSession.
 *
 *   - **Sessiz döngü.** Ses hiç kesilmezse tarayıcı sekmeyi "medya çalıyor"
 *     sayıyor: zamanlayıcılar kısılmıyor ve sonraki parça ekran kapalıyken de
 *     başlatılabiliyor. Parçalar arasında gerçek sessizlik olduğu için buna
 *     ihtiyaç var — sesin bittiği her boşluk, sekmenin uykuya alınması için
 *     bir davet.
 *   - **MediaSession.** İşletim sistemine "burada bir oynatıcı var" demenin
 *     yolu. Kilit ekranında durdur/devam düğmeleri çıkıyor ve tarayıcı sekmeyi
 *     daha uzun süre canlı tutuyor.
 *
 * (2) için yapılabilecek bir şey yok; cepte modu bu yüzden ölçmüyor, yalnızca
 * okuyor. Ölçen kip ekran açıkken çalışıyor.
 */

let silent: HTMLAudioElement | null = null;
/** Döngü bilerek mi durduruldu — `onpause` bunu ayırt edemiyor. */
let keepAlive = false;

/**
 * Bir saniyelik sessiz WAV.
 *
 * Dosya olarak eklenmedi: 8 kHz, 8 bit, tek kanal bir saniyelik sessizlik
 * sekiz kilobayt ve çalışma anında üretmek hem depoyu hem de bir ağ isteğini
 * gereksiz kılıyor.
 */
function silentTrack(): string {
  const rate = 8000;
  const samples = rate; // 1 sn
  const buf = new ArrayBuffer(44 + samples);
  const view = new DataView(buf);
  const ascii = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };
  ascii(0, "RIFF");
  view.setUint32(4, 36 + samples, true);
  ascii(8, "WAVEfmt ");
  view.setUint32(16, 16, true); // fmt bloğu uzunluğu
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // tek kanal
  view.setUint32(24, rate, true);
  view.setUint32(28, rate, true); // bayt/sn
  view.setUint16(32, 1, true); // blok hizası
  view.setUint16(34, 8, true); // bit derinliği
  ascii(36, "data");
  view.setUint32(40, samples, true);
  // 8 bit PCM'de sessizlik 0 değil 128'dir (işaretsiz).
  new Uint8Array(buf, 44).fill(128);
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

/**
 * Kısa bir bip — ses ÖĞESİ olarak.
 *
 * Dersin işitsel işaretleri (`lib/lessons/cues`) WebAudio ile üretiliyor ve
 * ekran kapandığında `AudioContext` askıya alındığı için tam ihtiyaç duyulan
 * yerde susuyorlar. Cepteki kullanıcı mikrofonun açıldığını yalnızca kulağıyla
 * anlayabiliyor; işaret duyulmazsa ya boşluğa konuşuyor ya da sessizce
 * bekliyor.
 *
 * Öğe yolu askıya alınmıyor, o yüzden bip de burada üretiliyor: 8 kHz, 8 bit,
 * tek kanal, kısa bir sinüs. Bir dosya eklemeye değmez.
 */
function beepTrack(freq: number, ms: number): string {
  const rate = 8000;
  const samples = Math.round((rate * ms) / 1000);
  const buf = new ArrayBuffer(44 + samples);
  const view = new DataView(buf);
  const ascii = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };
  ascii(0, "RIFF");
  view.setUint32(4, 36 + samples, true);
  ascii(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  ascii(36, "data");
  view.setUint32(40, samples, true);
  const pcm = new Uint8Array(buf, 44);
  for (let i = 0; i < samples; i++) {
    // Kenarlar yumuşatılıyor: sert başlayan bir kare kulakta "tık" oluyor.
    const fade = Math.min(1, i / 64, (samples - i) / 64);
    pcm[i] = 128 + Math.round(56 * fade * Math.sin((2 * Math.PI * freq * i) / rate));
  }
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

let cue: HTMLAudioElement | null = null;

/** Mikrofonun açıldığını kulağa söyler — ekran kapalıyken de duyulur. */
export function pocketCue() {
  if (typeof window === "undefined") return;
  if (!cue) {
    cue = new Audio(beepTrack(880, 140));
    cue.preload = "auto";
  }
  try {
    cue.currentTime = 0;
  } catch {
    /* henüz yüklenmediyse önemsiz */
  }
  void cue.play().catch(() => {});
}

export type PocketControls = {
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
};

/**
 * Sessiz döngüyü başlatır ve kilit ekranı bilgisini kurar.
 *
 * Kullanıcı hareketi içinde çağrılmalı: ilk `play()` bir dokunuşa bağlı
 * olmazsa tarayıcı reddediyor ve sonrasında hiçbir şey çalmıyor.
 */
export function startPocketAudio(title: string, controls: PocketControls = {}) {
  if (typeof window === "undefined") return;
  keepAlive = true;
  if (!silent) {
    silent = new Audio(silentTrack());
    silent.loop = true;
    silent.preload = "auto";
    // Duyulmaması gerekiyor ama SIFIR olmamalı: bazı tarayıcılar tamamen
    // sessiz bir öğeyi "çalmıyor" sayıp sekmeyi uykuya alıyor.
    silent.volume = 0.01;
  }
  void silent.play().catch(() => {
    /* dokunuş dışında çağrıldıysa reddedilir; mod yine çalışır, arka plan zayıflar */
  });
  startClock(silent);

  /*
    Döngünün DURMADIĞINDAN emin olunuyor.

    Sessiz ses yalnızca "hoş olurdu" değil, arka planın taşıyıcı direği: sekme
    "medya çalıyor" sayıldığı sürece zamanlayıcılar kısılmıyor ve `timeupdate`
    saatin nabzını veriyor. Durursa ikisi birden gidiyor ve tur, kimsenin
    göremediği bir yerde donuyor.

    Kendiliğinden durabiliyor: gelen çağrı, başka bir uygulamanın ses odağını
    alması, işletim sisteminin kod çözücüyü geri alması. `onpause` bunların
    hepsini yakalıyor ve yeniden başlatıyor — kullanıcı hareketi gerekmiyor,
    çünkü öğe bir kez serbest bırakılmış oluyor.
  */
  silent.onpause = () => {
    if (!keepAlive) return;
    void silent?.play().catch(() => {});
  };

  const nav = navigator as Navigator & {
    mediaSession?: {
      metadata: MediaMetadata | null;
      playbackState: string;
      setActionHandler: (a: string, h: (() => void) | null) => void;
    };
  };
  const ms = nav.mediaSession;
  if (!ms) return;
  try {
    const MD = (window as unknown as { MediaMetadata?: new (i: object) => MediaMetadata })
      .MediaMetadata;
    if (MD) ms.metadata = new MD({ title, artist: "Wortspiel", album: "Yürürken" });
    ms.playbackState = "playing";
    ms.setActionHandler("pause", () => controls.onPause?.());
    ms.setActionHandler("play", () => controls.onResume?.());
    ms.setActionHandler("stop", () => controls.onStop?.());
  } catch {
    /* eski tarayıcı: kilit ekranı denetimi olmaz, çalma yine sürer */
  }
}

/** Kilit ekranındaki başlığı günceller — hangi kelimede olunduğu görünsün. */
export function updatePocketTitle(title: string) {
  const nav = navigator as Navigator & { mediaSession?: { metadata: MediaMetadata | null } };
  const MD = (window as unknown as { MediaMetadata?: new (i: object) => MediaMetadata })
    .MediaMetadata;
  if (!nav.mediaSession || !MD) return;
  try {
    nav.mediaSession.metadata = new MD({ title, artist: "Wortspiel", album: "Yürürken" });
  } catch {
    /* önemsiz */
  }
}

export function stopPocketAudio() {
  keepAlive = false;
  stopClock();
  silent?.pause();
  const nav = navigator as Navigator & {
    mediaSession?: { playbackState: string; setActionHandler: (a: string, h: null) => void };
  };
  try {
    if (nav.mediaSession) {
      nav.mediaSession.playbackState = "none";
      for (const a of ["pause", "play", "stop"]) nav.mediaSession.setActionHandler(a, null);
    }
  } catch {
    /* önemsiz */
  }
}
