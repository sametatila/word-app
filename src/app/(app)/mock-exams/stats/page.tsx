import Link from "next/link";
import { PageBack } from "@/components/page-back";
import { getUserId } from "@/lib/auth/server";
import { mockStats } from "@/lib/mock-exams/stats";
import { mockPaperById } from "@/lib/mock-exams";
import { mockSkillLabel, type MockCourse, type MockSkill } from "@/lib/mock-exams/types";
import { ChevronRightIcon } from "@/components/icons";

export const dynamic = "force-dynamic";
export const metadata = { title: "Deneme istatistiği" };

/**
 * Deneme sınavı istatistiği — mobil `MockStatsScreen`in karşılığı.
 *
 * Web'de hiç yoktu: denemeler çözülüyor, sunucuda puanlanıyor ve
 * `mock_exam_attempts`e yazılıyordu ama o veriye bakılacak bir yer yoktu.
 * Yarım kalan bir deneme de yalnız liste ekranındaki rozetten anlaşılıyordu.
 *
 * SUNUCUDA çiziliyor: kâğıt adlarını çözmek için katalog gerekiyor ve o
 * katalog on bir kâğıdın tam metnini içeriyor — istemciye göndermek, bir
 * istatistik tablosu için yüz kilobaytlarca sınav metni indirmek olurdu.
 */
export default async function MockStatsPage() {
  const userId = await getUserId();
  if (!userId) return null;

  let data: Awaited<ReturnType<typeof mockStats>> | null = null;
  try {
    data = await mockStats(userId);
  } catch (err) {
    console.error("[mock-stats] okunamadı", err);
  }

  /*
    Bölüm adı SINAVIN dilinde yazılır ("Lesen" / "Reading"), arayüz dilinde
    değil — mobilde de öyle. Tek satırlık bir denemede dil kâğıttan çözülüyor;
    toplam kırılımda kâğıt yok, orada varsayılan kurs esas alınıyor.
  */
  const paperLabel = (id: string) => {
    const p = mockPaperById(id);
    return p ? `${p.level} · ${p.no}. deneme` : id;
  };
  const skillLabel = (skill: string, paperId?: string) => {
    const course = (paperId ? mockPaperById(paperId)?.course : null) ?? "de";
    return mockSkillLabel(course as MockCourse, skill as MockSkill);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <PageBack fallback="/mock-exams" title="Deneme istatistiği" />

      {!data || data.attempts === 0 ? (
        <>
          {data?.running.length ? <Running rows={data.running} paperLabel={paperLabel} skillLabel={skillLabel} /> : null}
          <p className="card p-5 text-body" style={{ color: "var(--text-muted)" }}>
            Henüz tamamlanmış bir deneme bölümü yok. Bir bölüm çözdüğünde
            puanın, becerilerin ve geçmişin burada birikir.
          </p>
        </>
      ) : (
        <>
          {data.running.length ? <Running rows={data.running} paperLabel={paperLabel} skillLabel={skillLabel} /> : null}

          <section className="card p-4">
            <p className="muted text-micro">BÖLÜME GÖRE</p>
            {data.bySkill.map((s) => {
              const ok = s.pct >= 60;
              const tone = ok ? "var(--color-mint)" : "var(--color-rose)";
              return (
                <div key={s.skill} className="mt-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-body">{skillLabel(s.skill)}</span>
                    <span className="text-strong" style={{ color: tone }}>%{s.pct}</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full" style={{ background: "var(--surface-2)" }}>
                    <div className="h-1 rounded-full" style={{ width: `${s.pct}%`, background: tone }} />
                  </div>
                  <p className="muted mt-0.5 text-micro">
                    {s.attempts} deneme · en iyi %{s.best}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="card p-4">
            <p className="muted text-micro">SEVİYEYE GÖRE</p>
            {data.byLevel.map((l) => (
              <div key={l.level} className="mt-2 flex justify-between">
                <span className="text-body">{l.level}</span>
                <span className="text-strong">
                  {l.attempts} denemeden {l.passed} geçti
                </span>
              </div>
            ))}
          </section>

          <section className="card p-4">
            <p className="muted text-micro">GEÇMİŞ</p>
            {data.recent.map((r) => (
              <div key={r.id} className="mt-2 flex items-center justify-between gap-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-body">
                    {paperLabel(r.paperId)} · {skillLabel(r.skill, r.paperId)}
                  </span>
                  <span className="muted block text-micro">
                    {r.correct}/{r.total} doğru
                  </span>
                </span>
                <span
                  className="shrink-0 text-strong"
                  style={{ color: r.passed ? "var(--color-mint)" : "var(--color-rose)" }}
                >
                  %{r.score}
                </span>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

/** Yarım kalan denemeler — dokununca kaldığı görevden sürüyor. */
function Running({
  rows,
  paperLabel,
  skillLabel,
}: {
  rows: { id: number; paperId: string; skill: string; level: string; taskIx: number }[];
  paperLabel: (id: string) => string;
  skillLabel: (skill: string, paperId?: string) => string;
}) {
  return (
    <section className="card p-4">
      <p className="muted text-micro">YARIM KALAN</p>
      {rows.map((r) => (
        <Link
          key={r.id}
          href={`/mock-exams/${r.paperId}/${r.skill}`}
          prefetch={false}
          className="pressable mt-2 flex items-center gap-3 rounded-tile px-3 py-2"
          style={{ background: "var(--surface-2)" }}
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-strong">
              {paperLabel(r.paperId)} · {skillLabel(r.skill, r.paperId)}
            </span>
            <span className="muted block text-micro">{r.taskIx + 1}. görevde kaldı</span>
          </span>
          <ChevronRightIcon size={20} className="muted shrink-0" />
        </Link>
      ))}
    </section>
  );
}
