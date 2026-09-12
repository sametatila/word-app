/**
 * Lernomi mobil palet — marka turuncusu (#f87612, logo zemininden) çekirdek;
 * yumuşak/modern (fitness örneği) doku. Semantik renkler WEB paletiyle hizalı
 * (mint=doğru/A1, rose=yanlış/C1, sky=A2, violet=B1, flame=seri) ki iki uygulama
 * tutarlı olsun. Light + dark; dolu zeminde okunur tonlar sabit.
 *
 * `textMuted` açık temada #8a7866 idi ve beyaz kart üstünde 4.23 veriyordu —
 * AA eşiği 4.5. #7c6c5d 5.05 veriyor ve iki ton yan yana ayırt edilemiyor,
 * yani okunabilirlik kazanılırken görünümden bir şey kaybedilmiyor. Web de
 * aynı değerde; iki uygulamanın sönük metni artık BİREBİR aynı.
 */
export const orange = {
  50: "#fff4e9", 100: "#ffe3c4", 200: "#ffc98d", 300: "#ffab54", 400: "#fb8f2a",
  500: "#f87612", 600: "#db5f08", 700: "#b44909", 800: "#8f3a0f", 900: "#74310f",
} as const;

export type Palette = {
  primary: string; primaryStrong: string; primarySoft: string; onPrimary: string;
  /**
   * `primarySoft` zemin üstünde okunan yazı/ikon rengi.
   *
   * Seçili çip eskiden `primary` (#f87612) yazıyordu ve #ffe3c4 üstünde 2.24
   * veriyordu — AA eşiği 4.5. Marka ailesinden koyu bir ton 6.13 veriyor ve
   * çipin dili (yumuşak zemin + turuncu yazı) bozulmuyor. Koyu temada zemin
   * zaten alfa olduğu için `primary` 5.93 veriyor, orada değişen bir şey yok.
   */
  onPrimarySoft: string;
  /**
   * DOLU MARKA YÜZEYİNDEKİ İKİNCİL yazı - `onPrimary`nin soluk hâli.
   *
   * Günün turu skor kartı gibi dolu turuncu yüzeylerde başlık `onPrimary`,
   * altındaki etiketler yarı saydam beyazdı (`#ffffffcc`). Koyu temada dolgu
   * açılıyor ve yarı saydam beyaz 2.2'ye düşüyordu: aynı kartın başlığı
   * okunurken etiketi okunmuyordu. Aynı mürekkebin saydamı iki temada da
   * başlıkla tutarlı.
   */
  onPrimaryMuted: string;
  /**
   * Marka turuncusu YAZI ve İKON olarak.
   *
   * `primary` bir DOLGU rengi: açık temada orange[500] ve açık bir yüzeyin
   * üstünde okunmuyor - ölçüm kart üstünde 2.77, zeminde 2.59, `primarySoft`
   * üstünde 2.24. AA yazı için 4.5, grafik için 3.0 istiyor. orange[700] aynı
   * yerlerde 5.39 / 5.05 / 4.37.
   *
   * Web bu kararı zaten vermişti (`globals.css` `--color-brand: brand-700`) ve
   * sebebini oraya yazmıştı; mobilde karşılığı yoktu. Koyu temada iki değer
   * aynı - orada `primary` zaten 7.41 veriyor.
   */
  primaryText: string;
  bg: string; surface: string; surface2: string; surfaceGlass: string; elevated: string;
  border: string; hairline: string;
  text: string; textMuted: string; textFaint: string;
  success: string; danger: string; streak: string; info: string; accent: string;
  /**
   * Dolu kehribar zemin ÜSTÜNE beyaz yazı için - iki temada da aynı değer.
   *
   * `streak` bu iş için fazla açık: beyaz yazı açık temada 2.88, koyu temada
   * 1.94 veriyor; AA küçük yazı için 4.5, büyük yazı için 3.0 istiyor. Web'in
   * `--color-flame-600`sı ile aynı ton, 5.20. Tema ile DEĞİŞMİYOR çünkü web
   * de bu kartta sabit bir basamak kullanıyor ve ikisi eş görünmeli.
   */
  streakDeep: string;
  /** Sayaç rozetinin (parlak kehribar zemin) yazı rengi - 6.04. */
  badgeInk: string;
  /**
   * DOLU VURGU KAROSUNUN ÜSTÜ — ikon ya da yazı (`IconTile solid`).
   *
   * Vurgu renkleri tema ile basamak değiştiriyor ve tek bir sabit renk ikisini
   * birden taşımıyor: beyaz ikon koyu temada 1.76-2.76 veriyor, grafik eşiği
   * 3.0 bile değil; mürekkep orada 6.31-9.87. Açık temada tam tersi. Aynı
   * fikir `onPrimary` ile zaten vardı, dolu karo onu kullanmıyordu.
   */
  onFill: string;
  /**
   * Aynı anlamların YAZI ağırlığındaki tonları.
   *
   * Üsttekiler DOLGU için seçilmiş: beyaz ikon taşıyan karo, ilerleme çubuğu,
   * rozet zemini. Yazı olarak kullanıldıklarında açık temada ölçüm şöyle
   * çıkıyor (beyaz üstünde): seri 2.88, başarı 3.55, bilgi 3.61, tehlike
   * 4.30, vurgu 4.91 — AA eşiği 4.5, yani beşinden dördü kalıyor ve en çok
   * kullanılanı (başlıktaki seri sayacı) en kötüsü.
   *
   * Web bu ayrımı zaten yapıyor: dolgu 500, yazı 600. Buradakiler onun
   * 600'leri ve ölçümleri 5.20-6.83. Koyu temada ayrım gerekmiyor - oradaki
   * tonlar yüzey üstünde 8.3-9.7 veriyor, o yüzden aynı değerler.
   */
  successText: string; dangerText: string; streakText: string; infoText: string; accentText: string;
  successSoft: string; dangerSoft: string;
  gradientA: [string, string]; gradientB: [string, string]; // yumuşak kart gradyanları
  /**
   * NÖTR KART GÖLGESİ - rengi de opaklığı da temayla değişir.
   *
   * Açık temada sıcak bir kahve (#5a3418, 0.16): zemin de sıcak, nötr siyah
   * kremin üstünde gri bir kir gibi duruyor. Koyu temada aynı kahve GÖRÜNMÜYOR
   * - koyu bir yüzeyin üstünde koyu ve %16 opak bir gölge yok demek, kartlar
   * yükseltilerini kaybediyor. Orada gölge siyah ve çok daha opak.
   *
   * Web bu ayrımı `--shadow-soft*` jetonlarında yapıyor (`globals.css`): açık
   * `rgb(90 52 24 / 0.16)`, koyu `rgb(0 0 0 / 0.45)`. Mobilde karşılığı yoktu
   * - yedi çağrı da sabit `#5a3418` geçiyordu.
   */
  shadowTint: string; shadowStrength: number;
};

