import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { type CheckSurveyByIdProtocol } from '@/Domain/UseCases/Survey/CheckSurveyByIdProtocol'
import { type LoadSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/LoadSurveyResultProtocol'
import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { forbidden, ok, serverError } from '@/Presentation/Helpers/Http/HttpHelper'
import { InvalidParamError } from '@/Presentation/Errors/InvalidParamError'

export class LoadSurveyResultController implements ControllerProtocol {
  constructor (
    private readonly checkSurveyById: CheckSurveyByIdProtocol,
    private readonly loadSurveyResult: LoadSurveyResultProtocol
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, userId } = request
      const exists = await this.checkSurveyById.checkById(surveyId)
      if (!exists) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, userId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    userId: string
  }
}
