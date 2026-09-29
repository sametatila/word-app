import { LoadingRegion } from "@/components/loading-region";
import { SkeletonLine, SkeletonPill, SkeletonTile, type TextVariant } from "@/components/skeleton";

/**
 * Premium sayfası gelene kadar iskelet — `PremiumPaywall`in sırası: geri
 * karosu, ortalı kapak (taç karosu, başlık, slogan, durum), iki paket kartı +
 * deneme notu, mağaza yönlendirmesi, kapsam kartı, ince yazı.
 *
 * Sayfa beş okumayı birden yapıyor (yapılandırma, metin, durum, davet,
 * kavanoz). Eski iskelette taç karosu ve kapsam kartı yoktu, paket kartları
 * göz kararı 120 px'lik bloktu ve düğme şeridi mağaza kutusunun yerinde
 * değildi. Kaplar gerçeğinkiyle aynı; Android `PaywallScreen` aynı yerde
 * iskelet çiziyor.
 *
 * GENİŞLİĞE GÖRE (2026-09-29). İskelet tek genişliğe göre çizilmişti: her
 * paragraf tek satır, kapsam kartı 4 + 2 satır (gerçeği 3 + 7, `lib/premium/
 * gates` `describeLimits`), mağaza kutusunda hep telefon düğmesi. Oysa sayfa
 * metin ağırlıklı ve satır sayısı genişlikle değişiyor: 375 px'te slogan üç,
 * yapay zekâ satırı beş satır; masaüstünde bir-iki. Satır sayıları Türkçe
 * metinden ölçüldü, üç bant: telefon (< sm), dar sütun (sm–md: md'de kenar
 * çubuğu sütunu 464 px'e daraltıyor), geniş (lg+).
 */

/** Satır sayısı: [telefon, sm–md, lg+]. */
type Counts = readonly [number, number, number];

/* Sınıflar düz dizgi: Tailwind yalnız kaynakta gördüğünü üretiyor. */
function shown(i: number, [phone, mid, wide]: Counts): string {
  return [i < phone ? "block" : "hidden", i < mid ? "sm:block" : "sm:hidden", i < wide ? "lg:block" : "lg:hidden"].join(" ");
}

/** Genişliğe göre satır sayısı değişen paragraf; son satır kısa. */
function Para({ variant, lines, center = false }: { variant: TextVariant; lines: Counts; center?: boolean }) {
  const max = Math.max(...lines);
  return (
    <div className="w-full">
      {Array.from({ length: max }, (_, i) => (
        <div key={i} className={shown(i, lines)}>
          <SkeletonLine variant={variant} width={i === max - 1 && max > 1 ? "60%" : "94%"} className={center ? "mx-auto" : ""} />
        </div>
      ))}
    </div>
  );
}

/* Kapsam satırları — `describeLimits` sırası; sayılar Türkçe metnin satırı. */
const PREMIUM_ROWS: Counts[] = [
  [3, 2, 1], // cepte yürüyüş
  [3, 2, 2], // deneme sınavı paketleri
  [5, 4, 2], // Patika + Beceriler yapay zekâ
];
const FREE_ROWS: Counts[] = [
  [3, 2, 1], // temel çalışma
  [1, 1, 1], // haftalık test
  [2, 1, 1], // yürüyüş
  [1, 1, 1], // deneme sınavı
  [3, 2, 1], // Patika yapay zekâ
  [2, 2, 1], // Beceriler
  [4, 3, 2], // seriyle açılan hak
];

export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl pb-12">
      <SkeletonTile size={44} />
      <div className="mt-2 flex flex-col items-center">
        <SkeletonTile size={80} className="rounded-card" />
        <SkeletonLine variant="display" width={220} className="mt-4" />
        <div className="mt-1 w-full">
          <Para variant="body" lines={[3, 2, 1]} center />
        </div>
        <SkeletonLine variant="body" width={120} className="mt-1" />
      </div>

      {/* Paket kartları: `card card-flat p-4 text-center`, yıllıkta indirim hapı. */}
      <section className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="card card-flat flex flex-col items-center p-4">
              <SkeletonLine variant="caption" width={64} />
              <SkeletonLine variant="h2" width={96} className="mt-1" />
              {i === 1 ? <SkeletonPill width={44} height={22} className="mt-2" /> : null}
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Para variant="caption" lines={[2, 1, 1]} center />
        </div>
      </section>

      {/* Mağaza yönlendirmesi (`PremiumStoreCta`): başlık, iki satır, platform
          bloğu, dört not. */}
      <section className="card card-flat mt-4 flex flex-col items-center rounded-panel px-4 py-4">
        <SkeletonLine variant="strong" width={160} />
        <SkeletonLine variant="body" width="70%" className="mt-1" />
        <div className="mt-1 w-full">
          <Para variant="caption" lines={[2, 1, 1]} center />
        </div>
        {/* Platform bloğu `platformOf(user-agent)`tan: telefon ve Android
            tablet "uygulamada aç" düğmesi, masaüstü QR + mağaza bağlantıları.
            İskelet UA'yı okumuyor (önceden getirilen yükleme sınırı isteğe
            bağlanmasın); en yakın CSS karşılığı işaretçi: ince işaretçi
            masaüstü. Tek sapma iPad (masaüstü UA, dokunmatik). */}
        <div className="pointer-fine:hidden">
          <SkeletonPill width={180} height={44} className="mt-3" />
        </div>
        <div className="mt-3 hidden w-full flex-col items-center gap-3 pointer-fine:flex sm:flex-row sm:justify-center">
          <SkeletonTile size={144} />
          <div className="flex w-full max-w-xs flex-col gap-2">
            <div>
              {[94, 94, 60].map((w, i) => (
                <SkeletonLine key={i} variant="caption" width={`${w}%`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <SkeletonPill width={124} height={36} />
              <SkeletonPill width={136} height={36} />
            </div>
          </div>
        </div>
        <div className="mt-3 w-full">
          <Para variant="caption" lines={[3, 2, 2]} center />
        </div>
        {([[2, 2, 1], [2, 2, 1], [2, 2, 1]] as const).map((lines, i) => (
          <div key={i} className="mt-1 w-full">
            <Para variant="caption" lines={lines} center />
          </div>
        ))}
      </section>

      {/* Kapsam kartı: premium satırları (onaylı), ayraç, ücretsiz satırları. */}
      <section className="mt-6">
        <SkeletonLine variant="micro" width={120} className="mb-2" />
        <div className="card p-4">
          {PREMIUM_ROWS.map((lines, i) => (
            <div key={i} className="flex items-start gap-3 py-1.5">
              <SkeletonTile size={24} className="mt-0.5 rounded-full" />
              <div className="min-w-0 flex-1">
                <Para variant="body" lines={lines} />
              </div>
            </div>
          ))}
          <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
            <SkeletonLine variant="caption" width={110} className="mb-1.5" />
            {FREE_ROWS.map((lines, i) => (
              <div key={i} className="py-1.5 pl-[18px]">
                <Para variant="body" lines={lines} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İnce yazı: adil kullanım + içerik vaadi, iki paragraf. */}
      <div className="mt-4 space-y-1">
        <Para variant="caption" lines={[3, 2, 2]} />
        <Para variant="caption" lines={[4, 3, 2]} />
      </div>
    </LoadingRegion>
  );
}
