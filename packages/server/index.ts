import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import { createFetchRequest, preparePersist } from './utils'

// @ts-ignore (can't import types)
import { NodeCookiesWrapper, CookieStorage } from 'redux-persist-cookie-storage'

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

  app.use(cors())
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
      let render: (
        path: string,
        fetchReq: globalThis.Request,
        initialState: any
      ) => Promise<string>

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

      const { persistConfig, preloadedState } = await preparePersist(req, res)
      // convert express request into a Fetch request, for static handler
      const fetchReq = createFetchRequest(req)
      const appHtml = await render(req.originalUrl, fetchReq, {
        persistConfig,
        preloadedState,
      })

      const stateMarkup = `<script>window.__INITIAL_STATE__=${JSON.stringify(
        preloadedState
      ).replace(/</g, '\\u003c')}
      </script>`

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

  app.listen(port, '127.0.0.1', () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
