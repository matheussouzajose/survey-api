import { bodyParser } from '@/Main/Middlewares/BodyParser'
import { cors } from '@/Main/Middlewares/Cors'
import { contentType } from '@/Main/Middlewares/ContentType'
import { type Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
