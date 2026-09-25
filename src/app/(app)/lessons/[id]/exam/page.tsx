import { notFound, redirect } from "next/navigation";
import { getUserInfo } from "@/lib/auth/server";
import { lessonQuota } from "@/lib/premium/unlock-view";
import { findLesson } from "@/lib/lessons";
import { lessonDisabled } from "@/lib/content/read";
import { candoForLesson } from "@/lib/cando-map";
import { candoById } from "@/lib/cando";
import { RoleplayExam } from "@/components/lessons/roleplay-exam";
import { titleMeta } from "@/lib/page-meta";
import { ensureProfile } from "@/lib/session";
import { localiseLesson, nativeCando } from "@/lib/lessons/native-server";
import { isNativeLang } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

/** Dersin rol yapma sahnesi sınav olarak (WP-22): /lessons/[id]/exam. */
export const generateMetadata = titleMeta("scored.title");

export default async function LessonExamPage({ params }: { params: Promise<{ id: string }> }) {
  const who = await getUserInfo();
  if (!who) redirect("/login");
  const userId = who.id;
  const { id } = await params;
  const source = await findLesson(id);
  /* Ders kapatıldıysa sınavı da kapalı: aynı içeriğin türevi. */
  if (source && (await lessonDisabled(id))) notFound();
  if (!source) notFound();

  // Sahne, muhatap ve amaç dersin `roleplay` alanından geliyor; ekranın
  // tamamı öğrencinin ana dilinde olmalı — sınav sayfası da ders sayfasıyla
  // aynı çözücüden geçiyor.
  let lesson = source;
  let cando = candoForLesson(source).map((c) => candoById(c)?.tr).filter((t): t is string => Boolean(t));
  try {
    const profile = await ensureProfile(userId);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : null;
    lesson = await localiseLesson(source, lang);
    const en = await nativeCando(candoForLesson(source), lang);
    if (en) cando = en;
  } catch (err) {
    console.error("[rpexam]", err);
  }
  const quota = await lessonQuota(who, source).catch(() => null);
  return <RoleplayExam lesson={lesson} cando={cando} quota={quota} />;
}
