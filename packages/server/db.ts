import { Sequelize } from 'sequelize-typescript'
import { formRecordModel } from './models/ForumRecord'
import { commentRecordModel } from './models/CommentRecord'
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

export const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database.')
  }
}
