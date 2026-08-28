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

const ICON: Record<ImmersionItemKind, string> = {
  lesson: "★",
  read: "📖",
  listen: "🎧",
  write: "✎",
  grammar: "Aa",
  quiz: "⚡",
  checkpoint: "🏆",
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
  const nextHref = unit.items.find((i) => i.playable && !i.done && i.href)?.href ?? unit.items.find((i) => i.href)?.href ?? null;

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

      {/* item hapları — oynatıcıya bağlı */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {unit.items.map((it) => (
          <Hap key={it.id} item={it} locked={unit.locked} />
        ))}
      </div>

      {nextHref && !unit.locked ? (
        <Link
          href={nextHref}
          prefetch={false}
          className="mt-4 block rounded-2xl py-3.5 text-center text-base font-extrabold text-white"
          style={{ background: "linear-gradient(180deg,var(--color-brand-500),var(--color-brand-600))", boxShadow: "0 4px 0 var(--color-brand-700)" }}
        >
          {unit.complete ? "Tekrar et →" : "Devam et →"}
        </Link>
      ) : (
        <div className="mt-4 rounded-2xl py-3.5 text-center text-sm font-bold" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
          🔒 Önceki üniteyi bitir
        </div>
      )}
    </section>
  );
}

function Hap({ item, locked }: { item: HubItem; locked: boolean }) {
  const done = item.done;
  const current = item.playable && !item.done && !locked;
  const bg = done ? "var(--color-mint-600)" : current ? "var(--color-brand-600)" : "var(--surface-2)";
  const fg = done || current ? "#fff" : "var(--text-muted)";
  const inner = (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-[10px] text-sm font-extrabold"
      style={{
        background: bg,
        color: fg,
        opacity: item.playable || done ? 1 : 0.6,
        boxShadow: current ? "0 2px 0 var(--color-brand-700)" : undefined,
      }}
      title={`${KIND_LABEL[item.kind]}${item.titleTr ? " · " + item.titleTr : ""}`}
    >
      {done ? "✓" : ICON[item.kind]}
    </span>
  );
  if (item.href && item.playable && !locked) {
    return (
      <Link href={item.href} prefetch={false}>
        {inner}
      </Link>
    );
  }
  return inner;
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