export const light: Palette = {
  primary: orange[500], primaryStrong: orange[600], primarySoft: orange[100], onPrimary: "#ffffff", onPrimaryMuted: "#ffffffcc", onPrimarySoft: orange[800], primaryText: orange[700],
  bg: "#fbf7f2", surface: "#ffffff", surface2: "#f5efe8", surfaceGlass: "rgba(255,255,255,0.72)", elevated: "#ffffff",
  border: "#ece3d8", hairline: "#f1eae0",
  text: "#241a12", textMuted: "#7c6c5d", textFaint: "#b7a695",
  success: "#2f9a61", danger: "#dc3f55", streak: "#b8940f", info: "#1b93ac", accent: "#9256bc",
  streakDeep: "#86690e", badgeInk: "#1e1916", onFill: "#ffffff",
  successText: "#237a4c", dangerText: "#b62e43", streakText: "#86690e", infoText: "#16748a", accentText: "#77439d",
  successSoft: "#e2f2e9", dangerSoft: "#fde6ea",
  gradientA: ["#fb8f2a", "#f87612"], gradientB: ["#ffab54", "#db5f08"],
  shadowTint: "#5a3418", shadowStrength: 0.16,
};

export const dark: Palette = {
  primary: orange[400], primaryStrong: orange[500], primarySoft: "rgba(248,118,18,0.16)", onPrimary: "#1a1008", onPrimaryMuted: "rgba(26,16,8,0.80)", onPrimarySoft: orange[400], primaryText: orange[400],
  bg: "#17120e", surface: "#211a14", surface2: "#2b221a", surfaceGlass: "rgba(43,34,26,0.6)", elevated: "#2b221a",
  border: "#3a2e23", hairline: "#2b221a",
  text: "#f6efe6", textMuted: "#a9998a", textFaint: "#7c6c5d",
  success: "#6fd19b", danger: "#f79ba6", streak: "#ddb62c", info: "#6fd1e3", accent: "#cda6e8",
  streakDeep: "#86690e", badgeInk: "#1e1916", onFill: "#1e1916",
  // Koyu temada dolgu ve yazı ayrımı gerekmiyor: bu tonlar yüzey üstünde
  // 8.3-9.7 veriyor. Aynı değerler, ikinci bir ton uydurulmadı.
  successText: "#6fd19b", dangerText: "#f79ba6", streakText: "#ddb62c", infoText: "#6fd1e3", accentText: "#cda6e8",
  successSoft: "rgba(111,209,155,0.16)", dangerSoft: "rgba(247,155,166,0.16)",
  gradientA: ["#fb8f2a", "#db5f08"], gradientB: ["#f87612", "#8f3a0f"],
  shadowTint: "#000000", shadowStrength: 0.45,
};

