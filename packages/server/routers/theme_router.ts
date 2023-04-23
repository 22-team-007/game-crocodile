import { Router } from 'express'

import { ThemeController } from '../controllers'

const ThemeRouter = Router()

ThemeRouter.route('/').get(ThemeController.getThemeList)
ThemeRouter.route('/set').get(ThemeController.setTheme)

export default ThemeRouter
