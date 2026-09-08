/**
 * Dil çerezinin adı — hem sunucu (`lib/i18n/server`) hem istemci
 * (`lib/i18n/set-lang`) okuyor, o yüzden ikisinden de bağımsız bir yerde.
 * Sunucu dosyası `server-only`; istemciden içe aktarılamaz.
 */
export const LANG_COOKIE = "lernomi-lang";
