import { noContent, ok, serverError } from '@/Presentation/Helpers/Http/HttpHelper'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { type LoadSurveysProtocol } from '@/Domain/UseCases/Survey/LoadSurveysProtocol'
import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'

export class LoadSurveysController implements ControllerProtocol {
  constructor (private readonly loadSurveys: LoadSurveysProtocol) {}

  async handle (request: LoadSurveysController.Request): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.userId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveysController {
  export type Request = {
    userId: string
  }
}
