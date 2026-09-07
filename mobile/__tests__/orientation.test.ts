/// <reference types="node" />
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Ekran yönü POLİTİKASI — telefonda yalnız dikey, tablette dört yön.
 *
 * NEDEN TEST: karar iki platformda üç ayrı dosyaya dağılmış durumda ve hiçbiri
 * ötekini bilmiyor. Biri sessizce değişirse (ör. Android manifest'ine düz
 * "portrait" yazılırsa) tablet dikeye kilitlenir ve bunu ancak bir tablette
 * açınca fark ederiz — bu makinede öyle bir cihaz yok.
 *
 * Android'de değer kaynaktan geliyor çünkü `screenOrientation` cihaz sınıfına
 * göre değişemiyordu: niteliğin derlenmiş biçimi tamsayı olduğu için
 * `@integer/...` verilebiliyor ve `values-sw600dp` tabletde başka bir değer
 * döndürüyor. Sayılar ActivityInfo sabitleri.
 */
const KOK = path.join(__dirname, "..");
const oku = (p: string) => readFileSync(path.join(KOK, p), "utf8");

/** ActivityInfo.SCREEN_ORIENTATION_PORTRAIT */
const PORTRAIT = 1;
/** ActivityInfo.SCREEN_ORIENTATION_FULL_USER — dört yön, otomatik döndürme ayarına saygılı. */
const FULL_USER = 13;

const integerDegeri = (xml: string, ad: string): number | null => {
  const m = xml.match(new RegExp(`<integer name="${ad}">\\s*(-?\\d+)\\s*</integer>`));
  return m ? Number(m[1]) : null;
};

describe("ekran yönü politikası", () => {
  it("Android telefon: yalnız dikey", () => {
    expect(integerDegeri(oku("android/app/src/main/res/values/integers.xml"), "screen_orientation")).toBe(PORTRAIT);
  });

  it("Android tablet (sw600dp): dört yön serbest", () => {
    expect(integerDegeri(oku("android/app/src/main/res/values-sw600dp/integers.xml"), "screen_orientation")).toBe(FULL_USER);
  });

  it("Android manifest yönü KAYNAKTAN alıyor (düz değer yazılmamış)", () => {
    const manifest = oku("android/app/src/main/AndroidManifest.xml");
    expect(manifest).toContain('android:screenOrientation="@integer/screen_orientation"');
    // Düz bir değer yazılmış olsaydı tablet de kilitlenirdi.
    expect(manifest).not.toMatch(/android:screenOrientation="(portrait|landscape|sensor|user)"/);
  });

  it("iOS iPhone: yalnız dikey, iPad: dört yön", () => {
    const plist = oku("ios/Lernomi/Info.plist");
    const dizi = (anahtar: string): string[] => {
      const m = plist.match(new RegExp(`<key>${anahtar}</key>\\s*<array>([\\s\\S]*?)</array>`));
      return m ? [...m[1].matchAll(/<string>([^<]+)<\/string>/g)].map((x) => x[1]) : [];
    };
    // iPhone: TEK yön. Yatay eklenirse düzen bozulur, üstelik Android'le ayrışır.
    expect(dizi("UISupportedInterfaceOrientations")).toEqual(["UIInterfaceOrientationPortrait"]);
    // iPad: dördü de. App Store inceleyicisi uygulamayı iPad'de açıp döndürüyor.
    expect(dizi("UISupportedInterfaceOrientations~ipad").sort()).toEqual([
      "UIInterfaceOrientationLandscapeLeft",
      "UIInterfaceOrientationLandscapeRight",
      "UIInterfaceOrientationPortrait",
      "UIInterfaceOrientationPortraitUpsideDown",
    ]);
  });
});
