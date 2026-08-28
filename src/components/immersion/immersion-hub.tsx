import Link from "next/link";
import type { ReactNode } from "react";
import type { CefrLevel } from "@/lib/skills/types";
import type { ImmersionItemKind } from "@/lib/immersion/types";

/**
 * Patika ana ekranı (immersion, 2. mod) — Duolingo tarzı hafif 3D dolambaçlı yol.
 *
 * Etkileşim yok (sunucu bileşeni): her ünite kendi serpentine patikası, item'lar
 * 3D basılabilir düğüm. Seviye seçimi YOK — kullanıcı kendi seviyesindedir (rozet
 * olarak gösterilir), CEFR başka yerde (yerleştirme) belirlenir. Gating sunucuda
 * hesaplanıp gelir; oynanabilir düğümler oynatıcıya bağlanır, yer tutucular
 * ("yakında") soluk ve tıklanmaz.
 */

export type HubItem = {
  id: string;
  kind: ImmersionItemKind;
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
};

// ── Düğüm tonu (üst yüz + 3D alt kenar) ─────────────────────────────
type Tone = { fill: string; rim: string };
const TONE: Record<string, Tone> = {
  done: { fill: "#58a700", rim: "#3f7d00" },
  lesson: { fill: "#8b5cf6", rim: "#6d28d9" },
  skill: { fill: "#1899d6", rim: "#127bb0" },
  grammar: { fill: "#12b39a", rim: "#0d8a77" },
  quiz: { fill: "#f7a20b", rim: "#c97f06" },
  checkpoint: { fill: "#f5b301", rim: "#c78f00" },
  locked: { fill: "var(--surface-2)", rim: "var(--border)" },
  soon: { fill: "var(--surface-2)", rim: "transparent" },
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

type NodeStatus = "done" | "current" | "available" | "locked" | "soon";

function toneFor(item: HubItem, status: NodeStatus): Tone {
  if (status === "done") return TONE.done;
  if (status === "soon") return TONE.soon;
  if (status === "locked") return TONE.locked;
  if (item.kind === "lesson") return TONE.lesson;
  if (item.kind === "read" || item.kind === "listen" || item.kind === "write") return TONE.skill;
  if (item.kind === "grammar") return TONE.grammar;
  if (item.kind === "quiz") return TONE.quiz;
  return TONE.checkpoint;
}

// ── Serpentine geometri ─────────────────────────────────────────────
const XS = [50, 72, 50, 28];
const TOP = 52;
const ROW = 92;
const NODE = 62;
const CP = 76; // checkpoint biraz büyük (ödül)

function posOf(i: number) {
  return { x: XS[i % 4], y: TOP + i * ROW };
}

export function ImmersionHub({ level, units, currentIndex, doneUnits, totalUnits }: ImmersionHubProps) {
  const groups = groupUnits(units);
  const pct = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-28 pt-4">
      <header className="mb-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-extrabold">Patika</h1>
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
          >
            {level}
          </span>
        </div>
        <p className="muted mt-1 text-sm">
          Dersler, okuma-dinleme-yazma ve tekrarlar iç içe — amaç kelime ezberi değil,
          <strong> kendi cümleni kurmak.</strong>
        </p>
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold">{level} ilerlemesi</span>
            <span className="muted">
              {doneUnits}/{totalUnits} ünite · %{pct}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#58a700" }} />
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {groups.map((g) => (
          <GroupBlock key={g.group} group={g} currentIndex={currentIndex} />
        ))}
      </div>
    </div>
  );
}

type Group = { group: number; units: HubUnit[]; reachable: boolean; complete: boolean };

function groupUnits(units: HubUnit[]): Group[] {
  const byGroup = new Map<number, HubUnit[]>();
  for (const u of units) {
    const arr = byGroup.get(u.group) ?? [];
    arr.push(u);
    byGroup.set(u.group, arr);
  }
  const out: Group[] = [];
  let prevComplete = true;
  for (const group of [...byGroup.keys()].sort((a, b) => a - b)) {
    const gUnits = byGroup.get(group)!;
    out.push({ group, units: gUnits, reachable: prevComplete, complete: gUnits.every((u) => u.complete) });
    prevComplete = gUnits.every((u) => u.complete);
  }
  const firstLocked = out.findIndex((g) => !g.reachable);
  return firstLocked < 0 ? out : out.slice(0, firstLocked + 1);
}

