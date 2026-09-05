import type { Metadata } from "next";
import Link from "next/link";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { listExerciseMeta, type SkillMeta } from "@/lib/skills";
import { immersionCompletion } from "@/lib/immersion/progress";
import { SKILL_LABELS, SKILL_ORDER } from "@/lib/skills/meta";
import { LEVEL_TONE, SKILL_ICON } from "@/components/skills/theme";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { moduleExamPlan } from "@/lib/lessons/module-exam";
import type { CefrLevel } from "@/lib/skills/types";

export const metadata: Metadata = { title: "Beceriler" };
export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];


/**
 * Beceriler — Patika'nın YANINDAKİ serbest çalışma yüzeyi.
 *
 * NEDEN VAR: Patika ünite başına iki okuma, iki dinleme, iki yazma yuvası
 * açıyor ve havuzu liste sırasıyla imleçle tüketiyor (immersion/build.ts).
 * A1'de 62 okuma egzersizi var ama yuva 50; fazlası patikada HİÇ
 * zamanlanmıyor. Mobilde bu içerik Beceriler ekranından açılabiliyordu,
 * web'de bu sayfa yer tutucu olduğu için hiçbir yerden açılamıyordu — yazılmış
 * ve veritabanına yüklenmiş içerik web kullanıcısına görünmüyordu.
 *
 * Bu sayfa sıralamaya karışmaz: patikanın hangi egzersizi hangi üniteye
 * koyduğu değişmez. Yalnızca TAMAMINI listeler, bitenleri işaretler ve
 * oynatıcıya bağlar. Patikanın zamanlaması müfredat, bu sayfa kütüphane.
 *
 * Seviye seçimi sorgu parametresiyle: sayfa sunucuda çiziliyor, sekme için
 * istemci durumu taşımaya değmez.
 */
