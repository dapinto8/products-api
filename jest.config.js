module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['.'],
  bail: 1,
  verbose: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@services/(.*)': '<rootDir>/src/services/$1'
  }
}
