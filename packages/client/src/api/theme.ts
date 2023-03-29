import ApiBase from './api_base'

type GameAPIType = {
  getThemes: () => Promise<GameType[]>
}
export default class Themes extends ApiBase implements GameAPIType {
  protected host = 'http://localhost:3001'
  public async getThemes(): Promise<any> {
    const r = await this.GET('/api/theme')
    return await r.json()
  }
}
