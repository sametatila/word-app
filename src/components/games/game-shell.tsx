"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import { FeedbackLine } from "@/components/feedback/feedback-line";
import type { Why } from "@/lib/why";
import { AnimatePresence, motion } from "framer-motion";
import { Mascot } from "@/components/mascot";
import { useStill } from "@/lib/use-still";
import { holdRound } from "@/lib/mascot-hold";
import { claimStage, releaseStage } from "@/lib/mascot-stage";
import { preloadClips } from "@/lib/mascot-clips";
import { useClipUrl } from "@/lib/mascot-clips";
import { useT } from "@/lib/i18n/client";

/**
 * Her oyunun ortak çerçevesi.
 *
 * Giriş/çıkış animasyonu üstteki tur sarmalayıcısına aittir; burada tekrar
 * animasyon yapılmaz, yoksa iki hareket üst üste binip titrek görünür.
 *
 * ## Ekran üç bölge
 *
 * Telefonda kart bir bütün olarak dikey ortalanıyordu ve bu tek elle
 * oynanamıyordu: başparmağın rahat ulaştığı yer ekranın alt yarısıyken
 * şıklar tam ortada duruyor, üsttekilere uzanmak için elin kayması ya da
 * ikinci el gerekiyordu. Çözüm kartı aşağı ötelemek DEĞİL — o yalnızca aynı
 * yığını başka bir yere taşır. Ekran işlevine göre bölünüyor:
 *
 *   OKUMA (üstte)    — oyun etiketi, soru, ipucu. Gözün gittiği yer;
 *                      cevaplarken elin altında kalmamalı.
 *   DOKUNMA (ortada) — şıklar, girdi, butonlar. Başparmağın alanı.
 *   SONUÇ (dipte)    — cevaptan sonraki geri bildirim şeridi.
 *
 * ## Sonuç şeridi neden ayrı bir bölge
 *
 * Geri bildirim daha önce her oyunun kendi içinde, şıkların altında, küçük
 * gri bir satırdı ve her oyunda ayrı yazılmıştı. Üç sorunu vardı: turun en
 * önemli anı (yanlış bildiğini öğrenmek) ekranın en zayıf tipografisine
 * düşüyordu; satır belirince şıkların zıplamaması için her oyun kendi
 * boşluğunu ayırıyordu, yani ekranın dibinde kalıcı bir ölü alan vardı; ve
 * on bir oyunda on bir farklı biçim çıkmıştı.
 *
 * Şerit o alanı işlevlendiriyor: yer zaten rezerveydi, artık dolduruluyor.
 * Renk cevabın kendisini anlatıyor, ikon renk körlüğünde de okunuyor, konum
 * sabit — öğrenci sonucu nereye bakacağını biliyor. Şeridin kendisine
 * dokunulmuyor; tur sesin bitişiyle kendiliğinden ilerliyor.
 *
 * ## Boşluk
 *
 * Artan boşluk üç yere dağılıyor, ikisinin TAVANI var: iki bölge arası en çok
 * 7rem, dokunma bölgesiyle şerit arası en çok 2rem, artan ne varsa okuma
 * bölgesinin üstünde toplanıyor. Tavanlar meselenin can alıcı yeri — boşluğu
 * sadece oranlayıp bırakmak, tek kelimelik bir soruda soruyla şıklar arasında
 * 250 pikselden fazla ölü alan bırakıyordu.
 *
 * Şıkların yüksekliğini belirleyen tek şeyin ALT pay olduğuna dikkat: üstteki
 * ve aradaki payı değiştirmek yalnızca sorunun yerini oynatıyor. Bu yüzden
 * ulaşım alt payla, görsel denge ara payla ayarlanıyor.
 *
 * Boşluk azaldıkça üç pay da birlikte küçülüyor; hiç boşluk kalmadığında
 * ikisi sıfırlanıp yalnızca aradaki en az pay (`min-h-5`) kalıyor — yani
 * sıkışık ekranda düzen eski hâline dönüyor ve dar telefonda bir piksel bile
 * israf edilmiyor.
 *
 * `md`den itibaren (tablet/masaüstü) bölge ayrımı kapanıyor: orada ulaşım
 * diye bir sorun yok, imleç her yere aynı uzaklıkta ve ikiye bölünmüş bir
 * kart yalnızca dağınık görünürdü. Kart yine tek parça ve ortalanmış
 * (bkz. FitBox); şerit orada da kartın altında, aynı yerde.
 */
