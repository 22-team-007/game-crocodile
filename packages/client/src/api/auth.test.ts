import Auth from './auth'

const host = `http://${API_SERVER_HOST}:${API_SERVER_PORT}`

describe('Testing Auth API ', () => {
  const auth: Auth = new Auth()

  const fetchParam = {
    credentials: 'include',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
  }

  test('Get user info - call user()', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({}) })
    )

    await auth.user()

    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  test('Sign in system - call signIn()', async () => {
    const siginData = {
      login: 'supervasa',
      password: 'superpassword',
    }

    const fetchFirstCallParam = {
      ...fetchParam,
      method: 'POST',
      body: JSON.stringify(siginData),
    }

    const fetchSecondCallParam = {
      ...fetchParam,
      headers: { Cookie: undefined },
    }

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve({}),
      })
    )

    await auth.signIn(siginData)
    // @ts-ignore
    expect(global.fetch.mock.calls).toEqual([
      [`${host}/api/v2/auth/signin`, fetchFirstCallParam],
      [`${host}/api/v2/auth/user`, fetchSecondCallParam],
    ])
  })

  test('Sign up system - call signIn()', async () => {
    const sigUpData = {
      login: 'supervasa',
      password: 'superpassword',
      first_name: 'Vasa',
      second_name: 'Vasilev',
      email: 'mail@vasa.ru',
      phone: '1234567890',
    }

    const fetchCallParam = {
      ...fetchParam,
      body: JSON.stringify(sigUpData),
      method: 'POST',
    }

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve({}),
      })
    )

    auth.user = jest.fn()

    await auth.signUp(sigUpData)

    expect(auth.user).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledWith(
      `${host}/api/v2/auth/signup`,
      fetchCallParam
    )
  })

  test('Log out of system - call logOut()', async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({ text: () => Promise.resolve({}) })
    )

    auth.logOut()

    const postParams = {
      ...fetchParam,
      method: 'POST',
      headers: { Cookie: undefined },
    }

    fetchParam.method = 'POST'

    expect(global.fetch).toHaveBeenCalledWith(
      `${host}/api/v2/auth/logout`,
      postParams
    )
  })
})
