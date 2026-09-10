import { notFound, redirect } from "next/navigation";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { isNativeLang } from "@/lib/i18n/dict";
import { localiseMockPaper } from "@/lib/lessons/native-server";
import { MockExamPlayer } from "@/components/mock-exam-player";
import { mockPaperById, type MockPaper, type MockSkill } from "@/lib/mock-exams";

export const generateMetadata = titleMeta("mockexams.title");
export const dynamic = "force-dynamic";

const SKILLS: MockSkill[] = ["reading", "listening", "writing", "speaking"];

/** Deneme sınavının tek bölümü — kâğıt kimliği ve beceri yoldan geliyor. */
export default async function MockExamPartPage({ params }: { params: Promise<{ paper: string; skill: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { paper: paperId, skill } = await params;
  const source = mockPaperById(paperId);
  if (!source || !SKILLS.includes(skill as MockSkill)) notFound();

  /* YÖNERGE, DURUM VE GEREKÇE öğrencinin dilinde. Metinlerin gövdesi, madde
     kökleri, şıklar ve karşı tarafın replikleri Almanca kalıyor — kâğıdın
     ölçtüğü şey onlar. Hep-ya-hiç: bir dize bile eksikse kâğıt tümüyle
     Türkçe kalıyor, çünkü yönergesine güvenilip gerekçesine güvenilemeyen
     bir sınav kâğıdı hiç çevrilmemişinden kötüdür.

     BÖLÜM ÇEVRİLMİŞ KÂĞITTAN alınıyor. Kaynaktan alınsaydı oynatıcı Almanca
     temanın altında Türkçe bir yönerge gösterirdi. */
  let paper: MockPaper = source;
  try {
    const profile = await ensureProfile(userId);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : null;
    paper = await localiseMockPaper(source, lang);
  } catch (err) {
    console.error("[mock-exam] localiseMockPaper", err);
  }
  const part = paper.parts.find((p) => p.skill === skill);
  if (!part) notFound();
  return (
    <div className="flex w-full flex-1 flex-col">
      <MockExamPlayer paper={paper} part={part} />
    </div>
  );
}
