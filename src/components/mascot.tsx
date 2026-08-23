"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStill } from "@/lib/use-still";

/**
 * Erdi — uygulamanın mirketi.
 *
 * Mirketin Almancası **Erdmännchen**; adı oradan geliyor ve karakterin kendisi
 * de öyle seçildi. Mirket dikilip etrafı gözleyen, tetikte, meraklı bir hayvan
 * — yeni bir dilin içinde duran birinin hâli. Dik duruşu ayrıca ekranda dikey
 * bir alan kaplıyor, yani metnin yanına değil METNİN YERİNE konabiliyor.
 *
 * ## Çizimin kuralları
 *
 * Silüet önce geliyor: gövde tek akışkan bir form, kafa onun üstüne binen ve
 * burna doğru daralan bir damla. Parçaları yan yana dizmek — ilk denemede
 * yapılan buydu — karakteri "birleştirilmiş şekiller" gibi gösteriyor;
 * kollar gövdeye gömülüyor, kuyruk havada asılı kalıyordu.
 *
 * Gözde AK var. Gözün tamamını koyu yapmak ifadeyi öldürüyor: bakış yönü
 * okunmuyor, şaşkınlıkla uykunun farkı kalmıyor. Ak + bebek + parıltı
 * üçlüsü bakışı yönlendirilebilir kılıyor ve karakterin canlılığının çoğu
 * oradan geliyor.
 *
 * Ön patiler göğüste birleşik: mirketin en tanınır duruşu bu. Aynı zamanda
 * animasyonun en işlek yeri — kutlamada havaya kalkıyor, düşünürken biri
 * çeneye gidiyor.
 *
 * ## Neden bu kadar parça
 *
 * Duygu bir yüz ifadesinden ibaret değil. Üzgün mirketin başı eğiliyor,
 * kuyruğu düşüyor, kulakları yatıyor; sevinen mirket zıplıyor, kolları
 * kalkıyor, kuyruğu hızlanıyor. Kuyruk, gövde, patiler, baş, kulaklar,
 * kaşlar, göz kapakları, gözbebekleri, ağız ve yanaklar ayrı ayrı
 * oynatılabiliyor.
 *
 * Hareket azaltma tercihi açıkken duruş korunuyor ama döngüler duruyor:
 * ifade bilgi taşıyor, animasyon taşımıyor.
 */
export type Mood = "idle" | "happy" | "cheer" | "sad" | "think" | "wow" | "sleep";

