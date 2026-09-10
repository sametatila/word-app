"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MascotFx } from "@/components/mascot-fx";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SKILL_LABEL_KEYS } from "@/lib/skills/meta";
import type { SkillExercise } from "@/lib/skills/types";
import { recordSkillResult } from "@/lib/skills/progress";
import { ArrowLeftIcon, FlameIcon, SparkIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import { LEVEL_TONE } from "./theme";
import { usePlayerFrame } from "./player-context";
import { useT } from "@/lib/i18n/client";
import { localDay } from "@/lib/day";

type FinishState =
  | { phase: "idle" }
  | { phase: "saving" }
  | { phase: "saved"; xpGained: number; currentStreak: number; repeat: boolean }
  | { phase: "offline" };

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
      setState({ phase: "saving" });
      try {
        const res = await fetch("/api/skills", {
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
        });
      } catch {
        setState({ phase: "offline" });
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
      <MascotFx />
      <div className="mb-5 flex items-center gap-3">
        <Link href={back} aria-label={t("common.go_back")} className="btn btn-ghost h-9 w-9 shrink-0">
          <ArrowLeftIcon size={18} />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="rounded-md px-1.5 py-0.5 text-[11px] font-black text-white"
              style={{ background: LEVEL_TONE[exercise.level] ?? "var(--color-brand)" }}
            >
              {exercise.level}
            </span>
            <span className="muted text-xs font-semibold">
              {t(SKILL_LABEL_KEYS[exercise.skill])} · {t(`genre.${exercise.genre}`)} · {t("skills.dk", { n: exercise.minutes })}
            </span>
          </div>
          <h1 className="truncate text-lg font-bold">{exercise.title}</h1>
        </div>
      </div>
      {children}
    </div>
  );
}

/** Bitiş kartı: skor, XP ve seri. Tam skorda küçük bir kutlama tonu taşır. */
export function ResultCard({
  correct,
  total,
  state,
  noun = "question",
  onRetry,
}: {
  correct: number;
  total: number;
  state: FinishState;
  /** Sayılan şey: soru mu görev mi — çoğul ve ek dile göre sözlükten. */
  noun?: "question" | "task";
  onRetry?: () => void;
}) {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const frame = usePlayerFrame();
  const visible = state.phase !== "idle";
  // Sonuç sayfanın en altına eklenir; öğrenci görmeden kaçırmasın.
  useEffect(() => {
    if (visible) ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [visible]);
  if (!visible) return null;
  const perfect = correct === total;
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="card mt-5 p-5 text-center"
    >
      {/* Sonucu söyleyen şey burada da Erdi — kelime turlarında, etap
          kartlarında ve oyun içindeki sonuç şeridinde olduğu gibi. Beceri
          egzersizini bitirmek de bir tur bitirmek kadar bir an; orada karakter
          kutlarken burada onay simgesi çıkması, aynı uygulamada iki ayrı dil
          konuşmak olurdu. */}
      <Mascot mood={perfect ? "cheer" : "happy"} size={84} className="mx-auto" />
      <h2 className="mt-1 text-lg font-bold">
        {perfect
          ? t("skillp.perfect")
          : t(noun === "task" ? "skillp.n_of_tasks" : "skillp.n_of_questions", { correct, total })}
      </h2>
      {state.phase === "saved" ? (
        <>
          <p className="mt-2 flex items-center justify-center gap-3 text-sm font-bold">
            <span className="flex items-center gap-1" style={{ color: "var(--color-brand)" }}>
              <SparkIcon size={16} /> +{state.xpGained} XP
            </span>
            <span className="flex items-center gap-1" style={{ color: "var(--color-flame)" }}>
              <FlameIcon size={16} /> {t("social.days_streak", { n: state.currentStreak })}
            </span>
          </p>
          {state.repeat && state.xpGained === 0 ? (
            <p className="muted mt-1.5 text-xs">
              {t("skillp.repeat_note")}
            </p>
          ) : null}
        </>
      ) : state.phase === "offline" ? (
        <p className="muted mt-2 text-sm">
          {t("skillp.saved_offline")}
        </p>
      ) : (
        <p className="muted mt-2 text-sm">{t("rounds.saving")}</p>
      )}
      {/* Sıradaki: Beceriler kütüphanesinden gelindiyse aynı seviye ve
          becerideki bitmemiş bir sonraki egzersiz. Öğrenci hub'a dönüp
          aramasın; "todo" burada, bitirdiği anda. */}
      {frame.next ? (
        <Link
          href={frame.next.href}
          className="mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left surface-2"
        >
          <span className="min-w-0">
            <span className="muted block text-[11px] font-bold uppercase tracking-wide">{t("skills.next")}</span>
            <span className="block truncate text-sm font-semibold">{frame.next.title}</span>
          </span>
          <span className="shrink-0 text-lg" aria-hidden>
            →
          </span>
        </Link>
      ) : null}
      <div className="mt-4 flex items-center justify-center gap-3">
        <Link href={frame.backHref} className="btn btn-primary px-6 py-3">
          {t(frame.backLabel)}
        </Link>
        {onRetry && !perfect ? (
          <button type="button" onClick={onRetry} className="btn btn-ghost px-5 py-3">
            {t("common.try_again")}
          </button>
        ) : null}
      </div>
    </motion.section>
  );
}
