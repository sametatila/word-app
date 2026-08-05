"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpeakerIcon } from "./icons";

/**
 * Tarayıcının konuşma sentezi ile telaffuz. Desteklenmiyorsa hiç görünmez.
 *
 * Zürih kursunda (gsw-zh) de-CH sesi tercih edilir: Dieth yazımı fonetik
 * olduğu için İsviçre aksanlı ses, lehçe metnini şaşırtıcı ölçüde doğru okur.
 * Gerçek Mundart kayıtları dinleme egzersizlerinde ayrıca sunulur.
 */
export function speakGerman(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const clean = text
    .replace(/\(.*?\)/g, "")
    .replace(/[/–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return;

  let course = "de";
  try {
    course = localStorage.getItem("wortspiel-course") ?? "de";
  } catch {
    /* varsayılan kalır */
  }
  const gsw = course === "gsw-zh";

  const u = new SpeechSynthesisUtterance(clean);
  u.lang = gsw ? "de-CH" : "de-DE";
  u.rate = gsw ? 0.88 : 0.92;
  const voices = window.speechSynthesis.getVoices();
  const voice = gsw
    ? (voices.find((v) => v.lang === "de-CH") ?? voices.find((v) => v.lang.startsWith("de")))
    : voices.find((v) => v.lang.startsWith("de"));
  if (voice) u.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

/**
 * Tarayıcıda konuşma sentezi var mı? Ses listesi geç yüklenebildiği için
 * Almanca ses aramayız; API varsa düğmeyi gösteririz (tarayıcı de-DE isteğini
 * varsayılan sesle de karşılar). Sunucu render'ında false döner.
 */
export function useSpeechAvailable() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(typeof window !== "undefined" && "speechSynthesis" in window);
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
