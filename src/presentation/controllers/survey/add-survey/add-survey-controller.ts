import {
  type AddSurvey,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type Validation
} from './add-survey-controller-protocols'
import { badRequest, created, serverError } from '../../../helpers/http/http-helper'

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

      const survey = await this.addSurvey.add(httpRequest.body)
      return created(survey)
    } catch (e) {
      return serverError(e)
    }
  }
}
