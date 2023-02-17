type Content = {
  type: string,
  chat_id?: number,
  time?: string,
  user_id?: number,
  id?: number,
  color?: string
  content?: string | [x:number,y:number][] | Content,
  file?: ResourceType
}

type SocketAPIType = {
  sendContent: (type:string, content: Omit<Content, "type">) => void,
  sendMessage: (text:string) => void,
  sendCoordinates: (coordinates:[x:number,y:number][], color:string) => void,
  sendImage: (content:string) => void,
  getMessages: (content:string) => void,
  on: (event: string, handler: (res?: string | Content) => void) => void
}

export default class Socket extends WebSocket implements SocketAPIType {
  protected static instance:Socket;
  protected static userId:number;

  static connect (userId:number,chatId:number,token:string):Socket {
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    if (this.instance === null || this.instance === undefined)
      this.instance = new this(url);
    else if (this.instance.url !== url){
      this.instance.close();
      this.instance = new this(url);
    }
    this.userId = userId;
    return this.instance
  }

  private constructor (url:string) {
    super(url);
    super.addEventListener('message', this.handler);
  }

  private emit(c:Content) {
    if(c.type==='message' && c.content && typeof c.content === 'object')
      c = {...c, ...c.content} as Content;
    this.dispatchEvent(new CustomEvent(c.type, { detail: c }))
  }

  private handler(event:MessageEvent){
    const res: Content | Content[] = JSON.parse(event.data);
    if (res && typeof res === 'object') {
      if (Array.isArray(res))
        res.reverse().forEach(this.emit);
      else
        this.emit(res)
    }
  }

  private send2(c:Content){
    if(this.readyState===this.OPEN && self.navigator.onLine===true)
      super.send(JSON.stringify(c))
    else{
      this.emit({
        ...c,
        time: new Date().toISOString().split('.')[0]+'+00:00',
        user_id: Socket.userId,
        id: Math.floor(new Date().getTime()/200%100000)
      })
    }
  }
  

  public sendContent (type:string, content: Omit<Content, "type">) {
    this.send2({
      type: 'message',
      content: { type, ...content }
    })
  }

  public sendMessage (text:string) {
    this.sendContent("text", { content: text })
  }

  public sendCoordinates (coordinates:[x:number,y:number][], color:string) {
    this.sendContent("coordinates", { content: coordinates, color })
  }

  public sendImage (content:string) {
    this.send2({
      type: 'file',
      content
    })
  }

  public getMessages (content:string) {
    this.send2({
      type: 'get old',
      content
    })
  }

  public on(event: string, handler: (res?: string | Content) => void) {
    super.addEventListener(event, (e:Event)=>{
      handler((e as CustomEvent).detail);
    });
  }
}
