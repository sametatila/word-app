"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RuleLink } from "@/components/feedback/feedback-line";
import { CharMarked, Chip, DiffLines, MarkedSentence, type MarkedToken } from "@/components/feedback/marked";
import { CheckIcon, XIcon } from "@/components/icons";
import { SpeakButton } from "@/components/speak-button";
import { useCourse } from "@/components/app-shell";
import { useStill } from "@/lib/use-still";
import { useLang, useT } from "@/lib/i18n/client";
import { whyLabel, type Why } from "@/lib/why";

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

/** Hüküm bandı + "Devam"ın kapladığı en az yükseklik. */
const BODY_FULL = "7.375rem"; /* 3.75rem band + 0.5rem ara + 3.125rem düğme */
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

/**
 * Katmanın verisi — mobil `game/rounds` `Feedback` ile AYNI alanlar, aynı sıra.
 *
 * Katman satır satır okunuyor: hüküm → doğru cevap → anlamı (→ dil bilgisi) →
 * yanlışsa "Senin", "Farklar", "Neden" → Devam. Eskiden her oyun şeride kendi
 * serbest düğümünü veriyordu: hüküm, cevap ve anlam tek satırda "·" ile
 * birbirine ekleniyordu, satır sarınca "·" yeni satırın başına düşüyor, çeviri
 * turunda "Doğrusu:" iki kez yazıyor ve farklar yalnız "↔" ile anlatılıyordu.
 * Artık oyun yalnız VERİYİ veriyor, düzen tek yerde.
 */
export type SheetTone = "ok" | "bad" | "near" | "neutral";

export type SheetData = {
  correct: boolean;
  /** Katmanın tonu; verilmezse doğru/yanlıştan. "near" = kabul edildi ama kusurlu. */
  tone?: SheetTone;
  /** Hüküm metni; verilmezse "Doğru" / "Yanlış". */
  label?: string;
  /** Doğru cevap (düz). */
  answer?: string | null;
  /** Doğru cevap, kelime kelime işaretli (cümle hakemi) — `answer`ın yerine çizilir. */
  answerTokens?: MarkedToken[] | null;
  /** İşaretli cevabın cümle sonu noktalaması. */
  answerTail?: string;
  /** Hoparlörün okuyacağı metin; yoksa `answer`. */
  speak?: string | null;
  /** Anlamı (anadilde). */
  meaning?: string | null;
  /** Dil bilgisi satırı (tür, çoğul, çekim) — cevap verildikten sonra pekiştirme. */
  detail?: string | null;
  /** Öğrencinin cevabı (yalnız yanlışta gösterilir). */
  you?: string | null;
  youTokens?: MarkedToken[] | null;
  /** Kelime kelime fark listesi için hedef ve yazılan (cümle hakemi). */
  diffs?: { target: MarkedToken[]; typed: MarkedToken[] } | null;
  /** Neden — hata tipi etiketi + tek cümle (+ yazımda harf farkı). */
  why?: Why | null;
  /** Hüküm bandının altına eklenen serbest satır (eşleştirme özeti gibi). */
  extra?: ReactNode;
};

/**
 * Tonun renkleri. Mürekkep rol takma adı (açık temada 600, koyuda 300) —
 * mobil `*Text`; zemin ailenin 500'ü %14 — mobil `*Soft`/`soft()`. Nokta
 * mürekkeple aynı dolgu, üstündeki glif `--on-fill` (açıkta beyaz, koyuda
 * mürekkep): sabit beyaz koyu temada açık yeşil üstünde okunmuyordu.
 */
const TONES: Record<SheetTone, { ink: string; fill: string | null; dot: string }> = {
  ok: { ink: "var(--color-mint)", fill: "var(--color-mint-500)", dot: "var(--color-mint)" },
  bad: { ink: "var(--color-rose)", fill: "var(--color-rose-500)", dot: "var(--color-rose)" },
  near: { ink: "var(--color-flame)", fill: "var(--color-flame-500)", dot: "var(--color-flame)" },
  neutral: { ink: "var(--text)", fill: null, dot: "var(--text-muted)" },
};

