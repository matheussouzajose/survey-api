import { type Middleware } from '@/presentation/protocols/middleware'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { makeDbLoadAccountByToken } from '@/main/factories/usecases/account/load-account-by-token-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const authMiddleware = new AuthMiddleware(makeDbLoadAccountByToken(), role)
  return makeLogControllerDecorator(authMiddleware)
}
