import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { findLesson, lessonIndexInLevel } from "@/lib/lessons";
import { characterFor } from "@/lib/lessons/characters";
import { LessonPlayer } from "@/components/lessons/lesson-player";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { id } = await params;
  const lesson = findLesson(id);
  if (!lesson) notFound();
  // Karakter sunucuda hesaplanıyor: türetmesi ders kataloğunu gerektiriyor ve
  // 202 dersin tamamını istemci paketine sokmanın anlamı yok.
  const character = characterFor(lesson, lessonIndexInLevel(lesson));
  return <LessonPlayer lesson={lesson} character={character} />;
}
