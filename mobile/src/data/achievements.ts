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
  | "lessons"
  | "exams"
  | "skills"
  | "rounds"
  | "discovery";

export type Achievement = {
  id: string;
  title: string;
  hint: string;
  tier: Tier;
  group: AchGroup;
  /**
   * Rozetin kendi ikonunun ADI (`BookIcon`, `FlameIcon`, ...) — sunucu her
   * satırda gönderiyor. Mobil alanı hiç tanımıyordu, yani elli yedi rozetin
   * hepsi KUPA görünüyordu; web her rozeti kendi ikonuyla çiziyor. Ad
   * `ui/achievementIcon` ile bileşene çevriliyor.
   */
  icon: string;
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
  "lessons",
  "exams",
  "skills",
  "rounds",
  "discovery",
];

/** Grup adları ANAHTAR olarak — metin gösterildiği yerde çevriliyor. */
export const GROUP_LABEL_KEY: Record<AchGroup, string> = {
  streak: "achgroup.streak",
  vocab: "achgroup.vocab",
  games: "achgroup.games",
  grammar: "achgroup.grammar",
  lessons: "achgroup.lessons",
  exams: "achgroup.exams",
  skills: "achgroup.skills",
  rounds: "achgroup.rounds",
  discovery: "achgroup.discovery",
};
