import { notFound } from "next/navigation";
import { getExercise } from "@/lib/skills";
import { ReadingPlayer } from "@/components/skills/reading-player";
import { ListeningPlayer } from "@/components/skills/listening-player";
import { WritingPlayer } from "@/components/skills/writing-player";

export const dynamic = "force-dynamic";

/** Tek egzersiz sayfası: türe göre uygun oynatıcıyı açar. */
export default async function SkillExercisePage({
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
  }
}
