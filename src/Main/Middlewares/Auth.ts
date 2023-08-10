import { adaptMiddleware } from '@/Main/Adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '@/Main/Factories/Middlewares/AuthMiddlewareFactory'

export const auth = adaptMiddleware(makeAuthMiddleware())