/**
 * Bir dolgu renginin KENDİ %13 tinti üstünde okunacak karşılığı.
 *
 * Uygulama boyunca aynı kalıp var: zemin `tint + "22"`, içerik de `tint`.
 * Açık temada bu okunmuyor - ölçüm: turuncu 2.42, kehribar 2.54, yeşil 3.06,
 * turkuaz 3.10, kırmızı 3.58; AA yazı için 4.5, grafik için 3.0 istiyor, yani
 * ilk ikisi grafik eşiğini bile tutmuyor. Metin varyantlarıyla aynı yerde
 * 4.57-6.61. Koyu temada iki değer zaten aynı, orada hiçbir şey değişmiyor.
 *
 * Tanınmayan bir renk (ör. `textMuted`) olduğu gibi dönüyor: bu eşleme bir
 * düzeltme, bir dönüşüm değil.
 */
export function onTint(tint: string, colors: Palette): string {
  if (tint === colors.primary) return colors.onPrimarySoft;
  if (tint === colors.success) return colors.successText;
  if (tint === colors.danger) return colors.dangerText;
  if (tint === colors.streak) return colors.streakText;
  if (tint === colors.info) return colors.infoText;
  if (tint === colors.accent) return colors.accentText;
  return tint;
}

/**
 * Kademe / madalya ölçeği — web `components/achievement-badge.tsx`
 * `TIER_COLOR` ile BİREBİR aynı dört değer.
 *
 * Tema duyarlı DEĞİL ve olmamalı: bronz/gümüş/altın bir kimlik, sıcaklığı
 * temayla değişmez (web de sabit tutuyor). Üçü de DOLU ZEMİN + BEYAZ içerik
 * için ölçülmüş - beyazla 4.44 / 3.79 / 3.62, yani grafik ve büyük yazı
 * eşiği 3.0'ın üstünde. Metin rengi olarak kullanılamazlar: beyaz kart
 * üstünde aynı değerler 4.44 / 3.79 / 3.62 verir ve normal yazı eşiği 4.5'in
 * altına düşer.
 *
 * Tek kaynak olması gerekiyordu: ölçek iki ekranda ayrı ayrı yazılıydı ve
 * biri düzeltilirken öteki eski değerlerle kalmıştı (bkz. günün turu sıralama
 * madalyası, docs/plan/web-parity.md 11.37).
 */
