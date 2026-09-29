import { LoadingRegion } from "@/components/loading-region";
import { CardGrid } from "@/components/layout";
import { AppHeaderSkeleton, TextBox } from "@/components/skeleton";
import { TextSlot, TileSlot } from "@/components/flow-skeleton";
import { QuestCardSkeleton } from "@/components/quest-card";

/**
 * Öğren iskeleti — `LearnHub`ın bölüm sırasıyla: başlık, günlük tur
 * kahramanı, günün görevleri, öne çıkan iki kama, "daha fazlası" satırları.
 *
 * Eskisi başlığı hiç çizmiyordu ve kahramanın altında dört karolu bir ızgara
 * vardı; gerçek ekranda görevler, iki kama ve üç satır var. Ölçüler gerçek
 * bileşenin sınıflarından ve tipografi ölçeğinden (göz kararı yükseklik yok).
 *
 * KIRILIMLAR GERÇEK KARTIN. Maskot `hidden sm:block`, iki kama her genişlikte
 * yan yana, satırlar aynı `CardGrid min={360}`. Metnin SATIR SAYISI hem
 * genişliğe hem dile bağlı: her metin gerçek cümlenin görünmez hâli
 * (`TextSlot`), tarayıcı onu gerçeğiyle aynı sarıyor. Eskiden Türkçeden
 * ölçülmüş kırılım gizlemeleri vardı (`sm:hidden md:block lg:hidden`);
 * İngilizce ve Almancada tutmuyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <AppHeaderSkeleton titleWidth={180} />

      {/* Kahraman: dolu marka kartı. Tek nabızlı blok; içteki boş kutular
          yalnız yüksekliği gerçek düzenden türetmek için. */}
      <div aria-hidden className="mb-5 animate-pulse overflow-hidden rounded-card surface-2">
        <div className="flex items-end gap-3 p-5">
          <div className="min-w-0 flex-1">
            <div className="mb-2 h-11" />
            <TextSlot k="learn.practice_your_words" ghost className="text-h1" />
            <TextSlot k="learn.daily_pitch" ghost className="mt-1 text-body" />
            {/* Başla hapı: py-2.5 + strong satırı. */}
            <TextBox variant="strong" className="mt-4 py-2.5" />
          </div>
          {/* Maskotun yeri (`MASCOT_CARD`, -mb-3): metin sütununu gerçekteki
              kadar daraltsın. */}
          <div className="-mb-3 hidden h-24 w-24 shrink-0 sm:block" />
        </div>
        {/* Hedef şeridi: micro satır + 6 px çizgi. */}
        <div className="px-5 pb-4">
          <TextBox variant="micro" className="mb-1.5" />
          <div className="h-1.5" />
        </div>
      </div>

      <div className="mb-5">
        <QuestCardSkeleton />
      </div>

      <section aria-hidden className="mb-5 mt-2">
        <TextSlot k="learn.featured" className="mb-2 ml-1 text-h3" />
        <div className="grid grid-cols-2 gap-3">
          {[
            ["learn.walk_mode", "learn.walk_pitch"],
            ["learn.mock_exams", "learn.mock_exams_pitch"],
          ].map(([title, pitch]) => (
            <div key={title} className="card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4">
              <TileSlot className="h-11 w-11" />
              <div>
                <TextSlot k={title} className="text-h3" />
                <TextSlot k={pitch} className="text-caption" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <TextSlot k="learn.more" className="mb-2 ml-1 text-h3" />
      <CardGrid min={360} className="mb-5">
        {[
          ["learn.practice", "learn.practice_one_game_with_your_own"],
          ["learn.weekly_quiz", "learn.test_what_you_ve_learned_weekly"],
          ["learn.survival", "learn.survival_pitch"],
        ].map(([title, sub]) => (
          <div key={title} aria-hidden className="card flex items-center gap-3 p-4">
            <TileSlot className="h-12 w-12" />
            <div className="min-w-0 flex-1">
              <TextSlot k={title} className="text-h3" />
              <TextSlot k={sub} className="text-caption" />
            </div>
            {/* Ok simgesinin yeri (20 px). */}
            <div className="w-5 shrink-0" />
          </div>
        ))}
      </CardGrid>
    </LoadingRegion>
  );
}

