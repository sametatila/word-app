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
/** Dört sütuna geçtiği genişlik — pratikte yalnız yatay tablette görülüyor. */
const FOUR_COLUMN_MIN = 900;

/**
 * Izgara/kart ağırlıklı ekranların kabı — metin sütunundan AYRI.
 *
 * `contentWidthFor` satır ölçüsünü koruyor ve 720'de duruyor; doğrusu da bu,
 * paragraf 720'nin ötesinde okunmaz oluyor. Ama yatay tablette (1280–1366dp)
 * bir KART IZGARASINI da 720'de tutmak ekranın yarısını zemine bırakıyor —
 * kartların satır ölçüsü yok, genişlikten yalnızca kazanıyorlar.
 *
 * Bu yüzden iki kademe var: metin ekranları dar sütunda kalıyor, ızgara
 * ekranları yatayda genişliyor (bkz. ui/ContentColumn, `wideColumnLayout` ve
 * onu kullanan altı ekran). Dikeyde ikisi aynı: dikey tablette zaten fazlalık
 * genişlik yok.
 */
const LANDSCAPE_MAX_WIDTH = 1100;

export function wideContentWidthFor(windowWidth: number, windowHeight: number): number {
  const dar = contentWidthFor(windowWidth);
  const yatay = windowWidth > windowHeight;
  if (!yatay || windowWidth < 600) return dar;
  return Math.max(dar, Math.min(windowWidth, LANDSCAPE_MAX_WIDTH));
}

/** Kabın genişliğine göre ızgara sütunu sayısı. */
export function gridColumnsFor(containerWidth: number): 2 | 3 | 4 {
  if (containerWidth >= FOUR_COLUMN_MIN) return 4;
  if (containerWidth >= THREE_COLUMN_MIN) return 3;
  return 2;
}

/** Sütun sayısına düşen kart genişliği — aradaki boşluk düşülmüş. */
export function gridItemWidthFor(columns: 2 | 3 | 4): string {
  return columns === 4 ? "23.5%" : columns === 3 ? "31.7%" : "47.5%";
}

export function contentWidthFor(windowWidth: number): number {
  if (windowWidth < 600) return PHONE_MAX_WIDTH;
  if (windowWidth < 840) return TABLET_COLUMN;
  return LARGE_TABLET_COLUMN;
}

export type Layout = {
  /** Metin ağırlıklı içeriğin sütunu (px değil dp) — satır ölçüsü için sınırlı. */
  contentWidth: number;
  /** Izgara ağırlıklı içeriğin kabı: yatay tablette genişler, başka yerde eşittir. */
  wideContentWidth: number;
  /** Geniş ekran mı (sw >= 600dp): tablet ya da açık katlanabilir. */
  wide: boolean;
  /** Ekran yatay mı — tablette serbest, telefonda dikeye kilitli (bkz. manifest). */
  landscape: boolean;
  /** Kart ızgarasının sütun sayısı — GENİŞ kaba göre, ızgaralar orada duruyor. */
  gridColumns: 2 | 3 | 4;
  /** Izgarada bir kartın yüzde genişliği — aradaki boşluk düşülmüş. */
  gridItemWidth: string;
};

export function useLayout(): Layout {
  const { width, height } = useWindowDimensions();
  const contentWidth = contentWidthFor(width);
  const wideContentWidth = wideContentWidthFor(width, height);
  const gridColumns = gridColumnsFor(wideContentWidth);
  return {
    contentWidth,
    wideContentWidth,
    wide: width >= 600,
    landscape: width > height,
    gridColumns,
    gridItemWidth: gridItemWidthFor(gridColumns),
  };
}
