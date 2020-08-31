module.exports = {
  moduleNameMapper: {
    '@app/': '<rootDir>/src/',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules',
  ]
};