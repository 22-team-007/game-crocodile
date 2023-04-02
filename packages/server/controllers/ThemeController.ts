import type { Response, Request } from 'express'

class ThemeController {
  //GET /theme - получение списка тем
  public static async getThemeList(_: Request, res: Response) {
    const themeList = [
      {
        name: 'Светлая тема',
        themeClass: 'white-theme',
        desc: 'подходит для дневного использования',
        ariaLabel: 'переключить на светлую световую тему',
      },
      {
        name: 'Тёмная тема',
        themeClass: 'dark-theme',
        desc: 'используйте в тёмное время суток',
        ariaLabel: 'переключить на темную световую тему',
      },
    ]
    res.status(200).json(themeList)
  }

  public static getDefaultTheme() {
    return 'white-theme'
  }
}

export default ThemeController
