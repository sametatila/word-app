import { useWindowDimensions } from "react-native";

/**
 * İÇERİK KOLONU — uygulamanın TEK genişlik standardı.
 *
 * Uygulama telefon önceliklidir ve düzen ortalı tek bir kolona sığar; yoksa
 * tablette kartlar ve metin tüm genişliğe yayılıp satır ölçüsü okunmaz olur.
 *
 * Eskiden İKİ kademe vardı: metin ekranları 640/720'lik dar sütunda, sekme
 * kökleri ve ızgaralar "ekran eksi 96" kadar geniş kapta. Sonuç iPad'de
 * (2026-09-23, Samet): menüden bir konuşmaya, tura, paywall'a girince içerik
 * kenarı yatay 13"te 64'ten 344'e zıplıyordu; her ekran başka bir standart
 * gibi görünüyordu. Şimdi kural tek ve her ekran aynı kenarları görüyor:
 *
 *   telefon (< 600)  →  PHONE_MAX_WIDTH; en geniş telefondan da geniş, yani
 *                        `maxWidth` hiç bağlamıyor, düzen birebir eskisi
 *   tablet  (≥ 600)  →  ekran eksi iki yanda SIDE_GUTTER, en çok CONTENT_MAX
 *
 * CONTENT_MAX 1120: ilk tavan 840'tı (Android'in sw840 kırılımı) ve yatay
 * tablette iki yanda 200dp'yi aşan boş şerit bırakıyordu (2026-09-26, Samet:
 * "gereksiz sağ sol boş alanlarımız var"). Yeni tavan 1280dp'lik yatay
 * Android tablette 80dp, 13" iPad'de 128dp pay bırakıyor. Kolon genişleyince
 * düzen satırı uzatmıyor, sütunu artırıyor: kart ızgarası 960'tan itibaren
 * dört sütun (`gridColumnsFor`), satır listeleri iki sütun, Patika iki panel.
 * Tek başına uzayan paragraflar kendi okuma ölçüsünde kalıyor
 * (`READABLE_TEXT_MAX`). Tavanı değiştirmek bütün uygulamayı birlikte
 * değiştirir — istenen de bu, ekran başına genişlik yok.
 */
export const PHONE_MAX_WIDTH = 520;
/** Tabletin başladığı genişlik — Android'in sw600dp kırılımı. Yönelim kilidi
 *  (`MainActivity`) de aynı sayıya bakıyor; `check:parity` ikisini karşılaştırıyor. */
export const TABLET_MIN_WIDTH = 600;
/** Tablette kolonun iki yanında bırakılan pay (dp, tek taraf). */
export const SIDE_GUTTER = 48;
/** Tablette kolonun tavanı (dp). */
export const CONTENT_MAX = 1120;
/** Ortalanmış tek başına metnin (durum gövdesi, açıklama) en çok genişliği:
 *  kolon genişlese de satır ~75 karakterde kalsın. */
export const READABLE_TEXT_MAX = 480;
/** Bütün modal kartların (onay, bildir, kutlama) genişlik tavanı — tek ölçü,
 *  diyalog başına sayı yok. Telefonda bağlamıyor (ekran eksi dolgu daha dar). */
export const DIALOG_MAX_WIDTH = 440;
/** Diyalog düğmesinin yarım genişliğe tek satırda sığdığı en uzun etiket
 *  (karakter). Kart 440, dolgu 2×24, aralık 12 → düğme ~190dp, iç payla
 *  ~158dp: kalın gövde yazısında ~18 karakter; 16 güvenli pay. Daha uzun bir
 *  etiket varsa iki düğme alt alta dizilir (bkz. `dialogActionsStacked`). */
export const DIALOG_INLINE_LABEL_MAX = 16;
/** Diyalogdaki iki düğme alt alta mı? Etiket uzunluğuna bakıyor, ölçüme değil:
 *  ilk çizimde karar belli, düğmeler yer değiştirip zıplamıyor. */
export function dialogActionsStacked(...labels: string[]): boolean {
  return labels.some((l) => l.length > DIALOG_INLINE_LABEL_MAX);
}

export function contentWidthFor(windowWidth: number): number {
  if (windowWidth < TABLET_MIN_WIDTH) return PHONE_MAX_WIDTH;
  // Taban telefon ölçüsü: 600'ün hemen üstünde kolon 599'dakinden dar olmasın.
  return Math.min(CONTENT_MAX, Math.max(PHONE_MAX_WIDTH, windowWidth - 2 * SIDE_GUTTER));
}

