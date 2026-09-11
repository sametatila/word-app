import { t, setLang } from "../src/lib/i18n";

/**
 * TEKİL BİÇİM.
 *
 * Sözlükte çoğul yoktu: İngilizce arayüzde "1 friends", Almancada "1 Freunde"
 * yazıyordu. Türkçede sorun yok, çünkü sayıdan sonra isim tekil kalır — test
 * üçünü birden tutuyor ki düzeltme Türkçeyi bozmasın.
 */
describe("tekil biçim", () => {
  it("İngilizcede bir sayısında ismi tekilleştirir", async () => {
    await setLang("en");
    expect(t("friends.count_friends", { n: 1 })).toBe("1 friend");
    expect(t("friends.count_friends", { n: 3 })).toBe("3 friends");
  });

  it("Almancada ismi ve edatı tekilleştirir", async () => {
    await setLang("de");
    expect(t("social.days_left", { n: 1 })).toBe("noch 1 Tag");
    expect(t("social.days_left", { n: 5 })).toBe("noch 5 Tage");
  });

  it("Türkçede sayı ne olursa olsun isim tekil kalır", async () => {
    await setLang("tr");
    expect(t("social.days_left", { n: 1 })).toBe("1 gün kaldı");
    expect(t("social.days_left", { n: 5 })).toBe("5 gün kaldı");
  });

  it("tekil biçimi olmayan anahtarda temel metin kullanılır", async () => {
    await setLang("en");
    expect(t("plan.free_weekly", { n: 1 })).toContain("1 weekly exam");
  });
});
