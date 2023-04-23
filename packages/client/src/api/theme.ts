import ApiBase from './api_base'

type ThemeAPIType = {
  getThemes: () => Promise<ThemeType[]>
  setTheme: (name: string) => Promise<boolean>
}
export default class Themes extends ApiBase implements ThemeAPIType {
  protected host = ''

  public async getThemes(): Promise<ThemeType[]> {
    const r = await this.GET('api/theme')
    return await r.json()
  }

  public async setTheme(name: string): Promise<boolean> {
    const r = await this.GET(`api/theme/set?name=${name}`)
    return r.ok
  }
}
