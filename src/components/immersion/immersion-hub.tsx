import Link from "next/link";
import type { CefrLevel } from "@/lib/skills/types";
import type { ImmersionItemKind } from "@/lib/immersion/types";

/**
 * Immersion ana ekranı (2. mod) — presentasyon katmanı, sunucu bileşeni.
 *
 * Etkileşim yok: seviye seçimi `?level=` bağlantılarıyla, gating sunucuda
 * hesaplanıp `HubUnit`'e gömülü gelir. Böylece istemciye JS inmez.
 *
 * Yapı: seviye çipleri → gruplar (Duolingo "bölüm": 10 ünite, sayfalı) →
 * ünite kartları → item satırları. İçeriği kurulu (playable) item'lar
 * oynatıcıya bağlanır; yer tutucular "yakında" olarak görünür ama tıklanmaz
 * ve gating'i bloklamaz.
 */

export type HubItem = {
  id: string;
  kind: ImmersionItemKind;
  /** Hesaplanmış bağlantı hedefi (sunucuda); null = yer tutucu/"yakında". */
  href: string | null;
  title: string;
  titleTr?: string;
  playable: boolean;
  done: boolean;
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
  /** Ders (iskelet) ilerlemesi — gating ölçütü, başlıkta gösterilir. */
  lessonsDone: number;
  lessonsTotal: number;
  items: HubItem[];
};

export type ImmersionHubProps = {
  level: CefrLevel;
  levels: CefrLevel[];
  units: HubUnit[];
  currentIndex: number;
};

const KIND_LABEL: Record<ImmersionItemKind, string> = {
  lesson: "Ders",
  read: "Okuma",
  listen: "Dinleme",
  write: "Yazma",
  grammar: "Dil bilgisi",
  quiz: "Tekrar",
  checkpoint: "Kontrol",
};

/** Item kutucuğunun sol rozet rengi — türe göre. */
const KIND_TONE: Record<ImmersionItemKind, string> = {
  lesson: "var(--color-brand)",
  read: "var(--color-mint-600)",
  listen: "var(--color-mint-600)",
  write: "var(--color-mint-600)",
  grammar: "var(--text-muted)",
  quiz: "var(--text-muted)",
  checkpoint: "var(--color-flame-600)",
};

export function ImmersionHub({ level, levels, units, currentIndex }: ImmersionHubProps) {
  const groups = groupUnits(units);

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-24 pt-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Immersion</h1>
        <p className="muted mt-1 text-sm">
          Dersler, okuma-dinleme-yazma ve tekrarlar iç içe. Amaç kelime ezberi değil,
          <strong> kendi cümleni kurmak.</strong>
        </p>
      </header>

      <LevelChips level={level} levels={levels} />

      <div className="mt-5 flex flex-col gap-6">
        {groups.map((g) => (
          <GroupSection key={g.group} group={g} currentIndex={currentIndex} />
        ))}
      </div>
    </div>
  );
}

function LevelChips({ level, levels }: { level: CefrLevel; levels: CefrLevel[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {levels.map((lv) => {
        const active = lv === level;
        return (
          <Link
            key={lv}
            href={`/immersion?level=${lv}`}
            prefetch={false}
            className="shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
              background: active ? "var(--color-brand)" : "var(--surface-2)",
              color: active ? "#fff" : "var(--text-muted)",
            }}
          >
            {lv}
          </Link>
        );
      })}
    </div>
  );
}

type Group = { group: number; units: HubUnit[]; reachable: boolean; complete: boolean };

/** Üniteleri gruplara böl + erişilebilirlik/tamamlanma işaretle (pagination kapısı). */
function groupUnits(units: HubUnit[]): Group[] {
  const byGroup = new Map<number, HubUnit[]>();
  for (const u of units) {
    const arr = byGroup.get(u.group) ?? [];
    arr.push(u);
    byGroup.set(u.group, arr);
  }
  const out: Group[] = [];
  let prevComplete = true; // ilk grup daima erişilebilir
  for (const group of [...byGroup.keys()].sort((a, b) => a - b)) {
    const gUnits = byGroup.get(group)!;
    const complete = gUnits.every((u) => u.complete);
    out.push({ group, units: gUnits, reachable: prevComplete, complete });
    prevComplete = complete;
  }
  // İlk erişilemeyen grubu bir kapı olarak göster, sonrasını gizle.
  const firstLocked = out.findIndex((g) => !g.reachable);
  return firstLocked < 0 ? out : out.slice(0, firstLocked + 1);
}

