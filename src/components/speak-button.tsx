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

/** Aynı anda tek ses: yeni okuma öncekini keser (eski `speechSynthesis.cancel()` gibi). */
let current: HTMLAudioElement | null = null;

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
export function speakGerman(text: string, onEnd?: () => void) {
  const clean = cleanForSpeech(text);
  if (!clean) {
    onEnd?.();
    return;
  }

  const course = readLocal(COURSE_KEY) ?? "de";
  const voice = resolveVoice(course, readLocal(VOICE_KEY));
  play(clean, voice, course, onEnd);
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

function play(clean: string, voice: VoiceId, course: string, onEnd?: () => void) {
  current?.pause();
  current = null;

  const audio = new Audio(`/api/tts?v=${voice}&t=${encodeURIComponent(clean)}`);
  current = audio;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    if (current === audio) current = null;
    onEnd?.();
  };

  audio.onended = finish;
  // Uç düşmüş, ağ yok ya da tarayıcı mp3'ü çalamıyor: eski davranışa dön.
  audio.onerror = () => {
    if (done) return;
    done = true;
    if (current === audio) current = null;
    speakWithBrowser(clean, course, onEnd);
  };

  // play() reddedilirse (otomatik oynatma engeli) de aynı yedeğe düşülür.
  void audio.play().catch(() => audio.onerror?.(new Event("error")));
}

/**
 * Tarayıcının kendi sentezi — yedek yol.
 *
 * Sesi bulma mantığı olduğu gibi korundu: Zürih kursunda de-CH sesi varsa o
 * tercih edilir, yoksa herhangi bir Almanca ses. Cihazda de-CH bulunmaması
 * zaten bu değişikliğin sebeplerinden biriydi.
 */
function speakWithBrowser(clean: string, course: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }
  const gsw = course === "gsw-zh";
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = gsw ? "de-CH" : "de-DE";
  u.rate = gsw ? 0.88 : 0.92;
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
