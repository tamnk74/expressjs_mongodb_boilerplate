module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime'],
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'server/config', 'server/app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  // globalSetup: './tests/setup.js',
  // globalTeardown: './tests/teardown.js',
};
