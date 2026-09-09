import { ModeScreen } from "@/components/learn/mode-screen";
import { titleMeta } from "@/lib/page-meta";

export const generateMetadata = titleMeta("learn.daily_round_2");
/** Günün turu — herkese aynı kelimeler, aynı sıra (bkz. components/daily-player). */
export default function DailyPage() {
  return <ModeScreen mode="daily" />;
}
