import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'
import { type LogErrorRepositoryProtocol } from '@/Data/Protocols/Repository/Log/LogErrorRepositoryProtocol'

export class LogControllerDecorator implements ControllerProtocol {
  constructor (
    private readonly controller: ControllerProtocol,
    private readonly logErrorRepository: LogErrorRepositoryProtocol
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
