import { type Survey, type LoadSurveysRepository } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveysRepository {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {
  }

  async loadAll (): Promise<Survey[]> {
    return await this.loadSurveysRepository.loadAll()
  }
}
