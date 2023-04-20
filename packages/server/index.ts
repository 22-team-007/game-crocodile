import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { createFetchRequest, preparePersist, routeExist } from './utils'
import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from './utils/logger'

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

  const { PRAKTIKUM_HOST } = process.env


  app.use(
    '/api/v2',
    createProxyMiddleware({
      target: `https://${PRAKTIKUM_HOST}`,
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: {
        '*': '',
      },
      onError: e => console.log(e),
    })
  )

  app.use(
    '/ws',
    createProxyMiddleware({
      target: `https://${PRAKTIKUM_HOST}`,
      secure: false,
      ws: true,
      cookieDomainRewrite: {
        '*': '',
      },
      onError: e => console.log(e),
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api', ApiRouter)
  app.get('/words', (_, res) => {
    res.send(words[Math.floor(Math.random() * words.length)])
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

    if (!routeExist(url)) {
      res.status(404).end('page not found')
      logger.error(`error  - ${req.originalUrl} - method:${req.method}`);
      return
    }

    try {
      let template: string
      let render: (
        fetchReq: globalThis.Request,
        initialState: any
      ) => Promise<
        [
          appHtml: string,
          cookie: {
            authCookie: Record<string, string>
            uuid: Record<string, string>
          }
        ]
      >
      let checkSSRRoute: (path: string) => boolean

      if (isDev) {
        template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        )
        render = (
          await vite.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))
        ).render
        checkSSRRoute = (
          await vite.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))
        ).checkSSRRoute
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
        render = (await import(ssrClientPath)).render
        checkSSRRoute = (await import(ssrClientPath)).checkSSRRoute
      }

      const preloadedState = await preparePersist(req, res)
      const stateMarkup = JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )
      template = template.replace('{/*ssr-init-state*/}', stateMarkup)

      if (checkSSRRoute(req.originalUrl)) {
        // convert express request into a Fetch request, for static handler
        const fetchReq = createFetchRequest(req)
        const [html, cookie] = await render(fetchReq, preloadedState)

        template = template.replace('<!--ssr-outlet-->', html)

        if (url.split('?')[0] === '/oauth' && cookie) {
          res.cookie(cookie.authCookie.name, cookie.authCookie.value)
          res.cookie(cookie.uuid.name, cookie.uuid.value)
        }
      }

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
