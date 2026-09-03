module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      // Test dosyaları ve Jest kurulumu: jest/expect/global burada tanımlı.
      files: ['__tests__/**/*.{js,jsx,ts,tsx}', 'jest.setup.js', 'jest.config.js'],
      env: {jest: true, node: true},
    },
  ],
};
