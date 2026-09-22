import { Dimensions, Platform, type TextStyle } from "react-native";
import type { Palette } from "./colors";

/**
 * YOĞUNLUK ÖLÇEĞİ — ekran küçüldükçe düzen orantılı sıkılaşsın.
 *
 * Bütün ölçüler 390×844'lük bir telefona göre yazıldı ve her ekranda aynı
 * kalıyordu: iPhone SE'de (375×667) ve 360×640dp Android'de kartlar, dolgular,
 * ikonlar ve başlıklar büyük telefondaki boylarıyla çizildi, ekranın yarısı
 * süse gitti (2026-09-22 küçük ekran incelemesi). Yazıyı tek tek küçültmek
 * değil, ölçeğin kendisini ekrana bağlamak gerekiyordu; tokenlar tek kaynak
 * olduğu için buradan bütün ekranlara yayılıyor.
 *
 * İki eksen ayrı: BOŞLUK dikey ritmi taşıdığı için yüksekliğe de bakıyor (SE'nin
 * sorunu genişlik değil, boy); YAZI okunaklılık için yalnız yarı oranda iniyor.
 * Tablet (kısa kenar ≥ 600) ölçeğin dışında: orada fazlalık var, eksik yok.
 *
 * Değer açılışta BİR KEZ hesaplanıyor: telefon dikeye kilitli (bkz.
 * lib/useLayout `landscape`), pencere çalışırken değişmiyor. Modül sabiti
 * olması `StyleSheet`lerin ve yüzlerce çağrı yerinin olduğu gibi kalmasını
 * sağlıyor.
 */
const win = Dimensions.get("window");
const kisaKenar = Math.min(win.width, win.height);
const uzunKenar = Math.max(win.width, win.height);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const oran = kisaKenar >= 600 || kisaKenar === 0 ? 1 : Math.min(kisaKenar / 390, uzunKenar / 844, 1);
/** Boşluk/boyut katsayısı: 390×844'te 1, SE'de ~0.8, 320×533'te 0.72. */
export const density = clamp(oran, 0.72, 1);
/** Yazı katsayısı: boşluğun yarısı kadar iner (SE'de ~0.9). */
export const typeDensity = 1 - (1 - density) * 0.5;

/** Bileşen içi sabit ölçüler (ikon kutusu, avatar, düğme yüksekliği) için. */
export function ds(n: number): number {
  return Math.round(n * density);
}
const ts = (n: number, taban: number) => Math.max(taban, Math.round(n * typeDensity * 2) / 2);

/*
  TABAN DEĞERLER DÜZ SAYI OLARAK YAZILI, ölçek AŞAĞIDA üzerlerine uygulanıyor.
  Sebep: `check:tokens`, `check:radius`, `check:type`, `check:hit` bu dosyayı
  metin olarak okuyup web ile eşliği ve ölçeği denetliyor; `bosluk(4)` gibi
  bir çağrıyı NaN görüyorlardı. Yazılı sayı = 390×844 tabanı = web'in 390px
  ve üstündeki değeri; kapıların denetlediği de o.
*/
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 };
export const radii = { sm: 10, md: 14, lg: 20, xl: 26, xxl: 34, pill: 999 };
for (const k of Object.keys(spacing) as (keyof typeof spacing)[]) spacing[k] = Math.max(2, Math.round(spacing[k] * density));
for (const k of Object.keys(radii) as (keyof typeof radii)[]) if (k !== "pill") radii[k] = ds(radii[k]);

const family = Platform.select({ ios: "System", default: "sans-serif" });
const familyBold = Platform.select({ ios: "System", android: "sans-serif", default: "sans-serif" });
export const typography = {
  display: { fontFamily: familyBold, fontSize: 32, fontWeight: "800", letterSpacing: -0.5 } as TextStyle,
  h1: { fontFamily: familyBold, fontSize: 26, fontWeight: "800", letterSpacing: -0.3 } as TextStyle,
  h2: { fontFamily: familyBold, fontSize: 20, fontWeight: "700" } as TextStyle,
  h3: { fontFamily: familyBold, fontSize: 16, fontWeight: "700" } as TextStyle,
  body: { fontFamily: family, fontSize: 15, fontWeight: "500" } as TextStyle,
  bodyStrong: { fontFamily: family, fontSize: 15, fontWeight: "700" } as TextStyle,
  caption: { fontFamily: family, fontSize: 12.5, fontWeight: "600" } as TextStyle,
  micro: { fontFamily: family, fontSize: 11, fontWeight: "700", letterSpacing: 0.4 } as TextStyle,
};
/** Punto tabanları: yoğunlukla inen punto okunaklılık için bunların altına
 *  düşmez (iOS HIG gövde için 14'ün altını önermiyor; etiket 10.5'te okunuyor). */
