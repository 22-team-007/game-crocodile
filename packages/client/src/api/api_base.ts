export default class ApiBase {
  protected host = 'https://ya-praktikum.tech';
  protected static instance:ApiBase;
  static Init ():ApiBase {
    if (this.instance === null || this.instance === undefined) { this.instance = new this(); }
    return this.instance
  }
  protected DELETE(path:string, params?:RequestInit):Promise<Response>{
    return this.fetchRequest('DELETE', path, params);
  }
  protected POST(path:string, params?:RequestInit):Promise<Response>{
    return this.fetchRequest('POST', path, params);
  }
  protected PUT(path:string, params?:RequestInit):Promise<Response>{
    return this.fetchRequest('PUT', path, params);
  }
  protected GET(path:string, params?:RequestInit):Promise<Response>{
    return this.fetchRequest('GET', path, params);
  }
  protected FORM(path:string, body:FormData):Promise<Response>{
    return this.fetchRequest('PUT', path, { body, headers: undefined } );
  }
  protected fetchRequest(method:string, path:string, params?:RequestInit):Promise<Response>{
    return fetch(`${this.host}${path}`,{
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      credentials: "include",
      ...params,
      method
    })
  }
}