"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStill } from "@/lib/use-still";

/**
 * Erdi — uygulamanın mirketi.
 *
 * Mirketin Almancası **Erdmännchen**; ad oradan, karakter de öyle seçildi.
 * Dikilip etrafı gözleyen, tetikte, meraklı bir hayvan — yeni bir dilin içinde
 * duran birinin hâli. Dik duruşu ekranda dikey bir alan kaplıyor, yani metnin
 * yanına değil METNİN YERİNE konabiliyor.
 *
 * ## Anatomi neden bu kadar önemli
 *
 * İlk çizim mirket değil, tanımsız bir orman hayvanı olmuştu: yuvarlak şişman
 * gövde, yuvarlak kafa, kocaman yuvarlak kulaklar, kalın kısa kuyruk. Mirketi
 * mirket yapan şeylerin hiçbiri yoktu. Bu sürümün omurgası dört karakteristik:
 *
 *   UZUN BOYUN     Kafa gövdenin üstüne oturmuyor, ondan YÜKSELİYOR. Dik
 *                  duruşun bütün etkisi bu boşluktan geliyor; boyun olmadan
 *                  karakter oturan bir hayvana benziyor.
 *   İNCE GÖVDE     Dar omuz, hafif genişleyen karın. Şişman bir gövde ayıya
 *                  benziyor; mirket bir çubuk gibi dik.
 *   SİVRİ YÜZ      Geniş alın, burna doğru daralan çene. Yuvarlak yüz mirketi
 *                  maymuna çeviriyor.
 *   İNCE KUYRUK    Dipte kalın, uçta sivri, ucu koyu — ve gövdeden çıkıp
 *                  yukarı kalkan bir eğri. Mirket kuyruğunu böyle taşıyor.
 *
 * Göz maskesi de yeniden çizildi: iki ayrı daire "gözlük" gibi duruyordu.
 * Gerçekte gözü saran, dışa doğru incelen eğik bir bant.
 *
 * ## Hacim
 *
 * Düz renk karakteri kâğıttan kesilmiş gibi gösteriyordu. Üç katman var ve
 * hepsi ana silüetin İÇİNDE kalıyor: sağ kenardaki form gölgesi, boynun
 * altındaki kafa gölgesi, karnın açık alanı. Kontur yok — kontur çizgisi
 * karakteri çıkartmaya çevirir ve küçük boyutta kalınlaşıp yüzü yutar.
 *
 * ## Duygular
 *
 * `idle` `happy` `cheer` `sad` `think` `wow` `sleep`. Duygu bir yüz
 * ifadesinden ibaret değil: üzgün mirketin başı eğiliyor, kuyruğu düşüyor,
 * kulakları yatıyor, göz kapakları iniyor; sevinen mirket zıplıyor, kolları
 * kalkıyor, kuyruğu hızlanıyor. Duruşlar döndürülerek değil AYRI çiziliyor —
 * bir damlayı 130 derece çevirmek havaya kalkmış kol vermiyor.
 *
 * Hareket azaltma tercihinde duruş korunuyor, döngüler duruyor: ifade bilgi
 * taşıyor, animasyon taşımıyor.
 */
export type Mood = "idle" | "happy" | "cheer" | "sad" | "think" | "wow" | "sleep";

/** Kürk ve yüz renkleri — karakterin kimliği, temaya göre değişmiyor. */
const FUR = "#d9a86c";
const FUR_SHADE = "#c08d51";
const FUR_DEEP = "#a2703a";
const BELLY = "#f6e7d0";
const MASK = "#77502e";
const TIP = "#42301f";
const INK = "#2b2130";
const EAR = "#e7bc92";
const BLUSH = "#ee8b7f";

