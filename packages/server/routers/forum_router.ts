import { Router } from 'express'

import { ForumController } from '../controllers'

const ForumRouter = Router()

ForumRouter.route('/')
  .get(ForumController.getThemes)
  .put(ForumController.putTheme)

ForumRouter.route('/comment/emoji')
  .post(ForumController.postEmoji)
  .delete(ForumController.deleteEmoji)

ForumRouter.route('/:id')
  .get(ForumController.getTheme)
  .post(ForumController.postTheme)
  .delete(ForumController.deleteTheme)

ForumRouter.route('/:id/comment')
  .get(ForumController.getComments)
  .put(ForumController.putComment)
  .post(ForumController.postComment)

export default ForumRouter
