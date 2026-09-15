/**
 * ÜRETİLEN DOSYA — buradaki sayıları elle değiştirme.
 *
 * Sürümün tek kaynağı depo kökündeki `package.json` (`version` + `versionCode`).
 * Buraya `scripts/version.mjs` basıyor ve aynı betik ayrışmayı denetliyor
 * (`npm run version:check` — CI kapısı, ayrıca release:check ve ios:check onu
 * çağırıyor). Elle değiştirilen bir sayı kaynakla ayrışır ve ilk yazmada geri alınır.
 *
 * Sürümü değiştirmek için:
 *   npm run version:set -- 1.0.1     yeni semver (versionCode da artar)
 *   npm run version:bump-code        aynı semver, yeni Play yüklemesi
 *
 * Değer sabit tutuluyor çünkü sürümü çalışma zamanında okumak bir native modül
 * (device-info) eklemek demekti.
 */
export const APP_VERSION = "1.0.0";
export const APP_VERSION_CODE = 1;
