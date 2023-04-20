export default class ApiBase {
  protected host = 'ya-praktikum.tech'

  protected static instance: ApiBase
  static Init(): ApiBase {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new this()
    }
    return this.instance
  }

  protected POST(path: string, params?: RequestInit): Promise<Response> {
    return this.fetchRequest('POST', path, params)
  }

  protected GET(path: string, params?: RequestInit): Promise<Response> {
    return this.fetchRequest('GET', path, params)
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

    return fetch(`https://${this.host}${path}`, {
      headers,
      mode: 'cors',
      credentials: 'include',
      ...params,
      method,
    })
  }
}
