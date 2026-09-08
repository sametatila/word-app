import { ModeScreen } from "@/components/learn/mode-screen";

export const metadata = { title: "Günün turu" };

/** Günün turu — herkese aynı kelimeler, aynı sıra (bkz. components/daily-player). */
export default function DailyPage() {
  return <ModeScreen mode="daily" />;
}
