import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { type LoadAnswersBySurveyProtocol } from '@/Domain/UseCases/Survey/LoadAnswersBySurveyProtocol'
import { type SaveSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/SaveSurveyResultProtocol'
import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { InvalidParamError } from '@/Presentation/Errors/InvalidParamError'
import { forbidden, ok, serverError } from '@/Presentation/Helpers/Http/HttpHelper'

export class SaveSurveyResultController implements ControllerProtocol {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurveyProtocol,
    private readonly saveSurveyResult: SaveSurveyResultProtocol
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
    userId: string
  }
}
