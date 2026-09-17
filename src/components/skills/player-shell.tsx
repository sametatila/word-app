"use client";

import Link from "next/link";
import { apiFetch } from "@/lib/api-fetch";
import { motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { SKILL_LABEL_KEYS } from "@/lib/skills/meta";
import type { SkillExercise } from "@/lib/skills/types";
import { recordSkillResult } from "@/lib/skills/progress";
import { AlertIcon, ArrowLeftIcon } from "@/components/icons";
import { FlowActions, FlowColumn, FlowNote, ResultHero, StatRow } from "@/components/flow";
import { isSkillDone, RUBRIC_PASS_PCT, scoreBand, scoreOf, SKILL_DONE_PCT } from "@/lib/score-bands";
import { LEVEL_TONE } from "./theme";
import { usePlayerFrame } from "./player-context";
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
}: {
  exercise: SkillExercise;
  children: ReactNode;
  /** Nereye dönülecek. Verilmezse çerçeve bağlamından (rota sayfası) gelir. */
  backHref?: string;
}) {
  const t = useT();
  const frame = usePlayerFrame();
  const back = backHref ?? frame.backHref;
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-5 flex items-center gap-3">
        {/* 44 - `PageBack` ve Android'in ölçüsü; 36'da kalıyordu. */}
        <Link
          href={back}
          aria-label={t("common.go_back")}
          className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
          style={{ background: "var(--surface-2)", color: "var(--text)" }}
        >
          <ArrowLeftIcon size={24} />
        </Link>
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
      <ShellExercise.Provider value={exercise}>{children}</ShellExercise.Provider>
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
  /* SONUÇ ANDROID'DEKİ GİBİ ÜÇ BANTLI VE KONFETİLİ. Bantlar tek kaynaktan
     (`lib/score-bands.ts`); rubrikle puanlananlarda yüzde rubrik puanından —
     monolog tek görev ve doğru/toplam ya %0 ya %100 olurdu. */
  const pct = scoreOf(correct, total, score);
  const band = scoreBand(pct);
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
  const back = { label: t(frame.backLabel), href: frame.backHref };
  const retry = onRetry ? { label: t("item.try_again"), onClick: onRetry } : null;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="mt-5"
    >
      {/* TURUN SONUCU DUYURULUYOR: `ResultHero` `role="status"` taşıyor —
          sorular kayboluyor, yerine puan ve yargı beliriyor. */}
      <FlowColumn celebrate={band === "good" && passed}>
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
        {state.phase === "offline" ? <FlowNote tone="warn" icon={<AlertIcon size={16} />} text={t("skillp.saved_offline")} /> : null}
        {state.phase === "saved" && state.repeat && state.xpGained === 0 ? <FlowNote text={t("item.repeat_note")} /> : null}
        {children}
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
          <FlowActions primary={back} secondary={retry} />
        ) : (
          <FlowActions primary={retry} secondary={back} />
        )}
      </FlowColumn>
    </motion.div>
  );
}
