const WebSocket2 = typeof WebSocket === 'undefined' ? class {} : WebSocket

export default class Socket extends WebSocket2 implements SocketAPIType {
  protected static instance: Socket
  protected static userId: number
  protected static chatId: number

  public url = ''
  public readyState = 0
  public OPEN = 0

  public close() {
    super.close()
  }
  public addEventListener(...p: unknown[]) {
    super.addEventListener(...p)
  }

  static connect(userId: number, chatId: number, token: string): Socket {
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    if (this.instance === null || this.instance === undefined)
      this.instance = new this(url)
    else if (this.instance.url !== url) {
      this.instance.close()
      this.instance = new this(url)
    }
    this.userId = userId
    this.chatId = chatId
    return this.instance
  }

  private constructor(url: string) {
    super(url)
    super.addEventListener('message', this.handler)
  }

  private emit(c: SocketContent) {
    if (c.type === 'message' && c.content && typeof c.content === 'object')
      c = { ...c, ...c.content } as SocketContent
    super.dispatchEvent(new CustomEvent(c.type, { detail: c }))
  }

  private handler(event: MessageEvent) {
    const res: SocketContent | SocketContent[] = JSON.parse(event.data)
    if (res && typeof res === 'object') {
      if (Array.isArray(res)) {
        res.reverse().forEach((r: SocketContent) => {
          if (
            r.chat_id === Socket.chatId ||
            r.chat_id === undefined ||
            r.chat_id === null
          )
            this.emit({ ...r, ...JSON.parse(r.content as string) })
        })
      } else if (
        res.chat_id === Socket.chatId ||
        res.chat_id === undefined ||
        res.chat_id === null
      )
        this.emit(res)
    }
  }

  private send2(c: SocketContent) {
    if (this.readyState === this.OPEN && self.navigator.onLine === true)
      super.send(JSON.stringify(c))
    else {
      this.emit({
        ...c,
        time: new Date().toISOString().split('.')[0] + '+00:00',
        user_id: Socket.userId,
        id: Math.floor((new Date().getTime() / 200) % 100000),
      })
    }
  }

  public sendContent(type: string, content: Omit<SocketContent, 'type'>) {
    this.send2({
      type: 'message',
      content: { type, ...content },
    })
  }

  public sendImage(content: Pick<SocketContent, 'type' | 'content'>) {
    this.send2({
      type: 'message',
      content,
    })
  }

  public getMessages(content: string) {
    this.send2({
      type: 'get old',
      content,
    })
  }

  public on<T>(event: string, handler: (res: T) => void) {
    super.addEventListener(event, (e: Event) => {
      handler((e as CustomEvent).detail)
    })
  }
}
