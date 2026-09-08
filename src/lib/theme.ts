/**
 * Tema tercihi — üç durum: sistem / açık / koyu.
 *
 * Web'de yalnız İKİ durum vardı ve "sistemi izle" seçilemiyordu: kullanıcı bir
 * kez açık ya da koyuyu seçtiğinde geri dönemiyordu, çünkü tercih varsa sistem
 * hiç sorulmuyor. Mobilde üç seçenek baştan beri var (Sistem / Açık / Koyu) ve
 * varsayılan Sistem.
 *
 * Depolama geriye dönük uyumlu: eski `"dark"`/`"light"` değerleri aynen
 * çalışıyor, anahtarın YOKLUĞU da eskisi gibi sistem demek. Yeni olan tek şey
 * açıkça yazılabilen `"system"` — kullanıcı geri dönebilsin diye.
 */
export type ThemeMode = "system" | "light" | "dark";

export const THEME_KEY = "lernomi-theme";

export function readThemeMode(): ThemeMode {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === "dark" || v === "light" || v === "system") return v;
  } catch {
    /* depolama kapalı — sistem */
  }
  return "system";
}

/** Seçilen moda göre gerçekte hangi tema geçerli. */
export function resolveTheme(mode: ThemeMode): "light" | "dark" {
  if (mode !== "system") return mode;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

/** Kök öğeye uygula (tek yer: `.dark` sınıfı). */
export function applyTheme(mode: ThemeMode): void {
  document.documentElement.classList.toggle("dark", resolveTheme(mode) === "dark");
}

export function writeThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch {
    /* kullanılamıyorsa tercih yalnızca bu oturum boyunca geçerli */
  }
  applyTheme(mode);
}
