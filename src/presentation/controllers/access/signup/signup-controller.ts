import {
  type HttpRequest,
  type HttpResponse,
  type Controller,
  type AddAccount,
  type Validation
} from './signup-controller-protocols'
import { badRequest, created, forbidden, serverError } from '../../../helpers/http/http-helper'
import { type Authentication } from '../../../../domain/usecases/authentication'
import { EmailInUseError } from '../../../errors/email-in-use-error'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({ name, email, password })
      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({ email, password })

      return created({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
