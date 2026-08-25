import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { findLesson, lessonIndexInLevel } from "@/lib/lessons";
import { characterFor } from "@/lib/lessons/characters";
import { LessonPlayer, type LessonExtras } from "@/components/lessons/lesson-player";
import { ensureProfile } from "@/lib/session";
import { nextLesson } from "@/lib/lessons/progress";
import { candoForLesson } from "@/lib/cando-map";
import { candoById } from "@/lib/cando";

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
  // Özet köprüleri (WP-62): dersin can-do ifadesi ve sıradaki ders sunucuda —
  // 121 can-do ve ders tahtası istemciye inmesin. Okunamazsa köprü yok, ders açılır.
  const extras: LessonExtras = {
    cando: candoForLesson(lesson).map((id) => candoById(id)?.tr).filter((t): t is string => Boolean(t)),
    next: null,
  };
  try {
    const profile = await ensureProfile(userId);
    const n = await nextLesson(userId, profile.course, profile.level);
    if (n && n.lesson.id !== lesson.id) extras.next = { id: n.lesson.id, title: n.lesson.title, titleTr: n.lesson.titleTr };
  } catch (err) {
    console.error("[lesson] sıradaki ders okunamadı", err);
  }
  return <LessonPlayer lesson={lesson} character={character} extras={extras} />;
}
