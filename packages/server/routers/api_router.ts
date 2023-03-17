import { Router } from 'express'
import ForumRouter from './forum_router'

const ApiRouter = Router()

ApiRouter.use('/forum', ForumRouter)

export default ApiRouter