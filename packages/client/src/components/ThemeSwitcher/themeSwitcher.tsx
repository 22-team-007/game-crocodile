import { FC } from 'react'
import { Button } from 'react-bootstrap'
import Moon from '../moon'
import MoonFill from '../moon-fill'
import { useAppDispatch } from '../../hooks/useAppSelector'
import { UserThemeAction } from '../../store/actions/types'
import { setTheme } from '../../store/actions/theme'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectTheme } from '../../store/selectors'

const ThemeSwitcher = () => {

  let appTheme: string, dispatch: (arg0: UserThemeAction) => any

  if (typeof window !== 'undefined' && typeof window.test === 'undefined') {
    appTheme = useAppSelector(selectTheme) as string
    dispatch = useAppDispatch()
  } else {
    appTheme = ''
  }

  const toggleTheme = () => {
    if (appTheme === 'white-theme' || appTheme === '') {
      dispatch(setTheme('dark-theme'))
    } else {
      dispatch(setTheme('white-theme'))
    }
  }

  return (
    <Button onClick={toggleTheme} variant={'outline-info'} className="ms-3">
      { appTheme === 'dark-theme' ? <MoonFill /> : <Moon /> }
    </Button>
  )
}

export default ThemeSwitcher

