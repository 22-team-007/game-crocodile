import ApiBase from './api_base'

type ssrAPIType = {
  user: (Cookie?: string | undefined) => Promise<UserType>
}

export default class SsrAPI extends ApiBase implements ssrAPIType {
  protected host = 'https://ya-praktikum.tech'

  public async user(Cookie?: string | undefined): Promise<UserType> {
    const r: Response = await this.GET('/api/v2/auth/user', {
      headers: { Cookie } as HeadersInit,
    })
    return await r.json()
  }
}
