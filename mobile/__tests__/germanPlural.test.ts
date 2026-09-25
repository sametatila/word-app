/**
 * Almanca çoğul hesabı — web `lib/german` ile aynı gövde (check:parity).
 *
 * Veride çoğul iki biçimde duruyor: kural ("¨-e", "ä, -e") ve çoğulun kendisi
 * ("Arbeitsverträge", "die Arbeitsverträge", sonu değişenlerde "Museen").
 * Kart notu ve hata açıklaması ikisini de aynı biçime çevirmeli.
 */
import { pluralFormOf, pluralOf, pluralRuleOf, umlautStem } from "../src/lib/german";

describe("Almanca çoğul", () => {
  it("umlaut son ünlüye gelir, önceki au umlautlanmaz", () => {
    expect(umlautStem("Ausflug")).toBe("Ausflüg");
    expect(umlautStem("Hauptstadt")).toBe("Hauptstädt");
    expect(umlautStem("Haus")).toBe("Häus");
  });

  it("kural yazımından çoğul", () => {
    expect(pluralOf("Anfang", "ä, -e")).toBe("Anfänge");
    expect(pluralOf("Straße", "-n")).toBe("Straßen");
    expect(pluralOf("Lehrer", "-")).toBe("Lehrer");
  });

  it("tam biçimden kural çıkarılır", () => {
    expect(pluralRuleOf("Arbeitsvertrag", "die Arbeitsverträge")).toEqual({ umlaut: true, suffix: "e" });
    expect(pluralRuleOf("Ärztin", "Ärztinnen")).toEqual({ umlaut: false, suffix: "nen" });
    expect(pluralOf("Arbeitsvertrag", "Arbeitsverträge")).toBe("Arbeitsverträge");
  });

  it("kuralla üretilemeyen tam biçimde kural yok ama kart biçimi var", () => {
    expect(pluralRuleOf("Museum", "Museen")).toBeNull();
    expect(pluralOf("Museum", "Museen")).toBeNull();
    expect(pluralFormOf("Museum", "Museen")).toBe("Museen");
  });

  it("çoğulu olmayan maddede biçim yok", () => {
    expect(pluralFormOf("Milch", "(Sg.)")).toBeNull();
    expect(pluralFormOf("gehen", "ist gegangen")).toBeNull();
  });
});
