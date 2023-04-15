const API_SERVER_PORT = Number(process.env.API_SERVER_PORT) || 3000
const API_SERVER_HOST = String(process.env.API_SERVER_HOST) || 'localhost'
const PRAKTIKUM_HOST = String(process.env.PRAKTIKUM_HOST) || 'ya-praktikum.tech'

export const envConstants = {
  API_SERVER_PORT: JSON.stringify(API_SERVER_PORT),
  API_SERVER_HOST: JSON.stringify(API_SERVER_HOST),
  PRAKTIKUM_HOST: JSON.stringify(PRAKTIKUM_HOST),
}
