import { notFound } from "next/navigation";
import { getExercise } from "@/lib/skills";
import { ReadingPlayer } from "@/components/skills/reading-player";
import { ListeningPlayer } from "@/components/skills/listening-player";
import { WritingPlayer } from "@/components/skills/writing-player";

export const dynamic = "force-dynamic";

/**
 * Immersion beceri item oynatıcısı (Faz 4). Eski `/skills/[id]` buraya taşındı;
 * /skills slug'ı kaldırıldı. Oynatıcılar aynen kullanılıyor ({exercise} propu),
 * ilerlemeyi kendileri POST /api/skills ile yazıyor. Immersion item'ları
 * (okuma/dinleme/yazma) bu rotaya bağlanır; "geri" oynatıcının içinden
 * /immersion'a döner.
 */
export default async function ImmersionSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = await getExercise(id);
  if (!exercise) notFound();

  switch (exercise.skill) {
    case "reading":
      return <ReadingPlayer exercise={exercise} />;
    case "listening":
      return <ListeningPlayer exercise={exercise} />;
    case "writing":
      return <WritingPlayer exercise={exercise} />;
    // Konuşma becerisi kaldırıldı (2026-08): içerik yok, bu dala düşmez.
    default:
      notFound();
  }
}
