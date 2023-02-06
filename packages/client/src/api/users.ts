import ApiBase from './api_base'
type UserAPIType = {
  get: (id:number) => Promise<UserType>,
  profile: (params:UserType) => Promise<UserType>,
  avatar: (file:File) => Promise<string>,
  search: (login:string) => Promise<UserType[]>,
  password: (params:PasswordParams) => Promise<string>,
}
export default class Users extends ApiBase implements UserAPIType {
  public async get (id:number):Promise<UserType> {
    const r = await this.GET(`/api/v2/user/${id}`);
    return await r.json();
  }

  public async profile (params:UserType):Promise<UserType> {
    const r = await this.PUT('/api/v2/user/profile', { body: JSON.stringify(params) });
    return await r.json();
  }

  public async avatar (file:File):Promise<string> {
    const body:FormData = new FormData();
    body.append('avatar', file);
    const r = await this.FORM('/api/v2/user/profile/avatar', body);
    const user = await r.json();
    return `${this.host}/api/v2/resources/${user.avatar || ''}`;
  }

  public async search (login:string):Promise<UserType[]> {
    const r = await this.POST('/api/v2/user/search', { body: JSON.stringify({ login }) });
    return await r.json();
  }

  public async password (params:PasswordParams):Promise<string> {
    const r = await this.PUT('/api/v2/user/password', { body: JSON.stringify(params) });
    return await r.text();
  }
}
