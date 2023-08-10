import { adaptMiddleware } from '@/Main/Adapters/ExpressMiddlewareAdapter'
import { makeAuthMiddleware } from '@/Main/Factories/Middlewares/AuthMiddlewareFactory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
