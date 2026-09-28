"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStill } from "@/lib/use-still";
import { preloadClips, useClipUrl } from "@/lib/mascot-clips";

/**
 * Nomi — uygulamanın mirketi.
 *
 * Mirketin Almancası **Erdmännchen**; ad oradan, karakter de öyle seçildi.
 *
 * ## Dördüncü nesil: 3B Nomi (2026-09-29)
 *
 * 1. nesil elle çizilmiş SVG, 2. nesil referans illüstrasyonun izlemesi, 3.
 * nesil üretilmiş (Wan 2.2) video klipleriydi. Şimdi hareketler Nomi'nin 3B
 * iskelet animasyonlarından çiziliyor (erdi-3d `betikler/maskot_klip.py`):
 * bekleme, kafa çevirme, gözcü duruşu, el sallama, gülümseme, zıplama,
 * şaşkınlık, üzüntü. 192x288, 24 fps, alfa kanallı animasyonlu WebP; sekizi
 * toplam 3,2 MB (eski set 17 MB).
 *
 * DİKİŞSİZ ZİNCİR: her klibin ilk ve son altı karesi bekleme karesiyle
 * yumuşak harmanlandı; bütün klipler BİREBİR aynı karede başlıyor ve bitiyor.
 * Klipler bir kez oynayıp (loop=1) o nötr karede duruyor; takas donmuş nötr
 * kareden yapılıyor, hangi sırayla oynarlarsa oynasınlar geçiş görünmez.
 *
 * Hareket azaltmada klip hiç yüklenmiyor; nötr karenin kendisi durağan
 * gösteriliyor (`nomi-durgun`).
 */
export type Mood =
  | "idle"
  | "happy"
  /* ADI ANDROID'IN ADI. Burada "cheer" yazıyordu ama gösterdiği dosya
     `celebrate` ve Android aynı kipe baştan beri `celebrate` diyor
     (`ui/Mascot` `CLIP`): aynı klibin iki adı vardı ve platformlar arası
     ölçüler kip adını okuyor. */
  | "celebrate"
  | "sad"
  | "wow"
  | "thumbsup";

/* Duygu → klip. Hepsi aynı 2:3 tuvalde, karakter her klipte aynı boyda. */
/**
 * Nomi'nin boyu — TEK sayı, çünkü Nomi'nin tek yeri var: Öğren ekranının
 * günlük tur kutusu (2026-09-22, Samet'in kararı). Önce `components/flow`
 * içindeydi (şablonlar maskotu kendisi çiziyordu), sonra iki sayı olarak
 * buraya taşındı (sonuç bandı 80, durum ekranı 96); tur içindeki bütün
 * yüzeyler kalkınca geriye kutu kaldı. Mobil ikizi `ui/Mascot`.
 */
export const MASCOT_CARD = 96;

const CLIP: Record<Mood, { file: string; aspect: number }> = {
  idle: { file: "nomi-bekleme", aspect: 2 / 3 },
  happy: { file: "nomi-gulumse", aspect: 2 / 3 },
  celebrate: { file: "nomi-zipla", aspect: 2 / 3 },
  sad: { file: "nomi-uzgun", aspect: 2 / 3 },
  wow: { file: "nomi-saskin", aspect: 2 / 3 },
  thumbsup: { file: "nomi-el", aspect: 2 / 3 },
};
/** Hareket azaltmada gösterilen nötr kare (bütün kliplerin ilk ve son karesi). */
const STILL = { file: "nomi-durgun" };

/*
  BOŞTA: bekleme klibi (nefes, bakınma, göz kırpma) ile hareketler sırayla:
  bekleme → rastgele bir hareket → bekleme → başka bir hareket… Aynı hareket
  üst üste gelmez. Hepsi aynı nötr karede başlayıp bittiği için zincir
  dikişsiz. Mobil `ui/Mascot` aynı listeyi aynı kuralla oynatıyor.
*/
const IDLE_CLIPS = ["nomi-bekleme", "nomi-kafa", "nomi-gozcu", "nomi-el", "nomi-gulumse", "nomi-zipla"];
const IDLE_BASE = IDLE_CLIPS[0];
/** Klip süreleri (kare / 24 fps), `maskot_klip.py` çıktısı `klipler.json`. */
const CLIP_LEN: Record<string, number> = {
  "nomi-bekleme": 6000,
  "nomi-kafa": 5000,
  "nomi-gozcu": 5000,
  "nomi-el": 2792,
  "nomi-gulumse": 2000,
  "nomi-zipla": 1583,
  "nomi-saskin": 2000,
  "nomi-uzgun": 2000,
};
/*
  Takas, klibin GERÇEK başlangıcından (<img> çözüldüğü an) klip süresi + küçük
  pay sonra: sabit zamanlayıcı yüklenme gecikmesini bilmediği için ya klibi
  ortasında keser ya da donmuş karede bekletirdi.
*/
const clipMs = (file: string) => (CLIP_LEN[file] ?? 6000) + 60;
/*
  iOS Safari animasyonu, görsel "yüklendi" dedikten bir süre sonra başlatıyor
  (çözümleme + ilk boyama); Android/Chrome hemen. Başlangıç anı img.decode()
  tamamlanınca alınıyor ve iOS'ta küçük bir pay ekleniyor.
*/
const IOS =
  typeof navigator !== "undefined" &&
  /iP(hone|ad|od)/.test(navigator.userAgent) &&
  !/CriOS|FxiOS/.test(navigator.userAgent);
