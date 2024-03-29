import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  // globals: {
  //   SERVER_HOST: process.env.SERVER_HOST,
  //   PRAKTIKUM_HOST: process.env.PRAKTIKUM_HOST,
  // },
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'babel-jest',
    '.+\\.(svg|png|jpg)$': 'babel-jest',
  },
  transform: {
    '\\.js$': ['babel-jest', { rootMode: 'upward' }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/rehype-raw/'],
}
