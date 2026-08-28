"use client";

import { useState } from "react";
import Link from "next/link";
import { QuestionList } from "@/components/skills/quiz";
import type { SkillQuestion } from "@/lib/skills/types";

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
  questions,
}: {
  title: string;
  subtitle: string;
  questions: SkillQuestion[];
}) {
  const [score, setScore] = useState<number | null>(null);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="mb-5 flex items-center gap-3">
        <Link href="/immersion" aria-label="Patika'ya dön" className="btn btn-ghost h-9 w-9 shrink-0 text-lg">
          ←
        </Link>
        <div className="min-w-0">
          <h1 className="truncate font-bold">{title}</h1>
          <p className="muted truncate text-xs">{subtitle}</p>
        </div>
      </div>

      {score === null ? (
        <QuestionList questions={questions} onAllAnswered={(c) => setScore(c)} />
      ) : (
        <div className="card p-6 text-center">
          <p className="text-2xl font-bold">
            {score}/{questions.length}
          </p>
          <p className="muted mt-1 text-sm">
            %{questions.length ? Math.round((score / questions.length) * 100) : 0} doğru
          </p>
          <Link href="/immersion" className="btn btn-primary mt-5 inline-flex px-6 py-3">
            Patika'ya dön
          </Link>
        </div>
      )}
    </div>
  );
}
