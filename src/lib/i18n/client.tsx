"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_NATIVE, translate, type NativeLang } from "@/lib/i18n/dict";

/**
 * İstemci tarafında arayüz dili.
 *
 * Dil SUNUCUDAN geliyor (kök düzen çerezden okuyup sağlayıcıya veriyor), yani
 * ilk boyamada doğru dil çiziliyor ve hydration uyuşmazlığı olmuyor. Mobilde
 * `t()` modül düzeyinde okunabiliyor çünkü orada tek bir kullanıcı var; web'de
 * aynı süreç aynı anda üç dilde üç isteğe cevap verebilir, o yüzden dil bir
 * modül değişkeni OLAMAZ.
 */
const LangContext = createContext<NativeLang>(DEFAULT_NATIVE);

export function LangProvider({ lang, children }: { lang: NativeLang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): NativeLang {
  return useContext(LangContext);
}

/** `const t = useT()` — mobil `t()` ile aynı imza. */
export function useT() {
  const lang = useLang();
  return (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
}
