/**
 * Test ortamı — App bütün ekranları içeri aldığı için proje ne kadar native
 * modül kullanıyorsa hepsi yükleniyor. Jest'te native taraf yok: her biri
 * burada, arayüzünü koruyan sade bir taklitle karşılanıyor.
 *
 * Yeni bir native paket eklenirse taklidi de buraya eklenmeli; yoksa App'i
 * render eden duman testi "NativeEventEmitter requires a non-null argument"
 * ya da benzeri bir hatayla düşer.
 */

// Paketin hazır taklidi `export default` ile yayımlanıyor; jest.mock modül
// nesnesinin kendisini beklediği için .default açılmalı (yoksa SafeAreaProvider
// undefined gelir ve App "Element type is invalid" ile düşer).
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);
jest.mock('@notifee/react-native', () => require('@notifee/react-native/jest-mock'));

jest.mock('react-native-purchases', () => ({
  __esModule: true,
  default: {
    configure: jest.fn(),
    logIn: jest.fn(async () => ({})),
    logOut: jest.fn(async () => ({})),
    getCustomerInfo: jest.fn(async () => ({entitlements: {active: {}}})),
    getOfferings: jest.fn(async () => ({current: null})),
    purchasePackage: jest.fn(async () => ({})),
    restorePurchases: jest.fn(async () => ({entitlements: {active: {}}})),
    addCustomerInfoUpdateListener: jest.fn(),
    removeCustomerInfoUpdateListener: jest.fn(),
    setLogLevel: jest.fn(),
  },
  LOG_LEVEL: {ERROR: 'ERROR', WARN: 'WARN', INFO: 'INFO', DEBUG: 'DEBUG', VERBOSE: 'VERBOSE'},
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(async () => true),
    signIn: jest.fn(async () => ({})),
    signOut: jest.fn(async () => {}),
  },
  statusCodes: {SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED', IN_PROGRESS: 'IN_PROGRESS'},
}));

// Apple girişi: gerçek paket yerel modülü bulamayınca isSupported false döner,
// yani testte de düğme çizilmez. Taklidi yine de duruyor çünkü paketin iOS
// dosyası `prop-types` ve `requireNativeComponent` çekiyor — Jest'te ikisi de
// gereksiz yük.
jest.mock('@invertase/react-native-apple-authentication', () => ({
  __esModule: true,
  default: {
    isSupported: false,
    performRequest: jest.fn(async () => ({})),
    Error: {UNKNOWN: '1000', CANCELED: '1001'},
    Operation: {IMPLICIT: 0, LOGIN: 1, REFRESH: 2, LOGOUT: 3},
    Scope: {EMAIL: 0, FULL_NAME: 1},
  },
}));

jest.mock('react-native-tts', () => ({
  __esModule: true,
  default: {
    getInitStatus: jest.fn(async () => 'success'),
    setDefaultLanguage: jest.fn(async () => {}),
    setDefaultRate: jest.fn(async () => {}),
    setDefaultPitch: jest.fn(async () => {}),
    speak: jest.fn(),
    stop: jest.fn(async () => {}),
    voices: jest.fn(async () => []),
    addEventListener: jest.fn(() => ({remove: jest.fn()})),
    removeAllListeners: jest.fn(),
  },
}));

jest.mock('react-native-sound', () => {
  function Sound(_file, _base, cb) {
    if (cb) { cb(null); }
  }
  Sound.prototype.play = jest.fn();
  Sound.prototype.stop = jest.fn();
  Sound.prototype.release = jest.fn();
  Sound.prototype.setVolume = jest.fn();
  Sound.setCategory = jest.fn();
  Sound.MAIN_BUNDLE = '';
  return {__esModule: true, default: Sound};
});

jest.mock('react-native-haptic-feedback', () => ({
  __esModule: true,
  default: {trigger: jest.fn()},
}));

jest.mock('react-native-webview', () => {
  const {View} = require('react-native');
  return {WebView: View, default: View};
});

jest.mock('react-native-confetti-cannon', () => {
  const {View} = require('react-native');
  return {__esModule: true, default: View};
});

// Ağ yok: her istek "oturum yok" ile dönsün. Böylece testler deterministik
// kalır (canlı API'ye çıkmaz) ve uygulama gerçek giriş/onboarding akışını çizer.
global.fetch = jest.fn(async () => ({
  ok: false,
  status: 401,
  headers: {get: () => null},
  text: async () => '',
  json: async () => null,
}));
