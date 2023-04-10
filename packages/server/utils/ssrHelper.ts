// @ts-ignore (can't import types)
import { NodeCookiesWrapper, CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies'
import { getStoredState } from 'redux-persist'
import type { Request } from 'express'
import { ThemeController } from '../controllers'

export async function preparePersist(req: Request, res: any) {
  // @ts-ignore
  const cookieJar = new NodeCookiesWrapper(new Cookies(req, res))

  const persistConfig = {
    key: 'root',
    storage: new CookieStorage(cookieJar),
    whitelist: ['userData', 'theme'],
    // @ts-ignore
    stateReconciler(inboundState: any, originalState: any) {
      return originalState
    },
  }

  let preloadedState
  try {
    preloadedState = (await getStoredState(persistConfig)) as any
    if (typeof preloadedState === 'undefined') {
      throw new Error()
    }

    // check user theme in valid?
    try {
      const themeList = ThemeController.getListTheme()
      if (!themeList.includes(preloadedState.theme.name)) throw new Error()
    } catch (e) {
      preloadedState.theme.name = ThemeController.getDefaultTheme()
    }

    if (preloadedState._persist) {
      delete preloadedState._persist
    }
  } catch (e) {
    preloadedState = {
      theme: { name: ThemeController.getDefaultTheme() },
      userData: { user: null },
    }
  }

  return preloadedState
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
