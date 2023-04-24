import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from './utils/logger'
import cookieParser from 'cookie-parser'
import parse, { splitCookiesString } from 'set-cookie-parser'
import session from 'express-session'
import createMemoryStore from 'memorystore'
import type { IncomingMessage } from 'http'

import api from './api'
import utils  from './utils'
import { dbConnect } from './db'
import ApiRouter from './routers/api_router'
import words from './words'


const isDev = process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client/index.html'))
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')

  app.use(
    cors({
      credentials: true,
      origin: '*',
    })
  )

  await dbConnect()

  const { PRAKTIKUM_HOST, SERVER_HOST } = process.env
  const MemoryStore = createMemoryStore(session)


  app.use(
    '/ws',
    createProxyMiddleware({
      target: `https://${PRAKTIKUM_HOST}`,
      secure: false,
      ws: true,
      onError: e => console.log(e),
    })
  )

  app.use(
    session({
      secret: 'crocodile secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 86400000, // 24h
      },
      store: new MemoryStore({
      checkPeriod: 86400000 
    }),
    })
  )
  
  app.use(cookieParser())
  app.use(
    '/api/v2',
    createProxyMiddleware({
      target: `https://${PRAKTIKUM_HOST}`,
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: {
        '*': '',
      },
      onProxyRes: async (proxyRes: IncomingMessage, req) => {
        if (
          req.originalUrl === '/api/v2/auth/logout' &&
          proxyRes.statusCode === 200
        ) {
          // user succesfully logout, destroy session
          req.session.destroy(() => {
            return
          })
        } else if (
          req.originalUrl === '/api/v2/auth/signin' &&
          proxyRes.statusCode === 200
        ) {
          // user succesfully signin, put user info in session
          const cookies = splitCookiesString(proxyRes.headers['set-cookie'])
          const parsCookies = parse(cookies, { map: true })
          if (parsCookies) {
            await utils.initSesion(req, parsCookies)
          }
        }
      },
      onError: e => console.log(e),
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(
    '/api',
    (req, res, next) => {
      if (!req.session.userData?.user) {
        res.end('please register to use api')
        return
      }
      next()
    },
    ApiRouter
  )

  app.get('/words', (_, res) => {
    res.send(words[Math.floor(Math.random() * words.length)])
  })

  app.get('/oauth', async (req, res) => {
    const code = req.originalUrl.split('code=')[1]

    if (code) {
      const redirect_uri = `http://${SERVER_HOST}:3000/oauth`

      let cookies = req.cookies.uuid

      const retCookie = await api.oauth.oAuthSignIn(code, redirect_uri, cookies)

      if (retCookie !== null) {
        cookies = splitCookiesString(retCookie)

        const parsCookies = parse(cookies, { map: true })
        if (parsCookies) {
          await utils.initSesion(req, parsCookies)
          res.cookie(parsCookies.authCookie.name, parsCookies.authCookie.value)
          res.cookie(parsCookies.uuid.name, parsCookies.uuid.value)
          res.redirect('/game')
          return
        }
      }
      res.redirect('/signin')
    }
    return
  })

  let vite: ViteDevServer
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })
    if (!vite) throw new Error("Can't create ViteServer")
    app.use(vite.middlewares)
    app.use('/assets', express.static(path.resolve(srcPath, 'src/assets')))
  } else {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.get('/sw.js', async (_, res, next) => {
    try {
      let fileName: string
      if (isDev) {
        fileName = path.resolve(srcPath, `public/sw.js`)
      } else {
        fileName = path.resolve(distPath, `sw.js`)
      }
      res.sendFile(fileName)
    } catch (e) {
      logger.error(`error ${e}`);
      if (isDev) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.get('/:file.mp3', async (req, res, next) => {
    try {
      let fileName: string
      if (isDev) {
        fileName = path.resolve(srcPath, `public/${req.params.file}.mp3`)
      } else {
        fileName = path.resolve(distPath, `${req.params.file}.mp3`)
      }
      res.sendFile(fileName)
    } catch (e) {
      logger.error(`error ${e} - ${req.originalUrl} - method:${req.method}`);
      if (isDev) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    if (!utils.routeExist(url)) {
      res.status(404).end('page not found')
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      return
    }

    try {
      let template: string

      let render: (
        fetchReq: globalThis.Request,
        initialState: any
      ) => Promise<string>

      let checkSSRRoute: (path: string) => boolean

      if (isDev) {
        template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        )

        const ssrModule = await vite.ssrLoadModule(
          path.resolve(srcPath, 'src/ssr.tsx')
        )
        render = ssrModule.render
        checkSSRRoute = ssrModule.checkSSRRoute
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
        render = (await import(ssrClientPath)).render
        checkSSRRoute = (await import(ssrClientPath)).checkSSRRoute
      }

      const preloadedState = await utils.prepareInitState(req)

      if (checkSSRRoute(req.originalUrl)) {
        // convert express request into a Fetch request, for static handler
        const fetchReq = utils.createFetchRequest(req)
        const html = await render(fetchReq, preloadedState)

        template = template.replace('<!--ssr-outlet-->', html)
      }

      const stateMarkup = JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )
      template = template.replace('{/*ssr-init-state*/}', stateMarkup)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      logger.error(`error ${e} - ${req.originalUrl} - method:${req.method}`);
      if (isDev) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

// @ts-ignore для крректной работы SSR
global.WebSocket = <any>class extends EventTarget {
  public constructor() {
    super()
  }
  public get signal() {
    return this
  }
}

startServer()
