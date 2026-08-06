import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { findLesson } from "@/lib/lessons";
import { LessonPlayer } from "@/components/lessons/lesson-player";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { id } = await params;
  const lesson = findLesson(id);
  if (!lesson) notFound();
  return <LessonPlayer lesson={lesson} />;
}
