import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    API_SERVER_PORT: process.env.API_SERVER_PORT,
    API_SERVER_HOST: process.env.API_SERVER_HOST,
    PRAKTIKUM_HOST: process.env.PRAKTIKUM_HOST,
  },
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'babel-jest',
    '.+\\.(svg|png|jpg)$': 'babel-jest',
  },
  transform: {
    '\\.js$': ['babel-jest', { rootMode: 'upward' }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/rehype-raw/'],
}