export function sheetTone(data: SheetData): SheetTone {
  return data.tone ?? (data.correct ? "ok" : "bad");
}

export function RoundSheet({
  sheet,
  onContinue,
}: {
  /** Cevaptan sonraki katman verisi. `null` iken katman kapalı. */
  sheet: SheetData | null;
  onContinue?: () => void;
}) {
  const { host, fixed } = useSheetHost();
  const still = useStill();
  const open = sheet != null;
  const tone = sheet ? sheetTone(sheet) : "ok";


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
          style={{ borderTopColor: TONES[tone].dot }}
        >
          {/* Genişlik kartla aynı (`max-w-md`): katman ekranın dibinde ayrı bir
              yüzey ama içindeki metin ve düğme kartın kolonunda kalıyor. */}
          <div className="mx-auto flex w-full max-w-md flex-col gap-2" style={{ minHeight: BODY_FULL }}>
            <SheetBody data={sheet} />
            {onContinue ? <ContinueButton tone={tone} onContinue={onContinue} /> : null}
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
 * Rengi sonucu tekrarlıyor: yanlışta marka, doğruda (ve "neredeyse", nötr)
 * koyu yeşil. Açık temada nane 600 + beyaz (5,3:1; eski nane 500 üstünde
 * beyaz 3,4 idi), koyu temada nane 300 + mürekkep — `--color-mint` ile
 * `--on-fill` temayla birlikte dönüyor. Mobil `FeedbackFooter` aynı çift:
 * `isDark ? success : successText` + `onFill`. Enter ve boşluk da çalışıyor:
 * klavyeyle oynayan kullanıcı her turda fareye uzanmak zorunda kalmasın.
 */
function ContinueButton({ tone, onContinue }: { tone: SheetTone; onContinue: () => void }) {
  const t = useT();
  const continueRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      // Yazma turlarında girdi hâlâ odaktaysa boşluk metne gitmeli.
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      // Katmanın İÇİNDEKİ başka bir denetim (hoparlör, "Ayrıntıları gör",
      // "Kural ↗") odaktaysa Enter onun işini yapsın, turu kapatmasın.
      if (el instanceof HTMLElement && el !== continueRef.current && el.closest(".round-sheet") && el.matches("button, a")) return;
      e.preventDefault();
      onContinue();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue]);

  const fill = tone === "bad" ? "var(--brand-fill)" : "var(--color-mint)";
  return (
    <button
      type="button"
      ref={continueRef}
      autoFocus
      onClick={onContinue}
      className="btn glow-tint-sm w-full py-4 text-h3"
      /* Android `rounds` devam düğmesi: `softShadow(btnBg, 8)` - gölge
         düğmenin kendi rengi. */
      style={{
        background: fill,
        color: tone === "bad" ? "var(--on-brand)" : "var(--on-fill)",
        "--tint-fill": fill,
      } as CSSProperties}
    >
      {t("common.continue")}
    </button>
  );
}

/** Şeridin sürüklenerek gelme süresi ve mirketin ardından oyalanıp kaybolma payı (ms). */

/**
 * Katmanın gövdesi — hüküm bandı + etiketli satırlar.
 *
 * Band hükmün tonunda (500 %14 zemin, rol takma adı yazı), satırlar nötr.
 * Uzun bir yanlışta katman ekranın yarısını aşmasın diye gövde kendi içinde
 * kayıyor; "Devam" hep görünür kalıyor. Mobil `FeedbackFooter` aynı alanları
 * aynı sırayla çiziyor.
 */
