"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FeedbackLine } from "@/components/feedback/feedback-line";
import { Mascot } from "@/components/mascot";
import { useStill } from "@/lib/use-still";
import { holdRound } from "@/lib/mascot-hold";
import { claimStage, releaseStage } from "@/lib/mascot-stage";
import { preloadClips, useClipUrl } from "@/lib/mascot-clips";
import { useT } from "@/lib/i18n/client";
import type { Why } from "@/lib/why";

/**
 * Cevaptan sonra ALTTAN çıkan sonuç katmanı.
 *
 * ## Neden ayrı bir katman
 *
 * Şerit ve "Devam" daha önce kartın akışının içindeydi: cevap verilince
 * "Devam" beliriyor, kart uzuyor ve esneyen boşluklar küçülüyordu — yani
 * şıklar cevap verildiği anda YUKARI kayıyordu. Kayma turun en kritik
 * anında oluyor: öğrenci hangi şıkkı işaretlediğine bakarken şıklar yer
 * değiştiriyor, dokunulan şık parmağın altından kaçıyor.
 *
 * Katman bunu kökten çözüyor: sonuç artık içeriğin ÜSTÜNE, ayrı bir yığın
 * düzleminde biniyor. Alttaki hiçbir şey kımıldamıyor.
 *
 * ## Yeri neden baştan ayrılıyor
 *
 * Katman içeriği örtmüyor: kabuk (bkz. game-shell) katmanın kaplayacağı
 * kadar boşluğu turun BAŞINDAN itibaren dipte tutuyor. Yani şıklar cevaptan
 * önce de sonra da tam olarak aynı yerde duruyor ve katman o boş banda
 * oturuyor. Ayrılan ölçü ile katmanın en az yüksekliği aynı değişkenden
 * (`--round-sheet-h`) okunuyor; ikisi ayrı yazılsaydı biri değişince öbürü
 * sessizce kayardı.
 *
 * Gerekçe uzun bir yanlışta katman bandı birkaç piksel aşabiliyor. Bilerek:
 * o an ekranda okunması gereken şey zaten katmanın kendisi.
 *
 * ## Nereye çiziliyor
 *
 * Kabuğun sütununa (`#round-sheet-host`) porta ile. `position: fixed` işe
 * yaramıyor: oyun kartı FitBox'ın ölçek dönüşümünün ve tur geçişinin kayma
 * animasyonunun içinde: dönüşümlü bir ata varken `fixed` ekrana değil o
 * ataya göre konumlanır. Porta ağacın o kısmından tamamen çıkıyor.
 *
 * Sütuna çizilmesinin ikinci sebebi masaüstü: orada kabuk solda 240 piksel
 * kenar çubuğu tutuyor, ekrana göre ortalanan bir katman kartla hizasız
 * kalırdı. Sütun neyse katman da o.
 */

/** Şerit + "Devam"ın kapladığı en az yükseklik. */
const BODY_FULL = "8.125rem"; /* 4.5rem şerit + 0.5rem ara + 3.125rem düğme */
/** Yalnız "Devam" — söyleyecek sözü olmayan turlarda (eşleştirme). */
const BODY_ACTION = "3.125rem";

/** Katmanın dipte kaplayacağı toplam yükseklik: gövde + kendi iç payı. */
export function roundSheetHeight(hasFeedback: boolean): string {
  return `calc(${hasFeedback ? BODY_FULL : BODY_ACTION} + 0.75rem + max(0.75rem, var(--safe-b, 0px)))`;
}

/**
 * Katmanın çizileceği kap.
 *
 * Normalde kabuğun sütunundaki kap (`#round-sheet-host`). Bulunamazsa gövdeye
 * düşülüyor: turun kabuk dışında çizildiği bir yer bugün yok, ama olsaydı
 * katman hiç çizilmez ve turu kapatan "Devam" ekranda olmazdı — öğrenci turda
 * kilitli kalırdı. Yedek yolda konum ekrana göre (`fixed`), çünkü gövdenin
 * dibi düzen alanının dibi değil.
 */
