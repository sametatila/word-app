import { notFound, redirect } from "next/navigation";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { isNativeLang } from "@/lib/i18n/dict";
import { localiseMockPaper } from "@/lib/conversations/native-server";
import { MockExamPlayer } from "@/components/mock-exam-player";
import { type MockPaper, type MockPart, type MockSkill } from "@/lib/mock-exams";
import { mockPaperById } from "@/lib/mock-exams/serve";
import { deliverPart } from "@/lib/mock-exams/deliver";
import { paperDisabled } from "@/lib/content/read";
import { canMockPaper } from "@/lib/premium/access";

export const generateMetadata = titleMeta("mockexams.title");
export const dynamic = "force-dynamic";

const SKILLS: MockSkill[] = ["reading", "listening", "writing", "speaking"];

/** Deneme sınavının tek bölümü — kâğıt kimliği ve beceri yoldan geliyor. */
export default async function MockExamPartPage({ params }: { params: Promise<{ paper: string; skill: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { paper: paperId, skill } = await params;
  const source = await mockPaperById(paperId);
  if (!source || !SKILLS.includes(skill as MockSkill)) notFound();

  /* KAPI SAYFADA DA (güvenlik denetimi 2026-10-03, Y2). Kâğıdı API'den
     (`/api/mock-exam`) alan mobil hem kapıdan hem `deliverPart`tan geçiyordu;
     bu sayfa kâğıdı doğrudan kaynaktan okuyup TAMAMINI istemci bileşenine
     veriyordu: kilitli kâğıt da, dört bölümün cevap anahtarı da RSC yüküyle
     tarayıcıya iniyordu. Kapı ve projeksiyon API'dekiyle aynı. Kilitli
     kâğıt listeye dönüyor; kilidi ve Premium yolunu orası anlatıyor. */
  if (await paperDisabled(paperId)) notFound();
  const gate = await canMockPaper(userId, paperId, source.level, source.course);
  if (!gate.allowed) redirect("/mock-exams");

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
  /* Yalnız çözülen bölüm ve `answer`/`accept`/`explain` çıkarılmış hâlde
     (`deliverPart`). Puan ve gerekçeler sonuçla birlikte sunucudan geliyor.
     Tip dönüşümü: oynatıcı maddeleri `MockItem` olarak çiziyor ama anahtar
     alanlarını OKUMUYOR; çalışma anında bu alanlar yok. */
  const delivered = deliverPart(paper, skill as MockSkill);
  if (!delivered) notFound();
  return (
    <div className="flex w-full flex-1 flex-col">
      <MockExamPlayer paper={delivered} part={delivered.part as unknown as MockPart} />
    </div>
  );
}
