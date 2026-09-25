"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { useT, useLang } from "@/lib/i18n/client";
import { localeOf } from "@/lib/i18n/dict";
import { UnitPane, KindIconFor } from "@/components/immersion/unit-pane";
import type { PathQuota } from "@/lib/premium/unlock-copy";
import { CheckIcon, ExamIcon, LockIcon } from "@/components/icons";
import { useCourse } from "@/components/app-shell";
import type { CefrLevel } from "@/lib/skills/types";
import type { ImmersionItemKind } from "@/lib/immersion/types";

/**
 * Patika — ders iskeleti + okuma/dinleme/yazma harmanı.
 *
 * Yerleşim mobil `M/src/screens/PathScreen.tsx` ile birebir: ilerleme şeridi,
 * ÖNE ÇIKAN ünite kartı (numara/onay dairesi, adım şeridi, sıradaki adım
 * satırı, tam genişlik devam düğmesi), altında ünite ızgarası.
 *
 * ÜÇ ŞEY DEĞİŞTİ:
 *
 * 1. Emoji kalktı. Ünite dairesinde onay ve kilit işaretleri emoji karakteri
 *    olarak yazılıyordu;
 *    yazı tipine göre boyu ve hizası değişiyor, koyu temada emoji kendi
 *    rengini dayatıyordu. Artık setin kendi ikonları.
 *
 * 2. "Devam et" ÜNİTEYİ açıyor, adımı değil. Model mobildekiyle aynı oldu:
 *    Patika → Ünite → adım. Doğrudan adıma atlamak bir tık kazandırıyordu ama
 *    ünitenin kendisini görünmez bırakıyordu — hangi adımlar var, hangisi
 *    bitti, nereye dönebilirim soruları web'de hiçbir yerde cevaplanmıyordu.
 *
 * 3. Geniş ekranda İKİ PANEL: solda ızgara, sağda seçilen ünitenin adımları.
 *    Mobilde yatay tablette aynısı var. Dar ekranda hiçbir şey değişmiyor —
 *    orada fayans bir bağlantı ve ünite kendi sayfasında açılıyor.
 */

export type HubItem = {
  id: string;
  kind: ImmersionItemKind;
  href: string | null;
  title: string;
  titleTr?: string;
  playable: boolean;
  /** Skor eşiğini geçti mi. */
  done: boolean;
  /** Bir kez oynandı mı — puanı yetmese bile. */
  attempted: boolean;
  /** Açılabilir mi: biten + denenen + sıradaki tek öğe (bkz. lib/immersion/state). */
  open: boolean;
};

export type HubUnit = {
  id: string;
  index: number;
  group: number;
  theme: string;
  /** Temanın modülü (0 tabanlı) — kartlar bununla gruplanıyor. */
  moduleIndex: number;
  /** Derslerin başlıkları — kartın ayırt edici adı. */
  topics: string[];
  locked: boolean;
  complete: boolean;
  done: number;
  total: number;
  conversationsDone: number;
  conversationsTotal: number;
  items: HubItem[];
};

export type ImmersionHubProps = {
  level: CefrLevel;
  /** Patika Konuşma/Yazma hakkı — sağ paneldeki ünite gövdesine iniyor. */
  quota?: PathQuota | null;
  units: HubUnit[];
  currentIndex: number;
  doneUnits: number;
  totalUnits: number;
  /**
   * Seviyenin modül sınavları. Patika'da duruyor çünkü kâğıt modülün KENDİ
   * derslerinden üretiliyor ve dersleri geçilmemişse motor kâğıdı "deneme"
   * sayıyor. Bir süre Beceriler'in altında listeleniyordu; orası çalışma
   * kütüphanesi, sınavın ön koşulu ise burada.
   */
  moduleExams?: { index: number; code: string; titleTr: string; titleDe: string }[];
};

/** Tür → sözlük anahtarı; etiket kullanım anında çözülüyor (mobil `KIND_KEY`). */
const KIND_KEY: Record<ImmersionItemKind, string> = {
  conversation: "unitkind.conversation",
  read: "unitkind.read",
  listen: "unitkind.listen",
  write: "unitkind.write",
  grammar: "unitkind.grammar",
  quiz: "unitkind.quiz",
  unitQuiz: "unitkind.unit_quiz",
};

