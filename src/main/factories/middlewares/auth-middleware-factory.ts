import { type Middleware } from '../../../presentation/protocols/middleware'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { makeDbLoadAccountByToken } from '../usecases/access/load-account-by-token/db-load-account-by-token-factory'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const authMiddleware = new AuthMiddleware(makeDbLoadAccountByToken(), role)
  return makeLogControllerDecorator(authMiddleware)
}
