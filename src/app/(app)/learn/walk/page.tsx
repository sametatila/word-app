import { ModeScreen } from "@/components/learn/mode-screen";
import { titleMeta } from "@/lib/page-meta";

export const generateMetadata = titleMeta("learn.walk_mode");
/** Yürüyüş modu — dinle ve söyle, ekrana bakmadan (bkz. docs/plan/walk-stt.md). */
export default function WalkPage() {
  return <ModeScreen mode="walk" />;
}
