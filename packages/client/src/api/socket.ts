type SocketAPIType = {
  sendMessage: (text:string) => void,
  sendCoordinates: (coordinates:[x:number,y:number][], color:string) => void,
  sendImage: (content:number) => void,
  on: (event: string, handler: (res?: string | MessageContent) => void) => void
}
type MessageContent = {
  type: string,
  content: string | [x:number,y:number][],
  color?: string
}
type Content = {
  chat_id?: number,
  time?: string,
  type: string,
  user_id?: string,
  content?: string | MessageContent,
  file?: ResourceType
}
export default class Socket extends WebSocket implements SocketAPIType {
  protected static instance:Socket;

  static connect (userId:number,chatId:number,token:string):Socket {
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    if (this.instance === null || this.instance === undefined)
      this.instance = new this(url);
    else if (this.instance.url !== url){
      this.instance.close();
      this.instance = new this(url);
    }
    return this.instance
  }

  private constructor (url:string) {
    super(url);
    super.addEventListener('message', this.handler);
  }

  private emit(type:string, detail?: string | MessageContent) {
    if(type==='message' && detail && typeof detail === 'object')
      type = detail.type;
    this.dispatchEvent(new CustomEvent(type, { detail }))
  }

  private handler(event:MessageEvent){
    const res: Content | Content[] = JSON.parse(event.data);
    if (res && typeof res === 'object') {
      if (Array.isArray(res)) {
        res.reverse().forEach((m:Content) => {
          this.emit(m.type, m.content)
        });
      } else {
        this.emit(res.type, res.content)
      }
    }
  }

  public sendMessage (text:string) {
    this.send(JSON.stringify({
      type: 'message',
      content: {
        type: "text",
        content: text
      }
    }))
  }

  public sendCoordinates (coordinates:[x:number,y:number][], color:string) {
    this.send(JSON.stringify({
      type: 'message',
      content: {
        type: "coordinates",
        content: coordinates,
        color
      }
    }))
  }

  public sendImage (content:number) {
    this.send(JSON.stringify({ content, type: 'file' }))
  }

  public getMessages (content:number) {
    this.send(JSON.stringify({ content, type: 'get old' }))
  }

  public on(event: string, handler: (res?: string | MessageContent) => void) {
    super.addEventListener(event, (e:Event)=>{
      handler((e as CustomEvent).detail);
    });
  }
}
