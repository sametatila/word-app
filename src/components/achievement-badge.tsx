"use client";

import {
  AchBilingualIcon,
  AchBossIcon,
  AchConversationIcon,
  AchExploreIcon,
  AchMarathonIcon,
  AchSummitIcon,
  AchWordsIcon,
  AddFriendIcon,
  AllGamesIcon,
  ConversationIcon,
  CorrectIcon,
  GameArticleIcon,
  GameClozeIcon,
  GameOrderIcon,
  GamePluralIcon,
  GameScrambleIcon,
  GameTranslateIcon,
  GameTypingIcon,
  LockedIcon,
  QuestIcon,
  ReactionStarIcon,
  SkillGrammarIcon,
  SkillListeningIcon,
  SkillSpeakingIcon,
  SkillWritingIcon,
  StreakIcon,
  SurvivalIcon,
  ThemeDarkIcon,
  ThemeLightIcon,
  WeeklyTestIcon,
  type IconMeaning,
} from "@/components/icons";

/**
 * Rozetin görsel dili.
 *
 * Kademe rengi metalden geliyor (bronz · gümüş · altın) ve en üst kademe
 * "efsane" bir metal değil: sayıca az olan şey renkçe de ayrışmalı. Kilitli
 * rozet silinmiyor, SÖNÜYOR — ne olduğu görünür kalıyor çünkü görünmeyen
 * hedef, hedef değildir.
 *
 * Efsane eskiden markanın rengiydi ve marka indigoyken üç metalden kendiliğinden
 * ayrılıyordu. Marka maskotun kehribarına taşınınca bu bozuldu: koyu temada
 * efsane ile ALTIN arasında ΔE 8.8 kalıyordu, yani iki kademe aynı görünüyordu.
 * Kural aynı kaldı, rengi değişti — efsane artık paletin metallere en uzak
 * hue'su olan erikte (altınla ΔE 63.4).
 *
 * Gümüş de değişti: #93a3b8 mavi-gri idi ve sıcak paletin içinde tek başına
 * soğuk duruyordu; aynı açıklıkta sıcak bir griye alındı.
 *
 * GÜMÜŞ VE ALTIN SONRA BİR KEZ DAHA KOYULAŞTI. Rozetin üstünde BEYAZ ikon
 * duruyor ve grafik ögesi için eşik 3.0; ölçümde gümüş 2.53, altın 2.38
 * veriyordu, yani ikon kendi zemininde eriyordu. Sıcak gri ve altın hue'su
 * korunarak açıklık düşürüldü: gümüş 3.79, altın 3.62. Bronz (4.44) ve
 * efsane (6.83) zaten geçiyordu, onlara dokunulmadı.
 *
 * Aynı dört değer mobilde de duruyor (`AchievementsScreen` `tierColor`);
 * kademe renkleri kimliğin parçası, iki platformda ayrışmamalı.
 */

export const TIER_COLOR: Record<string, string> = {
  bronze: "#a9683c",
  silver: "#8a8277",
  gold: "#aa8012",
  /* SABİT, tema duyarlı jeton DEĞİL - öteki üçü gibi.
     `var(--color-violet)` yazılıydı ve koyu temada 300'e düşüyordu: rozet dolu
     zemin + BEYAZ ikon taşıyor, ölçüm açık temada 6.83 ama koyu temada 3.24 -
     dördün en kötüsü ve grafik eşiğinin (3.0) hemen üstünde. Üstelik bu tablo
     kendi yorumunda "kimlik" diyor ve kimlik temayla dönmez: mobil karşılığı
     (`theme/colors.ts` `TIER_COLOR`) dördünü de sabit tutuyor, yani koyu
     temada efsane rozeti iki uygulamada iki ayrı mordu. Değer açık temada
     zaten çözülen `violet-600`. */
  legend: "#77439d",
};

