import fs from 'fs'
import dotenv from 'dotenv'
import cors from 'cors'
import words from './words'
dotenv.config()
const packagesPath = `${process.env.INIT_CWD}/packages`

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/assets/:page', (req, res) => {
  res.sendFile(`${packagesPath}/client/dist/assets/${req.params.page}`)
})
app.get('/', (_, res) => {
  res.sendFile(`${packagesPath}/client/dist/index.html`)
})
app.get('/game/:chatId', (_, res) => {
  res.sendFile(`${packagesPath}/client/dist/index.html`)
})
app.get('/get/word', (_, res) => {
  res.send(words[Math.floor(Math.random() * words.length)])
})
app.get('/:page', (req, res) => {
  if (fs.existsSync(`${packagesPath}/client/dist/${req.params.page}`))
    res.sendFile(`${packagesPath}/client/dist/${req.params.page}`)
  else res.sendFile(`${packagesPath}/client/dist/index.html`)
})
app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})

import { dbConnect, ForumRecord } from './db_connect'
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
})
