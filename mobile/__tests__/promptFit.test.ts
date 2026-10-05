/**
 * Soru kartı metni: iki-üç kelimelik anlam kırpılmaz (Android'de "yemek pişirmek" yalnız "yemek"
 * görünüyordu), uzun kelime bölünmeyecek puntoda başlar.
 */
import { promptFit, promptSize } from "../src/ui/fontFit";

describe("promptFit", () => {
  it("tek kelime tek satıra sığana kadar küçülür", () => {
    expect(promptFit("Anrufbeantworter")).toEqual({ numberOfLines: 1, adjustsFontSizeToFit: true, minimumFontScale: 0.45 });
  });
  it("birden çok kelimede satır sayısı ve otomatik küçültme YOK (Android ikinci satırı kırpıyordu)", () => {
    expect(promptFit("yemek pişirmek")).toEqual({});
    expect(promptFit("der Anrufbeantworter")).toEqual({});
    expect(promptFit("Heute koche ich Suppe mit Linsen.")).toEqual({});
  });
});

describe("promptSize", () => {
  it("kısa çok kelimeli anlam büyük puntoda kalır", () => {
    expect(promptSize("yemek pişirmek")).toEqual({ variant: "display" });
  });
  it("uzun isim artikeliyle dar karta sığacak puntoya iner", () => {
    // 16 harf: 32 puntoda 307 px, 26'da 250 px → h1 (bölünmeden sığar)
    expect(promptSize("der Anrufbeantworter").variant).toBe("h1");
    // 22 harf: h2'de 264 px sığmaz, h3'te 211 px
    expect(promptSize("die Rechtsbehelfsbelehrung").variant).toBe("h3");
  });
  it("hiçbir adıma sığmayan kelimede punto hesaplanır", () => {
    const s = promptSize("das Donaudampfschifffahrtsgesellschaft");
    expect(s.variant).toBe("h3");
    expect(s.fontSize).toBeLessThan(16);
  });
  it("tek kelimede yalnız toplam uzunluk kuralı (küçültmeyi promptFit yapar)", () => {
    expect(promptSize("Haus")).toEqual({ variant: "display" });
  });
});
