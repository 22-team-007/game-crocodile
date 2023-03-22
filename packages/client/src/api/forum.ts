import ApiBase from './api_base'
type ForumAPIType = {
  get: (id: number) => Promise<ForumRecord>,
  list: () => Promise<ForumList>,
  create: (record: Omit<ForumRecord, 'id'>) => Promise<ForumRecord|string>,
  update: (record: ForumRecord) => Promise<ForumRecord>,
  comments: (parent_id: number) => Promise<ForumRecord[]>,
  create_comment: (record: Omit<ForumRecord, 'id'>) => Promise<ForumRecord>,
  update_comment: (record: ForumRecord) => Promise<ForumRecord>
}
export default class Forum extends ApiBase implements ForumAPIType {
  protected host = '/api'
  public async get(id: number): Promise<ForumRecord> {
    const r = await this.GET(`/forum/${id}`)
    return await r.json()
  }

  public async list(): Promise<ForumList> {
    const r = await this.GET(`/forum`)
    return await r.json()
  }

  public async create(record: Omit<ForumRecord, 'id'>): Promise<ForumRecord> {
    const r = await this.PUT(`/forum`, {
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

  public async create_comment(record: Omit<ForumRecord, 'id'>): Promise<ForumRecord> {
    const r = await this.PUT(`/forum/${record.parent_id}/comment`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }

  public async update_comment(record: ForumRecord): Promise<ForumRecord> {
    const r = await this.POST(`/forum/${record.parent_id}/comment`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }
}