const SWAP_MARGIN_MS = IOS ? 260 : 0;

/** Sıradaki boşta klibi: beklemeden sonra rastgele bir hareket (sonuncusu hariç), hareketten sonra bekleme. */
function nextIdle(cur: string, lastMove: string | null): string {
  if (cur !== IDLE_BASE) return IDLE_BASE;
  const moves = IDLE_CLIPS.filter((c) => c !== IDLE_BASE && c !== lastMove);
  return moves[Math.floor(Math.random() * moves.length)];
}

/** Idle rotasyonuna GEÇMEYEN duygular — gerekçe bileşen içindeki yorumda. */
const STICKY: Mood[] = ["sad"];

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
  const [idleClip, setIdleClip] = useState(IDLE_BASE);
  const lastMove = useRef<string | null>(null);
  /*
    Duygu bir SELAMLAMA, kalıcı bir durum değil: klip bir tur oynadıktan sonra
    maskot kendiliğinden idle rotasyonuna geçer. Bunsuz uzun yaşayan her yer
    (seri kutusu, ana sayfa, sonuç kartları) aynı klibi sonsuza dek döndürüyordu.
    Kısa ömürlü kullanımlar (cevap şeridi ~1.5 sn) bir turu zaten göremeden
    kapanır, etkilenmez. İstisna STICKY'de: sad bir duygu DURUMU, üzgünün
    neşeyle boşta gezinmesi tonu bozar. Diğer her duygu rotasyona katılır.
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
            const next = nextIdle(cur, lastMove.current);
            if (next !== IDLE_BASE) lastMove.current = next;
            return next;
          });
        } else setDrifted(true);
      },
      Math.max(0, clipMs(inIdle ? idleClip : CLIP[mood].file) + SWAP_MARGIN_MS - (Date.now() - startedAt)),
    );
    return () => clearTimeout(t);
  }, [startedAt, inIdle, drifts, still, idleClip, mood]);

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
      style={{ height: size * 1.5, width: size * 1.5 * (inIdle ? 2 / 3 : clip.aspect), overflow: "visible" }}
      aria-hidden="true"
      initial={false}
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
        // eslint-disable-next-line @next/next/no-img-element -- tek kare WebP; next/image burada kazanç getirmiyor
        <img src={`/anim/${STILL.file}.webp`} alt="" className="block h-full w-full object-contain" draggable={false} />
      ) : (
        <>
          {/* Takas tamponu: yeni klip çözülene kadar eskinin donmuş nötr karesi. */}
          {prevUrl && (
            /* eslint-disable-next-line @next/next/no-img-element -- animasyonlu WebP (public/anim/*.webp, 24fps); next/image yeniden kodlayıp animasyonu düşürür */
            <img
              src={prevUrl}
              alt=""
              className="absolute left-1/2 top-0 block h-full w-auto max-w-none -translate-x-1/2"
              draggable={false}
            />
          )}
          {/*
            Duygu değişince `key` değişiyor: aynı <img>'de yalnızca src
            değiştirmek, yeni klip çözülene kadar eski animasyon karesini
            gösteriyor; yeni öğe temiz başlıyor ve döngü baştan oynuyor.
          */}
          {url && (
          /* eslint-disable-next-line @next/next/no-img-element -- animasyonlu WebP; yukarıdaki prevUrl notu geçerli */
          <img
            key={url}
            src={url}
            alt=""
            /* Yükseklik kutuya eşit, genişlik klibin kendi oranı, ortalı: geniş
               idle'larda (kollar açık) görsel kutudan yana taşar ama karakter
               boyu değişmez — kutu hep 2:3, yerleşim oynamaz. */
            className="absolute left-1/2 top-0 block h-full w-auto max-w-none -translate-x-1/2"
            draggable={false}
            onLoad={(e) => {
              /* Safari'de yükleme ≠ oynatma başlangıcı; çözümlemeyi bekle. */
              const img = e.currentTarget;
              const mark = () => setStartedAt(Date.now());
              if (typeof img.decode === "function") img.decode().then(mark, mark);
              else mark();
            }}
            /* Klip yüklenemezse nötr kareye düş. */
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `/anim/${STILL.file}.webp`;
            }}
          />
          )}
        </>
      )}
    </motion.div>
  );
}
