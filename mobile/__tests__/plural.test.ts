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

  /*
    TEKİL BİÇİMİ OLMAYAN ANAHTAR temel metne düşmeli — `.one` yoksa motor
    sessizce boş dönmemeli.

    İDDİA METNİN TAMAMINI DEĞİL DAVRANIŞINI ölçüyor. Önceki hâli
    "1 weekly exam" diye tam cümle arıyordu ve haftalık sınav haftalık QUIZ'e
    dönünce (2026-09-17) test bayatladı: kırılan şey çoğul motoru değil,
    testin ezberlediği cümleydi. Ölçülmesi gereken tek şey sayının yerine
    konması ve `.one` yokluğunun sonucu boşaltmaması.
  */
  it("tekil biçimi olmayan anahtarda temel metin kullanılır", async () => {
    await setLang("en");
    const bir = t("plan.free_weekly", { n: 1 });
    expect(bir.startsWith("1 ")).toBe(true);
    expect(bir.length).toBeGreaterThan(3);
    /* Aynı anahtar başka sayıda da yer tutucuyu dolduruyor: cümle sabit
       kalıyor, yalnız sayı değişiyor. */
    expect(t("plan.free_weekly", { n: 3 })).toBe(bir.replace(/^1 /, "3 "));
  });
});
