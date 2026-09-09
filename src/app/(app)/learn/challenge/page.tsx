import { ModeScreen } from "@/components/learn/mode-screen";
import { titleMeta } from "@/lib/page-meta";

export const generateMetadata = titleMeta("learn.survival");
/** Hayatta kalma — süre bitene kadar; web'e özel mod, mobilde karşılığı yok. */
export default function ChallengePage() {
  return <ModeScreen mode="challenge" />;
}
