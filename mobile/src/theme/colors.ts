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
};

export const light: Palette = {
  primary: orange[500], primaryStrong: orange[600], primarySoft: orange[100], onPrimary: "#ffffff", onPrimarySoft: orange[800],
  bg: "#fbf7f2", surface: "#ffffff", surface2: "#f5efe8", surfaceGlass: "rgba(255,255,255,0.72)", elevated: "#ffffff",
  border: "#ece3d8", hairline: "#f1eae0",
  text: "#241a12", textMuted: "#7c6c5d", textFaint: "#b7a695",
  success: "#2f9a61", danger: "#dc3f55", streak: "#b8940f", info: "#1b93ac", accent: "#9256bc",
  streakDeep: "#86690e", badgeInk: "#1e1916", onFill: "#ffffff",
  successText: "#237a4c", dangerText: "#b62e43", streakText: "#86690e", infoText: "#16748a", accentText: "#77439d",
  successSoft: "#e2f2e9", dangerSoft: "#fde6ea",
  gradientA: ["#fb8f2a", "#f87612"], gradientB: ["#ffab54", "#db5f08"],
};

export const dark: Palette = {
  primary: orange[400], primaryStrong: orange[500], primarySoft: "rgba(248,118,18,0.16)", onPrimary: "#1a1008", onPrimarySoft: orange[400],
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
};