/** Kürk ve yüz renkleri — karakterin kimliği, temaya göre değişmiyor. */
const FUR = "#dcaa72";
const FUR_MID = "#c8914f";
const FUR_DARK = "#a97538";
const BELLY = "#f6e6cb";
const MASK = "#8a5f38";
const TIP = "#4a3524";
const INK = "#2f2430";
const EAR = "#e9bd91";
const BLUSH = "#ef8b81";

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
    happy: { y: [0, -8, 0], dur: 0.85 },
    cheer: { y: [0, -15, 0], rotate: [0, -3, 3, 0], dur: 0.62 },
    sad: { y: 4, dur: 0 },
    think: { y: 0, dur: 0 },
    wow: { y: -3, dur: 0 },
    sleep: { y: [0, 2, 0], dur: 4.4 },
  };
  const b = bob[mood];

  const headTilt = mood === "sad" ? 5 : mood === "think" ? -8 : mood === "sleep" ? 9 : 0;
  const earDrop = mood === "sad" ? 10 : mood === "wow" || mood === "cheer" ? -5 : 0;

  return (
    <svg
      viewBox="-4 0 172 210"
      width={size}
      height={(size * 210) / 172}
      className={className}
      /*
        Dekoratif. On üç kullanım yerinin hiçbirinde Erdi tek başına bilgi
        taşımıyor — yanında her zaman aynı şeyi söyleyen bir başlık ya da
        sonuç metni var. `role="img" aria-label="Erdi"` ekran okuyucuya her
        kapanışta, her turun sonunda ve her seri kutlamasında "Erdi" dedirtiyordu;
        bu bir bilgi değil, gürültü.
      */
      aria-hidden="true"
      focusable="false"
    >
      {/* Yere düşen yumuşak gölge — karakteri havada asılı olmaktan kurtarıyor. */}
      <motion.ellipse
        cx="80"
        cy="196"
        rx="42"
        ry="8"
        fill={INK}
        opacity="0.13"
        animate={still ? {} : { rx: mood === "cheer" ? [42, 30, 42] : [42, 38, 42] }}
        transition={{ duration: b.dur || 3, repeat: still || !b.dur ? 0 : Infinity, ease: "easeInOut" }}
      />

      <motion.g
        animate={{ y: still ? 0 : b.y, rotate: still ? 0 : (b.rotate ?? 0) }}
        transition={
          b.dur
            ? { duration: b.dur, repeat: still ? 0 : Infinity, ease: "easeInOut" }
            : { type: "spring", stiffness: 250, damping: 17 }
        }
        style={{ originX: "80px", originY: "192px" }}
      >
        <Tail mood={mood} still={still} />

        {/* Kulaklar silüetin ARKASINDA: yarıları kafanın içinde kalıyor,
            böylece yapıştırılmış gibi durmuyorlar. */}
        <motion.g
          style={{ originX: "80px", originY: "60px" }}
          animate={{ rotate: earDrop }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          <ellipse cx="31" cy="46" rx="14" ry="12" fill={FUR_MID} />
          <ellipse cx="31" cy="46" rx="7.5" ry="6" fill={EAR} />
        </motion.g>
        <motion.g
          style={{ originX: "80px", originY: "60px" }}
          animate={{ rotate: -earDrop }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          <ellipse cx="129" cy="46" rx="14" ry="12" fill={FUR_MID} />
          <ellipse cx="129" cy="46" rx="7.5" ry="6" fill={EAR} />
        </motion.g>

        {/*
          SİLÜET — kafa, boyun ve gövde TEK bir yol.
          Önceki denemede bunlar ayrı ovallerdi ve karakter "üst üste konmuş
          şekiller" gibi duruyordu: kafa gövdeye oturmuyor, boyun hiç yok,
          kardan adam hissi veriyordu. Tek yol mirketin gerçek duruşunu
          veriyor — iri kafa, ince boyun, armut gövde.
        */}
        <path
          d="M80 14C53 14 33 34 33 60c0 16 8 29 20 36-6 4-13 12-18 24-6 16-8 32-8 42 0 20 18 30 53 30s53-10 53-30c0-10-2-26-8-42-5-12-12-20-18-24 12-7 20-20 20-36 0-26-20-46-47-46z"
          fill={FUR}
        />

        {/* Göğüs–karın önlüğü: kafanın altından karına inen tek açık alan.
            Ayrı bir karın elipsi göbek gibi duruyordu. */}
        <path
          d="M80 106c-18 6-28 30-28 52 0 18 12 26 28 26s28-8 28-26c0-22-10-46-28-52z"
          fill={BELLY}
        />

        {/* Arka ayaklar — silüetin alt kenarından taşan iki çıkıntı. Silüetten
            SONRA çiziliyor, yoksa gövdenin arkasında kalıp hiç görünmüyorlar. */}
        <ellipse cx="60" cy="190" rx="15" ry="8" fill={FUR_DARK} />
        <ellipse cx="100" cy="190" rx="15" ry="8" fill={FUR_DARK} />

        <Paws mood={mood} still={still} />

        <motion.g
          style={{ originX: "80px", originY: "96px" }}
          animate={{ rotate: headTilt }}
          transition={{ type: "spring", stiffness: 210, damping: 15 }}
        >
          {/* Ağız çevresi — burnu ve ağzı taşıyan açık alan. */}
          <ellipse cx="80" cy="82" rx="21" ry="16" fill={BELLY} opacity="0.9" />

          {/* Göz maskeleri — mirketin imzası; badem, eğik, yumuşak. */}
          <ellipse cx="60" cy="56" rx="17" ry="13.5" fill={MASK} opacity="0.92" transform="rotate(-11 60 56)" />
          <ellipse cx="100" cy="56" rx="17" ry="13.5" fill={MASK} opacity="0.92" transform="rotate(11 100 56)" />

          <Eyes mood={mood} blink={blink} />
          <Brows mood={mood} />

          {/* Burun */}
          <path
            d="M80 70c-5 0-8.5 2.8-8.5 6.2 0 3.8 4 7.2 8.5 7.2s8.5-3.4 8.5-7.2c0-3.4-3.5-6.2-8.5-6.2z"
            fill={INK}
          />
          <Mouth mood={mood} />

          {(mood === "happy" || mood === "cheer") && (
            <g opacity="0.45">
              <ellipse cx="45" cy="75" rx="8" ry="4.5" fill={BLUSH} />
              <ellipse cx="115" cy="75" rx="8" ry="4.5" fill={BLUSH} />
            </g>
          )}
        </motion.g>
      </motion.g>

      {mood === "sleep" && !still && <Zzz />}
    </svg>
  );
}

/**
 * Kuyruk.
 *
 * Dipte kalın, uçta ince, ucu koyu — mirket kuyruğu böyle. Sabit kalınlıkta
 * bir çizgi bunu veremiyordu, havada duran bir kablo gibi görünüyordu. Silüetten
 * ÖNCE çiziliyor: dibi gövdenin altında kalıyor, yani kuyruk gerçekten ona
 * bağlanıyor, yanına konmuş bir hilal olmuyor.
 */
function Tail({ mood, still }: { mood: Mood; still: boolean }) {
  const base = mood === "sad" ? 20 : mood === "cheer" ? 2 : 9;
  const swing = mood === "cheer" ? 9 : 4;
  return (
    <motion.g
      style={{ originX: "114px", originY: "178px" }}
      animate={still || mood === "sad" ? { rotate: base } : { rotate: [base - swing, base + swing, base - swing] }}
      transition={{ duration: mood === "cheer" ? 0.5 : 3, repeat: still ? 0 : Infinity, ease: "easeInOut" }}
    >
      <path
        d="M110 182c30-2 47-21 47-48 0-14-4-26-12-35l-14 10c5 7 9 16 9 25 0 17-12 30-30 32z"
        fill={FUR_MID}
      />
      {/* Uç, ana yolun bittiği kenardan DEVAM ediyor. Ayrı bir yere konan koyu
          leke, kuyruğun yanında duran kopuk bir çubuk gibi görünüyordu. */}
      <path d="M145 99c-4-5-9-9-14-12l-11 13c4 2 8 5 12 9z" fill={TIP} />
    </motion.g>
  );
}

/**
 * Ön patiler.
 *
 * Duruşlar DÖNDÜRÜLMÜŞ değil, ayrı ayrı çizilmiş. Tek bir damlayı 136 derece
 * çevirmek havaya kalkmış bir kol vermiyor — ters dönmüş bir damla veriyor;
 * kolun dirseği, yönü ve kısalması ancak kendi yolunda anlatılabiliyor.
 *
 * Göğüste birleşik duruş mirketin en tanınır hâli, kutlamada iki kol havada,
 * düşünürken sağ pati çenede.
 */
function Paws({ mood, still }: { mood: Mood; still: boolean }) {
  if (mood === "cheer") {
    return (
      <motion.g
        animate={still ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 0.62, repeat: still ? 0 : Infinity, ease: "easeInOut" }}
        fill={FUR_MID}
      >
        <path d="M40 130c-12-11-18-26-15-38 2-8 10-9 13-2 6 11 11 24 12 34 1 8-6 12-10 6z" />
        <path d="M120 130c12-11 18-26 15-38-2-8-10-9-13-2-6 11-11 24-12 34-1 8 6 12 10 6z" />
      </motion.g>
    );
  }
  if (mood === "think") {
    return (
      <g fill={FUR_MID}>
        <path d="M68 108c5 0 9 4 9 10 0 8-4 15-9 15s-9-7-9-15c0-6 4-10 9-10z" />
        {/* Sağ kol göğüsten çeneye uzanıyor: dirsek aşağıda, el burnun altında. */}
        <path d="M92 130c-4-6-4-14-1-20 3-7 9-15 14-19 4-3 9 0 8 5-1 5-4 10-7 14-4 6-5 14-6 20-1 4-6 4-8 0z" />
      </g>
    );
  }
  const drop = mood === "sad" ? 4 : 0;
  return (
    <g fill={FUR_MID}>
      <path d={`M68 ${108 + drop}c5 0 9 4 9 10 0 8-4 15-9 15s-9-7-9-15c0-6 4-10 9-10z`} />
      <path d={`M92 ${108 + drop}c5 0 9 4 9 10 0 8-4 15-9 15s-9-7-9-15c0-6 4-10 9-10z`} />
    </g>
  );
}

