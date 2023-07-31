import { type Middleware } from '../protocols/middleware'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { type HttpRequest, type HttpResponse, type LoadAccountByToken } from './auth-middleware-protocols'

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
