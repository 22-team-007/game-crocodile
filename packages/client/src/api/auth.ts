import ApiBase from './api_base'
type AuthAPIType = {
  signUp: (params:SignUpParams) => Promise<UserType>,
  signIn: (params:SignInParams) => Promise<UserType>,
  user: () => Promise<UserType>,
  logOut: () => Promise<string>,
}
export default class Auth extends ApiBase implements AuthAPIType {
  public async signUp (params:SignUpParams):Promise<UserType> {
    const r:Response = await this.POST('/api/v2/auth/signup', { body: JSON.stringify(params) })
    await r.json()
    return await this.user()
  }

  public async signIn (params:SignInParams):Promise<UserType> {
    const r:Response = await this.POST('/api/v2/auth/signin', { body: JSON.stringify(params) })
    await r.json()
    return await this.user()
  }

  public async user ():Promise<UserType> {
    const r:Response = await this.GET('/api/v2/auth/user')
    return await r.json()
  }

  public async logOut ():Promise<string> {
    const r = await this.POST('/api/v2/auth/logout')
    return await r.text()
  }
}
