import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { type AuthenticationProtocol } from '@/Domain/UseCases/User/AuthenticationProtocol'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { badRequest, ok, serverError, unauthorized } from '@/Presentation/Helpers/Http/HttpHelper'

export class SignInController implements ControllerProtocol {
  constructor (
    private readonly authentication: AuthenticationProtocol,
    private readonly validation: ValidationProtocol
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
