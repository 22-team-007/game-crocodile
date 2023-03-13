import ApiBase from './api_base'
type OauthAPIType = {
  signIn: (code: string, redirect_uri: string) => Promise<string>
  setvice: (redirect_uri: string) => Promise<string>
}
export default class Oauth extends ApiBase implements OauthAPIType {
  public async signIn(code: string, redirect_uri: string) {
    const r = await this.POST('/api/v2/oauth/yandex', {
      body: JSON.stringify({ code, redirect_uri }),
    })

    if (r.ok) { 
      return Promise.resolve({reason: 'ok'}) 
    }

    return  await r.json()
  }

  public async setvice(redirect_uri: string): Promise<string> {
    const r = await this.GET(
      `/api/v2/oauth/yandex/service-id?redirect_uri=${encodeURI(redirect_uri)}`
    )
    const obj: { service_id: string } = await r.json()
    return obj.service_id
  }
}
