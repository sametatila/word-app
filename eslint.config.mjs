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
const config = [
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
     * REACT COMPILER KURALLARI — KAPALI, ve bu bir karar (2026-09-09).
     *
     * `eslint-plugin-react-hooks` v7 bir kural ailesi getirdi: `purity`, `refs`,
     * `set-state-in-effect`, `immutability`, `static-components`,
     * `error-boundaries`, `preserve-manual-memoization`. Bunlar HATA aramıyor;
     * React Compiler'ın bir bileşeni optimize EDEBİLMESİ için gereken
     * kısıtlamaları anlatıyor.
     *
     * BU PROJEDE REACT COMPILER AÇIK DEĞİL. `next.config.ts`te `reactCompiler`
     * yok, bağımlılıklarda `babel-plugin-react-compiler` yok. Yani bu 155 uyarı,
     * koşmayan bir derleyicinin hazırlık listesi. Uygulama onlarla bugün de
     * doğru çalışıyor.
     *
     * NEDEN KAPATILDI, NEDEN DÜZELTİLMEDİ. İkisi de denendi ve ölçüldü:
     *
     *  - Düzeltmenin maliyeti gerçek. Uyarıların 155'i ~50 dosyada ve çoğu oyun
     *    döngüsünün göbeğinde (session-player, walk-player, exam-player). Bunlar
     *    çalışan, yayında olan ekranlar; koşmayan bir derleyici için yeniden
     *    yazmak, kazancı olmayan bir gerileme riski.
     *  - "Mekanik" görünen dönüşüm mekanik değil. 21 `useRef(Date.now())`
     *    çağrısını ortak bir hook'a taşımak denendi: uyarı 167'den 215'e ÇIKTI,
     *    çünkü derleyici doğrudan çağrılan `useRef`i ref sayıyor, hook'tan
     *    döneni saymıyor.
     *  - `error-boundaries`in tamamı (21) SUNUCU bileşeninde ve orada yanlış
     *    alarm: kural istemci hata sınırlarını anlatıyor, sunucuda ise render'ı
     *    try/catch'e almak (veritabanı hatasında yedek ekran çizmek) doğru
     *    desendir. Altı dosyanın altısı da sunucu bileşeni, tek tek bakıldı.
     *
     * GERİ AÇMA KOŞULU: React Compiler açıldığı gün bu blok geri gelir ve
     * migrasyon ayrı bir iş olarak yapılır. O gün gelene kadar bu kurallar
     * gürültü, çünkü uyardıkları şeyin bir karşılığı yok.
     *
     * KAPATILMAYANLAR: `exhaustive-deps` ve `rules-of-hooks` açık ve HATA
     * seviyesinde (eslint-config-next'ten geliyor). Onlar derleyiciden bağımsız,
     * gerçek hata sınıfı: bayat closure ve koşullu hook. `exhaustive-deps`in on
     * iki ihlali bu turda düzeltildi, sıfırda.
     *
     * CIRCIR ARTIK 0. `npm run lint --max-warnings 0`: bundan sonra her uyarı
     * CI'ı kırar. Taban diye bir şey kalmadı; sayı yalnız aşağı inebilirdi,
     * indi.
     */
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/error-boundaries": "off",
      "react-hooks/static-components": "off",
      "react-hooks/immutability": "off",
      "react-hooks/preserve-manual-memoization": "off",
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

/**
 * Adlandırılmış dışa aktarım — `export default [...]` doğrudan dizi veriyordu ve
 * `import/no-anonymous-default-export` bunu haklı olarak uyarıyordu: yığın izinde
 * ve hata mesajlarında anonim bir dizi görünüyor, hangi dosyadan geldiği
 * anlaşılmıyor.
 */
export default config;
