/**
 * React Native CLI proje ayarı — şu an tek işi var: Apple girişi paketini
 * Android'in otomatik bağlanmasından (autolinking) ÇIKARMAK.
 *
 * `@invertase/react-native-apple-authentication` bir Android modülü de taşıyor
 * (WebView üzerinden Apple OAuth). Bize gerekmiyor: Apple ile Giriş yalnız iOS
 * yayın koşulu, Android'de Google + e-posta var. Dışarıda bırakılmazsa
 * autolinking o modülü Android derlemesine sokar — paketin android/build.gradle'ı
 * AGP 7 ve `com.facebook.react:react-native:+` ile kurulu, yani çalışan Android
 * derlemesini bozma ihtimali olan, ürüne hiç girmeyecek bir kod. iOS paritesi
 * Android'e dokunmadan yapılır (bkz. docs/plan/ios-parity.md §2.3).
 *
 * JS tarafı bundan etkilenmez: paket Android'de de içeri alınabilir, yerel modül
 * bulunmadığı için `appleAuth.isSupported` false döner (lib/appleAuth.ts zaten
 * ona bakıyor).
 */
module.exports = {
  dependencies: {
    "@invertase/react-native-apple-authentication": {
      platforms: { android: null },
    },
  },
};
