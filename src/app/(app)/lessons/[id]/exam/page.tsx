import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { findLesson } from "@/lib/lessons";
import { candoForLesson } from "@/lib/cando-map";
import { candoById } from "@/lib/cando";
import { RoleplayExam } from "@/components/lessons/roleplay-exam";

export const dynamic = "force-dynamic";

/** Dersin rol yapma sahnesi sınav olarak (WP-22): /lessons/[id]/exam. */
export default async function LessonExamPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { id } = await params;
  const lesson = findLesson(id);
  if (!lesson) notFound();
  const cando = candoForLesson(lesson).map((c) => candoById(c)?.tr).filter((t): t is string => Boolean(t));
  return <RoleplayExam lesson={lesson} cando={cando} />;
}
