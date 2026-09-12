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
/** Dört ve beş sütuna geçilen genişlikler. */
const FOUR_COLUMN_MIN = 900;
const FIVE_COLUMN_MIN = 1200;

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
/**
 * Kabın iki yanında bırakılan boşluk (dp, tek taraf) — kap kenara yapışmasın.
 */
const SIDE_GUTTER = 48;

/**
 * Izgara/kart ağırlıklı ekranların kabı — metin sütunundan AYRI ve ekranı
 * gerçekten kullanıyor.
 *
 * İlk sürüm yalnız YATAYDA genişliyordu ve 1100dp'de duruyordu; ikisi de
 * yanlıştı. Dikey tablet de dar kalıyordu (iPad Pro 13" dikeyde 1024dp ekranda
 * 720dp içerik, yani ekranın üçte biri zemin) ve 1100 uydurma bir tavandı —
 * kartın satır ölçüsü yok, genişlikten yalnız kazanıyor.
 *
 * Şimdi kural tek: tablette kap = ekran eksi kenar payı. Telefon değişmiyor.
 */
export function wideContentWidthFor(windowWidth: number): number {
  const dar = contentWidthFor(windowWidth);
  if (windowWidth < 600) return dar;
  return Math.max(dar, windowWidth - 2 * SIDE_GUTTER);
}

/** Kabın genişliğine göre ızgara sütunu sayısı. */
export function gridColumnsFor(containerWidth: number): 2 | 3 | 4 | 5 {
  if (containerWidth >= FIVE_COLUMN_MIN) return 5;
  if (containerWidth >= FOUR_COLUMN_MIN) return 4;
  if (containerWidth >= THREE_COLUMN_MIN) return 3;
  return 2;
}

/** Sütun sayısına düşen kart genişliği — aradaki boşluk düşülmüş. */
export function gridItemWidthFor(columns: 2 | 3 | 4 | 5): string {
  return columns === 5 ? "18.6%" : columns === 4 ? "23.5%" : columns === 3 ? "31.7%" : "47.5%";
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
  /** Ekran yatay mı — tablette serbest, telefonda dikeye kilitli
   *  (kilit `MainActivity.onCreate` içinde: kaynak nitelikleri manifestte
   *  değişemediği için beyan orada değil; iOS karşılığı `Info.plist`
   *  `UISupportedInterfaceOrientations` + `~ipad`). */
  landscape: boolean;
  /** Kart ızgarasının sütun sayısı — GENİŞ kaba göre, ızgaralar orada duruyor. */
  gridColumns: 2 | 3 | 4 | 5;
  /**
   * SATIR listelerinin (FlatList) sütun sayısı — en çok iki.
   *
   * Karolardan ayrı: satırda yan yana iki dil ve bir rozet var, üçe bölününce
   * metin kırpılıyor. İkiye bölmek tablette görünen madde sayısını ikiye
   * katlıyor ve satırın kendi genişliği okunur kalıyor.
   */
  listColumns: 1 | 2;
  /** Izgarada bir kartın yüzde genişliği — aradaki boşluk düşülmüş. */
  gridItemWidth: string;
};

export function useLayout(): Layout {
  const { width, height } = useWindowDimensions();
  const contentWidth = contentWidthFor(width);
  const wideContentWidth = wideContentWidthFor(width);
  const gridColumns = gridColumnsFor(wideContentWidth);
  return {
    contentWidth,
    wideContentWidth,
    wide: width >= 600,
    landscape: width > height,
    gridColumns,
    listColumns: wideContentWidth >= FOUR_COLUMN_MIN ? 2 : 1,
    gridItemWidth: gridItemWidthFor(gridColumns),
  };
}
