import ApiBase from './api_base'
type ForumAPIType = {
  get: (id: number) => Promise<ForumRecord>,
  list: () => Promise<ForumList>,
  create: (record: ForumRecord) => Promise<ForumRecord|string>,
  update: (record: ForumRecord) => Promise<ForumRecord>,
  comments: (parent_id: number) => Promise<ForumRecord[]>,
  create_comment: (record: ForumRecord) => Promise<ForumRecord>,
  update_comment: (record: ForumRecord) => Promise<ForumRecord>
}
export default class Forum extends ApiBase implements ForumAPIType {
  protected host = 'http://localhost:3001/api'
  public async get(id: number): Promise<ForumRecord> {
    const r = await this.GET(`/forum/${id}`)
    return await r.json()
  }

  public async list(): Promise<ForumList> {
    const r = await this.GET(`/forum`)
    return await r.json()
  }

  public async create(record: ForumRecord): Promise<ForumRecord> {
    const r = await this.POST(`/forum/0`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }

  public async update(record: ForumRecord): Promise<ForumRecord> {
    const r = await this.POST(`/forum/${record.id}`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }

  public async comments(parent_id: number): Promise<ForumRecord[]> {
    const r = await this.GET(`/forum/${parent_id}/comment`)
    return await r.json()
  }

  public async create_comment(record: ForumRecord): Promise<ForumRecord> {
    record.id = 0
    const r = await this.POST(`/forum/${record.parent_id}/comment`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }

  public async update_comment(record: ForumRecord): Promise<ForumRecord> {
    const r = await this.POST(`/forum/${record.parent_id}`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }
}
