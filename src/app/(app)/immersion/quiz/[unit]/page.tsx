import { notFound } from "next/navigation";
import { unitBriefs } from "@/lib/immersion/brief";
import { deriveQuiz } from "@/lib/immersion/quiz";
import type { CefrLevel } from "@/lib/skills/types";
import { ImmersionQuizPlayer } from "@/components/immersion/quiz-player";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion quiz/checkpoint oynatıcı rotası (Faz: quiz türetme).
 *
 * [unit] = ünite kimliği (ör. `de-a1-u02`). Rota o ünitenin brief'ini kurar,
 * seviyenin tüm kelime/kalıp havuzundan distraktörle deriveQuiz çağırır ve
 * QuestionList'i render eder. mode=checkpoint daha uzun sınav verir.
 *
 * İÇERİK YAZIMI YOK: sorular ünitenin kendi derslerinden türer.
 */
export default async function ImmersionQuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ unit: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { unit } = await params;
  const checkpoint = (await searchParams).mode === "checkpoint";

  // `de-a1-u02` → course="de", level="A1", index=2. Kurs tireli olabilir (gsw-zh).
  const [left, num] = unit.split("-u");
  const parts = left.split("-");
  const levelRaw = parts.pop() ?? "";
  const course = parts.join("-");
  const level = levelRaw.toUpperCase() as CefrLevel;
  const index = Number.parseInt(num ?? "", 10);
  if (!course || !LEVELS.includes(level) || !Number.isInteger(index)) notFound();

  const briefs = unitBriefs(course, level);
  const brief = briefs.find((b) => b.index === index);
  if (!brief) notFound();

  const pool = {
    vocab: briefs.flatMap((b) => b.vocab),
    patterns: briefs.flatMap((b) => b.patterns),
  };
  const questions = deriveQuiz(brief, pool, checkpoint ? 12 : 8);
  if (!questions.length) notFound(); // temalı kelime yoksa (olmaz) sınav üretilemez

  return (
    <ImmersionQuizPlayer
      title={checkpoint ? "Kontrol Noktası" : "Tekrar"}
      subtitle={`Ünite ${brief.index} · ${brief.theme}`}
      questions={questions}
    />
  );
}
