"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpeakerIcon } from "./icons";
import { sharedAudioContext } from "@/lib/audio-context";
import { afterMs } from "@/components/pocket-clock";
import { TURKISH_VOICE, lessonVoice, resolveVoice, type VoiceId } from "@/lib/tts/voices";

/**
 * Tarayıcının konuşma sentezi ile telaffuz. Desteklenmiyorsa hiç görünmez.
 *
 * Zürih kursunda (gsw-zh) de-CH sesi tercih edilir: Dieth yazımı fonetik
 * olduğu için İsviçre aksanlı ses, lehçe metnini şaşırtıcı ölçüde doğru okur.
 * Gerçek Mundart kayıtları dinleme egzersizlerinde ayrıca sunulur.
 */
/** Kursun ve sesin cihazdaki aynası — çalma anında eşzamanlı okunmalı. */
const COURSE_KEY = "wortspiel-course";
const VOICE_KEY = "wortspiel-voice";

function readLocal(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Okunacak metnin sadeleştirilmesi.
 *
 * Sunucudaki `cleanForSpeech` ile aynı kural. Burada da uygulanıyor çünkü bu
 * metin URL'ye giriyor ve URL önbellek anahtarının kendisi: aynı cümlenin iki
 * farklı yazımı iki ayrı önbellek girdisi, yani iki ayrı sentez demek olurdu.
 */
function cleanForSpeech(text: string): string {
  return text
    .replace(/\(.*?\)/g, "")
    .replace(/[/–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Seslendirme ucunun adresi — URL önbellek anahtarı olduğu için tek yerde. */
function ttsUrl(voice: VoiceId, clean: string, slow = false): string {
  return `/api/tts?v=${voice}&t=${encodeURIComponent(clean)}${slow ? "&r=slow" : ""}`;
}

/**
 * Tek bir ses öğesi — her okuma için yenisi yaratılmıyor.
 *
 * Sebebi iOS: kullanıcı hareketi olmadan `play()` engelleniyor ve uygulamada
 * kendiliğinden konuşan yerler var (yeni kelime kartı, dinleme oyunu, diyalog,
 * rol yapma cevabı). Bir kez kullanıcı hareketiyle çalmış öğe sonrasında serbest
 * kalıyor, bu yüzden aynı öğe yeniden kullanılıyor ve ilk dokunuşta sessiz bir
 * kayıtla hazırlanıyor.
 *
 * Yan kazanç: aynı anda tek ses çalıyor — yeni okuma öncekini kesiyor, eski
 * `speechSynthesis.cancel()` davranışıyla aynı.
 */
let element: HTMLAudioElement | null = null;
/**
 * İkinci ses öğesi — yalnızca ders anlatımının parça zinciri kullanıyor.
 *
 * Parçalar tek öğeyle art arda çalındığında her sınırda aynı bekleme vardı:
 * önceki parça bitiyor, src değişiyor, yeni kaynak açılıp çözülüyor ve ancak
 * o zaman ses başlıyordu. İki öğeyle sıradaki parça, geçerli parça ÇALARKEN
 * yükleniyor; bitişte yapılacak tek iş hazır öğede play() demek. Sınırdaki
 * boşluk ağ/çözme süresinden JS'in olay işleme süresine iniyor.
 */
let extra: HTMLAudioElement | null = null;
/** Bitişi hangi okumaya ait olduğunu ayırt etmek için — öğe paylaşıldığı için gerekli. */
let token = 0;

function audioElement(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  if (!element) element = new Audio();
  return element;
}

function extraElement(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  if (!extra) {
    extra = new Audio();
    extra.preload = "auto";
  }
  return extra;
}

/**
 * Süren WebAudio zincirinin susturucusu.
 *
 * WebAudio kaynakları ses öğeleri gibi "paylaşılan tek nesne" değil: planlanan
 * her kaynak kendi başına çalıyor ve jeton kontrolü yalnızca ZİNCİRİN
 * İLERLEMESİNİ durduruyor, sesin kendisini değil. Bu yüzden yeni bir okuma
 * başlarken ya da susturma istendiğinde planlanmış kaynaklar buradan
 * durduruluyor.
 */
let activeChainStop: (() => void) | null = null;

function stopActiveChain() {
  activeChainStop?.();
  activeChainStop = null;
}

/**
 * İlk kullanıcı hareketinde ses öğesini serbest bırakır.
 *
 * Sessiz ve çok kısa bir kayıt çalınıyor; amaç ses çıkarmak değil, tarayıcının
 * "bu öğeyi kullanıcı başlattı" saymasını sağlamak. Bir kez çalışıp dinleyiciyi
 * kaldırıyor.
 */
function primeOnFirstGesture() {
  if (typeof window === "undefined") return;
  const unlock = () => {
    // Her iki öğe de serbest bırakılıyor: anlatım zinciri ikinciyi de kullanıyor
    // ve iOS yalnızca kullanıcı hareketiyle çalmış öğeyi serbest sayıyor.
    for (const el of [audioElement(), extraElement()]) {
      if (!el) continue;
      el.src =
        "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD//////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA";
      el.volume = 0;
      void el.play().then(
        () => {
          el.pause();
          el.volume = 1;
        },
        () => {
          el.volume = 1;
        },
      );
    }
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

if (typeof window !== "undefined") primeOnFirstGesture();

/**
 * Almanca metni sesli okur.
 *
 * İki kaynak var ve sıra önemli:
 *
 *   1. `/api/tts` — Microsoft'un nöral sesi. Kalite cihazdan bağımsız ve
 *      Zürih kursunda gerçekten İsviçre Almancası konuşan bir ses var.
 *   2. `speechSynthesis` — tarayıcının kendi sesi. Artık son çare, ama
 *      duruyor: ağ yoksa, uç düşmüşse ya da ses hiç çalınamıyorsa alıştırma
 *      sessiz kalmasın.
 *
 * `onEnd` her durumda çağrılır — ses çalındığında da, hiç çalınamadığında da.
 * Eller serbest rol yapmada mikrofonun kendiliğinden açılması buna bağlı; hiç
 * gelmeyecek bir bitiş döngüyü kilitlerdi.
 */
export function speakGerman(text: string, onEnd?: () => void, slow = false) {
  const clean = cleanForSpeech(text);
  if (!clean) {
    onEnd?.();
    return;
  }

  const course = readLocal(COURSE_KEY) ?? "de";
  const voice = resolveVoice(course, readLocal(VOICE_KEY));

  // Önce boşluksuz yol: tek dosyada da kazanç aynı — baştaki/sondaki gömülü
  // sessizlik atılıyor, cümle aralarındaki bir saniyelik duraklamalar
  // sıkışıyor. Konuşma pratiğinin cevapları da böylece bekletmeden akıyor.
  const mine = ++token;
  stopActiveChain();
  element?.pause();
  extra?.pause();
  const cancel = playGapless([ttsUrl(voice, clean, slow)], {
    mine,
    onEnd,
    onFail: () => play(clean, voice, course, onEnd, slow),
  });
  if (cancel) activeChainStop = cancel;
  else play(clean, voice, course, onEnd, slow);
}

/**
 * Belirli bir sesle okur — ses seçim ekranı bunu kullanıyor.
 *
 * Seçimden önce dinletmek gerekiyor: iki sesin farkı yazıyla anlatılamaz,
 * kullanıcı her gün dinleyeceği sesi duyarak seçmeli.
 */
export function speakWithVoice(text: string, voice: VoiceId) {
  const clean = cleanForSpeech(text);
  if (clean) play(clean, voice, voice.startsWith("de-CH") ? "gsw-zh" : "de");
}

/**
 * Sesi önceden indirir ama çalmaz.
 *
 * Gecikmenin asıl kaynağı sentez değil, önbellek ıskalaması: daha önce hiç
 * duyulmamış bir metin sunucuya gidip geliyor. Öğrenci bir turu cevaplarken
 * sıradaki turun sesini indirmek, o gidiş-dönüşü tamamen görünmez yapıyor —
 * sıra geldiğinde ses zaten tarayıcı önbelleğinde.
 *
 * `fetch` yeterli: cevap `immutable` ile bir yıl önbelleklendiği için `Audio`
 * aynı URL'yi istediğinde ağa hiç çıkmıyor. Ses öğesi kullanmak yerine fetch
 * seçilmesinin sebebi de bu — indirme çalmayla karışmıyor.
 *
 * Hata sessizce yutuluyor: önden indirme bir iyileştirme, garanti değil.
 */
export function prefetchGerman(text: string) {
  const clean = cleanForSpeech(text);
  if (!clean || typeof fetch === "undefined") return;
  const course = readLocal(COURSE_KEY) ?? "de";
  const voice = resolveVoice(course, readLocal(VOICE_KEY));
  void fetch(ttsUrl(voice, clean), {
    // Öncelik düşük: açık bir isteğin önüne geçmemeli.
    priority: "low",
  } as RequestInit).catch(() => {
    /* önden indirme başarısızsa normal akış zaten çalışıyor */
  });
}

/** Telaffuz çalışması için yavaş okuma — önce heceleri ayırt et, sonra tekrarla. */
export function speakSlowly(text: string, onEnd?: () => void) {
  speakGerman(text, onEnd, true);
}

/**
 * Dil bazında bölünmüş metin parçası — ders anlatımının birimi.
 *
 * Ders Türkçe anlatıyor ama içinde Almanca hedefler geçiyor: "İlk kelimemiz:
 * das Wasser." Tek sesle okumak iki dilden birini bozuyor — Türkçe ses
 * Almancayı Türkçe fonetiğiyle, Almanca ses Türkçeyi Alman aksanıyla okurdu.
 * Öğrencinin duyacağı telaffuz dersin öğrettiği şeyin kendisi olduğu için bu
 * kabul edilebilir bir bozulma değil; parça hangi dildeyse o dilin nöral
 * sesiyle okunuyor.
 */
export type SpeechSegment = { lang: "tr" | "de"; text: string };

/**
 * Parçanın sesi profil tercihinden BAĞIMSIZ: derste öncelik gecikme.
 *
 * Ses sabit olunca dersin her cümlesi kullanıcıdan bağımsız tek önbellek
 * girdisi — ilk dinleyen CDN'i herkes için ısıtıyor (bkz. lib/tts/voices,
 * lessonVoice). Profil sesi konuşma pratiği gibi kullanıcıya özel üretilen
 * yerlerde geçerli olmayı sürdürüyor.
 */
function voiceForSegment(seg: SpeechSegment): { voice: VoiceId; course: string } {
  if (seg.lang === "tr") return { voice: TURKISH_VOICE, course: "de" };
  const course = readLocal(COURSE_KEY) ?? "de";
  return { voice: lessonVoice(course), course };
}

/**
 * Parçaların okunmaya hazırlanması: temizle, birleştir, sadeleştir.
 *
 * İki iş yapılıyor ve ikisi de duraklamayla ilgili:
 *
 *   1. AYNI dildeki bitişik parçalar tek parçaya birleşiyor. Her parça ayrı
 *      bir sentez ve ayrı bir ses dosyası demek; "Türkçesi 'su' demek." ile
 *      "Lütfen" arasına dosya sınırı koymak cümlenin ortasına bekleme koymak
 *      oluyor. Sınır yalnızca dil GERÇEKTEN değiştiğinde kalıyor — orada ses
 *      de değişmek zorunda.
 *   2. Üç nokta ("…") atılıyor. İçerikte kalıbın devamını gösteriyor
 *      ("Ich möchte …") ama nöral ses onu uzun bir duraklama olarak okuyor;
 *      ekranda anlamlı, kulakta delik.
 *
 * Önden indirme de aynı birleştirmeden geçmek ZORUNDA: önbellek anahtarı
 * metnin kendisi, farklı bölünmüş metin ayrı girdi demek olur.
 */
function mergeForSpeech(segments: SpeechSegment[]): SpeechSegment[] {
  const out: SpeechSegment[] = [];
  for (const seg of segments) {
    const text = cleanForSpeech(seg.text.replace(/…|\.{3}/g, " "));
    if (!text) continue;
    const last = out[out.length - 1];
    if (last && last.lang === seg.lang) last.text = `${last.text} ${text}`;
    else out.push({ lang: seg.lang, text });
  }
  return out;
}

/** Konuşma dosyasının içindeki sesli bölge — planlanacak birim. */
type SpeechRun = { offset: number; duration: number; gapAfter: number };

/** İki parça (dil geçişi) arasına konan nefes payı, saniye. */
const SEGMENT_GAP = 0.12;
/** Dosya içindeki uzun duraklamaların tavanı, saniye. */
const MAX_PAUSE = 0.24;

/**
 * Çözülmüş sesin konuşulan bölgelerini çıkarır.
 *
 * Sebep ölçümde: nöral seslerin MP3'lerinde cümle arası ~1.05 sn, klip sonu
 * ~1.0 sn, başı ~0.2 sn gömülü sessizlik var ve sunucu tarafında kısılamıyor
 * (Edge ucu mstts sessizlik etiketini reddediyor — bkz. lib/tts/ssml).
 * Burada dosya 10 ms'lik çerçevelerle taranıyor: kenar sessizlikleri atılıyor,
 * 300 ms'ten kısa boşluklar konuşmanın doğal ritmi sayılıp olduğu gibi
 * bırakılıyor, uzunları `MAX_PAUSE`e sıkıştırılıyor. Nefes payı duyuluyor,
 * bir saniyelik delikler duyulmuyor.
 */
function speechRuns(buf: AudioBuffer): SpeechRun[] {
  const data = buf.getChannelData(0);
  const rate = buf.sampleRate;
  const frame = Math.max(1, Math.round(rate * 0.01));
  const frames = Math.ceil(data.length / frame);
  /** Sessizlik eşiği — silencedetect ölçümündeki -40 dB'e denk. */
  const THRESHOLD = 0.012;
  /** Bölge kenarlarına eklenen pay (çerçeve) — ünsüz başlangıçları kırpılmasın. */
  const PAD = 5;
  /** Bundan kısa boşluklar doğal ritim sayılır (çerçeve, 300 ms). */
  const MERGE = 30;

  const loud: boolean[] = new Array(frames);
  for (let f = 0; f < frames; f++) {
    const start = f * frame;
    const end = Math.min(start + frame, data.length);
    let peak = 0;
    for (let j = start; j < end; j++) {
      const a = Math.abs(data[j]);
      if (a > peak) peak = a;
    }
    loud[f] = peak > THRESHOLD;
  }

  const zones: { s: number; e: number }[] = [];
  let open = -1;
  for (let f = 0; f < frames; f++) {
    if (loud[f] && open < 0) open = f;
    if (!loud[f] && open >= 0) {
      zones.push({ s: open, e: f });
      open = -1;
    }
  }
  if (open >= 0) zones.push({ s: open, e: frames });
  // Hiç sesli bölge yoksa (beklenmez) dosya olduğu gibi çalınsın.
  if (!zones.length) return [{ offset: 0, duration: buf.duration, gapAfter: 0 }];

  const merged: { s: number; e: number }[] = [];
  for (const z of zones) {
    const s = Math.max(0, z.s - PAD);
    const e = Math.min(frames, z.e + PAD);
    const last = merged[merged.length - 1];
    if (last && s - last.e <= MERGE) last.e = e;
    else merged.push({ s, e });
  }

  const toSec = (f: number) => (f * frame) / rate;
  return merged.map((z, i) => {
    const next = merged[i + 1];
    const gap = next ? toSec(next.s) - toSec(z.e) : 0;
    return {
      offset: toSec(z.s),
      duration: toSec(z.e) - toSec(z.s),
      gapAfter: Math.min(gap, MAX_PAUSE),
    };
  });
}

/**
 * Ses dosyalarını WebAudio ile boşluksuz zincirler.
 *
 * Ses öğesi zincirinde her sınırda "src değiştir → indir → çöz → başla"
 * bekleniyordu ve dosyaların gömülü kenar sessizlikleri buna ekleniyordu.
 * Burada dosyalar çözülüp konuşulan bölgeleri örneklem hassasiyetinde art
 * arda planlanıyor: parça sınırı artık duyulan bir şey değil.
 *
 * İndirme ve çözme aşamalı: i. dosya çalarken sonrakiler çözülüp kuyruğun
 * sonuna planlanıyor; hepsinin inmesi beklenmiyor. Bir dosya alınamazsa
 * `onFail(i)` çağrılıyor — planlanmış sesin bitmesi beklenmiş olarak; çağıran
 * taraf kalan parçaları kendi yedeğiyle sürdürüyor.
 *
 * Bağlam çalışır durumda değilse (henüz kullanıcı hareketi yok) `null` döner;
 * çağıran ses öğesi yoluna düşer.
 */
function playGapless(
  urls: string[],
  opts: {
    mine: number;
    onEnd?: () => void;
    onFail: (index: number) => void;
    /**
     * İlk ses planlandığı anda, çalmaya başlamadan ~150 ms ÖNCE çağrılır.
     * Arayüz bunu metni açığa çıkarmak için kullanıyor: baloncuk önce
     * "yazıyor" animasyonu gösteriyor, metin sesten bir nefes önce geliyor —
     * indirme/çözme gecikmesi kullanıcıya hiç görünmüyor.
     */
    onStart?: () => void;
  },
): (() => void) | null {
  const ctx = sharedAudioContext();
  if (!ctx || ctx.state !== "running") return null;
  const { mine, onEnd, onFail, onStart } = opts;

  const sources: AudioBufferSourceNode[] = [];
  let cancelled = false;
  let done = false;
  let guard: ReturnType<typeof setTimeout> | null = null;
  const finish = () => {
    if (done || cancelled || token !== mine) return;
    done = true;
    if (guard) clearTimeout(guard);
    onEnd?.();
  };

  void (async () => {
    /** Planlanmış son sesin bittiği an — sıradaki bunun üstüne eklenir. */
    let tail = 0;
    let lastSource: AudioBufferSourceNode | null = null;

    for (let i = 0; i < urls.length; i++) {
      let buf: AudioBuffer | null = null;
      try {
        const res = await fetch(urls[i]);
        if (!res.ok) throw new Error(String(res.status));
        buf = await ctx.decodeAudioData(await res.arrayBuffer());
      } catch {
        buf = null;
      }
      if (cancelled || token !== mine) return;

      if (!buf) {
        // Planlanmış ses bitince kalanı çağıranın yedeğine devret.
        const wait = Math.max(0, tail - ctx.currentTime) * 1000;
        setTimeout(() => {
          if (cancelled || token !== mine) return;
          onFail(i);
        }, wait + 20);
        return;
      }

      // İlk parça bilerek 150 ms ileriye planlanıyor: `onStart` şimdi
      // çağrılınca metin sesten önce ekranda oluyor.
      if (i === 0) onStart?.();
      let at = Math.max(tail + (i ? SEGMENT_GAP : 0), ctx.currentTime + (i ? 0.03 : 0.15));
      for (const run of speechRuns(buf)) {
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(at, run.offset, run.duration);
        sources.push(src);
        lastSource = src;
        at += run.duration + run.gapAfter;
      }
      tail = at;
    }

    if (!lastSource) {
      finish();
      return;
    }
    lastSource.onended = finish;
    // Emniyet: `onended` gelmezse (sekme arka plana düştü, tarayıcı atladı)
    // bitiş planlanan sürenin az sonrasında yine bildirilsin.
    guard = setTimeout(finish, Math.max(0, tail - ctx.currentTime) * 1000 + 400);
  })();

  return () => {
    cancelled = true;
    if (guard) clearTimeout(guard);
    for (const src of sources) {
      try {
        src.stop();
      } catch {
        /* zaten bitmiş olabilir */
      }
    }
  };
}

/**
 * Ses öğeleriyle çift tamponlu zincir — WebAudio'nun yedeği.
 *
 * Parça i çalarken parça i+1 öteki öğede yükleniyor; sınırda yapılan tek iş
 * hazır öğeye play() demek. Gömülü kenar sessizlikleri burada kırpılamıyor —
 * bu yol yalnızca bağlam açılamadığında ya da bir dosya çözülemediğinde
 * devrede.
 */
/**
 * En uzun parçanın makul tavanı.
 *
 * Süre bilinmeden önce geçerli: `loadedmetadata` gelir gelmez gerçek süreye
 * göre daraltılıyor. Buradaki iş bir parçayı kısa kesmek değil, HİÇ bitmeyen
 * bir parçanın turu dondurmasını engellemek — o yüzden cömert.
 */
const SEGMENT_CAP_MS = 12_000;
/** Bilinen sürenin üstüne bırakılan pay: ağ duraklaması, kod çözücü gecikmesi. */
const SEGMENT_SLACK_MS = 2_500;
/**
 * Sesin BAŞLAMASI için tanınan süre.
 *
 * Ayrı tutuluyor çünkü iki farklı arıza var ve süreleri çok farklı: çalmaya
 * başlamış ama bitmeyen bir parça uzun sürebilir, hiç başlamayan bir parça ise
 * gelmiyordur. İkisine aynı cömert tavanı vermek, ağ takıldığında her kelime
 * için on iki saniye sessizlik demekti.
 */
const SEGMENT_START_MS = 4_500;

function chainWithElements(
  queue: SpeechSegment[],
  startIndex: number,
  onEnd: (() => void) | undefined,
  mine: number,
  onStart?: () => void,
  /**
   * Arka plan kipi: tarayıcı sentezine DÜŞÜLMÜYOR ve her parça bir süreye
   * bağlanıyor.
   *
   * İkisi de aynı gerçeğin sonucu — telefon kilitliyken `speechSynthesis`
   * konuşmuyor VE `onend` olayını hiç vermiyor. Yani yedek diye oraya düşmek
   * sesi kurtarmıyor, üstüne zinciri sonsuza dek asılı bırakıyor. Ekran
   * kapalıyken kelime okunmaması ve ardından hiçbir şeyin olmaması buydu.
   *
   * Arka planda bir parça çalınamazsa doğru davranış onu ATLAMAK: eksik bir
   * kelime, duran bir turdan iyi.
   */
  background = false,
) {
  const a = audioElement();
  const b = extraElement();
  // Bu yolda sesin gerçek başlangıcı bilinemiyor (yükleme öğenin içinde);
  // metin ilk çalma girişiminden hemen önce açılıyor — ses birkaç yüz
  // milisaniye arkadan geliyor, istenen sıra korunuyor.
  onStart?.();

  // Ses öğesi yoksa (sunucu, çok eski ortam) tarayıcı sentezine sırayla düş.
  if (!a || !b) {
    const step = (i: number) => {
      if (token !== mine) return;
      if (i >= queue.length) {
        onEnd?.();
        return;
      }
      const { voice, course } = voiceForSegment(queue[i]);
      speakWithBrowser(queue[i].text, voice, course, () => step(i + 1));
    };
    step(startIndex);
    return;
  }

  a.pause();
  b.pause();
  const els = [a, b];

  const srcFor = (seg: SpeechSegment) => ttsUrl(voiceForSegment(seg).voice, seg.text);
  /** i. parçayı kendi öğesine yükler — çalma değil, hazırlık. */
  const preload = (i: number) => {
    const el = els[i % 2];
    el.onended = null;
    el.onerror = null;
    el.src = srcFor(queue[i]);
    el.load();
  };
  const playAt = (i: number) => {
    if (token !== mine) return;
    if (i >= queue.length) {
      onEnd?.();
      return;
    }
    const el = els[i % 2];

    /*
      Bu parça için tek çıkış kapısı.

      Zincirin ilerlemesi üç ayrı olaya bağlı (bitti, hata, süre doldu) ve
      üçünün de aynı anda gelmesi mümkün. `moved` olmadan bir parça iki kez
      ilerletilebilir ve sıra bozulurdu.
    */
    let moved = false;
    let disarm = () => {};
    const next = () => {
      if (moved || token !== mine) return;
      moved = true;
      disarm();
      el.onended = null;
      el.onerror = null;
      el.onplaying = null;
      playAt(i + 1);
    };

    const fallback = () => {
      if (moved || token !== mine) return;
      // Arka planda tarayıcı sentezi yok: konuşmuyor ve `onend` vermiyor,
      // yani zinciri kurtarmak yerine asıyor. Parça atlanıyor.
      if (background) {
        next();
        return;
      }
      // Uç düşmüş ya da dosya çalınamıyor: bu parçayı tarayıcı sentezi okusun,
      // zincir kopmasın.
      moved = true;
      disarm();
      const { voice, course } = voiceForSegment(queue[i]);
      speakWithBrowser(queue[i].text, voice, course, () => playAt(i + 1));
    };

    el.onended = next;
    el.onerror = fallback;

    if (background) {
      // Önce yalnızca BAŞLAMASI bekleniyor; ses akmaya başlayınca tavan
      // parçanın kendi süresine göre yeniden kuruluyor.
      disarm = afterMs(SEGMENT_START_MS, next);
      el.onplaying = () => {
        if (moved || token !== mine) return;
        disarm();
        const d = el.duration;
        const cap =
          Number.isFinite(d) && d > 0 ? d * 1000 + SEGMENT_SLACK_MS : SEGMENT_CAP_MS;
        disarm = afterMs(cap, next);
      };
    }

    if (i + 1 < queue.length) preload(i + 1);
    void el.play().catch(fallback);
  };

  preload(startIndex);
  playAt(startIndex);
}

/**
 * Parçaları sırayla, her birini kendi dilinin sesiyle okur.
 *
 * `onEnd` son parça bittiğinde (ya da hiç çalınamadığında) bir kez çağrılır —
 * eller serbest akışta mikrofonun açılması buna bağlı. Dönen işlev okumayı
 * iptal eder ve sesi susturur.
 *
 * Önce boşluksuz WebAudio yolu deneniyor (kenar sessizlikleri kırpılmış,
 * duraklamaları sıkıştırılmış); bağlam hazır değilse ya da bir dosya
 * alınamazsa ses öğesi zincirine düşülüyor.
 */
export function speakSegments(
  segments: SpeechSegment[],
  onEnd?: () => void,
  /** Metnin açığa çıkma anı — ses başlamadan bir nefes önce, bir kez. */
  onStart?: () => void,
  /**
   * Arka plan kipi: boşluksuz WebAudio yolu hiç denenmez, doğrudan ses
   * öğesi zinciri kullanılır.
   *
   * Sebebi tek bir platform gerçeği: telefon kilitlendiğinde `AudioContext`
   * askıya alınıyor ve WebAudio ile çalan her şey susuyor. Ses öğeleri ise
   * arka planda çalmaya devam ediyor — podcast uygulamalarının çalışma
   * biçimi bu. Cepte modu ekran kapalıyken sürmek zorunda olduğu için o yolu
   * baştan seçiyor; boşluksuzluk orada zaten ikinci derecede, çünkü parçalar
   * arasında bilerek sessizlik var.
   */
  opts?: { background?: boolean },
): () => void {
  const queue = mergeForSpeech(segments);
  if (!queue.length) {
    onStart?.();
    onEnd?.();
    return () => {};
  }

  const mine = ++token;
  stopActiveChain();
  element?.pause();
  extra?.pause();

  let started = false;
  const startOnce = () => {
    if (started) return;
    started = true;
    onStart?.();
  };

  if (opts?.background) {
    chainWithElements(queue, 0, onEnd, mine, startOnce, true);
    return () => {
      if (token !== mine) return;
      token++;
      stopActiveChain();
      element?.pause();
      extra?.pause();
    };
  }

  const urls = queue.map((seg) => ttsUrl(voiceForSegment(seg).voice, seg.text));
  const cancel = playGapless(urls, {
    mine,
    onEnd,
    onStart: startOnce,
    onFail: (i) => chainWithElements(queue, i, onEnd, mine, startOnce),
  });
  if (cancel) activeChainStop = cancel;
  else chainWithElements(queue, 0, onEnd, mine, startOnce);

  return () => {
    if (token !== mine) return;
    token++;
    stopActiveChain();
    element?.pause();
    extra?.pause();
  };
}

/**
 * Çalan sesi keser ve bekleyen bitiş geri çağrılarını geçersiz kılar.
 *
 * Mikrofona dokunan kullanıcı okumayı beklemek istemiyor: ses sussun, tanıma
 * başlasın. Jeton artırıldığı için kesilen okumanın geç gelen `onended` olayı
 * hiçbir şeyi tetiklemiyor — eller serbest döngü kendi kendine açılmıyor.
 */
export function stopSpeaking() {
  token++;
  stopActiveChain();
  element?.pause();
  extra?.pause();
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Parçaların seslerini önceden indirir — ders akışında bekleme olmasın.
 *
 * Oynatmayla AYNI birleştirmeden geçiyor: önbellek anahtarı metnin kendisi,
 * farklı bölünmüş metin ayrı (ve boşuna) bir girdi olurdu.
 */
export function prefetchSegments(segments: SpeechSegment[]) {
  if (typeof fetch === "undefined") return;
  for (const seg of mergeForSpeech(segments)) {
    void fetch(ttsUrl(voiceForSegment(seg).voice, seg.text), {
      priority: "low",
    } as RequestInit).catch(() => {
      /* önden indirme başarısızsa normal akış zaten çalışıyor */
    });
  }
}

function play(
  clean: string,
  voice: VoiceId,
  course: string,
  onEnd?: () => void,
  slow = false,
  /** Ses uzunluğu öğrenilince çağrılır — geçiş çizgisi bunu kullanıyor. */
  onDuration?: (ms: number) => void,
) {
  const audio = audioElement();
  if (!audio) {
    speakWithBrowser(clean, voice, course, onEnd, slow);
    return;
  }

  // Bu okumanın kimliği: öğe paylaşıldığı için, kesilen okumanın geç gelen
  // olayı yenisinin bitişi sanılmamalı.
  const mine = ++token;
  stopActiveChain();
  let done = false;

  const finish = () => {
    if (done || token !== mine) return;
    done = true;
    onEnd?.();
  };
  const fallback = () => {
    if (done || token !== mine) return;
    done = true;
    // Uç düşmüş, ağ yok ya da tarayıcı mp3'ü çalamıyor: eski davranışa dön.
    speakWithBrowser(clean, voice, course, onEnd, slow);
  };

  audio.pause();
  audio.onended = finish;
  audio.onerror = fallback;
  // Süre, ses ÇALMAYA BAŞLADIĞI anda bildiriliyor — üstveri indiği anda değil.
  //
  // Fark önemli: üstveri ile çalmanın başlaması arasında tamponlama süresi
  // var. Çizgiyi üstveride başlatmak onu sesten önce bitiriyor ve kullanıcı
  // dolu bir çizgiye bakarak bekliyor. Bu, tam olarak "loading bitti ama hâlâ
  // bekliyor" şikâyetinin sebebiydi.
  //
  // Kalan süre `duration - currentTime` ile hesaplanıyor: `playing` olayı
  // duraklatma sonrası da geldiği için baştan başladığı varsayılamaz.
  audio.onplaying = () => {
    if (!onDuration) return;
    const total = audio.duration;
    if (!Number.isFinite(total) || total <= 0) return;
    onDuration(Math.round((total - audio.currentTime) * 1000));
  };
  audio.src = ttsUrl(voice, clean, slow);
  audio.currentTime = 0;
  // play() reddedilirse (otomatik oynatma engeli, yüklenemeyen kaynak) de
  // aynı yedeğe düşülür.
  void audio.play().catch(fallback);
}

/**
 * Tarayıcının kendi sentezi — yedek yol.
 *
 * Sesi bulma mantığı olduğu gibi korundu: Zürih kursunda de-CH sesi varsa o
 * tercih edilir, yoksa herhangi bir Almanca ses. Cihazda de-CH bulunmaması
 * zaten bu değişikliğin sebeplerinden biriydi.
 */
function speakWithBrowser(
  clean: string,
  voice: VoiceId,
  course: string,
  onEnd?: () => void,
  slow = false,
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }
  // Dil, istenen sesin kimliğinden okunuyor: Türkçe anlatım parçası yedekte de
  // Türkçe okunmalı — kursun Almanca sesine düşmek anlatımı anlaşılmaz yapar.
  const lang = voice.slice(0, 5);
  const gsw = course === "gsw-zh" && lang !== "tr-TR";
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = gsw ? "de-CH" : lang;
  u.rate = slow ? (gsw ? 0.55 : 0.6) : gsw ? 0.88 : lang === "tr-TR" ? 1 : 0.92;
  const voices = window.speechSynthesis.getVoices();
  const picked = gsw
    ? (voices.find((v) => v.lang === "de-CH") ?? voices.find((v) => v.lang.startsWith("de")))
    : (voices.find((v) => v.lang === lang) ??
      voices.find((v) => v.lang.startsWith(lang.slice(0, 2))));
  if (picked) u.voice = picked;
  if (onEnd) {
    u.onend = () => onEnd();
    // Hata da bir bitiştir: sentez çuvallarsa döngü asılı kalmasın.
    u.onerror = () => onEnd();
  }
  // cancel() bekleyen konuşmanın onend'ini de tetikler; çağıran taraf hangi
  // okumanın bittiğini ayırt edebilmeli (bkz. lesson-player, konuşma jetonu).
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

/**
 * Ses çalınabilir mi?
 *
 * Artık `speechSynthesis`'e bakmıyor: ses sunucudan mp3 olarak geliyor ve
 * `Audio` her tarayıcıda var. Eskiden Firefox'ta düğme hiç görünmüyordu —
 * o kısıt kalktı. İstemci tarafında çalıştığını doğrulamak için yine de
 * mount sonrası true dönüyor (sunucu render'ında ses zaten çalınamaz).
 */
export function useSpeechAvailable() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(typeof window !== "undefined" && typeof Audio !== "undefined");
  }, []);
  return ok;
}

export function SpeakButton({
  text,
  size = "md",
  className = "",
}: {
  text: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const available = useSpeechAvailable();
  const speak = useCallback(() => speakGerman(text), [text]);
  if (!available) return null;
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  return (
    <motion.button
      type="button"
      onClick={speak}
      whileTap={{ scale: 0.9 }}
      aria-label="Telaffuzu dinle"
      title="Telaffuzu dinle"
      className={`btn btn-ghost shrink-0 ${dim} ${className}`}
    >
      <SpeakerIcon size={size === "sm" ? 13 : 16} />
    </motion.button>
  );
}

/**
 * Metni okur ve okuma **bittiğinde** `done` çağırır.
 *
 * Oyunlarda sabit bir bekleme süresi kullanılıyordu ve yanlıştı: ses
 * önbellekte yoksa sunucudan gelmesi yarım ile bir buçuk saniye sürüyor, yani
 * tur çoğu zaman okuma başlamadan kapanıyordu. Süreyi tahmin etmek yerine
 * gerçek bitişi beklemek tek doğru çözüm.
 *
 * `maxWaitMs` emniyet kemeri: ses hiç çalmaz, ağ takılır ya da tarayıcı
 * bitişi hiç bildirmezse tur sonsuza kadar açık kalmamalı. Normal akışta
 * devreye girmiyor.
 *
 * Dönen işlev bekleyişi iptal ediyor — bileşen sökülürse geç gelen bitiş
 * kapanmış bir turu ilerletmesin.
 */
export function speakThen(
  text: string,
  done: () => void,
  opts: {
    /** Ses hiç çalmazsa turun asılı kalmaması için üst sınır. */
    maxWaitMs?: number;
    /**
     * Sesin gerçek uzunluğu öğrenilince çağrılır.
     *
     * Oyunlar geçiş çizgisini bununla başlatıyor. Sabit bir süre vermek iki
     * yönde de yanlıştı: kısa tahmin çizgiyi erken dolduruyor ve kullanıcı
     * dolu bir çizgiye bakarak bekliyordu, uzun tahmin ise ses bittikten
     * sonra boşuna bekletiyordu.
     */
    onDuration?: (ms: number) => void;
  } = {},
): () => void {
  const { maxWaitMs = 6000, onDuration } = opts;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(guard);
    done();
  };
  const guard = setTimeout(finish, maxWaitMs);
  const clean = cleanForSpeech(text);
  if (!clean) {
    finish();
    return () => clearTimeout(guard);
  }
  const course = readLocal(COURSE_KEY) ?? "de";
  const voice = resolveVoice(course, readLocal(VOICE_KEY));
  play(clean, voice, course, finish, false, onDuration);
  return () => {
    finished = true;
    clearTimeout(guard);
  };
}
