"use client";

import { useState } from "react";
import { SettingRow } from "@/components/setting-row";
import { track } from "@/lib/track";
import { LANG_LABEL, NATIVE_LANGS, isNativeLang, type NativeLang } from "@/lib/i18n/dict";
import { offeredNativeLangs } from "@/lib/courses";
import { useT, useLang } from "@/lib/i18n/client";
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
/**
 * `bare`: başlıksız — bölümün kendi etiketi ("UYGULAMA DİLİ") zaten adı
 * söylüyor, satır başlığı onu ikinci kez yazardı. Mobilde de etiketin altında
 * doğrudan çipler var.
 */
export function LangSetting({ bare = false }: { bare?: boolean } = {}) {
  const t = useT();
  const current = useLang();
  const [busy, setBusy] = useState(false);

  async function pick(next: NativeLang) {
    if (next === current || busy) return;
    setBusy(true);
    track("setting_change", NATIVE_LANGS.indexOf(next), "lang");
    writeLangCookie(next);
    try {
      /*
        YALNIZ ANADİL GÖNDERİLİYOR, kurs değil — ve bu bilinçli. Yeni anadille
        kayıtlı kurs geçersiz kalırsa (Almanca öğrenen biri arayüzünü Almancaya
        alırsa) sunucu kursu ilk geçerli olana TAŞIYOR; kararı istemcide
        vermek, iki tarafın farklı kurs sanmasına açık kapı bırakırdı.
        Sunucudaki kural `api/profile`ın çift doğrulamasında.
      */
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

  /*
    YALNIZ HAZIR ÇİFTİ OLAN DİLLER. Bir dili seçtirip ardından "öğrenilecek dil"
    listesini boş bırakmak, kullanıcıyı kurssuz bir uygulamada bırakmak olurdu.
    Bugün bu liste tek elemanlı (Türkçe) ve seçici hiç çizilmiyor; İngilizce ve
    Almanca pariteleri tamamlandığında kendiliğinden geri geliyor
    (`PAIR_READY`, bkz. docs/plan/native-language.md).
  */
  const offered = offeredNativeLangs();
  const chips = (
    /* TEK SEÇİMLİK ŞERİT RADYO GRUBUDUR — Android'in `Chip`i de artık
       `accessibilityRole="radio"` (bkz. parity 257). */
    <div role="radiogroup" aria-label={t("settings.app_language")} className="flex gap-1.5">
      {offered.map((l) => (
        <button
          key={l}
          type="button"
          disabled={busy}
          onClick={() => void pick(l)}
          role="radio"
          aria-checked={current === l}
          lang={l}
          className={`chip px-3 py-1.5 text-caption disabled:opacity-60 ${current === l ? "chip-active" : ""}`}
        >
          {LANG_LABEL[isNativeLang(l) ? l : "tr"]}
        </button>
      ))}
    </div>
  );

  // Tek seçenek varsa seçim yoktur: tek çipli bir "dil seçici" kullanıcıya
  // olmayan bir tercih sunar.
  if (offered.length < 2) return null;

  if (bare) {
    return (
      <div className="px-4 py-3">
        {chips}
        <p className="muted mt-2 text-caption leading-snug">{t("lang.app_language_sub")}</p>
      </div>
    );
  }
  return (
    <SettingRow title={t("settings.app_language")} sub={t("lang.app_language_sub")}>
      {chips}
    </SettingRow>
  );
}