/**
 * İki panelin açıldığı en küçük EKRAN genişliği.
 *
 * Mobilde ölçüt kabın 900dp'yi geçmesi. Web'de kabuk `max-w-6xl` ve masaüstü
 * kenar çubuğu 240px alıyor; 1280px'lik bir ekranda içeriğe ~910px kalıyor,
 * yani eşik oraya denk düşüyor. Daha dar bir yerde iki panel açmak ikisini de
 * kullanılmaz ederdi.
 */
const TWO_PANE_MIN = 1280;

/** Ekran iki paneli taşıyacak kadar geniş mi — SSR'da her zaman `false`. */
function useTwoPane(): boolean {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${TWO_PANE_MIN}px)`);
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return wide;
}

export function ImmersionHub({ level, units, currentIndex, doneUnits, totalUnits, moduleExams = [], quota = null }: ImmersionHubProps) {
  const t = useT();
  const twoPane = useTwoPane();
  const [selected, setSelected] = useState<number | null>(null);
  const pctAll = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;
  const featured = units.find((u) => u.index === currentIndex) ?? units[0];

  /*
    Sağ panelde gösterilen ünite: kullanıcı seçtiyse o, yoksa kaldığı ünite.
    Vurgulanan fayans da odur — ana-ayrıntı düzeninde seçimin görünmesi şart,
    yoksa sağdaki panelin hangi karta ait olduğu anlaşılmıyor.
  */
  const shown = twoPane
    ? units.find((u) => u.index === selected && !u.locked) ?? (featured && !featured.locked ? featured : null)
    : null;
  const highlight = twoPane ? shown?.index ?? -1 : currentIndex;

  const body = (
    <>
      <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${Math.max(2, pctAll)}%`, background: "var(--color-mint-500)" }}
        />
      </div>
      <p className="muted mb-4 mt-1.5 text-caption">
        {t("path.units_done", { level, n: doneUnits, total: totalUnits })}
      </p>

      {featured ? (
        <Featured
          unit={featured}
          isCurrent={featured.index === currentIndex}
          onOpen={twoPane ? () => setSelected(featured.index) : undefined}
        />
      ) : null}

      {/*
        MODÜL BAŞLIKLARI ALTINDA. Tema modülden geliyor ve modül 10 ders, ünite 4
        ders: aynı tema art arda 2-3 kartın ADI oluyordu ("Tanışma ve ben" ×3) ve
        kartlar birbirinden ayırt edilmiyordu. Tema artık grubun başlığı; kartın
        adı kendi dersleri. Modülün sınavı da modülün sonunda — ayrı bir listede
        hangi ünitelere ait olduğu okunmuyordu.
      */}
      {moduleGroups(units).map((g) => {
        const exam = moduleExams.find((m) => m.index === g.moduleIndex);
        return (
          <section key={g.moduleIndex} className="mt-5">
            <p className="muted ml-1 text-micro uppercase tracking-eyebrow">{t("path.module_n", { n: g.moduleIndex + 1 })}</p>
            <h2 className="mb-2 ml-1 text-h3">{g.theme}</h2>
            <div className="grid grid-cols-2 gap-3">
              {g.units.map((u) => (
                <Tile
                  key={u.id}
                  unit={u}
                  highlighted={u.index === highlight}
                  isCurrent={u.index === currentIndex}
                  onSelect={twoPane && !u.locked ? () => setSelected(u.index) : undefined}
                />
              ))}
            </div>
            {exam ? <ModuleExamRow level={level} exam={exam} /> : null}
          </section>
        );
      })}

      {/* Ünitesi olmayan modülün sınavı (içerik ünitelerden önce yazılmış olabilir). */}
      {moduleExams.some((m) => !units.some((u) => u.moduleIndex === m.index)) ? (
        <section className="mt-6">
          <h2 className="mb-2 ml-1 text-h3">{t("path.module_exams")}</h2>
          <div className="space-y-2">
            {moduleExams
              .filter((m) => !units.some((u) => u.moduleIndex === m.index))
              .map((m) => (
                <ModuleExamRow key={m.code} level={level} exam={m} />
              ))}
          </div>
        </section>
      ) : null}

      {/*
        SEVİYE SINAVI — Patika'nın Sınav adımı. Beş bölüm, 45 dakika: ünite ya
        da modül ölçeğinde değil, seviyenin tamamını ölçüyor; bu yüzden en
        sonda, modül sınavlarından sonra. 2026-09-25'e kadar Öğren'deydi.
      */}
      <section className="mt-6">
        <h2 className="mb-2 ml-1 text-h3">{t("path.exam_section")}</h2>
        <LevelExamRow level={level} />
      </section>
    </>
  );

  return (
    <div className="mx-auto w-full max-w-3xl xl:max-w-none">
      <AppHeader title={t("path.path")} />
      {twoPane ? (
        <div className="grid grid-cols-[45fr_55fr] items-start gap-4">
          <div>{body}</div>
          {/* Sağ panel kendi yüzeyini taşıyor: sol taraf kartlardan oluşuyor,
              ayrım olmasa iki sütun tek bir liste gibi okunurdu. */}
          <div className="card p-4">
            {shown ? <UnitPane key={shown.index} unit={shown} level={level} embedded quota={quota} /> : null}
          </div>
        </div>
      ) : (
        body
      )}
    </div>
  );
}

