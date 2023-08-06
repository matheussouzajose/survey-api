import { type Controller } from '@/presentation/protocols/controller'
import { type LoadSurveysById } from '@/domain/usecases/survey/load-survey-by-id'
import { type SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveysById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params, body, accountId } = httpRequest
      const { answer } = body
      const { surveyId } = params

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const answers = survey.answers.map(item => item.answer)
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId,
        date: new Date(),
        answer
      })

      return ok(surveyResult)
    } catch (e) {
      return serverError(e)
    }
  }
}