"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { useT, useLang } from "@/lib/i18n/client";
import { localeOf } from "@/lib/i18n/dict";
import { UnitPane, KindIconFor } from "@/components/immersion/unit-pane";
import { CheckIcon, LockIcon } from "@/components/icons";
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
  locked: boolean;
  complete: boolean;
  done: number;
  total: number;
  lessonsDone: number;
  lessonsTotal: number;
  items: HubItem[];
};

export type ImmersionHubProps = {
  level: CefrLevel;
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
  lesson: "unitkind.lesson",
  read: "unitkind.read",
  listen: "unitkind.listen",
  write: "unitkind.write",
  grammar: "unitkind.grammar",
  quiz: "unitkind.quiz",
  checkpoint: "unitkind.checkpoint",
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

export function ImmersionHub({ level, units, currentIndex, doneUnits, totalUnits, moduleExams = [] }: ImmersionHubProps) {
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

      <div className="mt-4 grid grid-cols-2 gap-3">
        {units.map((u) => (
          <Tile
            key={u.id}
            unit={u}
            highlighted={u.index === highlight}
            isCurrent={u.index === currentIndex}
            onSelect={twoPane && !u.locked ? () => setSelected(u.index) : undefined}
          />
        ))}
      </div>

      {moduleExams.length ? (
        <section className="mt-6">
          <h2 className="mb-2 ml-1 text-h3">{t("path.module_exams")}</h2>
          <ul className="card divide-y" style={{ borderColor: "var(--hairline)" }}>
            {moduleExams.map((m) => (
              <li key={m.code}>
                <Link
                  href={`/exam/${level}/${m.index}`}
                  prefetch={false}
                  className="pressable flex items-center gap-3 px-4 py-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-strong">
                      {m.code} · {m.titleTr}
                    </span>
                    {/* `titleDe` adıyla Almanca: modül sınavı planı kursa bağlı değil. */}
                    <span className="muted block truncate text-caption" lang="de">
                      {m.titleDe}
                    </span>
                  </span>
                  <span className="muted shrink-0 text-caption">{t("path.module_exam_minutes")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
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
            {shown ? <UnitPane key={shown.index} unit={shown} level={level} embedded /> : null}
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

  return (
    <section className="card p-4" style={{ borderWidth: 2, borderColor: "var(--color-brand-500)" }}>
      <div className="flex items-center gap-3">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-tile text-white shadow-soft-sm"
          style={{ background: unit.complete ? "var(--color-mint-500)" : "var(--color-brand-500)" }}
        >
          {unit.complete ? <CheckIcon size={26} /> : <span className="text-h1">{unit.index}</span>}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-micro uppercase tracking-wider" style={{ color: "var(--color-brand)" }}>
            {t(isCurrent ? "path.now" : "common.unit")} · {t("common.unit")} {unit.index}
          </p>
          <p className="truncate text-h2">{unit.theme}</p>
          <p className="muted text-caption">
            {unit.complete
              ? t("common.completed")
              : t("path.lessons_done", { n: unit.lessonsDone, total: unit.lessonsTotal })}
          </p>
        </div>
      </div>

      {/* Adım şeridi — biten yosun, sıradaki turuncu, denenmiş soluk turuncu,
          kapalı boş. Açık olanlar doğrudan tıklanabiliyor: takılınan bir
          beceriye dönmenin ya da sıradakine atlamanın kısa yolu. */}
      {unit.items.length > 0 ? (
        <div className="mt-3 flex gap-1">
          {unit.items.map((it) => {
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile text-white"
            style={{ background: "var(--color-brand-500)" }}
          >
            <KindIconFor kind={next.kind} size={20} />
          </span>
          <div className="min-w-0">
            <p className="muted text-micro uppercase tracking-wider">
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
        <button type="button" onClick={onOpen} className="btn btn-primary mt-3 w-full py-3.5">
          {label}
        </button>
      ) : (
        <Link href={href} prefetch={false} className="btn btn-primary mt-3 w-full py-3.5">
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
      <span className="mt-2 line-clamp-2 text-strong">{unit.theme}</span>
      <span
        className="mt-0.5 block text-micro"
        style={{ color: unit.complete ? "var(--color-mint)" : "var(--text-muted)" }}
      >
        {unit.complete
          ? t("common.completed")
          : unit.locked
            ? t("common.locked")
            : t("path.lessons_done", { n: unit.lessonsDone, total: unit.lessonsTotal })}
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
