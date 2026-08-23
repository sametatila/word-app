"use client";

import {
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  CompassIcon,
  FlagIcon,
  FlameIcon,
  GlobeIcon,
  HeadphonesIcon,
  KeyboardIcon,
  ListIcon,
  LockIcon,
  MapIcon,
  MoonIcon,
  MountainIcon,
  PuzzleIcon,
  RunIcon,
  SchoolIcon,
  SparkIcon,
  StarIcon,
  SunIcon,
  TagIcon,
  TrophyIcon,
} from "@/components/icons";

/**
 * Rozetin görsel dili.
 *
 * Kademe rengi metalden geliyor (bronz · gümüş · altın) ve en üst kademe
 * "efsane" bir metal değil, markanın gradyanı: sayıca az olan şey renkçe de
 * ayrışmalı. Kilitli rozet silinmiyor, SÖNÜYOR — ne olduğu görünür kalıyor
 * çünkü görünmeyen hedef, hedef değildir.
 */

export const TIER_COLOR: Record<string, string> = {
  bronze: "#c47a3d",
  silver: "#93a3b8",
  gold: "#e0a63a",
  legend: "var(--color-brand-500)",
};

export const TIER_LABEL: Record<string, string> = {
  bronze: "Bronz",
  silver: "Gümüş",
  gold: "Altın",
  legend: "Efsane",
};

const ICONS: Record<string, (p: { size?: number; className?: string }) => React.ReactNode> = {
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  CompassIcon,
  FlagIcon,
  FlameIcon,
  GlobeIcon,
  HeadphonesIcon,
  KeyboardIcon,
  ListIcon,
  MapIcon,
  MoonIcon,
  MountainIcon,
  PuzzleIcon,
  RunIcon,
  SchoolIcon,
  SparkIcon,
  StarIcon,
  SunIcon,
  TagIcon,
  TrophyIcon,
};

export type BadgeRow = {
  id: string;
  title: string;
  hint: string;
  icon: string;
  tier: string;
  target: number;
  done: number;
  unlocked: boolean;
};

export function AchievementBadge({
  row,
  size = 58,
  onClick,
  selected,
}: {
  row: BadgeRow;
  size?: number;
  onClick?: () => void;
  selected?: boolean;
}) {
  const Icon = ICONS[row.icon] ?? StarIcon;
  const color = TIER_COLOR[row.tier] ?? "var(--color-brand-500)";
  const pct = row.target > 0 ? Math.min(100, Math.round((row.done / row.target) * 100)) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${row.title}${row.unlocked ? "" : ` — ${row.hint}`}`}
      className="group flex flex-col items-center gap-1 rounded-xl p-1 text-center transition-transform active:scale-95"
    >
      <span
        className="relative flex items-center justify-center rounded-2xl"
        style={{
          width: size,
          height: size,
          background: row.unlocked
            ? `linear-gradient(140deg, color-mix(in srgb, ${color} 26%, transparent), color-mix(in srgb, ${color} 8%, transparent))`
            : "var(--surface-2)",
          boxShadow: row.unlocked ? `inset 0 0 0 1.5px ${color}` : "inset 0 0 0 1.5px var(--border)",
          color: row.unlocked ? color : "var(--text-muted)",
          opacity: row.unlocked ? 1 : 0.6,
          outline: selected ? `2px solid ${color}` : undefined,
          outlineOffset: 2,
        }}
      >
        {row.unlocked ? (
          <Icon size={Math.round(size * 0.45)} />
        ) : (
          <>
            <Icon size={Math.round(size * 0.4)} />
            <span
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: "var(--surface)", color: "var(--text-muted)" }}
            >
              <LockIcon size={11} />
            </span>
          </>
        )}
      </span>

      {/* İki satıra izin var, kırpma yok. Tek satırda "Kelime hazinesi" →
          "Kelime hazi…" oluyordu: adı okunamayan rozet, hedef olmuyor.
          Sabit yükseklik satırların hizasını koruyor. */}
      <span
        className="flex w-full items-start justify-center text-[11px] font-bold leading-tight"
        style={{
          color: row.unlocked ? "var(--text)" : "var(--text-muted)",
          /*
            Yükseklik SABİT, en az değil. `minHeight` iki satırlık başlıkta
            aşılıyordu (11px × 1.25 satır aralığı × 2 = 2.5em) ve o sütunun
            ilerleme çubuğu tek satırlıkların 11 piksel altında kalıyordu —
            bir ızgarada göze ilk çarpan şey bozuk hizadır.
          */
          height: "2.5em",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {row.title}
      </span>

      {/* Kilitli rozetin altında ilerleme: "ne kadar kaldı" bilgisi olmadan
          kilit yalnızca bir duvar; varken hedefe dönüşüyor. */}
      {!row.unlocked && row.done > 0 ? (
        <span
          className="-mt-0.5 h-1 w-full overflow-hidden rounded-full"
          style={{ background: "var(--surface-2)" }}
        >
          <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </span>
      ) : null}
    </button>
  );
}
