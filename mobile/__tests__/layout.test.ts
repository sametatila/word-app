import { CONTENT_MAX, contentWidthFor, gridColumnsFor, PHONE_MAX_WIDTH, SIDE_GUTTER } from "../src/lib/useLayout";

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
  // Tablette kolon = ekran eksi iki yanda 48, en çok 840.
  { ad: "iPad mini dikey", genislik: 744, beklenen: 648 },
  { ad: "iPad 10.9\" dikey", genislik: 820, beklenen: 724 },
  { ad: "iPad Pro 13\" dikey", genislik: 1024, beklenen: 840 },
  { ad: "iPad Pro 13\" yatay", genislik: 1366, beklenen: 840 },
  // Çoklu görev (Split View / Slide Over): iPad'de uygulama telefon kadar dar
  // bir pencerede açılabiliyor ve UIRequiresFullScreen kapalı olduğu için bu
  // desteklenen bir durum.
  { ad: "Slide Over", genislik: 320, beklenen: PHONE_MAX_WIDTH },
  { ad: "Split View 1/2 (13\" yatay)", genislik: 678, beklenen: 582 },
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
    // Üst sınır satır ölçüsü için: 840pt'nin üstünde metin satırı uzayıp
    // okunaklığı düşüyor. Bütün ekranlar aynı kolonda, tavan da tek.
    for (let w = 300; w <= 2048; w += 1) expect(contentWidthFor(w)).toBeLessThanOrEqual(CONTENT_MAX);
  });

  it("eşikler tam sınırda doğru tarafta", () => {
    expect(contentWidthFor(599)).toBe(PHONE_MAX_WIDTH);
    // 600'ün hemen üstünde kolon telefon ölçüsünün altına inmiyor.
    expect(contentWidthFor(600)).toBe(PHONE_MAX_WIDTH);
    expect(contentWidthFor(935)).toBe(935 - 2 * SIDE_GUTTER);
    expect(contentWidthFor(936)).toBe(CONTENT_MAX);
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
  { ad: "iPad mini yatay", genislik: 1133, beklenen: 840 },
  { ad: "Android tablet yatay (1280x800)", genislik: 1280, beklenen: 840 },
  { ad: "iPad Pro 13\" yatay", genislik: 1366, beklenen: 840 },
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

/**
 * TEK KOLON — menüde ve içerikte aynı kenarlar.
 *
 * Eskiden sekme kökleri ve ızgaralar "ekran eksi 96" kadar geniş bir kapta,
 * metin ekranları 720'lik sütundaydı; iPad'de menüden konuşmaya geçerken içerik
 * kenarı zıplıyordu (2026-09-23). Artık tek bir ölçü var ve kenar payı sabit.
 */
describe("tek içerik kolonu", () => {
  it("tablette kolon kenara yapışmıyor: iki yanda en az SIDE_GUTTER kalıyor", () => {
    for (let w = 600 + 2 * SIDE_GUTTER; w <= 2048; w += 7) {
      expect(w - contentWidthFor(w)).toBeGreaterThanOrEqual(2 * SIDE_GUTTER);
    }
  });

  it("tavana ulaşmayan tablette kolon = ekran eksi iki pay", () => {
    for (const w of [744, 820, 834, 900]) expect(contentWidthFor(w)).toBe(w - 2 * SIDE_GUTTER);
  });

  it("600dp altı telefon sayılıyor: kolon bağlamıyor", () => {
    for (const w of [320, 375, 402, 440, 500]) expect(contentWidthFor(w)).toBeGreaterThanOrEqual(w);
  });
});

describe("ızgara sütun sayısı", () => {
  it.each([
    [PHONE_MAX_WIDTH, 2],
    [599, 2],
    [600, 3],
    [648, 3],
    [CONTENT_MAX, 3],
  ])("kap %i dp → %i sütun", (kap, beklenen) => {
    expect(gridColumnsFor(kap)).toBe(beklenen);
  });
});
