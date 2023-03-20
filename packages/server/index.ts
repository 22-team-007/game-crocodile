import fs from 'fs'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

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
      let render: () => Promise<string>

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

      const initialState = { theme: 'dark-theme' }

      const stateMarkup = `<script>window.__INITIAL_STATE__=${JSON.stringify(
        initialState
      )}</script>`

      const appHtml = await render()

      const html = template.replace(`<!--ssr-outlet-->`, stateMarkup + appHtml)

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
