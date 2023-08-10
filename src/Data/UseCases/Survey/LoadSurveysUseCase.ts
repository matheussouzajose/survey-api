import { type LoadSurveys, type LoadSurveysProtocol } from '@/Domain/UseCases/Survey/LoadSurveysProtocol'
import { type LoadSurveysRepositoryProtocol } from '@/Data/Protocols/Repository/Survey/LoadSurveysRepositoryProtocol'

export class LoadSurveysUseCase implements LoadSurveysProtocol {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepositoryProtocol) {}

  async load (userId: string): Promise<LoadSurveys.Result> {
    return this.loadSurveysRepository.loadAll(userId)
  }
}
