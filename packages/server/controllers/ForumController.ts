import { ForumRecord, sequelize } from '../db'
import type { Response, Request } from 'express'
// todo Никита отрефактори пожалуйста с этим невозможно работать
class ForumController {
  //GET /forum/list - получение списка тем
  public static async getThemeList (_: Request, res: Response) {
    try {
      const rec = await ForumRecord.findAll({ 
        attributes: [
          'id',
          'subject',
          [
            sequelize.literal(`(select count(*) from "ForumRecords" as "f2" where "f2"."parent_id"="ForumRecord"."id")`),
            'comments'
          ]
        ],
        where: { parent_id: null }
      })
      if (rec !== null)
        res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
      else
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end('Записи не найдены')
    } catch (e) {
      res
        .status(500)
        .set({ 'Content-Type': 'text/plain' })
        .end(`Возникла ошибак при поиске тем ${(e as Error).message}`)
    }
  }
  //GET /forum/:id/info - получение полной информации о теме
  public static async getTheme (req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (id === 0 || isNaN(id)) {
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end(`Тема не найдена`)
        return
      }

      const rec = await ForumRecord.findOne({ where: { id, parent_id: null } })
      if (rec !== null)
        res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
      else
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end('Запись не найдена')
    } catch (e) {
      res
        .status(500)
        .set({ 'Content-Type': 'text/plain' })
        .end(`Возникла ошибак при поиске темы ${(e as Error).message}`)
    }
  }

  //POST /forum/:id - передача на сервер, если id=0 - создание, иначе редактирование
  public static async postTheme (req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) {
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end(`Тема не найдена`)
        return
      }

      const data = req.body
      const rec =
        id === 0
          ? await ForumRecord.create(data)
          : await ForumRecord.update(data, { where: { id } })

      res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
    } catch (e) {
      res
        .status(500)
        .set({ 'Content-Type': 'text/plain' })
        .end(`Возникла ошибак при изменении темы ${(e as Error).message}`)
    }
  }

  //GET /forum/:id/comments - запрос массива комментариев.
  public static async getComments (req: Request, res: Response) {
    try {
      const parent_id = Number(req.params.id)
      if (parent_id === 0 || isNaN(parent_id)) {
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end(`Тема не найдена`)
        return
      }

      const rec = await ForumRecord.findAll({ where: { parent_id } })

      if (rec !== null)
        res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
      else
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end('Запись не найдена')
    } catch (e) {
      res
        .status(500)
        .set({ 'Content-Type': 'text/plain' })
        .end(
          `Возникла ошибак при загрузке комментариев ${(e as Error).message}`
        )
    }
  }

  //POST /forum/:id/comment - добавление/редактирование комментария
  public static async postComment (req: Request, res: Response) {
    try {
      const parent_id = Number(req.params.id)
      const data = req.body
      if (parent_id === 0 || isNaN(parent_id) || parent_id !== Number(data.parent_id)) {
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end(`Тема не найдена`)
        return
      }

      const id = Number(data.id)
      if (isNaN(id)) {
        res
          .status(404)
          .set({ 'Content-Type': 'text/plain' })
          .end(`Сообщение не найдено`)
        return
      }
      const isCreate = id === 0
      delete data.id
      const rec =
        isCreate
          ? await ForumRecord.create(data)
          : await ForumRecord.update(data, { where: { parent_id, id } })

      res.status(200).set({ 'Content-Type': 'application/json' }).json(rec)
    } catch (e) {
      res
        .status(500)
        .set({ 'Content-Type': 'text/plain' })
        .end(`Возникла ошибак при изменении комментария ${(e as Error).message}`)
    }
  }
}

export default ForumController
