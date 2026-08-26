import { getUserId } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/session";
import { lessonBoard, lessonCount, nextLesson, weakRules } from "@/lib/lessons/progress";
import { scoredSteps } from "@/lib/lessons/types";
import { LessonHub, type HubCard } from "@/components/lessons/lesson-hub";
import { clearedModules } from "@/lib/lessons/boss";
import { passedModuleExams } from "@/lib/exam";

export const dynamic = "force-dynamic";

/**
 * Dersler — serbest sohbetin yerine geçen ana bölüm.
 *
 * Sıradaki ders sunucuda seçiliyor çünkü karar veriye bağlı: tekrarı gelmiş
 * ders varsa o, yoksa açılmamış ilk ders.
 */
export default async function LessonsPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const profile = await ensureProfile(userId);

  const board = await lessonBoard(userId, profile.course);
  const next = await nextLesson(userId, profile.course, profile.level);
  const weak = await weakRules(userId);
  // Yol haritasındaki taç modül SINAVINDAN geliyor; hız turunun en iyi
  // süresi düğümün altındaki ikincil satırda duruyor.
  const [cleared, passed] = await Promise.all([clearedModules(userId, profile.course), passedModuleExams(userId)]);

  const cards: HubCard[] = board.map((c) => ({
    lesson: c.lesson,
    // "Bitti" ölçüsü rol yapmayı da içeriyor: alıştırmaları geçip konuşmadan
    // çıkmak dersin asıl parçasını atlamak demek.
    done: Boolean(c.state?.roleplayDone),
    // Başlanmış ama bitmemiş ders ayrı bir durum. Önce yalnızca "bitti /
    // bitmedi" vardı ve dört alıştırmayı da doğru yapıp konuşmaya girmemiş bir
    // ders hiç dokunulmamış derslerden ayırt edilemiyordu — öğrenci
    // yaptıklarının hiçbir izini görmüyordu.
    started: Boolean(c.state) && !c.state?.roleplayDone,
    due: c.due,
    correct: c.state?.correct ?? 0,
    total: c.state?.total ?? scoredSteps(c.lesson),
    attempts: c.state?.attempts ?? 0,
  }));

  return (
    <LessonHub
      cards={cards}
      next={next?.lesson.id ?? null}
      weak={weak}
      total={lessonCount(profile.course)}
      userLevel={profile.level}
      cleared={Object.fromEntries(cleared)}
      passed={Object.fromEntries(passed)}
    />
  );
}
