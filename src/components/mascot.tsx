"use client";

import { motion } from "framer-motion";
import { useStill } from "@/lib/use-still";

/**
 * Erdi — uygulamanın mirketi.
 *
 * Mirketin Almancası **Erdmännchen**; ad oradan, karakter de öyle seçildi.
 *
 * ## Üçüncü nesil: üretilmiş kare animasyonları
 *
 * 1. nesil elle çizilmiş SVG'ydi ve boyalı referansın yanında "clipart" kaldı.
 * 2. nesil referans illüstrasyonun renkli izlemesiydi (`public/erdi.svg`) —
 * görüntü kalitesi tutuyordu ama hareket, tek parça resmi eğip zıplatmaktan
 * öteye geçemiyordu: kafa çevrilemiyor, kol kalkmıyordu.
 *
 * Bu sürümde hareketin kendisi de üretiliyor: referans görsel, ai-story
 * projesindeki hattın uyarlamasıyla (Wan 2.2 image-to-video, Replicate)
 * aksiyon kliplerine çevrildi; kareler ayıklanıp beyaz zemin kenardan taşma
 * doldurmasıyla şeffaflaştırıldı ve alfa kanallı animasyonlu WebP'lere
 * paketlendi (`public/anim/*.webp`, 16fps, sonsuz döngü). Boru hattı
 * `scripts/mascot-anim/` altında; görsel değişince oradan yeniden üretilir.
 *
 * İki klip türü var:
 *   - Döngü klipleri `last_image` = ilk kare ile üretildi; ilk ve son kare
 *     aynı olduğundan döngü dikişsiz.
 *   - Durum klipleri (sad, sleep) duygunun İÇİNDEN başlar: nötrden geçiş
 *     klibinin son halinden seçilen kare base yapılıp duygu kendi içinde
 *     dönen bir döngü olarak üretildi. Duygu anında görünür, döngü sıçramaz.
 *
 * ## Duygu → klip
 *
 * Eski yedi duygu API'si korunuyor; ayrıca doğrudan klip adıyla çağrılan yeni
 * duygular var (thumbsup, dance, wave, peek). Animasyonlu WebP kendi kendine
 * döngüde — bileşen zamanlama yönetmiyor, yalnızca klibi seçiyor.
 *
 * Hareket azaltma tercihinde klip hiç yüklenmiyor; izlenmiş statik
 * illüstrasyon (`public/erdi.svg`) gösteriliyor.
 */
export type Mood =
  | "idle"
  | "happy"
  | "cheer"
  | "sad"
  | "think"
  | "wow"
  | "sleep"
  | "thumbsup"
  | "dance"
  | "wave";

/*
  Duygu → klip. Çoğu klip dikey tuvalde (2:3); dans geniş tuvalde üretildi
  (kollar açılınca dar kadraja sığmıyordu), o yüzden en-boy oranı klip başına.
  "wow" için ayrı klip yok: tetikte etrafı tarayan lookaround, şaşkınlığın
  "bu da ne?" hâlini zaten taşıyor.
*/
const CLIP: Record<Mood, { file: string; aspect: number }> = {
  idle: { file: "lookaround", aspect: 2 / 3 },
  happy: { file: "happy", aspect: 2 / 3 },
  cheer: { file: "celebrate", aspect: 2 / 3 },
  sad: { file: "sad", aspect: 2 / 3 },
  think: { file: "think", aspect: 2 / 3 },
  wow: { file: "lookaround", aspect: 2 / 3 },
  sleep: { file: "sleep", aspect: 2 / 3 },
  thumbsup: { file: "thumbsup", aspect: 2 / 3 },
  dance: { file: "dance", aspect: 720 / 544 },
  wave: { file: "wave", aspect: 2 / 3 },
};

export function Mascot({
  mood = "idle",
  size = 132,
  className = "",
}: {
  mood?: Mood;
  size?: number;
  className?: string;
}) {
  const still = useStill();
  const clip = CLIP[mood];

  return (
    <div
      className={`pointer-events-none relative select-none ${className}`}
      style={{ width: size, aspectRatio: `${clip.aspect}` }}
      aria-hidden="true"
    >
      {/* Yer gölgesi — karakteri havada asılı olmaktan kurtarıyor. */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[4%] w-[70%] rounded-[50%]"
        style={{
          x: "-50%",
          y: "40%",
          background: "radial-gradient(ellipse, rgba(42,23,8,0.26) 0%, rgba(42,23,8,0) 70%)",
        }}
        initial={false}
        animate={still ? { scaleX: 1 } : { scaleX: [1, 0.94, 1] }}
        transition={{ duration: 2.4, repeat: still ? 0 : Infinity, ease: "easeInOut" }}
      />
      {still ? (
        <img src="/erdi.svg" alt="" className="block h-full w-full object-contain" draggable={false} />
      ) : (
        /*
          Duygu değişince `key` değişiyor: aynı <img>'de yalnızca src
          değiştirmek, yeni klip çözülene kadar eski animasyon karesini
          gösteriyor; yeni öğe temiz başlıyor ve döngü baştan oynuyor.
        */
        <img
          key={mood}
          src={`/anim/${clip.file}.webp`}
          alt=""
          className="block h-full w-full object-contain"
          draggable={false}
          /* Klip yoksa (henüz üretilmedi / yüklenemedi) statik illüstrasyona düş. */
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/erdi.svg";
          }}
        />
      )}
    </div>
  );
}
