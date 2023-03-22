import { Router } from 'express'

import { ForumController } from '../controllers'

const ForumRouter = Router()

ForumRouter
    .route('/')
    .get(ForumController.getThemes)
    .put(ForumController.putTheme)
ForumRouter
    .route('/:id')
    .get(ForumController.getTheme)
    .post(ForumController.postTheme)
ForumRouter
    .route('/:id/comment')
    .get(ForumController.getComments)
    .put(ForumController.putComment)
    .post(ForumController.postComment)

export default ForumRouter
