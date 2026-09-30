/**
 * Bir öğeyi kaydırma kabında görünür kılacak ofset — derin bağlantıyla gelinen
 * kart (Başarımlar `focus`). Saf hesap, gezgine ve RN'e dokunmuyor: test
 * doğrudan çağırıyor (`__tests__/scrollTarget.test.ts`).
 *
 * Öğe ORTALANIYOR (web `scrollIntoView({ block: "center" })` ile aynı his):
 * üste yapıştırılan kart ekranın kenarında "neden buradayım" dedirtiyor,
 * ortada ise göz doğrudan ona gidiyor. Görünüme sığmayan uzun öğede ortalamak
 * başını kesiyordu; o zaman başı `margin` kadar boşlukla üstte. Sonuç
 * [0, içerik - görünüm] aralığına kısılıyor: iOS aralık dışına kaydırıp
 * boşluk gösterebiliyor, listenin başındaki/sonundaki kart da zaten ortaya
 * gelemez.
 */
export function scrollOffsetFor({
  y,
  height,
  viewport,
  content,
  margin = 16,
}: {
  /** Öğenin kaydırılan içerikteki üst kenarı. */
  y: number;
  height: number;
  /** Kaydırma kabının görünen yüksekliği. */
  viewport: number;
  /** Kaydırılan içeriğin toplam yüksekliği. */
  content: number;
  margin?: number;
}): number {
  if (viewport <= 0) return 0;
  const ideal = height > viewport - 2 * margin ? y - margin : y + height / 2 - viewport / 2;
  const max = Math.max(0, content - viewport);
  return Math.round(Math.min(max, Math.max(0, ideal)));
}