/**
 * Kademe adları — ANAHTAR, metin değil. Değerler Türkçe yazılıydı ve rozet
 * açılış kartı Almanca arayüzde de "Altın rozet açıldı" diyordu.
 */
export const TIER_LABEL_KEYS: Record<string, string> = {
  bronze: "tier.bronze",
  silver: "tier.silver",
  gold: "tier.gold",
  legend: "tier.legend",
};

/**
 * Rozet glifi, ANLAM kimliğinden (`lib/achievements` `glyph`). Yalnız
 * rozetlerin kullandığı anlamlar: bütün seti buraya almak, rozet gösteren her
 * sayfaya yüz dokuz glifi taşırdı. Kümeyi `check:parity` sunucunun
 * kullandığı glif kümesiyle ve mobil `ui/achievementIcon` ile karşılaştırıyor.
 */
const ICONS: Partial<Record<IconMeaning, (p: { size?: number; className?: string }) => React.ReactNode>> = {
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

export type BadgeRow = {
  id: string;
  title: string;
  hint: string;
  /** Anlam kimliği (`lib/achievements` `glyph`). Eski `icon` alanı yalnız yayımlanmış mobil sürümler için. */
  glyph: string;
  tier: string;
  target: number;
  done: number;
  unlocked: boolean;
};

/**
 * Rozetin KENDİ ikonu, anlam kimliğinden.
 *
 * Harita modül içinde kalıyordu ve rozet duvarı (`achievement-wall`) ona
 * ulaşamadığı için her rozete kupa çiziyordu: sunucunun her satırda
 * gönderdiği ikon alanı duvarda hiç kullanılmıyordu ve kırk yedi rozet
 * birbirinin aynısı görünüyordu. Kutlama kartı baştan beri doğrusunu
 * çiziyordu; artık ikisi de buradan geçiyor.
 *
 * Tanınmayan kimlik YILDIZA düşüyor (mobil `AchievementIcon` ile aynı yedek).
 */
export function BadgeIcon({ glyph, size }: { glyph: string; size?: number }) {
  const Icon = ICONS[glyph as IconMeaning] ?? ReactionStarIcon;
  return <>{Icon({ size })}</>;
}

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
  const color = TIER_COLOR[row.tier] ?? "var(--color-brand)";
  const pct = row.target > 0 ? Math.min(100, Math.round((row.done / row.target) * 100)) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${row.title}${row.unlocked ? "" : ` — ${row.hint}`}`}
      className="group flex flex-col items-center gap-1 rounded-tile p-1 text-center transition-transform active:scale-95"
    >
      <span
        className="relative flex items-center justify-center rounded-tile"
        style={{
          width: size,
          height: size,
          background: row.unlocked
            ? `linear-gradient(140deg, color-mix(in srgb, ${color} 26%, transparent), color-mix(in srgb, ${color} 8%, transparent))`
            : "var(--surface-2)",
          boxShadow: row.unlocked ? `inset 0 0 0 1px ${color}` : "inset 0 0 0 1px var(--border)",
          color: row.unlocked ? color : "var(--text-muted)",
          opacity: row.unlocked ? 1 : 0.6,
          outline: selected ? `2px solid ${color}` : undefined,
          outlineOffset: 2,
        }}
      >
        {row.unlocked ? (
          <BadgeIcon glyph={row.glyph} size={Math.round(size * 0.45)} />
        ) : (
          <>
            <BadgeIcon glyph={row.glyph} size={Math.round(size * 0.4)} />
            <span
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: "var(--surface)", color: "var(--text-muted)" }}
            >
              <LockedIcon size={11} />
            </span>
          </>
        )}
      </span>

      {/* İki satıra izin var, kırpma yok. Tek satırda "Kelime hazinesi" →
          "Kelime hazi…" oluyordu: adı okunamayan rozet, hedef olmuyor.
          Sabit yükseklik satırların hizasını koruyor. */}
      <span
        className="flex w-full items-start justify-center text-micro leading-tight"
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
