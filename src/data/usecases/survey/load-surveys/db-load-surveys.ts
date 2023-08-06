import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type SurveyModel } from '@/domain/models/survey'

export class DbLoadSurveys implements LoadSurveysRepository {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {
  }

  async loadAll (): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.loadAll()
  }
}
