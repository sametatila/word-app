"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpeakerIcon } from "./icons";
import { sharedAudioContext } from "@/lib/audio-context";
import { isAppleMobile } from "@/lib/apple-mobile";
import { afterMs } from "@/components/pocket-clock";
import { trackOnce } from "@/lib/track";
import { screenKey } from "@/lib/screens";
import { PACE_PARAM, PITCH_PARAM, TURKISH_VOICE, lessonVoice, narrationVoice, resolveVoice, type Pace, type Pitch, type VoiceId } from "@/lib/tts/voices";
import { cleanForSpeech, splitForSpeech } from "@/lib/tts/text";
import { dialogueCast } from "@/lib/tts/speakers";
import { useT } from "@/lib/i18n/client";

/**
 * Tarayıcının konuşma sentezi ile telaffuz. Desteklenmiyorsa hiç görünmez.
 *
 * Zürih kursunda (gsw-zh) de-CH sesi tercih edilir: Dieth yazımı fonetik
 * olduğu için İsviçre aksanlı ses, lehçe metnini şaşırtıcı ölçüde doğru okur.
 * Gerçek Mundart kayıtları dinleme egzersizlerinde ayrıca sunulur.
 */
/** Kursun ve sesin cihazdaki aynası — çalma anında eşzamanlı okunmalı. */
/** Seçili kursun cihazdaki aynası — hedef dilin ADINI yazan yerler de okuyor. */
export const COURSE_KEY = "lernomi-course";
const VOICE_KEY = "lernomi-voice";

