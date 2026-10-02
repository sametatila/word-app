"use client";

import { useEffect, useState } from "react";
import { writeThemeMode } from "@/lib/theme";
import { ThemeDarkIcon, ThemeLightIcon } from "./icons";
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
      {dark ? <ThemeLightIcon size={18} /> : <ThemeDarkIcon size={18} />}
    </button>
  );
}

/* Ayarlardaki üçlü seçici `theme-setting.tsx`te: `SettingRow` framer-motion'a bağlı ve
   tanıtım sayfası (bu düğmenin tek kullanıcısı) onu yüklememeli. */
