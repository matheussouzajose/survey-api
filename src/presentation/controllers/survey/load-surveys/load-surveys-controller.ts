import { type Controller } from '@/presentation/protocols/controller'
import { type LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.loadAll()
      return surveys.length ? ok(surveys) : noContent()
    } catch (e) {
      return serverError(e)
    }
  }
}
