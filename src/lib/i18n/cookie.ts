/**
 * Dil çerezinin adı — hem sunucu (`lib/i18n/server`) hem istemci
 * (`lib/i18n/set-lang`) okuyor, o yüzden ikisinden de bağımsız bir yerde.
 * Sunucu dosyası `server-only`; istemciden içe aktarılamaz.
 */
export const LANG_COOKIE = "lernomi-lang";

/**
 * Dile SABİT adreslerin (`/en`, `/de`) dili — `proxy.ts` bu yollarda isteğe
 * yazıyor, `getLang` çerezden ÖNCE okuyor. Arama motoru her dil için ayrı bir
 * adres görmeli; çereze ya da Accept-Language'a göre değişen tek `/` adresi
 * botlara yalnız Türkçeyi gösteriyordu (bkz. `lib/landing-path`).
 */
export const LANG_HEADER = "x-lernomi-lang";
