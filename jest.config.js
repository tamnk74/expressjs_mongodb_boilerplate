module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    REDIS_HOST: '127.0.0.1',
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFiles: ['<rootDir>/node_modules/regenerator-runtime/runtime'],
  restoreMocks: true,
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  coveragePathIgnorePatterns: ['node_modules', 'server/config', 'server/app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  // globalSetup: './tests/setup.js',
  // globalTeardown: './tests/teardown.js',
};
