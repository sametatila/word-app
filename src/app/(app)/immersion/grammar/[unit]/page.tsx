import { notFound } from "next/navigation";
import { unitBriefs } from "@/lib/immersion/brief";
import { unitQuestions } from "@/lib/immersion/content";
import { deriveGrammar } from "@/lib/immersion/grammar";
import { lessonsFor } from "@/lib/lessons/index";
import type { CefrLevel } from "@/lib/skills/types";
import { ImmersionQuizPlayer } from "@/components/immersion/quiz-player";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion gramer oynatıcı rotası.
 *
 * [unit] = ünite kimliği. Elle yazılmış gramer varsa o kullanılır; yoksa
 * ünitenin KENDİ derslerinden türetilir (bkz. lib/immersion/grammar.ts).
 *
 * Eskiden burada "gramer türetilemez" yazıyordu ve yalnız kayıtlı ünite
 * çalışıyordu. Sonuç: 145 ünitenin 144'ünde adım "yakında" olarak duruyordu.
 * Oysa ders katmanı gereken malzemeyi taşıyor — hüküm adımları (gerekçesiyle)
 * ve üretim hedefleri. Türetme onları kullanıyor, hiçbir şey uydurmuyor.
 */
export default async function ImmersionGrammarPage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;

  const authored = unitQuestions(unit);

  // Ünite temasını ve derslerini çöz (`de-a1-u02` → de / A1 / 2).
  const [left, num] = unit.split("-u");
  const parts = left.split("-");
  const levelRaw = parts.pop() ?? "";
  const course = parts.join("-");
  const level = levelRaw.toUpperCase() as CefrLevel;
  const index = Number.parseInt(num ?? "", 10);
  const brief = course && LEVELS.includes(level) ? unitBriefs(course, level).find((b) => b.index === index) : undefined;

  let questions = authored?.grammar ?? [];
  if (!questions.length && course && LEVELS.includes(level) && Number.isInteger(index)) {
    const dersler = lessonsFor(course).filter((l) => l.level === level);
    questions = deriveGrammar(unit, dersler.slice((index - 1) * 4, (index - 1) * 4 + 4));
  }
  if (!questions.length) notFound();

  return (
    <ImmersionQuizPlayer
      title="Dil bilgisi"
      subtitle={brief ? `Ünite ${brief.index} · ${brief.theme}` : "Dil bilgisi alıştırması"}
      questions={questions}
    />
  );
}
