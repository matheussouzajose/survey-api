import { type Controller } from '@/presentation/protocols/controller'
import { type Authentication } from '@/domain/usecases/account/authentication'
import { type Validation } from '@/presentation/protocols/validation'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'

export class SignInController implements Controller {
  constructor (private readonly authentication: Authentication, private readonly validation: Validation) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error.stack)
    }
  }
}