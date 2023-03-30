import ApiBase from './api_base'
import Socket from './socket'

type GameAPIType = {
  get: (
    offset: number,
    title: string | undefined,
    archive: boolean
  ) => Promise<GameType[]>
  create: (title: string) => Promise<string>
  users: (id: number) => Promise<UserType[]>
  archive: (chatId: number) => Promise<{ userId: number; result: GameType }>
  unarchive: (chatId: number) => Promise<{ userId: number; result: GameType }>
  delete: (chatId: number) => Promise<string>
  avatar: (chatId: string, file: File) => Promise<GameType>
  includeUser: (chatId: number, users: number[]) => Promise<string>
  excludeUser: (chatId: number, users: number[]) => Promise<string>
  socketConnect: (userId: number, chatId: number) => Promise<Socket>
  getWord: () => Promise<string>
}
export default class Games extends ApiBase implements GameAPIType {
  public async get(
    offset = 0,
    title?: string,
    archive = false
  ): Promise<GameType[]> {
    const r = await this.GET(
      `/api/v2/chats${
        archive === true ? '/archive' : ''
      }?offset=${offset}&limit=100&title=${encodeURI(title || '')}`
    )
    return await r.json()
  }

  public async create(title: string): Promise<string> {
    const r = await this.POST('/api/v2/chats', {
      body: JSON.stringify({ title }),
    })
    return await r.text()
  }

  public async users(id: number): Promise<UserType[]> {
    const r = await this.GET(`/api/v2/chats/${id}/users`)
    return await r.json()
  }

  public async archive(
    chatId: number
  ): Promise<{ userId: number; result: GameType }> {
    const r = await this.POST('/api/v2/chats/archive', {
      body: JSON.stringify({ chatId }),
    })
    return await r.json()
  }

  public async unarchive(
    chatId: number
  ): Promise<{ userId: number; result: GameType }> {
    const r = await this.POST('/api/v2/chats/unarchive', {
      body: JSON.stringify({ chatId }),
    })
    return await r.json()
  }

  public async delete(chatId: number): Promise<string> {
    const r = await this.DELETE('/api/v2/chats', {
      body: JSON.stringify({ chatId }),
    })
    return await r.text()
  }

  public async avatar(chatId: string, file: File): Promise<GameType> {
    const body: FormData = new FormData()
    body.append('chatId', chatId)
    body.append('avatar', file)
    const r = await this.FORM('/api/v2/chats/avatar', body)
    return await r.json()
  }

  public async includeUser(chatId: number, users: number[]): Promise<string> {
    const r = await this.PUT(`/api/v2/chats/users`, {
      body: JSON.stringify({ chatId, users }),
    })
    return await r.text()
  }

  public async excludeUser(chatId: number, users: number[]): Promise<string> {
    const r = await this.DELETE(`/api/v2/chats/users`, {
      body: JSON.stringify({ chatId, users }),
    })
    return await r.text()
  }

  public async socketConnect(userId: number, chatId: number): Promise<Socket> {
    const r = await this.POST(`/api/v2/chats/token/${chatId}`)
    const a = await r.json()
    return await new Promise<Socket>(resolve => {
      const socket = Socket.connect(userId, chatId, a.token)
      socket.addEventListener('open', () => {
        resolve(socket)
      })
    })
  }

  public async getWord(): Promise<string> {
    let s:string|null = null
    let a:string[] = typeof localStorage !== "undefined" && localStorage.getItem('words')?.split(';') || []
    if (self.navigator.onLine === true) {
      const r = await fetch(`/words`)
      s = await r.text()
      a.push(s)
    }
    else if (a.length < 5) {
      while(s === null || s.length === 0)
        s = prompt('Добавьте свое слово')
      a.push(s)
    }
    a = a.sort(()=>Math.random()%2===0 ? 1 : -1)
    typeof localStorage !== "undefined" && localStorage.setItem('words', a.join(';'))
    return a[Math.floor(Math.random() * a.length)]
  }

}
