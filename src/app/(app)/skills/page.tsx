import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { getT, getLang } from "@/lib/i18n/server";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { libraryMetas, listExerciseMeta, type SkillMeta } from "@/lib/skills";
import { listSkillStatus, type SkillStatus } from "@/lib/skills/record";
import { SKILL_LABEL_KEYS, SKILL_ORDER } from "@/lib/skills/meta";
import { SKILL_ICON, SKILL_TINT } from "@/components/skills/theme";
import { CardGrid } from "@/components/layout";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { moduleExamPlan } from "@/lib/lessons/module-exam";
import type { CefrLevel, SkillId } from "@/lib/skills/types";
import { localeOf } from "@/lib/i18n/dict";

export const metadata: Metadata = { title: "Beceriler" };
export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/** "Bitti" eşiği — immersion/progress.ts ve oynatıcı rotasıyla aynı (70). */
const DONE_PCT = 70;

/**
 * Beceriler — Patika'nın YANINDAKİ serbest çalışma yüzeyi.
 *
 * NEDEN VAR: Patika öğrenciyi bir sıraya sokar (ünite, ders, yuva). Burada
 * sıra yok: öğrenci seviyesini ve becerisini kendi seçer, istediği kadar
 * yalnız okuma ya da yalnız dil bilgisi çalışır. İçerik Patika'nınki DEĞİL:
 * `content/library/` altındaki ünitesiz kütüphane (bkz. lib/skills/index.ts
 * `libraryMetas`); mobil `listOwnSkillMeta` ile aynı ayrım. Patika egzersizleri
 * burada bir kez daha listelenmez — 2026-09-07'ye kadar öyleydi ve aynı
 * egzersiz iki yerde görünüyordu.
 *
 * BEŞ BECERİ: okuma, dinleme, yazma, konuşma (söyleyiş drilli / monolog),
 * dil bilgisi (kural anlatımı + soru). Patika'nın yuvaları değişmedi.
 *
 * "SIRADAKİ" (todo): her becerinin ilk bitmemiş egzersizi satırda işaretlenir;
 * en üstte tek bir öneri durur — tamamlanma oranı en düşük becerinin sıradakisi.
 * Seviyedeki her şey bittiyse öneri bir üst seviyeye geçmektir. Puan (son
 * deneme, 0–100) satırda görünür: geri bildirim yalnız egzersizin içinde değil,
 * listede de.
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

  const metas = libraryMetas(await listExerciseMeta(course));
  const atLevel = metas.filter((m) => m.level === level);

  // İlerleme okunamazsa liste yine çizilir, yalnız hiçbir şey "bitti"
  // görünmez — boş ekran vermekten iyi.
  let status: Record<string, SkillStatus> = {};
  try {
    status = await listSkillStatus(user.id, level);
  } catch (err) {
    console.error("[skills] ilerleme okunamadı", err);
  }
  const scoreOf = (id: string): number | null => status[id]?.lastScore ?? null;
  const done = (id: string) => (scoreOf(id) ?? 0) >= DONE_PCT;

  const doneCount = atLevel.filter((m) => done(m.id)).length;

  // Beceri başına liste ve sıradaki; en üstteki öneri en geride kalan beceriden.
  const sections = SKILL_ORDER.map((skill) => {
    const list = atLevel.filter((m) => m.skill === skill);
    const next = list.find((m) => !done(m.id)) ?? null;
    const ratio = list.length ? list.filter((m) => done(m.id)).length / list.length : 1;
    return { skill, list, next, ratio };
  });
  const suggestion = sections
    .filter((s) => s.next)
    .sort((a, b) => a.ratio - b.ratio)[0] ?? null;
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1] ?? null;
  const allDone = atLevel.length > 0 && doneCount === atLevel.length;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Ortak sekme başlığı: 32 punto başlık + açıklama alt satırı, sağda
          seri/gelen kutusu/profil. Mobilde `AppHeader` aynı iki satırı
          taşıyor (`SkillsScreen`). */}
      <AppHeader title={t("skills.skills")} subtitle={t("skills.aciklama")} />

      {/*
        Seviye seçici — mobildeki gibi EŞİT GENİŞLİKTE BEŞ sekme. Beş yerine
        yalnız içeriği olan seviyeleri çizmek, seviyenin bir ÖLÇEK olduğunu
        gizliyordu; tek bir şey söylenmesi gerekiyor: hangisi seçili.
      */}
      {/* Etiket ve sayaç TEK satırda, çiplerin üstünde — mobildeki
          `SkillsScreen` düzeni. Sayaç önce çiplerin ALTINDA ayrı bir satırdı
          ve seviyeyi bir kez daha yazıyordu ("A1 · 0/5 tamamlandı"); seçili
          çip zaten hangi seviye olduğunu söylüyor. */}
      <div className="mb-2 ml-1 flex items-center justify-between">
        <p className="muted text-caption tracking-wide">{t("skills.level")}</p>
        {atLevel.length ? (
          <p className="muted text-caption">{t("skills.done_of", { done: doneCount, total: atLevel.length })}</p>
        ) : null}
      </div>
      <nav className="mb-4 flex gap-2" aria-label={t("skills.level")}>
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

      {/* Tek öneri: en geride kalan becerinin sıradaki egzersizi; hepsi
          bittiyse bir üst seviye. Öğrenci "ne çalışsam" diye listeyi taramasın. */}
      {suggestion?.next ? (
        <SuggestionCard
          skill={suggestion.skill}
          meta={suggestion.next}
          reason={
            suggestion.ratio === 0
              ? t("skills.next_start", { skill: t(SKILL_LABEL_KEYS[suggestion.skill]) })
              : t("skills.next_behind", {
                  skill: t(SKILL_LABEL_KEYS[suggestion.skill]),
                  pct: Math.round(suggestion.ratio * 100),
                })
          }
        />
      ) : allDone && nextLevel ? (
        <Link href={`/skills?level=${nextLevel}`} className="card mb-4 flex items-center justify-between gap-3 p-4">
          <span>
            <span className="block text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--color-mint)" }}>
              {t("skills.level_done")}
            </span>
            <span className="block text-sm font-bold">{t("skills.level_done_body", { level, next: nextLevel })}</span>
          </span>
          <ChevronRightIcon className="size-4 shrink-0" />
        </Link>
      ) : null}

      {/* Geniş ekranda beceri bölümleri yan yana: tek sütunda okuma bitmeden
          dinlemeyi görmek için kaydırmak gerekiyordu. Telefonda hiç
          sarmalamıyor, düzen birebir eskisi. */}
      <CardGrid min={440}>
        {sections.map(({ skill, list, next }) => {
          if (!list.length) return null;
          const Icon = SKILL_ICON[skill];
          const tint = SKILL_TINT[skill];
          const finished = list.filter((m) => done(m.id)).length;
          return (
            <section key={skill} className="mb-5">
              <h2 className="mb-2 ml-1 flex items-center gap-2 text-h3">
                <Icon size={18} style={{ color: tint }} />
                {t(SKILL_LABEL_KEYS[skill])}
                <span className="muted text-caption">
                  {finished}/{list.length}
                </span>
              </h2>
              <ul className="card divide-y px-4" style={{ borderColor: "var(--hairline)" }}>
                {list.map((m) => (
                  <li key={m.id}>
                    <Row meta={m} done={done(m.id)} score={scoreOf(m.id)} isNext={next?.id === m.id} tint={tint} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </CardGrid>

      {!atLevel.length ? (
        <p className="card p-5 text-body" style={{ color: "var(--text-muted)" }}>
          {t("skillsp.empty_level")}
        </p>
      ) : null}

      <ExamSection level={level} />
    </div>
  );
}

async function SuggestionCard({ skill, meta, reason }: { skill: SkillId; meta: SkillMeta; reason: string }) {
  const t = await getT();
  const Icon = SKILL_ICON[skill];
  const tint = SKILL_TINT[skill];
  return (
    <Link href={`/immersion/skill/${meta.id}?from=skills`} className="card mb-4 flex items-center gap-3 p-4">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `color-mix(in srgb, ${tint} 18%, transparent)`, color: tint }}
      >
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-wide" style={{ color: tint }}>
          {t("skills.next")} · {t(SKILL_LABEL_KEYS[skill])}
        </span>
        <span className="block truncate text-sm font-bold">{meta.title}</span>
        <span className="muted block truncate text-caption">
          {reason} {meta.genre} · {t("skills.dk", { n: meta.minutes })}
        </span>
      </span>
      <ChevronRightIcon className="size-4 shrink-0" />
    </Link>
  );
}

async function Row({
  meta,
  done,
  score,
  isNext,
  tint,
}: {
  meta: SkillMeta;
  done: boolean;
  score: number | null;
  isNext: boolean;
  tint: string;
}) {
  const t = await getT();
  const lang = await getLang();
  return (
    <Link href={`/immersion/skill/${meta.id}?from=skills`} className="pressable flex items-center gap-3 py-3">
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
          {meta.genre} · {t("skills.dk", { n: meta.minutes })} · {t("mockexams.n_items_short", { n: meta.items })}
          {isNext ? (
            <>
              {" · "}
              <span style={{ color: tint }}>{t("skills.next").toLocaleLowerCase(localeOf(lang))}</span>
            </>
          ) : null}
        </span>
      </span>
      {/* Son puan: bitmişse yeşil onay yanında, bitmemişse tek başına —
          "denedim ama %50 aldım" ile "hiç açmadım" ayrışsın. */}
      {score !== null ? (
        <span
          className="shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-bold"
          style={{
            background: done
              ? "color-mix(in srgb, var(--color-mint-500) 18%, transparent)"
              : "color-mix(in srgb, var(--color-flame-500) 18%, transparent)",
            color: done ? "var(--color-mint)" : "var(--color-flame-500)",
          }}
        >
          %{score}
        </span>
      ) : null}
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
async function ExamSection({ level }: { level: CefrLevel }) {
  const t = await getT();
  const modules = [...Array(21).keys()]
    .map((i) => ({ index: i, plan: moduleExamPlan(level, i) }))
    .filter((m): m is { index: number; plan: NonNullable<ReturnType<typeof moduleExamPlan>> } => Boolean(m.plan));
  if (!modules.length) return null;

  return (
    <section className="mb-5">
      <h2 className="mb-2 px-1 text-sm font-bold">{t("skillsp.exams")}</h2>
      <ul className="card divide-y" style={{ borderColor: "var(--border)" }}>
        <li>
          <Link href={`/exam/${level}`} className="flex items-center gap-3 px-4 py-3">
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{t("exam.level_exam", { level })}</span>
              <span className="muted block text-xs">{t("skillsp.level_exam_sub")}</span>
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
