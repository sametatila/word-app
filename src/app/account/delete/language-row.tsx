"use client";

import { offeredNativeLangs } from "@/lib/courses";
import { LANG_LABEL, type NativeLang } from "@/lib/i18n/dict";
import { useLang, useT } from "@/lib/i18n/client";
import { writeLangCookie } from "@/lib/i18n/set-lang";

/**
 * Hesap silme sayfasının dil satırı: "Dil: Türkçe · English · Deutsch".
 *
 * NEDEN VAR. Bu sayfanın dili adresten değil, sitenin geri kalanı gibi dil
 * çerezinden, çerez yoksa tarayıcının dilinden geliyor (`lib/i18n/server`
 * `getLang`). /privacy ve /support dili alt yolla seçiyor ama silme adresinin
 * alt yolu yok ve bilerek yok: `legalPath("deleteAccount", …)` her dilde aynı
 * adresi döndürüyor, çünkü Play Console'a TEK adres veriliyor. Tarayıcısı üç
 * dilden hiçbirini söylemeyen bir inceleyici sayfayı varsayılan dilde,
 * Türkçe görürdü ve değiştirmenin bir yolu yoktu.
 *
 * YENİ BİR MEKANİZMA DEĞİL. Ayarlardaki dil seçici (`lang-setting`) ve kurulum
 * sihirbazı da aynı çerezi yazıyor; burada yalnız profile yazılmıyor, çünkü
 * sayfayı açan kişinin oturumu yok. Seçimden sonra TAM YÜKLEME yapılıyor,
 * `router.refresh()` değil: metnin tamamı sunucuda çiziliyor ve `<html lang>`
 * kök düzende çerezden okunuyor, yumuşak tazeleme ikisini eski dilde bırakırdı.
 *
 * Görünüm legal-shell'deki dil satırıyla aynı: seçili dil kalın düz metin,
 * ötekiler bağlantı gibi duran düğmeler. Dil adları KENDİ dillerinde ve `lang`
 * özniteliği taşıyor; ekran okuyucu "Deutsch"u Türkçe okumasın.
 *
 * SEÇİLİ DİLDE `aria-current` YOK. O öznitelik "bir BAĞLANTI kümesindeki
 * geçerli sayfa" demek; burada bağlantı değil düğme var ve adres değişmiyor
 * (bkz. `check:parity` 258, sekme şeritlerinde aynı hata ayıklandı). Seçili
 * dil, legal-shell'de olduğu gibi, düğme olmayan tek öğe olarak duyuluyor:
 * "Dil: Türkçe, English düğme, Deutsch düğme".
 */
export function DeleteLanguageRow() {
  const t = useT();
  const current = useLang();
  /* Ayarlardaki seçiciyle aynı süzgeç: hazır kursu olmayan bir anadili seçtirmek,
     o çerezle girişe geçen kişiyi kurssuz bir uygulamada bırakırdı. */
  const offered = offeredNativeLangs();
  if (offered.length < 2) return null;

  function pick(next: NativeLang) {
    if (next === current) return;
    writeLangCookie(next);
    window.location.reload();
  }

  return (
    <p className="muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-body">
      <span>{t("del.language")}:</span>
      {offered.map((l) =>
        l === current ? (
          <span key={l} lang={l} className="font-semibold text-[var(--text)]">
            {LANG_LABEL[l]}
          </span>
        ) : (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => pick(l)}
            className="underline-offset-4 hover:underline"
          >
            {LANG_LABEL[l]}
          </button>
        ),
      )}
    </p>
  );
}