const VB_W = 200;
const VB_H = 272;

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
  const blink = useBlink(still || mood === "sleep" || mood === "cheer");

  const bob: Record<Mood, { y: number[] | number; rotate?: number[] | number; dur: number }> = {
    idle: { y: [0, -2, 0], dur: 3.6 },
    happy: { y: [0, -9, 0], dur: 0.85 },
    cheer: { y: [0, -17, 0], rotate: [0, -3, 3, 0], dur: 0.62 },
    sad: { y: 5, dur: 0 },
    think: { y: 0, dur: 0 },
    wow: { y: -3, dur: 0 },
    sleep: { y: [0, 2, 0], dur: 4.4 },
  };
  const b = bob[mood];

  // Baş eğimi boynun tepesinden dönüyor: kafanın kendi merkezinden döndürmek
  // boynu koparıyordu.
  const headTilt = mood === "sad" ? 6 : mood === "think" ? -9 : mood === "sleep" ? 10 : 0;
  const earDrop = mood === "sad" ? 12 : mood === "wow" || mood === "cheer" ? -6 : 0;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={size}
      height={(size * VB_H) / VB_W}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Yere düşen gölge — karakteri havada asılı olmaktan kurtarıyor.
          `initial={false}` ve `rx`in her zaman hedefte olması zorunlu: `rx` bir
          CSS özelliği değil SVG özniteliği, hedeften çıkarsa motion onu
          "undefined" diye yazıyor. */}
      <motion.ellipse
        cx="100"
        cy="250"
        rx="48"
        ry="9"
        fill={INK}
        opacity="0.12"
        initial={false}
        animate={{ rx: still ? 48 : mood === "cheer" ? [48, 34, 48] : [48, 44, 48] }}
        transition={{ duration: b.dur || 3, repeat: still || !b.dur ? 0 : Infinity, ease: "easeInOut" }}
      />

      <motion.g
        animate={{ y: still ? 0 : b.y, rotate: still ? 0 : (b.rotate ?? 0) }}
        transition={
          b.dur
            ? { duration: b.dur, repeat: still ? 0 : Infinity, ease: "easeInOut" }
            : { type: "spring", stiffness: 250, damping: 17 }
        }
        style={{ originX: "100px", originY: "244px" }}
      >
        <Tail mood={mood} still={still} />

        {/*
          SİLÜET — kafa, boyun ve gövde TEK yol.

          Önce üç ayrı parçaydı ve birleşmiyorlardı: boyun yanlardan taşan bir
          kutu gibi duruyor, kafa gövdenin üstüne konmuş gibi görünüyordu. Tek
          yolda boyun bir DARALMA oluyor — kafadan çıkıp omuza açılan kesintisiz
          bir hat.
        */}
        <path
          d="M100 18c-22 0-38 16-38 38 0 18 10 34 22 41 2 9 2 17 0 25-8 8-14 26-16 50-2 24-4 44-4 54 0 14 14 22 36 22s36-8 36-22c0-10-2-30-4-54-2-24-8-42-16-50-2-8-2-16 0-25 12-7 22-23 22-41 0-22-16-38-38-38z"
          fill={FUR}
        />
        {/* Form gölgesi — sağ kenar boyunca, ana silüetin içinde. */}
        <path
          d="M100 18c-6 0-12 1-17 4 12 6 21 19 21 34 0 18-10 34-22 41-2 9-2 17 0 25 8 8 14 26 16 50 2 24 4 44 4 54 0 9-6 16-18 20 3 .4 7 .6 12 .6 22 0 36-8 36-22 0-10-2-30-4-54-2-24-8-42-16-50-2-8-2-16 0-25 12-7 22-23 22-41 0-22-16-38-38-38z"
          fill={FUR_SHADE}
          opacity="0.45"
        />
        {/* Göğüs–karın önlüğü — boynun altından karına inen tek açık alan. */}
        <path
          d="M100 128c-10 6-17 28-19 56-1 20 6 32 19 32s20-12 19-32c-2-28-9-50-19-56z"
          fill={BELLY}
        />

        <Arms mood={mood} still={still} />

        {/* Arka ayaklar — tabanın altından taşan iki pati. */}
        <ellipse cx="80" cy="248" rx="18" ry="10" fill={FUR_DEEP} />
        <ellipse cx="120" cy="248" rx="18" ry="10" fill={FUR_DEEP} />

        <motion.g
          style={{ originX: "100px", originY: "112px" }}
          animate={{ rotate: headTilt }}
          transition={{ type: "spring", stiffness: 210, damping: 15 }}
        >
          {/* Kulaklar — küçük, kafanın yan kenarına yarı gömülü. Kafadan önce
              çiziliyor ki kafa üstlerini örtsün. */}
          <motion.g
            style={{ originX: "100px", originY: "60px" }}
            animate={{ rotate: earDrop }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          >
            <ellipse cx="55" cy="47" rx="14" ry="12.5" fill={FUR_SHADE} />
            <ellipse cx="56" cy="47" rx="7" ry="6" fill={EAR} />
          </motion.g>
          <motion.g
            style={{ originX: "100px", originY: "60px" }}
            animate={{ rotate: -earDrop }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          >
            <ellipse cx="145" cy="47" rx="14" ry="12.5" fill={FUR_SHADE} />
            <ellipse cx="144" cy="47" rx="7" ry="6" fill={EAR} />
          </motion.g>

          {/* Çene altı gölgesi — kafayı boynun üstünden ayırıyor. */}
          <path d="M84 92c4 6 10 10 16 10s12-4 16-10c-5 4-10 6-16 6s-11-2-16-6z" fill={FUR_SHADE} opacity="0.5" />
          {/* Ağız çevresi — burnu ve ağzı taşıyan açık alan, aşağı doğru sivri. */}
          <path d="M100 74c-12 0-19 9-19 20 0 11 9 20 19 20s19-9 19-20c0-11-7-20-19-20z" fill={BELLY} opacity="0.92" />

          {/*
            GÖZ MASKESİ — burun köprüsünde birleşip dışa doğru sivrilen iki badem.

            İki elips denendi ve yine "gözlük" çıktı: göz büyük olduğu için
            elipsten geriye ince bir çerçeve kalıyor ve o çerçeve cam gibi
            okunuyor. Badem hem gözün üstünde ve altında daha kalın bir alan
            bırakıyor hem de ortada birleştiği için tek bir bant olarak
            görünüyor — maskeyi maske yapan şey bu.
          */}
          <path
            d="M100 56c-8-8-21-12-33-9-11 3-16 14-11 23 5 10 18 14 28 9 7-3 13-9 16-15z"
            fill={MASK}
          />
          <path
            d="M100 56c8-8 21-12 33-9 11 3 16 14 11 23-5 10-18 14-28 9-7-3-13-9-16-15z"
            fill={MASK}
          />

          <Eyes mood={mood} blink={blink} />
          <Brows mood={mood} />

          {/* Burun — küçük, uçta yuvarlanan üçgen. */}
          <path
            d="M100 84c-5.5 0-9 3-9 6.5 0 4 4.5 7.5 9 7.5s9-3.5 9-7.5c0-3.5-3.5-6.5-9-6.5z"
            fill={INK}
          />
          <ellipse cx="96.5" cy="88" rx="2" ry="1.4" fill="#fff" opacity="0.5" />
          <Mouth mood={mood} />

          {(mood === "happy" || mood === "cheer") && (
            <g opacity="0.42">
              <ellipse cx="66" cy="88" rx="9" ry="5" fill={BLUSH} />
              <ellipse cx="134" cy="88" rx="9" ry="5" fill={BLUSH} />
            </g>
          )}
        </motion.g>
      </motion.g>

      {mood === "sleep" && !still && <Zzz />}
    </svg>
  );
}

