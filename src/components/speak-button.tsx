"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpeakerIcon } from "./icons";
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
  play(clean, voice, course, onEnd, slow);
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
  void fetch(`/api/tts?v=${voice}&t=${encodeURIComponent(clean)}`, {
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

/**
 * Parçaları sırayla, her birini kendi dilinin sesiyle okur.
 *
 * `onEnd` son parça bittiğinde (ya da hiç çalınamadığında) bir kez çağrılır —
 * eller serbest akışta mikrofonun açılması buna bağlı. Dönen işlev okumayı
 * iptal eder ve sesi susturur.
 *
 * Oynatma çift tamponlu: parça i çalarken parça i+1 öteki öğede yükleniyor,
 * bitişte hazır öğeye yalnızca play() deniyor. Tek öğeyle her sınırda
 * "src değiştir → indir → çöz → başla" bekleniyordu ve kullanıcı bunu
 * cümlelerin arasında düzenli bir takılma olarak duyuyordu.
 */
export function speakSegments(segments: SpeechSegment[], onEnd?: () => void): () => void {
  const queue = mergeForSpeech(segments);
  if (!queue.length) {
    onEnd?.();
    return () => {};
  }

  const a = audioElement();
  const b = extraElement();
  const mine = ++token;

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
    step(0);
    return () => {
      if (token === mine) token++;
    };
  }

  a.pause();
  b.pause();
  const els = [a, b];

  const srcFor = (seg: SpeechSegment) => {
    const { voice } = voiceForSegment(seg);
    return `/api/tts?v=${voice}&t=${encodeURIComponent(seg.text)}`;
  };
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
    const fallback = () => {
      // Uç düşmüş ya da dosya çalınamıyor: bu parçayı tarayıcı sentezi okusun,
      // zincir kopmasın.
      if (token !== mine) return;
      const { voice, course } = voiceForSegment(queue[i]);
      speakWithBrowser(queue[i].text, voice, course, () => playAt(i + 1));
    };
    el.onended = () => {
      if (token === mine) playAt(i + 1);
    };
    el.onerror = fallback;
    if (i + 1 < queue.length) preload(i + 1);
    void el.play().catch(fallback);
  };

  preload(0);
  playAt(0);
  return () => {
    if (token !== mine) return;
    token++;
    a.pause();
    b.pause();
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
    const { voice } = voiceForSegment(seg);
    void fetch(`/api/tts?v=${voice}&t=${encodeURIComponent(seg.text)}`, {
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
  audio.src = `/api/tts?v=${voice}&t=${encodeURIComponent(clean)}${slow ? "&r=slow" : ""}`;
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
