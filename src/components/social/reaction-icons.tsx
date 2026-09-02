import type { SVGProps } from "react";
import { FlameIcon, HeartIcon, PartyIcon, SparkIcon, StarIcon } from "@/components/icons";
import { REACTION_LABELS, type ReactionKind } from "@/lib/social/types";

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

export const REACTION_TONE: Record<ReactionKind, string> = {
  cheer: "var(--color-brand)",
  fire: "var(--color-flame)",
  heart: "var(--color-rose)",
  strong: "var(--color-violet)",
  star: "var(--color-brand)",
  wow: "var(--color-sky)",
};

export function ReactionGlyph({ kind, size = 16 }: { kind: ReactionKind; size?: number }) {
  const Icon = REACTION_ICON[kind];
  return (
    <span style={{ color: REACTION_TONE[kind] }} title={REACTION_LABELS[kind]} aria-label={REACTION_LABELS[kind]}>
      <Icon size={size} />
    </span>
  );
}
