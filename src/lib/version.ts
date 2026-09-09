/**
 * Uygulama sürümü — `package.json` TEK KAYNAK; web ve mobil aynı numarayı gösterir.
 *
 * Eskiden iki ayrı hat vardı: web buradan okuyup kendi başına ilerliyordu, mobil
 * üç dosyada elle tutuluyordu. İkisi de Ayarlar'ın dibinde "Lernomi <n>" yazıyor
 * ve o satırın tek işi, destek isteyen kullanıcının söyleyebileceği şey olmak —
 * ama web 1.0.5, mobil 1.0.0 diyordu. Aynı ürün, iki numara.
 *
 * Artık numara ürünün MAĞAZA sürümü: `package.json` → `scripts/version.mjs` →
 * mobilin üç dosyası. Web dağıtımları numarayı artırmaz; artıran şey yeni bir
 * mağaza yüklemesidir. `npm run version:check` dördünün aynı kaldığını CI'da
 * doğruluyor.
 */
import pkg from "../../package.json" with { type: "json" };

export const APP_VERSION: string = pkg.version;
