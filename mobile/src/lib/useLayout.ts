import { useWindowDimensions } from "react-native";

/**
 * İçerik sütununun genişliği.
 *
 * Uygulama telefon önceliklidir ve düzen ortalı tek bir sütuna sığar; yoksa
 * tablette kartlar ve metin tüm genişliğe yayılıp satır ölçüsü okunmaz olur.
 * Sütun sabit 520 idi: 1280dp'lik bir tablette ekranın %41'i. Artık ekranla
 * birlikte büyüyor ama satır ölçüsünü bozacak kadar değil.
 *
 * Eşikler Android'in "en küçük genişlik" (sw) kırılımlarıyla aynı: 600dp
 * tablet/katlanabilir, 840dp geniş tablet.
 */
export const PHONE_MAX_WIDTH = 520;
const TABLET_COLUMN = 640;
const LARGE_TABLET_COLUMN = 720;

/** Izgaraların iki yerine üç sütuna geçtiği içerik genişliği. */
const THREE_COLUMN_MIN = 600;

export function contentWidthFor(windowWidth: number): number {
  if (windowWidth < 600) return PHONE_MAX_WIDTH;
  if (windowWidth < 840) return TABLET_COLUMN;
  return LARGE_TABLET_COLUMN;
}

export type Layout = {
  /** İçerik sütununun üst sınırı (px değil dp). */
  contentWidth: number;
  /** Geniş ekran mı (sw >= 600dp): tablet ya da açık katlanabilir. */
  wide: boolean;
  /** Kart ızgarasının sütun sayısı. */
  gridColumns: 2 | 3;
  /** Izgarada bir kartın yüzde genişliği — aradaki boşluk düşülmüş. */
  gridItemWidth: string;
};

export function useLayout(): Layout {
  const { width } = useWindowDimensions();
  const contentWidth = contentWidthFor(width);
  const gridColumns: 2 | 3 = contentWidth >= THREE_COLUMN_MIN ? 3 : 2;
  return {
    contentWidth,
    wide: width >= 600,
    gridColumns,
    gridItemWidth: gridColumns === 3 ? "31.7%" : "47.5%",
  };
}