export function GameShell({
  label,
  prompt,
  hint,
  children,
  footer,
  verdict = null,
  feedback,
  why = null,
  pull = true,
  onContinue,
}: {
  label: string;
  /** Sorunun kendisi. Oyunun içeriği zaten yeterince açıksa boş bırakılabilir. */
  prompt?: ReactNode;
  hint?: ReactNode;
  /** Dokunma bölgesi: şıklar, girdi, butonlar. */
  children: ReactNode;
  footer?: ReactNode;
  /**
   * Cevap verildi mi, verildiyse doğru mu.
   *
   * `null` iken şerit görünmüyor ama yeri duruyor: cevap verilince şıkların
   * zıplaması, dokunulan şıkkın parmağın altından kayması demek olurdu.
   */
  verdict?: "correct" | "wrong" | null;
  /**
   * Yanlışın gerekçesi (WP-13): şeridin ikinci satırı. Yalnız yanlışta ve
   * yalnız oyun bir kural çıkarabildiğinde; doğru cevapta gerekçe yok.
   */
  why?: Why | null;
  /** Şeritte yazacak olan: doğru karşılık, anlam, düzeltme. */
  feedback?: ReactNode;
  /** Erdi'nin şeridi çekerek getirme koreografisi bu oyunda olabilir mi. */
  pull?: boolean;
  /**
   * "Devam" — cevaptan sonra turu KULLANICI kapatır.
   *
   * Tur eskiden kendiliğinden ilerliyordu: doğruda 620 ms, yanlışta 1200 ms
   * ya da okumanın süresi. Bu, düzeltmeyi ve gerekçeyi okumaya yetmiyordu ve
   * kararı öğrencinin elinden alıyordu — hoparlöre basıp tekrar dinlemek de
   * mümkün değildi, tur çoktan geçmiş oluyordu. Mobilde şeridin altında sabit
   * bir "Devam" var (`rounds.tsx` › `FeedbackFooter`) ve karar öğrencinin.
   */
  onContinue?: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:block">
      {/* SORU KARTI — mobil `rounds.tsx` › `Prompt` ile aynı: kendi yüzeyi,
          kenarlığı ve gölgesi var. Önce etiket dolgulu bir çipti ve soru
          sayfa zemininde duruyordu; okuma bölgesinin nerede bittiği yalnızca
          boşluktan anlaşılıyordu. */}
      <div className="card px-4 py-6 text-center">
        <span className="muted text-micro uppercase tracking-widest">{label}</span>
        {prompt ? <div className="mt-1.5 text-lg font-medium sm:text-xl">{prompt}</div> : null}
        {hint ? <div className="muted mt-1 text-sm">{hint}</div> : null}
      </div>

      {/*
        İki bölge arası — boşluğu Erdi dolduruyor (mobil `MascotMid`).
        Cevaptan sonra gizleniyor ama YERİNİ koruyor: şıklar zıplamasın.

        ARTAN BOŞLUK BURADA TOPLANIYOR, sorunun ÜSTÜNDE değil. Önce üstteydi
        ve uzun ekranda soru kartı dibe çöküyordu; mobilde soru en üstte kalır,
        esneyen tek yer bu orta bölge (`MascotMid`, `flex: 1`). Ulaşım
        meselesini de artık dipteki aksiyon alanı çözüyor: şıklar ve "Devam"
        zaten başparmağın yanında.
      */}
      <div aria-hidden={verdict != null} className="flex min-h-5 grow items-center justify-center md:hidden">
        {verdict == null ? <Mascot mood="idle" size={72} /> : null}
      </div>

      <div className="md:mt-5">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}

      {/* Dokunma bölgesiyle şerit arasındaki pay. En az sınırı yok: sıkışık
          ekranda tamamen kapanıp yeri içeriğe bırakıyor. */}
      <div aria-hidden className="max-h-8 grow md:hidden" />

      {/* AKSİYON ALANI — şerit ve "Devam" birlikte, ekranın dibinde. Mobilde
          de öyle (`RoundShell` footer'ı): başparmağın ulaştığı yer burası ve
          turu kapatan düğme oraya ait. */}
      <VerdictBar verdict={verdict} feedback={feedback} why={verdict === "wrong" ? why : null} pull={pull} />
      {verdict && onContinue ? <ContinueButton verdict={verdict} onContinue={onContinue} /> : null}
    </div>
  );
}

