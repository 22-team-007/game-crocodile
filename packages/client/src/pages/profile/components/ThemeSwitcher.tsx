import React, { useState, useEffect } from 'react'
import { FC } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import type { UserThemeAction } from '../../../store/actions/types'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectTheme } from '../../../store/selectors'
import { useAppDispatch } from '../../../hooks/useAppSelector'
import { setTheme } from '../../../store/actions/theme'
import api from '../../../api'
import './style.scss'

const ThemeSwitcher: FC = () => {
  const [appTheme, setAppTheme] = useState(useAppSelector(selectTheme))
  const [loaded, setLoaded] = useState(false)
  const [listThemes, setListThemes] = useState<ThemeType[]>([])

  let dispatch: (arg0: UserThemeAction) => any

  if (typeof window !== 'undefined' && typeof window.test === 'undefined') {
    dispatch = useAppDispatch()
  }

  useEffect(() => {
    api.themes
      .getThemes()
      .then(setListThemes)
      .finally(() => setLoaded(true))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const themeName = e.target.value
    if (themeName) {
      setAppTheme(themeName)
      dispatch(setTheme(themeName))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Row className="mt-3">
      <Col style={{ fontSize: '14pt', textAlign: 'right', fontWeight: 'bold' }}>
        Тема:
      </Col>
      <Col style={{ fontSize: '14pt', textAlign: 'left' }}>
        {loaded === true ? (
          Array.isArray(listThemes) && listThemes.length > 1 ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                {listThemes.map(theme => (
                  <Form.Check
                    id={theme.themeClass}
                    type="radio"
                    value={theme.themeClass}
                    label={`${theme.name} - ${theme.desc}`}
                    aria-label={theme.ariaLabel}
                    onChange={handleChange}
                    checked={appTheme === theme.themeClass}
                    className="mb-3"
                  />
                ))}
              </Form.Group>
            </Form>
          ) : (
            <div>нет доступных тем</div>
          )
        ) : (
          <div>секунду, темы загружаются</div>
        )}
      </Col>
    </Row>
  )
}

export default ThemeSwitcher
