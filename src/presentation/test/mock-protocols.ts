import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'
import { type Controller } from '@/presentation/protocols/controller'
import { created } from '@/presentation/helpers/http/http-helper'
import { mockAccountModel } from '@/domain/test/mock-account'
import { type Validation } from '@/presentation/protocols/validation'

export const mockHttpRequest = (httpRequest: HttpRequest): HttpRequest => {
  return httpRequest
}

export const mockHttpResponse = (httpResponse: HttpResponse): HttpResponse => {
  return httpResponse
}

export const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => {
        resolve(created(mockAccountModel()))
      })
    }
  }

  return new ControllerStub()
}

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}
