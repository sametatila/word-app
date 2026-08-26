"use client";

import { useEffect, useState } from "react";
import { SettingRow } from "@/components/setting-row";
import { MoonIcon, SunIcon } from "./icons";
import { track } from "@/lib/track";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    track("setting_change", next ? 1 : 0, "theme");
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("wortspiel-theme", next ? "dark" : "light");
    } catch {
      /* kullanılamıyorsa sessizce geç */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Açık temaya geç" : "Koyu temaya geç"}
      className="btn btn-ghost h-10 w-10"
    >
      {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}

/**
 * Ayarlar listesindeki tema satırı.
 *
 * Üst başlıktaki düğmeyle aynı işi görüyor ama bir SATIR: yanında ne olduğunu
 * söyleyen bir etiket var. Başlıktaki simge tek başına "ay" ya da "güneş"ti ve
 * ne yaptığını yalnızca deneyerek öğreniliyordu.
 */
export function ThemeSetting() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function pick(next: boolean) {
    if (next !== dark) track("setting_change", next ? 1 : 0, "theme");
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("wortspiel-theme", next ? "dark" : "light");
    } catch {
      /* kullanılamıyorsa tercih yalnızca bu oturum boyunca geçerli */
    }
  }

  return (
    <SettingRow title="Görünüm">
      {/* İki seçenekli bir TERCİH, aç/kapa değil: "koyu tema kapalı" diye bir
          şey yok, açık tema var. Bu yüzden anahtar değil çip ikilisi. */}
      <button
        type="button"
        onClick={() => pick(false)}
        aria-pressed={!dark}
        className={`chip flex items-center gap-1.5 px-3 py-1.5 text-xs ${!dark ? "chip-active" : ""}`}
      >
        <SunIcon size={14} /> Açık
      </button>
      <button
        type="button"
        onClick={() => pick(true)}
        aria-pressed={dark}
        className={`chip flex items-center gap-1.5 px-3 py-1.5 text-xs ${dark ? "chip-active" : ""}`}
      >
        <MoonIcon size={14} /> Koyu
      </button>
    </SettingRow>
  );
}