/** Öne çıkan ünite — kaldığın yer. */
function Featured({
  unit,
  isCurrent,
  onOpen,
}: {
  unit: HubUnit;
  isCurrent: boolean;
  /** İki panelde ünite YERİNDE açılıyor; dar ekranda bağlantıyla. */
  onOpen?: () => void;
}) {
  /*
    "Sıradaki" DENENMEMİŞ ilk açık öğedir, BİTMEMİŞ ilk öğe değil.

    Eskiden bitmemiş aranıyordu: bir beceriden geçer not alamayan öğrenci o
    beceride sonsuza dek takılıyordu, çünkü patikadaki tek bağlantı hep onu
    gösteriyordu. Artık deneme sırayı ilerletiyor; denenmiş ama geçilmemiş öğe
    kapanmıyor, adım şeridinden ve ünite sayfasından tekrar açılıyor.
  */
  const t = useT();
  const lang = useLang();
  const open = unit.items.filter((i) => i.open && i.href);
  const next = open.find((i) => !i.attempted) ?? open.find((i) => !i.done) ?? open[0] ?? null;
  const href = `/immersion/unit/${unit.index}`;
  const label = t(unit.complete ? "path.repeat" : "path.continue");
  const course = useCourse();
  const steps = unit.items.filter((i) => i.playable);

  return (
    <section className="card p-4" style={{ borderWidth: 2, borderColor: "var(--color-brand-500)" }}>
      <div className="flex items-center gap-3">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-tile text-white glow-tint-sm"
          style={{ background: unit.complete ? "var(--color-mint-500)" : "var(--color-brand-500)", "--tint-fill": unit.complete ? "var(--color-mint-500)" : "var(--color-brand-500)" } as React.CSSProperties}
        >
          {unit.complete ? <CheckIcon size={26} /> : <span className="text-h1">{unit.index}</span>}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-micro uppercase tracking-eyebrow" style={{ color: "var(--color-brand)" }}>
            {t(isCurrent ? "path.now" : "common.unit")} · {t("common.unit")} {unit.index}
          </p>
          {/* İKİ SATIR: Android `PathScreen` `numberOfLines={2}` veriyor ve
              webin KENDİ ikinci görünümü de (`line-clamp-2`, aşağıda) iki
              satır. Burası tek satırdı, yani aynı alan aynı uygulamada iki
              farklı bütçeyle çiziliyordu. */}
          <p className="line-clamp-2 text-h2">{unit.theme}</p>
          {/* Kartı ayırt eden: ünitenin kendi dersleri. Tema 2-3 ünitede aynı. */}
          <p className="muted line-clamp-1 text-caption" lang={course}>{unit.topics.join(" · ")}</p>
        </div>
      </div>

      {/* Tek ölçüt: şeritteki çizgi sayısı = sayacın paydası = ünite ekranındaki adım sayısı. */}
      <div className="mt-3 flex items-center justify-between text-caption">
        <span className="muted">{t("path.steps_done", { n: unit.done, total: unit.total })}</span>
        {unit.complete ? <span style={{ color: "var(--color-mint)" }}>{t("common.completed")}</span> : null}
      </div>
      {/* Adım şeridi — biten yosun, sıradaki turuncu, denenmiş soluk turuncu,
          kapalı boş. Açık olanlar doğrudan tıklanabiliyor: takılınan bir
          beceriye dönmenin ya da sıradakine atlamanın kısa yolu. Yalnız
          OYNANABİLİR adımlar: sayaçla aynı küme. */}
      {steps.length > 0 ? (
        <div className="mt-1.5 flex gap-1">
          {steps.map((it) => {
            const seg = it.done
              ? "var(--color-mint-500)"
              : it === next
                ? "var(--color-brand-500)"
                : it.attempted
                  ? "var(--color-brand-300)"
                  : "var(--surface-2)";
            const bar = <span className="block h-2.5 w-full rounded-full" style={{ background: seg }} />;
            return it.open && it.href && !unit.locked ? (
              <Link key={it.id} href={it.href} prefetch={false} className="flex-1" aria-label={it.title} title={it.title}>
                {bar}
              </Link>
            ) : (
              <span key={it.id} className="flex-1">
                {bar}
              </span>
            );
          })}
        </div>
      ) : null}

      {next && !unit.locked ? (
        <div className="mt-3 flex items-center gap-3 rounded-panel p-3" style={{ background: "var(--surface-2)" }}>
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
            style={{ background: "var(--brand-fill)", color: "var(--on-brand)" }}
          >
            <KindIconFor kind={next.kind} size={20} />
          </span>
          <div className="min-w-0">
            <p className="muted text-micro uppercase tracking-eyebrow">
              {t("path.next", { kind: (t(KIND_KEY[next.kind] ?? "") || next.kind).toLocaleUpperCase(localeOf(lang)) })}
            </p>
            <p className="truncate text-strong">{next.title}</p>
          </div>
        </div>
      ) : null}

      {unit.locked ? (
        <p
          className="mt-3 rounded-panel py-3.5 text-center text-h3"
          style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        >
          {t("path.finish_previous")}
        </p>
      ) : onOpen ? (
        <button type="button" onClick={onOpen} className="btn btn-primary mt-3 w-full py-4">
          {label}
        </button>
      ) : (
        <Link href={href} prefetch={false} className="btn btn-primary mt-3 w-full py-4">
          {label}
        </Link>
      )}
    </section>
  );
}

