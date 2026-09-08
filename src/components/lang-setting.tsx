"use client";

import { useState } from "react";
import { SettingRow } from "@/components/setting-row";
import { track } from "@/lib/track";
import { LANG_LABEL, NATIVE_LANGS, isNativeLang, type NativeLang } from "@/lib/i18n/dict";
import { useLang } from "@/lib/i18n/client";
import { writeLangCookie } from "@/lib/i18n/set-lang";

/**
 * Arayüz dili — Türkçe / English / Deutsch.
 *
 * Mobilde bu ayar baştan beri var; web'de arayüz tek dile gömülü olduğu için
 * seçenek de yoktu. Diller KENDİ adlarıyla yazılıyor: arayüz yanlış dildeyken
 * bile kullanıcı kendi dilini tanıyıp seçebilsin diye — çevrilirse tam aradığı
 * satırı okuyamaz.
 *
 * İki yere birden yazılıyor. Profil (`native_lang`) yetkili kaynak ve hesapla
 * birlikte geziyor; çerez sunucunun sayfayı çizerken okuyabildiği kopya. Sonra
 * TAM YÜKLEME yapılıyor, `router.refresh()` değil: dil bütün sunucu
 * bileşenlerini etkiliyor ve yumuşak tazeleme istemcideki bağlamı eski dilde
 * bırakıyor.
 */
export function LangSetting() {
  const current = useLang();
  const [busy, setBusy] = useState(false);

  async function pick(next: NativeLang) {
    if (next === current || busy) return;
    setBusy(true);
    track("setting_change", NATIVE_LANGS.indexOf(next), "lang");
    writeLangCookie(next);
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ nativeLang: next }),
      });
    } catch {
      /* profile yazılamadıysa çerez yine geçerli; bir sonraki açılışta denenir */
    }
    window.location.reload();
  }

  return (
    <SettingRow title="Uygulama dili" sub="Anlatım ve arayüz bu dilde olur">
      <div className="flex gap-1.5">
        {NATIVE_LANGS.map((l) => (
          <button
            key={l}
            type="button"
            disabled={busy}
            onClick={() => void pick(l)}
            aria-pressed={current === l}
            lang={l}
            className={`chip px-3 py-1.5 text-caption disabled:opacity-60 ${current === l ? "chip-active" : ""}`}
          >
            {LANG_LABEL[isNativeLang(l) ? l : "tr"]}
          </button>
        ))}
      </div>
    </SettingRow>
  );
}
