import type { ComponentType, SVGProps } from "react";
import type { SkillId } from "@/lib/skills/types";
import { BookOpenIcon, HeadphonesIcon, PenIcon } from "@/components/icons";

/** CEFR seviye renkleri — level-badge ve ilerleme çubuklarıyla aynı ton dili. */
export const LEVEL_TONE: Record<string, string> = {
  A1: "var(--color-mint-500)",
  A2: "var(--color-sky-400)",
  B1: "var(--color-violet-400)",
  B2: "var(--color-brand-500)",
  C1: "var(--color-flame-500)",
};

export const SKILL_ICON: Record<
  SkillId,
  ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
> = {
  reading: BookOpenIcon,
  listening: HeadphonesIcon,
  writing: PenIcon,
};
