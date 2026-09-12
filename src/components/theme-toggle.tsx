"use client";

import { useEffect, useState } from "react";
import { applyTheme, readThemeMode, writeThemeMode, type ThemeMode } from "@/lib/theme";
import { SettingRow } from "@/components/setting-row";
import { MoonIcon, SunIcon } from "./icons";
import { track } from "@/lib/track";
import { useT } from "@/lib/i18n/client";

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
  const t = useT();
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
      aria-label={t(dark ? "theme.to_light" : "theme.to_dark")}
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
export function ThemeSetting({ bare = false }: { bare?: boolean } = {}) {
  const t = useT();
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
    { key: "system", label: t("settings.theme_system") },
    { key: "light", label: t("settings.theme_light") },
    { key: "dark", label: t("settings.theme_dark") },
  ];

  {/* Segment: üçü de aynı ağırlıkta, seçili olan dolu. Mobildeki üçlü
      segmentin aynısı. */}
  const segment = (
    /* TEK SEÇİMLİK SEGMENT RADYO GRUBUDUR — Android aynı üçlüyü
       `accessibilityRole="radio"` ile veriyor (`SettingsScreen`). */
    <div role="radiogroup" aria-label={t("theme.appearance")} className="flex gap-1.5">
      {OPTIONS.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => pick(o.key)}
          role="radio"
          aria-checked={mode === o.key}
          className={`chip px-3 py-1.5 text-caption ${mode === o.key ? "chip-active" : ""}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  // `bare`: bölümün etiketi ("GÖRÜNÜM") zaten adı söylüyor; satır başlığı
  // aynı kelimeyi ikinci kez yazardı. Mobilde de etiketin altında doğrudan
  // üçlü segment var.
  if (bare) return <div className="px-4 py-3">{segment}</div>;
  return <SettingRow title={t("theme.appearance")}>{segment}</SettingRow>;
}
