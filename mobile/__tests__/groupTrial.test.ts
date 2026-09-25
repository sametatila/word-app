import { Platform } from "react-native";
import type { PurchasesPackage } from "react-native-purchases";
import { parseDeepLink } from "../src/lib/deepLink";
import { groupTrialOption, purchaseOutcomeOf } from "../src/lib/billing";

/**
 * GRUP KODU ("2 ay ücretsiz" mağaza denemesi) — mobil tarafın sessiz kırılabilen yerleri.
 *
 *  1. `/g/<KOD>` YALNIZ ANDROID'DE tanınıyor. iOS'ta kendi koduyla içerik açmak
 *     App Store Guideline 3.1.1'e aykırı; bağlantı bir yolla iOS uygulamasına
 *     ulaşırsa (başka bir uygulamanın açtığı adres) içeri alınmamalı.
 *  2. Kod SUNUCUDAKİ kuralla sadeleşiyor (`normalizeCode`: büyük harf, harf ve
 *     rakam dışı atılır); ayrışırsa küçük harfle paylaşılan bağlantı bulunamaz.
 *  3. Satın alma sonucu (IAP-7): iptal sessiz, "onay bekliyor" hata değil.
 *  4. Play teklifi ETİKETLE bulunuyor; bulunamazsa normal fiyata SESSİZCE
 *     düşülmüyor (null → "teklif görünmüyor").
 */
jest.mock("../src/api/client", () => ({ api: jest.fn(), fetchWithTimeout: jest.fn(), apiBase: () => "https://www.lernomi.app", onBaseChange: () => () => {}, PRIMARY_BASE: "https://www.lernomi.app", FALLBACK_BASE: "https://lernomi.rumpuskit.com" }));

function onPlatform(os: "ios" | "android", fn: () => void) {
  const restore = jest.replaceProperty(Platform, "OS", os);
  try {
    fn();
  } finally {
    restore.restore();
  }
}

test("Android: grup bağlantısı tanınıyor ve kod sadeleşiyor", () => {
  onPlatform("android", () => {
    expect(parseDeepLink("https://www.lernomi.app/g/WAK7M2Q9")).toEqual({ kind: "group", code: "WAK7M2Q9" });
    expect(parseDeepLink("https://lernomi.app/g/wa-k7m2q9")).toEqual({ kind: "group", code: "WAK7M2Q9" });
    expect(parseDeepLink("https://www.lernomi.app/g/")).toBeNull();
    expect(() => parseDeepLink("https://www.lernomi.app/g/%")).not.toThrow();
    expect(parseDeepLink("https://saldirgan.com/@www.lernomi.app/g/WAK7M2Q9")).toBeNull();
  });
});

test("iOS: grup bağlantısı uygulamada TANINMIYOR (Guideline 3.1.1)", () => {
  onPlatform("ios", () => {
    expect(parseDeepLink("https://www.lernomi.app/g/WAK7M2Q9")).toBeNull();
  });
});

test("satın alma hatası sonuca çevriliyor", () => {
  expect(purchaseOutcomeOf({ userCancelled: true })).toBe("cancelled");
  expect(purchaseOutcomeOf({ code: "1" })).toBe("cancelled");
  expect(purchaseOutcomeOf({ code: "20" })).toBe("pending");
  expect(purchaseOutcomeOf({ code: "2" })).toBe("failed");
  expect(purchaseOutcomeOf(null)).toBe("failed");
});

test("Play teklifi etiketle bulunuyor, yoksa null", () => {
  const opt = (id: string, tags: string[]) => ({ id, tags }) as unknown;
  const pkg = {
    product: { subscriptionOptions: [opt("monthly-autorenew", []), opt("monthly-autorenew:free-trial-1m", ["freetrial"]), opt("monthly-autorenew:promo-2m", ["promo2m"])] },
  } as unknown as PurchasesPackage;
  expect((groupTrialOption(pkg, "promo2m") as { id: string } | null)?.id).toBe("monthly-autorenew:promo-2m");
  expect(groupTrialOption(pkg, "yok")).toBeNull();
  expect(groupTrialOption({ product: { subscriptionOptions: null } } as unknown as PurchasesPackage, "promo2m")).toBeNull();
});
