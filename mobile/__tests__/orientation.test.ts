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
 * Android'de karar MANİFESTTE DEĞİL, çalışma zamanında. Manifest yolu iki türlü
 * de çıkmaz: düz "portrait" tableti de kilitler; `@integer/...` ile cihaza göre
 * değiştirmeye çalışmak ise HİÇ uygulanmaz — manifest kaynakları yapılandırmaya
 * göre değişemiyor. Bu ikincisi denendi ve lint ölümcül saydı (ManifestResource,
 * "This value will not be used"), release yapısı durdu. Doğrusu MainActivity'de
 * `smallestScreenWidthDp` ile karar verip `requestedOrientation` atamak.
 */
const KOK = path.join(__dirname, "..");
const oku = (p: string) => readFileSync(path.join(KOK, p), "utf8");

describe("ekran yönü politikası", () => {
  it("Android: yön ÇALIŞMA ZAMANINDA ayarlanıyor, telefon dikey / tablet dört yön", () => {
    const activity = oku("android/app/src/main/java/com/lernomi/MainActivity.kt");
    // Cihaz sınıfı Android'in kendi tablet eşiğiyle: en küçük genişlik >= 600dp.
    expect(activity).toContain("smallestScreenWidthDp >= 600");
    expect(activity).toContain("SCREEN_ORIENTATION_FULL_USER");
    expect(activity).toContain("SCREEN_ORIENTATION_PORTRAIT");
  });

  it("Android manifest yönü BELİRTMİYOR", () => {
    // Manifest'e yazmak iki türlü de yanlış: düz değer tableti de kilitler,
    // `@integer/...` ise HİÇ uygulanmaz — manifest kaynakları yapılandırmaya
    // göre değişemiyor ve lint bunu ManifestResource ile ölümcül sayıyor
    // (release yapısı durur). Karar çalışma zamanında, MainActivity'de.
    expect(oku("android/app/src/main/AndroidManifest.xml")).not.toContain("android:screenOrientation");
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
