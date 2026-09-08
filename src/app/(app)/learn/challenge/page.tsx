import { ModeScreen } from "@/components/learn/mode-screen";

export const metadata = { title: "Hayatta kalma" };

/** Hayatta kalma — süre bitene kadar; web'e özel mod, mobilde karşılığı yok. */
export default function ChallengePage() {
  return <ModeScreen mode="challenge" />;
}
