import ApiBase from './api_base'
type ForumAPIType = {
  get: (id: number) => Promise<ForumRecord>,
  create: (record: ForumRecord) => Promise<ForumRecord|string>,
  update: (id: number, record: ForumRecord) => Promise<ForumRecord>,
  comments: (id: number) => Promise<ForumRecord[]>,
  create_comment: (parent_id: number, record: ForumRecord) => Promise<ForumRecord>,
  update_comment: (parent_id: number, id: number, record: ForumRecord) => Promise<ForumRecord>
}
export default class Forum extends ApiBase implements ForumAPIType {
  protected host = ''
  public async get(id: number): Promise<ForumRecord> {
    const r = await this.GET(`/forum/${id}/info`)
    return await r.json()
  }

  public async create(record: ForumRecord): Promise<ForumRecord> {
    record.id = 0
    const r = await this.POST(`/forum/0`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }

  public async update(id: number, record: ForumRecord): Promise<ForumRecord> {
    record.id = id
    const r = await this.POST(`/forum/${id}`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }

  public async comments(id: number): Promise<ForumRecord[]> {
    const r = await this.GET(`/forum/${id}/comments`)
    return await r.json()
  }

  public async create_comment(parent_id: number, record: ForumRecord): Promise<ForumRecord> {
    record.id = 0
    const r = await this.POST(`/forum/${parent_id}/comment`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }

  public async update_comment(parent_id: number, id: number, record: ForumRecord): Promise<ForumRecord> {
    record.id = id
    record.parent_id = parent_id
    const r = await this.POST(`/forum/${parent_id}`, {
      body: JSON.stringify(record)
    })
    return await r.json()
  }
}
