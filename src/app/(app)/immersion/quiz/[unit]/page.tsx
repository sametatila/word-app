import { notFound } from "next/navigation";
import { getT, getLang } from "@/lib/i18n/server";
import { courseName } from "@/lib/courses";
import { nativeUnitBriefs } from "@/lib/immersion/brief";
import { localiseLesson } from "@/lib/lessons/native-server";
import { deriveQuiz } from "@/lib/immersion/quiz";
import { unitQuestions } from "@/lib/immersion/content";
import type { CefrLevel, SkillQuestion } from "@/lib/skills/types";
import { ImmersionQuizPlayer } from "@/components/immersion/quiz-player";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion quiz/checkpoint oynatıcı rotası.
 *
 * [unit] = ünite kimliği (ör. `de-a1-u02`). ELLE YAZILMIŞ içerik varsa (registry)
 * onu, yoksa ünitenin brief'inden TÜRETİLEN soruları render eder. mode=checkpoint
 * daha uzun/kapsamlı sınav (bitiş sınavı). Kurs tireli olabilir (gsw-zh).
 */
export const generateMetadata = titleMeta("unitkind.quiz");

export default async function ImmersionQuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ unit: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const t = await getT();
  const lang = await getLang();
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

  const briefs = await nativeUnitBriefs(course, level, lang, (l) => localiseLesson(l, lang));
  const brief = briefs.find((b) => b.index === index);
  if (!brief) notFound();

  // Elle yazılmış içerik öncelikli; yoksa ünitenin brief'inden türet.
  const authored = unitQuestions(unit);
  let questions: SkillQuestion[];
  if (checkpoint && authored?.checkpoint?.length) {
    questions = authored.checkpoint;
  } else if (!checkpoint && authored?.quiz?.length) {
    questions = authored.quiz;
  } else {
    const pool = {
      vocab: briefs.flatMap((b) => b.vocab),
      patterns: briefs.flatMap((b) => b.patterns),
    };
    // Tekrar havuzu = BU üniteden ÖNCEKİ üniteler. Soruların üçte biri buradan
    // gelir; ünite 1'de boştur ve deriveQuiz eski davranışına düşer.
    const earlier = briefs.filter((b) => b.index < brief.index);
    const review = {
      vocab: earlier.flatMap((b) => b.vocab),
      patterns: earlier.flatMap((b) => b.patterns),
    };
    questions = deriveQuiz(brief, pool, checkpoint ? 12 : 8, review, {
      whatMeans: (word) => t("quiz.what_means", { word }),
      howToSay: (pattern) => t("quiz.how_to_say", { pattern, target: courseName(course, lang) }),
      fromEarlier: t("quizw.from_earlier"),
    },
    /* İngilizce kursun kalıplarında `tr` bir kullanım notu, çeviri değil —
       soru o yüzden ters yönde sorulur (bkz. `PatternAsk`). */
    course === "en" ? "meaning" : "production");
  }
  if (!questions.length) notFound();

  return (
    <ImmersionQuizPlayer
      title={t(checkpoint ? "immw.checkpoint" : "immw.review")}
      subtitle={`${t("common.unit")} ${brief.index} · ${brief.theme}`}
      kind={checkpoint ? "checkpoint" : "quiz"}
      intro={t(checkpoint ? "quiz.intro_checkpoint" : "quiz.intro_review")}
      questions={questions}
    />
  );
}
