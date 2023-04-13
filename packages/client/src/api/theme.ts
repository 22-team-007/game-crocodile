import ApiBase from './api_base'

type ThemeAPIType = {
  getThemes: () => Promise<ThemeType[]>
}
export default class Themes extends ApiBase implements ThemeAPIType {
  protected host = ''

  public async getThemes(): Promise<ThemeType[]> {
    const r = await this.GET('api/theme')
    return await r.json()
  }
}
