/**
 * Demo başarım tahtası (API'siz / misafir). Gerçek tahta authed'de
 * /api/achievements'ten gelir (aynı şekil: AchievementRow[]). Tier: bronze /
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

export const DEMO_ACHIEVEMENTS: Achievement[] = [
  { id: "streak3", title: "İlk kıvılcım", hint: "3 gün üst üste çalış", tier: "bronze", group: "streak", target: 3, progress: 3, unlocked: true },
  { id: "streak7", title: "Bir hafta", hint: "7 gün üst üste çalış", tier: "bronze", group: "streak", target: 7, progress: 7, unlocked: true },
  { id: "streak30", title: "Alışkanlık", hint: "30 gün üst üste çalış", tier: "silver", group: "streak", target: 30, progress: 7, unlocked: false },
  { id: "streak100", title: "Yüz gün", hint: "100 gün üst üste çalış", tier: "gold", group: "streak", target: 100, progress: 7, unlocked: false },
  { id: "words50", title: "Elli kelime", hint: "50 kelimeyi pekiştir", tier: "bronze", group: "vocab", target: 50, progress: 50, unlocked: true },
  { id: "words250", title: "Küçük sözlük", hint: "250 kelimeyi pekiştir", tier: "silver", group: "vocab", target: 250, progress: 248, unlocked: false },
  { id: "words1000", title: "Bin kelime", hint: "1.000 kelimeyi pekiştir", tier: "gold", group: "vocab", target: 1000, progress: 248, unlocked: false },
  { id: "answers500", title: "Beş yüz cevap", hint: "500 soruyu doğru bil", tier: "bronze", group: "games", target: 500, progress: 500, unlocked: true },
  { id: "answers2500", title: "İki bin beş yüz", hint: "2.500 soruyu doğru bil", tier: "silver", group: "games", target: 2500, progress: 1240, unlocked: false },
  { id: "artikel300", title: "Artikel avcısı", hint: "300 artikeli doğru bil", tier: "silver", group: "games", target: 300, progress: 180, unlocked: false },
  { id: "listen200", title: "Kulak dolgunluğu", hint: "200 kelimeyi duyarak bul", tier: "silver", group: "games", target: 200, progress: 95, unlocked: false },
  { id: "speak100", title: "Ekransız", hint: "Yürürken 100 kelimeyi sesli söyle", tier: "silver", group: "games", target: 100, progress: 0, unlocked: false },
];
