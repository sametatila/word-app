import { FirstPractice } from "@/components/first-practice";
import { titleMeta } from "@/lib/page-meta";

export const generateMetadata = titleMeta("firstpractice.first_words");

/**
 * Isınma — hesap AÇILMADAN önce. Bu yüzden `(app)` grubunun dışında: kabuk
 * yok, oturum yok, sekme çubuğu yok. Mobilde de kök yığında, sekmelerin
 * dışında bir ekran.
 */
export default function FirstPracticePage() {
  return <FirstPractice />;
}
