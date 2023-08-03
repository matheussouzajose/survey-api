import { type SurveyModel, type LoadSurveysRepository } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveysRepository {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {
  }

  async loadAll (): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.loadAll()
  }
}