/**
 * Kuyruk — dipte kalın, uçta sivri, ucu koyu.
 *
 * Silüetten önce çiziliyor: dibi gövdenin altında kalıyor, yani gövdeye
 * bağlanıyor, yanına konmuş bir hilal olmuyor. Varsayılan duruşta hafif dışa
 * açık; tam arkada duran bir kuyruk gövdenin arkasında tamamen kayboluyordu.
 */
function Tail({ mood, still }: { mood: Mood; still: boolean }) {
  const base = mood === "sad" ? 20 : mood === "cheer" ? 2 : 9;
  const swing = mood === "cheer" ? 9 : 4;
  return (
    <motion.g
      style={{ originX: "126px", originY: "212px" }}
      animate={
        still || mood === "sad"
          ? { rotate: base }
          : { rotate: [base - swing, base + swing, base - swing] }
      }
      transition={{ duration: mood === "cheer" ? 0.5 : 3, repeat: still ? 0 : Infinity, ease: "easeInOut" }}
    >
      <path
        d="M120 222c26-2 44-18 48-40 4-24-2-48-14-62l-16 10c9 12 13 30 10 48-3 18-14 30-31 32z"
        fill={FUR_SHADE}
      />
      {/* Uç, gövdenin bittiği kenardan DEVAM ediyor ve sivriliyor. Kesik bir
          dikdörtgen, kuyruğun yanına konmuş ayrı bir çubuk gibi duruyordu. */}
      <path d="M154 130c-2-7-5-13-10-18-3-4-8-2-9 3l-2 12z" fill={TIP} />
    </motion.g>
  );
}

