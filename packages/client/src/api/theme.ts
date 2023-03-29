import ApiBase from './api_base'

type ThemeAPIType = {
  getThemes: () => Promise<ThemeType[]>
}
export default class Themes extends ApiBase implements ThemeAPIType {
  protected host = 'http://localhost:3001'
  public async getThemes(): Promise<any> {
    const r = await this.GET('/api/theme')
    return await r.json()
  }
}
