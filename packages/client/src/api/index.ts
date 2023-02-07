import Auth from './auth'
import Users from './users';
import Games from './games';
import Resources from './resources'
import Leaderbord from './leaderbord'
export default {
    auth: Auth.Init() as Auth,
    users: Users.Init() as Users,
    games: Games.Init() as Games,
    resources: Resources.Init() as Resources,
    leaderbord: Leaderbord.Init() as Leaderbord
}
