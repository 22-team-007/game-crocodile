import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize'

export interface IEmojiRecord {
  id: number
  emoji: string
  author_id: number
}

export const emojiRecordModel: ModelAttributes<Model, IEmojiRecord> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  emoji: {
    type: DataType.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataType.INTEGER,
    allowNull: false
  }
}
