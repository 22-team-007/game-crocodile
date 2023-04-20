import Auth from './auth'
import Oauth from './oauth'
import Users from './users'
import Games from './games'
import Resources from './resources'
import Leaderbord from './leaderbord'
import Forum from './forum'
import Themes from './theme'
import SsrAPI from './api_ssr'
export default {
  auth: Auth.Init() as Auth,
  oauth: Oauth.Init() as Oauth,
  users: Users.Init() as Users,
  games: Games.Init() as Games,
  resources: Resources.Init() as Resources,
  leaderbord: Leaderbord.Init() as Leaderbord,
  forum: Forum.Init() as Forum,
  themes: Themes.Init() as Themes,
  ssrAPI: SsrAPI.Init() as SsrAPI,
}
