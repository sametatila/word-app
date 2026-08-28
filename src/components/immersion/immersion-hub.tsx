import Link from "next/link";
import type { ReactNode } from "react";
import type { CefrLevel } from "@/lib/skills/types";
import type { ImmersionItemKind } from "@/lib/immersion/types";

/**
 * Patika ana ekranı (immersion, 2. mod) — dolambaçlı yol, PROJENİN paletiyle.
 *
 * Sunucu bileşeni (JS yok). Her ünite kendi kıvrımlı patikası; item'lar sıcak
 * "madalyon" düğümler (Duolingo kopyası değil): dolu -600 tonu + ince -700 halka
 * + üstte hafif parlaklık + yumuşak gölge. Renkler globals.css paletinden ve
 * DOLU zeminde tema-bağımsız sabit -600 tonları (bkz. palet notu). Yol geometrisi
 * SABİT PİKSEL (yatay esneme yok → kıvrımlar temiz). Seviye seçimi yok.
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

// ── Düğüm tonu — PALETTEN, dolu zeminde sabit -600 (tema-bağımsız) ──────
type Tone = { fill: string; rim: string };
function toneFor(kind: ImmersionItemKind, status: NodeStatus): Tone {
  if (status === "done") return { fill: "var(--color-mint-600)", rim: "var(--color-mint-700)" };
  if (status === "locked" || status === "soon") return { fill: "var(--surface-2)", rim: "var(--border)" };
  switch (kind) {
    case "lesson":
      return { fill: "var(--color-brand-600)", rim: "var(--color-brand-700)" };
    case "read":
      return { fill: "var(--color-sky-600)", rim: "var(--color-sky-700)" };
    case "listen":
      return { fill: "var(--color-violet-600)", rim: "var(--color-violet-700)" };
    case "write":
      return { fill: "var(--color-flame-600)", rim: "var(--color-flame-700)" };
    case "grammar":
      return { fill: "var(--color-brand-600)", rim: "var(--color-brand-700)" };
    case "quiz":
      return { fill: "var(--color-sky-600)", rim: "var(--color-sky-700)" };
    default: // checkpoint
      return { fill: "var(--color-rose-600)", rim: "var(--color-rose-700)" };
  }
}

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

// ── Serpentine geometri — SABİT PİKSEL (yatay esneme yok) ───────────────
const W = 300; // patika sütun genişliği (px), ortalanır
const CX = W / 2;
const AMP = 66; // merkeze göre yatay sapma
const XS = [CX, CX + AMP, CX, CX - AMP];
const TOP = 50;
const ROW = 90;
const NODE = 60;
const CP = 74;

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
          <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
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
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--color-mint-500)" }} />
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-2">
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
    const complete = gUnits.every((u) => u.complete);
    out.push({ group, units: gUnits, reachable: prevComplete, complete });
    prevComplete = complete;
  }
  const firstLocked = out.findIndex((g) => !g.reachable);
  return firstLocked < 0 ? out : out.slice(0, firstLocked + 1);
}

function GroupBlock({ group, currentIndex }: { group: Group; currentIndex: number }) {
  const first = group.units[0]?.index ?? 0;
  const last = group.units.at(-1)?.index ?? 0;

  if (!group.reachable) {
    return (
      <section className="mt-2 flex items-center gap-3 rounded-2xl p-4" style={{ background: "var(--surface-2)", opacity: 0.8 }}>
        <LockGlyph size={26} />
        <div>
          <p className="text-sm font-bold">Bölüm {group.group + 1} · Ünite {first}–{last}</p>
          <p className="muted text-xs">Açmak için önceki bölümü tamamla.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
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
  const bg = unit.complete ? "var(--color-mint-600)" : unit.locked ? "var(--surface-2)" : "var(--color-brand-600)";
  const fg = unit.locked ? "var(--text-muted)" : "#fff";
  return (
    <div className="sticky top-2 z-20 mb-1 flex items-center justify-between gap-2 rounded-2xl px-4 py-2.5" style={{ background: bg, color: fg, boxShadow: "0 4px 12px rgba(20,16,14,0.14)" }}>
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
  const pts = items.map((_, i) => posOf(i));
  const last = pts.at(-1) ?? { x: CX, y: TOP };
  const height = last.y + CP / 2 + 34;
  const currentIdx = isCurrentUnit ? items.findIndex((it) => it.playable && !it.done) : -1;

  const edges = pts.slice(1).map((p, i) => {
    const prev = pts[i];
    const midY = (prev.y + p.y) / 2;
    return { d: `M ${prev.x} ${prev.y} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`, passed: items[i].done, dashed: !items[i + 1]?.playable };
  });

  return (
    <div className="relative mx-auto" style={{ width: W, height }}>
      {/* patika — sabit px, esnemez; altta koyu iz + üstte açık iz (yumuşak yol) */}
      <svg aria-hidden className="absolute inset-0" width={W} height={height} viewBox={`0 0 ${W} ${height}`}>
        {edges.map((e, i) => (
          <path key={`b${i}`} d={e.d} fill="none" stroke={e.passed ? "var(--color-mint-500)" : "var(--border)"} strokeWidth={13} strokeLinecap="round" opacity={e.dashed ? 0.6 : 1} strokeDasharray={e.dashed ? "2 16" : undefined} />
        ))}
      </svg>
      {items.map((item, i) => {
        const status: NodeStatus = item.done ? "done" : !item.playable ? "soon" : unit.locked ? "locked" : i === currentIdx ? "current" : "available";
        return <PathNode key={item.id} item={item} status={status} at={pts[i]} />;
      })}
    </div>
  );
}

