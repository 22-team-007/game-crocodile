export default class ApiBase {
  protected host = ''

  protected static instance: ApiBase
  static Init(): ApiBase {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new this()
    }
    return this.instance
  }
  protected DELETE(path: string, params?: RequestInit): Promise<Response> {
    return this.fetchRequest('DELETE', path, params)
  }
  protected POST(path: string, params?: RequestInit): Promise<Response> {
    return this.fetchRequest('POST', path, params)
  }
  protected PUT(path: string, params?: RequestInit): Promise<Response> {
    return this.fetchRequest('PUT', path, params)
  }
  protected GET(path: string, params?: RequestInit): Promise<Response> {
    return this.fetchRequest('GET', path, params)
  }
  protected FORM(path: string, body: FormData): Promise<Response> {
    return this.fetchRequest('PUT', path, { body, headers: undefined })
  }
  protected FORMPOST(path: string, body: FormData): Promise<Response> {
    return this.fetchRequest('POST', path, { body, headers: undefined })
  }

  protected fetchRequest(
    method: string,
    path: string,
    params?: RequestInit
  ): Promise<Response> {
    let headers: HeadersInit = {
      accept: 'application/json',
      'content-type': 'application/json',
    }

    if (params?.headers && 'Cookie' in params.headers) {
      const { Cookie } = params.headers

      if (typeof Cookie !== 'undefined') {
        headers = { ...headers, Cookie }
        delete params.headers
      }
    }

    return fetch(`${this.host}${path}`, {
      headers,
      mode: 'cors',
      credentials: 'include',
      ...params,
      method,
    })
  }
}
