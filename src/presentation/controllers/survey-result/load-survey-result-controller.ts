import { type Controller } from '@/presentation/protocols/controller'
import { type CheckSurveyById } from '@/domain/usecases/survey/check-survey-by-id'
import { type LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { type HttpResponse } from '@/presentation/protocols/http'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly checkSurveyById: CheckSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = request
      const exists = await this.checkSurveyById.checkById(surveyId)
      if (!exists) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
  }
}
