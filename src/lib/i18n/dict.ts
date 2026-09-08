import { trBase } from "@/i18n/base/tr";
import { enBase } from "@/i18n/base/en";
import { deBase } from "@/i18n/base/de";
import { trWeb } from "@/i18n/web/tr";
import { enWeb } from "@/i18n/web/en";
import { deWeb } from "@/i18n/web/de";
import { NATIVE_LANGS, DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";

/**
 * Arayüz sözlükleri — mobilden çekilen taban + web'e özel anahtarlar.
 *
 * Web bugüne kadar tek dile (Türkçe) GÖMÜLÜYDÜ: 964 anahtarlık tr/en/de seti
 * mobilde vardı, web'de metin doğrudan JSX'in içine yazılıyordu. Sonucu şu:
 * Türkçe bilmeyen bir kullanıcı uygulamayı telefonda kullanabiliyor, tarayıcıda
 * kullanamıyordu.
 *
 * Sunucu tarafı zaten hazırdı — `profiles.native_lang` sütunu var, `/api/me` ve
 * `/api/profile` okuyup yazıyor. Eksik olan yalnız arayüzün onu kullanmasıydı.
 */
export const DICTS: Record<NativeLang, Record<string, string>> = {
  tr: { ...trBase, ...trWeb },
  en: { ...enBase, ...enWeb },
  de: { ...deBase, ...deWeb },
};

export { NATIVE_LANGS, DEFAULT_NATIVE };
export type { NativeLang };

/** Dillerin KENDİ adları — arayüz yanlış dildeyken bile kullanıcı kendi dilini tanısın. */
export const LANG_LABEL: Record<NativeLang, string> = { tr: "Türkçe", en: "English", de: "Deutsch" };

export function isNativeLang(v: string | null | undefined): v is NativeLang {
  return typeof v === "string" && (NATIVE_LANGS as readonly string[]).includes(v);
}

/**
 * Anahtarı çevirir. Eksik çeviri Türkçeye, o da yoksa ANAHTARIN KENDİSİNE düşer
 * — mobil `t()` ile birebir aynı kural, aynı `{n}` yer tutucu biçimi.
 *
 * Anahtarın kendisine düşmek bilinçli: boş bir metin yerine ekranda
 * "profile.my_words" görmek, eksik çeviriyi test sırasında görünür kılıyor.
 */
export function translate(
  lang: NativeLang,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const raw = DICTS[lang]?.[key] ?? DICTS[DEFAULT_NATIVE]?.[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name: string) => {
    const v = vars[name];
    return v === undefined ? m : String(v);
  });
}
