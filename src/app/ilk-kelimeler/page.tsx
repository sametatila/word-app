import { FirstPractice } from "@/components/first-practice";

export const metadata = { title: "İlk kelimelerin" };

/**
 * Isınma — hesap AÇILMADAN önce. Bu yüzden `(app)` grubunun dışında: kabuk
 * yok, oturum yok, sekme çubuğu yok. Mobilde de kök yığında, sekmelerin
 * dışında bir ekran.
 */
export default function FirstPracticePage() {
  return <FirstPractice />;
}
