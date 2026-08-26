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

export type Group =
  | "seri"
  | "kelime"
  | "oyun"
  | "dilbilgisi"
  | "ders"
  | "sınav"
  | "beceri"
  | "tur"
  | "keşif";

/**
 * Sekme sırası.
 *
 * Kabaca "yakından uzağa": her gün dokunulan şeyler önde (seri, kelime,
 * oyunlar), ara ara açılanlar ortada (dilbilgisi, dersler, sınavlar,
 * beceriler), seyrek olanlar sonda (turlar, keşif).
 */
export const GROUP_ORDER: Group[] = [
  "seri",
  "kelime",
  "oyun",
  "dilbilgisi",
  "ders",
  "sınav",
  "beceri",
  "tur",
  "keşif",
];

export const GROUP_LABELS: Record<Group, string> = {
  seri: "Seri",
  kelime: "Kelime",
  oyun: "Oyunlar",
  dilbilgisi: "Dilbilgisi",
  ders: "Dersler",
  "sınav": "Sınavlar",
  beceri: "Beceriler",
  tur: "Turlar",
  "keşif": "Keşif",
};
