import { Sequelize } from 'sequelize-typescript'
import { formRecordModel } from './models/ForumRecord'
import { commentRecordModel } from './models/CommentRecord'
import { emojiRecordModel } from './models/EmojiRecord'
const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

export const sequelize = new Sequelize({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
})

export const ForumRecord = sequelize.define('ForumRecord', formRecordModel, {})
export const CommentRecord = sequelize.define('CommentRecord', commentRecordModel, {})
export const EmojiRecord = sequelize.define('EmojiRecord', emojiRecordModel, {})

CommentRecord.hasMany(EmojiRecord, {onDelete: 'cascade', foreignKey: 'comment_id'})
EmojiRecord.belongsTo(CommentRecord, {foreignKey: 'comment_id'})

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({alter: true})
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database.')
  }
}