function SheetBody({ data }: { data: SheetData }) {
  const t = useT();
  const lang = useLang();
  const course = useCourse();
  const tone = sheetTone(data);
  const palette = TONES[tone];
  const label = data.label ?? t(data.correct ? "sheet.correct" : "sheet.wrong");
  const speakText = data.speak ?? data.answer ?? "";
  const wrong = !data.correct;
  const showYou = wrong && Boolean(data.youTokens?.length || data.you);
  const showDiffs =
    !!data.diffs && (data.diffs.target.some((k) => k.mark !== "same") || data.diffs.typed.some((k) => k.mark === "extra"));
  const showWhy = wrong && !!data.why;

  /* ÇEKME KOREOGRAFİSİ KALDIRILDI (2026-09-22). Şeridi Nomi sürükleyerek
     getiriyordu (`pull-left`/`pull-right` klipleri, sahne kilidi ve
     `holdRound` ile tur kapanışını bekletme). Maskot artık yalnız Öğren
     ekranının günlük tur kutusunda; sürükleyen olmayınca kayarak giren bir
     şeridin de sebebi kalmadı, şerit olduğu yerde beliriyor. */

  return (
    <motion.div
      /* Ekran okuyucu sonucu duyurur: renk ve simge yalnız görene bir şey söyler. */
      role="status"
      aria-live="polite"
      className="relative text-left"
    >
      <div className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div
          className="verdict flex min-h-[3.75rem] items-start gap-2 p-2"
          style={{
            background: palette.fill ? `color-mix(in srgb, ${palette.fill} 14%, var(--surface))` : "var(--surface-2)",
          }}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full"
                style={{ background: palette.dot, color: "var(--on-fill)" }}
              >
                {tone === "bad" ? <XIcon size={12} strokeWidth={3} /> : <CheckIcon size={12} strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1 text-strong" style={{ color: palette.ink }}>
                {label}
              </span>
              {speakText ? <SpeakButton word text={speakText} size="sm" /> : null}
            </div>
            {data.answerTokens?.length ? (
              <span className="text-h3">
                <MarkedSentence tokens={data.answerTokens} tail={data.answerTail ?? ""} lang={course} />
              </span>
            ) : data.why?.diff && wrong ? (
              <span className="text-h3">
                <CharMarked segs={data.why.diff.target} side="target" lang={course} />
              </span>
            ) : data.answer ? (
              <span className="text-h3" lang={course} style={{ color: "var(--text)" }}>
                {data.answer}
              </span>
            ) : null}
            {data.meaning ? <span className="muted text-body">{data.meaning}</span> : null}
            {data.detail ? <span className="muted text-caption">{data.detail}</span> : null}
            {data.extra}
          </div>
        </div>
        {showYou || showDiffs || showWhy ? (
          <div className="flex flex-col gap-1.5 px-1 pb-0.5">
            {showYou ? (
              <SheetRow label={t("sheet.you")}>
                {data.youTokens?.length ? (
                  <span className="text-body">
                    <MarkedSentence tokens={data.youTokens} strong={false} lang={course} />
                  </span>
                ) : data.why?.diff ? (
                  <span className="text-body">
                    <CharMarked segs={data.why.diff.typed} side="typed" lang={course} />
                  </span>
                ) : (
                  <span className="muted text-body" lang={course}>
                    {data.you}
                  </span>
                )}
              </SheetRow>
            ) : null}
            {showDiffs && data.diffs ? (
              <SheetRow label={t("sheet.diffs")}>
                <DiffLines target={data.diffs.target} typed={data.diffs.typed} />
              </SheetRow>
            ) : null}
            {showWhy && data.why ? (
              <SheetRow label={t("sheet.why")}>
                <span className="flex items-start gap-1.5">
                  <Chip label={whyLabel(data.why.type, lang)} />
                  <span className="min-w-0 flex-1 text-caption" style={{ color: "var(--text)" }}>
                    {data.why.text}
                    <RuleLink why={data.why} />
                  </span>
                </span>
              </SheetRow>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

/** Katmanın etiketli satırı: solda küçük büyük harf etiket, sağda içerik. */
function SheetRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="muted w-[3.625rem] shrink-0 break-words pt-0.5 text-micro uppercase tracking-eyebrow">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