function GroupBlock({ group, currentIndex }: { group: Group; currentIndex: number }) {
  const first = group.units[0]?.index ?? 0;
  const last = group.units.at(-1)?.index ?? 0;

  if (!group.reachable) {
    return (
      <section
        className="mt-2 flex items-center gap-3 rounded-2xl p-4"
        style={{ background: "var(--surface-2)", opacity: 0.75 }}
      >
        <LockGlyph size={28} />
        <div>
          <p className="text-sm font-bold">Bölüm {group.group + 1} · Ünite {first}–{last}</p>
          <p className="muted text-xs">Açmak için önceki bölümü tamamla.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-1">
      {group.units.map((u) => (
        <div key={u.id}>
          <UnitBanner unit={u} />
          <UnitPath unit={u} isCurrentUnit={u.index === currentIndex} />
        </div>
      ))}
    </section>
  );
}

function UnitBanner({ unit }: { unit: HubUnit }) {
  const bg = unit.complete ? "#58a700" : unit.locked ? "var(--surface-2)" : "#8b5cf6";
  const fg = unit.locked ? "var(--text-muted)" : "#fff";
  return (
    <div className="sticky top-2 z-10 mb-1 flex items-center justify-between gap-2 rounded-2xl px-4 py-2.5 shadow-sm" style={{ background: bg, color: fg }}>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide" style={{ opacity: 0.85 }}>
          Bölüm {unit.group + 1} · Ünite {unit.index}
        </p>
        <p className="truncate text-sm font-extrabold">{unit.theme}</p>
      </div>
      <span className="shrink-0 text-xs font-bold" style={{ opacity: 0.95 }}>
        {unit.complete ? "✓ Bitti" : unit.locked ? "🔒" : `${unit.lessonsDone}/${unit.lessonsTotal} ders`}
      </span>
    </div>
  );
}

function UnitPath({ unit, isCurrentUnit }: { unit: HubUnit; isCurrentUnit: boolean }) {
  const items = unit.items;
  const points = items.map((_, i) => posOf(i));
  const last = points.at(-1) ?? { x: 50, y: TOP };
  const height = last.y + CP / 2 + 36;

  // "current" düğüm: current ünitedeki ilk oynanabilir-ve-bitmemiş item.
  const currentIdx = isCurrentUnit ? items.findIndex((it) => it.playable && !it.done) : -1;

  const edges = points.slice(1).map((p, i) => {
    const prev = points[i];
    const midY = (prev.y + p.y) / 2;
    return { d: `M ${prev.x} ${prev.y} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`, passed: items[i].done };
  });

  return (
    <div className="relative" style={{ height }}>
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        {edges.map((e, i) => (
          <path
            key={i}
            d={e.d}
            fill="none"
            stroke={e.passed ? "#58a700" : "var(--border)"}
            strokeOpacity={e.passed ? 0.5 : 0.9}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={items[i + 1]?.playable ? undefined : "1 9"}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {items.map((item, i) => {
        const status: NodeStatus = item.done
          ? "done"
          : !item.playable
            ? "soon"
            : unit.locked
              ? "locked"
              : i === currentIdx
                ? "current"
                : "available";
        return <PathNode key={item.id} item={item} status={status} at={points[i]} />;
      })}
    </div>
  );
}

function PathNode({ item, status, at }: { item: HubItem; status: NodeStatus; at: { x: number; y: number } }) {
  const tone = toneFor(item, status);
  const size = item.kind === "checkpoint" ? CP : NODE;
  const clickable = item.playable && item.href;
  const depth = status === "soon" ? 0 : 6;
  const current = status === "current";

  const body = (
    <div className="relative" style={{ width: size, height: size }}>
      {/* zemin gölgesi — "yere basıyor" hissi (hafif 3D) */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{ width: size * 0.72, height: size * 0.16, bottom: -8, background: "rgba(0,0,0,0.16)", filter: "blur(3px)" }}
      />
      {current && (
        <span
          className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-xl px-2.5 py-1 text-[11px] font-extrabold shadow-md"
          style={{ background: "#fff", color: tone.fill, border: `2px solid ${tone.fill}` }}
        >
          BAŞLA
        </span>
      )}
      <div
        className="flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: tone.fill,
          boxShadow: depth ? `0 ${depth}px 0 0 ${tone.rim}, 0 ${depth + 5}px 12px rgba(0,0,0,0.18)` : undefined,
          border: status === "soon" ? "2.5px dashed var(--border)" : status === "locked" ? "2px solid var(--border)" : "none",
          opacity: status === "soon" ? 0.7 : 1,
          transform: current ? "scale(1.06)" : undefined,
        }}
      >
        <Glyph item={item} status={status} />
      </div>
      {/* etiket — düğümün altında, düğümün konumunu kaydırmaz */}
      <span
        className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center text-[10px] font-bold leading-tight"
        style={{ color: status === "done" ? "#58a700" : status === "current" ? tone.fill : "var(--text-muted)" }}
      >
        {KIND_LABEL[item.kind]}
      </span>
    </div>
  );

  const wrap = "absolute" as const;
  const style = { left: `${at.x}%`, top: at.y, transform: "translate(-50%, -50%)" };

  if (clickable) {
    return (
      <Link href={item.href!} prefetch={false} className="group" style={{ ...style, position: wrap }} aria-label={`${KIND_LABEL[item.kind]}: ${item.title}`}>
        <div className="transition-transform group-active:translate-y-0.5">{body}</div>
      </Link>
    );
  }
  return (
    <div style={{ ...style, position: wrap }} aria-label={`${KIND_LABEL[item.kind]} — yakında`}>
      {body}
    </div>
  );
}

// ── Beyaz düğüm simgeleri ───────────────────────────────────────────
function Glyph({ item, status }: { item: HubItem; status: NodeStatus }) {
  if (status === "locked") return <LockGlyph size={24} />;
  if (status === "done") return <Svg>{<path d="M5 12.5l4.2 4.3L19 7" />}</Svg>;
  const kind = item.kind;
  if (kind === "checkpoint")
    return (
      <Svg fill>
        <path d="M6 4h12v3.5a6 6 0 01-12 0zM4.5 5.5H6V8a3 3 0 01-1.5-2.6zM18 5.5h1.5A3 3 0 0118 8zM11 13.5h2V16h-2zM8 17h8v2.5H8z" />
      </Svg>
    );
  if (kind === "quiz")
    return (
      <Svg fill>
        <path d="M13 2.5L5.5 13H10l-1 8.5L18.5 10H13z" />
      </Svg>
    );
  if (kind === "grammar")
    return <span style={{ color: "#fff", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>Aa</span>;
  if (kind === "write")
    return (
      <Svg fill>
        <path d="M4 20l1.3-4.4L15 6l3 3-9.7 9.7zM16 5l1.5-1.5a1.4 1.4 0 012 0l1 1a1.4 1.4 0 010 2L19 8z" />
      </Svg>
    );
  if (kind === "listen")
    return (
      <Svg>
        <path d="M5 13.5a7 7 0 0114 0" />
        <path d="M4.5 14.5h2.5V20H6a1.5 1.5 0 01-1.5-1.5zM17 14.5h2.5V18.5A1.5 1.5 0 0118 20h-1z" fill="#fff" stroke="none" />
      </Svg>
    );
  if (kind === "read")
    return (
      <Svg fill>
        <path d="M4.5 5.5C6.5 4.3 9.5 4.3 11.3 5.5V19c-1.8-1.1-4.8-1.1-6.8 0zM12.7 5.5C14.5 4.3 17.5 4.3 19.5 5.5V19c-2-1.1-5-1.1-6.8 0z" />
      </Svg>
    );
  // lesson → yıldız
  return (
    <Svg fill>
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" />
    </Svg>
  );
}

function Svg({ children, fill = false }: { children: ReactNode; fill?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "#fff" : "none"} stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function LockGlyph({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10V8a5 5 0 0110 0v2" />
      <rect x="5" y="10" width="14" height="9.5" rx="2" fill="var(--text-muted)" stroke="none" />
    </svg>
  );
}
