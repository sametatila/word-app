import type { Metadata } from "next";
import Link from "next/link";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { listExerciseMeta, type SkillMeta } from "@/lib/skills";
import { immersionCompletion } from "@/lib/immersion/progress";
import { SKILL_LABELS } from "@/lib/skills/meta";
import { LEVEL_TONE, SKILL_ICON } from "@/components/skills/theme";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import type { CefrLevel, SkillId } from "@/lib/skills/types";

export const metadata: Metadata = { title: "Beceriler" };
export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];
const SKILLS: SkillId[] = ["reading", "listening", "writing", "speaking"];

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

  const istenen = (await searchParams)?.level;
  const level = LEVELS.includes(istenen as CefrLevel) ? (istenen as CefrLevel) : profileLevel;

  const metas = await listExerciseMeta(course);
  const seviyede = metas.filter((m) => m.level === level);

  let done = (_: string) => false;
  try {
    const completion = await immersionCompletion(user.id, course);
    done = completion.skillDone;
  } catch (err) {
    console.error("[skills] ilerleme okunamadı", err);
  }

  const varOlan = LEVELS.filter((lv) => metas.some((m) => m.level === lv));
  const bitenSayisi = seviyede.filter((m) => done(m.id)).length;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <header className="mb-4">
        <h1 className="text-2xl font-extrabold">Beceriler</h1>
        <p className="muted mt-1 text-sm">
          Patika sıradaki adımı seçer; burada tüm okuma, dinleme, yazma ve ses
          çalışmalarına istediğin sırayla girebilirsin.
        </p>
      </header>

      {varOlan.length > 1 ? (
        <nav className="mb-4 flex flex-wrap gap-2" aria-label="Seviye">
          {varOlan.map((lv) => {
            const aktif = lv === level;
            return (
              <Link
                key={lv}
                href={`/skills?level=${lv}`}
                aria-current={aktif ? "page" : undefined}
                className="rounded-lg border px-3 py-1.5 text-sm font-bold"
                style={{
                  borderColor: aktif ? "transparent" : "var(--border)",
                  background: aktif ? (LEVEL_TONE[lv] ?? "var(--color-brand)") : "transparent",
                  color: aktif ? "#fff" : "var(--text-muted)",
                }}
              >
                {lv}
              </Link>
            );
          })}
        </nav>
      ) : null}

      {seviyede.length ? (
        <p className="muted mb-3 text-xs font-semibold">
          {level} · {bitenSayisi}/{seviyede.length} tamamlandı
        </p>
      ) : null}

      {SKILLS.map((skill) => {
        const liste = seviyede.filter((m) => m.skill === skill);
        if (!liste.length) return null;
        const Icon = SKILL_ICON[skill];
        return (
          <section key={skill} className="mb-5">
            <h2 className="mb-2 flex items-center gap-2 px-1 text-sm font-bold">
              <Icon size={16} />
              {SKILL_LABELS[skill]}
              <span className="muted font-semibold">({liste.length})</span>
            </h2>
            <ul className="card divide-y" style={{ borderColor: "var(--border)" }}>
              {liste.map((m) => (
                <li key={m.id}>
                  <Row meta={m} done={done(m.id)} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {!seviyede.length ? (
        <p className="card p-5 text-sm" style={{ color: "var(--text-muted)" }}>
          Bu seviyede henüz beceri çalışması yok.
        </p>
      ) : null}
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
