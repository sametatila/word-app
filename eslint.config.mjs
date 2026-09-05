import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Web tarafı ESLint yapılandırması — 2026-09-04'te kuruldu.
 *
 * Buraya kadar web kodu HİÇ lint görmemişti: `package.json` `next lint` çağırıyordu,
 * Next 16 o komutu kaldırdı (`docs/01-app/02-guides/upgrading/version-16.md`) ve
 * komut "Invalid project directory … /lint" ile düşüyordu. CI de zaten yalnız tsc ve
 * next build koşuyordu, yani kimse fark etmemişti.
 *
 * FlatCompat KULLANILMIYOR: Next'in kendi codemod'u eski sürümler için
 * `@eslint/eslintrc` üzerinden `compat.extends(...)` üretiyor ama
 * eslint-config-next@16 doğrudan düz (flat) yapılandırma dizisi yayımlıyor
 * (`dist/*.d.ts`: `Linter.Config[]`). Compat yoluyla denendi ve
 * "Converting circular structure to JSON" ile patlıyor.
 *
 * `core-web-vitals` temel yapılandırmayı zaten içine alıyor (dist içinde `./index`i
 * yayıyor), o yüzden ayrıca eklenmedi.
 */
export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Mobil kendi yapılandırmasıyla, kendi CI adımında lint'leniyor.
      "mobile/**",
      // Üretilmiş dosyalar.
      "drizzle/**",
      "public/**",
      // reports/ gitignore'da (.gitignore:81): rapor ve tek seferlik betikler.
      // ESLint gitignore'a bakmıyor, elle yazılması gerekiyor.
      "reports/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    /**
     * `files` ZORUNLU, süs değil. eslint-config-next eklentilerini (react,
     * react-hooks, @next/next, @typescript-eslint) tam bu kapsamla kaydediyor.
     * Bu blok kapsamsız bırakılırsa ESLint onu o kapsamın DIŞINDAKİ dosyalara da
     * uygulamaya çalışıyor ve orada eklenti bulunmadığı için "could not find
     * plugin react-hooks" diyerek ÇIKIŞ 2 veriyor — uyarı değil, hiç koşmuyor.
     * Kurulduğu gün geçmesi eslint-config-next'in o günkü sürümünün kapsamsız
     * kaydetmesindendi; `^16.3.0` kayınca kırıldı.
     */
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    /**
     * CIRCIRLI TABAN — mobildeki `--max-warnings` ve `i18n-scan --check`
     * mantığının aynısı: yapılandırma bugün kuruldu, altındaki kod yıllardır
     * lint görmedi. Aşağıdaki kuralları ilk gün "hata" saymak CI'ı ilk koşuda
     * kırardı; hepsini birden düzeltmek de bu işin konusu değil.
     *
     * Onun yerine: ihlali BULUNAN kurallar uyarıya indirildi ve toplam sayı
     * `npm run lint`teki `--max-warnings` ile bugünkü hâline sabitlendi. Yeni
     * bir ihlal toplamı aşırır ve CI kırılır; listede olmayan HER kural hata
     * olarak kalır, yani yeni bir sorun sınıfı ilk günden durdurulur.
     *
     * Bir kuralın sayısı sıfıra inince SATIRINI SİL — kural kendiliğinden
     * yeniden "hata" olur ve bir daha geri gelemez. Sayı yalnız aşağı iner.
     *
     * YENİDEN ÖLÇÜM 2026-09-05: taban 218 → 221. Bu bir gevşetme değil, bir
     * düzeltme. Arada yapılandırma sessizce kırıldı (aşağıdaki `files` notu) ve
     * ESLint çıkış 2 verip HİÇ KOŞMADI, yani o aralıkta inen commit'ler hiç
     * denetlenmedi. 221 bugünkü gerçek sayı; kural kural sayılar da yenilendi.
     * Kırılma bir daha sessiz olmayacak: artık ESLint gerçekten koşuyor.
     *
     * Ölçüm `npx eslint . -f json`:
     */
    rules: {
      // React Compiler döneminin yeni kuralları (eslint-plugin-react-hooks v7).
      // Bugüne kadar hiçbir yerde açık değildi; en büyük ve en ayrı iş bu.
      "react-hooks/set-state-in-effect": "warn", // 52
      "react-hooks/error-boundaries": "warn", // 37
      "react-hooks/purity": "warn", // 36
      "react-hooks/refs": "warn", // 26
      "react-hooks/static-components": "warn", // 7
      "react-hooks/immutability": "warn", // 4
      "react-hooks/preserve-manual-memoization": "warn", // 1
      // Eski kurallar, küçük artıklar — bunlar önce bitecek olanlar.
      "react/no-unescaped-entities": "warn", // 13
      "@typescript-eslint/no-require-imports": "warn", // 2
      "@typescript-eslint/no-explicit-any": "warn", // 4
      "@next/next/no-assign-module-variable": "warn", // 1
    },
  },
  {
    /**
     * `.cjs` TANIMI GEREĞİ CommonJS: orada `require()` doğru yazımdır, ihlal
     * değil. Kural next'in kapsamsız yapılandırmasından hata olarak geliyordu ve
     * scripts/lib/vocab-gate.cjs'yi iki kez patlatıyordu. Eşiği yükseltmek
     * yanlış cevap olurdu — kural o dosya türü için yanlış, sayı değil.
     */
    files: ["**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
];
