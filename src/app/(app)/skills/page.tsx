import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { getT } from "@/lib/i18n/server";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { listExerciseMeta, type SkillMeta } from "@/lib/skills";
import { immersionCompletion } from "@/lib/immersion/progress";
import { SKILL_LABELS, SKILL_ORDER } from "@/lib/skills/meta";
import { SKILL_ICON, SKILL_TINT } from "@/components/skills/theme";
import { CardGrid } from "@/components/layout";
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
  const t = await getT();
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

  const doneCount = atLevel.filter((m) => done(m.id)).length;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Ortak sekme başlığı: 32 punto başlık + açıklama alt satırı, sağda
          seri/gelen kutusu/profil. Mobilde `AppHeader` aynı iki satırı
          taşıyor (`SkillsScreen`). */}
      <AppHeader title={t("skills.skills")} subtitle={t("skills.aciklama")} />

      {/*
        Deneme sınavlarının web kapısı burası. Alt gezinme bilerek üç sekmede
        tutuluyor (bkz. app-shell), ve bu sayfa zaten "patikanın yuvalarına
        sığmayan içerik ve sınavlar" için: elle yazılmış deneme kâğıtları da
        oraya ait.
      */}
      <Link href="/mock-exams" className="card mb-4 flex items-center justify-between gap-3 p-4">
        <span>
          <span className="block text-sm font-bold">Deneme Sınavları</span>
          <span className="muted block text-sm">
            A1–C1 için kendi başına duran sınav kâğıtları. Her bölüm ayrı çözülür, süre görev başına işler.
          </span>
        </span>
        <ChevronRightIcon className="size-4 shrink-0" />
      </Link>

      {/*
        Seviye seçici — mobildeki gibi EŞİT GENİŞLİKTE BEŞ sekme.

        Önce yalnız içeriği olan seviyeler çiziliyordu ve çipler CEFR
        renklerini (nane, turkuaz, erik…) dolu zemin olarak taşıyordu. İkisi de
        yanlıştı. Beş yerine üç çip, seviyenin bir ÖLÇEK olduğunu gizliyordu:
        kullanıcı B2'nin var olduğunu görmüyordu bile. CEFR rengi de burada
        anlam taşımıyor — o renk rozette seviyeyi AYIRT etmek için var, burada
        ise tek bir şey söylenmesi gerekiyor: hangisi seçili.
      */}
      <p className="muted mb-2 ml-1 text-caption tracking-wide">Seviye</p>
      <nav className="mb-4 flex gap-2" aria-label="Seviye">
        {LEVELS.map((lv) => {
          const active = lv === level;
          return (
            <Link
              key={lv}
              href={`/skills?level=${lv}`}
              aria-current={active ? "page" : undefined}
              className="pressable flex-1 rounded-tile py-2.5 text-center text-strong"
              style={{
                border: `1.5px solid ${active ? "var(--color-brand-500)" : "var(--border)"}`,
                background: active
                  ? "color-mix(in srgb, var(--color-brand-500) 14%, transparent)"
                  : "var(--surface)",
                color: active ? "var(--color-brand)" : "var(--text-muted)",
              }}
            >
              {lv}
            </Link>
          );
        })}
      </nav>

      {atLevel.length ? (
        <p className="muted mb-3 text-xs font-semibold">
          {level} · {doneCount}/{atLevel.length} tamamlandı
        </p>
      ) : null}

      {/* Geniş ekranda beceri bölümleri yan yana: tek sütunda okuma bitmeden
          dinlemeyi görmek için kaydırmak gerekiyordu. Telefonda hiç
          sarmalamıyor, düzen birebir eskisi. */}
      <CardGrid min={440}>
        {SKILL_ORDER.map((skill) => {
          const list = atLevel.filter((m) => m.skill === skill);
          if (!list.length) return null;
          const Icon = SKILL_ICON[skill];
          const tint = SKILL_TINT[skill];
          return (
            <section key={skill} className="mb-5">
              <h2 className="mb-2 ml-1 flex items-center gap-2 text-h3">
                <Icon size={18} style={{ color: tint }} />
                {SKILL_LABELS[skill]}
                <span className="muted text-caption">{list.length} alıştırma</span>
              </h2>
              <ul className="card divide-y px-4" style={{ borderColor: "var(--hairline)" }}>
                {list.map((m) => (
                  <li key={m.id}>
                    <Row meta={m} done={done(m.id)} tint={tint} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </CardGrid>

      {!atLevel.length ? (
        <p className="card p-5 text-body" style={{ color: "var(--text-muted)" }}>
          Bu seviyede henüz okuma, dinleme ya da yazma çalışması yok.
        </p>
      ) : null}

      <ExamSection level={level} />
    </div>
  );
}

function Row({ meta, done, tint }: { meta: SkillMeta; done: boolean; tint: string }) {
  return (
    <Link
      href={`/immersion/skill/${meta.id}?from=skills`}
      className="pressable flex items-center gap-3 py-3"
    >
      {/* Nokta: biten yosun, bitmeyen becerinin kendi rengi. Mobilde de öyle —
          renk hem durumu hem hangi beceride olunduğunu taşıyor. */}
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: done ? "var(--color-mint-500)" : tint }}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-strong">{meta.title}</span>
        <span className="muted block text-caption">
          {meta.genre} · {meta.minutes} dk · {meta.items} madde
        </span>
      </span>
      {done ? (
        <CheckIcon size={18} className="shrink-0" style={{ color: "var(--color-mint)" }} />
      ) : (
        <ChevronRightIcon size={20} className="muted shrink-0" />
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
