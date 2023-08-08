import swaggerConfig from '@/main/docs'

import { serve, setup } from 'swagger-ui-express'
import { type Express } from 'express'
import { noCache } from '@/main/middlewares/no-cache'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
