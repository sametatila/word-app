"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
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
/** Dili SUNUCUYA GİTMEDEN değiştiren kanca — bkz. `useSetLang`. */
const SetLangContext = createContext<((lang: NativeLang) => void) | null>(null);

export function LangProvider({ lang, children }: { lang: NativeLang; children: ReactNode }) {
  /*
    Dil artık DURUM. Sunucudan gelen değer başlangıç; sonrasında istemci de
    değiştirebiliyor.

    NEDEN: kurulum sihirbazında dil seçilince `router.refresh()` çağrılıyordu
    ve tazeleme sihirbazı YENİDEN KURUYORDU — kullanıcı ikinci adımda dilini
    seçiyor, birinci adıma geri düşüyordu (üretimde ölçüldü). Dili istemcide
    çevirmek o tazelemeyi gereksiz kılıyor: metinler anında değişiyor, adım
    yerinde kalıyor.
  */
  const [cur, setCur] = useState<NativeLang>(lang);
  /* Sunucu yeni bir dil bildirdiyse (gezinme, gerçek tazeleme) o kazanır. */
  useEffect(() => { setCur(lang); }, [lang]);
  return (
    <SetLangContext.Provider value={setCur}>
      <LangContext.Provider value={cur}>{children}</LangContext.Provider>
    </SetLangContext.Provider>
  );
}

export function useLang(): NativeLang {
  return useContext(LangContext);
}

/**
 * Arayüz dilini SAYFA TAZELEMEDEN değiştirir.
 *
 * Çağıranın ayrıca çerezi yazması gerekiyor (`writeLangCookie`): burada
 * değişen şey yalnız o anki sekmenin gördüğü dil, sunucunun bir sonraki
 * çiziminde okuyacağı kaynak çerez. `<html lang>` da elle güncelleniyor,
 * yoksa ekran okuyucu sayfayı eski dilde okumaya devam eder.
 */
export function useSetLang(): (lang: NativeLang) => void {
  const set = useContext(SetLangContext);
  return useCallback(
    (lang: NativeLang) => {
      set?.(lang);
      try { document.documentElement.lang = lang; } catch { /* SSR dışında hep var */ }
    },
    [set],
  );
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