/**
 * Turu kapatan düğme.
 *
 * Rengi sonucu tekrarlıyor (doğruda nane, yanlışta marka) — şeridin rengiyle
 * aynı dili konuşuyor. Enter ve boşluk da çalışıyor: klavyeyle oynayan
 * kullanıcı her turda fareye uzanmak zorunda kalmasın.
 */
function ContinueButton({ verdict, onContinue }: { verdict: "correct" | "wrong"; onContinue: () => void }) {
  const t = useT();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      // Yazma turlarında girdi hâlâ odaktaysa boşluk metne gitmeli.
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      e.preventDefault();
      onContinue();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue]);

  return (
    <motion.button
      type="button"
      autoFocus
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onContinue}
      className="btn mt-2 w-full py-3.5 text-white"
      style={{
        background: verdict === "correct" ? "var(--color-mint-600)" : "var(--color-brand-500)",
        boxShadow: "var(--shadow-soft-sm)",
      }}
    >
      {t("common.continue")}
    </motion.button>
  );
}

/**
 * Sonuç şeridi.
 *
 * Yer her zaman ayrılmış (`min-h-16`), içerik yalnızca cevaptan sonra geliyor.
 * Yükseklik bir ALT sınır olduğu için iki satırlık bir düzeltme de sığıyor;
 * daha uzun ek bilgiler (örnek cümle gibi) bilerek şeride konmuyor — şerit
 * tek bakışta okunan bir cevap, bir metin bloğu değil.
 */
/** Şeridin sürüklenerek gelme süresi ve mirketin ardından oyalanıp kaybolma payı (ms). */
const PULL_MS = 2600;
const PULL_LINGER_MS = 900;

