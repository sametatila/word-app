import { contentWidthFor, PHONE_MAX_WIDTH } from "../src/lib/useLayout";

/**
 * İçerik sütunu kırılımları — gerçek cihaz genişlikleriyle.
 *
 * NEDEN VAR: uygulama iPhone ve iPad'de birden satılıyor
 * (`TARGETED_DEVICE_FAMILY = "1,2"`), yani inceleyici uygulamayı iPad'de açıyor ve
 * döndürüyor. Düzenin tek savunması `contentWidthFor`: geniş ekranda içeriği ortalı
 * bir sütuna sığdırıyor, yoksa kartlar ve metin 1366pt'ye yayılıp satır ölçüsü
 * okunmaz oluyor. Burada sabitleniyor ki eşikler sessizce kaymasın — iPad'i bu
 * makinede açmanın başka yolu yok.
 *
 * Genişlikler noktadan (pt), yani RN'in dp'siyle aynı ölçek.
 */

const CIHAZLAR: { ad: string; genislik: number; beklenen: number }[] = [
  // Telefon: sütun ekrandan geniş olabilir, `maxWidth` olduğu için kısıtlamıyor.
  { ad: "iPhone SE (en dar satılan telefon)", genislik: 375, beklenen: PHONE_MAX_WIDTH },
  { ad: "iPhone 16 Pro Max (6.9\")", genislik: 440, beklenen: PHONE_MAX_WIDTH },
  // Tablet eşiği Android'in sw600dp kırılımıyla aynı.
  { ad: "iPad mini dikey", genislik: 744, beklenen: 640 },
  { ad: "iPad 10.9\" dikey", genislik: 820, beklenen: 640 },
  { ad: "iPad Pro 13\" dikey", genislik: 1024, beklenen: 720 },
  { ad: "iPad Pro 13\" yatay", genislik: 1366, beklenen: 720 },
  // Çoklu görev (Split View / Slide Over): iPad'de uygulama telefon kadar dar
  // bir pencerede açılabiliyor ve UIRequiresFullScreen kapalı olduğu için bu
  // desteklenen bir durum.
  { ad: "Slide Over", genislik: 320, beklenen: PHONE_MAX_WIDTH },
  { ad: "Split View 1/2 (13\" yatay)", genislik: 678, beklenen: 640 },
];

describe("içerik sütunu genişliği", () => {
  it.each(CIHAZLAR)("$ad ($genislik pt) → $beklenen", ({ genislik, beklenen }) => {
    expect(contentWidthFor(genislik)).toBe(beklenen);
  });

  it("ekran büyüdükçe sütun küçülmüyor", () => {
    const genislikler = [320, 375, 440, 599, 600, 744, 839, 840, 1024, 1366, 2048];
    const sutunlar = genislikler.map(contentWidthFor);
    expect(sutunlar).toEqual([...sutunlar].sort((a, b) => a - b));
  });

  it("sütun hiçbir ekranda okunabilir ölçüyü aşmıyor", () => {
    // Üst sınır satır ölçüsü için: 720pt'nin üstünde metin satırı uzayıp
    // okunaklığı düşüyor. iPad Pro yatayda ekranın yarısı boş kalsa da doğrusu bu.
    for (let w = 300; w <= 2048; w += 1) expect(contentWidthFor(w)).toBeLessThanOrEqual(720);
  });

  it("eşikler tam sınırda doğru tarafta", () => {
    expect(contentWidthFor(599)).toBe(PHONE_MAX_WIDTH);
    expect(contentWidthFor(600)).toBe(640);
    expect(contentWidthFor(839)).toBe(640);
    expect(contentWidthFor(840)).toBe(720);
  });
});

/**
 * Yatay tablet — döndürme sütunu bozmamalı.
 *
 * Telefon dikeye kilitli (aşağıdaki yönlendirme testi), tablet dört yöne
 * serbest. Yani sütunun yatayda da doğru davranması GEREKİYOR: ekran uzuyor
 * diye satır ölçüsü uzamamalı, ama dikeydeki daralmayı da taşımamalı.
 */
const YATAY: { ad: string; genislik: number; beklenen: number }[] = [
  { ad: "iPad mini yatay", genislik: 1133, beklenen: 720 },
  { ad: "Android tablet yatay (1280x800)", genislik: 1280, beklenen: 720 },
  { ad: "iPad Pro 13\" yatay", genislik: 1366, beklenen: 720 },
];

describe("yatay tablette içerik sütunu", () => {
  it.each(YATAY)("$ad ($genislik dp) → $beklenen", ({ genislik, beklenen }) => {
    expect(contentWidthFor(genislik)).toBe(beklenen);
  });

  it("döndürünce sütun daralmıyor", () => {
    // Aynı cihazın dikey ve yatay genişlikleri: yatay her zaman >= dikey olmalı.
    const cihazlar: [number, number][] = [
      [744, 1133], // iPad mini
      [800, 1280], // Android tablet
      [1024, 1366], // iPad Pro 13"
    ];
    for (const [dikey, yatay] of cihazlar) {
      expect(contentWidthFor(yatay)).toBeGreaterThanOrEqual(contentWidthFor(dikey));
    }
  });
});
