import {badRequest, ok, serverError, unauthorized} from '../../helpers/http-helper'
import {InvalidParamError, MissingParamError, UnauthorizedError} from '../../errors'
import { type Controller, type HttpRequest, type HttpResponse, type EmailValidator, type Authentication } from './login-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly authentication: Authentication) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const token = await this.authentication.auth(email, password)
      if (!token) {
        return unauthorized()
      }

      return ok({})
    } catch (error) {
      return serverError(error.stack)
    }
  }
}
