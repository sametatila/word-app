"use client";

import type { SVGProps } from "react";
import { FlameIcon, HeartIcon, PartyIcon, SparkIcon, StarIcon } from "@/components/icons";
import { REACTION_LABEL_KEYS, type ReactionKind } from "@/lib/social/types";
import { useT } from "@/lib/i18n/client";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** icons.tsx ile aynı ızgara ve çizgi kalınlığı — yalnız burada gereken tek ek ikon. */
function BoltIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />
    </svg>
  );
}

/** Tepki → ikon. Emoji değil; her tepkinin bir adı ve rengi var. */
export const REACTION_ICON: Record<ReactionKind, (p: IconProps) => React.JSX.Element> = {
  cheer: PartyIcon,
  fire: FlameIcon,
  heart: HeartIcon,
  strong: BoltIcon,
  star: StarIcon,
  wow: SparkIcon,
};

/**
 * Tepki tonları — Android `social/common` `reactionTone` ile birebir
 * (brand↔primary, mint↔success, rose↔danger, flame↔streak, sky↔info,
 * violet↔accent). `star` burada marka rengiydi, Android'de seri rengi: aynı
 * tepki iki platformda iki renkte çiziliyordu. `scripts/parity-check.mjs`
 * 14. bölümü ikisini karşılaştırıyor.
 */
export const REACTION_TONE: Record<ReactionKind, string> = {
  cheer: "var(--color-brand)",
  fire: "var(--color-flame)",
  heart: "var(--color-rose)",
  strong: "var(--color-violet)",
  star: "var(--color-flame)",
  wow: "var(--color-sky)",
};

/**
 * Aynı tonların YUMUŞAK ZEMİN karşılığı — ailenin 500'ü.
 *
 * Yumuşak tintin zemini takma addan (600) kurulunca aynı mürekkep eşiğin
 * altına düşüyor (bkz. `globals.css` `.tint-soft`). Mürekkep yukarıdaki
 * tablodan, zemin buradan.
 */
export const REACTION_FILL: Record<ReactionKind, string> = {
  cheer: "var(--color-brand-500)",
  fire: "var(--color-flame-500)",
  heart: "var(--color-rose-500)",
  strong: "var(--color-violet-500)",
  star: "var(--color-flame-500)",
  wow: "var(--color-sky-500)",
};

export function ReactionGlyph({ kind, size = 16, color }: { kind: ReactionKind; size?: number; color?: string }) {
  const t = useT();
  const Icon = REACTION_ICON[kind];
  /* `color` yalnız DOLU zeminde veriliyor (seçili tepki): orada glif tonun
     kendisi değil `on-fill` olmalı, yoksa ton tonun üstünde kalıyor. */
  return (
    <span style={{ color: color ?? REACTION_TONE[kind] }} title={t(REACTION_LABEL_KEYS[kind])} aria-label={t(REACTION_LABEL_KEYS[kind])}>
      <Icon size={size} />
    </span>
  );
}
