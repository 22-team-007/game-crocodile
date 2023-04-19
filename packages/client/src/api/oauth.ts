import ApiBase from './api_base'
type OauthAPIType = {
  setvice: (redirect_uri: string) => Promise<string>
}
export default class Oauth extends ApiBase implements OauthAPIType {
  public async setvice(redirect_uri: string): Promise<string> {
    const r = await this.GET(
      `/api/v2/oauth/yandex/service-id?redirect_uri=${encodeURI(redirect_uri)}`
    )
    const obj: { service_id: string } = await r.json()
    return obj.service_id
  }
}