export const TIER_COLOR = {
  bronze: "#a9683c",
  silver: "#8a8277",
  gold: "#aa8012",
  legend: "#77439d",
} as const;

/**
 * CEFR rozetinin tonları — TEMAYA DUYARLI DEĞİL.
 *
 * Rozet dolu bir zemin ve üstünde beyaz yazı taşıyor, yani zemini kendisi
 * getiriyor; önemli olan yalnızca beyazla kontrastı. Ton `colors.success`,
 * `colors.info` gibi ROL renklerinden alınıyordu ve o renkler kart üstünde
 * OKUNACAK yazı için değil, işaret için ayarlı. Ölçüm (açık tema, beyaz yazı):
 * A1 3.55, A2 3.61, B1 4.91, B2 2.77, C1 4.30 — yazı `bodyStrong` (15 px),
 * yani AA eşiği 4.5 ve beşten dördü tutmuyordu; B2 büyük yazı eşiği 3.0'ı
 * bile tutmuyor.
 *
 * Aynı ölçüm web tarafında yapılmış ve düzeltilmişti (`components/level-badge`
 * `TONE`): ailelerin 600'ü, B2 ise 700'ü (marka turuncusunun 600'ü beyazla
 * 3.72, 700'ü 5.39). Değerler o tabloyla BİREBİR aynı ve kapı karşılaştırıyor
 * (parity §330).
 *
 * Koyu temada da aynı tonlar: rozet kendi zeminini getirdiği için temanın
 * yüzeyiyle işi yok. `onFill` bu yüzden KULLANILMIYOR — o jeton koyu temada
 * koyu mürekkebe dönüyor ve bu zeminlerde okunmaz.
 */
export const LEVEL_TONE: Record<string, string> = {
  A1: "#237a4c",
  A2: "#16748a",
  B1: "#77439d",
  B2: orange[700],
  C1: "#b62e43",
};

/** Rozet yazısı iki temada da beyaz (yukarıdaki gerekçe). */
export const LEVEL_INK = "#ffffff";

/**
 * Onay diyaloğunun düğme dolguları — TEMAYA DUYARLI DEĞİL.
 *
 * Yıkıcı düğme `colors.danger` kullanıyordu ve yazısı KODA GÖMÜLÜ beyazdı.
 * Ölçüm: açık temada #dc3f55 + beyaz 4.30 (yazı `bodyStrong`, 15 px, yani AA
 * eşiği 4.5 — tutmuyor), KOYU temada `danger` açık pembeye dönüyor (#f79ba6)
 * ve beyaz yazıyla **2.06** veriyor, yani "hesabı sil" onayı okunmuyordu.
 * Paletin kendi yorumu da bunu söylüyor: koyu temada dolgunun mürekkebi
 * `onFill` (#1e1916), beyaz değil — ama bu diyalog `onFill` kullanmıyordu.
 *
 * Web aynı diyaloğu iki temada da SABİT tonla çiziyor
 * (`components/confirm-dialog`: yıkıcı `--color-rose-600`, normal
 * `--color-brand-500`, yazı beyaz) ve rose-600 beyazla 6.07 veriyor. Değerler
 * oradan alındı; iki uygulamanın onay kutusu artık birebir aynı.
 *
 * Normal (yıkıcı olmayan) dolgu marka turuncusunun 500'ü ve beyaz yazıyla
 * 2.77 veriyor: bu, birincil düğmenin kabul edilmiş sapması (T-KARAR-1) —
 * zeminin markanın kendisi olması bir kimlik kararı ve web de aynı değeri
 * kullanıyor. Yıkıcı düğme o kararın KAPSAMINDA DEĞİL, orada zemin bir kimlik
 * değil bir uyarı.
 */
export const DIALOG_FILL = { primary: orange[500], destructive: "#b62e43" } as const;

/** Onay düğmesinin yazısı iki temada da beyaz (yukarıdaki gerekçe). */
export const DIALOG_INK = "#ffffff";
