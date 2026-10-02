import type { NativeLang } from "@/lib/i18n/dict";
import { offeredNativeLangs } from "@/lib/courses";

/**
 * Tanıtım sayfasının DİLE SABİT adresleri (SEO, 2026-10-02).
 *
 * `/` çereze ya da Accept-Language'a göre üç dilden birinde çiziliyor. İnsan
 * için doğru, arama motoru için değil: Googlebot dil başlığı göndermiyor,
 * yalnız Türkçeyi görüyor; İngilizce ve Almanca vitrinin indekslenebilecek
 * bir adresi yoktu. Şimdi her dilin kendi adresi var ve hreflang ile
 * birbirine bağlı:
 *
 *   /     Türkçe (ve x-default) — ziyaretçiye göre uyum sürüyor
 *   /en   İngilizce, sabit
 *   /de   Almanca, sabit
 *
 * Sabit adreslerin dili `proxy.ts`te istek başlığına yazılıyor (`LANG_HEADER`);
 * `getLang` onu çerezden önce okuyor, böylece düzen, sözlük ve sayfa aynı dili
 * görüyor.
 */
export const LANDING_PATH: Record<NativeLang, string> = { tr: "/", en: "/en", de: "/de" };

/** Dile sabit adresi olan diller — `/` hariç; `proxy.ts` eşleştiricisiyle aynı. */
export const LANDING_FIXED = ["en", "de"] as const satisfies readonly NativeLang[];

export function landingPath(lang: NativeLang): string {
  return LANDING_PATH[lang] ?? "/";
}

/** hreflang eşleri: yalnız anadili gerçekten sunulan diller + x-default. */
export function landingLanguages(abs: (path: string) => string = (p) => p): Record<string, string> {
  return {
    ...Object.fromEntries(offeredNativeLangs().map((l) => [l, abs(landingPath(l))])),
    "x-default": abs("/"),
  };
}
