import React from "react";
import {
  BookIcon, BookOpenIcon, CalendarIcon, ChatIcon, CheckIcon, CompassIcon, FlagIcon,
  FlameIcon, GlobeIcon, GrammarIcon, HeadphonesIcon, KeyboardIcon, MapIcon, MicIcon,
  MoonIcon, MountainIcon, PenIcon, PuzzleIcon, RunIcon, SchoolIcon, SortIcon,
  SparkIcon, StackIcon, StarIcon, SunIcon, TagIcon, TargetIcon, TranslateIcon, TrophyIcon,
} from "./icons";

/**
 * Rozet ikonu adından bileşen — web `components/achievement-badge.tsx`
 * `ICONS` haritasının karşılığı, aynı yirmi dokuz ad.
 *
 * Sunucu her rozete kendi ikonunu veriyor (`lib/achievements` `icon`) ve web
 * baştan beri onu çiziyor. Mobil alanı hiç okumuyordu: rozet duvarında da,
 * kutlamada da elli yedi rozetin hepsi KUPA görünüyordu - iki rozeti
 * birbirinden ayıran tek şey kademe rengiydi.
 *
 * Tanınmayan ad kupaya düşüyor: sunucu yeni bir ikon adı gönderdiğinde
 * yayımlanmış sürümler boş kutu çizmesin.
 */
const ICONS: Record<string, (p: { color?: string; size?: number }) => React.ReactElement> = {
  BookIcon, BookOpenIcon, CalendarIcon, ChatIcon, CheckIcon, CompassIcon, FlagIcon,
  FlameIcon, GlobeIcon, GrammarIcon, HeadphonesIcon, KeyboardIcon, MapIcon, MicIcon,
  MoonIcon, MountainIcon, PenIcon, PuzzleIcon, RunIcon, SchoolIcon, SortIcon,
  SparkIcon, StackIcon, StarIcon, SunIcon, TagIcon, TargetIcon, TranslateIcon, TrophyIcon,
};

export function AchievementIcon({ name, color, size }: { name: string; color: string; size: number }) {
  const Icon = ICONS[name] ?? TrophyIcon;
  return <Icon color={color} size={size} />;
}
