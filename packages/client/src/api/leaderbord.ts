import ApiBase from './api_base';
type LeaderbordAPIType = {
  add: (chatId:number, userId:number, score:number) => Promise<string>,
  all: (cursor?:number, limit?:number) => Promise<LeaderbordType[]>,
  team: (teamName:string, cursor?:number, limit?:number) => Promise<LeaderbordType[]>,
}
const ourGameHash = 'ldtxqftr';
export default class Leaderbord extends ApiBase implements LeaderbordAPIType {
  public async add (chatId:number, userId:number, score:number):Promise<string> {
    const r = await this.POST('/api/v2/leaderboard', { body: JSON.stringify({
      data: { [ourGameHash+'-userId']: userId, [ourGameHash+'-score']: score },
      ratingFieldName: ourGameHash+'-score',
      teamName: `team${chatId}`
    })});
    return await r.text();
  }
  public async all (cursor = 0, limit = 100):Promise<LeaderbordType[]> {
    const r = await this.POST('/api/v2/leaderboard/all', { body: JSON.stringify({
      ratingFieldName: ourGameHash+'-score', cursor, limit
    })});
    const arr:{ data: Record<string,number>}[] = await r.json();
    return arr.map(x=>{
      return {
        userId: x.data[ourGameHash+'-userId'],
        score: x.data[ourGameHash+'-score']
      }
    })
  }
  public async team (teamName:string, cursor = 0, limit = 100):Promise<LeaderbordType[]> {
    const r = await this.POST(`/api/v2/leaderboard/${teamName}`, { body: JSON.stringify({
      ratingFieldName: ourGameHash+'-score', cursor, limit
    })});
    const arr:{ data: Record<string,number>}[] = await r.json();
    return arr.map(x=>{
      return {
        userId: x.data[ourGameHash+'-userId'],
        score: x.data[ourGameHash+'-score']
      }
    })
  }
}
