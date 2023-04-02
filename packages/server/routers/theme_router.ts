import { Router } from 'express'

import { ThemeController } from '../controllers'

const ThemeRouter = Router()

ThemeRouter.route('/').get(ThemeController.getThemeList)

export default ThemeRouter