/**
 * Gözler.
 *
 * Ak + bebek + parıltı. Bakış yönü `look` ile kayıyor: düşünürken yana,
 * şaşırınca merkeze ve büyük. Kapalı hâller çizgi değil eğri — düz bir çizgi
 * kapalı göz değil, kapanmış bir perde gibi duruyor.
 */
function Eyes({ mood, blink }: { mood: Mood; blink: boolean }) {
  if (mood === "sleep" || blink) {
    return (
      <g stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M51 57q9 6 18 0" />
        <path d="M91 57q9 6 18 0" />
      </g>
    );
  }
  if (mood === "cheer") {
    // Sevinçten kısılan göz yukarı kavisli — kapalı göz değil, gülen göz.
    return (
      <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M51 60q9-10 18 0" />
        <path d="M91 60q9-10 18 0" />
      </g>
    );
  }
  const big = mood === "wow";
  const rx = big ? 12 : 10.5;
  const ry = big ? 12.5 : 11;
  const pupil = big ? 5.2 : 6.2;
  const look = mood === "think" ? 4 : 0;
  const lidY = mood === "sad" ? 2 : 0;
  return (
    <g>
      <ellipse cx="60" cy="56" rx={rx} ry={ry} fill="#fff" />
      <ellipse cx="100" cy="56" rx={rx} ry={ry} fill="#fff" />
      <circle cx={60 + look} cy={57 + lidY} r={pupil} fill={INK} />
      <circle cx={100 + look} cy={57 + lidY} r={pupil} fill={INK} />
      <circle cx={62.5 + look} cy={53.5 + lidY} r="2.4" fill="#fff" />
      <circle cx={102.5 + look} cy={53.5 + lidY} r="2.4" fill="#fff" />
      {/* Üzgünde üst kapak gözü kısmen örtüyor — kaş tek başına yetmiyor. */}
      {mood === "sad" && (
        <g fill={MASK}>
          <path d="M49 56a11.5 11.5 0 0 1 23 0z" />
          <path d="M89 56a11.5 11.5 0 0 1 23 0z" />
        </g>
      )}
    </g>
  );
}

