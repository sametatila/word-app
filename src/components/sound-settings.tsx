"use client";

import { useEffect, useState } from "react";
import { SettingRow, Switch } from "@/components/setting-row";
import { SpeakerIcon } from "@/components/icons";
import { play, setSoundEnabled, soundEnabled } from "@/lib/sfx";
import { track } from "@/lib/track";

/**
 * Oyun sesleri anahtarı.
 *
 * Ses varsayılan olarak açık: sessiz bir oyun, oyun gibi hissettirmiyor ve
 * ölçülen sorun tam olarak buydu. Ama sesi hiç kapatılamayan bir uygulama
 * otobüste, ofiste ya da uyuyan bir evde açılamaz — yani kapatma yolu
 * olmayan ses, kullanıcının uygulamayı hiç açmamasına dönüşür.
 *
 * Tercih cihazda tutuluyor (tema gibi), çünkü aynı kişinin telefonu sessiz
 * ama masaüstü sesli olabilir; bunu hesaba yazmak iki cihazı birbirine
 * bağlardı.
 *
 * Anahtar açıldığında tek bir önizleme notası çalıyor: neyin açıldığını
 * duymadan anlamanın yolu yok.
 */
export function SoundSettings({ bare = false }: { bare?: boolean } = {}) {
  // Sunucuda localStorage yok; ilk çizim varsayılanla yapılıp bağlanma
  // anında gerçek tercihle düzeltiliyor.
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOn(soundEnabled());
    setReady(true);
  }, []);

  function toggle(next: boolean) {
    setOn(next);
    setSoundEnabled(next);
    track("sound_toggle", next ? 1 : 0);
  }

  /* `bare`: kendi kartını bırakıp uygulama ayarları kartının bir bölümü oluyor. */
  const body = (
    <SettingRow title="Oyun sesleri" sub="Telaffuz sesi ayrı — bu kapalıyken de çalışır">
      {/* Dinleme, anahtarın SOLUNDA ve yalnızca sesler açıkken: kapalıyken
          çalacak bir şey yok ve orada durması çalışmayan bir düğme demek. */}
      {on ? (
        <button
          type="button"
          onClick={() => play("correct")}
          aria-label="Örnek sesi dinle"
          title="Dinle"
          className="chip flex h-8 w-8 items-center justify-center"
        >
          <SpeakerIcon size={15} />
        </button>
      ) : null}
      <Switch on={on} onChange={toggle} disabled={!ready} label="Oyun sesleri" />
    </SettingRow>
  );

  return bare ? body : <section className="card">{body}</section>;
}
