"use client";

import { writeLangCookie } from "@/lib/i18n/set-lang";
import { track } from "@/lib/track";
import { NATIVE_LANGS, type NativeLang } from "@/lib/i18n/dict";

/**
 * Tanıtım sayfasını başka dilde açan düğme.
 *
 * Yalnız ÇEREZ yazılıyor, profil değil: ziyaretçinin çoğunun hesabı yok ve
 * vitrini başka dilde okumak, girişli kullanıcının uygulama dilini değiştirmek
 * demek olmamalı. Girişli kullanıcının yetkili dili profilde kalıyor; uygulama
 * kabuğu açılışta çerezi profile göre tazeliyor (`lang-sync`). Uygulamanın
 * içindeki ayar (`LangSetting`) ikisini birlikte yazıyor.
 *
 * TAM YÜKLEME: dil bütün sunucu bileşenlerini etkiliyor (bkz. LangSetting).
 */
export function LandingLangButton({ lang, className, children }: { lang: NativeLang; className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      lang={lang}
      className={className}
      onClick={() => {
        track("setting_change", NATIVE_LANGS.indexOf(lang), "lang_landing");
        writeLangCookie(lang);
        window.location.reload();
      }}
    >
      {children}
    </button>
  );
}
