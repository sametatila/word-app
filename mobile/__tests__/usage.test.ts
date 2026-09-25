/**
 * Kullanım bilgisi — kart satırındaki hâl/söz dizimi/kayıt etiketi.
 * Web `lib/usage` ile aynı liste (parity 250); burada davranış.
 */
import { usageCodes, USAGE_CODES } from "../src/lib/usage";
import { tr } from "../src/i18n/tr";
import { en } from "../src/i18n/en";
import { de } from "../src/i18n/de";

describe("usageCodes", () => {
  it("bilinen kodları sırasıyla verir, bilinmeyeni düşürür", () => {
    expect(usageCodes("dat ugs")).toEqual(["dat", "ugs"]);
    expect(usageCodes("Dativ dat")).toEqual(["dat"]);
    expect(usageCodes(null)).toEqual([]);
    expect(usageCodes("")).toEqual([]);
  });

  it("her kodun üç dilde etiketi var", () => {
    for (const dict of [tr, en, de]) {
      for (const c of USAGE_CODES) expect(dict[`usage.${c}`]).toBeTruthy();
    }
  });
});