export function readLocal(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/* `cleanForSpeech` ve `splitForSpeech` artik `lib/tts/text`te ve SUNUCUYLA
   AYNI kopya. Burada ayri bir kopyasi vardi; ayrismalari sessizdi cunku metin
   URL'ye giriyor ve URL onbellek anahtarinin kendisi — ayni cumlenin iki
   farkli yazimi iki ayri sentez demekti. */

/** Seslendirme ucunun adresi — URL önbellek anahtarı olduğu için tek yerde. */
/** Hız kademesi — `true` eski "yavaş" çağrılarının kısaltması. */
function paceOf(slow: Pace | boolean): Pace {
  return slow === true ? "slow" : slow === false ? "normal" : slow;
}

function ttsUrl(voice: VoiceId, clean: string, slow: Pace | boolean = false, pitch: Pitch = "mid"): string {
  const pace = paceOf(slow);
  // Varsayilanlar URL'ye YAZILMIYOR: `r`siz ve `p`siz adres eski adresle
  // birebir ayni kalmali, yoksa bugune kadar isinmis butun onbellek girdileri
  // (tarayici + nginx, 60 gun) bir anda iskalanir.
  return (
    `/api/tts?v=${voice}&t=${encodeURIComponent(clean)}` +
    (pace === "normal" ? "" : `&r=${PACE_PARAM[pace]}`) +
    (pitch === "mid" ? "" : `&p=${PITCH_PARAM[pitch]}`)
  );
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
 * Kullanıcı hareketinde ses öğelerini serbest bırakır.
 *
 * Sessiz ve çok kısa bir kayıt çalınıyor; amaç ses çıkarmak değil, tarayıcının
 * "bu öğeyi kullanıcı başlattı" saymasını sağlamak.
 *
 * iOS'ta iki incelik var ve ikisi de burada yanlıştı:
 *
 *   1. **Hangi olay sayılır.** WebKit medya oynatmayı `touchend`, `click` ve
 *      `keydown` ile serbest bırakıyor; `pointerdown` (dokunuşun BAŞI) bunun
 *      için yeterli bir kullanıcı etkinleşmesi değil. Yalnız `pointerdown`
 *      dinlendiği için iOS'ta öğe hiçbir zaman açılmıyordu.
 *   2. **Bir kez denemek yetmez.** Dinleyici `once` idi ve `play()` reddedilse
 *      bile kaldırılıyordu; yani ilk deneme başarısız olduğunda öğe o oturum
 *      boyunca kilitli kalıyordu.
 *
 * Sonuç şuydu: kendiliğinden okuyan yerler (Kulaktan Tanı turu) hiç
 * konuşmuyordu; hoparlör düğmesi de kurtarmıyordu, çünkü asıl çalma `fetch`
 * sonrasına — yani dokunuşun dışına — düşüyor ve orada açılmamış öğe yine
 * engelleniyordu. Ardından tarayıcı sentezine düşülüyor, o da yüklü PWA'da
 * güvenilir çalışmıyor: tam sessizlik.
 *
 * Artık BAŞARIYA kadar deneniyor ve `touchend`/`click` de dinleniyor.
 */
const UNLOCK_EVENTS = ["touchend", "click", "keydown", "pointerup"] as const;
let unlocked = false;

/** Sessiz, çok kısa mp3 — tek amacı öğeyi kullanıcı hareketiyle çalıştırmak. */
const SILENCE =
  "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD//////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA";

function primeOnFirstGesture() {
  if (typeof window === "undefined") return;
  const unlock = () => {
    if (unlocked) return detach();
    // Askıya alınmış WebAudio bağlamı da bu hareketle uyanabilir; bağlam
    // uygulama arka plana atılınca yeniden askıya alınıyor, o yüzden her
    // harekette deneniyor.
    sharedAudioContext();
    const els = [audioElement(), extraElement()].filter(Boolean) as HTMLAudioElement[];
    if (!els.length) return;
    let kalan = els.length;
    let hepsi = true;
    for (const el of els) {
      el.src = SILENCE;
      // iOS'ta `volume` salt okunur; kayıt zaten sessiz olduğu için sorun yok.
      void el.play().then(
        () => { el.pause(); },
        () => { hepsi = false; },
      ).finally(() => {
        if (--kalan === 0 && hepsi) { unlocked = true; detach(); }
      });
    }
  };
  const detach = () => {
    for (const ev of UNLOCK_EVENTS) window.removeEventListener(ev, unlock);
  };
  // `once` YOK: ilk deneme reddedilirse sonraki dokunuşta yeniden denenmeli.
  for (const ev of UNLOCK_EVENTS) window.addEventListener(ev, unlock);
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
export function speakGerman(
  text: string,
  onEnd?: () => void,
  slow: Pace | boolean = false,
  /** Ses gerçekten başlayınca, bir kez (dinleme düğmesinin "yükleniyor"u buna bakıyor). */
  onStart?: () => void,
) {
  /*
    UZUN METİN BÖLÜNÜYOR — bu yol eskiden sessizliğe çıkıyordu.

    Uç 600 karakterin üstünü 400 `bad_text` ile REDDEDİYOR, kırpmıyor; burası
    ise metni olduğu gibi tek istekte gönderiyordu. Ölçüldü: okuma
    alıştırmalarının 120'sinden 85'i (en uzunu 2245 karakter) bu yüzden hiç
    seslendirilemiyordu, üstelik hata sessizdi. Rol yapma cevapları ve ders
    anlatımının birleştirilmiş replikleri de aynı tavana açıktı.

    Kısa metinler — kelime turu, tek cümle, yani çağrıların ezici çoğunluğu —
    tek parça kalıyor ve eski yoldan gidiyor: adres birebir aynı, yani bugüne
    kadar ısınmış önbellek girdilerinin hiçbiri boşa düşmüyor.
  */
  const parts = splitForSpeech(text);
  if (!parts.length) {
    onStart?.();
    onEnd?.();
    return;
  }

  const course = readLocal(COURSE_KEY) ?? "de";
  const voice = resolveVoice(course, readLocal(VOICE_KEY));
  // Hangi ekranda ses dinleniyor — ekran açılışı başına bir kez (WP-80).
  if (typeof window !== "undefined") trackOnce("tts_play", 0, screenKey(window.location.pathname));

  // Zincirin iki basamağı da başlangıç bildirebiliyor (WebAudio düşüp öğeye
  // geçerse); çağıran yalnız bir kez duymalı.
  let started = false;
  const startOnce = onStart
    ? () => {
        if (started) return;
        started = true;
        onStart();
      }
    : undefined;
  if (parts.length === 1) {
    speakChain(parts[0], voice, course, onEnd, slow, startOnce);
    return;
  }
  const lang = voice.startsWith("en") ? "en" : voice.startsWith("tr") ? "tr" : "de";
  speakSegments(
    parts.map((text) => ({ lang, text, voice, pace: paceOf(slow) }) as SpeechSegment),
    onEnd,
    startOnce,
  );
}

/**
 * Tek bir metnin çalınma ZİNCİRİ — üç basamak, sırası önemli:
 *
 *   1. WebAudio (`playGapless`): bağlam uyanıksa en güvenilir yol. Sesi
 *      `fetch` ile alıp çözüyor ve planlıyor; paylaşılan `<audio>` öğesinin
 *      otomatik oynatma kilidine ve tek-nesne çekişmesine takılmıyor. Ayrıca
 *      boşluksuz: baştaki/sondaki gömülü sessizlik atılıyor, cümle
 *      aralarındaki duraklamalar sıkışıyor.
 *   2. `<audio>` öğesi: bağlam askıdaysa ya da çözme başarısızsa.
 *   3. Tarayıcı sentezi: ancak ikisi de olmazsa (bkz. play → fallback).
 *
 * NEDEN ORTAK: bu zincir uzun süre yalnız `speakGerman`'daydı; `speakThen`
 * (yani `speakAndExit` üzerinden sekiz oyunun tur kapanışı) doğrudan `play()`
 * çağırıyordu. İkinci basamakta takılan her okuma üçüncüye, yani CİHAZIN KENDİ
 * SESİNE düşüyordu — kullanıcı Katja/Conrad seçmiş olsa bile. Aynı oyunda
 * hoparlör düğmesi (speakGerman) doğru sesle, tur kapanışı (speakThen) sistem
 * sesiyle konuşuyordu; sistemde Almanca ses yoksa hiç konuşmuyordu.
 *
 * Döndürdüğü iptal işlevi WebAudio zincirini durdurur; `<audio>` yolunda
 * durdurulacak planlanmış ses olmadığı için null döner.
 */
function speakChain(
  clean: string,
  voice: VoiceId,
  course: string,
  onEnd?: () => void,
  slow: Pace | boolean = false,
  onStart?: () => void,
): (() => void) | null {
  const mine = ++token;
  stopActiveChain();
  element?.pause();
  extra?.pause();
  const cancel = playGapless([ttsUrl(voice, clean, slow)], {
    mine,
    onEnd,
    onStart,
    onFail: () => {
      // Ölçüm: nöral ses WebAudio ile çalınamadı. Sık görünüyorsa sorun ağ ya
      // da çözme tarafında; bu iki basamak da hâlâ DOĞRU sesi çalıyor.
      if (typeof window !== "undefined") trackOnce("tts_fallback", 0, "element");
      play(clean, voice, course, onEnd, slow, onStart);
    },
  });
  if (cancel) {
    activeChainStop = cancel;
    return cancel;
  }
  play(clean, voice, course, onEnd, slow, onStart);
  return null;
}

/**
 * Belirli bir sesle okur — ses seçim ekranı bunu kullanıyor.
 *
 * Seçimden önce dinletmek gerekiyor: iki sesin farkı yazıyla anlatılamaz,
 * kullanıcı her gün dinleyeceği sesi duyarak seçmeli.
 */
export function speakWithVoice(text: string, voice: VoiceId) {
  const clean = cleanForSpeech(text);
  // Zincirin tamamı: önizleme cihazın kendi sesine düşerse ekran tam da
  // seçilmekte olan sesi YANLIŞ duyurur — burada yedeğe düşmek en zararlı yer.
  if (clean) speakChain(clean, voice, voice.startsWith("de-CH") ? "gsw-zh" : "de");
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
/**
 * Ses indirmenin tavani — Android'in native oynaticisiyla AYNI SAYI
 * (`playTtsUrl` connectTimeout/readTimeout 8000). Suresi gecen bir ses ise
 * yaramaz: kullanici cumleyi coktan gecti. On indirmeler bunun disinda
 * (atesle-unut, yanit bir yil `immutable` onbellekte).
 */
const TTS_FETCH_TIMEOUT_MS = 8_000;

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
export type SpeechSegment = {
  lang: "tr" | "de" | "en";
  text: string;
  /**
   * Anlatım parçası: metin SÖZLÜKTEN geliyor, yani `lang` gerçekten o parçanın
   * dili. Bayrak olmadan `lang: "tr"` iki ayrı şey demek oluyordu — "Türkçe
   * metin" ve "anlatım" — ve ders içeriği Türkçe kaldığı için ikisini tek
   * kuralla ayırmak mümkün değildi. İşaretli parçalar anlatım sesiyle,
   * işaretsizler bugünkü davranışla okunuyor.
   */
  narration?: boolean;
  /**
   * Bu parçanın SESİ — diyalogda konuşmacı başına atanıyor (bkz.
   * `dialogueSegments`). Verilmezse ses dilden türetiliyor, yani bugüne
   * kadarki davranış.
   */
  voice?: VoiceId;
  /** Perde kaydırma — kadro tükenince konuşmacıyı ayırmanın son çaresi. */
  pitch?: Pitch;
  /**
   * Bu parçanın okuma HIZI.
   *
   * Parça başına olmasının sebebi diyalog: dinleme metni `listen` hızında
   * okunuyor (bir cümle değil bir konuşma dinleniyor ve kelime turunun hızı
   * orada "aşırı hızlı" duyuldu) ama aynı zincirdeki yönerge anlatımı normal
   * hızda kalmalı.
   */
  pace?: Pace;
  /**
   * Bu parçadan ÖNCE bırakılacak sessizlik, saniye.
   *
   * Konuşmacı değişimi için: iki replik arasına insan konuşmasındaki sıra
   * geçişi kadar pay konmazsa iki kişi tek bir akış gibi duyuluyor — ayrı
   * sesler verilse bile. Yalnızca boşluksuz WebAudio yolunda anlamlı; ses
   * öğesi yolunda dosyaların kendi kenar sessizlikleri zaten duruyor.
   */
  gapBefore?: number;
};

/**
 * Parçanın sesi profil tercihinden BAĞIMSIZ: derste öncelik gecikme.
 *
 * Ses sabit olunca dersin her cümlesi kullanıcıdan bağımsız tek önbellek
 * girdisi — ilk dinleyen CDN'i herkes için ısıtıyor (bkz. lib/tts/voices,
 * lessonVoice). Profil sesi konuşma pratiği gibi kullanıcıya özel üretilen
 * yerlerde geçerli olmayı sürdürüyor.
 */
function voiceForSegment(seg: SpeechSegment): { voice: VoiceId; course: string } {
  // Parça kendi sesini söylüyorsa tartışma yok: diyalog kadrosu böyle çalışıyor.
  if (seg.voice) return { voice: seg.voice, course: seg.lang === "en" ? "en" : "de" };
  // Anlatım: ses kullanıcının ARAYÜZ dilinden. Çerez tek istemci kaynağı —
  // bu fonksiyon bir bileşen değil, kancadan okuyamaz.
  if (seg.narration) return { voice: narrationVoice(seg.lang), course: "de" };
  if (seg.lang === "tr") return { voice: TURKISH_VOICE, course: "de" };
  /*
    PARÇANIN DİLİ KURSTAN ÖNCE GELİYOR.

    Burada yalnız `COURSE_KEY` okunuyordu, yani `seg.lang` sessizce atılıyordu.
    Sonucu şuydu: cihazında Almanca kurs kayıtlı bir kullanıcı İNGİLİZCE deneme
    sınavı açtığında bütün dinleme metni Katja'ya, yani Almanca sese gidiyordu
    (`mock-exam-player` tam bunu önlemek için `lang: paper.course` geçiriyordu
    ve değer kullanılmıyordu). Kurs yalnızca parçanın dili kursun diliyle
    uyuştuğunda belirleyici — Zürih'te lehçe sesi seçilebilsin diye.
  */
  const course = readLocal(COURSE_KEY) ?? "de";
  if (seg.lang === "en") return { voice: lessonVoice("en"), course: "en" };
  return { voice: lessonVoice(course === "en" ? "de" : course), course: course === "en" ? "de" : course };
}

/**
 * Parçaların okunmaya hazırlanması: temizle, birleştir, BÖL.
 *
 * Üç iş yapılıyor:
 *
 *   1. AYNI sesle okunacak bitişik parçalar tek parçaya birleşiyor. Her parça
 *      ayrı bir sentez ve ayrı bir ses dosyası demek; "Türkçesi 'su' demek."
 *      ile "Lütfen" arasına dosya sınırı koymak cümlenin ortasına bekleme
 *      koymak oluyor. Sınır yalnızca ses GERÇEKTEN değiştiğinde kalıyor —
 *      dil, anlatım bayrağı, kadro sesi, perde ya da hız değişiyorsa.
 *   2. Üç nokta ("…") atılıyor. İçerikte kalıbın devamını gösteriyor
 *      ("Ich möchte …") ama nöral ses onu uzun bir duraklama olarak okuyor;
 *      ekranda anlamlı, kulakta delik.
 *   3. Birleşen metin TAVANI AŞARSA cümle sınırından bölünüyor. Bu adım
 *      olmadan uzun metin hiç çalmıyordu: uç 600 karakterin üstünü 400
 *      `bad_text` ile reddediyor, kırpmıyor. Bölme birleştirmeden SONRA
 *      olmak zorunda — önce olsaydı parçalar yeniden birleştirilip aynı
 *      duvara çarpardı.
 *
 * Bölme bu işlevin İÇİNDE çünkü önden indirme de aynı yoldan geçiyor:
 * önbellek anahtarı metnin kendisi, başka türlü bölünmüş metin başka (ve
 * boşuna) bir girdi olurdu.
 */
function mergeForSpeech(segments: SpeechSegment[]): SpeechSegment[] {
  const merged: SpeechSegment[] = [];
  const sameVoice = (a: SpeechSegment, b: SpeechSegment) =>
    a.lang === b.lang && a.narration === b.narration && a.voice === b.voice && a.pitch === b.pitch && a.pace === b.pace;
  for (const seg of segments) {
    const text = cleanForSpeech(seg.text.replace(/…|\.{3}/g, " "));
    if (!text) continue;
    const last = merged[merged.length - 1];
    // Kendi payı istenen bir parça birleşmiyor: pay ancak parça sınırında var.
    if (last && sameVoice(last, seg) && !seg.gapBefore) last.text = `${last.text} ${text}`;
    else merged.push({ ...seg, text });
  }

  const out: SpeechSegment[] = [];
  for (const seg of merged) {
    const parts = splitForSpeech(seg.text);
    parts.forEach((text, i) => out.push(i === 0 ? { ...seg, text } : { ...seg, text, gapBefore: undefined }));
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
    /**
     * Parça başına, ÖNCESİNE bırakılacak sessizlik (saniye). Verilmeyen
     * parçalar `SEGMENT_GAP` alıyor. Diyalogda konuşmacı değişimi için var:
     * iki replik arasına sıra geçişi payı konmazsa ayrı seslerle okunsalar
     * bile tek bir akış gibi duyuluyorlar.
     */
    gaps?: number[];
  },
): (() => void) | null {
  /*
    iPHONE/iPAD'DE WebAudio YOLU KULLANILMIYOR — ses öğesi çalıyor.

    iOS, WebAudio çıkışını telefonun SESSİZ ANAHTARINA bağlıyor; `<audio>`
    öğesini bağlamıyor. Anahtarı sessizde tutan (iPhone kullanıcılarının
    çoğu) iOS web uygulamasında hiç ses duymuyordu: bağlam "running", sesler
    planlanıyor, hoparlörden bir şey çıkmıyor — hata da yok, yedeğe de
    düşülmüyor. `navigator.audioSession.type = "playback"` bunu çözüyor ama
    aynı oturumu mikrofon da kullanıyor (konuşma alıştırmaları, cepte yürüyüş)
    ve kaydı bozma riski var. Kaybedilen tek şey kenar sessizliklerinin
    kırpılması; iOS'ta duyulmak boşluksuzluktan önce.
  */
  if (isAppleMobile()) return null;
  const ctx = sharedAudioContext();
  if (!ctx || ctx.state !== "running") return null;
  const { mine, onEnd, onFail, onStart, gaps } = opts;

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
        /* TAVAN: bu indirme OYNATMA YOLU, on indirme degil - kullanici
           sesin baslamasini bekliyor ve asili kalan bir istek dersi sessiz
           birakiyordu. Android ayni indirmeyi native yapiyor ve sekiz
           saniyede vazgeciyor (`LernomiSpeechModule.playTtsUrl`
           connectTimeout/readTimeout 8000); ayni sayi burada. */
        const res = await fetch(urls[i], { signal: AbortSignal.timeout(TTS_FETCH_TIMEOUT_MS) });
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
      const gap = i ? (gaps?.[i] ?? SEGMENT_GAP) : 0;
      let at = Math.max(tail + gap, ctx.currentTime + (i ? 0.03 : 0.15));
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

  /* Adres parçanın hızını ve perdesini de taşımak ZORUNDA: taşımasaydı
     WebAudio yolundan bu yola düşen bir diyalog aynı metni başka bir adresle
     ister, yani önbelleği ıskalar ve konuşmacılar tek sese dönerdi. */
  const srcFor = (seg: SpeechSegment) => ttsUrl(voiceForSegment(seg).voice, seg.text, seg.pace ?? "normal", seg.pitch ?? "mid");
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

    let retried = false;
    const fallback = (err?: unknown) => {
      if (moved || token !== mine) return;
      // Arka planda tarayıcı sentezi yok: konuşmuyor ve `onend` vermiyor,
      // yani zinciri kurtarmak yerine asıyor. Parça atlanıyor.
      if (background) {
        next();
        return;
      }
      /*
        Seçilen ses yerine cihaz sesi YOK (bkz. `play`): önce bu parça bir kez
        yeniden deneniyor, olmazsa atlanıyor. Cihaz sesi yalnız çevrimdışıyken.
        Otomatik oynatma engelinde yeniden deneme de işe yaramaz, doğrudan atla.
      */
      const blocked = err instanceof DOMException && err.name === "NotAllowedError";
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      if (!blocked && !offline && !retried) {
        retried = true;
        if (typeof window !== "undefined") trackOnce("tts_fallback", 0, "retry");
        el.removeAttribute("src");
        el.src = srcFor(queue[i]);
        void el.play().catch(fallback);
        return;
      }
      if (!offline) {
        if (typeof window !== "undefined") trackOnce("tts_fallback", 0, blocked ? "blocked" : "skip");
        next();
        return;
      }
      moved = true;
      disarm();
      const { voice, course } = voiceForSegment(queue[i]);
      speakWithBrowser(queue[i].text, voice, course, () => playAt(i + 1));
    };

    el.onended = next;
    el.onerror = () => fallback();

    if (background) {
      // Önce yalnızca BAŞLAMASI bekleniyor; ses akmaya başlayınca tavan
      // parçanın kendi süresine göre yeniden kuruluyor.
      /*
        Başlama gözcüsü ÇALAN sesi kesmemeli.

        `onplaying` olayı kaçırılabiliyor (öğe paylaşıldığı için başka bir
        okuma araya girip işleyiciyi değiştirebiliyor). Gözcü o durumda hâlâ
        çalan bir parçanın üstüne sıradakini başlatırdı — iki parça aynı anda,
        yani yankı. Gerçekten sessizse ilerliyor, çalıyorsa payı yeniliyor.
      */
      const startGuard = () => {
        if (moved || token !== mine) return;
        /*
          Ölçüt `paused` DEĞİL, sesin ilerlemiş olması.

          `play()` çağrılır çağrılmaz `paused` false oluyor — ses hiç akmasa,
          istek ağda asılı kalsa bile. Ona bakan bir koruma, gözcüyü tam
          gerekli olduğu durumda (ağ takıldı, ses hiç gelmiyor) devre dışı
          bırakıyordu. `currentTime` ise yalnızca gerçekten çalarken ilerliyor.
        */
        if (el.currentTime > 0 && !el.ended) {
          disarm = afterMs(SEGMENT_CAP_MS, next);
          return;
        }
        next();
      };
      disarm = afterMs(SEGMENT_START_MS, startGuard);
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

  const urls = queue.map((seg) => ttsUrl(voiceForSegment(seg).voice, seg.text, seg.pace ?? "normal", seg.pitch ?? "mid"));
  const cancel = playGapless(urls, {
    mine,
    onEnd,
    onStart: startOnce,
    gaps: queue.map((seg) => seg.gapBefore ?? SEGMENT_GAP),
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

/** Konuşmacı değişiminde bırakılan pay, saniye — sıra geçişinin duyulması için. */
const SPEAKER_GAP = 0.38;

/**
 * Bir diyaloğu okunabilir parçalara çevirir — konuşmacı başına ayrı ses.
 *
 * Dinleme içeriğinin dört ayrı modeli (deneme sınavı, haftalık quiz, beceri
 * dinlemesi, modül sınavı) aynı `{ speaker?, text }` biçimini taşıyor, o
 * yüzden dönüştürme tek yerde. Çağıran taraf sonucu hem `speakSegments`e hem
 * `prefetchSegments`e verebiliyor: ikisi de aynı adresleri üretiyor, yani
 * önden indirilen ses çalınacak sesin ta kendisi.
 *
 * ÜÇ ŞEY BİRDEN ÇÖZÜLÜYOR ve üçü de aynı çağrıda olmak zorunda:
 *   - Konuşmacı başına ses (`dialogueCast`).
 *   - Replik başına parça: diyaloğun tamamı tek dizgede birleştirilince 600
 *     karakter tavanını aşıyor ve uç 400 dönüyordu — 672 diyalog bloğunun
 *     347'sinin toplamı tavanın üstünde.
 *   - Konuşmacı değişiminde nefes payı: ayrı sesler bile araya pay konmadan
 *     tek bir akış gibi duyuluyor.
 *
 * Hız varsayılan olarak `listen`: dinleme alıştırmasında bir cümle değil bir
 * konuşma dinleniyor ve kelime turunun hızı orada "aşırı hızlı" duyuldu
 * (bkz. lib/tts/voices, `Pace`).
 */
export function dialogueSegments(
  course: string,
  segments: { speaker?: string; text: string }[],
  pace: Pace = "listen",
): SpeechSegment[] {
  const cast = dialogueCast(course, segments);
  const lang = course === "en" ? "en" : "de";
  let previous = "";
  return segments.map((seg, i) => {
    const who = seg.speaker ?? "";
    // Pay yalnız konuşmacı GERÇEKTEN değiştiğinde: aynı kişinin iki cümlesi
    // arasına sıra geçişi payı koymak konuşmayı kekeletirdi.
    const gapBefore = i > 0 && who !== previous ? SPEAKER_GAP : undefined;
    previous = who;
    return { lang, text: seg.text, voice: cast[i].voice, pitch: cast[i].pitch, pace, gapBefore } as SpeechSegment;
  });
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
    void fetch(ttsUrl(voiceForSegment(seg).voice, seg.text, seg.pace ?? "normal", seg.pitch ?? "mid"), {
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
  slow: Pace | boolean = false,
  onStart?: () => void,
) {
  const audio = audioElement();
  if (!audio) {
    speakWithBrowser(clean, voice, course, onEnd, slow, onStart);
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
  const url = ttsUrl(voice, clean, slow);
  /** Kaçıncı deneme — geç gelen olay önceki denemeye aitse yok sayılır. */
  let attempt = 0;
  let bekci: ReturnType<typeof setTimeout> | undefined;

  /*
    SEÇİLEN SES YERİNE CİHAZ SESİ YOK.

    Nöral ses çalınamayınca (ağ hıçkırığı, 503, otomatik oynatma engeli, yavaş
    yükleme) okuma doğrudan tarayıcı sentezine düşüyordu: kullanıcı Katja'yı
    seçmişken bir anda iPhone'un kendi sesi konuşuyordu ("bazen iOS sesi,
    hiç hoş değil"). Artık:
      1. Otomatik oynatma engeli (`NotAllowedError`) → okuma atlanıyor; aynı
         engel cihaz sesini de susturuyor, yedek bir şey kurtarmıyordu.
      2. Başka bir hata → nöral ses BİR KEZ yeniden deneniyor (nginx önbelleği
         ikinci denemeyi çoğu zaman anında karşılıyor).
      3. Yine olmazsa okuma atlanıyor — sessiz bir kelime, yanlış sesle
         okunmuş bir kelimeden iyi.
    Cihaz sesi yalnız ÇEVRİMDIŞIYKEN: orada nöral sesin yolu hiç yok.
  */
  const fail = (n: number, err?: unknown) => {
    if (done || token !== mine || n !== attempt) return;
    if (bekci) clearTimeout(bekci);
    const blocked = err instanceof DOMException && err.name === "NotAllowedError";
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    if (!blocked && !offline && attempt === 1) {
      if (typeof window !== "undefined") trackOnce("tts_fallback", 0, "retry");
      start();
      return;
    }
    done = true;
    // Öğe hâlâ yüklüyor olabilir (nöbetçi): geç başlayıp üstüne binmesin.
    audio.pause();
    if (offline) {
      if (typeof window !== "undefined") trackOnce("tts_fallback", 0, "browser");
      speakWithBrowser(clean, voice, course, onEnd, slow, onStart);
      return;
    }
    if (typeof window !== "undefined") trackOnce("tts_fallback", 0, blocked ? "blocked" : "skip");
    onEnd?.();
  };

  /*
    İKİ öğe birden susturuluyor.

    Buradaki tek satır uzun süre `audio.pause()` idi, yani yalnızca birinci
    öğe. İkinci öğeyi ise parça zinciri kullanıyor (ders anlatımı ve yürürken
    modu, bkz. chainWithElements) ve o zincir yarıda kaldığında ikinci öğe
    ÇALMAYA DEVAM ediyordu. Ardından bir oyun turu konuşunca iki ses üst üste
    biniyor: aynı sesin hafif kaymış iki kopyası, yani "boş bir odada yankı".

    Susturmanın diğer bütün yolları (stopSpeaking, speakSegments, iptal
    işlevleri) zaten ikisini de durduruyordu; eksik olan yalnızca bu yoldu ve
    oyunların TAMAMI bu yoldan konuşuyor.
  */
  stopActiveChain();
  element?.pause();
  extra?.pause();

  function start() {
    const n = ++attempt;
    audio!.onended = () => {
      if (n === attempt) finish();
    };
    audio!.onerror = () => fail(n);
    // Öğe paylaşılıyor: yarıda kesilen bir parça zinciri kendi `onplaying`
    // işleyicisini geride bırakmış olabilir (bkz. chainWithElements).
    audio!.onplaying = () => {
      if (n !== attempt || token !== mine) return;
      if (bekci) clearTimeout(bekci);
      onStart?.();
    };
    if (n > 1) audio!.removeAttribute("src");
    audio!.src = url;
    // `currentTime` ataması KORUNMALI: kaynak henüz yüklenmemişken (readyState
    // HAVE_NOTHING) Safari bunu InvalidStateError ile reddedebiliyor ve fırlayan
    // hata bir alt satırdaki play()'e hiç sıra gelmeden çağıran işleyiciyi
    // kırıyordu — hoparlör düğmesi hiçbir şey yapmamış gibi görünüyordu.
    try {
      audio!.currentTime = 0;
    } catch {
      /* kaynak henüz açılmadı; zaten baştan başlayacak */
    }
    void audio!.play().catch((e) => fail(n, e));
    /*
      Nöbetçi: play() sözü çözülse bile ses hiç BAŞLAMAYABİLİYOR (iOS'ta
      engellenen oynatma bazen ne reddediyor ne de `error` veriyor). Öğe hâlâ
      ağdan okuyorsa (hata yok, `NETWORK_LOADING`) indirme tavanına kadar
      bekleniyor: ilk kez dinlenen metin sunucuda sentezleniyor ve iOS aynı
      sesi iki aralık isteğiyle alıyor, 2,5 sn sık aşılıyordu.
    */
    const basla = Date.now();
    const nobet = () => {
      if (done || token !== mine || n !== attempt) return;
      if (!audio!.paused && audio!.currentTime > 0) return;
      const yukluyor = !audio!.error && audio!.networkState === HTMLMediaElement.NETWORK_LOADING;
      if (yukluyor && Date.now() - basla < TTS_FETCH_TIMEOUT_MS) {
        bekci = setTimeout(nobet, 500);
        return;
      }
      fail(n);
    };
    bekci = setTimeout(nobet, PLAY_WATCHDOG_MS);
  }
  start();
}

/**
 * Sesin başlaması için tanınan süre. Ağ + çözme payı bırakacak kadar uzun,
 * kullanıcının "hiçbir şey olmadı" diyeceğinden kısa.
 */
const PLAY_WATCHDOG_MS = 2500;

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
  slow: Pace | boolean = false,
  onStart?: () => void,
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onStart?.();
    onEnd?.();
    return;
  }
  // Dil, istenen sesin kimliğinden okunuyor: Türkçe anlatım parçası yedekte de
  // Türkçe okunmalı — kursun Almanca sesine düşmek anlatımı anlaşılmaz yapar.
  const lang = voice.slice(0, 5);
  const gsw = course === "gsw-zh" && lang !== "tr-TR";
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = gsw ? "de-CH" : lang;
  // Nöral sesin kademeleriyle aynı sıra (bkz. `rateFor`): dinleme metni
  // kelime turundan yavaş, yavaş dinleme hepsinden yavaş.
  const pace = paceOf(slow);
  u.rate =
    pace === "listenSlow" ? (gsw ? 0.5 : 0.55)
    : pace === "slow" ? (gsw ? 0.55 : 0.6)
    : pace === "listen" ? (gsw ? 0.75 : 0.8)
    : gsw ? 0.88 : lang === "tr-TR" ? 1 : 0.92;
  const voices = window.speechSynthesis.getVoices();
  const picked = gsw
    ? (voices.find((v) => v.lang === "de-CH") ?? voices.find((v) => v.lang.startsWith("de")))
    : (voices.find((v) => v.lang === lang) ??
      voices.find((v) => v.lang.startsWith(lang.slice(0, 2))));
  if (picked) u.voice = picked;
  if (onStart) u.onstart = () => onStart();
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
  const t = useT();
  const speak = useCallback(() => speakGerman(text), [text]);
  if (!available) return null;
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  return (
    <motion.button
      type="button"
      onClick={speak}
      whileTap={{ scale: 0.96 }}
      /* ERİŞİLEBİLİR AD ANDROID'İN ADI. Aynı düğme iki platformda iki ayrı
         anahtar okuyordu: Android `speakbutton.read_aloud` ("Sesli oku",
         ortak sözlükte), web `common.listen_pronunciation` ("Telaffuzu
         dinle", yalnız web sözlüğünde). Aynı denetim, iki ad: ekran okuyucu
         kullanan biri kelime listesinde aynı düğmeyi iki uygulamada iki ayrı
         isimle duyuyordu. Ortak olan kullanılıyor. */
      aria-label={t("speakbutton.read_aloud")}
      title={t("speakbutton.read_aloud")}
      /*
        DOLGU VE MÜREKKEP ANDROID'İNKİ.

        `btn-ghost` nötr bir yüzey (`--surface-2` zemin, `--text` mürekkep);
        Android'in aynı düğmesi MARKA TİNTİNDE (`ui/SpeakButton`:
        `backgroundColor: colors.primarySoft`, ikon `colors.primary`,
        kenarlık `colors.hairline`). Yani kelime listesinde aynı hoparlör
        webde gri, Android'de turuncuydu.

        İkonun boyu da oranla: Android kutunun 0.52'sini kullanıyor
        (`Math.round(size * 0.52)`), web sabit 13/16 yazıyordu - 36'lık
        kutuda 0.44, yani göreli olarak daha küçük bir simge.
      */
      className={`btn hit-8 shrink-0 ${dim} ${className}`}
      style={{
        background: "var(--brand-soft)",
        color: "var(--color-brand)",
        border: "1px solid var(--hairline)",
      }}
    >
      <SpeakerIcon size={size === "sm" ? 15 : 19} />
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
  } = {},
): () => void {
  const { maxWaitMs = 6000 } = opts;
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
  // speakGerman ile AYNI zincir. Eskiden burası doğrudan play() çağırıyordu ve
  // ikinci basamakta takılan okuma sessizce tarayıcı sentezine düşüyordu.
  const cancelChain = speakChain(clean, voice, course, finish, false);
  return () => {
    finished = true;
    clearTimeout(guard);
    // Planlanmış WebAudio sesleri de sustur: useRoundExit sökülürken bekleyen
    // her şeyi iptal ediyor, ses de buna dahil — yoksa tur kapandıktan sonra
    // konuşmaya devam ederdi.
    cancelChain?.();
  };
}
