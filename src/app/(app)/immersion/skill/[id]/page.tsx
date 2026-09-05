import { notFound } from "next/navigation";
import { getExercise } from "@/lib/skills";
import { ReadingPlayer } from "@/components/skills/reading-player";
import { ListeningPlayer } from "@/components/skills/listening-player";
import { WritingPlayer } from "@/components/skills/writing-player";
import { SpeakingPlayer } from "@/components/skills/speaking-player";

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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const exercise = await getExercise(id);
  if (!exercise) notFound();
  // Aynı oynatıcıya iki yerden giriliyor; "geri" nereden gelindiyse oraya
  // dönmeli, yoksa Beceriler'den giren kullanıcı Patika'ya düşüyor.
  const from = (await searchParams)?.from;
  const backHref = from === "skills" ? "/skills" : "/immersion";

  switch (exercise.skill) {
    case "reading":
      return <ReadingPlayer exercise={exercise} backHref={backHref} />;
    case "listening":
      return <ListeningPlayer exercise={exercise} backHref={backHref} />;
    case "writing":
      return <WritingPlayer exercise={exercise} backHref={backHref} />;
    // Konuşma 2026-09'da geri geldi: A1 için 8 ses çalışması yazıldı ve
    // oynatıcısı olmadığı için yalnız sınavdan görülebiliyorlardı.
    case "speaking":
      return <SpeakingPlayer exercise={exercise} backHref={backHref} />;
    default:
      notFound();
  }
}
