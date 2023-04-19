import ApiBase from './api_base'

type ssrAPIType = {
  oAuthSignIn: (code: string, redirect_uri: string) => Promise<string>
}

export default class SsrAPI extends ApiBase implements ssrAPIType {
  public async oAuthSignIn(
    code: string,
    redirect_uri: string,
    Cookie?: string | undefined
  ) {
    const r = await this.POST('/api/v2/oauth/yandex', {
      body: JSON.stringify({ code, redirect_uri }),
      headers: { Cookie } as HeadersInit,
    })

    if (r.ok) {
      const cookie = r.headers.get('set-cookie')

      return { reason: 'ok', cookie }
    }

    return await r.json()
  }
}
