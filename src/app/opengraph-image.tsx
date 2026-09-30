import { getLang } from "@/lib/i18n/server";
import { genericCard, OG_SIZE } from "@/lib/og/card";

/**
 * Paylaşılan bağlantının önizleme görseli.
 *
 * Uygulamanın hiçbir yayılma yolu yoktu ve bağlantı paylaşıldığında
 * WhatsApp ya da X'te yalnızca çıplak bir adres görünüyordu — tıklanma
 * oranını en çok düşüren şey bu. Görsel kodla üretiliyor: tek bir PNG
 * dosyasını elle güncel tutmak, sayılar değiştikçe unutulan bir iş olurdu.
 *
 * Vaat dilden bağımsız, kurs rozetleri KATALOGDAN (`lib/og/card`
 * `courseBadges`): yeni bir kurs açılınca kart metin değişmeden güncellenir.
 */

// Dışa aktarılan `alt` DURAĞAN (istekten önce okunuyor), yani dile göre
// değişemiyor: dilden bağımsız marka adı yazılı.
export const alt = "Lernomi";
export const size = OG_SIZE;
export const contentType = "image/png";

/** Kartın yazıları ziyaretçinin arayüz dilinde (bkz. `layout.tsx` `generateMetadata`). */
export default async function Image() {
  return genericCard(await getLang());
}
