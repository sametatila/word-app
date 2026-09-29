"use client";

import {
  ReactionCheerIcon,
  ReactionHeartIcon,
  ReactionStarIcon,
  ReactionStrongIcon,
  ReactionWowIcon,
  StreakIcon,
  type IconProps,
} from "@/components/icons";
import { REACTION_LABEL_KEYS, type ReactionKind } from "@/lib/social/types";
import { useT } from "@/lib/i18n/client";

/** Tepki → ikon. Emoji değil; her tepkinin bir adı ve rengi var. */
export const REACTION_ICON: Record<ReactionKind, (p: IconProps) => React.JSX.Element> = {
  cheer: ReactionCheerIcon,
  fire: StreakIcon,
  heart: ReactionHeartIcon,
  strong: ReactionStrongIcon,
  star: ReactionStarIcon,
  wow: ReactionWowIcon,
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
/**
 * Bir 500 dolgusunun %14 yumuşak zemini — mobil `soft(tint, colors)`.
 * Marka dolgusu `--brand-tint`e gider: koyu temada turuncu wash yerine nötr
 * `--surface-2` (2026-09-29 Samet: seçim B, dolu turuncu çip).
 */
export function softFill(fill: string): string {
  return fill === "var(--color-brand-500)" ? "var(--brand-tint)" : `color-mix(in srgb, ${fill} 14%, transparent)`;
}

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
