"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { SKILL_LABELS } from "@/lib/skills/meta";
import type { SkillExercise } from "@/lib/skills/types";
import { recordSkillResult } from "@/lib/skills/progress";
import { ArrowLeftIcon, CheckIcon, FlameIcon, SparkIcon } from "@/components/icons";
import { LEVEL_TONE } from "./theme";

/** Cihazın yerel gününü verir — istatistikler kullanıcının gününe yazılır. */
function localDay() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

type FinishState =
  | { phase: "idle" }
  | { phase: "saving" }
  | { phase: "saved"; xpGained: number; currentStreak: number }
  | { phase: "offline" };

/**
 * Egzersiz bitişini işler: yerel kayıt + sunucuda XP/seri + üst bardaki
 * rozetlerin anında güncellenmesi. Sunucuya ulaşılamazsa yerel kayıt yine
 * tutulur; kullanıcı çevrimdışıyken de egzersiz "tamamlandı" görünür.
 */
export function useSkillFinish(exercise: SkillExercise, total: number) {
  const [state, setState] = useState<FinishState>({ phase: "idle" });
  const startedAt = useRef(Date.now());
  const sent = useRef(false);

  const finish = useCallback(
    async (correct: number) => {
      if (sent.current) return;
      sent.current = true;
      recordSkillResult(exercise.id, correct, total);
      setState({ phase: "saving" });
      try {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: exercise.id,
            correct,
            day: localDay(),
            seconds: Math.round((Date.now() - startedAt.current) / 1000),
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as {
          xpGained: number;
          totalXp: number;
          currentStreak: number;
        };
        window.dispatchEvent(
          new CustomEvent("wortspiel:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
        setState({ phase: "saved", xpGained: data.xpGained, currentStreak: data.currentStreak });
      } catch {
        setState({ phase: "offline" });
      }
    },
    [exercise.id, total],
  );

  return { finish, state };
}

/** Egzersiz sayfalarının ortak çerçevesi: geri dönüş, seviye, tür ve başlık. */
export function PlayerShell({
  exercise,
  children,
}: {
  exercise: SkillExercise;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl pb-8">
      <div className="mb-5 flex items-center gap-3">
        <Link href="/skills" aria-label="Becerilere dön" className="btn btn-ghost h-9 w-9 shrink-0">
          <ArrowLeftIcon size={18} />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="rounded-md px-1.5 py-0.5 text-[11px] font-black text-white"
              style={{ background: LEVEL_TONE[exercise.level] ?? "var(--color-brand-500)" }}
            >
              {exercise.level}
            </span>
            <span className="muted text-xs font-semibold">
              {SKILL_LABELS[exercise.skill]} · {exercise.genre} · {exercise.minutes} dk
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
  noun = "soru",
}: {
  correct: number;
  total: number;
  state: FinishState;
  noun?: "soru" | "görev";
}) {
  if (state.phase === "idle") return null;
  const perfect = correct === total;
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="card mt-5 p-5 text-center"
    >
      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white"
        style={{
          background: perfect ? "var(--color-mint-500)" : "var(--color-brand-500)",
        }}
      >
        <CheckIcon size={24} />
      </div>
      <h2 className="mt-3 text-lg font-bold">
        {perfect
          ? "Kusursuz! Hepsi doğru."
          : `${total} ${noun === "görev" ? "görevden" : "sorudan"} ${correct} doğru`}
      </h2>
      {state.phase === "saved" ? (
        <p className="mt-2 flex items-center justify-center gap-3 text-sm font-bold">
          <span className="flex items-center gap-1" style={{ color: "var(--color-brand-500)" }}>
            <SparkIcon size={16} /> +{state.xpGained} XP
          </span>
          <span className="flex items-center gap-1" style={{ color: "var(--color-flame-500)" }}>
            <FlameIcon size={16} /> {state.currentStreak} gün
          </span>
        </p>
      ) : state.phase === "offline" ? (
        <p className="muted mt-2 text-sm">
          Sonuç bu cihaza kaydedildi; internete bağlanınca XP&#39;n işlenecek.
        </p>
      ) : (
        <p className="muted mt-2 text-sm">Kaydediliyor…</p>
      )}
      <Link href="/skills" className="btn btn-primary mt-4 px-6 py-3">
        Becerilere dön
      </Link>
    </motion.section>
  );
}
