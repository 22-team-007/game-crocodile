import ApiBase from './api_base'
import avatarImage from '../assets/avatar.png'
type ResourceAPIType = {
  url: (url: string) => string
  add: (file: File) => Promise<string>
}
export default class Resources extends ApiBase implements ResourceAPIType {
  public url(url?: string | null) {
    if (!url || url.length === 0) return avatarImage
    return `${this.host}/api/v2/resources${url || ''}`
  }

  public async add(file: File | Blob): Promise<string> {
    const body: FormData = new FormData()
    body.append('resource', file)
    const r = await this.FORMPOST('/api/v2/resources', body)
    const resource = await r.json()
    return resource.id
  }
}