/** Izgara fayansı — mobil `PathScreen` ünite kartıyla aynı ölçüler. */
function Tile({
  unit,
  highlighted,
  isCurrent,
  onSelect,
}: {
  unit: HubUnit;
  highlighted: boolean;
  isCurrent: boolean;
  onSelect?: () => void;
}) {
  const t = useT();
  const course = useCourse();
  const ringColor = unit.complete
    ? "var(--color-mint-500)"
    : isCurrent
      ? "var(--color-brand-500)"
      : "var(--border)";

  const inner = (
    <>
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={{ border: `3px solid ${ringColor}` }}
      >
        {unit.complete ? (
          <CheckIcon size={18} style={{ color: "var(--color-mint)" }} />
        ) : unit.locked ? (
          <LockIcon size={18} className="muted" />
        ) : (
          <span className="text-strong" style={{ color: highlighted ? "var(--color-brand)" : "var(--text-muted)" }}>
            {unit.index}
          </span>
        )}
      </span>
      {/* Kartın adı ÜNİTENİN KENDİ DERSLERİ: tema grubun başlığında (bkz.
          `moduleGroups`); kartta tekrar edince yan yana üç kart aynı adı taşıyordu. */}
      {/* `w-full break-words hyphens-auto`: fayans 320 pikselde 138 piksel ve
          "Informationsschalter" gibi tek parça bir Almanca sözcük satıra
          sığmıyordu. Kutu içeriğine göre genişleyip fayansın DIŞINA taşıyor,
          patika sayfası yana 16 piksel kayıyordu. Genişlik fayansa sabitlenince
          sözcük tireyle (`lang` sayesinde Almanca heceleme) bölünüyor. */}
      <span className="mt-2 line-clamp-2 w-full break-words hyphens-auto text-strong" lang={course}>{unit.topics.join(" · ")}</span>
      <span className="mt-auto block w-full pt-2">
        {unit.locked ? null : <StepBar unit={unit} size="sm" />}
        <span
          className="mt-1 block text-micro"
          style={{ color: unit.complete ? "var(--color-mint)" : "var(--text-muted)" }}
        >
          {unit.complete
            ? t("common.completed")
            : unit.locked
              ? t("common.locked")
              : t("path.steps_done", { n: unit.done, total: unit.total })}
        </span>
      </span>
    </>
  );

  const cls = "card flex min-h-[7.25rem] flex-col items-start p-4 text-left";
  const style = {
    opacity: unit.locked ? 0.6 : 1,
    borderWidth: highlighted ? 2 : 1,
    borderColor: highlighted ? "var(--color-brand-500)" : "var(--border)",
  };

  if (unit.locked) {
    return (
      <div className={cls} style={style} aria-disabled>
        {inner}
      </div>
    );
  }
  if (onSelect) {
    return (
      <button type="button" onClick={onSelect} className={`pressable ${cls}`} style={style}>
        {inner}
      </button>
    );
  }
  return (
    <Link href={`/immersion/unit/${unit.index}`} prefetch={false} className={`pressable ${cls}`} style={style}>
      {inner}
    </Link>
  );
}

