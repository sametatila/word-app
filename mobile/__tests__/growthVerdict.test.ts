import { trendOf, verdictOf, TREND_STEP, LOW_EVIDENCE } from "../src/lib/growthVerdict";

const p = (label: string, now: number | null, before: number | null, n = 5) => ({ skill: label, label, now, before, n });

describe("gelişim hükmü", () => {
  it("eşik ±3: yükseliyor / düşüyor / sabit", () => {
    expect(trendOf(p("a", 60, 60 - TREND_STEP))).toBe("up");
    expect(trendOf(p("a", 60, 60 + TREND_STEP))).toBe("down");
    expect(trendOf(p("a", 60, 58))).toBe("flat");
  });
  it("önceki ölçüm yoksa yeni, kanıt azsa az ölçüm, hiç yoksa null", () => {
    expect(trendOf(p("a", 60, null))).toBe("new");
    expect(trendOf(p("a", 60, 40, LOW_EVIDENCE - 1))).toBe("low");
    expect(trendOf(p("a", null, null, 0))).toBeNull();
  });
  it("özet: sayılar, odak ve ölçülmeyenler", () => {
    const v = verdictOf([p("Okuma", 80, 70), p("Konuşma", 30, 40), p("Yazma", 50, 50), p("Dinleme", 40, 10, 1), p("Kelime", null, null, 0)]);
    expect(v).toEqual({ up: 1, down: 1, measured: 4, firm: 3, focus: "Konuşma", unmeasured: ["Kelime"] });
  });
  it("tek sağlam ölçüm odak üretmez", () => {
    expect(verdictOf([p("Okuma", 30, 20)]).focus).toBeNull();
  });
});
