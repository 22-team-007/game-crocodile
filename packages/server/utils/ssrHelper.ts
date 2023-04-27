import type { Request } from 'express'
import { ThemeController } from '../controllers'
import { UserType } from '../api/user'
import api from '../api'
import parse from 'set-cookie-parser'

declare module 'express-session' {
  interface SessionData {
    userData: {
      user: UserType | null
    }
    theme: { name: string; defTheme?: string }
  }
}

export async function initSesion(req: Request): Promise<boolean> {
  req.session.userData = { user: null }
  req.session.theme = { name: ThemeController.defaultTheme }

  // have user's cookie to auth?
  const cookies = req.cookies as parse.CookieMap
  if ('uuid' in cookies && 'authCookie' in cookies) {
    try {
      const apiCookie = `uuid=${cookies.uuid}; authCookie=${cookies.authCookie}`
      const user = await api.user.getMe(apiCookie)
      // return user data?
      if (user !== null) {
        req.session.userData.user = user
        return true
      }
    } catch {
      // ignore loading data
    }
  }
  return false
}

export async function prepareInitState(req: Request) {
  // if session don't contain user data
  if (!req.session.userData?.user) {
    await initSesion(req)
  }

  const theme = {
    name: req.session.theme!.name,
    defTheme: ThemeController.defaultTheme,
  }

  return { userData: req.session.userData, theme }
}

// convert the incoming Express request into a Fetch request
export function createFetchRequest(req: Request) {
  const origin = `${req.protocol}://${req.get('host')}`
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}

export const routes = [
  /^\/$/,
  /^\/signin\/?$/,
  /^\/signup\/?$/,
  /^\/signout\/?$/,
  /^\/game\/?$/,
  /^\/game\/\d+\/?$/,
  /^\/profile\/?$/,
  /^\/leaders\/?$/,
  /^\/forum\/?$/,
  /^\/forum\/\d+\/?$/,
]
