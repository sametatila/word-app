"use client";

import { useState } from "react";
import Link from "next/link";
import { QuestionList } from "@/components/skills/quiz";
import type { SkillQuestion } from "@/lib/skills/types";
import { useT, useLang } from "@/lib/i18n/client";
import { formatPercent } from "@/lib/i18n/dict";

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
  questions: SkillQuestion[];
}) {
  const t = useT();
  const lang = useLang();
  const [score, setScore] = useState<number | null>(null);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="mb-5 flex items-center gap-3">
        <Link href="/immersion" aria-label={t("lesson.back_to_path")} className="btn btn-ghost h-9 w-9 shrink-0 text-lg">
          ←
        </Link>
        <div className="min-w-0">
          <h1 className="truncate font-bold">{title}</h1>
          <p className="muted truncate text-xs">{subtitle}</p>
        </div>
      </div>

      {intro && score === null ? <p className="muted mb-4 text-body">{intro}</p> : null}

      {score === null ? (
        <QuestionList questions={questions} onAllAnswered={(c) => setScore(c)} />
      ) : (
        <div className="card p-6 text-center">
          <p className="text-2xl font-bold">
            {score}/{questions.length}
          </p>
          <p className="muted mt-1 text-sm">
            {t("quizw.pct_correct", { pct: formatPercent(questions.length ? Math.round((score / questions.length) * 100) : 0, lang) })}
          </p>
          <Link href="/immersion" className="btn btn-primary mt-5 inline-flex px-6 py-3">
            {t("lesson.back_to_path")}
          </Link>
        </div>
      )}
    </div>
  );
}
