import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { mockExamAttempts } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { mockPapersFor, mockSkillLabel, partPoints, type MockLevel, type MockSkill } from "@/lib/mock-exams";
import { mockCourseOf } from "@/lib/courses";
import { ChevronRightIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Deneme Sınavları" };
export const dynamic = "force-dynamic";

const LEVELS: MockLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Deneme sınavları — web.
 *
 * Kâğıtlar mobilde olduğu gibi BÖLÜM BÖLÜM açılıyor: bir kâğıt 80 ile 205
 * dakika arasında sürüyor ve tek oturumda çözülecek bir şey değil. Gerçek
 * sınavlar da modüler.
 *
 * Seviye seçimi sorgu parametresiyle; sayfa sunucuda çiziliyor, sekme için
 * istemci durumu taşımaya değmez (Beceriler sayfasıyla aynı düşünce).
 *
 * Üstteki iki blok veritabanından geliyor: yarım kalan denemeler ve bölüm
 * bazında ortalama. Aynı sayılar mobilin istatistik ekranında da var; kaynak
 * tek, `mock_exam_attempts`.
 *
 * KURS SÜZGECİ. Katalog kullanıcının HEDEF diline göre süzülüyor; Almanca
 * çalışan biri İngilizce kâğıt görmüyor. Aynı süzgeç veritabanı bloklarına da
 * uygulanıyor — `mock_exam_attempts` satırında kurs kolonu yok ama `paperId`
 * öneki kursu zaten taşıyor ("en-b1-01"). İki kursun denemeleri tek ortalamada
 * toplanırsa o ortalama hiçbir dilin becerisini söylemez.
 */
export default async function MockExamsPage({ searchParams }: { searchParams: Promise<{ level?: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const profile = await ensureProfile(userId);
  const { level: q } = await searchParams;
  const level = (LEVELS.includes(q as MockLevel) ? q : LEVELS.includes(profile.level as MockLevel) ? profile.level : "A1") as MockLevel;

  const course = mockCourseOf(profile.course);
  const papers = mockPapersFor(level, course);
  const [running, done] = await Promise.all([
    db
      .select({ id: mockExamAttempts.id, paperId: mockExamAttempts.paperId, skill: mockExamAttempts.skill, taskIx: mockExamAttempts.taskIx })
      .from(mockExamAttempts)
      .where(and(eq(mockExamAttempts.userId, userId), eq(mockExamAttempts.state, "running")))
      .orderBy(desc(mockExamAttempts.startedAt))
      .limit(5),
    db
      .select({ skill: mockExamAttempts.skill, score: mockExamAttempts.score, paperId: mockExamAttempts.paperId, passed: mockExamAttempts.passed })
      .from(mockExamAttempts)
      .where(and(eq(mockExamAttempts.userId, userId), isNotNull(mockExamAttempts.finishedAt)))
      .orderBy(desc(mockExamAttempts.finishedAt))
      .limit(100),
  ]);

  const mine = (paperId: string) => paperId.startsWith(`${course}-`);
  const bySkill = new Map<string, { n: number; sum: number; best: number }>();
  for (const r of done.filter((x) => mine(x.paperId))) {
    const s = bySkill.get(r.skill) ?? { n: 0, sum: 0, best: 0 };
    s.n++;
    s.sum += r.score;
    s.best = Math.max(s.best, r.score);
    bySkill.set(r.skill, s);
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <header>
        <h1 className="text-2xl font-bold">Deneme Sınavları</h1>
        <p className="muted mt-1 text-sm leading-relaxed">
          Her bölüm kendi başına çözülür ve kendi süresi vardır. Süre dolunca bir sonraki göreve otomatik geçilir ve
          bitmiş bir göreve geri dönülemez — gerçek dijital sınav oturumlarında olduğu gibi.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2" aria-label="Seviye">
        {LEVELS.map((l) => (
          <Link
            key={l}
            href={`/mock-exams?level=${l}`}
            className="rounded-full px-3 py-1.5 text-sm font-semibold"
            style={{
              background: l === level ? "var(--color-brand-soft)" : "var(--surface-2)",
              color: l === level ? "var(--color-brand)" : undefined,
            }}
          >
            {l}
          </Link>
        ))}
      </nav>

      {running.filter((r) => mine(r.paperId)).length ? (
        <section className="card p-4">
          <p className="muted text-xs font-bold tracking-wide">YARIM KALAN</p>
          {running.filter((r) => mine(r.paperId)).map((r) => (
            <Link key={r.id} href={`/mock-exams/${r.paperId}/${r.skill}`} className="mt-2 flex items-center justify-between rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
              <span className="text-sm font-semibold">
                {r.paperId.toUpperCase().replace(/^(DE|EN)-/, "")} · {mockSkillLabel(course, r.skill as MockSkill)}
                <span className="muted ml-2 font-normal">{r.taskIx + 1}. görevde kaldın</span>
              </span>
              <ChevronRightIcon className="size-4" />
            </Link>
          ))}
        </section>
      ) : null}

      {bySkill.size ? (
        <section className="card p-4">
          <p className="muted text-xs font-bold tracking-wide">BÖLÜMLERE GÖRE</p>
          {[...bySkill.entries()].map(([skill, v]) => {
            const avg = Math.round(v.sum / v.n);
            return (
              <div key={skill} className="mt-3">
                <div className="flex justify-between text-sm">
                  <span lang={course}>{mockSkillLabel(course, skill as MockSkill)}</span>
                  <span className="font-semibold" style={{ color: avg >= 60 ? "var(--color-success)" : "var(--color-danger)" }}>%{avg}</span>
                </div>
                <div className="mt-1 h-1 rounded-full" style={{ background: "var(--surface-2)" }}>
                  <div className="h-1 rounded-full" style={{ width: `${avg}%`, background: avg >= 60 ? "var(--color-success)" : "var(--color-danger)" }} />
                </div>
                <p className="muted mt-1 text-xs">{v.n} deneme · en iyi %{v.best}</p>
              </div>
            );
          })}
        </section>
      ) : null}

      {papers.length ? (
        papers.map((p) => (
          <section key={p.id} className="card p-4">
            <p className="muted text-xs font-bold tracking-wide">DENEME {p.no}</p>
            <h2 className="mt-0.5 text-lg font-bold" lang={course}>{p.theme}</h2>
            <p className="muted text-sm">{p.themeTr} · toplam {p.minutes} dakika</p>
            <div className="mt-3 space-y-2">
              {p.parts.map((part) => {
                const pts = partPoints(part);
                return (
                  <Link
                    key={part.skill}
                    href={`/mock-exams/${p.id}/${part.skill}`}
                    className="flex items-center justify-between rounded-xl p-3"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <span className="text-sm">
                      <span className="font-semibold" lang={course}>{mockSkillLabel(course, part.skill)}</span>
                      <span className="muted ml-2">{part.minutes} dk · {pts ? `${pts} madde` : "puanlanmaz"}</span>
                    </span>
                    <ChevronRightIcon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </section>
        ))
      ) : (
        <p className="card p-4 text-sm">{level} seviyesi için henüz deneme sınavı yok.</p>
      )}
    </div>
  );
}