const PUNTO_TABANI: Record<keyof typeof typography, number> = { display: 24, h1: 21, h2: 17, h3: 15, body: 14, bodyStrong: 14, caption: 12, micro: 10.5 };
for (const k of Object.keys(typography) as (keyof typeof typography)[]) {
  typography[k] = { ...typography[k], fontSize: ts(typography[k].fontSize as number, PUNTO_TABANI[k]) };
}

/**
 * SATIR YÜKSEKLİĞİ ORANLARI — ölçeğin eksik yarısıydı.
 *
 * `typography` punto ve ağırlık taşıyordu ama satır yüksekliği taşımıyordu:
 * React Native yazı tipinin kendi varsayılanını kullanıyor ve uygulama bunu
 * ÇAĞRI YERİNDE düzeltiyordu — ölçüm yüz altmış üç elle yazılmış `lineHeight`
 * buldu ve tek bir varyantta altı ayrı değer vardı (gövde 20, 21, 22, 23, 24,
 * 25). Yani aynı metin ekranın farklı yerlerinde farklı nefes alıyordu.
 *
 * Oranlar web `globals.css` `--text-*--line-height` ile AYNI sayılar. İki
 * değer web tarafında düzeldi: küçük yazı BÜYÜK gövdeden daha SIKI
 * yazılıyordu (caption 1.4, micro 1.35 — gövdenin 1.5'inden sıkı), oysa
 * tipografide küçülen punto göreli olarak daha çok satır arası ister.
 * Android'in kendi çağrı yerleri zaten öyle yapıyordu (caption 20/12.5 = 1.6
 * kırk altı yerde, micro 18/11 = 1.64 on beş yerde); ölçü onlar oldu.
 *
 * PUNTO ÖLÇEĞİYLE BİRLİKTE BÜYÜR. Sabit bir piksel değeri erişilebilirlik
 * yazı ölçeğiyle büyümüyor ve elle yazılmış yüz altmış üç değerin hepsinde
 * bu kusur vardı: sistem yazısı 1.5x'te satırlar üst üste biniyordu. `Text`
 * bunu `PixelRatio.getFontScale()` ile çarpıyor (aynı 1.5 tavanıyla).
 */
export const lineHeightRatio: Record<keyof typeof typography, number> = {
  display: 1.15,
  h1: 1.2,
  h2: 1.3,
  h3: 1.35,
  body: 1.5,
  bodyStrong: 1.5,
  caption: 1.6,
  micro: 1.65,
};

/** Yumuşak modern gölge (fitness örneği): geniş, düşük opaklık. */
export function softShadow(color: string, elevation = 8, opacity = 0.16) {
  return Platform.select({
    ios: { shadowColor: color, shadowOffset: { width: 0, height: elevation * 0.7 }, shadowOpacity: opacity, shadowRadius: elevation * 1.6 },
    android: { elevation, shadowColor: color },
    default: {},
  });
}

/**
 * Kart gölgesi: `softShadow`un TEMAYA DUYARLI hâli.
 *
 * Renkli gölgeler (`softShadow(colors.primary, 8)` gibi) bir vurgu; bu ise
 * yüzeyin kendi yükseltisi ve nötr. Nötr olan tek değerle yazılamıyor: açık
 * temada sıcak kahve, koyu temada siyah ve daha opak olmak zorunda (gerekçe
 * `colors.ts` `shadowTint`). Webin karşılığı `shadow-soft` sınıfı.
 */
export function cardShadow(colors: Pick<Palette, "shadowTint" | "shadowStrength">, elevation = 10) {
  return softShadow(colors.shadowTint, elevation, colors.shadowStrength);
}
