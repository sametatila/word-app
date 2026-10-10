"use client";

import { ReportFlag, snapshot } from "@/components/report-flag";
import Link from "next/link";
import { apiFetch } from "@/lib/api-fetch";
import { motion } from "framer-motion";
import { T } from "@/lib/motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { SKILL_LABEL_KEYS } from "@/lib/skills/meta";
import type { SkillExercise } from "@/lib/skills/types";
import { recordSkillResult } from "@/lib/skills/progress";
import { OfflineIcon } from "@/components/icons";
import { RoundExit } from "@/components/round-exit";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { UnsavedWorkScope } from "./unsaved-work";
import { FlowActions, FlowColumn, FlowNote, ResultHero, StatRow } from "@/components/flow";
import { isSkillDone, RUBRIC_PASS_PCT, scoreOf, SKILL_DONE_PCT } from "@/lib/score-bands";
import { LEVEL_TONE } from "./theme";
import { usePlayerFrame, useReportSurface } from "./player-context";
import { useT, useLang } from "@/lib/i18n/client";
import { formatPercent } from "@/lib/i18n/dict";
import { localDay } from "@/lib/day";
import { reducedMotion } from "@/lib/fx";

/** `score`: bu denemenin rubrik puanı (yazma, konuşma) — sonuç bandının ana sayısı. */
type FinishState =
  | { phase: "idle" }
  | { phase: "saving"; score?: number }
  | { phase: "saved"; xpGained: number; currentStreak: number; repeat: boolean; score?: number }
  | { phase: "offline"; score?: number };

/**
 * Egzersiz bitişini işler: sunucuda kayıt + XP/seri, cihazda önbellek, üst
 * bardaki rozetlerin anında güncellenmesi. Sunucuya ulaşılamazsa yerel kayıt
 * yine tutulur; kullanıcı çevrimdışıyken de egzersiz "tamamlandı" görünür ve
 * bir sonraki senkronda sunucuya taşınır (bkz. lib/skills/progress.ts).
 *
 * `score` isteğe bağlı rubrik puanı (0–100): serbest yazma/konuşma AI
 * değerlendirmesinden gelir (WP-03); verilmezse doğru/toplam oranı.
 */
