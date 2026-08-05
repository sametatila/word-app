"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpeakerIcon } from "./icons";
import { resolveVoice, type VoiceId } from "@/lib/tts/voices";

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
 * sohbet cevabı). Bir kez kullanıcı hareketiyle çalmış öğe sonrasında serbest
 * kalıyor, bu yüzden aynı öğe yeniden kullanılıyor ve ilk dokunuşta sessiz bir
 * kayıtla hazırlanıyor.
 *
 * Yan kazanç: aynı anda tek ses çalıyor — yeni okuma öncekini kesiyor, eski
 * `speechSynthesis.cancel()` davranışıyla aynı.
 */
let element: HTMLAudioElement | null = null;
/** Bitişi hangi okumaya ait olduğunu ayırt etmek için — öğe paylaşıldığı için gerekli. */
let token = 0;

function audioElement(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  if (!element) element = new Audio();
  return element;
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
    const el = audioElement();
    if (el) {
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
 * Eller serbest sohbette mikrofonun kendiliğinden açılması buna bağlı; hiç
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

/** Telaffuz çalışması için yavaş okuma — önce heceleri ayırt et, sonra tekrarla. */
export function speakSlowly(text: string, onEnd?: () => void) {
  speakGerman(text, onEnd, true);
}

function play(
  clean: string,
  voice: VoiceId,
  course: string,
  onEnd?: () => void,
  slow = false,
) {
  const audio = audioElement();
  if (!audio) {
    speakWithBrowser(clean, course, onEnd, slow);
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
    speakWithBrowser(clean, course, onEnd, slow);
  };

  audio.pause();
  audio.onended = finish;
  audio.onerror = fallback;
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
function speakWithBrowser(clean: string, course: string, onEnd?: () => void, slow = false) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }
  const gsw = course === "gsw-zh";
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = gsw ? "de-CH" : "de-DE";
  u.rate = slow ? (gsw ? 0.55 : 0.6) : gsw ? 0.88 : 0.92;
  const voices = window.speechSynthesis.getVoices();
  const picked = gsw
    ? (voices.find((v) => v.lang === "de-CH") ?? voices.find((v) => v.lang.startsWith("de")))
    : voices.find((v) => v.lang.startsWith("de"));
  if (picked) u.voice = picked;
  if (onEnd) {
    u.onend = () => onEnd();
    // Hata da bir bitiştir: sentez çuvallarsa döngü asılı kalmasın.
    u.onerror = () => onEnd();
  }
  // cancel() bekleyen konuşmanın onend'ini de tetikler; çağıran taraf hangi
  // okumanın bittiğini ayırt edebilmeli (bkz. chat-player, konuşma jetonu).
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
