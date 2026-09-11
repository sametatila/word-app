/**
 * SOSYAL EYLEMİN HATASI — duyurulan tek yer.
 *
 * On bir yerde aynı satır elle yazılıydı: kırmızı küçük bir metin, `role`
 * yok. Yani istek kabul etmek, dürtmek, tepki vermek ya da ortak görev
 * kurmak BAŞARISIZ olduğunda sesli okuyucu kullanan biri hiçbir şey
 * duymuyordu — hata yalnız görsel olarak vardı.
 *
 * İKİ TARAF DA SESSİZDİ, o yüzden karşılaştırmalı bir kapı bunu göremezdi
 * (§11.228'in sınıfı): mobilin `social/common` `ErrorText`i de
 * `accessibilityLiveRegion` taşımıyordu. Ölçüt karşılaştırma değil, mutlak:
 * bir eylem başarısız olduysa duyurulur.
 *
 * `role="alert"` seçimi web'in kendi kalıbı (`profile-form`, `report-dialog`,
 * `push-settings`, `exam-player`) ve gerekçesi `profile-form`da yazılı:
 * hatanın sayfanın neresinde olduğu önemli değil, duyurulması önemli.
 * Mobil karşılığı `accessibilityLiveRegion="polite"`.
 *
 * Sınıf dışarıdan geliyor: on bir yuvanın dolgusu ve puntosu farklı
 * (`text-caption` / `text-micro`, ortalı ya da değil) ve bu bir tasarım
 * kararı, tek bir sınıfa indirilmemeli.
 */
export function ErrorText({ text, className = "" }: { text: string | null; className?: string }) {
  if (!text) return null;
  return (
    <p role="alert" className={className} style={{ color: "var(--color-rose)" }}>
      {text}
    </p>
  );
}
