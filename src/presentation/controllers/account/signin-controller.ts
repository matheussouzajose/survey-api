import { type Controller } from '@/presentation/protocols/controller'
import { type Authentication } from '@/domain/usecases/account/authentication'
import { type Validation } from '@/presentation/protocols/validation'
import { type HttpResponse } from '@/presentation/protocols/http'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'

export class SignInController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (request: SignInController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.authentication.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignInController {
  export type Request = {
    email: string
    password: string
  }
}
