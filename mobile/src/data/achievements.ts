/**
 * Başarım tahtası — /api/achievements cevabının biçimi (web ile aynı). Tier: bronze /
 * silver / gold / legend; grup: seri / kelime / oyun.
 */
export type Tier = "bronze" | "silver" | "gold" | "legend";
export type AchGroup = "streak" | "vocab" | "games";
export type Achievement = {
  id: string;
  title: string;
  hint: string;
  tier: Tier;
  group: AchGroup;
  target: number;
  progress: number;
  unlocked: boolean;
};

export const GROUP_LABEL: Record<AchGroup, string> = { streak: "Seri", vocab: "Kelime", games: "Oyun" };

