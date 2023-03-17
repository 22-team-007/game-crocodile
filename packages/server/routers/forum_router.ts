import { Router } from 'express'

import { ForumController } from '../controllers'

const ForumRouter = Router()

ForumRouter
    .route('/')
    .get(ForumController.getThemeList)
ForumRouter
    .route('/:id')
    .get(ForumController.getTheme)
    .post(ForumController.postTheme)
ForumRouter
    .route('/:id/comment')
    .get(ForumController.getComments)
    .post(ForumController.postComment)

export default ForumRouter