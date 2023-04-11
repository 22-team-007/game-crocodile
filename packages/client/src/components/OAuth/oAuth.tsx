import type { LoaderFunctionArgs } from 'react-router-dom'
import { redirect } from 'react-router-dom'
// @ts-ignore
import parse, { splitCookiesString } from 'set-cookie-parser'
import api from '../../api'

import { useAppDispatch } from '../../hooks/useAppSelector'
import { UserDataAction } from '../../store/actions/types'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUserId } from '../../store/selectors'
import { userTypes } from '../../store/actions/user'

const {
  SERVER_HOST,
  SERVER_PORT,
} = process.env

const dispatch: (arg0: UserDataAction) => any = useAppDispatch

const OAuthLoaderServer: ((arg: LoaderFunctionArgs) => any) | undefined
 = async ({ request }) => {
  const code = new URL(request.url).searchParams.get('code')

  if (code) {
    const redirect_uri = `http://${SERVER_HOST}:${SERVER_PORT}/oauth`

    const cookieOrNull = request.headers.get('cookie')
    let cookies = cookieOrNull !== null ? cookieOrNull : undefined

    let resp = await api.oauth.signIn(code, redirect_uri, cookies)

    // try log out and enter again
    if (resp.reason === 'User already in system') {
      await api.auth.logOut(cookies)
      resp = await api.oauth.signIn(code, redirect_uri, cookies)
    }

    if (resp.reason === 'ok') {
      cookies = splitCookiesString(resp.cookie)

      const parsCookies = parse(cookies, { map: true })
      if (parsCookies) {
        cookies = `authCookie=${parsCookies?.authCookie?.value}; uuid=${parsCookies?.uuid?.value};`
      }
      
      const user = await api.auth.user(cookies)

      if (user?.id) {
        return { user, parsCookies }
      }
    }
  }
  return redirect('/game')
}

const oAuthLoaderClient = async () => {
  const userId = useAppSelector(selectUserId) 
  if(userId) return redirect('/game')

  try {
    const dispatch = useAppDispatch() 
    const user = await api.auth.user()
    if (user?.id) {
      dispatch({
        type: userTypes.SET_USER_DATA,
        payload: user,
      })
    }
  } catch (err) {
    console.error(err)
  }
  return redirect('/game')
}

export { OAuthLoaderServer, oAuthLoaderClient }
