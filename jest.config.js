/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
};
