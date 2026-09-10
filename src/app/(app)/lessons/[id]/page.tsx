import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { findLesson, lessonIndexInLevel } from "@/lib/lessons";
import { characterFor } from "@/lib/lessons/characters";
import { LessonPlayer, type LessonExtras } from "@/components/lessons/lesson-player";
import { ensureProfile } from "@/lib/session";
import { nextLesson } from "@/lib/lessons/progress";
import { candoForLesson } from "@/lib/cando-map";
import { candoById } from "@/lib/cando";
import { titleMeta } from "@/lib/page-meta";
import { localiseLesson, nativeTitle, nativeCando } from "@/lib/lessons/native-server";
import { isNativeLang } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("unitkind.lesson");

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { id } = await params;
  const source = findLesson(id);
  if (!source) notFound();
  // Karakter sunucuda hesaplanıyor: türetmesi ders kataloğunu gerektiriyor ve
  // 202 dersin tamamını istemci paketine sokmanın anlamı yok.
  const character = characterFor(source, lessonIndexInLevel(source));
  // Özet köprüleri (WP-62): dersin can-do ifadesi ve sıradaki ders sunucuda —
  // 121 can-do ve ders tahtası istemciye inmesin. Okunamazsa köprü yok, ders açılır.
  const extras: LessonExtras = {
    cando: candoForLesson(source).map((id) => candoById(id)?.tr).filter((t): t is string => Boolean(t)),
    next: null,
  };
  let lesson = source;
  try {
    const profile = await ensureProfile(userId);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : null;
    lesson = await localiseLesson(source, lang);
    // Can-do köprüsü de ana dilde: `Cando` tipinde yalnız `tr` var, İngilizcesi
    // kendi hattında duruyor (`data/lessons/cando/`, anahtar `A1.SPK.1`).
    const cando = await nativeCando(candoForLesson(source), lang);
    if (cando) extras.cando = cando;
    const n = await nextLesson(userId, profile.course, profile.level);
    if (n && n.lesson.id !== lesson.id) {
      const titleTr = (await nativeTitle(n.lesson.id, lang)) ?? n.lesson.titleTr;
      extras.next = { id: n.lesson.id, title: n.lesson.title, titleTr };
    }
  } catch (err) {
    console.error("[lesson] sıradaki ders okunamadı", err);
  }
  return <LessonPlayer lesson={lesson} character={character} extras={extras} />;
}
