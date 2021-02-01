module.exports = {
  roots: ['<rootDir>/test/lambda'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
      '**/*.{ts,tsx}',
      '!**/node_modules/**',
      '!**/tests/**',
  ],
  coverageReporters: ['text'],
};
