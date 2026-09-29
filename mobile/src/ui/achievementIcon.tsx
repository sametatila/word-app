import React from "react";
import {
  AchBilingualIcon, AchBossIcon, AchConversationIcon, AchExploreIcon, AchMarathonIcon, AchSummitIcon, AchWordsIcon,
  AddFriendIcon, AllGamesIcon, ConversationIcon, CorrectIcon, GameArticleIcon, GameClozeIcon, GameOrderIcon,
  GamePluralIcon, GameScrambleIcon, GameTranslateIcon, GameTypingIcon, QuestIcon, ReactionStarIcon, SkillGrammarIcon,
  SkillListeningIcon, SkillSpeakingIcon, SkillWritingIcon, StreakIcon, SurvivalIcon, ThemeDarkIcon, ThemeLightIcon,
  WeeklyTestIcon,
  type IconMeaning,
} from "./icons";

/**
 * Rozet glifi, ANLAM kimliğinden — web `components/achievement-badge.tsx`
 * `ICONS` haritasının karşılığı, aynı kimlikler.
 *
 * Sunucu her rozete kendi glifini veriyor (`lib/achievements` `glyph`:
 * `streak`, `ach-words`, …). Eski `icon` alanı (`FlameIcon`, …) yalnız
 * yayımlanmış sürümler için duruyor; o sürümler eski elle çizilmiş seti
 * taşıyor ve bu dosyanın önceki hâliyle adı çiziyor.
 *
 * Tanınmayan kimlik YILDIZA düşüyor - webin `BadgeIcon` yedeğiyle aynı: sunucu
 * yeni bir glif gönderdiğinde yayımlanmış sürümler boş kutu çizmesin ve iki
 * uygulama aynı yedeği göstersin.
 */
const ICONS: Partial<Record<IconMeaning, (p: { color?: string; size?: number }) => React.ReactElement>> = {
  "ach-bilingual": AchBilingualIcon,
  "ach-boss": AchBossIcon,
  "ach-conversation": AchConversationIcon,
  "ach-explore": AchExploreIcon,
  "ach-marathon": AchMarathonIcon,
  "ach-summit": AchSummitIcon,
  "ach-words": AchWordsIcon,
  "add-friend": AddFriendIcon,
  "all-games": AllGamesIcon,
  conversation: ConversationIcon,
  correct: CorrectIcon,
  "game-article": GameArticleIcon,
  "game-cloze": GameClozeIcon,
  "game-order": GameOrderIcon,
  "game-plural": GamePluralIcon,
  "game-scramble": GameScrambleIcon,
  "game-translate": GameTranslateIcon,
  "game-typing": GameTypingIcon,
  quest: QuestIcon,
  "reaction-star": ReactionStarIcon,
  "skill-grammar": SkillGrammarIcon,
  "skill-listening": SkillListeningIcon,
  "skill-speaking": SkillSpeakingIcon,
  "skill-writing": SkillWritingIcon,
  streak: StreakIcon,
  survival: SurvivalIcon,
  "theme-dark": ThemeDarkIcon,
  "theme-light": ThemeLightIcon,
  "weekly-test": WeeklyTestIcon,
};

export function AchievementIcon({ glyph, color, size }: { glyph: string | undefined; color: string; size: number }) {
  const Icon = (glyph && ICONS[glyph as IconMeaning]) || ReactionStarIcon;
  return <Icon color={color} size={size} />;
}
