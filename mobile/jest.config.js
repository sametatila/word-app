module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  // Bu paketler ESM yayımlıyor; Jest'in varsayılanı node_modules'ü hiç
  // dönüştürmediği için "Unexpected token 'export'" ile patlıyorlardı.
  transformIgnorePatterns: [
    'node_modules/(?!(?:jest-)?@?react-native|@react-navigation|@notifee|react-native-.*|@?react-native-.*)',
  ],
};