function useSheetHost(): { host: HTMLElement | null; fixed: boolean } {
  const [state, setState] = useState<{ host: HTMLElement | null; fixed: boolean }>({
    host: null,
    fixed: false,
  });
  useEffect(() => {
    const anchored = document.getElementById("round-sheet-host");
    setState(anchored ? { host: anchored, fixed: false } : { host: document.body, fixed: true });
  }, []);
  return state;
}

export function RoundSheet({
  verdict,
  feedback,
  why,
  pull,
  onContinue,
}: {
  verdict: "correct" | "wrong" | null;
  feedback?: ReactNode;
  why: Why | null;
  pull: boolean;
  onContinue?: () => void;
}) {
  const { host, fixed } = useSheetHost();
  const still = useStill();
  const open = verdict != null && (Boolean(feedback) || Boolean(onContinue));

  /*
    Katmanın klipleri, katman GÖRÜNMEDEN indiriliyor.

    Cevap verildiği ana kadar beklenirse geç kalıyor: thumbsup 1,3 MB, sad
    1,1 MB. Yavaş bir bağlantıda ilk cevaplarda kutunun içi boş görünüyordu —
    öğe yerinde, yeri ayrılmış, ama klip henüz çözülmemiş.

    Burada tetiklemenin sebebi yer: katmanı kim kullanıyorsa klipleri de o
    kullanacak, yani hiçbir oyun bunu ayrıca hatırlamak zorunda kalmıyor.
    Aynı dosya iki kez indirilmiyor (bkz. lib/mascot-clips).
  */
  useEffect(() => {
    preloadClips(["thumbsup", "sad"]);
  }, []);

  if (!host) return null;

  return createPortal(
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="round-sheet"
          /* Hareket azaltma tercihinde kayma yok: katman olduğu yerde beliriyor. */
          initial={still ? { opacity: 0 } : { y: "101%" }}
          animate={still ? { opacity: 1 } : { y: 0 }}
          exit={still ? { opacity: 0 } : { y: "101%" }}
          transition={
            still
              ? { duration: 0.12 }
              : /* Yay, süre değil: katman aşağıdan gelirken sonda hafifçe
                   yavaşlıyor — bir nesnenin yerine oturması gibi. Sıçrama
                   yok (damping yüksek): her turda tekrar eden bir hareket. */
                { type: "spring", stiffness: 460, damping: 42, mass: 0.9 }
          }
          className={`round-sheet pointer-events-auto safe-bottom z-40 overflow-hidden px-4 pt-3 md:px-8 ${
            fixed ? "fixed inset-x-0 bottom-0" : ""
          }`}
          style={{ borderTopColor: verdict === "correct" ? "var(--color-mint)" : "var(--color-rose)" }}
        >
          {/* Genişlik kartla aynı (`max-w-md`): katman ekranın dibinde ayrı bir
              yüzey ama içindeki metin ve düğme kartın kolonunda kalıyor. */}
          <div
            className="mx-auto flex w-full max-w-md flex-col gap-2"
            style={{ minHeight: feedback ? BODY_FULL : BODY_ACTION }}
          >
            {feedback ? (
              <VerdictBar verdict={verdict} feedback={feedback} why={verdict === "wrong" ? why : null} pull={pull} />
            ) : null}
            {onContinue ? <ContinueButton verdict={verdict} onContinue={onContinue} /> : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    host,
  );
}

/**
 * Turu kapatan düğme.
 *
 * Rengi sonucu tekrarlıyor (doğruda nane, yanlışta marka) — şeridin rengiyle
 * aynı dili konuşuyor. Enter ve boşluk da çalışıyor: klavyeyle oynayan
 * kullanıcı her turda fareye uzanmak zorunda kalmasın.
 */
function ContinueButton({ verdict, onContinue }: { verdict: "correct" | "wrong" | null; onContinue: () => void }) {
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
    <button
      type="button"
      autoFocus
      onClick={onContinue}
      className="btn glow-tint-sm w-full py-3.5 text-white"
      /* Android `rounds` devam düğmesi: `softShadow(ok ? success : primary, 8)`
         - gölge düğmenin kendi rengi. */
      style={{
        background: verdict === "wrong" ? "var(--color-brand-500)" : "var(--color-mint-600)",
        "--tint-fill": verdict === "wrong" ? "var(--color-brand-500)" : "var(--color-mint-600)",
      } as React.CSSProperties}
    >
      {t("common.continue")}
    </button>
  );
}

