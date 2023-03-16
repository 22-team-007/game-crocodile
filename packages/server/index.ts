import fs from 'fs'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

/*import { dbConnect, ForumRecord } from './db'
//Пример основных методов CRUD
dbConnect().then(() => {
  ForumRecord.create({
    parent_id: null,
    subject: 'text',
    description: 'text2',
    author_id: 123,
  }).then(m => {
    const id = m.dataValues.id
    ForumRecord.findOne({ where: { id } }).then(() => {
      ForumRecord.update(
        {
          subject: 'new subject',
        },
        {
          where: { id },
        }
      ).then(() => {
        ForumRecord.destroy({
          where: { id },
        })
      })
    })
  })
})*/
import words from './words'
dotenv.config()

const isDev = process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client/index.html'))
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

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
    console.log(`get request ${req.originalUrl}`);
    const url = req.originalUrl
    try {
      let template: string
      let render: (url:string) => Promise<string>
      
      if (isDev) {
        console.log('dev');
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        console.log(template);
        
        template = await vite.transformIndexHtml(
          url,
          template
          )
          render = (
            await vite.ssrLoadModule(path.resolve(srcPath, 'src/ssr.tsx'))
            ).render
          } else {
        console.log('build');
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
        render = (await import(ssrClientPath)).render
      }

      const initialState = {theme: 'dark-theme'}

      // const stateMarkup = `<script>window.__INITIAL_STATE__=${JSON.stringify(initialState)}</script>`
      const stateMarkup = ''

      const appHtml = await render(url)
      // console.log(`my appHTML is: ${appHtml}`);
      
      
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