/** Üniteleri temalarının modülüne göre, sırayı bozmadan gruplar. */
function moduleGroups(units: HubUnit[]): { moduleIndex: number; theme: string; units: HubUnit[] }[] {
  const groups: { moduleIndex: number; theme: string; units: HubUnit[] }[] = [];
  for (const u of units) {
    const last = groups.at(-1);
    if (last && last.moduleIndex === u.moduleIndex) last.units.push(u);
    else groups.push({ moduleIndex: u.moduleIndex, theme: u.theme, units: [u] });
  }
  return groups;
}

/**
 * Adım şeridi — ünitenin OYNANABİLİR adımları, sayaçla aynı küme.
 *
 * Şerit eskiden içeriği olmayan yuvaları da çiziyordu, sayaç ise yalnız dersleri
 * sayıyordu: 13 çizginin yanında "1/4 konuşma" yazıyordu.
 */
export function StepBar({ unit, next, size = "md" }: { unit: HubUnit; next?: HubItem | null; size?: "sm" | "md" }) {
  const steps = unit.items.filter((i) => i.playable);
  return (
    <div className={`flex ${size === "sm" ? "gap-0.5" : "gap-1"}`} aria-hidden>
      {steps.map((it) => (
        <span
          key={it.id}
          className={`block flex-1 rounded-full ${size === "sm" ? "h-1.5" : "h-2.5"}`}
          style={{
            background: it.done
              ? "var(--color-mint-500)"
              : it === next
                ? "var(--color-brand-500)"
                : it.attempted
                  ? "var(--color-brand-300)"
                  : "var(--surface-2)",
          }}
        />
      ))}
    </div>
  );
}

function LevelExamRow({ level }: { level: CefrLevel }) {
  const t = useT();
  return (
    <Link href={`/exam/${level}`} prefetch={false} className="card pressable flex items-center gap-3 px-4 py-3">
      <ExamIcon size={20} />
      <span className="min-w-0 flex-1">
        <span className="block text-strong">{t("path.level_exam", { level })}</span>
        <span className="muted block text-caption">{t("path.level_exam_sub")}</span>
      </span>
    </Link>
  );
}

function ModuleExamRow({ level, exam }: { level: CefrLevel; exam: { index: number; code: string; titleTr: string; titleDe: string } }) {
  const t = useT();
  return (
    <Link href={`/exam/${level}/${exam.index}`} prefetch={false} className="card pressable mt-3 flex items-center gap-3 px-4 py-3">
      <span className="min-w-0 flex-1">
        {/* İki satıra kadar: "Modül 10 sınavı · İletişim ve geçmişe ilişkin…"
            modülün adını dar ekranda (ve masaüstünde bile) kesiyordu. */}
        <span className="line-clamp-2 block text-strong">
          {t("path.module_exam_n", { n: exam.index + 1 })} · {exam.titleTr}
        </span>
        {/* `titleDe` adıyla Almanca: modül sınavı planı kursa bağlı değil. */}
        <span className="muted block truncate text-caption" lang="de">
          {exam.code} · {exam.titleDe}
        </span>
      </span>
      <span className="muted shrink-0 text-caption">{t("path.module_exam_minutes")}</span>
    </Link>
  );
}
