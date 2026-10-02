import type { NativeLang } from "@/lib/courses";

/**
 * Tarayıcı derlemesinde `dicts-all`ın yerine geçen BOŞ kayıt (bkz. orası).
 * Sözlük `registerDict` ile, `LangProvider` yükleyince dolar.
 */
export const ALL_DICTS: Partial<Record<NativeLang, Record<string, string>>> = {};
