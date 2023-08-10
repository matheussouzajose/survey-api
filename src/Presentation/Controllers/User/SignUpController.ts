import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { type AddUserProtocol } from '@/Domain/UseCases/User/AddUserProtocol'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { type AuthenticationProtocol } from '@/Domain/UseCases/User/AuthenticationProtocol'
import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { badRequest, forbidden, ok, serverError } from '@/Presentation/Helpers/Http/HttpHelper'
import { EmailInUseError } from '@/Presentation/Errors/EmailInUseError'

export class SignUpController implements ControllerProtocol {
  constructor (
    private readonly addUser: AddUserProtocol,
    private readonly validation: ValidationProtocol,
    private readonly authentication: AuthenticationProtocol
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      const isValid = await this.addUser.add({
        name,
        email,
        password
      })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
