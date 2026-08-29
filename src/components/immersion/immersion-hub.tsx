"use client";

import { useState } from "react";
import Link from "next/link";
import type { CefrLevel } from "@/lib/skills/types";
import type { ImmersionItemKind } from "@/lib/immersion/types";

/**
 * Patika ana ekranı (immersion, 2. mod) — BENTO IZGARA (sahibin seçimi).
 *
 * Üstte AKTİF ünite tam-genişlik "öne çıkan kart" (item hap-simgeleri + Devam et),
 * altında diğer üniteler 2'li ızgara fayanslar (ilerleme halkası + durum). Bir
 * fayansa dokununca o ünite öne çıkar (istemci durumu) — CEFR seçimi yok, ünite
 * içi gezinme var. Renkler projenin paletinden; dolu zeminlerde tema-bağımsız
 * sabit -600 tonları (globals.css palet notu). Tema-duyarlı (açık/koyu).
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

const KIND_LABEL: Record<ImmersionItemKind, string> = {
  lesson: "Ders",
  read: "Okuma",
  listen: "Dinleme",
  write: "Yazma",
  grammar: "Dil bilgisi",
  quiz: "Tekrar",
  checkpoint: "Kontrol",
};

export function ImmersionHub({ level, units, currentIndex, doneUnits, totalUnits }: ImmersionHubProps) {
  const initial = Math.max(0, units.findIndex((u) => u.index === currentIndex));
  const [featIdx, setFeatIdx] = useState(initial);
  const feat = units[featIdx] ?? units[0];
  const pctAll = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-28 pt-11">
      {/* üst başlık */}
      <header className="mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Patika</h1>
          <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
            {level}
          </span>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
          <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pctAll}%`, background: "var(--color-mint-500)" }} />
        </div>
        <p className="mt-1.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
          {level} · {doneUnits}/{totalUnits} ünite tamam
        </p>
      </header>

      {feat && <Featured unit={feat} isCurrent={feat.index === currentIndex} />}

      <div className="mt-3 grid grid-cols-2 gap-3">
        {units.map((u, i) => (
          <Tile key={u.id} unit={u} active={i === featIdx} onSelect={() => !u.locked && setFeatIdx(i)} />
        ))}
      </div>
    </div>
  );
}

function Featured({ unit, isCurrent }: { unit: HubUnit; isCurrent: boolean }) {
  const next = unit.items.find((i) => i.playable && !i.done && i.href) ?? null;
  const nextHref = next?.href ?? unit.items.find((i) => i.href)?.href ?? null;

  return (
    <section
      className="rounded-3xl p-4"
      style={{ background: "var(--surface)", border: "2px solid var(--color-brand-600)", boxShadow: "0 16px 30px -16px rgba(120,60,10,0.35)" }}
    >
      <div className="flex items-start gap-3">
        <UnitBadge unit={unit} big />
        <div className="min-w-0 flex-1">
          <p className="text-[10.5px] font-extrabold uppercase tracking-wider" style={{ color: "var(--color-brand-600)" }}>
            {isCurrent ? "Şu an" : "Ünite"} · Ünite {unit.index}
          </p>
          <p className="truncate text-lg font-bold leading-tight">{unit.theme}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {unit.complete ? "Tamamlandı" : `${unit.done}/${unit.total} adım`}
          </p>
        </div>
      </div>

      {/* segment çubuğu — ünitenin bölümleri (ikon kalabalığı yok): biten yosun,
          sıradaki kehribar, gerisi boş. */}
      <div className="mt-3.5 flex gap-1">
        {unit.items.map((it) => {
          const seg = it.done ? "var(--color-mint-500)" : it === next ? "var(--color-brand-600)" : "var(--surface-2)";
          return <span key={it.id} className="h-2.5 flex-1 rounded-full" style={{ background: seg }} />;
        })}
      </div>

      {/* sıradaki adım — tek biçim çizgi-ikon + item adı */}
      {next && !unit.locked && (
        <div className="mt-3.5 flex items-center gap-3 rounded-2xl p-3" style={{ background: "var(--surface-2)" }}>
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ background: "linear-gradient(180deg,var(--color-brand-500),var(--color-brand-600))" }}
          >
            <KindIcon kind={next.kind} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
              Sıradaki · {KIND_LABEL[next.kind]}
            </p>
            <p className="truncate text-sm font-bold">{next.title}</p>
          </div>
        </div>
      )}

      {nextHref && !unit.locked ? (
        <Link
          href={nextHref}
          prefetch={false}
          className="mt-3.5 block rounded-2xl py-3.5 text-center text-base font-extrabold text-white"
          style={{ background: "linear-gradient(180deg,var(--color-brand-500),var(--color-brand-600))", boxShadow: "0 4px 0 var(--color-brand-700)" }}
        >
          {unit.complete ? "Tekrar et →" : "Devam et →"}
        </Link>
      ) : (
        <div className="mt-3.5 rounded-2xl py-3.5 text-center text-sm font-bold" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
          🔒 Önceki üniteyi bitir
        </div>
      )}
    </section>
  );
}

/** Tek biçim çizgi-ikon (karışık emoji yerine) — "sıradaki" satırında kullanılır. */
function KindIcon({ kind }: { kind: ImmersionItemKind }) {
  const c = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "read":
      return (
        <svg {...c}>
          <path d="M12 6C9 4 5 4 3 5v13c2-1 6-1 9 1 3-2 7-2 9-1V5c-2-1-6-1-9 1z" />
          <path d="M12 7v12" />
        </svg>
      );
    case "listen":
      return (
        <svg {...c}>
          <path d="M5 13a7 7 0 0114 0" />
          <rect x="3.5" y="13" width="4" height="7" rx="1.5" />
          <rect x="16.5" y="13" width="4" height="7" rx="1.5" />
        </svg>
      );
    case "write":
      return (
        <svg {...c}>
          <path d="M4 20l1-4L16 5l3 3L8 19z" />
          <path d="M14 7l3 3" />
        </svg>
      );
    case "grammar":
      return (
        <svg {...c}>
          <path d="M4 18L9 6l5 12" />
          <path d="M5.5 14h7" />
          <path d="M17 10v8" />
          <path d="M17 11a3 3 0 100 6" />
        </svg>
      );
    case "quiz":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9a3 3 0 114 2.8c-1 .4-1 1-1 2.2" />
          <path d="M12 17.5v.5" />
        </svg>
      );
    case "checkpoint":
      return (
        <svg {...c}>
          <path d="M6 4v16" />
          <path d="M6 5h11l-2 3 2 3H6" />
        </svg>
      );
    default: // lesson
      return (
        <svg {...c}>
          <path d="M4 5h16v11H8l-4 3z" />
        </svg>
      );
  }
}

function Tile({ unit, active, onSelect }: { unit: HubUnit; active: boolean; onSelect: () => void }) {
  const pct = unit.total ? Math.round((unit.done / unit.total) * 100) : 0;
  const clickable = !unit.locked;
  const body = (
    <>
      <div className="flex w-full items-center justify-between">
        <Ring pct={unit.complete ? 100 : pct} unit={unit} />
        <span className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}>
          Ünite {unit.index}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-bold leading-tight">{unit.theme}</p>
      <p className="mt-auto pt-1 text-[11px] font-semibold" style={{ color: unit.complete ? "var(--color-mint-600)" : "var(--text-muted)" }}>
        {unit.complete ? "Tamamlandı" : unit.locked ? "Kilitli" : `${unit.done}/${unit.total}`}
      </p>
    </>
  );
  const style = {
    background: "var(--surface)",
    border: active ? "2px solid var(--color-brand-600)" : "1px solid var(--border)",
    opacity: unit.locked ? 0.62 : 1,
    minHeight: 118,
  };
  const cls = "flex flex-col items-start rounded-2xl p-3.5 text-left transition-transform active:scale-[0.98]";
  if (clickable) {
    return (
      <button type="button" onClick={onSelect} className={cls} style={style}>
        {body}
      </button>
    );
  }
  return (
    <div className={cls} style={style}>
      {body}
    </div>
  );
}

/** Küçük ünite rozeti — ilerleme halkası + içinde durum. */
function Ring({ pct, unit }: { pct: number; unit: HubUnit }) {
  const glyph = unit.complete ? "✓" : unit.locked ? "🔒" : String(unit.index);
  const col = unit.complete ? "var(--color-mint-500)" : unit.locked ? "var(--border)" : "var(--color-brand-500)";
  return (
    <span
      className="grid h-11 w-11 place-items-center rounded-full"
      style={{ background: `conic-gradient(${col} ${pct * 3.6}deg, var(--surface-2) 0)` }}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold" style={{ background: "var(--surface)", color: col }}>
        {glyph}
      </span>
    </span>
  );
}

/** Öne çıkan karttaki büyük ünite rozeti. */
function UnitBadge({ unit, big }: { unit: HubUnit; big?: boolean }) {
  const size = big ? "h-14 w-14 text-xl" : "h-11 w-11 text-base";
  const glyph = unit.complete ? "✓" : unit.locked ? "🔒" : String(unit.index);
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-2xl font-extrabold text-white`}
      style={{ background: "linear-gradient(180deg,var(--color-brand-500),var(--color-brand-600))", boxShadow: "0 3px 0 var(--color-brand-700)" }}
    >
      {glyph}
    </span>
  );
}
