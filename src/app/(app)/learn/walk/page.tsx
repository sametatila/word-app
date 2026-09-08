import { ModeScreen } from "@/components/learn/mode-screen";

export const metadata = { title: "Yürüyüş modu" };

/** Yürüyüş modu — dinle ve söyle, ekrana bakmadan (bkz. docs/plan/walk-stt.md). */
export default function WalkPage() {
  return <ModeScreen mode="walk" />;
}
