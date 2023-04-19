import dotenv from 'dotenv'
dotenv.config()

const API_SERVER_PORT = process.env.API_SERVER_PORT || 3000
const API_SERVER_HOST = process.env.API_SERVER_HOST || 'localhost'
const PRAKTIKUM_HOST = process.env.PRAKTIKUM_HOST || 'ya-praktikum.tech'

export const envConstants = {
  API_SERVER_PORT: JSON.stringify(API_SERVER_PORT),
  API_SERVER_HOST: JSON.stringify(API_SERVER_HOST),
  PRAKTIKUM_HOST: JSON.stringify(PRAKTIKUM_HOST),
}
