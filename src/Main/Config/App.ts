import setupMiddlewares from '@/Main/Config/Middlewares'
import setupRoutes from '@/Main/Config/Routes'
import setupStaticFiles from '@/Main/Config/StaticFiles'
import setupSwagger from '@/Main/Config/Swagger'
// import { setupApolloServer } from '@/Main/Graphql/Apollo/ApolloServer'

import express, { type Express } from 'express'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  // const server = setupApolloServer()
  // await server.start()
  // server.applyMiddleware({ app })
  return app
}
