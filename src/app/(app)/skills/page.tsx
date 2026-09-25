import { titleMeta } from "@/lib/page-meta";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { getT } from "@/lib/i18n/server";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { libraryMetas, listExerciseMeta, type SkillMeta } from "@/lib/skills";
import { listSkillStatus, type SkillStatus } from "@/lib/skills/record";
import { isSkillDone } from "@/lib/score-bands";
import { SKILL_LABEL_KEYS, SKILL_ORDER } from "@/lib/skills/meta";
import { SKILL_ICON, SKILL_TINT } from "@/components/skills/theme";
import { ChevronRightIcon } from "@/components/icons";
import { SkillBrowser, type BrowserSection } from "@/components/skills/skill-browser";
import { gatedMetaKind, isSkillLocked, skillLibraryAccess, type SkillLibraryAccess } from "@/lib/premium/skill-access";
import { gateNote } from "@/lib/premium/gate-note";
import type { CefrLevel, SkillId } from "@/lib/skills/types";

export const generateMetadata = titleMeta("skills.skills");
export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

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
 * SINAVLAR BURADA DEĞİL (2026-09-09). Bir süre modül ve seviye sınavı bu
 * sayfanın altında listeleniyordu, ama sebebi bir tasarım kararı değil bir
 * kapı eksikliğiydi: `/exam/*` rotaları çalışıyordu ve web'de onlara giden
 * hiçbir bağlantı yoktu. Artık her sınav ait olduğu yerde — modül sınavı
 * Patika'da (kâğıdı zaten modülün derslerinden üretiliyor ve dersler
 * geçilmeden "deneme" sayılıyor), seviye sınavı ile deneme ve haftalık sınav
 * Öğren'de. Beceriler tek bir iş yapıyor: seçip çalışmak.
 *
 * Seviye seçimi sorgu parametresiyle: sayfa sunucuda çiziliyor. Beceri
 * seçimi istemcide (`SkillBrowser`): seviyede 5 × 20 egzersiz var ve beş liste
 * alt alta 100 satır ediyordu; artık bir seferde tek becerinin listesi.
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
  const done = (id: string) => isSkillDone(scoreOf(id));

  /*
    PREMIUM KİLİDİ — yapay zekâyla değerlendirilen yazma ve konuşma (bkz.
    lib/premium/skill-access). Liste bugüne kadar her şeyi açık çiziyordu.
    Okunamazsa kilit çizilmiyor; kapıyı zaten `/api/assess` tutuyor.
  */
  let access: SkillLibraryAccess | null = null;
  if (!user.guest) {
    try {
      access = await skillLibraryAccess(user.id, level);
    } catch (err) {
      console.error("[skills] skillLibraryAccess", err);
    }
  }

  const doneCount = atLevel.filter((m) => done(m.id)).length;

  // Beceri başına liste ve sıradaki; en üstteki öneri en geride kalan beceriden.
  const sections = SKILL_ORDER.map((skill) => {
    const list = atLevel.filter((m) => m.skill === skill);
    const next = list.find((m) => !done(m.id) && !isSkillLocked(m, access)) ?? null;
    const ratio = list.length ? list.filter((m) => done(m.id)).length / list.length : 1;
    return { skill, list, next, ratio };
  });
  const suggestion = sections
    .filter((s) => s.next)
    .sort((a, b) => a.ratio - b.ratio)[0] ?? null;
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1] ?? null;
  const allDone = atLevel.length > 0 && doneCount === atLevel.length;

  /* Açılışta seçili beceri: adresteki (sekme değişimi ve seviye bağlantıları
     onu yazıyor), yoksa önerinin becerisi — öğrenci en geride kaldığı yerin
     listesiyle karşılaşsın. */
  const wantedSkill = (await searchParams)?.skill;
  const initialSkill: SkillId =
    (SKILL_ORDER as string[]).includes(wantedSkill as string) && sections.some((s) => s.skill === wantedSkill && s.list.length)
      ? (wantedSkill as SkillId)
      : suggestion?.skill ?? sections.find((s) => s.list.length)?.skill ?? "reading";

  const browserSections: BrowserSection[] = sections.map(({ skill, list, next }) => {
    const kind = list.some((m) => gatedMetaKind(m)) ? gatedMetaKind(list[0]) : null;
    return {
      skill,
      nextId: next?.id ?? null,
      note: kind && access ? gateNote(access[kind]) : null,
      rows: list.map((m) => ({
        id: m.id,
        title: m.title,
        genre: m.genre,
        minutes: m.minutes,
        items: m.items,
        score: scoreOf(m.id),
        done: done(m.id),
        locked: isSkillLocked(m, access),
      })),
    };
  });

  return (
    /* Kap tek sütun. Eskiden xl'de açılıyordu çünkü beş bölüm yan yana
       diziliyordu; artık bir seferde tek becerinin listesi görünüyor ve geniş
       ekranda yan yana konacak ikinci bir liste yok. */
    <div className="mx-auto w-full max-w-3xl">
      {/* Ortak sekme başlığı: 32 punto başlık + açıklama alt satırı, sağda
          seri/gelen kutusu/profil. Mobilde `AppHeader` aynı iki satırı
          taşıyor (`SkillsScreen`). */}
      <AppHeader title={t("skills.skills")} subtitle={t("skills.aciklama")} />

      <SkillBrowser
        level={level}
        sections={browserSections}
        initialSkill={initialSkill}
        doneCount={doneCount}
        total={atLevel.length}
        suggestion={
          /* Tek öneri: en geride kalan becerinin sıradaki egzersizi; hepsi
             bittiyse bir üst seviye. Öğrenci "ne çalışsam" diye listeyi taramasın. */
          suggestion?.next ? (
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
            <Link href={`/skills?level=${nextLevel}`} className="card mb-4 flex items-center gap-3 p-4">
              <span className="min-w-0 flex-1">
                <span className="block text-micro uppercase" style={{ color: "var(--color-mint)" }}>
                  {t("skills.level_done")}
                </span>
                <span className="muted mt-0.5 block text-caption">{t("skills.level_done_body", { level, next: nextLevel })}</span>
              </span>
              <ChevronRightIcon className="size-4 shrink-0" />
            </Link>
          ) : null
        }
      />
    </div>
  );
}

