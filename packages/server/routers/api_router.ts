import { Router } from 'express'
import ForumRouter from './forum_router'
import ThemeRouter from './theme_router'

const ApiRouter = Router()

ApiRouter.use('/forum', ForumRouter)
ApiRouter.use('/theme', ThemeRouter)

export default ApiRouter
