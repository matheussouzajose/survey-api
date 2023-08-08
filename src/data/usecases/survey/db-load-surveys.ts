import { type LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveys.Result> {
    return this.loadSurveysRepository.loadAll(accountId)
  }
}
