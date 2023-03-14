import { dbConnect, ForumRecord } from '../db'
import type { Express } from 'express';
const ForumController = async (app: Express)=>{
  await dbConnect()

  //GET /forum/:id/info - получение полной информации о теме
  app.get('/forum/:id/info', async (req, res) => {
    try{
      const id = Number(req.params.id)
      if(id===0 || isNaN(id)){
        res.status(404).set({ 'Content-Type': 'text/plain' }).end(`Тема не найдена`)
        return
      }

      const rec = await ForumRecord.findOne({ where: { id, parent_id: null } })
      if(rec!==null)
        res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
      else
        res.status(404).set({ 'Content-Type': 'text/plain' }).end("Запись не найдена")
    }
    catch(e){
      res.status(500).set({ 'Content-Type': 'text/plain' }).end(`Возникла ошибак при поиске темы ${(e as Error).message}`)
    }
  })

  //POST /forum/:id - передача на сервер, если id=0 - создание, иначе редактирование
  app.post('/forum/:id', async (req, res)=>{
    try {
      const id = Number(req.params.id)
      if(isNaN(id)){
        res.status(404).set({ 'Content-Type': 'text/plain' }).end(`Тема не найдена`)
        return
      }

      const data = req.body
      const rec = (id===0 ? await ForumRecord.create(data) : await ForumRecord.update(data, { where: { id } }))

      res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
    }
    catch(e){
      res.status(500).set({ 'Content-Type': 'text/plain' }).end(`Возникла ошибак при изменении темы ${(e as Error).message}`)
    }
  })

  //GET /forum/:id/comments - запрос массива комментариев.
  app.get('/forum/:id/comments', async (req, res) => {
    try{
      const parent_id = Number(req.params.id)
      if(parent_id===0 || isNaN(parent_id)){
        res.status(404).set({ 'Content-Type': 'text/plain' }).end(`Тема не найдена`)
        return
      }

      const rec = await ForumRecord.findAll({ where: { parent_id } })

      if(rec!==null)
        res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
      else
        res.status(404).set({ 'Content-Type': 'text/plain' }).end("Запись не найдена")
    }
    catch(e){
      res.status(500).set({ 'Content-Type': 'text/plain' }).end(`Возникла ошибак при загрузке комментариев ${(e as Error).message}`)
    }
  })

  //POST /forum/:id/comment - добавление/редактирование сообщения
  app.post('/forum/:id/comment', async (req, res)=>{
    try {
      const perent_id = Number(req.params.id)
      if(perent_id===0 || isNaN(perent_id)){
        res.status(404).set({ 'Content-Type': 'text/plain' }).end(`Тема не найдена`)
        return
      }

      const data = Object.assign(req.body,{ perent_id })
      const id = Number(data.id)
      if(isNaN(id)){
        res.status(404).set({ 'Content-Type': 'text/plain' }).end(`Сообщение не найдено`)
        return
      }

      const rec = (id===0 ? await ForumRecord.create(data) : await ForumRecord.update(data, { where: { perent_id, id } }))

      res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
    }
    catch(e){
      res.status(500).set({ 'Content-Type': 'text/plain' }).end(`Возникла ошибак при изменении темы ${(e as Error).message}`)
    }
  })
}
export default ForumController