function VerdictBar({
  verdict,
  feedback,
  why,
  pull,
}: {
  verdict: "correct" | "wrong" | null;
  feedback?: ReactNode;
  why: Why | null;
  pull: boolean;
}) {
  const still = useStill();

  /*
    Şeridin klipleri, şerit GÖRÜNMEDEN indiriliyor.

    Cevap verildiği ana kadar beklenirse geç kalıyor: thumbsup 1,3 MB, sad
    1,1 MB ve şerit doğru cevapta yalnızca 900 ms açık kalıyor. Yavaş bir
    bağlantıda ilk cevaplarda kutunun içi boş görünüyordu — öğe yerinde,
    yeri ayrılmış, ama klip henüz çözülmemiş.

    Burada tetiklemenin sebebi yer: şeridi kim kullanıyorsa klipleri de o
    kullanacak, yani hiçbir oyun bunu ayrıca hatırlamak zorunda kalmıyor.
    Aynı dosya iki kez indirilmiyor (bkz. lib/mascot-clips).
  */
  useEffect(() => {
    preloadClips(["thumbsup", "sad"]);
  }, []);

  /*
    Arada bir (her seferinde DEĞİL — sürpriz sık tekrar edince gürültü olur)
    şeridi Erdi'nin kendisi sağdan sürükleyerek getiriyor. Kliplerdeki
    duruş: pull-left sağa dönük, geri geri sola yürüyor, sağındaki şeridi
    çekiyor — yani şeridin solunda durur. İtme koreografisi denendi ve
    inandırıcı olmadı; yalnız çekme kaldı.

    Koreografi ağır çekimde (2.6 sn) ki çekme hissi okunsun; tur bu sürede
    kapanmasın diye şerit kurulurken kapanış saati ileri alınıyor
    (lib/mascot-hold) — ilk sürümde tur, mirket daha şeridi getirmeden
    ilerliyor, animasyon yarıda kesiliyordu. Zar, şerit her yeniden
    kurulduğunda bir kez atılır.
  */
  /* "right": şerit sağdan gelir, mirket solunda (pull-left: sağa dönük, geri
     geri sola yürür). "left": şerit soldan gelir, mirket sağında (pull-right:
     sola dönük, geri geri sağa yürür). İki yön de eşit olasılıkta. */
  const fx = useMemo<"right" | "left" | null>(() => {
    if (!verdict || still || !pull) return null;
    if (Math.random() >= 0.25) return null;
    // Erdi başka yerdeyse (altta yürüyor, köşede kutluyor) şeridi getiremez.
    if (!claimStage("pull", PULL_MS + PULL_LINGER_MS)) return null;
    return Math.random() < 0.5 ? "right" : "left";
  }, [verdict, still, pull]);

  useEffect(() => {
    if (!fx) return;
    holdRound(PULL_MS + PULL_LINGER_MS);
    return () => releaseStage("pull");
  }, [fx]);
  const pullUrl = useClipUrl(fx ? (fx === "right" ? "pull-left" : "pull-right") : null);

  // Şerit yalnızca söyleyecek sözü olan oyunlarda var. Eşleştirme ve tanıtım
  // kartında cevaptan sonra gösterilecek bir düzeltme yok; orada boş bir şerit
  // ekranın dibinde 80 piksel ölü alan demek olurdu.
  if (!feedback) return null;

  return (
    /* overflow-hidden: koreografide şerit ve mirket kenardan girip çıkıyor;
       taşan kısım sayfaya yatay kaydırma çubuğu açmasın. */
    <div className="mt-4 min-h-[4.5rem] shrink-0 overflow-hidden">
      <AnimatePresence initial={false}>
        {verdict ? (
          <motion.div
            key={verdict}
            initial={fx ? { x: fx === "right" ? "110%" : "-110%", opacity: 1 } : { opacity: 0, y: 10 }}
            animate={fx ? { x: 0, opacity: 1 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={
              fx
                ? { duration: PULL_MS / 1000, ease: "easeInOut" }
                : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
            className={`verdict relative flex min-h-[4.5rem] items-center gap-1 py-1 pl-1 pr-4 text-left text-sm font-semibold ${
              verdict === "correct" ? "verdict-correct" : "verdict-wrong"
            }`}
          >
            {fx && pullUrl && (
              /* Şeridi çekerek getiren Erdi — şeridin geldiği kenarın karşı
                 tarafında, şeritle birlikte kayar; şerit oturunca işini
                 bitirip kaybolur. Boy şeridi aşıyor (70px): sürükleyen
                 karakter şeridin içindeki simgeden büyük olmalı ki
                 "getiren" o olsun. */
              <motion.img
                src={pullUrl}
                alt=""
                aria-hidden
                draggable={false}
                className="pointer-events-none absolute -bottom-1 w-auto"
                style={{ height: 70, ...(fx === "right" ? { left: -76 } : { right: -76 }) }}
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0] }}
                transition={{
                  duration: (PULL_MS + PULL_LINGER_MS) / 1000,
                  times: [0, PULL_MS / (PULL_MS + PULL_LINGER_MS), 1],
                }}
              />
            )}
            {/*
              Şeritteki tepki bir onay/çarpı simgesi değil, Erdi'nin kendisi.
              Simge yalnızca "doğru" ya da "yanlış" diyor; renk ve metin zaten
              onu söylüyordu. Karakterin yüzü ise turun duygusunu taşıyor ve
              her turda tekrar eden bu an, uygulamanın en çok görülen anı.

              Şeride tam oturuyor, taşmıyor ve şeridi BÜYÜTMÜYOR: mirket dik
              duran bir hayvan, yani çizim geniş değil uzun. 54 pikselde şerit
              en az yüksekliğini 9 piksel aşıyor ve dokunma bölgesini yukarı
              itiyordu; 48'de şeridin içinde kalıyor.

              Taşırmak da denendi ve yanlıştı: karakter şeridin ALTINDAN
              çıkıyor, kutudan fırlamış değil kutuya sığmamış gibi duruyordu.
            */}
            <motion.span
              initial={{ scale: 0.4, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.04 }}
              className="shrink-0"
            >
              {/* `pinned`: cevabın kendisi — yürüyüş, çekme ya da kutlama sürerken de görünür. */}
              <Mascot mood={verdict === "correct" ? "thumbsup" : "sad"} size={48} pinned />
            </motion.span>
            {/* Gerekçe ikinci satır: şerit en az yüksekliğini korur, uzun
                gerekçe küçük yazıyla sarar. Cevap satırı hep önde: önce NE,
                sonra NEDEN. */}
            <div className="min-w-0">
              {feedback}
              {why ? <FeedbackLine why={why} compact /> : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