/** Izgaraların iki yerine üç sütuna geçtiği kolon genişliği. */
const THREE_COLUMN_MIN = 600;
/** Izgaraların dört sütuna geçtiği kolon genişliği: bir karo ~230dp'nin altına inmesin. */
const FOUR_COLUMN_MIN = 960;
/** Satır listelerinin (FlatList) iki sütuna bölündüğü kolon genişliği. */
const TWO_LIST_COLUMN_MIN = 800;

/** Kolonun genişliğine göre ızgara sütunu sayısı. */
export function gridColumnsFor(containerWidth: number): 2 | 3 | 4 {
  if (containerWidth >= FOUR_COLUMN_MIN) return 4;
  return containerWidth >= THREE_COLUMN_MIN ? 3 : 2;
}

/**
 * YÜKSEKLİK kademesi — genişlik kırılımlarının dikey eşi.
 *
 * Düzen yalnız tableti biliyordu; kısa telefon diye bir kavram yoktu. iPhone SE
 * (667pt) ve 640dp'lik Android'de onboarding seçenekleri alttaki düğmenin
 * ARKASINA düşüyor, kelime turunda maskot şıkları ekranın dışına itiyordu
 * (2026-09-22 küçük ekran incelemesi). Çözüm yazıyı küçültmek değil, düzeni
 * değiştirmek: kısa ekranda süs geri çekilir, içerik kaydırılır, eylem yapışık
 * kalır. Kararı veren bu kademe.
 *
 *   short    < 620  (320×533dp Android, yatay telefon)
 *   compact  < 740  (iPhone SE/8 667pt, 360×640dp Android)
 *   regular  ≥ 740  (çentikli iPhone'lar, çoğu Android)
 */
export type HeightClass = "short" | "compact" | "regular";
export function heightClassFor(windowHeight: number): HeightClass {
  if (windowHeight < 620) return "short";
  if (windowHeight < 740) return "compact";
  return "regular";
}
/** Dar ekran: yan yana dizilenlerin alt alta geçtiği genişlik (320dp sınıfı). */
export const NARROW_MAX_WIDTH = 360;

export type Layout = {
  /** Pencere yüksekliğinin kademesi — bkz. `heightClassFor`. */
  heightClass: HeightClass;
  /** `heightClass !== "regular"`: süsün geri çekildiği yükseklik. */
  compactHeight: boolean;
  /** Genişlik 360dp'den az: satırlar alt alta dizilir. */
  narrow: boolean;
  /** Genişlik 400dp'den az (SE, 360dp Android): başlık şeritlerindeki ikincil
   *  etiketler ikona iner, başlığa yer kalsın. */
  compactWidth: boolean;
  /** İçerik kolonunun genişliği (dp) — her ekran için aynı, bkz. `contentWidthFor`. */
  contentWidth: number;
  /** Geniş ekran mı (sw >= 600dp): tablet ya da açık katlanabilir. */
  wide: boolean;
  /** Ekran yatay mı — tablette serbest, telefonda dikeye kilitli
   *  (kilit `MainActivity.onCreate` içinde: kaynak nitelikleri manifestte
   *  değişemediği için beyan orada değil; iOS karşılığı `Info.plist`
   *  `UISupportedInterfaceOrientations` + `~ipad`). */
  landscape: boolean;
  /** Kart ızgarasının sütun sayısı — kolona göre (bkz. ui/CardGrid). */
  gridColumns: 2 | 3 | 4;
  /**
   * SATIR listelerinin (FlatList) sütun sayısı — en çok iki.
   *
   * Karolardan ayrı: satırda yan yana iki dil ve bir rozet var, üçe bölününce
   * metin kırpılıyor. İkiye bölmek tablette görünen madde sayısını ikiye
   * katlıyor ve satırın kendi genişliği okunur kalıyor.
   */
  listColumns: 1 | 2;
};

export function useLayout(): Layout {
  const { width, height } = useWindowDimensions();
  const contentWidth = contentWidthFor(width);
  const gridColumns = gridColumnsFor(contentWidth);
  const heightClass = heightClassFor(height);
  return {
    heightClass,
    compactHeight: heightClass !== "regular",
    narrow: width < NARROW_MAX_WIDTH,
    compactWidth: width < 400,
    contentWidth,
    wide: width >= TABLET_MIN_WIDTH,
    landscape: width > height,
    gridColumns,
    listColumns: contentWidth >= TWO_LIST_COLUMN_MIN ? 2 : 1,
  };
}