async function SuggestionCard({ skill, meta, reason }: { skill: SkillId; meta: SkillMeta; reason: string }) {
  const t = await getT();
  const Icon = SKILL_ICON[skill];
  const tint = SKILL_TINT[skill];
  return (
    /* ÖNERİ KARTI MOBİLDEKİ KARTIN AYNISI (`SkillsScreen`). Üç sapma vardı:
       simge karosu %18 tint zeminliydi (mobilde nötr `surface2`, ve uygulamanın
       tint kalıbı %13-14), yarıçapı projenin ölçeğinde olmayan Tailwind
       `rounded-xl`iydi (12 px; ölçekte 14 = `rounded-tile`), ve alt satır
       gerekçenin ARDINA ayırıcısız tür + süre ekliyordu ("... %40 ilerledin
       Kısa hikâye · 5 dk"). İkisi zaten listede yazıyor; mobil yalnız gerekçeyi
       söylüyor. Punto da jetona bağlandı: 11 punto `text-micro`. */
    <Link href={`/immersion/skill/${meta.id}?from=skills`} className="card mb-4 flex items-center gap-3 p-4">
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-tile"
        style={{ background: "var(--surface-2)", color: tint }}
      >
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-micro uppercase" style={{ color: tint }}>
          {t("skills.next")} · {t(SKILL_LABEL_KEYS[skill])}
        </span>
        <span className="block truncate text-strong">{meta.title}</span>
        <span className="muted line-clamp-2 block text-caption">{reason}</span>
      </span>
      <ChevronRightIcon className="size-4 shrink-0" />
    </Link>
  );
}
