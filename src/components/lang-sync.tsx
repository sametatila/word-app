"use client";

import { useEffect } from "react";
import { isNativeLang, type NativeLang } from "@/lib/i18n/dict";
import { readLangCookie, writeLangCookie } from "@/lib/i18n/set-lang";

/**
 * Profildeki dili çereze aynalar.
 *
 * Yetkili kaynak PROFİL (`profiles.native_lang`) — hesapla birlikte geziyor,
 * yani kullanıcı başka bir tarayıcıda açtığında da dili doğru. Ama sayfa
 * çizilirken profili okumak bir veritabanı gidişi demek; sunucu o yüzden
 * çereze bakıyor. Bu bileşen ikisini eşitliyor: kabuk her açıldığında profilin
 * dili çerezden farklıysa çerez güncelleniyor ve sayfa bir kez tazeleniyor.
 *
 * Profilde dil YOKSA (eski hesap) hiçbir şey yapılmıyor: kullanıcının
 * tarayıcıda seçtiği dil ezilmemeli.
 */
export function LangSync({ profileLang }: { profileLang: string | null }) {
  useEffect(() => {
    if (!isNativeLang(profileLang)) return;
    if (readLangCookie() === profileLang) return;
    writeLangCookie(profileLang as NativeLang);
    // Sunucu bileşenleri eski dille çizilmiş durumda; tazeleme olmadan
    // kullanıcı bir sonraki tam yüklemeye kadar yanlış dilde kalırdı.
    window.location.reload();
  }, [profileLang]);
  return null;
}
