import { SessionPlayer } from "@/components/session-player";
import { titleMeta } from "@/lib/page-meta";

export const generateMetadata = titleMeta("learn.daily_round");
export const dynamic = "force-dynamic";

/**
 * Kelime turu — tam ekran, kendi adresinde.
 *
 * Tur `/learn`in kendisiydi: sekmeyi açmak turu kurmak demekti ve turdan
 * "çıkmak" diye bir şey yoktu. Mobilde tur, Öğren sekmesinin ÜSTÜNE açılan
 * ayrı bir ekran (`M/src/screens/GameScreen.tsx`) ve burası onun karşılığı.
 *
 * Başlangıç kartı YOK — açılır açılmaz oynanıyor ve yarım kalan tur sunucudan
 * kaldığı yerden sürüyor, yine mobildeki gibi. `?game=` verilirse tur tek
 * oyuna kilitleniyor (Pratik ekranı, zayıf nokta kartı ve günlük plan buradan
 * geçiyor).
 */
export default function GamePage() {
  return <SessionPlayer />;
}
