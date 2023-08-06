import { type Middleware } from '@/presentation/protocols/middleware'
import { type LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.authorization
      if (!accessToken || !accessToken.startsWith('Bearer ')) {
        return forbidden(new AccessDeniedError())
      }
      const account = await this.loadAccountByToken.loadByToken(accessToken.slice(7), this.role)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }
      return ok({ accountId: account.id })
    } catch (e) {
      return serverError(e)
    }
  }
}