/** Şeridin sürüklenerek gelme süresi ve mirketin ardından oyalanıp kaybolma payı (ms). */
const PULL_MS = 2600;
const PULL_LINGER_MS = 900;

/**
 * Sonuç şeridi — katmanın içindeki renkli kutu.
 *
 * Renk cevabın kendisini anlatıyor, karakterin yüzü turun duygusunu taşıyor,
 * konum sabit. Şerit tek bakışta okunan bir cevap, bir metin bloğu değil:
 * daha uzun ek bilgiler (örnek cümle gibi) bilerek buraya konmuyor.
 */
function VerdictBar({
  verdict,
  feedback,
  why,
  pull,
}: {
  verdict: "correct" | "wrong" | null;
  feedback: ReactNode;
  why: Why | null;
  pull: boolean;
}) {
  const still = useStill();

  /*
    Arada bir (her seferinde DEĞİL — sürpriz sık tekrar edince gürültü olur)
    şeridi Erdi'nin kendisi sağdan sürükleyerek getiriyor. Kliplerdeki
    duruş: pull-left sağa dönük, geri geri sola yürüyor, sağındaki şeridi
    çekiyor — yani şeridin solunda durur. İtme koreografisi denendi ve
    inandırıcı olmadı; yalnız çekme kaldı.

    Katman aşağıdan gelirken şerit yandan geliyor: iki hareket birbirini
    örtmüyor, çünkü katman 0,3 saniyede oturuyor, çekme ağır çekimde
    (2,6 sn) sürüyor. Tur bu sürede kapanmasın diye şerit kurulurken kapanış
    saati ileri alınıyor (lib/mascot-hold). Zar, şerit her yeniden kurulduğunda
    bir kez atılır.
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

  return (
    <motion.div
      /* Ekran okuyucu sonucu duyurur: renk ve ikon yalnız görene bir şey söyler. */
      role="status"
      aria-live="polite"
      initial={fx ? { x: fx === "right" ? "110%" : "-110%" } : false}
      animate={fx ? { x: 0 } : undefined}
      transition={fx ? { duration: PULL_MS / 1000, ease: "easeInOut" } : undefined}
      className={`verdict relative flex min-h-[4.5rem] flex-1 items-center gap-1 py-1 pl-1 pr-4 text-left text-strong ${
        verdict === "correct" ? "verdict-correct" : "verdict-wrong"
      }`}
    >
      {fx && pullUrl && (
        /* Şeridi çekerek getiren Erdi — şeridin geldiği kenarın karşı
           tarafında, şeritle birlikte kayar; şerit oturunca işini bitirip
           kaybolur. Boy şeridi aşıyor (70px): sürükleyen karakter şeridin
           içindeki simgeden büyük olmalı ki "getiren" o olsun. */
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
        Simge yalnızca "doğru" ya da "yanlış" diyor; renk ve metin zaten onu
        söylüyordu. Karakterin yüzü ise turun duygusunu taşıyor ve her turda
        tekrar eden bu an, uygulamanın en çok görülen anı.

        Şeride tam oturuyor, taşmıyor ve şeridi BÜYÜTMÜYOR: mirket dik duran
        bir hayvan, yani çizim geniş değil uzun. 54 pikselde şerit en az
        yüksekliğini 9 piksel aşıyordu; 48'de içinde kalıyor.
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
      {/* Gerekçe ikinci satır: şerit en az yüksekliğini korur, uzun gerekçe
          küçük yazıyla sarar. Cevap satırı hep önde: önce NE, sonra NEDEN. */}
      <div className="min-w-0">
        {feedback}
        {why ? <FeedbackLine why={why} compact /> : null}
      </div>
    </motion.div>
  );
}
