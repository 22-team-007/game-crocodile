import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

export interface IForumRecord {
  id: number
  parent_id: number
  subject: string
  description: string
  author_id: number
}

export const formRecordModel: ModelAttributes<Model, IForumRecord> = {
  id: {
    type: DataType.NUMBER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  parent_id: {
    type: DataType.NUMBER,
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
    type: DataType.NUMBER,
    allowNull: false,
  },
}