/**
 * Ön kollar — omuzdan çıkıp göğüste biten iki kısa kol.
 *
 * Önce göğüsteki iki serbest damlaydı ve kol olarak okunmuyorlardı: gövdeye
 * hiçbir yerden bağlanmıyor, karnın üstünde duran iki leke gibi görünüyorlardı.
 * Şimdi omuzdan başlıyorlar, yani nereden çıktıkları belli.
 *
 * Duruşlar döndürülerek değil AYRI çiziliyor: bir damlayı 130 derece çevirmek
 * havaya kalkmış bir kol vermiyor, ters dönmüş bir damla veriyor.
 */
function Arms({ mood, still }: { mood: Mood; still: boolean }) {
  if (mood === "cheer") {
    return (
      <motion.g
        fill={FUR_DEEP}
        animate={still ? {} : { y: [0, -7, 0] }}
        transition={{ duration: 0.62, repeat: still ? 0 : Infinity, ease: "easeInOut" }}
      >
        <path d="M80 160c-11-16-20-34-19-48 1-11 13-12 17-1 6 15 12 33 14 46 2 10-7 12-12 3z" />
        <path d="M120 160c11-16 20-34 19-48-1-11-13-12-17-1-6 15-12 33-14 46-2 10 7 12 12 3z" />
      </motion.g>
    );
  }
  if (mood === "think") {
    return (
      <g fill={FUR_DEEP}>
        <Arm side="left" />
        {/* Sağ kol göğüsten çeneye uzanıyor: dirsek aşağıda, el burnun altında. */}
        <path d="M120 180c-7-11-8-25-2-35 5-8 12-15 18-19 5-3 11 2 8 8-3 6-8 11-10 17-3 8-3 18-3 26 0 7-8 8-11 3z" />
      </g>
    );
  }
  const drop = mood === "sad" ? 6 : 0;
  return (
    <g fill={FUR_DEEP}>
      <Arm side="left" drop={drop} />
      <Arm side="right" drop={drop} />
    </g>
  );
}

/**
 * Tek kol — omuzdan içe kıvrılan bir kapsül, ucunda iki parmak çizgisi.
 * Parmak çizgisi olmadan kol bir sosis gibi duruyor.
 */
function Arm({ side, drop = 0 }: { side: "left" | "right"; drop?: number }) {
  const flip = side === "right" ? -1 : 1;
  return (
    <g transform={`translate(${side === "right" ? 200 : 0} ${drop}) scale(${flip} 1)`}>
      <path d="M78 138c-9 6-13 22-11 38 1 11 9 17 15 13 6-4 8-16 7-27-1-10-4-19-6-24z" />
      <path
        d="M76 182c2 3 4 4 7 3"
        fill="none"
        stroke={TIP}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.65"
      />
    </g>
  );
}

/**
 * Gözler — ak, bebek ve iki parlaklık.
 *
 * Gözün tamamını koyu yapmak ifadeyi öldürüyor: bakış yönü okunmuyor,
 * şaşkınlıkla uykunun farkı kalmıyor. İkinci küçük parlaklık gözü camlaştırıp
 * canlandırıyor — tek parlaklık düz bir nokta gibi duruyor.
 */
function Eyes({ mood, blink }: { mood: Mood; blink: boolean }) {
  if (mood === "sleep" || blink) {
    return (
      <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M69 63q10 7 20 0" />
        <path d="M111 63q10 7 20 0" />
      </g>
    );
  }
  if (mood === "cheer") {
    return (
      <g stroke={INK} strokeWidth="3.8" strokeLinecap="round" fill="none">
        <path d="M69 66q10-11 20 0" />
        <path d="M111 66q10-11 20 0" />
      </g>
    );
  }
  const big = mood === "wow";
  const rx = big ? 11.5 : 10;
  const ry = big ? 12.5 : 11;
  const pupil = big ? 5 : 6;
  const look = mood === "think" ? 4 : 0;
  const lid = mood === "sad" ? 2 : 0;
  return (
    <g>
      <ellipse cx="79" cy="62" rx={rx} ry={ry} fill="#fff" />
      <ellipse cx="121" cy="62" rx={rx} ry={ry} fill="#fff" />
      <circle cx={79 + look} cy={63 + lid} r={pupil} fill={INK} />
      <circle cx={121 + look} cy={63 + lid} r={pupil} fill={INK} />
      <circle cx={82 + look} cy={59 + lid} r="2.4" fill="#fff" />
      <circle cx={124 + look} cy={59 + lid} r="2.4" fill="#fff" />
      <circle cx={76 + look} cy={66 + lid} r="1.3" fill="#fff" opacity="0.75" />
      <circle cx={118 + look} cy={66 + lid} r="1.3" fill="#fff" opacity="0.75" />
      {mood === "sad" && (
        <g fill={MASK}>
          <path d="M68 62a11 11 0 0 1 22 0z" />
          <path d="M110 62a11 11 0 0 1 22 0z" />
        </g>
      )}
    </g>
  );
}

