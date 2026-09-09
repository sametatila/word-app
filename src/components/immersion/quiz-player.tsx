"use client";

import { useState } from "react";
import Link from "next/link";
import { QuestionList } from "@/components/skills/quiz";
import { KindIconFor } from "@/components/immersion/unit-pane";
import { Confetti } from "@/components/celebrate";
import { Mascot } from "@/components/mascot";
import type { SkillQuestion } from "@/lib/skills/types";
import { useT } from "@/lib/i18n/client";

/** Geçme eşiği mobil `QuizScreen` ile aynı: yüzde altmış. */
const PASS_PCT = 60;

/**
 * Immersion quiz/checkpoint oynatıcısı — ünitenin brief'inden TÜRETİLEN sorular
 * (deriveQuiz) için ince kabuk. Mevcut QuestionList UI'sini aynen kullanır.
 *
 * v1: PRATİK — sunucu ilerleme kaydı yok (opsiyonel, gating yapmıyor). Skor
 * ekranda gösterilir; kalıcı "tamam" işareti sonraki adımda (hafif uç nokta).
 */
export function ImmersionQuizPlayer({
  title,
  subtitle,
  intro,
  checkpoint = false,
  questions,
}: {
  title: string;
  subtitle: string;
  /**
   * Quizin ne yaptığını söyleyen tek cümle — mobil `QuizScreen` sorulardan
   * önce onu gösteriyor, web hiç göstermiyordu. Başlık ("Tekrar") türü
   * söylüyor ama neyin tekrarı olduğunu söylemiyor.
   */
  intro?: string;
  /** Kontrol noktası mı — başlıktaki karonun rengini ve ikonunu belirliyor. */
  checkpoint?: boolean;
  questions: SkillQuestion[];
}) {
  const t = useT();
  const [score, setScore] = useState<number | null>(null);
  /** Yeniden denemede soru listesi sıfırdan kurulsun diye taze anahtar. */
  const [round, setRound] = useState(0);

  const kind = checkpoint ? "checkpoint" : "quiz";
  const tint = checkpoint ? "var(--color-rose-500)" : "var(--color-brand-500)";
  const pct = questions.length ? Math.round(((score ?? 0) / questions.length) * 100) : 0;
  const passed = pct >= PASS_PCT;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="mb-5 flex items-center gap-3">
        <Link href="/immersion" aria-label={t("quiz.back_to_path")} className="btn btn-ghost h-9 w-9 shrink-0 text-lg">
          ←
        </Link>
        {/* Türün karosu Android'in başlığında var ve Patika listesindeki aynı
            ikon/renk çiftini kullanıyor: kontrol noktası kırmızı, tekrar marka
            rengi. Web'de yalnız düz başlık vardı, ekran hangisi olduğunu ancak
            okununca söylüyordu. */}
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile text-white"
          style={{ background: tint }}
        >
          <KindIconFor kind={kind} size={18} />
        </span>
        <div className="min-w-0">
          <h1 className="truncate font-bold">{title}</h1>
          <p className="muted truncate text-xs">{subtitle}</p>
        </div>
      </div>

      {intro && score === null ? <p className="muted mb-4 text-body">{intro}</p> : null}

      {score === null ? (
        <QuestionList key={round} questions={questions} onAllAnswered={(c) => setScore(c)} />
      ) : (
        /* Kapanış Android'deki kartın aynısı: geçtiyse maskot kutluyor ve
           konfeti atıyor, geçmediyse duruyor. Yüzde tek başına bir sayıydı;
           "geçtin" / "biraz daha çalış" onu bir yargıya çeviriyor. Yeniden
           deneme düğmesi web'de hiç yoktu - tek çıkış Patika'ya dönmekti. */
        <div className="card relative p-6 text-center">
          <Confetti fire={passed ? round + 1 : 0} />
          <Mascot mood={passed ? "cheer" : "idle"} size={84} className="mx-auto" />
          <p className="mt-1 text-h2">{t("common.n_correct", { correct: score, total: questions.length })}</p>
          <p className="mt-1 text-caption" style={{ color: passed ? "var(--color-mint)" : "var(--text-muted)" }}>
            {t(passed ? "quiz.passed" : "quiz.try_more", { pct })}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-ghost flex-1 px-5 py-3"
              onClick={() => {
                setScore(null);
                setRound((r) => r + 1);
              }}
            >
              {t("quiz.try_again")}
            </button>
            <Link href="/immersion" className="btn btn-primary flex-1 px-5 py-3">
              {t("quiz.back_to_path")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
