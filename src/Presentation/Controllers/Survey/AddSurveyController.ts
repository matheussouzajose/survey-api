import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { badRequest, noContent, serverError } from '@/Presentation/Helpers/Http/HttpHelper'
import { type AddSurveyProtocol } from '@/Domain/UseCases/Survey/AddSurveyProtocol'

export class AddSurveyController implements ControllerProtocol {
  constructor (
    private readonly validation: ValidationProtocol,
    private readonly addSurvey: AddSurveyProtocol
  ) {}

  async handle (request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addSurvey.add({
        ...request,
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddSurveyController {
  export type Request = {
    question: string
    answers: Answer[]
  }

  type Answer = {
    image?: string
    answer: string
  }
}
