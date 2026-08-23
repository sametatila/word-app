"use client";

import { useEffect, useState } from "react";
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

  function toggle() {
    const next = !on;
    setOn(next);
    setSoundEnabled(next);
    track("sound_toggle", next ? 1 : 0);
  }

  return (
    /* `bare`: kendi kartını bırakıp uygulama ayarları kartının bir bölümü oluyor. */
    <section className={bare ? "p-5" : "card p-5"}>
      <h2 className="mb-2 flex items-center gap-2 font-bold">
        <SpeakerIcon size={18} /> Oyun sesleri
      </h2>
      {/* Melodinin tarifi ("yükselen ton, alçalan nota, basamak basamak
          yükselen perde") kalktı: hemen altında sesi dinleten bir düğme var,
          yani ses yazıyla anlatılacak son şey. Kalan tek satır yazıyla
          söylenmesi GEREKEN şeyi söylüyor — bu anahtarın telaffuzu
          kapatmadığını, çünkü onu duymadan anlamanın yolu yok. */}
      <p className="muted text-sm">
        Telaffuz sesi bundan ayrı — bu anahtar kapalıyken de çalışır.
      </p>
      <button
        onClick={toggle}
        disabled={!ready}
        className={`btn mt-3 px-4 py-2.5 text-sm disabled:opacity-60 ${on ? "btn-ghost" : "btn-primary"}`}
      >
        {on ? "Sesleri kapat" : "Sesleri aç"}
      </button>
      {on ? (
        <button
          onClick={() => play("correct")}
          className="btn btn-ghost mt-2 ml-2 px-4 py-2.5 text-sm"
        >
          Dinle
        </button>
      ) : null}
    </section>
  );
}
