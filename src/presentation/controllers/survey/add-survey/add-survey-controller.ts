import { type Controller } from '@/presentation/protocols/controller'
import { type Validation } from '@/presentation/protocols/validation'
import { type AddSurvey } from '@/domain/usecases/survey/add-survey'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body
      const survey = await this.addSurvey.add({
        question,
        answers,
        date: new Date()
      })
      return created(survey)
    } catch (e) {
      return serverError(e)
    }
  }
}