/** Kaşlar — üzgünle şaşkını, meraklıyla uykuluyu ayıran iki kısa çizgi. */
function Brows({ mood }: { mood: Mood }) {
  const shape: Record<Mood, [string, string]> = {
    idle: ["M65 37q13-6 25-1", "M110 36q13-5 25 1"],
    happy: ["M65 33q13-8 25-2", "M110 31q13-6 25 2"],
    cheer: ["M65 30q13-10 25-2", "M110 28q13-7 25 2"],
    sad: ["M65 42q13-11 25-2", "M110 39q13-8 25 2"],
    think: ["M65 39q13-3 25 0", "M110 27q13-2 25 4"],
    wow: ["M65 28q13-8 25-1", "M110 27q13-7 25 1"],
    sleep: ["M65 39q13-4 25 0", "M110 39q13-4 25 0"],
  };
  const [l, r] = shape[mood];
  return (
    <g stroke={TIP} strokeWidth="4" strokeLinecap="round" fill="none">
      <motion.path initial={false} animate={{ d: l }} d={l} />
      <motion.path initial={false} animate={{ d: r }} d={r} />
    </g>
  );
}

/** Ağız — burnun altından inen çizgi ve ondan ayrılan iki eğri. */
function Mouth({ mood }: { mood: Mood }) {
  if (mood === "cheer" || mood === "wow") {
    const rx = mood === "cheer" ? 11 : 7;
    const ry = mood === "cheer" ? 12 : 9.5;
    return (
      <g>
        <ellipse cx="100" cy="112" rx={rx} ry={ry} fill={TIP} />
        {mood === "cheer" && (
          <ellipse cx="100" cy="119" rx={rx * 0.55} ry={ry * 0.32} fill={BLUSH} opacity="0.85" />
        )}
      </g>
    );
  }
  // Eğriler burnun hemen altında ve dar. Önce daha aşağıda ve genişti; iki
  // uzun eğri burun altında bıyık gibi okunuyordu.
  // Tek simetrik eğri. Burundan ayrılan İKİ eğri, ne kadar daraltılırsa
  // daraltılsın burun altında bıyık gibi okunuyordu.
  const curves: Record<Mood, string> = {
    idle: "M100 99v4M91 105q9 6 18 0",
    happy: "M100 99v4M89 104q11 11 22 0",
    cheer: "",
    sad: "M100 99v4M91 110q9-8 18 0",
    think: "M100 99v4M92 105q8 5 15 1",
    wow: "",
    sleep: "M100 99v4M93 105q7 4 14 0",
  };
  return <path d={curves[mood]} fill="none" stroke={TIP} strokeWidth="3.4" strokeLinecap="round" />;
}

/** Uyku baloncukları. */
function Zzz() {
  return (
    <g fill={INK} opacity="0.5" fontSize="16" fontWeight="800" fontFamily="ui-sans-serif, system-ui">
      {[0, 1, 2].map((i) => (
        <motion.text
          key={i}
          x={150 + i * 8}
          y={40 - i * 12}
          initial={false}
          animate={{ opacity: [0, 0.7, 0], y: [0, -16, -28] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        >
          z
        </motion.text>
      ))}
    </g>
  );
}

/**
 * Göz kırpma — aralık rastgele.
 *
 * Sabit aralıkla kırpmak karakteri makineye çeviriyor; canlı bir yüz düzensiz
 * kırpar.
 */
function useBlink(disabled: boolean) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    if (disabled) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setBlink(true);
        timer = setTimeout(() => {
          setBlink(false);
          schedule();
        }, 130);
      }, 1900 + Math.random() * 3600);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [disabled]);
  return blink;
}
