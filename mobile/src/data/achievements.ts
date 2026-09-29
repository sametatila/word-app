/**
 * Başarım tahtası — /api/achievements cevabının biçimi (web ile aynı). Tier: bronze /
 * silver / gold / legend.
 *
 * GRUP LİSTESİ SUNUCUYU İZLER (`src/lib/achievement-groups.ts`). Burada üç grup
 * yazılıydı, sunucu ise dokuz grup dönüyordu: ekran bilmediği grubun etiketini
 * arayınca `undefined` bulup çöküyordu. İki korumalı: liste tam, ve ekran
 * listede olmayan bir grup gelirse yine de çizmeye devam ediyor — sunucu yeni
 * bir grup eklediğinde yayımlanmış sürümler kapanmasın.
 */
export type Tier = "bronze" | "silver" | "gold" | "legend";
export type AchGroup =
  | "streak"
  | "vocab"
  | "games"
  | "grammar"
  | "conversations"
  | "exams"
  | "skills"
  | "rounds"
  | "social"
  | "discovery";

export type Achievement = {
  id: string;
  title: string;
  hint: string;
  tier: Tier;
  group: AchGroup;
  /**
   * ESKİ ikon adı (`BookIcon`, `FlameIcon`, ...) — sunucu yayımlanmış sürümler
   * (build ≤ 10) için göndermeye devam ediyor; bu sürüm onu OKUMUYOR.
   */
  icon: string;
  /**
   * Rozetin glifi, ANLAM kimliğiyle (`streak`, `ach-words`, ...; bkz.
   * `data/icons/picks.json`). `ui/achievementIcon` bileşene çeviriyor,
   * tanımadığını yıldıza düşürüyor.
   */
  glyph: string;
  target: number;
  /** Sunucunun alan adı bu; ilerleme çubuğu ve "n/target" bunu okur. */
  done: number;
  unlocked: boolean;
  unlockedAt?: string | null;
};

/** Sekme sırası — sunucudaki GROUP_ORDER ile aynı: her gün dokunulan önde. */
export const GROUP_ORDER: AchGroup[] = [
  "streak",
  "vocab",
  "games",
  "grammar",
  "conversations",
  "exams",
  "skills",
  "rounds",
  "social",
  "discovery",
];

/** Grup adları ANAHTAR olarak — metin gösterildiği yerde çevriliyor. */
export const GROUP_LABEL_KEY: Record<AchGroup, string> = {
  streak: "achgroup.streak",
  vocab: "achgroup.vocab",
  games: "achgroup.games",
  grammar: "achgroup.grammar",
  conversations: "achgroup.conversations",
  exams: "achgroup.exams",
  skills: "achgroup.skills",
  rounds: "achgroup.rounds",
  social: "achgroup.social",
  discovery: "achgroup.discovery",
};