export function useSkillFinish(exercise: SkillExercise, total: number) {
  const [state, setState] = useState<FinishState>({ phase: "idle" });
  const startedAt = useRef(Date.now());
  const sent = useRef(false);

  const finish = useCallback(
    async (correct: number, score?: number) => {
      if (sent.current) return;
      sent.current = true;
      recordSkillResult(exercise.id, correct, total, score);
      setState({ phase: "saving", score });
      try {
        const res = await apiFetch("/api/skills", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: exercise.id,
            correct,
            score,
            day: localDay(),
            seconds: Math.round((Date.now() - startedAt.current) / 1000),
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as {
          xpGained: number;
          totalXp: number;
          currentStreak: number;
          repeat?: boolean;
          lastScore?: number;
        };
        recordSkillResult(exercise.id, correct, total, data.lastScore ?? score);
        window.dispatchEvent(
          new CustomEvent("lernomi:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
        setState({
          phase: "saved",
          xpGained: data.xpGained,
          currentStreak: data.currentStreak,
          repeat: data.repeat === true,
          score,
        });
      } catch {
        setState({ phase: "offline", score });
      }
    },
    [exercise.id, total],
  );

  /** "Tekrar dene" için: aynı egzersiz yeniden çözülebilir hâle gelir. */
  const reset = useCallback(() => {
    sent.current = false;
    startedAt.current = Date.now();
    setState({ phase: "idle" });
  }, []);

  return { finish, state, reset };
}

/**
 * Kabuğun egzersizi — sonuç bandının başlığı ("Okuma · A2") ve monolog ayrımı
 * için `ResultCard` bunu okuyor. Altı oynatıcının her birine prop eklemek
 * yerine kabuk zaten egzersizi taşıyor.
 */
const ShellExercise = createContext<SkillExercise | null>(null);

/** Egzersiz sayfalarının ortak çerçevesi: geri dönüş, seviye, tür ve başlık. */
export function PlayerShell({
  exercise,
  children,
  backHref,
  unsaved = false,
}: {
  exercise: SkillExercise;
  children: ReactNode;
  /** Nereye dönülecek. Verilmezse çerçeve bağlamından (rota sayfası) gelir. */
  backHref?: string;
  /**
   * Oynatıcının kendi ilerlemesi kaydedilmemiş (çözülen görevler, söylenen
   * cümleler). Kartların içindeki yazı `useUnsavedWork` ile ayrıca bildiriliyor.
   */
  unsaved?: boolean;
}) {
  const t = useT();
  const frame = usePlayerFrame();
  const back = backHref ?? frame.backHref;
  /*
    YARIM ALIŞTIRMADAN ÇIKIŞ ONAYA BAĞLI (QA F-0054, Android'de görüldü).
    "Kapat" ve kenar çubuğu bağlantıları sormadan çıkıyordu; yazılan metin ve
    çözülen görevler kaydedilmiyor, alıştırma baştan açılıyordu. Tur ve sınav
    oynatıcılarıyla aynı kanca (`useLeaveGuard`: uygulama içi bağlantı +
    sekme kapatma); mobil `ItemScreen` aynı diyalog ve metin.
  */
  const [cardsDirty, setCardsDirty] = useState(false);
  const ayril = useLeaveGuard(unsaved || cardsDirty);
  return (
    <div className="mx-auto w-full max-w-2xl">
      <ConfirmDialog
        open={ayril.pending !== null}
        title={t("item.leave_title")}
        message={t("item.leave_body")}
        confirmLabel={t("common.exit")}
        cancelLabel={t("common.continue")}
        destructive
        onConfirm={ayril.leave}
        onCancel={ayril.stay}
      />
      <div className="mb-5 flex items-center gap-3">
        {/* KAPAT, GERİ OKU DEĞİL (2026-09-27): sonuç bu sayfanın dibine
            ekleniyor ve sonuç ekranında çıkış solda çarpı, adı `common.close`
            (ürün kuralı; Android `ItemScreen` başlığı baştan beri çarpı).
            Ölçü ortak bileşenden (`RoundExit`). */}
        <RoundExit href={back} labelKey="common.close" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="rounded-chip px-1.5 py-0.5 text-micro text-white"
              style={{ background: LEVEL_TONE[exercise.level] ?? "var(--color-brand-700)" }}
            >
              {exercise.level}
            </span>
            <span className="muted text-caption">
              {t(SKILL_LABEL_KEYS[exercise.skill])} · {t(`genre.${exercise.genre}`)} · {t("skills.dk", { n: exercise.minutes })}
            </span>
          </div>
          <h1 className="truncate text-h3">{exercise.title}</h1>
        </div>
      </div>
      <ShellExercise.Provider value={exercise}>
        <UnsavedWorkScope onChange={setCardsDirty}>{children}</UnsavedWorkScope>
      </ShellExercise.Provider>
    </div>
  );
}

/**
 * Bitiş: SONUÇ ŞABLONU (components/flow) — band → sayılar → notlar →
 * ayrıntı (`children`, ör. monolog geri bildirimi) → sıradaki → düğmeler.
 * Mobil karşılığı `ItemScreen` `resultHead` + `resultActions`; alanlar ve
 * sıra birebir.
 */
export function ResultCard({
  correct,
  total,
  state,
  noun = "question",
  onRetry,
  children,
}: {
  correct: number;
  total: number;
  state: FinishState;
  /** Sayılan şey: soru mu görev mi. Görevler (yazma, monolog) başlığı "Görevler bitti" yapıyor. */
  noun?: "question" | "task";
  onRetry?: () => void;
  /** Bandın altındaki ayrıntı kartları (monolog geri bildirimi). */
  children?: ReactNode;
}) {
  const t = useT();
  const lang = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const frame = usePlayerFrame();
  const surface = useReportSurface();
  const exercise = useContext(ShellExercise);
  const visible = state.phase !== "idle";
  // Sonuç sayfanın en altına eklenir; öğrenci görmeden kaçırmasın.
  useEffect(() => {
    if (visible) ref.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
  }, [visible]);
  if (state.phase === "idle") return null;
  const score = state.score;
  const isMono = !!exercise && "monologue" in exercise;
  const perfect = total > 0 && correct === total;
  /* Yüzde tek kaynaktan (`lib/score-bands.ts`); rubrikle puanlananlarda
     rubrik puanından — monolog tek görev ve doğru/toplam ya %0 ya %100
     olurdu. Puan bandı yalnız konfetiyi seçiyordu; konfeti kalkınca o da
     kalktı (mobil `ItemScreen` aynı). */
  const pct = scoreOf(correct, total, score);
  /* Olumsuz sonuç = adım "bitti" sayılmadı: band sessizleşiyor, birincil düğme
     "Tekrar dene". Monologda hüküm rubrik eşiği (tek görevin geçip geçmediği). */
  const passed = isMono ? perfect : isSkillDone(pct);
  const xp = state.phase === "saved" ? state.xpGained : 0;
  const streak = state.phase === "saved" ? state.currentStreak : 0;
  const title = noun === "task"
    ? passed ? t("item.tasks_done") : t("skillp.result_retry")
    : perfect ? t("skillp.result_perfect") : passed ? t("skillp.result_done") : t("skillp.result_retry");
  const sub = [
    !isMono ? t("common.n_correct", { correct, total }) : null,
    xp > 0 ? `+${xp} XP` : null,
    state.phase === "saving" ? t("rounds.saving") : null,
  ].filter(Boolean).join(" · ");
  /* KAZANILMAYAN SAYI YAZILMAZ: seri yoksa kutusu da yok (Android aynı). */
  const stats = [
    !isMono ? { value: `${correct}/${total}`, label: t("common.correct") } : null,
    !isMono || score !== undefined ? { value: formatPercent(pct, lang), label: t("skillp.stat_score") } : null,
    streak > 0 ? { value: t("profile.days", { n: streak }), label: t("summary.streak"), tone: "streak" as const } : null,
  ].filter((x): x is NonNullable<typeof x> => x !== null);
  /* Sonuçtan çıkış "Kapat" (2026-09-30), geldiği yere (`backHref`). */
  const back = { label: t("common.close"), href: frame.backHref };
  const retry = onRetry ? { label: t("item.try_again"), onClick: onRetry } : null;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={T.medium}
      className="mt-5"
    >
      {/* TURUN SONUCU DUYURULUYOR: `ResultHero` `role="status"` taşıyor —
          sorular kayboluyor, yerine puan ve yargı beliriyor. */}
      {/* Konfeti YOK: beceri alıştırması sıradan bir adım, kutlama büyük
          anlara ayrıldı (mobil `ItemScreen` aynı). */}
      <FlowColumn>
        <ResultHero
          eyebrow={exercise ? `${t(SKILL_LABEL_KEYS[exercise.skill])} · ${exercise.level}` : t("item.content")}
          title={title}
          figure={isMono && score === undefined ? null : formatPercent(pct, lang)}
          sub={sub || null}
          quiet={!passed}
          pill={passed ? null : { text: t("skillp.pill_need", { pct: isMono ? RUBRIC_PASS_PCT : SKILL_DONE_PCT }), tone: "bad" }}
        />
        {stats.length ? <StatRow items={stats} /> : null}
        {/* Bu bir UYARI, hata değil — sonuç cihazda, bağlantıyı bekliyor. */}
        {state.phase === "offline" ? <FlowNote tone="warn" icon={<OfflineIcon size={16} />} text={t("skillp.saved_offline")} /> : null}
        {state.phase === "saved" && state.repeat && state.xpGained === 0 ? <FlowNote text={t("item.repeat_note")} /> : null}
        {children}
        {/* İçerik bildirimi, egzersizin BÜTÜNÜ için (metin, ses, yönerge):
            egzersiz bittikten sonra, sonucun gövdesinin dibinde, sol başta
            (mobil `ItemScreen` aynı yer). Tek tek sorular kendi açıklamalarının
            altında ayrıca bildiriliyor (`quiz`). Başlıktaki karo kalktı: soru
            çözülürken dikkati bölüyordu. */}
        {exercise ? (
          <ReportFlag
            surface={surface}
            target={{ type: "exercise", id: exercise.id }}
            content={() => snapshot({ title: exercise.title, skill: exercise.skill, level: exercise.level })}
          />
        ) : null}
        {/* Sıradaki: Beceriler kütüphanesinden gelindiyse aynı seviye ve
            becerideki bitmemiş bir sonraki egzersiz. Öğrenci hub'a dönüp
            aramasın; "todo" burada, bitirdiği anda. (Mobilde bu bağlantı yok.) */}
        {frame.next ? (
          <Link
            href={frame.next.href}
            className="flex items-center justify-between gap-3 rounded-panel px-4 py-3 text-left surface-2"
          >
            <span className="min-w-0">
              <span className="muted block text-micro uppercase tracking-eyebrow">{t("skills.next")}</span>
              <span className="block truncate text-strong">{frame.next.title}</span>
            </span>
            <span className="shrink-0 text-h3" aria-hidden>
              →
            </span>
          </Link>
        ) : null}
        {passed || !retry ? (
          <FlowActions primary={back} tertiary={retry} />
        ) : (
          <FlowActions primary={retry ?? back} close={retry ? back.href : null} />
        )}
      </FlowColumn>
    </motion.div>
  );
}