function GroupSection({ group, currentIndex }: { group: Group; currentIndex: number }) {
  const first = group.units[0]?.index ?? 0;
  const last = group.units.at(-1)?.index ?? 0;

  if (!group.reachable) {
    return (
      <section className="card flex items-center gap-3 p-4" style={{ opacity: 0.7 }}>
        <LockGlyph />
        <div>
          <p className="text-sm font-semibold">Bölüm {group.group + 1} · Ünite {first}–{last}</p>
          <p className="muted text-xs">Açmak için önceki bölümü tamamla.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
        Bölüm {group.group + 1} · Ünite {first}–{last}
      </h2>
      <div className="flex flex-col gap-3">
        {group.units.map((u) => (
          <UnitCard key={u.id} unit={u} isCurrent={u.index === currentIndex} />
        ))}
      </div>
    </section>
  );
}

function UnitCard({ unit, isCurrent }: { unit: HubUnit; isCurrent: boolean }) {
  return (
    <div
      className="card overflow-hidden p-0"
      style={isCurrent ? { boxShadow: "0 0 0 2px var(--color-brand)" } : undefined}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">
            Ünite {unit.index} · {unit.theme}
          </p>
          <p className="muted text-xs">
            {unit.complete ? "Dersler tamam" : `${unit.lessonsDone}/${unit.lessonsTotal} ders`}
            {isCurrent && !unit.complete ? " · buradasın" : ""}
          </p>
        </div>
        <UnitStatus unit={unit} />
      </div>
      <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
        {unit.items.map((it) => (
          <ItemRow key={it.id} item={it} unitLocked={unit.locked} />
        ))}
      </ul>
    </div>
  );
}

function UnitStatus({ unit }: { unit: HubUnit }) {
  if (unit.complete) {
    return (
      <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: "var(--color-mint-600)", color: "#fff" }}>
        ✓
      </span>
    );
  }
  if (unit.locked) return <LockGlyph />;
  return (
    <span className="shrink-0 text-xs font-semibold" style={{ color: "var(--color-brand)" }}>
      {unit.lessonsTotal > 0 ? Math.round((unit.lessonsDone / unit.lessonsTotal) * 100) : 0}%
    </span>
  );
}

function ItemRow({ item, unitLocked }: { item: HubItem; unitLocked: boolean }) {
  const tone = KIND_TONE[item.kind];
  const label = KIND_LABEL[item.kind];
  const clickable = item.playable && item.href !== null;

  const inner = (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <span
        className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase"
        style={{ background: "var(--surface-2)", color: tone }}
      >
        {label}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium" style={item.playable ? undefined : { color: "var(--text-muted)" }}>
          {item.title}
        </p>
        {item.titleTr && item.title !== item.titleTr && (
          <p className="muted truncate text-xs">{item.titleTr}</p>
        )}
      </div>
      <ItemStatus item={item} unitLocked={unitLocked} />
    </div>
  );

  if (clickable) {
    return (
      <li>
        <Link href={item.href!} prefetch={false} className="block hover:bg-[var(--surface-2)]">
          {inner}
        </Link>
      </li>
    );
  }
  return <li style={{ opacity: item.playable ? 1 : 0.6 }}>{inner}</li>;
}

function ItemStatus({ item, unitLocked }: { item: HubItem; unitLocked: boolean }) {
  if (item.done) {
    return <span className="shrink-0 text-xs font-bold" style={{ color: "var(--color-mint-600)" }}>tamam</span>;
  }
  if (!item.playable) {
    return <span className="shrink-0 text-xs" style={{ color: "var(--text-muted)" }}>yakında</span>;
  }
  if (unitLocked) {
    return <span className="shrink-0 text-xs" style={{ color: "var(--text-muted)" }}>kilitli</span>;
  }
  // Ders = ana yol (gating); beceri/quiz = isteğe bağlı zenginleştirme.
  if (item.kind !== "lesson") {
    return <span className="shrink-0 text-xs" style={{ color: "var(--text-muted)" }}>isteğe bağlı →</span>;
  }
  return <span className="shrink-0 text-xs font-semibold" style={{ color: "var(--color-brand)" }}>başla →</span>;
}

function LockGlyph() {
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-1 text-xs"
      style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
      aria-label="kilitli"
    >
      🔒
    </span>
  );
}
