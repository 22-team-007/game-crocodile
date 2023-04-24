const { PRAKTIKUM_HOST } = process.env

interface IOAuth {
  oAuthSignIn: (
    code: string,
    redirect_uri: string,
    Cookie: string
  ) => Promise<string | null>
}

class OAuth implements IOAuth {
  public async oAuthSignIn(code: string, redirect_uri: string, Cookie: string) {
    try {
      const resp = await fetch(
        `https://${PRAKTIKUM_HOST}/api/v2/oauth/yandex`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Cookie,
          },
          body: JSON.stringify({ code, redirect_uri }),
          mode: 'cors',
        }
      )

      if (resp.ok) {
        return resp.headers.get('set-cookie')
      }
      return null
    } catch {
      return null
    }
  }
}

export default new OAuth()
