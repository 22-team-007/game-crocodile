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

export async function initSesion(req: Request, cookies: parse.CookieMap) {
  req.session.userData = { user: null }
  req.session.theme = { name: ThemeController.defaultTheme }

  // have user's cookie to auth?
  if (cookies) {
    try {
      const apiCookie = `uuid=${cookies.uuid.value}; authCookie=${cookies.authCookie.value}`
      const user = await api.user.getMe(apiCookie)
      // return user data?
      if (user !== null) {
        req.session.userData.user = user
      }
    } catch {
      // ignore loading data
    }
  }
  req.session.save()
}

export async function prepareInitState(req: Request) {
  // if session don't contain user data
  if (!req.session.userData?.user) {
    req.session.userData = { user: null }
  }

  if (!req.session.theme?.name) {
    req.session.theme = {
      name: ThemeController.defaultTheme,
    }
  }

  req.session.theme.defTheme = ThemeController.defaultTheme

  return { userData: req.session.userData, theme: req.session.theme }
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
  /^\/signin$/,
  /^\/signup$/,
  /^\/signout$/,
  /^\/game$/,
  /^\/game\/\d+$/,
  /^\/profile$/,
  /^\/leaders$/,
  /^\/forum$/,
  /^\/forum\/\d+$/,
]

