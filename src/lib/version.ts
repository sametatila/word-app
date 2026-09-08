/**
 * Uygulama sürümü — `package.json` ile tek kaynak.
 *
 * Mobil tarafın karşılığı `M/src/version.ts` ve o, `build.gradle` ile elle
 * eşitleniyor. Web'de böyle bir el işi gerekmiyor: sürüm zaten paket
 * tanımında ve derleme sırasında buraya geliyor.
 */
import pkg from "../../package.json" with { type: "json" };

export const APP_VERSION: string = pkg.version;
