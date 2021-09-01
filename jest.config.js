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
  collectCoverageFrom: [
    "src/**/*{js,ts,tsx}",
    "!src/types/**",
    "!src/index.tsx"
  ],
  setupFiles: [
    "<rootDir>config.ts"
  ],
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  globals: {
    "ts-jest": {
      "compiler": "ttypescript"
    }
  }
};
