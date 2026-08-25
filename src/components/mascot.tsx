"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStill } from "@/lib/use-still";
import { useStageOwner } from "@/lib/mascot-stage";
import { preloadClips, useClipUrl } from "@/lib/mascot-clips";

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
  dance: { file: "dance", aspect: 194 / 228 },
  wave: { file: "wave", aspect: 2 / 3 },
};

/*
  Boşta bekleme tek klip olunca hareket ezberleniyor: beş idle klibi rastgele
  sırayla birbirine bağlanıyor (aynısı üst üste gelmez). Zincir dikişsiz,
  çünkü hepsi last_image = base ile üretildi: her klip AYNI nötr duruşta
  başlayıp bitiyor; hangi sırayla oynarlarsa oynasınlar geçiş görünmez.
*/
const IDLE_CLIPS = [
  "lookaround",
  "idle-dog",
  "idle-stretch",
  "idle-scratch",
  "idle-tail",
  "idle-peekaboo",
  "idle-hop",
  "idle-dig",
  "idle-sniff",
  "idle-sit",
  "idle-wink",
];
/*
  Bir klibin tam süresi (61 kare @ 12fps) + küçük pay. Idle ve duygu klipleri
  loop=1 kodlu: bir tur oynayıp NÖTR karede donuyorlar; takas donmuş nötr
  kareden yapılır, görünmez. Süre klibin GERÇEK başlangıcından ölçülür
  (<img onLoad>): sabit zamanlayıcı yüklenme gecikmesini bilmediği için ya
  klibi ortasında kesiyor (gidip gelme) ya da donmuş karede bekletiyordu
  (takılma).
*/
const CLIP_MS = (61 / 12) * 1000 + 60;
/*
  iOS Safari animasyonu, görsel "yüklendi" dedikten bir süre sonra başlatıyor
  (çözümleme + ilk boyama); Android/Chrome hemen. Aynı zamanlayıcı iPhone'da
  klibi son karelerinde kesip "hafif gidip gelme" yapıyordu. Başlangıç anı
  artık img.decode() tamamlanınca alınıyor ve iOS'ta küçük bir pay ekleniyor.
*/
const IOS =
  typeof navigator !== "undefined" &&
  /iP(hone|ad|od)/.test(navigator.userAgent) &&
  !/CriOS|FxiOS/.test(navigator.userAgent);
const SWAP_MARGIN_MS = IOS ? 260 : 0;

/** Idle rotasyonuna GEÇMEYEN duygular — gerekçe bileşen içindeki yorumda. */
const STICKY: Mood[] = ["sad", "sleep"];

