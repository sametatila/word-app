/**
 * Rozet grupları — sunucu ve arayüzün ORTAK tanımı.
 *
 * Bu liste iki yerde birden duruyordu: `lib/achievements.ts` (sunucu) ve
 * `components/achievement-wall.tsx` (arayüz). Sunucu tarafı `server-only`
 * olduğu için arayüz onu içe aktaramıyor ve tanım elle kopyalanmıştı.
 *
 * Bedeli sessiz bir kayıptı: yeni bir grup eklenince rozetler hesaplanıyor,
 * açılıyor, sayıya giriyor ama duvarda GÖRÜNMÜYORDU — sekme listesi
 * arayüzdeki kopyadan üretiliyor ve orada o grup yok. Hata da vermiyordu;
 * rozet basitçe hiçbir sekmede çıkmıyordu.
 *
 * Bu dosya `server-only` değil: içinde sorgu yok, yalnızca isim ve sıra var.
 */

export type Group = "seri" | "kelime" | "oyun" | "ders" | "beceri" | "tur" | "keşif";

/**
 * Sekme sırası.
 *
 * Kabaca "yakından uzağa": her gün dokunulan şeyler önde, seyrek olanlar
 * sonda.
 */
export const GROUP_ORDER: Group[] = ["seri", "kelime", "oyun", "ders", "beceri", "tur", "keşif"];

export const GROUP_LABELS: Record<Group, string> = {
  seri: "Seri",
  kelime: "Kelime",
  oyun: "Oyunlar",
  ders: "Dersler",
  beceri: "Beceriler",
  tur: "Turlar",
  "keşif": "Keşif",
};
