import fs from 'fs'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
// @ts-ignore (can't import types)
import { NodeCookiesWrapper, CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies'
import { getStoredState } from 'redux-persist'

import { dbConnect } from './db'
import ApiRouter from './routers/api_router'
import words from './words'
dotenv.config()

const isDev = process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client/index.html'))
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')

  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  let vite: ViteDevServer

  await dbConnect()
  app.use('/api', ApiRouter)

  app.get('/words', (_, res) => {
    res.send(words[Math.floor(Math.random() * words.length)])
  })

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
      if (isDev) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template: string
      let render: (url: string, initialState: any) => Promise<string>

      if (isDev) {
        template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        )
        render = (
          await vite.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))
        ).render
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
        render = (await import(ssrClientPath)).render
      }

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

        if (preloadedState._persist) {
          delete preloadedState._persist
        }

        // place to check or modify cookies
      } catch (e) {
        preloadedState = {
          theme: { name: 'white-theme' },
          userData: { user: null },
        }
      }

      res.removeHeader('Set-Cookie')

      const stateMarkup = `<script>window.__INITIAL_STATE__=${JSON.stringify(
        preloadedState
      ).replace(/</g, '\\u003c')} // xss protect
      )}</script>`

      const appHtml = await render(url, { persistConfig, preloadedState })

      template = template.replace('<!--ssr-init-state-->', stateMarkup)
      const html = template.replace('<!--ssr-outlet-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
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

startServer()
