import ApiBase from './api_base'
import Socket from './socket'

type GameAPIType = {
  get: (offset:number,title:string|undefined,archive:boolean) => Promise<GameType[]>,
  create: (title:string) => Promise<string>,
  users: (id:number) => Promise<UserType[]>,
  archive: (chatId:number) => Promise<{userId: number, result: GameType}>,
  unarchive: (chatId:number) => Promise<{userId: number, result: GameType}>,
  delete: (chatId:number) => Promise<{userId: number, result: GameType}>,
  avatar: (chatId:string,file:File) => Promise<GameType>,
  includeUser: (chatId:number,users:number[]) => Promise<string>,
  excludeUser: (chatId:number,users:number[]) => Promise<string>,
  socketConnect: (userId:number,chatId:number) => Promise<Socket>,
}
export default class Games extends ApiBase implements GameAPIType {
  public async get (offset = 0,title?:string,archive = false):Promise<GameType[]> {
    const r = await this.GET(`/api/v2/chats${archive === true ? '/archive' : ''}`, { body: JSON.stringify({ offset, limit: 100, title: title || '' }) })
    return await r.json()
  }

  public async create (title:string):Promise<string> {
    const r = await this.POST('/api/v2/chats', { body: JSON.stringify({ title }) })
    return await r.text()
  }

  public async users (id:number):Promise<UserType[]> {
    const r = await this.GET(`/api/v2/chats/${id}/users`)
    return await r.json()
  }

  public async archive (chatId:number):Promise<{userId: number, result: GameType}> {
    const r = await this.POST('/api/v2/chats/archive', { body: JSON.stringify({ chatId }) })
    return await r.json()
  }

  public async unarchive (chatId:number):Promise<{userId: number, result: GameType}> {
    const r = await this.POST('/api/v2/chats/unarchive', { body: JSON.stringify({ chatId }) })
    return await r.json()
  }

  public async delete (chatId:number):Promise<{userId: number, result: GameType}> {
    const r = await this.DELETE('/api/v2/chats', { body: JSON.stringify({ chatId }) })
    return await r.json()
  }

  public async avatar (chatId:string,file:File):Promise<GameType> {
    const body:FormData = new FormData();
    body.append('chatId', chatId);
    body.append('avatar', file);
    const r = await this.FORM('/api/v2/chats/avatar', body)
    return await r.json()
  }

  public async includeUser (chatId:number,users:number[]):Promise<string> {
    const r = await this.PUT(`${this.host}/api/v2/chats/users`, { body: JSON.stringify({ chatId, users }) })
    return await r.text()
  }

  public async excludeUser (chatId:number,users:number[]):Promise<string> {
    const r = await this.DELETE(`${this.host}/api/v2/chats/users`, { body: JSON.stringify({ chatId, users }) })
    return await r.text()
  }

  public async socketConnect (userId:number,chatId:number):Promise<Socket> {
    const r = await this.POST(`/api/v2/chats/token/${chatId}`)
    const a = await r.json()
    return Socket.connect(userId,chatId,a.token);
  }
}
