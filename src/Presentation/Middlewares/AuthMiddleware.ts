import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { type MiddlewareProtocol } from '@/Presentation/Protocols/MiddlewareProtocol'
import { ok, serverError, forbidden } from '@/Presentation/Helpers/Http/HttpHelper'
import { AccessDeniedError } from '@/Presentation/Errors/AccessDeniedError'
import { type LoadUserByTokenProtocol } from '@/Domain/UseCases/User/LoadUserByTokenProtocol'

export class AuthMiddleware implements MiddlewareProtocol {
  constructor (
    private readonly loadUserByToken: LoadUserByTokenProtocol,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const user = await this.loadUserByToken.load(accessToken, this.role)
        if (user) {
          return ok({ userId: user.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
