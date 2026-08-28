import { notFound } from "next/navigation";
import { unitBriefs } from "@/lib/immersion/brief";
import { unitQuestions } from "@/lib/immersion/content";
import type { CefrLevel } from "@/lib/skills/types";
import { ImmersionQuizPlayer } from "@/components/immersion/quiz-player";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion gramer oynatıcı rotası.
 *
 * [unit] = ünite kimliği. Gramer türetilemez (gerçek dilbilgisi kavramı ister),
 * bu yüzden yalnızca ELLE YAZILMIŞ gramer içeriği olan üniteler için çalışır
 * (registry). Yoksa 404 — hub'da zaten "yakında" görünür, bağlanmaz.
 */
export default async function ImmersionGrammarPage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;

  const authored = unitQuestions(unit);
  if (!authored?.grammar?.length) notFound();

  // Alt başlık için ünite temasını çöz (`de-a1-u02` → de / A1 / 2).
  const [left, num] = unit.split("-u");
  const parts = left.split("-");
  const levelRaw = parts.pop() ?? "";
  const course = parts.join("-");
  const level = levelRaw.toUpperCase() as CefrLevel;
  const index = Number.parseInt(num ?? "", 10);
  const brief = course && LEVELS.includes(level) ? unitBriefs(course, level).find((b) => b.index === index) : undefined;

  return (
    <ImmersionQuizPlayer
      title="Dil bilgisi"
      subtitle={brief ? `Ünite ${brief.index} · ${brief.theme}` : "Dil bilgisi alıştırması"}
      questions={authored.grammar}
    />
  );
}
