import { notFound } from "next/navigation";
import { getT, getLang } from "@/lib/i18n/server";
import { nativeUnitBriefs } from "@/lib/immersion/brief";
import { localiseConversation } from "@/lib/conversations/native-server";
import { unitQuestions } from "@/lib/immersion/content";
import { deriveGrammar } from "@/lib/immersion/grammar";
import { mockBoolLabels } from "@/lib/mock-exams/types";
import { conversationsFor } from "@/lib/conversations/index";
import type { CefrLevel } from "@/lib/skills/types";
import { ImmersionQuizPlayer } from "@/components/immersion/quiz-player";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion gramer oynatıcı rotası.
 *
 * [unit] = ünite kimliği. Elle yazılmış gramer varsa o kullanılır; yoksa
 * ünitenin KENDİ konuşmalarından türetilir (bkz. lib/immersion/grammar.ts).
 *
 * Eskiden burada "gramer türetilemez" yazıyordu ve yalnız kayıtlı ünite
 * çalışıyordu. Sonuç: 145 ünitenin 144'ünde adım "yakında" olarak duruyordu.
 * Oysa konuşma katmanı gereken malzemeyi taşıyor — hüküm adımları (gerekçesiyle)
 * ve üretim hedefleri. Türetme onları kullanıyor, hiçbir şey uydurmuyor.
 */
export const generateMetadata = titleMeta("unitkind.grammar");

export default async function ImmersionGrammarPage({ params }: { params: Promise<{ unit: string }> }) {
  const t = await getT();
  const lang = await getLang();
  const { unit } = await params;

  const authored = unitQuestions(unit);

  // Ünite temasını ve konuşmalarını çöz (`de-a1-u02` → de / A1 / 2).
  const [left, num] = unit.split("-u");
  const parts = left.split("-");
  const levelRaw = parts.pop() ?? "";
  const course = parts.join("-");
  const level = levelRaw.toUpperCase() as CefrLevel;
  const index = Number.parseInt(num ?? "", 10);
  const brief =
    course && LEVELS.includes(level)
      ? (await nativeUnitBriefs(course, level, lang, (l) => localiseConversation(l, lang))).find(
          (b) => b.index === index,
        )
      : undefined;

  let questions = authored?.grammar ?? [];
  if (!questions.length && course && LEVELS.includes(level) && Number.isInteger(index)) {
    const konusmalar = (await conversationsFor(course)).filter((l) => l.level === level);
    questions = deriveGrammar(unit, konusmalar.slice((index - 1) * 4, (index - 1) * 4 + 4), 8, {
      orderQuestion: t("quiz.order_question"),
      orderSentence: t("quiz.order_sentence"),
      bool: mockBoolLabels(course === "en" ? "en" : "de", "truefalse"),
    });
  }
  /* Soru yoksa 404 yalnız ünite de çözülemediyse (yanlış adres). Ünite varsa
     oynatıcı "henüz soru yok" durumunu çiziyor — mobil `QuizScreen` gibi. */
  if (!questions.length && !brief) notFound();

  return (
    <ImmersionQuizPlayer
      title={t("skills.grammar")}
      subtitle={brief ? `${t("common.unit")} ${brief.index} · ${brief.theme}` : t("immw.grammar_exercise")}
      /* Dil bilgisi turunun kendi giriş cümlesi YOKTU: elde yalnız "bu
         ünitenin kelime ve kalıplarından karışık hatırlama" vardı ve dil
         bilgisi alıştırması için yanlış olduğu için web hiç göstermiyordu.
         Doğru cümle yazıldı, mobil de aynısını kullanıyor. */
      kind="grammar"
      itemId={`${unit}-grammar1`}
      unitNo={brief?.index ?? null}
      intro={t("quiz.intro_grammar")}
      questions={questions}
    />
  );
}
