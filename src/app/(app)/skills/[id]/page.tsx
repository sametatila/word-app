import { notFound } from "next/navigation";
import { getExercise } from "@/lib/skills";
import { ReadingPlayer } from "@/components/skills/reading-player";
import { ListeningPlayer } from "@/components/skills/listening-player";
import { WritingPlayer } from "@/components/skills/writing-player";
import { SpeakingPlayer } from "@/components/skills/speaking-player";
import { DialoguePlayer } from "@/components/skills/dialogue-player";
import { MonologuePlayer } from "@/components/skills/monologue-player";

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
    case "speaking":
      // Konuşma iki biçimde gelir: tek tek söyleyiş çalışması ya da karşılıklı
      // diyalog. Ayrım içerikte: diyalogda `dialogue` alanı vardır.
      // Üçüncü biçim monolog (WP-21): `monologue` alanı.
      return "dialogue" in exercise ? (
        <DialoguePlayer exercise={exercise} />
      ) : "monologue" in exercise ? (
        <MonologuePlayer exercise={exercise} />
      ) : (
        <SpeakingPlayer exercise={exercise} />
      );
  }
}