export default async function SkillsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getUserInfo();
  if (!user) return null;

  let course = "de";
  let profileLevel: CefrLevel = "A1";
  try {
    const profile = await ensureProfile(user.id, user.name);
    course = profile.course;
    if (LEVELS.includes(profile.level as CefrLevel)) profileLevel = profile.level as CefrLevel;
  } catch (err) {
    console.error("[skills] profil okunamadı", err);
  }

  const wanted = (await searchParams)?.level;
  const level = LEVELS.includes(wanted as CefrLevel) ? (wanted as CefrLevel) : profileLevel;

  const metas = await listExerciseMeta(course);
  const atLevel = metas.filter((m) => m.level === level);

  // İlerleme okunamazsa liste yine çizilir, yalnız hiçbir şey "bitti"
  // görünmez — boş ekran vermekten iyi.
  let done: (id: string) => boolean = () => false;
  try {
    const completion = await immersionCompletion(user.id, course);
    done = completion.skillDone;
  } catch (err) {
    console.error("[skills] ilerleme okunamadı", err);
  }

  const withContent = LEVELS.filter((lv) => metas.some((m) => m.level === lv));
  const doneCount = atLevel.filter((m) => done(m.id)).length;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <header className="mb-4">
        <h1 className="text-2xl font-extrabold">Beceriler</h1>
        <p className="muted mt-1 text-sm">
          Patika sıradaki adımı seçer; burada tüm okuma, dinleme, yazma ve ses
          çalışmalarına istediğin sırayla girebilirsin.
        </p>
      </header>

      {withContent.length > 1 ? (
        <nav className="mb-4 flex flex-wrap gap-2" aria-label="Seviye">
          {withContent.map((lv) => {
            const active = lv === level;
            return (
              <Link
                key={lv}
                href={`/skills?level=${lv}`}
                aria-current={active ? "page" : undefined}
                className="rounded-lg border px-3 py-1.5 text-sm font-bold"
                style={{
                  borderColor: active ? "transparent" : "var(--border)",
                  background: active ? (LEVEL_TONE[lv] ?? "var(--color-brand)") : "transparent",
                  color: active ? "#fff" : "var(--text-muted)",
                }}
              >
                {lv}
              </Link>
            );
          })}
        </nav>
      ) : null}

      {atLevel.length ? (
        <p className="muted mb-3 text-xs font-semibold">
          {level} · {doneCount}/{atLevel.length} tamamlandı
        </p>
      ) : null}

      {SKILL_ORDER.map((skill) => {
        const list = atLevel.filter((m) => m.skill === skill);
        if (!list.length) return null;
        const Icon = SKILL_ICON[skill];
        return (
          <section key={skill} className="mb-5">
            <h2 className="mb-2 flex items-center gap-2 px-1 text-sm font-bold">
              <Icon size={16} />
              {SKILL_LABELS[skill]}
              <span className="muted font-semibold">({list.length})</span>
            </h2>
            <ul className="card divide-y" style={{ borderColor: "var(--border)" }}>
              {list.map((m) => (
                <li key={m.id}>
                  <Row meta={m} done={done(m.id)} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {!atLevel.length ? (
        <p className="card p-5 text-sm" style={{ color: "var(--text-muted)" }}>
          Bu atLevel henüz beceri çalışması yok.
        </p>
      ) : null}

      <ExamSection level={level} />
    </div>
  );
}

function Row({ meta, done }: { meta: SkillMeta; done: boolean }) {
  return (
    <Link
      href={`/immersion/skill/${meta.id}?from=skills`}
      className="flex items-center gap-3 px-4 py-3"
    >
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: done ? "var(--color-mint)" : "var(--border)" }}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{meta.title}</span>
        <span className="muted block text-xs">
          {meta.genre} · {meta.minutes} dk · {meta.items} madde
        </span>
      </span>
      {done ? (
        <CheckIcon size={16} className="shrink-0 text-[color:var(--color-mint)]" />
      ) : (
        <ChevronRightIcon size={18} className="shrink-0" style={{ color: "var(--text-faint)" }} />
      )}
    </Link>
  );
}

/**
 * Sınavlar — web'de HİÇBİR YERDEN açılamıyordu.
 *
 * `/exam/[level]` ve `/exam/[level]/[module]` rotaları aylardır duruyor ve
 * çalışıyor, ama onlara giden tek bir bağlantı yoktu: modül kâğıtları ve
 * seviye sınavı yazılmış, denetlenmiş, ama tıklanamıyordu. Mobilde ExamPrep
 * ekranı var, web'de karşılığı yoktu.
 *
 * Buraya konuldu çünkü Beceriler zaten "patikanın dışındaki çalışma yüzeyi":
 * sıradaki adımı Patika seçer, burada öğrenci ne çalışacağını kendi seçer —
 * sınav da öyle bir şey.
 *
 * Ön koşul burada KONTROL EDİLMİYOR: sınav motoru modül derslerinin %80'i
 * geçilmediyse kâğıdı "deneme" olarak veriyor (sayılmaz, sertifika yok).
 * Kapıyı burada da kapatmak, hazır olup olmadığını merak eden öğrenciyi
 * bilgisiz bırakırdı; motor zaten dürüst davranıyor.
 */
function ExamSection({ level }: { level: CefrLevel }) {
  const modules = [...Array(21).keys()]
    .map((i) => ({ index: i, plan: moduleExamPlan(level, i) }))
    .filter((m): m is { index: number; plan: NonNullable<ReturnType<typeof moduleExamPlan>> } => Boolean(m.plan));
  if (!modules.length) return null;

  return (
    <section className="mb-5">
      <h2 className="mb-2 px-1 text-sm font-bold">Sınavlar</h2>
      <ul className="card divide-y" style={{ borderColor: "var(--border)" }}>
        <li>
          <Link href={`/exam/${level}`} className="flex items-center gap-3 px-4 py-3">
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{level} seviye sınavı</span>
              <span className="muted block text-xs">45 dk · beş bölüm</span>
            </span>
            <ChevronRightIcon size={18} className="shrink-0" style={{ color: "var(--text-faint)" }} />
          </Link>
        </li>
        {modules.map(({ index, plan }) => (
          <li key={plan.code}>
            <Link href={`/exam/${level}/${index}`} className="flex items-center gap-3 px-4 py-3">
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">
                  {plan.code} · {plan.titleTr}
                </span>
                <span className="muted block truncate text-xs" lang="de">
                  {plan.titleDe} · 20 dk
                </span>
              </span>
              <ChevronRightIcon size={18} className="shrink-0" style={{ color: "var(--text-faint)" }} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
