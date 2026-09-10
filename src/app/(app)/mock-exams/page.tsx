import { titleMeta } from "@/lib/page-meta";
import { PageBack } from "@/components/page-back";
import Link from "next/link";
import { redirect } from "next/navigation";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { mockExamAttempts } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { mockPapersFor, mockSkillLabel, partPoints, type MockLevel, type MockSkill } from "@/lib/mock-exams";
import { mockCourseOf } from "@/lib/courses";
import { mockAccess } from "@/lib/premium/access";
import { ChevronRightIcon, LockIcon } from "@/components/icons";
import { getT, getLang } from "@/lib/i18n/server";
import { formatPercent } from "@/lib/i18n/dict";

export const generateMetadata = titleMeta("mockexams.title");
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
  const t = await getT();
  const lang = await getLang();
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const profile = await ensureProfile(userId);
  const { level: q } = await searchParams;
  const level = (LEVELS.includes(q as MockLevel) ? q : LEVELS.includes(profile.level as MockLevel) ? profile.level : "A1") as MockLevel;

  const course = mockCourseOf(profile.course);
  const papers = mockPapersFor(level, course);

  /*
    Kelime kapsamı: pekişmiş kelimenin kursun toplamına oranı (mobil
    `MockExamsScreen` `overallPct` ile aynı hesap). Okunamazsa kart yalnız
    seviyeyi gösteriyor — sınav listesi bu sayıya bağlı değil.
  */
  const coverage = await getProgress(userId, new Date().toISOString().slice(0, 10))
    .then((pr) => {
      const total = pr.levels.reduce((a, l) => a + l.total, 0);
      const mastered = pr.levels.reduce((a, l) => a + l.mastered, 0);
      return total ? Math.min(100, Math.round((mastered / total) * 100)) : null;
    })
    .catch((err) => {
      console.error("[mock-exams] kapsam okunamadı", err);
      return null;
    });
  /*
   * KİLİT LİSTEDE GÖRÜNÜYOR.
   *
   * Kâğıt kilidi sunucuda hep vardı ama yalnız sınav BAŞLARKEN sınanıyordu:
   * liste elli kâğıdı da açık gibi çiziyor, kullanıcı ikinci kâğıda giriyor ve
   * ancak orada "kilitli" cevabını alıyordu. Kilitli kâğıt artık kilitli
   * görünüyor ve oynatıcıya değil plan sayfasına götürüyor.
   */
  const access = await mockAccess(userId, level, course).catch((err) => {
    console.error("[mock-exams access]", err);
    return null;
  });
  const isLocked = (id: string) => (access ? !access.unlocked.includes(id) : false);

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
      <PageBack fallback="/skills" title={t("mockexams.title")}>
        {/* İstatistiğin kapısı burada: liste "ne çözeyim", istatistik "nasıl
            gidiyorum" sorusunun yeri ve ikisi aynı ekranda yarışmamalı. */}
        <Link
          href="/mock-exams/stats"
          prefetch={false}
          className="btn btn-ghost h-11 shrink-0 px-3.5 text-caption"
        >
          {t("mockstats.title")}
        </Link>
      </PageBack>
      {/*
        SEVİYE + KELİME KAPSAMI kartı — mobil `MockExamsScreen`in ilk kartı.
        Web'de hiç yoktu. Sınav listesine bakan kişinin ilk sorusu "hangi
        seviyedeyim ve hazır mıyım"; kapsam yüzdesi o sorunun tek sayısal
        cevabı ve kâğıtları seçmeden önce görülmesi gereken şey.
      */}
      <section className="card flex items-center justify-between gap-4 p-4">
        <span>
          <span className="muted block text-micro">{t("mockexams.level")}</span>
          <span className="block text-h1" style={{ color: "var(--color-brand)" }}>{level}</span>
        </span>
        {coverage !== null ? (
          <span className="text-right">
            <span className="muted block text-micro">{t("mockexams.word_coverage")}</span>
            <span className="block text-h1">{formatPercent(coverage, lang)}</span>
          </span>
        ) : null}
      </section>

      <nav className="flex flex-wrap gap-2" aria-label={t("mockexams.level")}>
        {LEVELS.map((l) => (
          <Link
            key={l}
            href={`/mock-exams?level=${l}`}
            className="rounded-full px-3 py-1.5 text-sm font-semibold"
            style={{
              background: l === level ? "var(--brand-soft)" : "var(--surface-2)",
              color: l === level ? "var(--color-brand)" : undefined,
            }}
          >
            {l}
          </Link>
        ))}
      </nav>

      {/* Giriş metni çiplerin ALTINDA — mobildeki sıra. Üstteyken seviye
          seçicisini aşağı itiyor, "hangi seviyeyi çözeyim" sorusunun cevabını
          bir paragrafın arkasına koyuyordu. */}
      <p className="muted text-body">
        {t("mockexams.intro_web")}
      </p>

      {/* Kaç kâğıdın açık olduğu LİSTEDEN ÖNCE söyleniyor: kuralı kilide
          çarptıktan sonra öğrenmek, kuralı hiç söylememekle aynı şey. */}
      {access && !access.premium ? (
        <p className="muted text-caption">{t("mockpack.free_note", { n: access.freeLimit })}</p>
      ) : null}
      {access && access.premium && papers.some((p) => isLocked(p.id)) ? (
        <p className="muted text-caption">
          {access.unlockOnComplete
            ? t("mockpack.unlock_hint_both", { pct: access.unlockPct })
            : t("mockpack.unlock_hint_score", { pct: access.unlockPct })}
        </p>
      ) : null}

      {running.filter((r) => mine(r.paperId)).length ? (
        <section className="card p-4">
          <p className="muted text-xs font-bold tracking-wide">{t("mockstats.running")}</p>
          {running.filter((r) => mine(r.paperId)).map((r) => (
            <Link key={r.id} href={`/mock-exams/${r.paperId}/${r.skill}`} className="mt-2 flex items-center justify-between rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
              <span className="text-sm font-semibold">
                {r.paperId.toUpperCase().replace(/^(DE|EN)-/, "")} · {mockSkillLabel(course, r.skill as MockSkill)}
                <span className="muted ml-2 font-normal">{t("mockstats.at_task", { n: r.taskIx + 1 })}</span>
              </span>
              <ChevronRightIcon className="size-4" />
            </Link>
          ))}
        </section>
      ) : null}

      {bySkill.size ? (
        <section className="card p-4">
          <p className="muted text-xs font-bold tracking-wide">{t("mockstats.by_skill")}</p>
          {[...bySkill.entries()].map(([skill, v]) => {
            const avg = Math.round(v.sum / v.n);
            return (
              <div key={skill} className="mt-3">
                <div className="flex justify-between text-sm">
                  <span lang={course}>{mockSkillLabel(course, skill as MockSkill)}</span>
                  <span className="font-semibold" style={{ color: avg >= 60 ? "var(--color-success)" : "var(--color-danger)" }}>{t("common.pct", { n: avg })}</span>
                </div>
                <div className="mt-1 h-1 rounded-full" style={{ background: "var(--surface-2)" }}>
                  <div className="h-1 rounded-full" style={{ width: `${avg}%`, background: avg >= 60 ? "var(--color-success)" : "var(--color-danger)" }} />
                </div>
                <p className="muted mt-1 text-xs">{t("mockstats.attempts_best", { n: v.n, best: v.best })}</p>
              </div>
            );
          })}
        </section>
      ) : null}

      {papers.length ? (
        papers.map((p) => {
          const locked = isLocked(p.id);
          return (
          <section key={p.id} className="card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="muted text-xs font-bold tracking-wide">{t("mockexams.paper", { n: p.no })}</p>
              {locked ? (
                <span className="chip flex items-center gap-1 px-2 py-0.5 text-micro font-bold">
                  <LockIcon className="size-3.5" /> {t("mockpack.locked")}
                </span>
              ) : null}
            </div>
            <h2 className="mt-0.5 text-lg font-bold" lang={course}>{p.theme}</h2>
            <p className="muted text-sm">{p.themeTr} · {t("mockexams.minutes", { n: p.minutes })}</p>
            <div className={`mt-3 space-y-2${locked ? " opacity-60" : ""}`}>
              {p.parts.map((part) => {
                const pts = partPoints(part);
                const inner = (
                  <>
                    <span className="text-sm">
                      <span className="font-semibold" lang={course}>{mockSkillLabel(course, part.skill)}</span>
                      <span className="muted ml-2">
                        {pts
                          ? t("mockexams.part_summary", { minutes: part.minutes, n: pts })
                          : t("mockexams.part_open", { minutes: part.minutes })}
                      </span>
                    </span>
                    {locked ? <LockIcon className="size-4" /> : <ChevronRightIcon className="size-4" />}
                  </>
                );
                /* Kilitli bölüm oynatıcıya BAĞLANMIYOR: bağlantı bırakılsaydı
                   tıklayan kişi yine sınavın içinde 403 görürdü. */
                return locked ? (
                  <div
                    key={part.skill}
                    aria-disabled
                    className="flex items-center justify-between rounded-xl p-3"
                    style={{ background: "var(--surface-2)" }}
                  >
                    {inner}
                  </div>
                ) : (
                  <Link
                    key={part.skill}
                    href={`/mock-exams/${p.id}/${part.skill}`}
                    className="flex items-center justify-between rounded-xl p-3"
                    style={{ background: "var(--surface-2)" }}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
            {locked && !access?.premium ? (
              <Link href="/premium" prefetch={false} className="btn btn-primary mt-3 w-full px-4 py-2.5 text-sm">
                {t("gate.see_plans")}
              </Link>
            ) : null}
          </section>
          );
        })
      ) : (
        <p className="card p-4 text-sm">{t("mockexams.none_for_level", { level })}</p>
      )}
    </div>
  );
}
