import { type Controller } from '@/presentation/protocols/controller'
import { type LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { type SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { type HttpResponse } from '@/presentation/protocols/http'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, answer } = request
      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)
      if (!answers.length) {
        return forbidden(new InvalidParamError('surveyId'))
      } else if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        ...request,
        date: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
