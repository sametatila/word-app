"use client";

import { useEffect, useState } from "react";
import { applyTheme, readThemeMode, writeThemeMode, type ThemeMode } from "@/lib/theme";
import { SettingRow } from "@/components/setting-row";
import { MoonIcon, SunIcon } from "./icons";
import { track } from "@/lib/track";

/**
 * Açılış sayfasının tema düğmesi — tek dokunuş, açık ↔ koyu.
 *
 * Ayarlardaki üçlü seçicinin (Sistem/Açık/Koyu) aksine burada iki durum var
 * ve bu bilinçli: açılış sayfasında oturum yok, ayar sayfası da yok; düğme
 * "şu an gördüğünü çevir" demek. Yazdığı değer aynı anahtara gidiyor, yani
 * giriş yapıldığında ayarlardaki seçici onu "Açık" ya da "Koyu" olarak
 * gösteriyor — üçüncü duruma dönmek oradan mümkün.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    track("setting_change", next ? 1 : 0, "theme");
    setDark(next);
    writeThemeMode(next ? "dark" : "light");
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
 * Görünüm ayarı — ÜÇ seçenek: Sistem / Açık / Koyu.
 *
 * Önce iki çip vardı ve "sistemi izle" seçilemiyordu: kullanıcı bir kez açık
 * ya da koyuyu seçtiğinde geri dönemiyordu, çünkü tercih yazıldıktan sonra
 * sistem bir daha sorulmuyor. Bu, geri alınamayan tek ayardı.
 *
 * Sistem seçiliyken işletim sistemi temasını DEĞİŞTİRDİĞİNDE sayfa da
 * değişiyor — dinleyici o yüzden var. Açık/koyu seçiliyken dinleyici hiçbir
 * şey yapmıyor, kullanıcı zaten karar vermiş.
 */
export function ThemeSetting() {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => setMode(readThemeMode()), []);

  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => applyTheme("system");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mode]);

  function pick(next: ThemeMode) {
    if (next !== mode) track("setting_change", next === "dark" ? 1 : next === "light" ? 0 : 2, "theme");
    setMode(next);
    writeThemeMode(next);
  }

  const OPTIONS: { key: ThemeMode; label: string }[] = [
    { key: "system", label: "Sistem" },
    { key: "light", label: "Açık" },
    { key: "dark", label: "Koyu" },
  ];

  return (
    <SettingRow title="Görünüm">
      {/* Segment: üçü de aynı ağırlıkta, seçili olan dolu. Mobildeki üçlü
          segmentin aynısı. */}
      <div className="flex gap-1.5">
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => pick(o.key)}
            aria-pressed={mode === o.key}
            className={`chip px-3 py-1.5 text-caption ${mode === o.key ? "chip-active" : ""}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </SettingRow>
  );
}
