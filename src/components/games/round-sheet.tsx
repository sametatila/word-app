"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RuleLink } from "@/components/feedback/feedback-line";
import { CharMarked, Chip, DiffLines, MarkedSentence, type MarkedToken } from "@/components/feedback/marked";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { ReportFlag, useRoundReport } from "@/components/report-flag";
import { SpeakButton } from "@/components/speak-button";
import { useCourse } from "@/components/app-shell";
import { targetLangOf } from "@/lib/courses";
import { useStill } from "@/lib/use-still";
import { useBlindAnswers } from "./no-hints";
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

/** Kartın en az yüksekliği: hüküm başlığı + cevap satırı + ara + "Devam" + iç pay. */
const BODY_FULL = "9.375rem"; /* 2.5rem başlık + 0.75 + 1.75rem cevap + 0.5 + 3.125rem düğme + 0.75 */
/** Yalnız "Devam" — söyleyecek sözü olmayan turlarda (eşleştirme). */
const BODY_ACTION = "3.125rem";

/** Katmanın dipte kaplayacağı toplam yükseklik: gövde + kendi iç payı. */
export function roundSheetHeight(hasFeedback: boolean): string {
  return `calc(${hasFeedback ? BODY_FULL : BODY_ACTION} + 0.5rem + max(0.75rem, var(--safe-b, 0px)))`;
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
  /**
   * Katmanda zaten bir "Bildir" varsa (serbest cümlede açılan yapay zekâ
   * değerlendirmesinin bağlantısı) içerik bağlantısı çizilmiyor: aynı
   * katmanda iki "Bildir" hangisinin neyi bildirdiğini belirsizleştiriyordu.
   */
  noReport?: boolean;
};

/**
 * Tonun renkleri. Başlık dolgusu rol takma adı (açık temada 600, koyuda 300) —
 * mobil `*Text`; üstündeki yazı `--on-fill` (açıkta beyaz, koyuda mürekkep):
 * sabit beyaz koyu temada açık yeşil üstünde okunmuyordu. Nötr ton (eşleştirme
 * özeti) dolu değil, `--surface-2` üstünde metin rengi.
 */
const TONES: Record<SheetTone, { head: string; ink: string }> = {
  ok: { head: "var(--color-mint)", ink: "var(--on-fill)" },
  bad: { head: "var(--color-rose)", ink: "var(--on-fill)" },
  near: { head: "var(--color-flame)", ink: "var(--on-fill)" },
  neutral: { head: "var(--surface-2)", ink: "var(--text)" },
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
  const report = useRoundReport();
  /* SINAVDA KATMAN YOK (`BlindAnswers`, QA F-0017): sınavın iki oyunu (yazma,
     çeviri) hükmü hiç kurmuyor; başka bir oyun sınava girerse de cevap burada
     gösterilmeden tur kapanıyor. Mobil `FeedbackFooter` aynı. */
  const blind = useBlindAnswers();
  useEffect(() => {
    if (blind && open) onContinue?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blind, open]);

  if (!host || blind) return null;

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
          className={`pointer-events-auto safe-bottom z-40 px-4 pt-2 md:px-8 ${
            fixed ? "fixed inset-x-0 bottom-0" : ""
          }`}
        >
          {/* Yüzen kart, genişliği oyun kartıyla aynı (`max-w-md`): mobil
              `FeedbackFooter` ile aynı düzen — dolu renkli hüküm başlığı,
              nötr gövde, altta "Bildir" + "Devam". */}
          <div className="round-sheet mx-auto flex w-full max-w-md flex-col" style={{ minHeight: BODY_FULL }}>
            <SheetHead data={sheet} />
            <div className="flex flex-1 flex-col gap-2 p-3">
            <SheetBody data={sheet} />
            {onContinue ? (
              /* "⚑ Bildir" Devam'ın SOLUNDA (Duolingo/Babbel düzeni): içerik
                 bildirimi cevaptan sonra, soru ekranında değil. Satır tek
                 sıra; bağlantı daralmıyor, düğme kalan genişliği alıyor
                 (320 px'te ~210 px). Satırın yüksekliği değişmiyor, yani
                 ayrılan pay (`BODY_FULL`) aynı. */
              <div className="flex items-center gap-3">
                {report && !sheet.noReport ? (
                  <ReportFlag
                    surface={report.surface}
                    target={report.target}
                    content={report.content}
                    onOpenChange={report.onOpenChange}
                    className="px-1"
                  />
                ) : null}
                <ContinueButton tone={tone} onContinue={onContinue} />
              </div>
            ) : null}
            </div>
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
      // Bildirim penceresi açıkken tuşlar pencerenin: Enter turu kapatmasın.
      if (document.querySelector("dialog[open]")) return;
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
      className="btn glow-tint-sm w-full min-w-0 flex-1 py-4 text-h3"
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
 * Kartın başlığı — hüküm, sonucun dolu renginde.
 *
 * Maskot kalkınca (2026-09-22) eski düzende iç içe iki kutu (katman + açık
 * tonlu bant) ve 18 px'lik bir nokta kalmıştı; hüküm küçük, katman boş
 * görünüyordu. Samet'in seçimi (2026-09-28, taslak F): hükmü kartın üstündeki
 * dolu şerit söylüyor, gövde nötr.
 */
function SheetHead({ data }: { data: SheetData }) {
  const t = useT();
  const tone = sheetTone(data);
  const palette = TONES[tone];
  const label = data.label ?? t(data.correct ? "sheet.correct" : "sheet.wrong");
  return (
    <div className="flex min-h-[2.5rem] items-center gap-2 px-3 py-2" style={{ background: palette.head, color: palette.ink }}>
      <span
        aria-hidden
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: tone === "neutral" ? "var(--surface)" : "color-mix(in srgb, currentColor 24%, transparent)" }}
      >
        {tone === "bad" ? <CloseIcon size={14} /> : <CheckIcon size={14} />}
      </span>
      <span className="min-w-0 flex-1 text-h3">{label}</span>
    </div>
  );
}

