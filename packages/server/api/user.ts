interface IUser {
  getMe: (cookie: string) => Promise<UserType | null>
}

export declare type UserType = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  email: string
  phone: string
  avatar?: string
}

const { PRAKTIKUM_HOST } = process.env

class User implements IUser {
  public async getMe(Cookie: string): Promise<UserType | null> {
    try {
      const resp = await fetch(`https://${PRAKTIKUM_HOST}/api/v2/auth/user`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Cookie,
        },
        mode: 'cors',
      })

      if (resp.ok) {
        return resp.json()
      }
      return null
    } catch {
      return null
    }
  }
}

export default new User()
