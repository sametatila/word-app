/**
 * Mobil ESLint yapılandırması: ESLint 9, flat config.
 *
 * Temel, RN'in kendi flat yapılandırması (`@react-native/eslint-config/flat`).
 * ESLint 8 + .eslintrc.js'ten geçildi: ESLint 8'in desteği bitmişti ve CI her
 * `npm ci`de onun ve bağımlılıklarının (@humanwhocodes/*, rimraf 3) "deprecated"
 * uyarılarını basıyordu. Kural seti değişmedi; geçişte temsilî dosyaların etkin
 * kuralları ESLint 8 ile `--print-config` üzerinden karşılaştırıldı.
 */
const reactNativeConfig = require('@react-native/eslint-config/flat');
const jestPlugin = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = [
  ...reactNativeConfig,
  {
    rules: {
      /*
        ÜÇ KURAL KAPALI — hepsi bu kod tabanının bilinçli kuralıyla çatıştığı için,
        "düzeltmesi zor" olduğu için değil. Her biri tek tek gerekçelendirildi;
        kapatılmayan hiçbir kural yok sayılmıyor (denetim `npm run lint`te sıfır
        uyarıyla geçiyor, yeni bir ihlal hemen görünüyor).

        1) react-native/no-inline-styles (1159 uyarı)
           Renkler TEMADAN geliyor ve tema çalışma zamanında değişiyor
           (`useTheme().colors`). StyleSheet nesnesi modül yüklenirken bir kez
           donuyor, yani tema renkli her stil ya inline olmak ya da her tema için
           yeniden üretilmek zorunda. Uygulama baştan sona birinci yolu seçmiş;
           kural ikinciyi dayatıyor ve karşılığında hiçbir şey vermiyor. (RN'de
           inline stilin performans maliyeti de artık yok: nesne her çizimde
           yeniden kurulsa bile köprüye giden sadece değişen alanlar.)

        2) no-void (128 uyarı)
           `void bumpUsage(...)` bu kod tabanının "bilerek beklemiyorum" işareti.
           Alternatif, sözü sessizce ortada bırakmak — okuyan kişi unutulmuş mu
           kasıtlı mı ayırt edemez. İşaretin kendisini yasaklamak, işareti
           silmekten başka bir şey yapmıyor.

        3) no-bitwise (9 uyarı)
           Dokuzunun hepsi iki karma (hash) işlevinde: `immersionQuiz` tur sırasını
           tohumdan üretiyor, `PersonAvatar` isimden renk seçiyor. Bit işlemleri
           orada aritmetiğin kendisi; kaçınmak yavaş ve okunmaz bir karma demek.
      */
      'react-native/no-inline-styles': 'off',
      'no-void': 'off',
      'no-bitwise': 'off',
    },
  },
  {
    // Test dosyaları ve Jest kurulumu: jest/expect/global burada tanımlı.
    files: ['__tests__/**/*.{js,jsx,ts,tsx}', 'jest.setup.js', 'jest.config.js'],
    languageOptions: {
      globals: {...jestPlugin.environments.globals.globals, ...globals.node},
    },
  },
];
