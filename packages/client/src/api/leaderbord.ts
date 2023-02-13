import ApiBase from './api_base';

const ourGameHash = 'ldtxqftr';
type LeaderbordAPIType = {
  add: (chatId:number, id:number, score:number) => Promise<string>,
  all: (cursor?:number, limit?:number) => Promise<LeaderType[]>,
  team: (teamName:string, cursor?:number, limit?:number) => Promise<LeaderType[]>,
}
export default class Leaderbord extends ApiBase implements LeaderbordAPIType {
  public async add (chatId:number, id:number, score:number):Promise<string> {
    const r = await this.POST('/api/v2/leaderboard', { body: JSON.stringify({
      data: { [ourGameHash+'-id']: id, [ourGameHash+'-score']: score },
      ratingFieldName: ourGameHash+'-score',
      teamName: `team${chatId}`
    })});
    return await r.text();
  }

  public async all (cursor = 0, limit = 10):Promise<LeaderType[]> {
    const r = await this.POST('/api/v2/leaderboard/all', { body: JSON.stringify({
      ratingFieldName: ourGameHash+'-score', cursor, limit
    })});
    const arr:{ data: Record<string,number>}[] = await r.json();
    return arr.map(x=>{
      return {
        id: x.data[ourGameHash+'-id'],
        score: x.data[ourGameHash+'-score']
      }
    })
  }

  public async team (teamName:string, cursor = 0, limit = 10):Promise<LeaderType[]> {
    const r = await this.POST(`/api/v2/leaderboard/${teamName}`, { body: JSON.stringify({
      ratingFieldName: ourGameHash+'-score', cursor, limit
    })});
    const arr:{ data: Record<string,number>}[] = await r.json();
    return arr.map(x=>{
      return {
        id: x.data[ourGameHash+'-id'],
        score: x.data[ourGameHash+'-score']
      }
    })
  }

}
