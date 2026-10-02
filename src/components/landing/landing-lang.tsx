"use client";

import { writeLangCookie } from "@/lib/i18n/set-lang";
import { track } from "@/lib/track";
import { NATIVE_LANGS, type NativeLang } from "@/lib/i18n/dict";
import { landingPath } from "@/lib/landing-path";

/**
 * Tanıtım sayfasını başka dilde açan bağlantı.
 *
 * Yalnız ÇEREZ yazılıyor, profil değil: ziyaretçinin çoğunun hesabı yok ve
 * vitrini başka dilde okumak, girişli kullanıcının uygulama dilini değiştirmek
 * demek olmamalı. Girişli kullanıcının yetkili dili profilde kalıyor; uygulama
 * kabuğu açılışta çerezi profile göre tazeliyor (`lang-sync`). Uygulamanın
 * içindeki ayar (`LangSetting`) ikisini birlikte yazıyor.
 *
 * GERÇEK BAĞLANTI (2026-10-02): eskiden çerez yazıp sayfayı yeniden yüklüyordu;
 * şimdi o dilin sabit adresine (`/`, `/en`, `/de`) gidiyor. Arama motoru dil
 * sürümlerini birbirine bağlı görüyor ve `/en`de "yeniden yükle" yine
 * İngilizce açacağı için düğme orada işe yaramazdı. Tam yükleme: dil bütün
 * sunucu bileşenlerini etkiliyor (bkz. LangSetting).
 */
export function LandingLangButton({ lang, className, children }: { lang: NativeLang; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={landingPath(lang)}
      hrefLang={lang}
      lang={lang}
      className={className}
      onClick={() => {
        track("setting_change", NATIVE_LANGS.indexOf(lang), "lang_landing");
        writeLangCookie(lang);
      }}
    >
      {children}
    </a>
  );
}
