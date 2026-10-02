import type { NativeLang } from "@/lib/courses";
import tr from "@/lib/i18n/dicts/tr";
import en from "@/lib/i18n/dicts/en";
import de from "@/lib/i18n/dicts/de";

/**
 * BÜTÜN arayüz sözlükleri — SUNUCU ve betikler için.
 *
 * TARAYICIYA GİTMİYOR (2026-10-02). Üç dilin sözlüğü tek modüldeydi ve
 * `lib/i18n/dict`ten bir şey alan her istemci bileşeni (dil listesi bile)
 * üçünü birden pakete katıyordu: her sayfada 161 KB (sıkıştırmasız 520 KB),
 * ziyaretçinin kullanmadığı iki dil dahil. Mobil Lighthouse'ta en büyük kalem
 * buydu. `next.config.ts` `turbopack.resolveAlias` tarayıcı derlemesinde bu
 * modülü `dicts-browser`a çeviriyor; tarayıcı yalnız arayüz dilinin
 * sözlüğünü, sayfa çizildikten sonra ayrı bir parça olarak yüklüyor
 * (`lib/i18n/dict-load`, `LangProvider`). Sunucu çizimi (RSC ve istemci
 * bileşenlerinin SSR'ı) bu dosyayı görüyor: ilk HTML her dilde eksiksiz.
 */
export const ALL_DICTS: Partial<Record<NativeLang, Record<string, string>>> = { tr, en, de };
