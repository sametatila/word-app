"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
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

/**
 * `const t = useT()` — mobil `t()` ile aynı imza.
 *
 * `useCallback` SÜS DEĞİL. Önce her render'da YENİ bir fonksiyon dönüyordu ve
 * bunun iki somut bedeli vardı:
 *
 *  1. `t`yi kullanan hiçbir `useCallback`/`useMemo`/`useEffect` onu bağımlılık
 *     listesine ALAMIYORDU — eklendiği anda her render'da değişip memoizasyonu
 *     tamamen boşa çıkarıyordu. Listeden çıkarınca da bayat closure kalıyor:
 *     kullanıcı dili değiştirince o geri çağrı eski dilde konuşmaya devam
 *     ediyordu. `exhaustive-deps` on iki yerde tam olarak bunu söylüyordu.
 *  2. `t` alan her alt bileşenin `memo`su kırılıyordu.
 *
 * Artık kimlik YALNIZ dil değişince değişiyor; bağımlılık listelerine eklemek
 * hem doğru hem bedava.
 */
export function useT() {
  const lang = useLang();
  return useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang],
  );
}
