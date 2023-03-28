import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

export interface ICommentRecord {
  id: number
  parent_id: number
  subject: string
  description: string
  author_id: number
}

export const commentRecordModel: ModelAttributes<Model, ICommentRecord> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  parent_id: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  subject: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