/**
 * Kartın gövdesi — doğru cevap, anlamı, etiketli satırlar.
 *
 * Uzun bir yanlışta kart ekranın yarısını aşmasın diye gövde kendi içinde
 * kayıyor; başlık ve "Devam" hep görünür kalıyor. Mobil `FeedbackFooter` aynı
 * alanları aynı sırayla çiziyor.
 */
function SheetBody({ data }: { data: SheetData }) {
  const t = useT();
  const lang = useLang();
  const course = useCourse();
  const speakText = data.speak ?? data.answer ?? "";
  const wrong = !data.correct;
  /* "Neredeyse" (kabul edildi ama kusurlu) da ne yazıldığını ve nedenini gösteriyor: tek harf
     hatası ya da aynı anlamlı başka kelime (2026-10-07); mobil `FeedbackFooter` aynı. */
  const flawed = wrong || data.tone === "near";
  const showYou = flawed && Boolean(data.youTokens?.length || data.you);
  const showDiffs =
    !!data.diffs && (data.diffs.target.some((k) => k.mark !== "same") || data.diffs.typed.some((k) => k.mark === "extra"));
  const showWhy = flawed && !!data.why;
  const hasTop = Boolean(data.answerTokens?.length || (data.why?.diff && wrong) || data.answer || data.meaning || data.detail || data.extra || speakText);

  return (
    <motion.div
      /* Ekran okuyucu sonucu duyurur: renk ve simge yalnız görene bir şey söyler.
         Hüküm metni başlıkta; duyuru onu da okusun diye gizli tekrar. */
      role="status"
      aria-live="polite"
      className="relative text-left"
    >
      <span className="sr-only">{data.label ?? t(data.correct ? "sheet.correct" : "sheet.wrong")}</span>
      <div className="flex max-h-[42vh] flex-col gap-2 overflow-y-auto overflow-x-hidden overscroll-contain">
        {hasTop ? (
          <div className="flex items-start gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
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
            {speakText ? <SpeakButton word text={speakText} size="sm" /> : null}
          </div>
        ) : null}
        {showYou || showDiffs || showWhy ? (
          <div className="flex flex-col gap-1.5 pb-0.5">
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
                <DiffLines target={data.diffs.target} typed={data.diffs.typed} lang={targetLangOf(course)} />
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