/** Kaşlar — üzgünle şaşkını, meraklıyla uykuluyu ayıran iki kısa çizgi. */
function Brows({ mood }: { mood: Mood }) {
  const shape: Record<Mood, [string, string]> = {
    idle: ["M48 35q11-5 22-1", "M90 34q11-4 22 1"],
    happy: ["M48 32q11-7 22-2", "M90 30q11-5 22 2"],
    cheer: ["M48 29q11-9 22-2", "M90 27q11-6 22 2"],
    sad: ["M48 39q11-10 22-2", "M90 36q11-7 22 2"],
    think: ["M48 36q11-3 22 0", "M90 26q11-2 22 4"],
    wow: ["M48 27q11-7 22-1", "M90 26q11-6 22 1"],
    sleep: ["M48 36q11-4 22 0", "M90 36q11-4 22 0"],
  };
  const [l, r] = shape[mood];
  return (
    <g stroke={TIP} strokeWidth="3.6" strokeLinecap="round" fill="none">
      <motion.path initial={false} animate={{ d: l }} d={l} />
      <motion.path initial={false} animate={{ d: r }} d={r} />
    </g>
  );
}

/** Ağız — burnun altından inen çizgi ve ondan ayrılan iki eğri. */
function Mouth({ mood }: { mood: Mood }) {
  if (mood === "cheer" || mood === "wow") {
    const rx = mood === "cheer" ? 10 : 6.5;
    const ry = mood === "cheer" ? 10.5 : 9;
    return (
      <g>
        <ellipse cx="80" cy="95" rx={rx} ry={ry} fill={TIP} />
        {mood === "cheer" && (
          <ellipse cx="80" cy="101" rx={rx * 0.55} ry={ry * 0.35} fill={BLUSH} opacity="0.85" />
        )}
      </g>
    );
  }
  const curves: Record<Mood, string> = {
    idle: "M80 84v5M80 89q-7 6-13 1M80 89q7 6 13 1",
    happy: "M80 84v5M80 89q-9 10-16 2M80 89q9 10 16 2",
    cheer: "",
    sad: "M80 84v5M80 92q-8-4-13 2M80 92q8-4 13 2",
    think: "M80 84v5M80 89q-7 5-12 2M80 89q6 2 11 1",
    wow: "",
    sleep: "M80 84v5M80 90q-6 4-9 1M80 90q6 4 9 1",
  };
  return <path d={curves[mood]} fill="none" stroke={TIP} strokeWidth="3.4" strokeLinecap="round" />;
}

/** Uyku baloncukları. */
function Zzz() {
  return (
    <g fill={INK} opacity="0.5" fontSize="14" fontWeight="800" fontFamily="ui-sans-serif, system-ui">
      {[0, 1, 2].map((i) => (
        <motion.text
          key={i}
          x={128 + i * 7}
          y={40 - i * 11}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [0, -14, -24] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        >
          z
        </motion.text>
      ))}
    </g>
  );
}

/**
 * Göz kırpma.
 *
 * Sabit aralıkla kırpmak karakteri makineye çeviriyor; aralık rastgele
 * seçiliyor — canlı bir yüz düzensiz kırpar.
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
