import type { ComponentType, SVGProps } from "react";
import type { SkillId } from "@/lib/skills/types";
import { BookOpenIcon, HeadphonesIcon, MicIcon, PenIcon } from "@/components/icons";

/** CEFR seviye renkleri — level-badge ve ilerleme çubuklarıyla aynı ton dili. */
export const LEVEL_TONE: Record<string, string> = {
  A1: "var(--color-mint-600)",
  A2: "var(--color-sky-600)",
  B1: "var(--color-violet-600)",
  B2: "var(--color-brand-600)",
  C1: "var(--color-rose-600)",
};

export const SKILL_ICON: Record<
  SkillId,
  ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
> = {
  reading: BookOpenIcon,
  listening: HeadphonesIcon,
  writing: PenIcon,
  speaking: MicIcon,
};
