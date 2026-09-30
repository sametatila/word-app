import { scrollOffsetFor } from "../src/lib/scrollTarget";
import { routeFromPush } from "../src/lib/pushRoute";

/** Başarımlar derin bağlantısı: hedef karta kayma ofseti ve bildirim adresi. */
describe("scrollOffsetFor", () => {
  it("öğeyi görünümün ortasına getirir", () => {
    expect(scrollOffsetFor({ y: 1000, height: 200, viewport: 800, content: 3000 })).toBe(700);
  });
  it("listenin başındaki öğede sıfırın altına inmez", () => {
    expect(scrollOffsetFor({ y: 50, height: 200, viewport: 800, content: 3000 })).toBe(0);
  });
  it("listenin sonundaki öğede içeriğin dışına taşmaz", () => {
    expect(scrollOffsetFor({ y: 2900, height: 100, viewport: 800, content: 3000 })).toBe(2200);
  });
  it("görünüme sığmayan öğenin başını boşlukla üstte tutar", () => {
    expect(scrollOffsetFor({ y: 1000, height: 900, viewport: 800, content: 3000, margin: 16 })).toBe(984);
  });
  it("içerik görünümden kısaysa kaydırmaz", () => {
    expect(scrollOffsetFor({ y: 300, height: 100, viewport: 800, content: 600 })).toBe(0);
  });
  it("ölçü yokken kaydırmaz", () => {
    expect(scrollOffsetFor({ y: 300, height: 100, viewport: 0, content: 600 })).toBe(0);
  });
});

describe("routeFromPush › rozet", () => {
  it("rozet adresi hedefli Başarımlar'ı açar", () => {
    expect(routeFromPush("/profile/achievements?a=streak_7")).toEqual({ name: "Achievements", params: { focus: "streak_7" } });
  });
  it("hedefsiz adres duvarı normal açar", () => {
    expect(routeFromPush("/profile/achievements")).toEqual({ name: "Achievements", params: undefined });
  });
});
