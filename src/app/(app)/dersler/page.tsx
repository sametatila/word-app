import { getUserId } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/session";
import { lessonBoard, lessonCount, nextLesson, weakRules } from "@/lib/lessons/progress";
import { LessonHub, type HubCard } from "@/components/lessons/lesson-hub";

export const dynamic = "force-dynamic";

/**
 * Dersler — serbest sohbetin yerine geçen ana bölüm.
 *
 * Sıradaki ders sunucuda seçiliyor çünkü karar veriye bağlı: tekrarı gelmiş
 * ders varsa o, yoksa açılmamış ilk ders.
 */
export default async function LessonsPage() {
  const userId = await getUserId();
  if (!userId) redirect("/giris");
  const profile = await ensureProfile(userId);

  const board = await lessonBoard(userId, profile.course);
  const next = await nextLesson(userId, profile.course);
  const weak = await weakRules(userId);

  const cards: HubCard[] = board.map((c) => ({
    lesson: c.lesson,
    // "Bitti" ölçüsü rol yapmayı da içeriyor: alıştırmaları geçip konuşmadan
    // çıkmak dersin asıl parçasını atlamak demek.
    done: Boolean(c.state?.roleplayDone),
    due: c.due,
    correct: c.state?.correct ?? 0,
    total: c.state?.total ?? c.lesson.checks.length,
  }));

  return (
    <LessonHub
      cards={cards}
      next={next?.lesson.id ?? null}
      weak={weak}
      total={lessonCount(profile.course)}
    />
  );
}