function PathNode({ item, status, at }: { item: HubItem; status: NodeStatus; at: { x: number; y: number } }) {
  const tone = toneFor(item.kind, status);
  const size = item.kind === "checkpoint" ? CP : NODE;
  const clickable = item.playable && item.href;
  const current = status === "current";
  const muted = status === "soon" || status === "locked";

  const body = (
    <div className="relative" style={{ width: size, height: size }}>
      {current && (
        <span className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-extrabold" style={{ background: "var(--surface)", color: "var(--color-brand-600)", border: "2px solid var(--color-brand-600)", boxShadow: "0 3px 8px rgba(20,16,14,0.18)" }}>
          BAŞLA
        </span>
      )}
      {/* madalyon düğüm — dolu ton + ince halka + üst parlaklık + yumuşak gölge */}
      <div
        className="flex h-full w-full items-center justify-center rounded-full"
        style={{
          background: tone.fill,
          border: `2px solid ${status === "soon" ? "var(--border)" : tone.rim}`,
          borderStyle: status === "soon" ? "dashed" : "solid",
          boxShadow: muted
            ? "none"
            : `inset 0 2px 3px rgba(255,255,255,0.28), inset 0 -3px 4px rgba(20,16,14,0.18), 0 5px 12px rgba(20,16,14,0.26)`,
          opacity: status === "soon" ? 0.65 : 1,
          transform: current ? "scale(1.05)" : undefined,
        }}
      >
        <Glyph item={item} status={status} />
      </div>
      {/* etiket — düğümün konumunu kaydırmaz */}
      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold" style={{ color: status === "done" ? "var(--color-mint-600)" : current ? "var(--color-brand-600)" : "var(--text-muted)" }}>
        {KIND_LABEL[item.kind]}
      </span>
    </div>
  );

  const style = { position: "absolute" as const, left: at.x, top: at.y, transform: "translate(-50%, -50%)" };
  if (clickable) {
    return (
      <Link href={item.href!} prefetch={false} className="group" style={style} aria-label={`${KIND_LABEL[item.kind]}: ${item.title}`}>
        <div className="transition-transform group-active:translate-y-px">{body}</div>
      </Link>
    );
  }
  return (
    <div style={style} aria-label={`${KIND_LABEL[item.kind]} — yakında`}>
      {body}
    </div>
  );
}

// ── Beyaz düğüm simgeleri ───────────────────────────────────────────
function Glyph({ item, status }: { item: HubItem; status: NodeStatus }) {
  if (status === "locked") return <LockGlyph size={22} />;
  if (status === "done")
    return (
      <Svg>
        <path d="M5 12.5l4.2 4.3L19 7" />
      </Svg>
    );
  const c = status === "soon" ? "var(--text-muted)" : "#fff";
  const k = item.kind;
  if (k === "checkpoint")
    return (
      <Svg fill c={c}>
        <path d="M6 4h12v3.5a6 6 0 01-12 0zM4.5 5.5H6V8a3 3 0 01-1.5-2.6zM18 5.5h1.5A3 3 0 0118 8zM11 13.5h2V16h-2zM8 17h8v2.5H8z" />
      </Svg>
    );
  if (k === "quiz")
    return (
      <Svg fill c={c}>
        <path d="M13 2.5L5.5 13H10l-1 8.5L18.5 10H13z" />
      </Svg>
    );
  if (k === "grammar") return <span style={{ color: c, fontWeight: 900, fontSize: 19, lineHeight: 1 }}>Aa</span>;
  if (k === "write")
    return (
      <Svg fill c={c}>
        <path d="M4 20l1.3-4.4L15 6l3 3-9.7 9.7zM16 5l1.5-1.5a1.4 1.4 0 012 0l1 1a1.4 1.4 0 010 2L19 8z" />
      </Svg>
    );
  if (k === "listen")
    return (
      <Svg c={c}>
        <path d="M5 13.5a7 7 0 0114 0" />
        <path d="M4.5 14.5h2.5V20H6a1.5 1.5 0 01-1.5-1.5zM17 14.5h2.5V18.5A1.5 1.5 0 0118 20h-1z" fill={c} stroke="none" />
      </Svg>
    );
  if (k === "read")
    return (
      <Svg fill c={c}>
        <path d="M4.5 5.5C6.5 4.3 9.5 4.3 11.3 5.5V19c-1.8-1.1-4.8-1.1-6.8 0zM12.7 5.5C14.5 4.3 17.5 4.3 19.5 5.5V19c-2-1.1-5-1.1-6.8 0z" />
      </Svg>
    );
  // lesson → yıldız
  return (
    <Svg fill c={c}>
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" />
    </Svg>
  );
}

function Svg({ children, fill = false, c = "#fff" }: { children: ReactNode; fill?: boolean; c?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? c : "none"} stroke={c} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function LockGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10V8a5 5 0 0110 0v2" />
      <rect x="5" y="10" width="14" height="9.5" rx="2" fill="var(--text-muted)" stroke="none" />
    </svg>
  );
}
