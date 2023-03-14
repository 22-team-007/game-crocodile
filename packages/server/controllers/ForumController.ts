/*
компонент создания и редактирования сделать общим, если атрибут id=0, то создание, иначе редактирование




POST /forum/:id/comment - добавление/редактирование сообщения
*/
import { dbConnect, ForumRecord } from '../db'
import type { Express } from 'express';
const ForumController = async (app: Express)=>{
  await dbConnect()
  
  //GET /forum/:id/info - получение полной информации о теме
  app.get('/forum/:id/info', async (req, res) => {
    console.log(12,req.cookies,34)
    try{
      const id = Number(req.params.id)
      const rec = await ForumRecord.findOne({ where: { id, parent_id: null } })
      if(rec!==null)
        res.status(200).set({ 'Content-Type': 'application/json' }).end(JSON.stringify(rec))
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
      const data = req.body
      let rec
      if(id===0)
        rec = await ForumRecord.create(data)
      else{
        rec = await ForumRecord.update(data, { where: { id } })
      }
      res.status(200).set({ 'Content-Type': 'application/json' }).end(JSON.stringify(rec))
    }
    catch(e){
      res.status(500).set({ 'Content-Type': 'text/plain' }).end(`Возникла ошибак при изменении темы ${(e as Error).message}`)
    }
  })

  //GET /forum/:id/comments - запрос массива комментариев.
  app.get('/forum/:id/comments', async (req, res) => {
    try{
      const parent_id = Number(req.params.id)
      const rec = await ForumRecord.findAll({ where: { parent_id } })
      if(rec!==null)
        res.status(200).set({ 'Content-Type': 'application/json' }).end(JSON.stringify(rec))
      else
        res.status(404).set({ 'Content-Type': 'text/plain' }).end("Запись не найдена")
    }
    catch(e){
      res.status(500).set({ 'Content-Type': 'text/plain' }).end(`Возникла ошибак при поиске темы ${(e as Error).message}`)
    }
  })
}
export default ForumController