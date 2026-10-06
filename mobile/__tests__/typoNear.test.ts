/**
 * Yazarak Hatırla'da tek harflik yazım hatası doğru sayılır (2026-10-07,
 * "beantworyen"); umlaut ve kısa kelime sınırları bilerek dar.
 */
import { typoNear } from "../src/lib/errors";

test("tek harf değişik / eksik / fazla / yer değiştirmiş: kabul", () => {
  expect(typoNear("beantworyen", ["beantworten"])).toBe("beantworten");
  expect(typoNear("beantworen", ["beantworten"])).toBe("beantworten");
  expect(typoNear("beantwortten", ["beantworten"])).toBe("beantworten");
  expect(typoNear("beatnworten", ["beantworten"])).toBe("beantworten");
  expect(typoNear("die Kartofel", ["die Kartoffel"])).toBe("die Kartoffel");
});

test("iki hata ya da kısa kelime: kabul değil", () => {
  expect(typoNear("beantworyem", ["beantworten"])).toBeNull();
  expect(typoNear("Wein", ["Bein"])).toBeNull();
  expect(typoNear("Hund", ["Hand"])).toBeNull();
});

test("umlaut ve ß hatası yazım hatası sayılmaz", () => {
  expect(typoNear("Mutter", ["Mütter"])).toBeNull();
  expect(typoNear("Grusse", ["Grüsse"])).toBeNull();
  expect(typoNear("Strase", ["Straße"])).toBeNull();
  expect(typoNear("schoner", ["schöner"])).toBeNull();
});
