// import { useLocation } from 'react-router-dom'

import api from '../api'
import { useState } from 'react'

const useGetForumTheme = () => {

  // const { pathname } = useLocation()
  // const themeId = pathname.split('/').at(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const [themeContent, setThemeContent] = useState({
    id: 133,
    parent_id: null,
    subject: 'Игра Крокодил',
    description: `
# Игра "Крокодил"

Добро пожаловать в игру "Крокодил"! Это интересная и увлекательная игра, в которой участники должны объяснять слова, не используя их прямое название. Вместо этого они должны использовать жесты, мимику и описание, чтобы заставить других игроков угадать слово. Эта версия игры была написана на языке TypeScript с использованием библиотеки React.

## Как играть
Игра "Крокодил" предназначена для двух и более игроков. В начале игры один из игроков выбирает слово из предложенного списка и начинает его объяснять. Он не может использовать прямое название слова, но может использовать любые другие способы, чтобы его объяснить.

Остальные игроки пытаются угадать слово на основе подсказок, которые даются им объясняющим. Когда слово угадано, ход переходит к следующему игроку. Игра продолжается до тех пор, пока все игроки не будут объясняющими хотя бы один раз.
    `,
    author_id: 35558
  })

  if (loading) {
    api.users.get(themeContent.author_id).then(value => {
      setThemeContent(prevState => ({...prevState, ...value}))
      console.log(value)
      setLoading(false)
    })
  }

  return {
    themeContent,
    loading
  }
}

export default useGetForumTheme
