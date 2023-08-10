import swaggerConfig from '@/Main/Docs'

import { serve, setup } from 'swagger-ui-express'
import { type Express } from 'express'
import { noCache } from '@/Main/Middlewares/NoCache'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