export function Mascot({
  mood = "idle",
  size = 132,
  className = "",
  stage,
}: {
  mood?: Mood;
  size?: number;
  className?: string;
  /**
   * Bu örneğin ait olduğu sahne kilidi (bkz. lib/mascot-stage). Verilmezse
   * örnek "yerleşik"tir: sahne başkasınınken görünmez olur — tek Erdi kuralı.
   * Sahneyi alan gezici sarmalayıcılar (pop, çekme) kendi kimliğini verir.
   */
  stage?: string;
}) {
  const still = useStill();
  const stageOwner = useStageOwner();
  /* Sahne başkasınınsa bu Erdi burada değil: kutu yerinde kalır, içi boşalır. */
  const away = stageOwner !== null && stageOwner !== stage;
  const [idleClip, setIdleClip] = useState(IDLE_CLIPS[0]);
  /*
    Duygu bir SELAMLAMA, kalıcı bir durum değil: klip bir tur oynadıktan sonra
    maskot kendiliğinden idle rotasyonuna geçer. Bunsuz uzun yaşayan her yer
    (seri kutusu, ana sayfa, sonuç kartları) aynı klibi sonsuza dek döndürüyordu.
    Kısa ömürlü kullanımlar (cevap şeridi ~1.5 sn) bir turu zaten göremeden
    kapanır, etkilenmez. İstisnalar STICKY'de: sad ve sleep birer duygu DURUMU —
    üzgünün ya da uyuyanın neşeyle boşta gezinmesi tonu bozar. Dance de dahil
    diğer her duygu rotasyona katılır; kutunun oranı o an GÖSTERİLEN klibe
    bağlı, geniş tuvalli dance'ten dikey idle'a geçişte içerik oranı değişir
    ama dance yalnız kısa ömürlü kutlama pop'unda kullanıldığından bu geçiş
    pratikte görülmez.
  */
  const drifts = mood !== "idle" && !STICKY.includes(mood);
  const [drifted, setDrifted] = useState(false);
  /* Gösterilen klibin gerçekten oynamaya başladığı an (img onLoad). */
  const [startedAt, setStartedAt] = useState(0);

  useEffect(() => {
    setDrifted(false);
  }, [mood]);

  const inIdle = mood === "idle" || (drifts && drifted);

  // Klip bir tur oynayınca: duyguysa idle'a geç, idle'sa sıradaki idle'a.
  useEffect(() => {
    if (still || !startedAt || (!inIdle && !drifts)) return;
    const t = setTimeout(
      () => {
        if (inIdle) {
          setIdleClip((cur) => {
            const rest = IDLE_CLIPS.filter((c) => c !== cur);
            return rest[Math.floor(Math.random() * rest.length)];
          });
        } else setDrifted(true);
      },
      Math.max(0, CLIP_MS + SWAP_MARGIN_MS - (Date.now() - startedAt)),
    );
    return () => clearTimeout(t);
  }, [startedAt, inIdle, drifts, still]);

  // Sıradaki idle klibi ilk geçişte takılmasın diye hepsi önden ısıtılıyor.
  useEffect(() => {
    if (still || (mood !== "idle" && !drifts)) return;
    preloadClips(IDLE_CLIPS);
  }, [mood, drifts, still]);

  const clip = CLIP[mood];
  const file = inIdle ? idleClip : clip.file;
  const url = useClipUrl(still ? null : file);

  /*
    Çift tampon: klip takasında eski <img> hemen sökülürse yeni WebP çözülene
    kadar yarım saniyelik bir boşluk (blick) görünüyor. Eski kare 500 ms daha
    altta kalıyor; yeni klip nötr karede başladığı ve eskisi nötrde donduğu
    için üst üste binme de görünmez.
  */
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const lastUrl = useRef<string | null>(null);
  useEffect(() => {
    if (!url) return;
    if (lastUrl.current && lastUrl.current !== url) {
      setPrevUrl(lastUrl.current);
      const t = setTimeout(() => setPrevUrl(null), 500);
      lastUrl.current = url;
      return () => clearTimeout(t);
    }
    lastUrl.current = url;
  }, [url]);

  return (
    <motion.div
      className={`pointer-events-none relative select-none ${className}`}
      /*
        Boyut YÜKSEKLİKTEN verilir: `size` dikey klibin genişliği (2:3 → yükseklik
        1.5×size), geniş klipler aynı yüksekliğe oturur. Bütün klipler aynı
        karakter geometrisiyle paketli (karakter tuvalin %95'i), yani karakter
        her klipte aynı boyda görünür — dev ya da minik yok.
      */
      style={{ height: size * 1.5, width: size * 1.5 * (inIdle ? 2 / 3 : clip.aspect) }}
      aria-hidden="true"
      initial={false}
      animate={{ opacity: away ? 0 : 1, scale: away ? 0.9 : 1 }}
      transition={{ duration: 0.25 }}
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
        <>
          {/* Takas tamponu: yeni klip çözülene kadar eskinin donmuş nötr karesi. */}
          {prevUrl && (
            <img
              src={prevUrl}
              alt=""
              className="absolute inset-0 block h-full w-full object-contain"
              draggable={false}
            />
          )}
          {/*
            Duygu değişince `key` değişiyor: aynı <img>'de yalnızca src
            değiştirmek, yeni klip çözülene kadar eski animasyon karesini
            gösteriyor; yeni öğe temiz başlıyor ve döngü baştan oynuyor.
          */}
          {url && (
          <img
            key={url}
            src={url}
            alt=""
            className="absolute inset-0 block h-full w-full object-contain"
            draggable={false}
            onLoad={(e) => {
              /* Safari'de yükleme ≠ oynatma başlangıcı; çözümlemeyi bekle. */
              const img = e.currentTarget;
              const mark = () => setStartedAt(Date.now());
              if (typeof img.decode === "function") img.decode().then(mark, mark);
              else mark();
            }}
            /* Klip yoksa (henüz üretilmedi / yüklenemedi) statik illüstrasyona düş. */
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/erdi.svg";
            }}
          />
          )}
        </>
      )}
    </motion.div>
  );
}
