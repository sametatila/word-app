import { FirstPractice } from "@/components/first-practice";
import { titleMeta } from "@/lib/page-meta";

/* Arama motoruna kapalı: sayfa istemcide çiziliyor, sunucu çıktısı yalnız
   başlık. Boş sayfa indekste kalitesiz sonuç sayılır; aramadan gelen
   tanıtım sayfasından buraya ulaşıyor (bkz. `sitemap.ts`). */
export const generateMetadata = titleMeta("firstpractice.first_words", { noindex: true });

/**
 * Isınma — hesap AÇILMADAN önce. Bu yüzden `(app)` grubunun dışında: kabuk
 * yok, oturum yok, sekme çubuğu yok. Mobilde de kök yığında, sekmelerin
 * dışında bir ekran.
 */
export default function FirstPracticePage() {
  return <FirstPractice />;
}
