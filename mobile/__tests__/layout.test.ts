import { contentWidthFor, gridColumnsFor, gridItemWidthFor, PHONE_MAX_WIDTH, wideContentWidthFor } from "../src/lib/useLayout";

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

/**
 * Izgara kabı — yatay tablette dar sütundan çıkıyor.
 *
 * İki kademenin sebebi: metnin satır ölçüsü var, kartın yok. Aynı 1280dp'lik
 * ekranda paragrafı 720'de tutmak DOĞRU, kart ızgarasını 720'de tutmak ekranın
 * yarısını zemine bırakmak demek.
 */
describe("ızgara kabı (wideContentWidthFor)", () => {
  const olc = (w: number, _h: number) => wideContentWidthFor(w);

  it("telefonda dar sütunla aynı", () => {
    expect(olc(390, 844)).toBe(contentWidthFor(390));
    expect(olc(440, 956)).toBe(contentWidthFor(440));
  });

  it("DİKEY tablette de genişliyor — ekranın üçte biri zemin kalmasın", () => {
    // iPad Pro 13" dikeyde 1024dp ekran vardı ve içerik 720'de duruyordu.
    expect(olc(1024, 1366)).toBeGreaterThan(contentWidthFor(1024));
    expect(olc(820, 1180)).toBeGreaterThan(contentWidthFor(820));
    // iPad mini dikeyde dar sütun zaten ekrana yakın: gerileme olmamalı.
    expect(olc(744, 1133)).toBeGreaterThanOrEqual(contentWidthFor(744));
  });

  it("YATAY tablette genişliyor", () => {
    expect(olc(1133, 744)).toBeGreaterThan(contentWidthFor(1133));
    expect(olc(1280, 800)).toBeGreaterThan(contentWidthFor(1280));
    expect(olc(1366, 1024)).toBeGreaterThan(contentWidthFor(1366));
  });

  it("ekranı aşmıyor", () => {
    for (const w of [1280, 1366, 1600, 2048, 3840]) expect(olc(w, 800)).toBeLessThan(w);
  });

  it("kap kenara yapışmıyor: iki yanda pay kalıyor", () => {
    // Dar sütunun bağladığı ölçüler hariç (orada pay zaten fazlasıyla var).
    for (const [w, h] of [[1133, 744], [1280, 800], [1366, 1024], [1600, 900]] as const) {
      expect(w - olc(w, h)).toBeGreaterThanOrEqual(96);
    }
  });

  it("hiçbir ölçüde dar sütundan küçük değil", () => {
    for (let w = 320; w <= 2048; w += 17) {
      for (const h of [740, 900, 1200]) {
        expect(olc(w, h)).toBeGreaterThanOrEqual(contentWidthFor(w));
      }
    }
  });

  it("600dp altı telefon sayılıyor ve genişlemiyor", () => {
    expect(olc(560, 320)).toBe(contentWidthFor(560));
    expect(olc(402, 874)).toBe(contentWidthFor(402));
  });
});

describe("ızgara sütun sayısı", () => {
  it.each([
    [PHONE_MAX_WIDTH, 2],
    [599, 2],
    [600, 3],
    [640, 3],
    [720, 3],
    [899, 3],
    [900, 4],
    [1100, 4],
    [1200, 5],
    [1270, 5],
  ])("kap %i dp → %i sütun", (kap, beklenen) => {
    expect(gridColumnsFor(kap)).toBe(beklenen);
  });

  it("kart genişlikleri sütunla birlikte küçülüyor ve %100'ü aşmıyor", () => {
    for (const n of [2, 3, 4, 5] as const) {
      const yuzde = Number(gridItemWidthFor(n).replace("%", ""));
      expect(yuzde * n).toBeLessThan(100);
      expect(yuzde * n).toBeGreaterThan(90); // boşluk payı makul kalsın
    }
  });
});
