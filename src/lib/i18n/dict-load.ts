import { DICTS, registerDict, type NativeLang } from "@/lib/i18n/dict";

/**
 * Arayüz sözlüğünü tarayıcıda YÜKLER — dil başına ayrı, içerik özetli (uzun
 * süre önbelleklenen) bir parça. Sunucuda zaten hepsi kayıtlı, yükleme anında
 * çözülür (bkz. `lib/i18n/dicts-all`).
 *
 * Söz önbellekte: aynı dil için tek istek, `use()` her render'da aynı sözü görür.
 */
const LOADERS: Record<NativeLang, () => Promise<{ default: Record<string, string> }>> = {
  tr: () => import("@/lib/i18n/dicts/tr"),
  en: () => import("@/lib/i18n/dicts/en"),
  de: () => import("@/lib/i18n/dicts/de"),
};

const pending = new Map<NativeLang, Promise<void>>();

export function hasDict(lang: NativeLang): boolean {
  return Boolean(DICTS[lang]);
}

export function loadDict(lang: NativeLang): Promise<void> {
  if (hasDict(lang)) return Promise.resolve();
  let p = pending.get(lang);
  if (!p) {
    p = LOADERS[lang]().then(
      (m) => registerDict(lang, m.default),
      (e) => {
        // Ağ hatası: bir sonraki denemede yeniden istensin.
        pending.delete(lang);
        throw e;
      },
    );
    pending.set(lang, p);
  }
  return p;
}
